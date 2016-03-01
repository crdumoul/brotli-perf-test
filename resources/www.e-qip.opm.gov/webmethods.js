
if (core === undefined) {
    var core = {
        isLoaded: true
    };
}


core.webMethods = {
    // Base underlying jquery ajax request
    // For GET requests use: core.webmethods.get
    // For POST requests use: core.webmethods.post
	request	: function(requestType, action, params, successCallback, errorCallback, beforeSendCallback, alwaysCallback) {
		params = (params ? params : {});
		params.action = action;
		params.pswebaction = action;
		params.contentType = params.contentType || "application/x-www-form-urlencoded; charset=UTF-8";
		params.url = params.url || document.url;

		if (params.contentType == "application/json; charset=utf-8") {
		    params.data = JSON.stringify(params.data);
		}

		jQuery.ajaxSetup({
			xhr: function () {
				try {
					if (window.ActiveXObject)
						return new window.ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) { }

				return new window.XMLHttpRequest();
			}
		});

		$.ajax({
			type: requestType,
			url: params.url,
			data: params.data || params,
			contentType: params.contentType,
			beforeSend: function (xhr) {
				if (beforeSendCallback && beforeSendCallback.length === 1)
					beforeSendCallback(xhr);
				else if (beforeSendCallback && beforeSendCallback.length === 0)
					beforeSendCallback();
			}
		}).done(function (data) {
			if (data && (data.success || (data.Code >= 200 && data.Code < 300))) {
				if (successCallback) {
					successCallback(data);
				}
			}
			else {
				//console.log("The webmethod returned no data and/or did not return success = true.");
				if (errorCallback && errorCallback.length === 1)
					errorCallback(data);
				else if (errorCallback)
					errorCallback();
			}
		}).fail(function (jqXHr) {
			//console.log("The webmethod failed with the following jqXHr.responseText: " + jqXHr.responseText);
			if (errorCallback && errorCallback.length === 1)
				errorCallback(jqXHr);
			else if (errorCallback)
				errorCallback();
		}).always(function() {
			if (alwaysCallback) {
				alwaysCallback();
			}
		});
	},
	post: function (action, params, successCallback, errorCallback, beforeSendCallback, alwaysCallback) {
		this.request("POST", action, params, successCallback, errorCallback, beforeSendCallback, alwaysCallback);
	},
	get: function (action, params, successCallback, errorCallback, beforeSendCallback, alwaysCallback) {
		this.request("GET", action, params, successCallback, errorCallback, beforeSendCallback, alwaysCallback);
	}
};

//Created to ensure an item bound to coreLoaded after load as completed still fires.
$.event.special.coreLoaded = {
	add: function (handleObject) {
		handleObject.handler.call(this);
	}
};

$.event.trigger({
	type: "coreLoaded",
	message: "Core Scripts Loaded.",
	time: new Date()
});