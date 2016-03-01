// We need to set the environment which is coming from headIncludes.jsp
if (ccrEtData && ccrEtData.environment) {
	oca.config.environment = ccrEtData.environment;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Firebug Safety Measures
// remove this snippet once support for IE8 is dropped
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function safeFirebug(){
	if (!('console' in window) || !(window.console && ('firebug' in window.console))) { // if Firebug is not installed
		var firebugFunctions = ['log', 'debug', 'info', 'warn', 'error', 'assert', 'clear', 'dir', 'dirxml', 'trace', 'group', 'groupCollapsed', 'groupEnd', 'time', 'timeEnd', 'timeStamp', 'profile', 'profileEnd', 'exception', 'count', 'table'],
			console = window.console || {}; // use existing console object if any
		console.firebug = '0'; // add a dummy firebug version

		for (var i = 0, name, fc; i < firebugFunctions.length; ++i) {
			name = firebugFunctions[i];
			fc = console[name];
			if (!fc) { // if the method doesn't exist yet
				console[name] = function(){}; // assign a dummy function to it
				console[name].dummy = true; // put a marker to know that it's a dummy function
			} else if (!fc.apply) { // if the console method already exists but is a dummy object (probably IE8)
				//alert('simulate name = ' + name);
				//switch (name) { // some common console methods can be wrapped inside a function to restore .apply()
				//case 'log':
				//case 'debug':
				//case 'info':
				//case 'warn':
				//case 'error':
				console[name] = (function(oldFc){
					if (!Function.prototype.bind && (typeof oldFc == 'object')) { // detect non-standard function object made by IE8 or 9
						return function () {
							return Function.prototype.call.call(oldFc, this, Array.prototype.slice.call(arguments));
						}
					} else { // for more modern browsers
						return Function.prototype.call.bind(console.log, console);
					}
				})(fc);
				//}
			}
		} // end of loop
		if (!console.log.dummy) { // if the console.log is not a dummy function, create copies of this function for other "log"-type methods
			for (var i = 0, logMethods = ['debug', 'info', 'error', 'warn'], name;
			i < logMethods.length;
			i++) {
				name = logMethods[i];
				if (console[name].dummy) {
					console[name] = console.log;
				}
			}
		}
		if (console.exception.dummy && console.error) { // if console.exception is a dummy, try to use console.error
			console.exception = console.error;
		}
		window.console = console;
	}
} // end of function safeFirebug()
safeFirebug();
