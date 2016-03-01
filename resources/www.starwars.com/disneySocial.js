/*
 * Copyright (c) 2013 The Walt Disney Company
 * 
 * Social Hub authors:
 * Benjamin Taggart
 * David Millet
 * Rushin Liu
 *
 */

;(function() {

	var BUILT_FLIGHT_NAME = '1.130.0';
	var DEBUG_CONFIG_STORAGE_KEY = 'disney-social-debug';



	var scriptUtil = {
		__init: function() {
			if(!this.script && !this.flightRoot) {
				var urlRegex = /^([^?#]*\/)disneySocial\.js(\?.*)?$/;
				var vals;

				var scripts = document.getElementsByTagName('script');
				for(var i=0; i<scripts.length; i++) {
					vals = scripts[i].src.match(urlRegex);
					if(vals && scripts[i]._touchedByDisneyMagic !== true) {
						this.script = scripts[i];
						this.script._touchedByDisneyMagic = true;
						this.flightRoot = vals[1];
						break;
					}
				}
			}
		},
		flightRoot: null,
		script: null
	};

	scriptUtil.__init();





	function DebugConfiguration() {
		var config = {
			overrideFlight: false
		};
		var text = sessionStorage.getItem(DEBUG_CONFIG_STORAGE_KEY);
		if(text) {
			try {
				config = JSON.parse(text);
			} catch(e) {
				console.info('could not understand sessionStorage debug config');
			}
		}
		return config;
	}
	DebugConfiguration.onStore = function(callback) {
		this._storeCallbacks.push(callback);
	};
	DebugConfiguration.updateValues = function(debugConfig,values) {
		if(values) {
			for(var name in values) {
				debugConfig[name] = values[name];
			}
		}
	};
	DebugConfiguration.store = function(debugConfig) {
		var json = "{}";
		try {
			json = JSON.stringify(debugConfig);
		} catch(e) {
			console.info('could not parse passed values');
			return;
		}
		sessionStorage.setItem(DEBUG_CONFIG_STORAGE_KEY,json);
		for(var i=0; i<this._storeCallbacks.length; i++) {
			this._storeCallbacks[i].apply(this,[debugConfig]);
		}
	};
	DebugConfiguration.clearStorage = function() {
		sessionStorage.removeItem(DEBUG_CONFIG_STORAGE_KEY);
	};
	DebugConfiguration._storeCallbacks = [];



	function FlightHost() {
		this.hostScript = scriptUtil.script;
		this.hostFlightRoot = scriptUtil.flightRoot;
		this.__checkForOverriding();

		var host = this;

		DebugConfiguration.onStore(function(debugConfig) {
			if(debugConfig.overrideFlight && host.guestFlightRoot !== debugConfig.overrideFlight) {
				location.reload();
			}
			if(!debugConfig.overrideFlight && host.guestFlightRoot) {
				location.reload();
			}
		});
	}
	FlightHost.prototype.hostScript = null;
	FlightHost.prototype.hostFlightRoot = null;
	FlightHost.prototype.guestScript = null;
	FlightHost.prototype.guestFlightRoot = null;
	FlightHost.prototype.overrideNeeded = function() {
		return false; //BMT: this.guestFlightRoot && this.guestFlightRoot !== this.hostFlightRoot;
	};
	FlightHost.prototype.updateOverride = function(guestFlightRoot) {
		if(!guestFlightRoot || guestFlightRoot.length === 0) {
			this.clearOverride();
		} else {
			this.__setOverride(guestFlightRoot);
		}
	};
	FlightHost.prototype.clearOverride = function() {
		this.__setOverride(false);
	};
	FlightHost.prototype.doOverride = function() {
		var parentNode = this.hostScript && this.hostScript.parentNode ? this.hostScript.parentNode : null;
		var src = this.guestFlightRoot + 'disneySocial.js';
		var config = this.hostScript && this.hostScript.getAttribute('data-config') ? this.hostScript.getAttribute('data-config') : "";

		if(document.readyState === "loading") {
			document.write('<scr' + 'ipt src="' + src.replace(/"/g,"&quot;") + '" data-config="' + config.replace(/"/g,"&quot;") + '"></scr' + 'ipt>');
		} else {
			var scr = document.createElement('script');
			scr.src = src;
			scr.setAttribute('data-config',config);
			if(parentNode) {
				parentNode.insertBefore(scr,this._script);
			} else {
				document.body.appendChild(scr);
			}
		}
	};
	FlightHost.prototype.getActiveFlightRoot = function() {
		if(this.guestFlightRoot && this.guestFlightRoot.length > 0) {
			return this.guestFlightRoot;
		}
		return this.hostFlightRoot;
	};
	FlightHost.prototype.getActiveScript = function() {
		if(this.guestScript) {
			return this.guestScript;
		}
		return this.hostScript;
	};
	FlightHost.prototype.__checkForOverriding = function() {
		/* BMT
		var config = new DebugConfiguration();
		if(config.overrideFlight) {
			this.guestFlightRoot = config.overrideFlight;
			if(!/\/$/.test(this.guestFlightRoot)) {
				this.guestFlightRoot = this.guestFlightRoot + "/";
			}
		}
		*/
	};
	FlightHost.prototype.__setOverride = function(flightRoot) {
		var config = new DebugConfiguration();
		config.overrideFlight = flightRoot || false;
		DebugConfiguration.store(config);
	};




	var flightHost;

	if(window.__disneySocialFlightHost) {
		flightHost = __disneySocialFlightHost;
		flightHost.guestScript = scriptUtil.script;
	} else {
		flightHost = new FlightHost();
		if(flightHost.overrideNeeded()) {
			window.__disneySocialFlightHost = flightHost;
			__disneySocialFlightHost.doOverride();
			return;
		}
	}





	function Flight(root) {
		if(!/\/$/.test(root)) {
			root += "/";
		}

		if(Flight.instances[root]) {
			return Flight.instances[root];
		}

		Flight.instances[root] = this;
		this.root = root;
		this.name = root.match(/\/([^\/]*)$/)[1];

		this._aliases = [];
	}
	Flight.instances = {};
	Flight.prototype.getUrl = function(path) {
		return this.root + path;
	};
	Flight.prototype.addAlias = function(flight) {
		if(this._aliases.indexOf(flight) === -1) {
			this._aliases.push(flight);
			flight.addAlias(this);
		}
	};
	Flight.prototype.testUrl = function(url) {
		function doTest(flight) {
			return url.indexOf(flight.root) === 0 || (url + "/").indexOf(flight.root) === 0;
		}

		if(doTest(this))
			return true;
		for(var i=0; i<this._aliases.length; i++) {
			if(doTest(this._aliases[i]))
				return true;
		}
		return false;
	};
	Flight.prototype.testFlight = function(testFlight) {
		function doTest(flight) {
			return flight === testFlight;
		}

		if(doTest(this))
			return true;
		for(var i=0; i<this._aliases.length; i++) {
			if(doTest(this._aliases[i]))
				return true;
		}
		return false;
	};






	function PartnerConfiguration(config) {
		config = config || {};
		var lang = document.documentElement.getAttribute("lang");
		if (lang && lang.length > 0) {
			this.language = lang;
		}
		for(var prop in config) {
			this[prop] = config[prop];
		}
	}
	PartnerConfiguration.prototype = {
		language: 'en'
	};
	PartnerConfiguration.fromScript = function(script) {
		if(script) {
			var configStr = script.getAttribute('data-config');
			if(configStr) {
				var config = {};
		
				try {
					config = JSON.parse(configStr);
				} catch(e) {
					throw new Error('disneySocial: unable to parse config');
				}

				config = new PartnerConfiguration(config);
				return config;
			}
		}
		return null;
	};

	function DebugIframe(url) {
		var ifr;

		var debugConfig = new DebugConfiguration();

		var configStr = JSON.stringify(debugConfig).replace(/"/g,"\"");

		try {
			ifr = document.createElement('<iframe src="' + url + '" name="' + configStr + '" frameborder="0" allowtransparency="true" scrolling="no"></iframe>');
		} catch(e){}
		
		if(!ifr) {
			ifr = document.createElement('iframe');
			ifr.src = url;
			ifr.name = configStr;
			ifr.setAttribute('frameborder',0);
			ifr.setAttribute('allowtransparency',true);
			ifr.setAttribute('scrolling',"no");
		}
		
		for(var prop in this)
			ifr[prop] = this[prop];

		(function Construct() {

			this.className = "disney-social-iframe";
			this.height = 0;
			this.style.position = "fixed";

			function elementInBody(elem) {
				if(elem.parentNode) {
					if(elem.parentNode.nodeName === "BODY") {
						return true;
					}
					return elementInBody(elem.parentNode);
				} else {
					return false;
				}
			}

			function addToBody() {
				if(elementInBody(ifr)) {
					clearInterval(intrvl);
				} else {
					if(document.body) {
						try {
							document.body.appendChild(ifr);
						} catch(e){}
					}
				}
			}

			var intrvl = setInterval(addToBody,100);

			addToBody();

			if(debugConfig.keepOpen) {
				this.debugMode();
			} else {
				this.invisibleMode();
			}

		}).apply(ifr);


		window.addEventListener('message', function onDebugMessage(event)
		{
			if (event && event.source === ifr.contentWindow && event.data)
			{
				if(event.data.indexOf("social-debug.") === 0) {
					var msg = event.data.substr(13);
					if (msg === "open")
					{
						ifr.debugMode();
					}
					else if (msg === "close")
					{
						ifr.invisibleMode();
					}
					else if (msg === "toggle")
					{ 
						ifr.toggleMode();
					}
					else if (msg.indexOf("setOptions:") === 0)
					{
						var opt = msg.substr(11);
						var values = null;
						try
						{
							values = JSON.parse(opt);
						}
						catch (e) {}
						if (!values)
						{
							DebugConfiguration.clearStorage();
						}
						else
						{
							var debugConfig = new DebugConfiguration();
							DebugConfiguration.updateValues(debugConfig,values);
							DebugConfiguration.store(debugConfig);
						}
					}
				}

				if (event.data.indexOf('width') === 0)
				{
					var matches = event.data.match(/ height:([^;]*)/);
					if(matches)
						ifr.style.height = matches[1];
				}
			}
		});

		
		return ifr;	
	
	}
	DebugIframe.prototype.toggleMode = function() {
		if(this._invisible) {
			this.debugMode();
		} else {
			this.invisibleMode();
		}
	};
	DebugIframe.prototype.invisibleMode = function() {
		this._invisible = true;
		this.style.zIndex = 0;
		this.style.left = "-999999cm";
		this.style.top = "-999999cm";
		this.style.width = 0;
		this.style.height = 0;
	};
	DebugIframe.prototype.debugMode = function() {
		this._invisible = false;
		this.style.zIndex = 99999999999;
		this.style.left = 0;
		this.style.top = 0;
		this.style.width = "100%";
		this.style.height = this.height + "px";
	};


	function PartnerAPI(partnerConfiguration) {
		this.flight = flightUtil.flight;
		this.flightRoot = this.flight.root;

		this._amd = new AMD_API();
		this.require = this.require.bind(this);
		this.define = this.define.bind(this);
		this._amd.setRootUrl(this.flight.getUrl("partnerApi/"));

		this.__init(partnerConfiguration);

		var src = this.flight.getUrl('bootstraps/disneySocialConfig.html');
		this._iframe = new DebugIframe(src);

		// components
		this.avatar = new ServiceInterface(this, 'ui/Avatar', 
			['getAvatar', 'subscribeToAvatar', 'pickAvatar', 'setPixelDensity', 'createAvatarWidget','joinConfig'], 
			window, partnerConfiguration.avatar || {});

		this.friends = new ServiceInterface(this, 'interfaces/Friends',
			['getRelationship','sendFriendRequest','createFriendButtonWidget','releaseFriendButtonWidget']);

	}
	PartnerAPI.prototype.init = function(config) {
		var partnerConfiguration = new PartnerConfiguration(config);
		this.__init(partnerConfiguration);
	};
	PartnerAPI.prototype.require = function(a,b,c) {
		this._amd.require(a,b,c);
	};
	PartnerAPI.prototype.define = function(a,b,c) {
		this._amd.define(a,b,c);
	};
	PartnerAPI.prototype.setLanguage = function(lang_code) {
		this.require(['partnerWinComm'], function (partnerWinComm) {
			partnerWinComm.sendMessage('localize:' + lang_code);
		});
	};
	PartnerAPI.prototype.log = function(msg) {
		if(this.log._enabled) {
			if(window.console) {
				console.log(msg);
			} else {
				alert(msg);
			}
		}
	};
	PartnerAPI.prototype.log._enabled = false;
	PartnerAPI.prototype.enableLogging = function() {
		this.log._enabled = true;
		var args = Array.prototype.join.call(arguments, "|");
		this.require(['partnerWinComm'], function (partnerWinComm) {
			partnerWinComm.sendMessage('log-on:' + args);
		});
	};
	PartnerAPI.prototype.disableLogging = function() {
		this.log._enabled = false;
		var args = Array.prototype.join.call(arguments, "|");
		this.require(['partnerWinComm'], function (partnerWinComm) {
			partnerWinComm.sendMessage('log-off:' + args);
		});
	};
	PartnerAPI.prototype.toggleLogging = function() {
		if(this.log._enabled)
			this.disableLogging();
		else
			this.enableLogging();
	};
	PartnerAPI.prototype.debugCommand = function(cmd) {
		this.require(['partnerWinComm'], function (partnerWinComm) {
			partnerWinComm.sendMessage('dbg:' + cmd);
		});
	};
	PartnerAPI.prototype.authDisneyID = function(username,swid,authtoken) {
		this.require(['disneyID'], function(disneyID) {
			disneyID.auth(username,swid,authtoken);
		});
	};
	PartnerAPI.prototype.unauthDisneyID = function(swid) {
		this.require(['disneyID'], function(disneyID) {
			disneyID.unauth(swid);
		});
	};
	PartnerAPI.prototype.onAuthDisneyID = function(callback) {
		this.require(['disneyID'], function(disneyID) {
			disneyID.onAuth(callback);
		});
	};
	PartnerAPI.prototype.onUnauthDisneyID = function(callback) {
		this.require(['disneyID'], function(disneyID) {
			disneyID.onUnauth(callback);
		});
	};
	PartnerAPI.prototype.toggleDebugTools = function toggleDebugTools() {
		this._iframe.toggleMode();
	};
	PartnerAPI.prototype.clearDebugOptions = function clearDebugOptions() {
		debug_window.sessionStorage.removeItem(debug_key);
	};
	PartnerAPI.prototype.overrideFlightRoot = function(url) {
		flightHost.updateOverride(url);
	};
	PartnerAPI.prototype.__init = function(partnerConfiguration) {
		this.__config = partnerConfiguration;

		this.require(['partnerWinComm'], function(partnerWinComm) {							
			if (partnerConfiguration.debugLog !== null)
			{
				var log = partnerConfiguration.debugLog;
				if (log instanceof Array)
				{ log = log.join("|"); }
				
				partnerWinComm.sendMessage("log-on:" + log);
				delete partnerConfiguration.debugLog;
			}

			partnerWinComm.sendMessage("init:" + JSON.stringify(partnerConfiguration));
		});
	};


	function AMD_API() {

		this._modsInfo = {};

		this._rootUrl = "";

		this._unclaimed = new AMD_API.UnclaimedStack();
	}
	AMD_API.prototype.decorate = function(obj) {
		obj.require = this.require.bind(this);
		obj.define = this.define.bind(this);
	};
	AMD_API.prototype.setRootUrl = function(url) {
		this._rootUrl = url;
	};
	AMD_API.prototype.require = function(deps,onload) {
		var mods = [];
		var count = 0;
		
		function checkReady() {
			if(onload) {
				if(count >= deps.length) {
					onload.apply(window,mods);
					onload = null; // clear it so it doesn't get called multiple times.
				}
			}
		}
		
		var amd = this;

		for(var i=0; i<deps.length; i++) {
			(function() {
				var n = i;
				var modInfo = amd._getModInfo(deps[n]);
				modInfo.onLoad(
					function(module) {

						mods[n] = module;
						count++;
						checkReady();
					}
				);
			})();
		}
		
		checkReady();
	};
	AMD_API.prototype.define = function(deps,defFunc) {
		deps = deps || [];
		defFunc = defFunc || function(){};

		this._unclaimed.add({
			dependencies: deps,
			definitionFunction: defFunc 
		});			
	};
	AMD_API.prototype._getModInfo = function(modName) {
		if(!this._modsInfo[modName]) 
			this._modsInfo[modName] = new AMD_API.ModInfo(this._rootUrl,modName,this._unclaimed,this.require.bind(this));

		return this._modsInfo[modName];
	};


	AMD_API.UnclaimedStack = function() {
		this._stack = [];
	};
	AMD_API.UnclaimedStack.prototype.takeOldest = function () {
		if(browser.IE) {
			var result = this._stack.pop();
			return result;
		} else {
			var result = this._stack[0];
			this._stack.shift();
			return result;
		}
	};
	AMD_API.UnclaimedStack.prototype.add = function(obj) {
		this._stack.unshift(obj);
	};

	AMD_API.ModScript = function(url,onload) {

		var s = document.createElement('script');
		s.src = url;
		s.async = true;
	
		if(browser.IE) {
			s.attachEvent('onreadystatechange', function() {
				if(s.readyState === "complete" || s.readyState === "loaded")
					onload();	
			});
		} else {
			s.onload = onload;
			s.onreadystatechange = function() {
				if(this.readyState === "complete" || this.readyState === "loaded")
					onload();
			};
		}

		var t = document.getElementsByTagName('head')[0] || document.body;
		t.appendChild(s);

		return s;
	};

	AMD_API.ModInfo = function(rootUrl,name,unclaimedStack,require) {
		this._handlers = [];
		this._module = null;

		this._scriptIsLoaded = false;
		this._dependenciesAreLoaded = false;
		this._moduleIsCreated = false;
		
		var modInfo = this;

		var scriptUrl = rootUrl + name + '.js';

		this._script = new AMD_API.ModScript(
			scriptUrl,
			function() {
				modInfo._scriptIsLoaded = true;

				var rawModData = unclaimedStack.takeOldest();
				modInfo._dependencies = rawModData.dependencies;
				modInfo._definitionFunction = rawModData.definitionFunction;

				require(
					modInfo._dependencies,
					function() {

						modInfo._dependenciesAreLoaded = true;
						modInfo._module = modInfo._definitionFunction.apply(window,arguments);
						modInfo._moduleIsCreated = true;
						modInfo.checkIfLoaded();

					}
				);

			}
		);
		
	};
	AMD_API.ModInfo.prototype.onLoad = function(handler) {
		this._handlers.push(handler);
		this.checkIfLoaded();
	};
	AMD_API.ModInfo.prototype.checkIfLoaded = function() {
		if(this.isLoaded()) {
			var handlers = this._handlers;
			var module = this._module;
			while(handlers[0]) {
				(function() {
					var handler = handlers.shift();
					handler(module);
				})();
			}
		}
	};
	AMD_API.ModInfo.prototype.isLoaded = function() {
		return this._scriptIsLoaded && this._dependenciesAreLoaded && this._moduleIsCreated;
	};
	AMD_API.ModInfo.prototype.getModule = function() {
		return this._module;
	};



	/* ServiceInterface represents an asynchronously loaded class that offers a strictly asynchronous-method-based interface.
	 * It will initiate the asynchronous loading of the implementation, and stub out the methods with caching
	 * functions.  When the implementation loads, the stubs are replaced with method bindings to the implementation,
	 * and the cached method calls are executed on the implementation.
	 */
	function ServiceInterface(api, reqPath, methods)
	{
		this._service = Array.prototype.slice.call(arguments, 3);
		this._pending = [];

		function _pendInterface(fnName)
		{
			var args = Array.prototype.slice.call(arguments, 1);
			this._pending.push({ fn: fnName, args: args });
		}

		for (var i = 0; i < methods.length; ++i)
		{
			this[methods[i]] = _pendInterface.bind(this, methods[i]);
		}

		api.require([reqPath], (function _required(Constructor)
		{
			var srv = Object.create(Constructor.prototype);
			var ret = Constructor.apply(srv, this._service);
			if (Object(ret) === ret)
				{ srv = ret; }
			
			this._service = srv;

			for (var i = 0; i < methods.length; ++i)
			{
				//console.log("rebinding " + methods[i]);
				this[methods[i]] = this._service[methods[i]].bind(this._service);
			}

			while (this._pending.length > 0)
			{
				var pend = this._pending.shift();
				this._service[pend.fn].apply(this._service, pend.args);
			}

			delete this._pending;

		}).bind(this));
	}








	if(BUILT_FLIGHT_NAME[0]==='$')
		BUILT_FLIGHT_NAME = null;

	var browser = {
		Opera: (function() {
			if(typeof opera !== 'undefined' && opera.toString() === '[object Opera]')
				return 1;
			return 0;
		})()
	};

	browser.IE = (function() {
		var n = document.createElement('span');
		if(n.attachEvent && !(n.attachEvent.toString && n.attachEvent.toString().indexOf('[native code') < 0) && !browser.Opera) {
			return 1;
		}
		return 0;				
	})();

	var flightUtil = {
		__init: function() {
			this.scriptFlight = new Flight(scriptUtil.flightRoot);
			this.flight = this.scriptFlight;
			if(BUILT_FLIGHT_NAME) {
				var newFlightUrl = this.scriptFlight.root.match(/^(.*\/)[^\/]+\/?$/)[1] + BUILT_FLIGHT_NAME;
				this.flight = new Flight(newFlightUrl);
				this.flight.addAlias(this.scriptFlight);
			}
		},
		flight: null,
		scriptFlight: null
	};
	flightUtil.__init();


	var partnerConfig = PartnerConfiguration.fromScript(scriptUtil.script);
	if(!partnerConfig)
		partnerConfig = new PartnerConfiguration();

	window.__disneySocial = new PartnerAPI(partnerConfig);

})();