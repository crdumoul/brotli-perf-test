/*!
 AdFuel v1.1.0

 - Bug: undefined property when syncing slots
 - Bug: load order agnostication
 - Bug: dynamictargeting typo, AdFuel.startInterval typo
 - Enhancement: added Module Registration, async, refactorings
 - Bug: modified async to ignore require.js
 
 */


// Include GPT Library
(function(callback) {
    "use strict";
    var a = document,
        b = a.createElement("script"),
        c = a.getElementsByTagName("script")[0],
        d = "https:" === document.location.protocol;
    b.type = "text/javascript";
    b.src = (d ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
    c.parentNode.insertBefore(b, c);
})();


!function(){function n(){}function t(n){return n}function e(n){return!!n}function r(n){return!n}function u(n){return function(){if(null===n)throw new Error("Callback was already called.");n.apply(this,arguments),n=null}}function i(n){return function(){null!==n&&(n.apply(this,arguments),n=null)}}function o(n){return M(n)||"number"==typeof n.length&&n.length>=0&&n.length%1===0}function c(n,t){for(var e=-1,r=n.length;++e<r;)t(n[e],e,n)}function a(n,t){for(var e=-1,r=n.length,u=Array(r);++e<r;)u[e]=t(n[e],e,n);return u}function f(n){return a(Array(n),function(n,t){return t})}function l(n,t,e){return c(n,function(n,r,u){e=t(e,n,r,u)}),e}function s(n,t){c(W(n),function(e){t(n[e],e)})}function p(n,t){for(var e=0;e<n.length;e++)if(n[e]===t)return e;return-1}function h(n){var t,e,r=-1;return o(n)?(t=n.length,function(){return r++,t>r?r:null}):(e=W(n),t=e.length,function(){return r++,t>r?e[r]:null})}function m(n,t){return t=null==t?n.length-1:+t,function(){for(var e=Math.max(arguments.length-t,0),r=Array(e),u=0;e>u;u++)r[u]=arguments[u+t];switch(t){case 0:return n.call(this,r);case 1:return n.call(this,arguments[0],r)}}}function y(n){return function(t,e,r){return n(t,r)}}function v(t){return function(e,r,o){o=i(o||n),e=e||[];var c=h(e);if(0>=t)return o(null);var a=!1,f=0,l=!1;!function s(){if(a&&0>=f)return o(null);for(;t>f&&!l;){var n=c();if(null===n)return a=!0,void(0>=f&&o(null));f+=1,r(e[n],n,u(function(n){f-=1,n?(o(n),l=!0):s()}))}}()}}function d(n){return function(t,e,r){return n(P.eachOf,t,e,r)}}function g(n){return function(t,e,r,u){return n(v(e),t,r,u)}}function k(n){return function(t,e,r){return n(P.eachOfSeries,t,e,r)}}function b(t,e,r,u){u=i(u||n),e=e||[];var c=o(e)?[]:{};t(e,function(n,t,e){r(n,function(n,r){c[t]=r,e(n)})},function(n){u(n,c)})}function w(n,t,e,r){var u=[];n(t,function(n,t,r){e(n,function(e){e&&u.push({index:t,value:n}),r()})},function(){r(a(u.sort(function(n,t){return n.index-t.index}),function(n){return n.value}))})}function O(n,t,e,r){w(n,t,function(n,t){e(n,function(n){t(!n)})},r)}function S(n,t,e){return function(r,u,i,o){function c(){o&&o(e(!1,void 0))}function a(n,r,u){return o?void i(n,function(r){o&&t(r)&&(o(e(!0,n)),o=i=!1),u()}):u()}arguments.length>3?n(r,u,a,c):(o=i,i=u,n(r,a,c))}}function E(n,t){return t}function L(t,e,r){r=r||n;var u=o(e)?[]:{};t(e,function(n,t,e){n(m(function(n,r){r.length<=1&&(r=r[0]),u[t]=r,e(n)}))},function(n){r(n,u)})}function j(n,t,e,r){var u=[];n(t,function(n,t,r){e(n,function(n,t){u=u.concat(t||[]),r(n)})},function(n){r(n,u)})}function I(t,e,r){function i(t,e,r,u){if(null!=u&&"function"!=typeof u)throw new Error("task callback must be a function");return t.started=!0,M(e)||(e=[e]),0===e.length&&t.idle()?P.setImmediate(function(){t.drain()}):(c(e,function(e){var i={data:e,callback:u||n};r?t.tasks.unshift(i):t.tasks.push(i),t.tasks.length===t.concurrency&&t.saturated()}),void P.setImmediate(t.process))}function o(n,t){return function(){f-=1;var e=!1,r=arguments;c(t,function(n){c(l,function(t,r){t!==n||e||(l.splice(r,1),e=!0)}),n.callback.apply(n,r)}),n.tasks.length+f===0&&n.drain(),n.process()}}if(null==e)e=1;else if(0===e)throw new Error("Concurrency must not be zero");var f=0,l=[],s={tasks:[],concurrency:e,payload:r,saturated:n,empty:n,drain:n,started:!1,paused:!1,push:function(n,t){i(s,n,!1,t)},kill:function(){s.drain=n,s.tasks=[]},unshift:function(n,t){i(s,n,!0,t)},process:function(){for(;!s.paused&&f<s.concurrency&&s.tasks.length;){var n=s.payload?s.tasks.splice(0,s.payload):s.tasks.splice(0,s.tasks.length),e=a(n,function(n){return n.data});0===s.tasks.length&&s.empty(),f+=1,l.push(n[0]);var r=u(o(s,n));t(e,r)}},length:function(){return s.tasks.length},running:function(){return f},workersList:function(){return l},idle:function(){return s.tasks.length+f===0},pause:function(){s.paused=!0},resume:function(){if(s.paused!==!1){s.paused=!1;for(var n=Math.min(s.concurrency,s.tasks.length),t=1;n>=t;t++)P.setImmediate(s.process)}}};return s}function x(n){return m(function(t,e){t.apply(null,e.concat([m(function(t,e){"object"==typeof console&&(t?console.error&&console.error(t):console[n]&&c(e,function(t){console[n](t)}))})]))})}function A(n){return function(t,e,r){n(f(t),e,r)}}function T(n){return m(function(t,e){var r=m(function(e){var r=this,u=e.pop();return n(t,function(n,t,u){n.apply(r,e.concat([u]))},u)});return e.length?r.apply(this,e):r})}function z(n){return m(function(t){var e=t.pop();t.push(function(){var n=arguments;r?P.setImmediate(function(){e.apply(null,n)}):e.apply(null,n)});var r=!0;n.apply(this,t),r=!1})}var q,P={},C="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global||this;null!=C&&(q=C.async),P.noConflict=function(){return C.async=q,P};var H=Object.prototype.toString,M=Array.isArray||function(n){return"[object Array]"===H.call(n)},U=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},W=Object.keys||function(n){var t=[];for(var e in n)n.hasOwnProperty(e)&&t.push(e);return t},B="function"==typeof setImmediate&&setImmediate,D=B?function(n){B(n)}:function(n){setTimeout(n,0)};"object"==typeof process&&"function"==typeof process.nextTick?P.nextTick=process.nextTick:P.nextTick=D,P.setImmediate=B?D:P.nextTick,P.forEach=P.each=function(n,t,e){return P.eachOf(n,y(t),e)},P.forEachSeries=P.eachSeries=function(n,t,e){return P.eachOfSeries(n,y(t),e)},P.forEachLimit=P.eachLimit=function(n,t,e,r){return v(t)(n,y(e),r)},P.forEachOf=P.eachOf=function(t,e,r){function o(n){f--,n?r(n):null===c&&0>=f&&r(null)}r=i(r||n),t=t||[];for(var c,a=h(t),f=0;null!=(c=a());)f+=1,e(t[c],c,u(o));0===f&&r(null)},P.forEachOfSeries=P.eachOfSeries=function(t,e,r){function o(){var n=!0;return null===a?r(null):(e(t[a],a,u(function(t){if(t)r(t);else{if(a=c(),null===a)return r(null);n?P.setImmediate(o):o()}})),void(n=!1))}r=i(r||n),t=t||[];var c=h(t),a=c();o()},P.forEachOfLimit=P.eachOfLimit=function(n,t,e,r){v(t)(n,e,r)},P.map=d(b),P.mapSeries=k(b),P.mapLimit=g(b),P.inject=P.foldl=P.reduce=function(n,t,e,r){P.eachOfSeries(n,function(n,r,u){e(t,n,function(n,e){t=e,u(n)})},function(n){r(n,t)})},P.foldr=P.reduceRight=function(n,e,r,u){var i=a(n,t).reverse();P.reduce(i,e,r,u)},P.transform=function(n,t,e,r){3===arguments.length&&(r=e,e=t,t=M(n)?[]:{}),P.eachOf(n,function(n,r,u){e(t,n,r,u)},function(n){r(n,t)})},P.select=P.filter=d(w),P.selectLimit=P.filterLimit=g(w),P.selectSeries=P.filterSeries=k(w),P.reject=d(O),P.rejectLimit=g(O),P.rejectSeries=k(O),P.any=P.some=S(P.eachOf,e,t),P.someLimit=S(P.eachOfLimit,e,t),P.all=P.every=S(P.eachOf,r,r),P.everyLimit=S(P.eachOfLimit,r,r),P.detect=S(P.eachOf,t,E),P.detectSeries=S(P.eachOfSeries,t,E),P.detectLimit=S(P.eachOfLimit,t,E),P.sortBy=function(n,t,e){function r(n,t){var e=n.criteria,r=t.criteria;return r>e?-1:e>r?1:0}P.map(n,function(n,e){t(n,function(t,r){t?e(t):e(null,{value:n,criteria:r})})},function(n,t){return n?e(n):void e(null,a(t.sort(r),function(n){return n.value}))})},P.auto=function(t,e,r){function u(n){g.unshift(n)}function o(n){var t=p(g,n);t>=0&&g.splice(t,1)}function a(){h--,c(g.slice(0),function(n){n()})}"function"==typeof arguments[1]&&(r=e,e=null),r=i(r||n);var f=W(t),h=f.length;if(!h)return r(null);e||(e=h);var y={},v=0,d=!1,g=[];u(function(){h||r(null,y)}),c(f,function(n){function i(){return e>v&&l(k,function(n,t){return n&&y.hasOwnProperty(t)},!0)&&!y.hasOwnProperty(n)}function c(){i()&&(v++,o(c),h[h.length-1](g,y))}if(!d){for(var f,h=M(t[n])?t[n]:[t[n]],g=m(function(t,e){if(v--,e.length<=1&&(e=e[0]),t){var u={};s(y,function(n,t){u[t]=n}),u[n]=e,d=!0,r(t,u)}else y[n]=e,P.setImmediate(a)}),k=h.slice(0,h.length-1),b=k.length;b--;){if(!(f=t[k[b]]))throw new Error("Has nonexistent dependency in "+k.join(", "));if(M(f)&&p(f,n)>=0)throw new Error("Has cyclic dependencies")}i()?(v++,h[h.length-1](g,y)):u(c)}})},P.retry=function(n,t,e){function r(n,t){if("number"==typeof t)n.times=parseInt(t,10)||i;else{if("object"!=typeof t)throw new Error("Unsupported argument type for 'times': "+typeof t);n.times=parseInt(t.times,10)||i,n.interval=parseInt(t.interval,10)||o}}function u(n,t){function e(n,e){return function(r){n(function(n,t){r(!n||e,{err:n,result:t})},t)}}function r(n){return function(t){setTimeout(function(){t(null)},n)}}for(;a.times;){var u=!(a.times-=1);c.push(e(a.task,u)),!u&&a.interval>0&&c.push(r(a.interval))}P.series(c,function(t,e){e=e[e.length-1],(n||a.callback)(e.err,e.result)})}var i=5,o=0,c=[],a={times:i,interval:o},f=arguments.length;if(1>f||f>3)throw new Error("Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)");return 2>=f&&"function"==typeof n&&(e=t,t=n),"function"!=typeof n&&r(a,n),a.callback=e,a.task=t,a.callback?u():u},P.waterfall=function(t,e){function r(n){return m(function(t,u){if(t)e.apply(null,[t].concat(u));else{var i=n.next();i?u.push(r(i)):u.push(e),z(n).apply(null,u)}})}if(e=i(e||n),!M(t)){var u=new Error("First argument to waterfall must be an array of functions");return e(u)}return t.length?void r(P.iterator(t))():e()},P.parallel=function(n,t){L(P.eachOf,n,t)},P.parallelLimit=function(n,t,e){L(v(t),n,e)},P.series=function(n,t){L(P.eachOfSeries,n,t)},P.iterator=function(n){function t(e){function r(){return n.length&&n[e].apply(null,arguments),r.next()}return r.next=function(){return e<n.length-1?t(e+1):null},r}return t(0)},P.apply=m(function(n,t){return m(function(e){return n.apply(null,t.concat(e))})}),P.concat=d(j),P.concatSeries=k(j),P.whilst=function(t,e,r){if(r=r||n,t()){var u=m(function(n,i){n?r(n):t.apply(this,i)?e(u):r.apply(null,[null].concat(i))});e(u)}else r(null)},P.doWhilst=function(n,t,e){var r=0;return P.whilst(function(){return++r<=1||t.apply(this,arguments)},n,e)},P.until=function(n,t,e){return P.whilst(function(){return!n.apply(this,arguments)},t,e)},P.doUntil=function(n,t,e){return P.doWhilst(n,function(){return!t.apply(this,arguments)},e)},P.during=function(t,e,r){r=r||n;var u=m(function(n,e){n?r(n):(e.push(i),t.apply(this,e))}),i=function(n,t){n?r(n):t?e(u):r(null)};t(i)},P.doDuring=function(n,t,e){var r=0;P.during(function(n){r++<1?n(null,!0):t.apply(this,arguments)},n,e)},P.queue=function(n,t){var e=I(function(t,e){n(t[0],e)},t,1);return e},P.priorityQueue=function(t,e){function r(n,t){return n.priority-t.priority}function u(n,t,e){for(var r=-1,u=n.length-1;u>r;){var i=r+(u-r+1>>>1);e(t,n[i])>=0?r=i:u=i-1}return r}function i(t,e,i,o){if(null!=o&&"function"!=typeof o)throw new Error("task callback must be a function");return t.started=!0,M(e)||(e=[e]),0===e.length?P.setImmediate(function(){t.drain()}):void c(e,function(e){var c={data:e,priority:i,callback:"function"==typeof o?o:n};t.tasks.splice(u(t.tasks,c,r)+1,0,c),t.tasks.length===t.concurrency&&t.saturated(),P.setImmediate(t.process)})}var o=P.queue(t,e);return o.push=function(n,t,e){i(o,n,t,e)},delete o.unshift,o},P.cargo=function(n,t){return I(n,1,t)},P.log=x("log"),P.dir=x("dir"),P.memoize=function(n,e){var r={},u={},i=Object.prototype.hasOwnProperty;e=e||t;var o=m(function(t){var o=t.pop(),c=e.apply(null,t);i.call(r,c)?P.setImmediate(function(){o.apply(null,r[c])}):i.call(u,c)?u[c].push(o):(u[c]=[o],n.apply(null,t.concat([m(function(n){r[c]=n;var t=u[c];delete u[c];for(var e=0,i=t.length;i>e;e++)t[e].apply(null,n)})])))});return o.memo=r,o.unmemoized=n,o},P.unmemoize=function(n){return function(){return(n.unmemoized||n).apply(null,arguments)}},P.times=A(P.map),P.timesSeries=A(P.mapSeries),P.timesLimit=function(n,t,e,r){return P.mapLimit(f(n),t,e,r)},P.seq=function(){var t=arguments;return m(function(e){var r=this,u=e[e.length-1];"function"==typeof u?e.pop():u=n,P.reduce(t,e,function(n,t,e){t.apply(r,n.concat([m(function(n,t){e(n,t)})]))},function(n,t){u.apply(r,[n].concat(t))})})},P.compose=function(){return P.seq.apply(null,Array.prototype.reverse.call(arguments))},P.applyEach=T(P.eachOf),P.applyEachSeries=T(P.eachOfSeries),P.forever=function(t,e){function r(n){return n?i(n):void o(r)}var i=u(e||n),o=z(t);r()},P.ensureAsync=z,P.constant=m(function(n){var t=[null].concat(n);return function(n){return n.apply(this,t)}}),P.wrapSync=P.asyncify=function(n){return m(function(t){var e,r=t.pop();try{e=n.apply(this,t)}catch(u){return r(u)}U(e)&&"function"==typeof e.then?e.then(function(n){r(null,n)})["catch"](function(n){r(n.message?n:new Error(n))}):r(null,e)})},C.async=P}();




// async.parallel with timeout
//http://davidbcalhoun.com/2014/async.parallel-with-a-simple-timeout-node-js/
async.parallelWithTimeout = function(action, timeoutInMilliseconds, tasks, callback) {
    // tasks[]: name, callback
    
    //create wrapper functions to track completion of callback
    var trackedTasks = tasks.map(function(task) {
        return function(callback) {
            task.callback(function(err, result) {
                task.isCompleted = true;
                callback(err, result);
            });
        }
    });
       
    var timeout = setTimeout(function(){
        //remove timeout, indicating errored out
        timeout = null;
        
        //log all non-completed callbacks
        for(var i=0; i<tasks.length; i++) {
            if (!tasks[i].isCompleted) {
                console.log(action + ' timeout occurred - ' + tasks[i].name);
            }
        }
                
        //timeout error
        callback('async.parallel timed out out after ' + timeoutInMilliseconds + 'ms.', null);
    }, timeoutInMilliseconds);

    async.parallel(trackedTasks, function(err, result) {
        //after all tasks are complete
        
        //if timeout occurred (and was cleared), callback has already been called
        //otherwise, clear the timeout and return the results
        if (timeout) {        
            //cancel timeout (if timeout was set longer, and all parallel tasks finished sooner)
            clearTimeout(timeout);
            
            //passthrough the data to the callback
            callback(err, result);
        }
    });
};


/** BEGIN POLYFILLS **/
(function(con) {
    "use strict";
    var groups = [],
        times = {},
        counts = {},
        f = function() {};
    var hr = "-----";
    hr += hr;
    hr += hr;
    hr += hr;
    hr += hr;
    var clear = "\n\n\n\n\n\n";
    var perf = window.performance, now = perf && (perf.now || perf.mozNow || perf.msNow || perf.oNow || perf.webkitNow);

    function getTime() {
        return (now && now.call(perf)) || (new Date().getTime());
    }
    if (!con.log || typeof(con.log) !== "function") {
        con.log = f;
    }
    if (!con.profile || typeof(con.profile) !== "function") {
        con.profile = f;
    }
    if (!con.profileEnd || typeof(con.profileEnd) !== "function") {
        con.profileEnd = f;
    }
    if (!con.timeStamp || typeof(con.timeStamp) !== "function") {
        con.timeStamp = f;
    }
    if (!con.trace || typeof(con.trace) !== "function") {
        con.trace = f;
    }
    if (!con.debug || typeof(con.debug) !== "function") {
        con.debug = con.log;
    }
    if (!con.info || typeof(con.info) !== "function") {
        con.info = con.log;
    }
    if (!con.warn || typeof(con.warn) !== "function") {
        con.warn = con.log;
    }
    if (!con.error || typeof(con.error) !== "function") {
        con.error = con.log;
    }
    if (!con.dir || typeof(con.dir) !== "function") {
        con.dir = con.log;
    }
    if (!con.dirxml || typeof(con.dirxml) !== "function") {
        con.dirxml = con.dir;
    }
    var test = false;
    if (test || !con.group) {
        con.group = function(label) {
            groups.push(label);
            con.log(hr + "\nBEGIN GROUP: " + label + "");
        };
    }
    if (test || !con.groupCollapsed) {
        con.groupCollapsed = con.group;
    }
    if (test || !con.groupEnd) {
        con.groupEnd = function() {
            con.log("END GROUP: " + groups.pop() + "\n" + hr);
        };
    }
    if (test || !con.time) {
        con.time = function(label) {
            times[label] = getTime();
        };
    }
    if (test || !con.timeEnd) {
        con.timeEnd = function(label) {
            con.log(label + ": " + (getTime() - times[label]).toFixed(3) + "ms");
            delete(times[label]);
        };
    }
    if (test || !con.assert) {
        con.assert = function(expression, label) {
            if (!expression) {
                con.error("Assertion failed: " + label);
            }
        };
    }
    if (test || !con.count) {
        con.count = function(label) {
            if (!counts[label]) {
                counts[label] = 0;
            }
            counts[label]++;
            con.log(label + ": " + counts[label]);
        };
    }
    if (test || !con.clear) {
        con.clear = function() {
            con.log(clear);
        };
    }
})(window.console = window.console || {});

!window.addEventListener && (function(WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
    WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function(type, listener) {
        var target = this;
        registry.unshift([target, type, listener,
            function(event) {
                event.currentTarget = target;
                event.preventDefault = function() {
                    event.returnValue = false;
                };
                event.stopPropagation = function() {
                    event.cancelBubble = true;
                };
                event.target = event.srcElement || target;
                listener.call(target, event);
            }
        ]);
        this.attachEvent("on" + type, registry[0][3]);
    };
    WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function(type, listener) {
        for (var index = 0, register; register = registry[index]; ++index) {
            if (register[0] == this && register[1] == type && register[2] == listener) {
                return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
            }
        }
    };
    WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function(eventObject) {
        return this.fireEvent("on" + eventObject.type, eventObject);
    };
})(window.prototype, document.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);

if (typeof CustomEvent === "undefined" || typeof CustomEvent !== "function") {
    (function() {
        function CustomEvent(event, params) {
            params = params || {
                    bubbles: false,
                    cancelable: false,
                    detail: undefined
                };
            var evt;
            if (document.createEvent) {
                evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            } else if (document.createEventObject) {
                evt = document.createEventObject();
            }
            return evt;
        }
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
    })();
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
        var k;
        if (this === null) {
            throw new TypeError('"this" is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = +fromIndex || 0;
        if (Math.abs(n) === Infinity) {
            n = 0;
        }
        if (n >= len) {
            return -1;
        }
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
        while (k < len) {
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}

if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
/** END POLYFILLS **/

var AdFuel = (function adFuelBuilder() {
    
    var slice = Array.prototype.slice;
    var noop = function() {};
    var _pageLevelTargeting = [];
    var _inheritableAdUnit;
    var _DOMLoadEventFired = false;

    var _buildAsyncCallback = function(name, callback) {
        return {
            name: name,
            callback: callback
        }
    }

    var RegistryArray = function() {
        var self = [];
        self.push = function(asset) {
            //queue singleton or registry
            //called from queueSingleton & Rocketeer generated registry.js
            //calls preQueueCallback and postQueueCallback
            //dispatches queue if _options.autoDispatch
            
            //wait on all registered modules- passing clone of asset (registry/singleton)        
            var assetClone = _clone(asset);
            
            var preQueueCallbacks = _registeredModules.filter(function(item) {
                return !!item.callbacks.preQueueCallback;
            }).map(function(item) {
                return _buildAsyncCallback(item.name, function(callback) {
                    item.callbacks.preQueueCallback(assetClone, callback);
                });
            });

            async.parallelWithTimeout('preQueue', _options.queueCallbackTimeoutInMilliseconds, preQueueCallbacks, function(err) {
                if (err) {
                    _warnLog('error calling preQueueCallbacks for registered modules', err);
                }
                
                //add asset to this array
                Array.prototype.push.call(self, asset);
                
                if (!asset[0].singleton) {
                    //registry, non-singleton
                    
                    //save page level targeting
                    _pageLevelTargeting = asset[0].targeting;
                    
                    //set inheritable ad Unit based on first slot
                    _inheritableAdUnit = asset[1].rktr_ad_id;
                }
                   
                var pageLevelRoot = asset[0].root.toUpperCase();
                _applyWindowSiteLevelOptions(pageLevelRoot);
                
                //process slots
                var registryName = asset[0].rktr_id;
                var queuedDate = new Date();
                
                for (var x = 1; x < asset.length; x++) {
                    var slot = asset[x];
                    slot.parentRegistry = registryName;
                    slot.adfuel_queued_date = queuedDate;
                    if (!slot.queued){
                        slot.queued = true;
                        
                        _rocketeerSlots.push(slot);
                    }
                }
                
                //wait on all registered modules- passing clone of rocketeer slots (registry/singleton)        
                var assetsClone = _clone(_rocketeerSlots);
                
                var postQueueCallbacks = _registeredModules.filter(function(item) {
                    return !!item.callbacks.postQueueCallback;
                }).map(function(item) {
                    return _buildAsyncCallback(item.name, function(callback) {
                        item.callbacks.postQueueCallback(assetsClone, callback);
                    });
                });
                            
                async.parallelWithTimeout('postQueue', _options.queueCallbackTimeoutInMilliseconds, postQueueCallbacks, function(err) {
                    if (err) {
                        _warnLog('error calling postQueueCallbacks for registered modules', err);
                    }                 
                    
                    if (_options.autoDispatch){
                        AdFuel.dispatchQueue();
                    }
                });
            });
        }
        return self;
    };

    /* UTILITY FUNCTIONS */

    function _isFunction(object) {
        return typeof object === 'function';
    }

    function _bind(fn, context /*, function arguments */ ) {
        if (!_isFunction(fn)) {
            throw new TypeError('Bind must be called on a function');
        }
        
        var args = slice.call(arguments, 2);

        return function bound() {
            return fn.apply(context, args.concat(slice.call(arguments)));
        };
    }

    function _logger( /* log data */ ) {
        window.console.log.apply(window.console, arguments);
    }

    function addEvent(element, event, fn) {
        if (element.addEventListener) {
            element.addEventListener(event, fn, true);
        } else if (element.attachEvent) {
            element.attachEvent('on' + event, fn);
        }
    }

    function _generateSingletonId() {
        return 'yyyxxxxyxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toString();
    }

    function _getURLParam(name) {
        var result = '';
        
        if (document.location.search) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(document.location.search);
            if (results) {
                result = results[1];
            }
        }
        
        return result;
    }

    function readCookie(name) {
        if (!document.cookie) {
            // there is no cookie, so go no further
            return null;
        } else { // there is a cookie
            var ca = document.cookie.split(';');
            var nameEQ = name + "=";
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    //delete spaces
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        }
    }

    function _clone(obj) {
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            var copyDate = new Date();
            copyDate.setTime(obj.getTime());
            return copyDate;
        }

        // Handle Array
        if (obj instanceof Array) {
            var copyArray = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copyArray[i] = _clone(obj[i]);
            }
            return copyArray;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copyObject = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copyObject[attr] = _clone(obj[attr]);
                }
            }
            return copyObject;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    //no longer used
    function _merge(source, mods){
        var dest = {};
        for (var attrname in source) { 
            if (source.hasOwnProperty(attrname)) { 
                dest[attrname] = source[attrname]; 
            }
        }
        for (var attrname in mods) {
            if (mods.hasOwnProperty(attrname)) {
                dest[attrname] = mods[attrname];
            }
        }
        return dest;
    }
   
    /* ADFUEL VARIABLES */
    var _options = { 
        refreshOnFocusOnly: false, 
        networkId: '8663477', 
        autoDispatch: true,
        exclude: [],
        queueCallbackTimeoutInMilliseconds: 300,
        dispatchCallbackTimeoutInMilliseconds: 300,
        refreshCallbackTimeoutInMilliseconds: 300
    };
    
    var _dynamicTargeting = { pageTargets: {}, slotTargets: {} };
    var _initialized = false;
    var _focused = true;
    
    var _dbgLog = (_getURLParam("debug") == "true") ? _bind(_logger, null, '[AdFuel - DEBUG]') : noop;
    var _warnLog = _bind(_logger, null, '[AdFuel - WARNING]');
    var _errLog = _bind(_logger, null, '[AdFuel - ERROR]');
    
    var _pageSlots = {};
    var _rocketeerSlots = [];

    var _adsQAPageLevelKey;
    var _adsQAPageLevelValue;

    //contains dispatchQueue functions which must be delayed until queues are dispatchable
    var _delayedDispatchQueues = [];

    //contains registered Modules (name, callbacks)
    var _registeredModules = [];

    //contains slots which can be excluded via _options.exclude or queueRegistery queueOptions.exclude
    //excluded slots must be explicitly dispatched via dispatchOptions.slots
    var _excludedSlotIds = [];
    
    function _bindReady(){
        var called = false;
        
        function ready() {
            //ensure this only executes once
            if (!called) {
                called = true;
                _dbgLog("AdFuel DOM Ready Detection");
                _DOMLoadEventFired = true;
                _dispatchAllQueues();
            }
        }
        
        function tryScroll() {
            if (!called) {
                try {
                    document.documentElement.doScroll("left");
                    ready();
                } catch (e) {
                    setTimeout(tryScroll, 10);
                }
            }
        }
        
        //listen for document DOMContentLoaded/complete/loaded/interactive
        if (document.addEventListener) { // native event
            document.addEventListener("DOMContentLoaded", ready, false);
        } else if (document.attachEvent) { // IE

            var isFrame = false;
            try {
                isFrame = window.frameElement !== null;
            } catch (e) {}

            // IE, the document is not inside a frame
            if (document.documentElement.doScroll && !isFrame) {
                tryScroll();
            }

            //todo: do we need an else?
            // IE, the document is inside a frame
            document.attachEvent("onreadystatechange", function() {
                if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive") {
                    ready();
                }
            });
        }
        
        //listen for window load/onload
        if (window.addEventListener) {
            window.addEventListener('load', ready, true);
        } else if (window.attachEvent) {
            window.attachEvent('onload', ready);
        } else {
            var fn = window.onload; // very old browser, copy old onload
            window.onload = function() { // replace by new onload and call the old one
                fn && fn();
                ready();
            };
        }
        // Fallback if adfuel is put on page post-DOMContentLoaded
        if (document.readyState === "complete" || document.readyState === "loaded" || document.readyState === "interactive") {
            ready();
        }
    }

    //occurs once upon init parsing url for adsQA page-level targeting
    function _checkForAdsQA() {
        try {
            var qaparam = _getURLParam("adsqa");
            if (qaparam) {
                var qaparamPieces = qaparam.split("%3D");
                _adsQAPageLevelKey = qaparamPieces[0];
                _adsQAPageLevelValue = qaparamPieces[1];
                _dynamicTargeting.pageTargets[_adsQAPageLevelKey] = _adsQAPageLevelValue;
            }
        } catch (err) {
            _errLog('checkForAdsQA', err);
        }
    }
    
    //this will be called each time a singleton/registry is queued
    //no need to call addPageLevelTarget/addSlotLevelTarget, because GPT Page has not been built
    function _applyWindowSiteLevelOptions(siteLvl) {
           
        if (window[siteLvl]) {
            //moved to setOptions
            //if (window[siteLvl].refreshOnFocusOnly){
            //    _options.refreshOnFocusOnly = true;
            //}

            if (window[siteLvl].adTargets) {
                for (var key in window[siteLvl].adTargets) {
                    if (window[siteLvl].adTargets.hasOwnProperty(key)) {
                        _dynamicTargeting.pageTargets[key] = window[siteLvl].adTargets[key];
                    }
                }
            }
            
            if (window[siteLvl].slotTargets) {
                for (var slotId in window[siteLvl].slotTargets) {
                    if (window[siteLvl].slotTargets.hasOwnProperty(slotId)) {
                        var slotTargeting = window[siteLvl].slotTargets[slotId];
                        if (!_dynamicTargeting.slotTargets[slotId]) {
                            _dynamicTargeting.slotTargets[slotId] = {};
                        }
                        for (var key in slotTargeting) {
                            if (slotTargeting.hasOwnProperty(key)) {
                                _dynamicTargeting.slotTargets[slotId][key] = slotTargeting[key];
                            }
                        }
                    }
                }
            }
        }
    }

    function _getCombinedSlotTargeting(rocketeerSlot) {
        var slotTargeting = _clone(rocketeerSlot.targeting);
        
        if (!Array.isArray(slotTargeting)) {
            slotTargeting = [slotTargeting];
        }

        var dynamicSlotTargeting = _dynamicTargeting.slotTargets;
        
        if (dynamicSlotTargeting[rocketeerSlot.rktr_slot_id]) {
            for (var targetId in dynamicSlotTargeting[rocketeerSlot.rktr_slot_id]) {
                if (dynamicSlotTargeting[rocketeerSlot.rktr_slot_id].hasOwnProperty(targetId)) {
                    slotTargeting.push([targetId, dynamicSlotTargeting[rocketeerSlot.rktr_slot_id][targetId]]);
                }
            }
        }
        
        return slotTargeting;
    }

    function _setFocusListener() {
        addEvent(window, 'focus', function() {
            _focused = true;
        });
        addEvent(window, 'blur', function() {
            _focused = false;
        });
    }

    function _setSlotRenderedClass() {
        addEvent(document, 'GPTRenderComplete', function(e) {
            _dbgLog("GPT Render Complete", { renderEvent: e });
            var el = document.getElementById(e.detail.divId);
            if (el && el.className.indexOf("adfuel-rendered") < 0){
                el.className += " adfuel-rendered";
            }
        });
    }

    function addPageLevelTarget(key, value) {

        _dynamicTargeting.pageTargets[key] = value;

        _googleApi.executeWhenAvailable("Adding Page Level Target", function() {
            _googleApi.setTargeting(key, value);            
        });
    }

    function removePageLevelTarget(key) {
        
        _googleApi.executeWhenAvailable("Removing Page Level Target", function() {
            _googleApi.clearTargeting(key);
            
            if (key) {
                delete _dynamicTargeting.pageTargets[key];
            } else {
                _dynamicTargeting.pageTargets = {};
                
                if (_adsQAPageLevelKey) {
                    //restore adsQA target
                    addPageLevelTarget(_adsQAPageLevelKey, _adsQAPageLevelValue);
                }
            }
        });
    }
    
    function addSlotLevelTarget(slotId, key, value) {
        
        _dynamicTargeting.slotTargets[slotId] = _dynamicTargeting.slotTargets[slotId] || {};
        _dynamicTargeting.slotTargets[slotId][key] = value;
               
        _googleApi.executeWhenAvailable("Adding Slot Level Target", function() {
            var slot = _pageSlots[slotId];
    
            if (slot) {
                //found slot
                _googleApi.setSlotTargeting(slot, key, value);
            }
        });
    }
    
    function removeSlotLevelTarget(slotId, key) {
                    
        _googleApi.executeWhenAvailable("Removing Slot Level Target", function() {
            var slot = _pageSlots[slotId];
        
            if (slot) {
                //valid slot
                var slotTargeting = {};
                
                //get existing targeting keys
                var currentTargetingKeys = slot.getTargetingKeys();
                for (var keyId in currentTargetingKeys){
                    var keyName = currentTargetingKeys[keyId];
                    slotTargeting[keyName] = slot.getTargeting(keyName);
                }
                
                if (key) {
                    //remove only key
                    delete slotTargeting[key];
                } else {
                    //remove everything but pos
                    slotTargeting = {
                        pos: slotTargeting.pos
                    }
                }
            
                _googleApi.clearSlotTargeting(slot);
                                
                //add back everything in slotTargeting
                for (var key in slotTargeting) {
                    _googleApi.setSlotTargeting(slot, key, slotTargeting[key]);
                }
            }
            
            //remove from _dynamicTargeting
            if (_dynamicTargeting.slotTargets[slotId]){
                if (key) {
                    //remove only key
                    delete _dynamicTargeting.slotTargets[slotId][key];
                } else {
                    //remove everything but pos
                    _dynamicTargeting.slotTargets[slotId].length = 0;
                }
            }
        });
    }
    
    function _buildPageLevelGPTObject() {
            
        var latlong = readCookie("gptgeo");
        if (!latlong) {
            _warnLog("Unable to retrieve location cookie", latlong);
        } else {
            //send lat/long to GPT
            var latlongPieces = latlong.split("%2C");
            
            var latitude = parseFloat(latlongPieces[0]);
            var longitude = parseFloat(latlongPieces[1]);
            
            _googleApi.executeWhenAvailable('setting location', function() {
                _googleApi.setLocation(latitude, longitude);
            });
        }
        
        _googleApi.executeWhenAvailable('setting page level targeting', function() {
            //combine page level targeting and _dynamicTargeting.pageTargets
            var targetings = _clone(_pageLevelTargeting);

            var dynamicPageTargeting = _dynamicTargeting.pageTargets;
            for (var targetId in dynamicPageTargeting) {
                if (dynamicPageTargeting.hasOwnProperty(targetId)) {
                    targetings.push([targetId, dynamicPageTargeting[targetId]]);
                }
            }

            _dbgLog("Page Level Targeting", JSON.stringify(targetings));
            
            for (var targetIndex = 0; targetIndex < targetings.length; targetIndex++) {
                var targetValue = targetings[targetIndex][1];
                _dbgLog("Setting Page-Level Targeting", targetings[targetIndex][0], targetValue);
                
                //convert targetValue to array if necessary
                if (targetValue && !Array.isArray(targetValue)) {
                    if (targetValue.indexOf(',') >= 0) {
                        targetValue = targetValue.split(',');
                    } else {
                        targetValue = [targetValue];
                    }
                }
                
                if (targetings[targetIndex][0] == "exclusions") {
                    for (var i = 0; i<targetValue.length; i++) {
                        var targetKeyValue = targetings[targetIndex][1][i];
                        _googleApi.setCategoryExclusion(targetKeyValue);                        
                    }                    
                } else {
                    var targetKey = targetings[targetIndex][0];
                    _googleApi.setTargeting(targetKey, targetValue);
                }                
            }
        });
    }

    function _renderCheck(rocketeerSlot){
        var unrenderedSlots = document.querySelectorAll("div#" + rocketeerSlot.rktr_slot_id);
        if (unrenderedSlots.length != 0){
            for (var sI = 0; sI < unrenderedSlots.length; sI++){
                var slotDiv = unrenderedSlots[sI];
                if (slotDiv.className.indexOf("adfuel-rendered") >= 0){
                    /* Element already has an ad rendered in it. */
                    _dbgLog("Found rendered slot...", rocketeerSlot.rktr_slot_id);
                } else {
                    /* Clean element ready for rendering */
                    if (unrenderedSlots.length == 1 && _pageSlots[rocketeerSlot.rktr_slot_id]){
                        /*
                         If there is only one element in unrenderedSlots and a GPT Slot object
                         already exists for this id, ignore the element count when updating the
                         slot and clear the slot.
                         */
                        var updatedSlot = _updateSlot(rocketeerSlot, true);
                        
                        //clear the slot before rendering an ad
                        clearSlots(updatedSlot.rktr_slot_id);
                        
                        return updatedSlot;
                    }
                    
                    return _updateSlot(rocketeerSlot);
                }
            }
        }
        
        //slot not found
        _warnLog("Not building slot... Can't Find Unrendered Slot On Page", rocketeerSlot.rktr_slot_id);
        return null;
    }

    function _buildSlot(rocketeerSlot) {
        
        var networkId = _options.networkId;
        
        _dbgLog("Building Slot", rocketeerSlot);
        var adPath = '/' + networkId + "/" + rocketeerSlot.rktr_ad_id;
        var slotId = rocketeerSlot.rktr_slot_id;       
        var isOutOfPageSlot = (rocketeerSlot.rktr_slot_id.indexOf("_oop") >= 1);
        var action = isOutOfPageSlot ? 'Defining OOP Slot' : 'Defining Standard Slot';
        _googleApi.executeWhenAvailable(action, function() {
            if (isOutOfPageSlot) {
                _pageSlots[slotId] = _googleApi.defineOutOfPageSlot(adPath, slotId);
            } else {
                _pageSlots[slotId] = _googleApi.defineSlot(adPath, rocketeerSlot.sizes, slotId);
            };
        });
        
        _dbgLog("Slots", _pageSlots);
        _googleApi.executeWhenAvailable('Defining slot targeting', function() {
            var slotTargeting = _getCombinedSlotTargeting(rocketeerSlot);
            for (var target in slotTargeting) {
                if (slotTargeting.hasOwnProperty(target)) {
                    var targetValue;
                    if (slotTargeting[target] && slotTargeting[target][1]) {
                        targetValue = JSON.stringify(slotTargeting[target][1]);
                    } else {
                        targetValue = "";
                    }
                    if (targetValue) {
                        targetValue = JSON.parse(targetValue);
                        var gptSlot = _pageSlots[slotId];
                        
                        if (slotTargeting[target][0] == "exclusions") {
                            if (Array.isArray(slotTargeting[target][1])) {
                                for (var targetIndex in slotTargeting[target][1]) {
                                    if (slotTargeting[target][1].hasOwnProperty(targetIndex)) {
                                        targetValue = slotTargeting[target][1][targetIndex];
                                        _googleApi.setSlotCategoryExclusion(gptSlot, targetValue);
                                    }
                                }
                            } else {
                               _googleApi.setSlotCategoryExclusion(gptSlot, targetValue);
                            }
                        } else {
                            var key = slotTargeting[target][0];
                            _googleApi.setSlotTargeting(gptSlot, key, targetValue);
                        }
                    }
                }
            }
        });
        
        _dbgLog("Checking Responsive Mapping For Slot", rocketeerSlot.responsive, rocketeerSlot.responsive.length);
        rocketeerSlot.responsive = rocketeerSlot.responsive || [];
        if (rocketeerSlot.responsive.length > 0) {
            _buildSlotMapping(rocketeerSlot.rktr_slot_id, rocketeerSlot.responsive);
        }        
    }

    function _buildSlots(rocketeerSlots, options) {
        
        /*
            options:
                ignoreCheck: false
                           
        */
        
        var builtSlots = [];
        
        function removeSlot(slot) {
            var index = _rocketeerSlots.indexOf(slot);
            if (index >= 0) {
                _rocketeerSlots.splice(index, 1);
            }                   
        }
                 
        for (var slotIndex = 0; slotIndex < rocketeerSlots.length; slotIndex++) {
            var rocketeerSlot = rocketeerSlots[slotIndex];
            
            var ignoreRenderCheck = options && options.ignoreCheck;
            var buildSlot = true;
            
            if (!ignoreRenderCheck) {
                //renderCheck may return an updatedSlot or null
                //if it updates the slot, it will modify rocketeerSlot
                if (!_renderCheck(rocketeerSlot)) {
                    //remove slot, which is no longer valid
                    removeSlot(rocketeerSlot);
                                        
                    buildSlot = false;
                }
            }
            
            if (buildSlot) {
                _buildSlot(rocketeerSlot);
                
                builtSlots.push(rocketeerSlot);
                
                removeSlot(rocketeerSlot);
            }
        }
        
        return builtSlots;
    }

    //clear slots- optional slotIds (object or array)
    function clearSlots(slotIds) {
        slotIds = slotIds || [];
        
        if (!Array.isArray(slotIds)) {
            slotIds = [slotIds];
        }
        
        _dbgLog("Clearing Slots", {slotDivIds: slotIds});
        
        _googleApi.executeWhenAvailable('clearing slots', function() {
            
            //convert to slots
            //what if passed slotIds are invalid?
            var slots = [];
            
            if (slotIds.length > 0) {
                slots = slotIds.filter(function(slotId) {
                    return !!_pageSlots[slotId]
                }).map(function(slotId) {
                    return _pageSlots[slotId];
                });
                
                if (slots.length == 0) {
                    return;
                }
            }
            
            _googleApi.clearSlots(slots);
        });
    }

    function _buildSlotMapping(slotId, responsiveMap) {
        //transform responsiveMap- convert string values to integers, allow for "suppress"
        for (var i = 0; i < responsiveMap.length; i++) {
            var val = JSON.parse(JSON.stringify(responsiveMap[i]));
            for (var x = 0; x < val.length; x++) {
                if (Array.isArray(val[x])) {
                    for (var y = 0; y < val[x].length; y++) {
                        if (Array.isArray(val[x][y])) {
                            for (var z = 0; z < val[x][y].length; z++) {
                                val[x][y][z] = parseInt(val[x][y][z]);
                            }

                        } else {
                            if (parseInt(val[x][y]) >= 0) {
                                val[x][y] = parseInt(val[x][y]);
                            } else {
                                val[x] = [];
                            }
                        }
                    }
                } else {
                    val[x] = [];
                }
            }
            responsiveMap[i] = val;
        }
        
        _googleApi.executeWhenAvailable('setting slot mappings', function() {
            _googleApi.defineSlotSizeMapping(_pageSlots[slotId], responsiveMap);
        });
    }

    function _updateSlot(slot, ignoreCount) {

        _dbgLog("Checking to see if slot div id needs updated.", {slot: slot});
        
        var idArray = slot.rktr_slot_id.split("_");
        var incrementer = idArray[idArray.length - 1];
        var orig_slot_id = idArray.join("_");
        var new_slot_id = "";
        var pageDivs;
        
        if (idArray.length == 3) {
            pageDivs = document.querySelectorAll("div#ad_mod_" + orig_slot_id);
        } else {
            pageDivs = document.querySelectorAll("div#" + orig_slot_id);
        }
        
        if (pageDivs.length > 1 || (pageDivs.length == 1 && ignoreCount)) {
            new_slot_id = orig_slot_id;
            var gptSlotDefined = _pageSlots[new_slot_id];
            while (gptSlotDefined) {
                new_slot_id = JSON.parse(JSON.stringify(orig_slot_id));
                if (idArray.length == 3) {
                    incrementer = _generateSingletonId();
                } else {
                    incrementer = parseInt(incrementer) + 1;
                    if (incrementer < 10) {
                        incrementer = "0" + String(incrementer);
                    } else {
                        incrementer = String(incrementer);
                    }
                }
                idArray[idArray.length - 1] = incrementer;
                new_slot_id = idArray.join("_");
                gptSlotDefined = _pageSlots[new_slot_id];
                if (!gptSlotDefined) {
                    _updateSlotId(slot, new_slot_id, orig_slot_id);
                    _updateDivId(orig_slot_id, new_slot_id);
                    break;
                }
            }
        }

        return slot;
    }

    function _updateSlotId(slot, new_slot_id, orig_slot_id){
        slot.rktr_slot_id = new_slot_id;
        
        try {
            var SlotIDChangeEvent = new CustomEvent('SlotIdChange', {
                "detail": {
                    "asset": slot,
                    "originalId": orig_slot_id,
                    "newId": new_slot_id
                }
            });
            document.dispatchEvent(SlotIDChangeEvent);
        
        } catch (ex) {
            _warnLog('error dispatching custom Event: SlotIdChange', ex);
        }
    }

    function _updateDivId(orig_slot_id, new_slot_id){
        var pageDivs = document.querySelectorAll("div#" + orig_slot_id);
        if (pageDivs.length > 0) {
            for (var slotIndex = 0; slotIndex < pageDivs.length; slotIndex++) {
                var el = pageDivs[slotIndex];
                if ((el.className.indexOf('adfuel-rendered') < 0 && pageDivs.length > 1) || pageDivs.length == 1) {
                    el.id = new_slot_id;
                }
            }
        }
    }

    function _isQueueDispatchable() {
        return  _initialized && _DOMLoadEventFired
    }

    //executed from init and ready, queue is only dispatchable once
    function _dispatchAllQueues() {
        if (_isQueueDispatchable()) {
            if (_delayedDispatchQueues.length > 0) {
                //process all delayed dispatch queue functions
                for(var i=0; i<_delayedDispatchQueues.length; i++) {
                    _delayedDispatchQueues[i]();
                }
                _delayedDispatchQueues.length = 0;
            } else if (_options.autoDispatch) {
                //dispatch whatever has been queued
                AdFuel.dispatchQueue();            
            }
        }
    }

    function dispatchQueue(dispatchOptions) {
        /*
            dispatchOptions:
                preDispatchCallback
                postDispatchCallback
                ignoreCheck: false
                sync: false
                syncSlots: []
                slots: []
                exclude: []
                maintainCorrelator: false
        */     
        
        if (!_isQueueDispatchable()) {
            _dbgLog("Delaying Queue Dispatch");
            _delayedDispatchQueues.push(function() {
                dispatchQueue(dispatchOptions);
            });
            return;            
        }
        
        dispatchOptions = dispatchOptions || {};          
                   
        _dbgLog("Registry", AdFuel.registry);
        _dbgLog("SlotQueue: ", _rocketeerSlots);
        _dbgLog("Dispatch Options: ", dispatchOptions);
        
        if (_rocketeerSlots.length > 0) {
            //display all slots or just the ones in requestOptions.slots
            //exclude any in requestOptions.exclude
            //if requestOptions.slots are not provided, ensure rocketeer slot is not in _excludeSlotIds (set via QueueRegistery/options.exclude)
            var slotsToDisplay = _rocketeerSlots.filter(function(slot) {
                return ((!dispatchOptions.slots || dispatchOptions.slots.length == 0 || dispatchOptions.slots.indexOf(slot.rktr_slot_id) >= 0) &&
                    (!dispatchOptions.exclude || dispatchOptions.exclude.length == 0 || dispatchOptions.exclude.indexOf(slot.rktr_slot_id) < 0) &&
                    ((dispatchOptions.slots && dispatchOptions.slots.length > 0) || _excludedSlotIds.indexOf(slot.rktr_slot_id) < 0));
            });
            
            //remove excluded slot ids if explicitly requested
            if (dispatchOptions.slots && dispatchOptions.slots.length > 0 && _excludedSlotIds.length > 0) {
                for(var i=0; i<dispatchOptions.slots.length; i++) {
                    var indexToRemove = _excludedSlotIds.indexOf(dispatchOptions.slots[i]);
                    if (indexToRemove >= 0) {
                        _excludedSlotIds.splice(indexToRemove, 1);
                    }
                }
            }
            
            var builtSlots = _buildSlots(slotsToDisplay, dispatchOptions);
            
            if (builtSlots.length > 0) {
                         
                _buildPageLevelGPTObject();
                
                //wait on all registered modules- passing clone of slotQueue            
                var builtSlotsClone = _clone(builtSlots);
                            
                var preDispatchCallbacks = _registeredModules.filter(function(item) {
                    return !!item.callbacks.preDispatchCallback;
                }).map(function(item) {
                    return _buildAsyncCallback(item.name, function(callback) {
                        item.callbacks.preDispatchCallback(builtSlotsClone, callback);
                    });
                });
                
                if (dispatchOptions && dispatchOptions.preDispatchCallback) {
                    //add optional preDispatchCallback
                    preDispatchCallbacks.push(
                        _buildAsyncCallback('dispatchOptions', function(callback) {
                            dispatchOptions.preDispatchCallback(builtSlotsClone, callback);
                        })
                    );
                }
                
                async.parallelWithTimeout('preDispatch', _options.dispatchCallbackTimeoutInMilliseconds, preDispatchCallbacks, function(err) {
                    if (err) {
                        _warnLog('error calling preDispatchCallbacks for registered modules', err);
                    }
                    
                    var displayedSlots = _sendRequest(builtSlots, dispatchOptions);
                    
                    var displayedSlotsClone = _clone(displayedSlots);
                
                    //wait on all registered modules- passing clone of slotQueue            
                    var postDispatchCallbacks = _registeredModules.filter(function(item) {
                        return !!item.callbacks.postDispatchCallback;
                    }).map(function(item) {
                        return _buildAsyncCallback(item.name, function(callback) {
                            item.callbacks.postDispatchCallback(displayedSlotsClone, callback);
                        });
                    });
                    
                    if (dispatchOptions && dispatchOptions.postDispatchCallback) {
                        //add optional postDispatchCallback
                        postDispatchCallbacks.push(
                            _buildAsyncCallback('dispatchOptions', function(callback) {
                                dispatchOptions.postDispatchCallback(displayedSlotsClone, callback);
                            })
                        );
                    }
                
                    async.parallelWithTimeout('postDispatch', _options.dispatchCallbackTimeoutInMilliseconds, postDispatchCallbacks, function(err) {
                        if (err) {
                            _warnLog('error calling postDispatchCallbacks for registered modules', err);
                        }
                    
                        _dbgLog("Slot Queue After Dispatch:", _rocketeerSlots);
                    });
                });
            }
        }
    }

    function queueRegistry(url, queueOptions) {
       
        /*
       
        queueOptions:
            preDispatchCallback
            postDispatchCallback
            sync: false
            syncSlots: []
            slots: []
            exclude: []
            maintainCorrelator: false
            dispatch: false  (options.autodispatch is ignored)
            
        */
        
        queueOptions = queueOptions || {
            //set based on autoDispatch
            dispatch: _options.autoDispatch
        }

        /* can't execute scripts - CORS
        //todo: switch to fetching json
        function _ajax(url, callback) {
            try {
                var request = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
                request.open('GET', url);
                request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                request.onload = function() {
                    if (request.status === 200) {
                        callback(request.responseText);
                    }
                }
                request.send();
                //request.onreadystatechange = function () {
                //    request.readyState > 3 && callback && callback(request.responseText);
                //};
            } catch (e) {
                window.console && console.log(e);
            }
        };
        
         _ajax(url, function(script) {
                        
            var newLength = _rocketeerSlots.length;
        
            eval("(" + script + ")");
            
            //for all newly added slots, mark as exclude if part of exclude list
            //these may only be dispatched by calling dispatchQueue with queueOptions.slots[] containg their slotIds
            if (queueOptions.exclude && queueOptions.exclude.length > 0) {
                for(var i=length; i<newLength; i++) {
                    if (queueOptions.exclude.indexOf(_rocketeerSlots[i].rktr_slot_id) >= 0) {
                        _rocketeerSlots[i].exclude = true;
                    }
                }
            }
        
            if (queueOptions.dispatch) {
                AdFuel.dispatchQueue(queueOptions);
            }
        });
        
        */
        
        if (queueOptions.exclude && queueOptions.exclude.length > 0) {
            //add non-duplicating exclude slotIds
            for(var i=0; i<queueOptions.exclude.length; i++) {
                var slotId = queueOptions.exclude[i];
                if (_excludedSlotIds.indexOf(slotId) < 0) {
                    _excludedSlotIds.push(slotId);
                }
            }
        }
        
        function scriptComplete() {
            if (queueOptions.dispatch) {
                AdFuel.dispatchQueue(queueOptions);
            }
        }
        
        //fetch url (async)
        (function(callback) {
            var a = document,
                b = a.createElement("script"),
                c = a.getElementsByTagName("script")[0],
                d = /^(complete|loaded)$/,
                e = false;
            b.type = "text/javascript";
            b.src = url;
            b.onload = b.onreadystatechange = function() {
                if (!e && !(('readyState' in b) && d.test(b.readyState))) {
                    b.onload = b.onreadystatechange = null;
                    e = true;
                    callback();
                }
            };
            c.parentNode.insertBefore(b, c);
        })(scriptComplete);

        /*
        var regScr = document.createElement("script");
        regScr.src = url;
        regScr.type = "text/javascript";
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(regScr);
        */        
    }

    function _startInterval(length, steps, oninterval) {
        steps = steps || 10;
        var speed = length / steps,
            count = 0,
            start = new Date().getTime();

        function instance()
        {
            if(count++ == steps) {
                //return true to continue repeating
                var continueInterval = oninterval();
                
                if (continueInterval) {
                    _startInterval(length, steps, oninterval);
                }
                
            } else {
                //wait longer, basing delay upon remaining time
                var diff = (new Date().getTime() - start) - (count * speed);
                window.setTimeout(instance, (speed - diff));
            }
        }

        window.setTimeout(instance, speed);
    }

    function _startTimer(length, steps, oninstance, oncomplete) {
        steps = steps || 10;
        var speed = length / steps,
            count = 0,
            start = new Date().getTime();

        function instance()
        {
            if(count++ == steps) {
                oncomplete(steps, count);
                
            } else {
                oninstance(steps, count);

                var diff = (new Date().getTime() - start) - (count * speed);
                window.setTimeout(instance, (speed - diff));
            }
        }

        window.setTimeout(instance, speed);
    }

    function refresh(slotIds, refreshOptions) {
        /***
         slotIds: optional array to refresh (empty/null=refresh all)
         
         refreshOptions:
            pageload: BOOLEAN (default is true)
            interval: INT
            preRefreshCallback: function (optional)
            postRefreshCallback: function (optional)
         ***/
         
        if (slotIds && typeof slotIds == 'object' && !refreshOptions) {
            //assume user passed refreshOptions as first argument
            refreshOptions = slotIds;
            slotIds = [];
        } else {
            refreshOptions = refreshOptions || {};
        }
        
        if (!slotIds) {
            slotIds = [];
        }
        
        //default pageload to true
        refreshOptions.pageload = (refreshOptions.pageload == undefined) ? true : refreshOptions.pageload;
        
        _dbgLog("Refresh Options", refreshOptions);
        
        var refreshSlots = function() {
        
            if (_focused || !_options.refreshOnFocusOnly) {
                
                var slotsToRefresh = [];
                var slotIdsToRefresh = [];                
                var slotIdsToCheck = [];
                        
                if (slotIds.length == 0) {
                    //refresh all- build list allowing for repeated iterations via interval option
                    for (var slotId in _pageSlots) {
                        if (_pageSlots.hasOwnProperty(slotId)) {
                            slotIdsToCheck.push(slotId);
                        }
                    }
                } else {
                    slotIdsToCheck = slotIds;
                }
                
                for (var i=0; i<slotIdsToCheck.length; i++) {
                    var slotId = slotIdsToCheck[i];
                    
                    if (document.getElementById(slotId)){
                        var slot = _pageSlots[slotId];
                        if (slot) {
                            slotsToRefresh.push(slot);
                            slotIdsToRefresh.push(slotId);
                        }
                    } else {
                        _warnLog('Cannot find element on page to refresh: ' + slotId);
                    }
                }
                
                if (slotIds.length > 0 && slotIdsToRefresh.length == 0 ) {
                    //caller sent all invalid slotIds to refresh, so do nothing
                    return;
                }
                                    
                //wait on all registered modules, preRefreshCallback
                var preRefreshCallbacks = _registeredModules.filter(function(item) {
                    return !!item.callbacks.preRefreshCallback;
                }).map(function(item) {
                    return _buildAsyncCallback(item.name, function(callback) {
                        item.callbacks.preRefreshCallback(slotIdsToRefresh, callback);
                    });
                });
                
                if (refreshOptions.preRefreshCallback) {
                    //add optional preRefreshCallback
                    preRefreshCallbacks.push(
                        _buildAsyncCallback('refreshOptions', function(callback) {
                            refreshOptions.preRefreshCallback(slotIdsToRefresh, callback);
                        })
                    );
                }
                
                async.parallelWithTimeout('preRefresh', _options.refreshCallbackTimeoutInMilliseconds, preRefreshCallbacks, function(err) {
                    if (err) {
                        _warnLog('error calling preRefreshCallbacks for all registered modules', err);
                    }
                        
                    clearSlots(slotIdsToRefresh);       
                        
                    _googleApi.updateCorrelator();
                    
                    if (refreshOptions.pageload) {
                        _googleApi.setTargeting("pageload", "ref");
                    } else {
                        _googleApi.clearTargeting("pageload");
                    }
                                    
                    _googleApi.refreshSlots(slotsToRefresh);
                    
                    //assume all slots requested were refreshed
                    var slotIdsRefreshed = slotIdsToRefresh;
                    
                    var postRefreshCallbacks = _registeredModules.filter(function(item) {
                        return !!item.callbacks.postRefreshCallback;
                    }).map(function(item) {
                        return _buildAsyncCallback(item.name, function(callback) {
                            item.callbacks.postRefreshCallback(slotIdsRefreshed, callback);
                        });
                    });
                    
                    if (refreshOptions.postRefreshCallback) {
                        //add optional postRefreshCallback
                        postRefreshCallbacks.push(
                            _buildAsyncCallback('refreshOptions', function(callback) {
                                refreshOptions.postRefreshCallback(slotIdsRefreshed, callback);
                            })
                        );
                    }
    
                    //note: may occur before GPT refresh completes
                    async.parallelWithTimeout('postRefresh', _options.refreshCallbackTimeoutInMilliseconds, postRefreshCallbacks, function(err) {
                        if (err) {
                            _warnLog('error calling postRefreshCallbacks for all registered modules', err);
                        }
                    });
                });
            }
        }
        
        function startInterval(interval) {
            _dbgLog('starting refresh interval: ' + interval, refreshOptions);
            
            var intervalInMilliseconds = interval * 1000;
            _startInterval(intervalInMilliseconds, 5, function() {
                //interval has been reached, so refresh spots
                refreshSlots();
                
                //if the interval has been removed, stop repeating
                if(!refreshOptions.interval || parseInt(refreshOptions.interval) == 0) {
                    _dbgLog('stopping refresh interval: ' + interval, refreshOptions);
                    return false;
                }
                
                //if the interval has changed, start new interval and stop repeating
                var currentInterval = parseInt(refreshOptions.interval);
                if (interval != currentInterval) {
                    _dbgLog('changing refresh interval: ' + interval, refreshOptions);
                    startInterval(currentInterval);
                    return false;
                }
                
                //repeat interval
                return true;
            });
        }
        
        if (refreshOptions.interval && parseInt(refreshOptions.interval) > 0) {
            var interval = parseInt(refreshOptions.interval);
            startInterval(interval);            
        } else {
            refreshSlots();
        }
    }

    //combined google APIs
    var _googleApi = function() {
        
        //default window.googletag.cmd
        window.googletag = window.googletag || {};
        window.googletag.cmd = window.googletag.cmd || [];

        var _pubAdsConfiged = false;
        var _isGPTAvailable = false;
        
        function isAvailable(action, obj) {
            if (!_isGPTAvailable) {
                _isGPTAvailable = window.googletag.apiReady && window.googletag.pubads;
                
                if (!_isGPTAvailable && action) {
                    _errLog("GPT is unavailable - " + action, obj);
                }
            }
                
            return _isGPTAvailable;
        }
    
        function executeWhenAvailable(action, fn) {
            window.googletag.cmd.push(fn);
        }
    
        function configurePubAds() {
            if (!_pubAdsConfiged) {
                //only execute once
                _pubAdsConfiged = true;
                
                AdFuel.requestScriptText += 'googletag.pubads().collapseEmptyDivs(true);\n';
                AdFuel.requestScriptText += 'googletag.pubads().enableAsyncRendering();\n';
                AdFuel.requestScriptText += 'googletag.pubads().enableSingleRequest();\n';
                AdFuel.requestScriptText += 'googletag.pubads().disableInitialLoad();\n';
                AdFuel.requestScriptText += 'googletag.enableServices();\n';
                
                executeWhenAvailable("Sending Request", function pushGPTServices() {
                    
                    window.googletag.pubads().addEventListener('slotRenderEnded', function(event) {
                        try {
                            var detail = {};
                            if (event.slot){ detail.asset = event.slot; }
                            if (event.slot.getTargeting("pos")){ detail.pos = event.slot.getTargeting("pos"); }
                            if (event.isEmpty){ detail.empty = true; } else { detail.empty = false; }
                            if (event.size){ detail.renderedSize = event.size; }
                            if (event.creativeId){ detail.creativeId = event.creativeId; }
                            if (event.lineItemId){ detail.lineItemId = event.lineItemId; }
                            if (event.serviceName){ detail.serviceName = event.serviceName; }
                            if (event.slot.getSlotElementId()){ detail.divId = event.slot.getSlotElementId(); }
                            _dbgLog("GPTRenderComplete Details: ", detail);
                            var renderCompleteEvent = new CustomEvent('GPTRenderComplete', {
                                "detail": detail
                            });
                            document.dispatchEvent(renderCompleteEvent);
                        } catch (ex) {
                            _warnLog('error dispatching custom Event: GPTRenderComplete', ex);
                        }
                    });

                    window.googletag.pubads().collapseEmptyDivs(true);
                    window.googletag.pubads().enableAsyncRendering();
                    window.googletag.pubads().enableSingleRequest();
                    window.googletag.pubads().disableInitialLoad();
                    window.googletag.enableServices();
                });
            }
        }
        
        function clearTargeting(key) {
            var success = false;
            
            if (isAvailable('clearing target', { key: (!!key ? key : 'all') })) {
                if (key) {
                    window.googletag.pubads().clearTargeting(key);
                } else {
                    window.googletag.pubads().clearTargeting();
                }
                
                success = true;
            }
            
            return success;
        }
        
        function setTargeting(key, value) {
            var success = false;
            
            if (isAvailable('setting target', {key: key, value: value } )) {
                //this was in refresh() to setTargeting
                //AdFuel.requestScriptText += "googletag.pubads().setTargeting('" + key + "', '" + value + "');\n";
                window.googletag.pubads().setTargeting(key, value);
                
                success = true;
            }
            
            return success;
        }
             
        function setLocation(latitude, logitude) {
            var success = false;
            
            if (isAvailable('setting location', {latitude: latitude, logitude: logitude } )) {
                window.googletag.pubads().setLocation(latitude, logitude);
                
                success = true;
            }
            
            return success;
        }
        
        function setCategoryExclusion(value) {
            var success = false;
            
            if (isAvailable('setting category exclusion: ' + value)) {
                AdFuel.requestScriptText += "googletag.pubads().setCategoryExclusion('" + value + "');\n";
                
                window.googletag.pubads().setCategoryExclusion(value);
                
                success = true;
            }
            
            return success;
        }
        
                 
        function updateCorrelator() {
            var success = false;
            
            if (isAvailable('updating correlator')) {
                
                AdFuel.requestScriptText += 'googletag.pubads().updateCorrelator();\n';
                
                window.googletag.pubads().updateCorrelator();
                
                success = true;
            }
            
            return success;
        }
        
        function defineOutOfPageSlot(adPath, slotId) {
            var result;
            
            if (isAvailable('defining out of page slot', { adPath: adPath, slotId: slotId } )) {
                _dbgLog("Building OOP Slot Object", { adPath: adPath, slotId: slotId } );
            
                AdFuel.requestScriptText += "\n_pageSlots['" + slotId + "'] = googletag.defineOutOfPageSlot('" + adPath + "', '" + slotId + "').addService(googletag.pubads());\n";
            
                result = window.googletag.defineOutOfPageSlot(adPath, slotId).addService(window.googletag.pubads());
            }
            
            return result;
        }
        
        function defineSlot(adPath, sizes, slotId) {
            var result;
            
            if (isAvailable('defining standard slot', { adPath: adPath, sizes: sizes, slotId: slotId } )) {
                _dbgLog("Building Standard Slot Object", { adPath: adPath, sizes: sizes, slotId: slotId } );
            
                AdFuel.requestScriptText += "\n_pageSlots['" + slotId + "'] = googletag.defineSlot('" + adPath + "', " + 
                    JSON.stringify(sizes) + ", '" + slotId + "').addService(googletag.pubads());\n";
            
                result = window.googletag.defineSlot(adPath, sizes, slotId).addService(window.googletag.pubads());
            }
            
            return result;
        }
        
        function setSlotCategoryExclusion(slot, value) {
            var slotId = slot.getSlotElementId();
            
            _dbgLog("Setting Slot Category Exclusion", { slotId: slotId, value: value });
                                    
            AdFuel.requestScriptText += "_pageSlots['" + slotId + "'].setCategoryExclusion('" + value + "');\n";
            
            slot.setCategoryExclusion(value);
        }
           
        function setSlotTargeting(slot, key, value) {
            var slotId = slot.getSlotElementId();
            
            _dbgLog("Setting Slot Targeting", { slotId: slotId, key: key, value: value });
        
            AdFuel.requestScriptText += "_pageSlots['" + slotId + "'].setTargeting('" + key + "', '" + value + "');\n";
            
            slot.setTargeting(key, value);
        } 
        
        function defineSlotSizeMapping(slot, responsiveMap) {
            var slotId = slot.getSlotElementId();
            
            _dbgLog("Setting Slot size mapping", { slotId: slotId, responsiveMap: responsiveMap });
        
            AdFuel.requestScriptText += "_pageSlots['" + slotId + "'].defineSizeMapping('" + JSON.stringify(responsiveMap) + "');\n";
            
            slot.defineSizeMapping(responsiveMap);
        }
                                    
        function displaySlotById(slotId) {
            _dbgLog("Displaying Slot: " + slotId);
        
            AdFuel.requestScriptText += 'googletag.display("' + slotId + '");\n';
            
            window.googletag.display(slotId);
        }
                
        function clearSlotTargeting(slot) {
            var slotId = slot.getSlotElementId();
            
            _dbgLog("Clearing targeting for Slot: " + slotId);
        
            AdFuel.requestScriptText += "_pageSlots['" + slotId + "'].clearTargeting();\n";
            
            slot.clearTargeting();
        }
        
        function clearSlots(slots) {
            
            var slotIds = (slots.length == 0) ? 'all' : 
                slots.map(function(slot) {
                    return slot.getSlotElementId();
                }).join(',');
                    
            AdFuel.requestScriptText += 'googletag.pubads().clear(' + slotIds + ');\n';
                
            if (slots.length > 0) {
                window.googletag.pubads().clear(slots);
            } else {
                window.googletag.pubads().clear();
            }
        }
                    
        function refreshSlots(slots) {
            
            var slotIds = (slots.length == 0) ? 'all' : 
                slots.map(function(slot) {
                    return slot.getSlotElementId();
                }).join(',');
                            
            AdFuel.requestScriptText += 'googletag.pubads().refresh(' + slotIds + ');\n';
            
            if (slots.length > 0) {
                window.googletag.pubads().refresh(slots);
            } else {
                window.googletag.pubads().refresh();
            }
        }
                
        return {
            executeWhenAvailable: executeWhenAvailable,
            isAvailable: isAvailable,
            configurePubAds: configurePubAds,
            clearTargeting: clearTargeting,
            setTargeting: setTargeting,
            setLocation: setLocation,
            setCategoryExclusion: setCategoryExclusion,
            updateCorrelator: updateCorrelator,
            defineOutOfPageSlot: defineOutOfPageSlot,
            defineSlot: defineSlot,
            setSlotCategoryExclusion: setSlotCategoryExclusion,
            setSlotTargeting: setSlotTargeting,
            displaySlotById: displaySlotById,
            defineSlotSizeMapping: defineSlotSizeMapping,
            refreshSlots: refreshSlots,
            clearSlots: clearSlots,
            clearSlotTargeting: clearSlotTargeting
        }
    }();
        
    function _sendRequest(rocketeerSlots, requestOptions) {
        /*
            rOptions: {
                sync: false, 
                syncSlots: [],
                maintainCorrelator: false 
             };
        */
        
        _dbgLog("Sending Request...", rocketeerSlots);
                    
        requestOptions = requestOptions || { sync: false, syncSlots: [], maintainCorrelator: false };
        
        var displayedSlots = [];
        
        _googleApi.configurePubAds();
        
        var displaySlot = function(slotId) {
            _googleApi.executeWhenAvailable('displaying slot', function() {
                _googleApi.displaySlotById(slotId);
            });
        }
            
        for(var i=0; i<rocketeerSlots.length; i++) {
            
            var slotId = rocketeerSlots[i].rktr_slot_id;
            
            if (!document.getElementById(slotId)) {
                _warnLog("Can't Find Slot On Page", slotId);
            } else {
                //solve closure issue with slotId
                displaySlot(slotId);
                                
                displayedSlots.push(rocketeerSlots[i]);
            }
        }
                
        var displayedSlotIds = displayedSlots.map(function(displayedSlot) {
            return displayedSlot.rktr_slot_id;
        })
        
        _googleApi.executeWhenAvailable('refreshing slots', function() {
            //all displayed slots must be refreshed to have their ad populated
            //when syncing also include requestOptions.syncSlots
            var slotsToRefresh = [];
            
            for (var slotDivId in _pageSlots) {
                if (_pageSlots.hasOwnProperty(slotDivId)) {
                    //keep all slots or the ones matching requestOptions.syncSlots or the ones matching displayedSlotIds
                    if ((requestOptions.sync && 
                        (!requestOptions.syncSlots || requestOptions.syncSlots.length == 0 || 
                        requestOptions.syncSlots.indexOf(slotDivId) >= 0)
                        ) || displayedSlotIds.indexOf(slotDivId) >= 0) {
                        
                        slotsToRefresh.push(_pageSlots[slotDivId]);
                    }
                }
            }
                           
            _googleApi.refreshSlots(slotsToRefresh);            
        });
        
        if (!requestOptions.maintainCorrelator) {
            _googleApi.executeWhenAvailable('updating correlator', _googleApi.updateCorrelator);
        }
        
        try {
            var requestCompleteEvent = new CustomEvent('AdFuelRequestComplete', {
                "detail": {
                    "slots": JSON.parse(JSON.stringify(displayedSlots)),
                    "options": requestOptions
                }
            });
            
            document.dispatchEvent(requestCompleteEvent);
        
        } catch (ex) {
            _warnLog('error dispatching custom Event: AdFuelRequestComplete', ex);
        }
              
        return displayedSlots;     
    }

    function setBulkTargeting(targeting) {
        if (targeting) {
            for (var key in targeting) {
                if (targeting.hasOwnProperty(key)) {
                    if (key == "slotTargets"){
                        for (var key2 in targeting[key]){
                            if (targeting[key].hasOwnProperty(key2)) {
                                AdFuel.addSlotLevelTarget(key, key2, targeting[key][key2]);
                            }
                        }
                    }else if (key == "adTargets"){
                        for (var key2 in targeting[key]){
                            if (targeting[key].hasOwnProperty(key2)) {
                                AdFuel.addPageLevelTarget(key, targeting[key]);
                            }
                        }
                    }else{
                        // For backwards compatibility
                        AdFuel.addPageLevelTarget(key, targeting[key]);
                    }
                }
            }
        }
    }

    /* FOR BACKWARDS COMPATIBILITY */
    function logit(msg, groupTitle) {
        _dbgLog(groupTitle, msg);
    }

    function queueSingleton(queueOptions) {
        _dbgLog("Queuing Singleton", queueOptions);
        queueOptions.size = queueOptions.size || [
                [88, 31]
            ];
        queueOptions.targets = queueOptions.targets || [];
        queueOptions.responsive = queueOptions.responsive || [];
        
        var originalDiv = queueOptions.divId;
        
        if (queueOptions.inherit && _inheritableAdUnit) {
            queueOptions.adunit = _inheritableAdUnit;
        }
        
        if (queueOptions.adunit.indexOf("/") >= 0) {
            var nId = queueOptions.adunit.split("/")[0];
            if (parseInt(nId) > 0) {
                var adUnitArray = queueOptions.adunit.split("/");
                adUnitArray.splice(0, 1);
                queueOptions.adunit = adUnitArray.join('/');
            }
        }

        var pageLevel = {
            "singleton": true,
            "rktr_slot_id": "page",
            "rktr_id": "singleton_"+originalDiv,
            "gpt_id": _options.networkId,
            "orig_slot_id": originalDiv,
            "site": queueOptions.adunit.split("/")[0],
            "root": queueOptions.adunit.split("/")[0].toUpperCase(),
            "responsive": [],
            "requested": false
        };

        if(_pageLevelTargeting && queueOptions.targets.length > 0) {
            //remove matching page-level targeting from this slot
            var slotTargets = [];
            
            for (var i = 0; i < queueOptions.targets.length; i++) {
                var slotTarget = queueOptions.targets[i];
                var pageLevelTargetFound = false;
                
                for (var j = 0; j < _pageLevelTargeting.length; j++) {
                    if (_pageLevelTargeting[j][0] == slotTarget[0]) {
                        pageLevelTargetFound = true;
                    }
                }
                
                if (!pageLevelTargetFound) {
                    slotTargets.push(slotTarget);
                }
            }
            
            queueOptions.targets = slotTargets;
        }

        pageLevel.targeting = _pageLevelTargeting;

        var regObj = {
            present: true,
            responsive: queueOptions.responsive,
            rktr_slot_id: queueOptions.divId,
            sizes: queueOptions.size,
            targeting: queueOptions.targets,
            rktr_ad_id: queueOptions.adunit,
            inherit: queueOptions.inherit
        };

        var regObj = _renderCheck(regObj);
        var reg = [pageLevel, regObj];
        AdFuel.registry.push(reg);
        
        if (queueOptions.dispatch) {
            //dispatch this one slot
            AdFuel.dispatchQueue({slots:[queueOptions.divId]});
        }
    }
    
    //backward compatibility- always dispatch regardless of options.autodispatch
    function processNewRegistry(url) {
        queueRegistry(url, {dispatch: true});        
    }
    
    function reloadAd(divId, pageload, updateCorrelator) {
        AdFuel.refresh([divId], {
            pageload: pageload,
            interval: 0,
            updateCorrelator: updateCorrelator
        });
    }
    function refreshAd(divId, interval, pageload, updateCorrelator) {
        AdFuel.refresh([divId], {
            pageload: pageload || false,
            interval: interval || 0,
            updateCorrelator: updateCorrelator || true
        });
    }
    function refreshAds(divIds, interval, pageload, updateCorrelator) {
        AdFuel.refresh(divIds, {
            pageload: pageload || false,
            interval: interval || 0,
            updateCorrelator: updateCorrelator || true
        });
    }
    function refreshAllAds(interval, pageload, updateCorrelator) {
        var refreshOpts = {
            pageload: pageload || false,
            interval: interval || 0,
            updateCorrelator: updateCorrelator || true
        };
        AdFuel.refresh([], refreshOpts);
        return true;
    }
    
    function renderSingleSlot(divId, size, targets, responsive, adunit, delay, inherit, dispatch) {
        
        if (divId.indexOf("ad_carousel_slide") >= 0) {
            adunit = "NBA/homepage";
        }
                
        queueSingleton({
            divId: divId,
            size: size,
            targets: targets,
            responsive: responsive,
            adunit: adunit,
            delay: delay,
            inherit: inherit,
            //default to dispatch unless explicitly set
            dispatch: (dispatch == undefined ? true : dispatch),
            sync: false,
            syncSlots: []
        });
    }
    
    function _addDebugEvents(){
        addEvent(document, 'AdFuelRequestComplete', function(e) {
            _dbgLog("AdFuel Request Complete", {
                requestEvent: e
            });
        });

        addEvent(document, 'GPTRenderComplete', function(e) {
            _dbgLog("GPT Render Complete", {
                renderEvent: e
            });
        });

        addEvent(document, 'GPTSlotBuildComplete', function(e) {
            _dbgLog("GPT Slot Build Complete", {
                renderEvent: e
            });
        });

        addEvent(document, 'SlotIdChange', function(e){
            _dbgLog("Slot ID Change", {
                idChangeEvent: e
            });
        })
    }
    
    function init() {
        //only occur once
        if (!_initialized) {
            _initialized = true;
                        
            _setFocusListener();
            _setSlotRenderedClass();
            _checkForAdsQA();
            _addDebugEvents();
            _bindReady()
            
            _dispatchAllQueues();
            
            try {
                //trigger AdFuelCreated event, so pre-loaded modules can register
                var adFuelCreatedEvent = new CustomEvent('AdFuelCreated', {
                    "detail": {
                        "AdFuel": window.AdFuel
                    }
                });
                document.dispatchEvent(adFuelCreatedEvent);
            
            } catch (ex) {
                _warnLog('error dispatching custom Event: AdFuelCreated', ex);
            }
        }
    }

    function getQueuedSlots() {
        return _clone(_rocketeerSlots);
    }

    function getSlotDetails(slotId) {
        var matchingRocketeerSlot;
        
        for(var i=0; i<AdFuel.registry.length; i++) {
            var reg = AdFuel.registry[i];
            for(var j=1; j<reg.length; j++) {
                var rocketeerSlot = reg[j];
                                
                if (rocketeerSlot.rktr_slot_id == slotId) {
                    matchingRocketeerSlot = _clone(rocketeerSlot);
                }
            }
        }                
        
        var adUnitPath;
        var slotTargeting = {};
        
        var slot = _pageSlots[slotId];
        
        if (slot) {
            //get adUnit
            adUnitPath = slot.getAdUnitPath();
            
            //get targeting keys
            var currentTargetingKeys = slot.getTargetingKeys();
            for (var keyId in currentTargetingKeys){
                var keyName = currentTargetingKeys[keyId];
                slotTargeting[keyName] = slot.getTargeting(keyName);
            }            
        }
               
        return {
            adUnit: adUnitPath,
            slot: matchingRocketeerSlot,
            slotTargeting: slotTargeting
        }
    }

    function registerModule(name, callbacks) {
        _dbgLog('registering module: ' + name);
        
        var index = -1;
        
        for(var i=0; i<_registeredModules.length; i++) {
            if (_registeredModules[i].name == name) {
                index = i;
            }
        }
                        
        if (index >= 0) {
            //replace callbacks
            _registeredModules[index].callbacks = callbacks;
        } else {
            //add module
            _registeredModules.push({
                name: name,
                callbacks: callbacks
            });
        }        
    }
    
    function unregisterModule(name) {
        //remove module, if it's found
        var indexToRemove = -1;
        for(var i=0; i<_registeredModules.length; i++) {
            if (_registeredModules[i].name == name) {
                indexToRemove = i;
            }
        }
        
        if (indexToRemove >= 0) {
            _registeredModules.splice(indexToRemove, 1);
        }        
    }    
    
    function requireInit(fn) {
        var callee = arguments.callee;
        var caller = "window/console";
        try {
            caller = callee.caller.toString();
        } catch(err){
            caller = "window/console";
        }
        
        return function requiringInitialization() {
            if (!_initialized) {
                _errLog('ERROR: AdFuel must be initialized first!');
                _dbgLog(
                    "------------------FUNCTION --------------------",
                    fn,
                    "--------------- END FUNCTION ------------------",
                    "called by: " + caller
                );
                return;
            } else {
                fn.apply(this, arguments);
            }
        };
    }
    
    function setOptions(options) {
        if (options) {
            //apply options
            
            if (options.exclude && options.exclude.length > 0) {
                //add non-duplicating exclude slotIds
                for(var i=0; i<options.exclude.length; i++) {
                    var slotId = options.exclude[i];
                    if (_excludedSlotIds.indexOf(slotId) < 0) {
                        _excludedSlotIds.push(slotId);
                    }
                }
            }
            
            for (var key in options) {
                if (options.hasOwnProperty(key)){
                    _options[key] = options[key];
                }
            }
        }        
    }

    return ({
        init: init,
        logit: logit,
        addEvent: addEvent,
        setOptions: setOptions,
         
        /////////// backward compatibility //////////////////
        clearSlot: requireInit(clearSlots),
        clearSlots: requireInit(clearSlots),
        clearAllSlots: requireInit(clearSlots),
        queueSingleton: queueSingleton,
        processNewRegistry: processNewRegistry,
        reloadAd: requireInit(reloadAd),
        refreshAd: requireInit(refreshAd),
        refreshAds: requireInit(refreshAds),
        refreshAllAds: requireInit(refreshAllAds),
        renderSingleSlot: renderSingleSlot,
        requestAndRenderAds: dispatchQueue,
        ///////////////////////////////////////////////////
        
        // for old rubicon passbacks
        pageSlots: _pageSlots,
        pageSlotsObj: _pageSlots,
        ///////////////////////////////////////////////////
        
        setBulkTargeting: setBulkTargeting,
        dispatchQueue: dispatchQueue,
        queueRegistry: queueRegistry,
        getQueuedSlots: getQueuedSlots,
        getSlotDetails: getSlotDetails,
        refresh: requireInit(refresh),
        removePageLevelTarget: requireInit(removePageLevelTarget),
        removeSlotLevelTarget: requireInit(removeSlotLevelTarget),
        addPageLevelTarget: requireInit(addPageLevelTarget),
        addSlotLevelTarget: requireInit(addSlotLevelTarget),
        generateSingletonId: _generateSingletonId,
        registry: new RegistryArray(),
        requestScriptText: "",
        
        //required by registry.js files
        readCookie: readCookie,
        
        //module registration
        registerModule: registerModule,
        unregisterModule: unregisterModule

    });

})();

// For Backwards Compatibility
window.AMPTManager = window.AdFuel;

window.AdFuel.init();
