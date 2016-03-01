Dynamite = {
	version:1.3,
	// doc on selectors: http://api.jquery.com/category/selectors/
	data:null,//"http://qiglab4901.autotrader.com:3001/dynamite/dynamite/data.php", //"http://localhost/dynamite/dynamite/data.php",
	mbox_factory:"default",
	remaining_mboxes:0,
	bootstrap_retries:50,
	remote_load:false,
	ready:false,
	config_queue:[],
	birfRegistrationKey:"dynamiteBirf",
	debug:{
		debugEnabled:false,
		setup:false,
		target:null,
		start:0
	},
	
	bootstrap:function(){
		Dynamite.log("Dynamite Startup");
		
		if(Dynamite.debug.debugEnabled) Dynamite.debug.start = new Date();
		if(!jQuery.isFunction(mboxFactory) || Dynamite.isEmptyObject(mboxFactories) || !jQuery.isFunction(mboxStandardFetcher) || !jQuery.isFunction(mboxAjaxFetcher)){
			Dynamite.log("TNT cannot be located. Is the script loaded?");
			if(--Dynamite.bootstrap_retries > 0) window.setTimeout(function(){Dynamite.bootstrap();}, 100);
			else Dynamite.log("Exceeded bootstrap attempts (TNT could not be loaded)");
			return;
		}

		Dynamite.apply_tnt_overrides();
		Dynamite.ready = true;

		if(typeof BIRF != "undefined" && BIRF.Events && BIRF.Events.Click){
			Dynamite.log("Registering BIRF event handler '%s'", Dynamite.birfRegistrationKey);
			try{
				BIRF.Events.Click.register(Dynamite.birfRegistrationKey, Dynamite.birf_handler, Dynamite.birf_filter);
			} catch(e){
				Dynamite.warn("Error adding BIRF click handler: " + e);
			}
		}
		
		if(document.addEventListener){
			document.addEventListener("DOMNodeInserted", Dynamite._waitUntilExists.loop_and_call, false);
			window.clearInterval(Dynamite._waitUntilExists.global_interval);
		}

		if(Dynamite.remote_load){
			var js = /ci\/assets\/js\/dynamite\.js?$/; // todo this will change based on final directory structure
			var path = "";
			jQuery("script[src]").each(function(i,e){
				var found = e.src.match(js);
				if(found){
					path = e.src.replace(js, "");
				}
			});

			Dynamite.data = path + "data.php";
			Dynamite.load_remote_configs();
		}
		else{
			Dynamite.process_queued_configs();
		}
	},
                           
	apply_tnt_overrides:function(){
		Dynamite.log("Applying TNT overrides");
		
		mboxAjaxFetcher.prototype.fetch_original = mboxAjaxFetcher.prototype.fetch;
		mboxStandardFetcher.prototype.fetch_original = mboxStandardFetcher.prototype.fetch;
		mboxAjaxFetcher.prototype.fetch = Dynamite.mbox_fetcher_override;
		mboxStandardFetcher.prototype.fetch = Dynamite.mbox_fetcher_override;
		mbox.prototype.setOffer_original = mbox.prototype.setOffer;
		mbox.prototype.setOffer = Dynamite.mbox_set_offer_override;
	},  

	revert_tnt_overrides:function(){
		Dynamite.log("Reverting TNT overrides");
		
		mboxAjaxFetcher.prototype.fetch = mboxAjaxFetcher.prototype.fetch_original;
		mboxStandardFetcher.prototype.fetch = mboxStandardFetcher.prototype.fetch_original;
		mbox.prototype.setOffer = mbox.prototype.setOffer_original;
	},
	
	mbox_fetcher_override:function(w){   
		var mbox_name = "N/A";
		if(Dynamite.debug.debugEnabled){ // expensive, only used for debugging
			for(var i=0, l=w['c'].length; i<l; i++){
				if(w['c'][i].name == "mbox"){
					mbox_name = w['c'][i].value;
					break;
				}
			}    
		}
	
		w.setServerType("ajax");
		jQuery.getScript(w.buildUrl(), function(){ 
			Dynamite.log("mbox '%s' updated!", mbox_name);
			if(--Dynamite.remaining_mboxes === 0){
				Dynamite.log("Dynamite loaded in %s ms", (new Date() - Dynamite.debug.start));
				Dynamite.revert_tnt_overrides();
			}
		});		
	},
	
	mbox_set_offer_override:function(){ // Note: In this function "this" refers to mbox not Dynamite
		var mboxEl = this.wb === null ? jQuery(this.getDefaultDiv()) : jQuery(this.wb);
		if(mboxEl && mboxEl.data("hidden") === true && mboxEl.data("action").toLowerCase() === "update"){
			mboxEl.parent().show();
		}

		return this.setOffer_original.apply(this, arguments);
	},

	load_from_config:function(c){
		if(!Dynamite.ready){
			Dynamite.config_queue.push(c);
		}
		else{
			Dynamite.process_page_config(c);
		}
	},
	
	process_queued_configs:function(){
		while(Dynamite.config_queue.length){
			Dynamite.process_page_config(Dynamite.config_queue.pop());
		}
	},

	load_remote_configs:function(){
		var that = this,
			url = Dynamite.data + "?url=" + encodeURIComponent(document.location.href);

		Dynamite.log("Requesting mboxes for '%s'", document.location.href);

		jQuery.getScript( /** need to use getScript for remote ajax */
			url,
			function(json){}
		);
	},
	
	process_remote_configs:function(json){                                                                                                   
		if(json === null || json.error === true){
			Dynamite.log("The server responded with an error during the mbox request:", json === null ? "null object returned from server" : json.error_msg);
			return;
		}

		Dynamite.log("Received response from server.. %d mboxes to process..", Dynamite.remaining_mboxes);
        Dynamite.process_page_config(json);
	},
	
	process_page_config:function(page){
		Dynamite.remaining_mboxes = page.mboxes.length;
		for(var i=0, l=page.mboxes.length; i<l; i++){
			Dynamite.process_config(page.mboxes[i]);
		}		
	},
	
	process_config:function(mbox){     
		var id = mbox.name;
		
		var el = jQuery(mbox.default_content_selector);
		if(el.length || mbox.action.toLowerCase() === "script"){
			Dynamite.prepare_el_for_mbox(mbox);
		}
		else{
			Dynamite.log("'%s' is not available. Queueing..", mbox.default_content_selector);
			// FIXME: Rewrite to use new waitUntilExists() functionality
			var retries = 150, // 7.5 sec
				process = window.setInterval(function(){
					if(jQuery(mbox.default_content_selector).length){
						window.clearInterval(process);
						process = null;
						Dynamite.prepare_el_for_mbox(mbox);
					}
					else if(retries-- === 0){
						window.clearInterval(process);
						process = null;
						Dynamite.warn("Exhausted wait time for '%s' for mbox '%s'. Is your selector valid? Try running jQuery('%s'); from your console.", mbox.default_content_selector, mbox.name, mbox.default_content_selector);
					}
			}, 50);
		}
	},
	
	prepare_el_for_mbox:function(mbox){
		var el     = jQuery(mbox.default_content_selector),
			mboxEl = jQuery("<div class='mboxDefault'/>").attr("id", mbox.name).data("action", mbox.action).data("hidden", mbox.hide === "1");
			
		switch(mbox.action.toLowerCase()){
			case "update":
				el.empty().append(mboxEl);
				break;
			case "replace":
				el.wrap(mboxEl);
				break;
			case "before":
				mboxEl.insertBefore(el);        
				break;
			case "after":
				mboxEl.insertAfter(el);
				break;
			case "script":
				mboxEl.appendTo(document.body);
				break;
		}
		
		Dynamite.log("Created mbox '%s' for '%s': ", mbox.name, mbox.default_content_selector, jQuery("#" + mbox.name).get(0));
		
		Dynamite.execute_mbox(mbox);
	},
	
	execute_mbox:function(mbox){
		Dynamite.log("Registering mbox '%s' with TNT", mbox.name);
		mboxDefine(mbox.name, mbox.name); // element, mbox name

		if(Dynamite.emptyString(mbox.bind_to_event) || Dynamite.emptyString(mbox.bind_to_selector)){
			Dynamite.update_mbox(mbox);
		}
		else{
			Dynamite.log("Binding event '%s' to '%s'", mbox.bind_to_event, mbox.bind_to_selector);
			jQuery(mbox.bind_to_selector).bind(mbox.bind_to_event, function(e){
				Dynamite.update_mbox(mbox);
			});
		}            
	},
	
	update_mbox:function(mbox){
		Dynamite.log("Retrieving mbox content for '%s'", mbox.name);
		mboxUpdate.apply(window, jQuery.merge([mbox.name], Dynamite.generate_mbox_parms(mbox))); // name, parameters string
	},
	
	generate_mbox_parms:function(mbox){
		var _parms = [
			/** default */
			"atc_id=" + Dynamite.getCookie("ATC_ID")
			// ,"page=" + mbox.name
		];
		
		jQuery(mbox.parms).each(function(i,p){
			var value = "";
            
			if(!Dynamite.emptyString(p.value)){
				value = p.value;
			}     
			else if(!Dynamite.emptyString(p.value_from_selector)){
				var el = jQuery(p.value_from_selector);
				value = el.val() !== "" ? el.val() : el.html() !== "" ? el.html() : el._d_outerHTML();
			}
			else if(!Dynamite.emptyString(p.cookie)){
				var cookie;
				if(p.cookie.indexOf("cookie_isset__") !== -1){
					cookie = p.cookie.split("cookie_isset__")[1];
					value = Dynamite.getCookie(cookie) !== null;
				}
				else if(p.cookie.indexOf("cookie_value__") !== -1){
					cookie = p.cookie.split("cookie_value__")[1];
					value = Dynamite.getCookie(cookie);
				}
			}  

			_parms.push(p.name + "=" + value);
		});
		
		Dynamite.log("Generated Parms: %s", _parms.join(" , "));
		
		return _parms;
	},
	
	birf_handler:function(pEventObject, pConcerningElement, pAdditionalArgs){
		Dynamite.log("birf_handler", arguments);
	},
	
	birf_filter:function(pEventObject){
		Dynamite.log("birf_filter", arguments);
		
		/**
		var el = pEventObject.target || pEventObject.srcElement;
		return [
                   true //true and it will call handler
                 , myElement //concerning element, 
                             // this is passed on to handler
                 , “foo” //any additional argument we want passed
               ];
        */

		/**
		return false;
		*/
	},
	
	emptyString:function(str){
		return (!str || /^\s*$/.test(str));
	}, 

	getCookie:function(name){
		var value = null;
		var cookies = document.cookie.split(";");
		for(var i=0; i<cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			if(cookie.substring(0, name.length + 1) == (name + "=")){
				value = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}

		return value;
	},

	isEmptyObject:function(a){
		for(var b in a) return false;
		return true;
	},
	
	log:function(str){
		if(Dynamite.debug.debugEnabled){  
			if(typeof console != "undefined" && typeof console.log != "undefined"){
				try{ console.log.apply(console, Array.prototype.slice.call(arguments)); } catch(e){}
			}
		}
	},

	warn:function(str){
		if(Dynamite.debug.debugEnabled){  
			if(typeof console != "undefined" && typeof console.warn != "undefined"){
				try{ console.warn.apply(console, Array.prototype.slice.call(arguments)); } catch(e){}
			}
		}
	},
	
	_waitUntilExists: {
		pending_functions: [],
		loop_and_call: function(){
			if(!Dynamite._waitUntilExists.pending_functions.length){ return; }
			
			for(var i=0, l=Dynamite._waitUntilExists.pending_functions.length; i<l; i++){
				var obj = Dynamite._waitUntilExists.pending_functions[i];
				if(typeof obj === "undefined") continue;
				
				var resolution = jQuery(obj.selector);
				
				if(resolution.length){
					resolution = resolution.get(0);
					var _callback = obj.callback;
					Dynamite._waitUntilExists.pending_functions.splice(i, 1);
					
					if(obj.c == "itself"){ obj.c = resolution; }
					_callback.call(obj.c);
					i--;
					
					Dynamite.log("%s element added, sending notification", obj.selector);
				}
			}
		},
		global_interval: setInterval(function(){ Dynamite._waitUntilExists.loop_and_call(); },5)
	},
	
	waitUntilExists: function(selector, callback, context){
		context = context || window;

		Dynamite.log("Waiting for element ready: %s", selector);
		Dynamite._waitUntilExists.pending_functions.push({callback:callback, selector:selector, c:context});
		Dynamite._waitUntilExists.loop_and_call(); // Force call incase its already there (needed esp if using DOMNodeInserted)
	},
	
	
	waitUntilExists_stop: function(selector, callback){
		for(var i=0, l=Dynamite._waitUntilExists.pending_functions.length; i<l; i++){
			if(Dynamite._waitUntilExists.pending_functions[i].selector == selector && (typeof callback == "undefined" || Dynamite._waitUntilExists.pending_functions[i].callback == callback)){
				Dynamite._waitUntilExists.pending_functions.splice(i, 1);
			}
		}
	},
	
	waitUntilExists_stopAll: function(){
		Dynamite._waitUntilExists.pending_functions = [];
	},

	waitForDataIslandValues: function(valueList, callback){
		if(!jQuery.isArray(valueList)){
			valueList = [valueList];
		}

		var requestedValues = [];

		for(var i=0, l=valueList.length; i<l; i++){
			var key = valueList[i],
				keyPairs = key.split('.'),
				last = window,
				test = null;

			while(keyPairs.length){
				test = keyPairs.shift();
				var type = jQuery.type(last[test]);
				if(type === 'undefined' || ((type === 'string' || type === 'array') && !last[test].length)){
					window.setTimeout(function(){ Dynamite.waitForDataIslandValues(valueList, callback); }, 100);
					return;
				}
				last = last[test];
			}
			requestedValues.push(last);
		}

		if(jQuery.isFunction(callback)){
			callback(requestedValues);
		}
	}	
};

if(typeof jQuery == "undefined" || typeof mbox == "undefined"){
	throw("Dynamite requires jQuery and TNT.");
}  
else{
	(function($, window, undefined){
		$.fn._d_outerHTML = function() {
			var doc = this[0] ? this[0].ownerDocument : document;
			return $('<div>', doc).append(this.eq(0).clone()).html();
		};      
	
		$(document).ready(function(){
			Dynamite.bootstrap(); 
		});
	})(jQuery, window);
}
