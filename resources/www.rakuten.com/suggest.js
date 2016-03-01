/**
 * @license suggest.js 2.8.0
 * Copyright (c) @year Rakuten.Inc
 * Date : @compressesDate
 */
(function() {
	if (typeof jQuery === "undefined") {
		return;
	}
    //DEV CHANGE - 12/14/2015 ph
	//var $ = jQuery.noConflict();

	// constants
	var FALSE = 0,
	    TRUE = 1,
	    OFF = 0,
	    ON = 1,
		READY = 2,
		COMPLETE = 3;

	// namespace aliaces
	var suggestSpace = (function() {
		if (!window.searchplat) {
			searchplat = {};
		}
		if (!searchplat.suggest) {
			searchplat.suggest = {};
		}
		return searchplat.suggest;
	})();

	/**
	 * plugin wrapper object
	 */
	var Pluggable = function() {};
	/**
	 * Pluggable prototype.
	 */
	Pluggable.prototype = {
		/** plugin cache */
		pluginArray: [],

		/**
		 * Add plugins.
		 * Call from plugins
		 * @param {object} plugin - RBase, RSwg, RCNavi, etc.
		 */
		add: function(plugin) {
			this.pluginArray.push(plugin);
		},

		/**
		 * Invoke plugin's function which has no return value.
		 * @param {object} rsuggest - RSuggest object.
		 * @param {function} fn - plugin's function.
		 */
		invokeFunction: function(rsuggest, fn) {
			var self = this;
			for (var i = 0, l = self.pluginArray.length; i < l; i++) {
				var plugin = self.pluginArray[i];
				if (typeof plugin[fn] === "function") {
					plugin[fn].call(plugin, rsuggest, fn);
				}
			}
		},

		/**
		 * Call plugin's initialization function.
		 * @param {object} rsuggest - RSuggest object.
		 * @return {boolen} true if initialization succeeded, false if failed.
		 */
		init: function(rsuggest) {
			var self = this;
			for (var i = 0, l = self.pluginArray.length; i < l; i++) {
				var plugin = self.pluginArray[i];
				if (typeof plugin.init === "function") {
					if (!plugin.init(rsuggest)) {
						return false;
					}
				}
			}
			return true;
		},

		/**
		 * Call plugin function creating specific elements.
		 * @param {object} rsuggest - RSuggest object.
		 * @return {string} html string.
		 */
		createSuggestElems: function(rsuggest) {
			var self = this,
				html = "",
				plugin;
			for (var i = 0, l = self.pluginArray.length; i < l; i++) {
				plugin = self.pluginArray[i];
				if (typeof plugin.createSuggestElems === "function") {
					html += plugin.createSuggestElems(rsuggest);
				}
			}
			return html;
		},

		/**
		 * Call plugin function getting selected keyword.
		 * @param {object} rsuggest - RSuggest object.
		 * @param {element} row - selected row element.
		 * @return {string} selected keyword.
		 */
		getSelectedText: function(rsuggest, row) {
			var self = this;
			for (var i = 0, l = self.pluginArray.length; i < l; i++) {
				var plugin = self.pluginArray[i];
				if (typeof plugin.getSelectedText === "function") {
					var text = plugin.getSelectedText(rsuggest, row);
					if (text) {
						return text;
					}
				}
			}
			return $(row).text();
		},

		/**
		 * Add plugin specific query paramters for submit log.
		 * @param {object} rsuggest - RSuggest object.
		 * @return {string} query parameters string.
		 */
		addSubmitLog: function(rsuggest) {
			var self = this,
				query = "";
			for (var i = 0, len = self.pluginArray.length; i < len; i++) {
				var plugin = self.pluginArray[i];
				if (typeof plugin.addSubmitLog === "function") {
					query += plugin.addSubmitLog(rsuggest);
				}
			}
			return query;
		}
	};
	var plugins = suggestSpace.plugins = new Pluggable();

	/**
	 * RSuggest object
	 */
	var RSuggest = function() {
		suggestSpace.rsuggest = this;
	};

	// RSuggest prototype
	RSuggest.prototype = {
		//resultCache: {},
		backup: "",
		//lastInput: "",
		respInput: null,
		sggstSelectNum: -1,
		usingChar: "",
		mouseInput: null,
		mouseState: 0,
		mouseMove: FALSE,
		mouseOver: FALSE,
		enterFlag: TRUE,
		keyCode: null,
		currentFontSize: null,
		maxIndex: 0,
		index: -1,
		clickEnableFlag: TRUE,
		IeVersion: 0,
		viewEvent: null,
		showTimer: null,
		waitTimeout: null,
		suggestDivPos: $("body"),
		onoff: ON,
		onoffInitFlag: FALSE,
		onElem: null,
		offElem: null,
		decisionFlag: FALSE,
		scVal: FALSE,
		submitWay: 0,
		spaceRegExp: new RegExp("^[\\s" + unescape("\u3000") + "]+"),
		whitespaceMatcher: new RegExp("[\\s" + unescape("\u3000") + "]+"),

		// configurations
		blackList: ["iphone", "ipod", "ipad", "android"],
		onOffBlackList: [],
		count: 10,
		configCollection: "col",

		// class attributes
		cssRow: "sggstRow",
		cssSelect: "sggstSelect",
		cssNoSelect: "sggstNoselect",
		cssKeyword: "sggstKeyword",
		cssOnoff: "sggstOnoff",
		cssOffImage: "sggstHideimg",
		cssOnImage: "sggstOpenimg",
		cssRemarks: "sggstComment",
		cssRemarksBox: "sggstCommentbox",
		cssComment: "sggstBetabtn01",
		cssOff: "sggstBetabtn02",
		cssOn: "openSuggest",

		// request paths
		searchCommand: "suggest",
		submitLogCommand:"submit",
		cookieCommand: "conf",

		// request parameters
		paramInput: "q",
		paramCollection: "cl",
		paramSuggestid: "sid",
		paramSuggestUse: "su",
		paramSelectNum: "sn",
		paramSuggestOnOff: "so",
		paramFormParam: "fp",
		paramReqid: "rid",
		sggstReqid: Math.floor(Math.random() * 10000000000),
		paramEncoding: "oe",
		paramSelect: "ss",
		paramGroupId: "gi",
		paramCookieMethod: "mt",
		paramCookieCheck: "c",
		paramCookieAdd: "a",
		paramCookieDelete:"d",
		paramSubmitWay: "sw",
		paramCallback: "cb",
		paramExParam: "ex",
		paramSpellCheck: "sc",

		// timeout settings
		ajaxSearchTimeout: 10000,
		ajaxSubmitLogTimeout: 3000,
		afterWaitingforEventTimeout: 100,
		justAddedToQueueTimeout: 10,
		pollingTime: 10,
		retryCount: 20,
		isTimeout: false,

		readyState: 0,

		/**
		 * Initialize RSuggest.
		 */
		init: function(configSelector) {
			var self = this,
				$config = self.config = $(configSelector),
				hook = suggestSpace.hook;
			if (!self.validateConfig($config)) {
				return false;
			}
			self.searchWordHistory = {};
			self.resultCache = {};
			self.lastInput = "";

			self.form = $("#" + $config.attr("form"));
			self.baseUrl = $config.attr("baseUrl");
			self.button = $("#" + $config.attr("button"));
			self.suggestId = $config.attr("suggestId");
			self.searchWordHistory[self.suggestId] = {};
			self.encoding = $config.attr("encoding");
			self.exParam = $config.attr("exParam") || "";
			self.groupId = $config.attr("groupId");
			self.input = $("#" + $config.attr("input"));
			self.input.attr("autocomplete", "off");

			self.sendFormParam = self.checkBoolNum($config.attr("sendFormParam")) || TRUE;
			self.onoffEnable = self.checkBoolNum($config.attr("onoff")) || TRUE;
			self.hookRequired = self.checkBoolNum($config.attr("hookRequired")) || FALSE;
			self.keywordReplaceOnMouseover = 
					self.checkBoolNum($config.attr("keywordReplaceOnMouseover")) || FALSE;

			self.addBlackList = $config.attr("uaBlackList") || "";
			self.byteNumToHideOpenSggst = $config.attr("byteNumToHideOpenSggst") || 36;
			self.nowFontSize = $("html").css("font-size");
			self.hideToolTips = $config.attr("hideToolTips") || "";
			self.openToolTips = $config.attr("openToolTips") || "";
			self.pollingTime = $config.attr("pollingTime") || self.pollingTime;
			self.retryCount = $config.attr("retryCount") || self.retryCount;

			if (!self.preInit()
					|| self.judge() == -1
					|| self.input.parent(".sggstInputWrap").length != 1
					|| (self.hookRequired == TRUE && typeof hook === "undefined")) {
				try {
					self.initFailure();
				} catch(e) {
					// nothing to do.
				};
				return false;
			}

			if (typeof hook !== "undefined" && hook.prototype != undefined) {
				$.extend(RSuggest.prototype, hook.prototype);
			}

			if (!plugins.init(self)) {
				self.initFailure();
				return false;
			}
			self.createSuggestDiv();
			self.onoffReady();
			self.resize();
			$(window).resize(function() {
				self.resize();
			});

			self.input.keydown(function(e) {
				self.enterFlag = FALSE;
				self.keyCode = e.keyCode;
				switch (e.keyCode) {
					case 40://DOWN
						self.down();
						break;
					case 38://UP
						self.up();
						break;
					case 9://TAB
						self.hide();
						break;
				};
			}).keypress(function(e) {
				self.keyCode = e.keyCode;
				self.enterFlag = TRUE;
				switch (e.keyCode) {
					case 27://ESC
						if (self.keyCode == 27) {
							self.hide(true);
						}
						return false;
					case 13://ENTER
						if (self.keyCode == 13 && self.enterFlag == TRUE
								&& self.clickEnableFlag == TRUE) {
							 self.clickEnableFlag = FALSE;
							 self.decisionFlag = TRUE;
							 self.submitWay = 1;
							 setTimeout(function() {
								 self.button.click();
							 }, 10);
							 self.eventStop();
						}
						return false;
				};
			}).keyup(function(e) {
				switch (e.keyCode) {
					case 27://ESC
						if (self.keyCode == 27) {
							self.hide(true);
						}
						return false;
					case 13://ENTER
						if (self.keyCode == 13 && self.enterFlag == TRUE
								&& self.clickEnableFlag == TRUE) {
							 self.clickEnableFlag = FALSE;
							 self.decisionFlag = TRUE;
							 self.submitWay = 1;
							 setTimeout(function() {
								 self.button.click();
							 }, 10);
							 self.eventStop();
						}
						return false;
				};
			}).focus(function() {
				self.lastInput = self.input.val();
				if (self.mouseOver == FALSE) {
					self.backup = self.input.val();
				}
				self.eventStart();
			}).blur(function() {
				if (self.mouseState == 0 && self.mouseOver == FALSE) {
					self.eventStop();
				} else if (self.mouseState == 1 || self.mouseOver == TRUE) {
					self.input.focus();
				}
				self.mouseState = 0;
			}).mouseover(function() {
				if (self.keywordReplaceOnMouseover == TRUE
						&& self.suggest.is(":visible")
						&& self.index != -1 && self.backup.length !=0
						&& self.lastInput == self.input.val()) {
					self.input.val(self.backup);
					self.sggstSelectNum = -1;
					self.usingChar = "";
				}
			}).attr("maxlength", 2048);

			if (document.activeElement.id == self.input.attr("id")) {
				self.input.blur();
				self.input.focus();
			}

			plugins.invokeFunction(self, "postInit");

			self.postInit();

			return true;
		},

		preInit: function() {
			return true;
		},
		postInit: function() {
			return true;
		},

		/**
		 * Check validity of configuration.
		 * @param
		 * 		config object
		 * @return
		 * 		true if all parameters are valid
		 * 		false if any parameter is invalid
		 */
		validateConfig: function(config) {
			if (config == undefined) {
				return false;
			}

			var self = this;
			// required parameters
			if (!self.isMatch(config.attr("input"), /^[a-zA-Z0-9_\-]+$/)) {
				return false;
			}
			if (!self.isMatch(config.attr("form"), /^[a-zA-Z0-9_\-]+$/)) {
				return false;
			}
			if (!self.isMatch(config.attr("baseUrl"), /^https?:\/\/.+$/) && !self.isMatch(config.attr("baseUrl"), /^\/\/.+$/)) {
			   return false;
			}
			if (!self.isMatch(config.attr("button"), /^[a-zA-Z0-9_\-]+$/)) {
				return false;
			}
			if (!self.isMatch(config.attr("suggestId"), /^[a-zA-Z0-9_\-]+$/)) {
				return false;
			}
			if (!self.isMatch(config.attr("encoding"), /^(utf-8|euc-jp)$/)) {
				return false;
			}
			if (!self.isMatch(config.attr("col"), /^[a-z]+$/)) {
				return false;
			}
			if (!self.isMatch(config.attr("groupId"), /^[a-zA-Z0-9_\-]+$/)) {
				return false;
			}

			// numbers
			var byteNumToHideOpenSggst = config.attr("byteNumToHideOpenSggst");
			if (byteNumToHideOpenSggst && !self.isInRange(byteNumToHideOpenSggst, 1, 99)) {
				return false;
			}

			// optional parameters
			var openToolTips = config.attr("openToolTips");
			if (openToolTips && !self.isMatch(openToolTips, /^[^<>]+$/)) {
				return false;
			}
			var hideToolTips = config.attr("hideToolTips");
			if (hideToolTips && !self.isMatch(hideToolTips, /^[^<>]+$/)) {
				return false;
			}
			var uaBlackList = config.attr("uaBlackList");
			if (uaBlackList && !self.isMatch(uaBlackList, /^[a-zA-Z0-9 _\/\.;]+$/)) {
				return false;
			}
			var exParam = config.attr("exParam");
			if (exParam && !self.isMatch(exParam, /^[^<>]+$/)) {
				return false;
			}
			var pollingTime = config.attr("pollingTime");
			if (pollingTime && !self.isInRange(pollingTime, 10, 1000)) {
				return false;
			}
			var retryCount = config.attr("retryCount");
			if (retryCount && !self.isInRange(retryCount, 1, 100)) {
				return false;
			}

			// flags
			var onOff = config.attr("onoff");
			if (onOff && !self.isInRange(onOff, FALSE, TRUE)) {
				return false;
			}
			var hookRequired = config.attr("hookRequired");
			if (hookRequired && !self.isInRange(hookRequired, FALSE, TRUE)) {
				return false;
			}
			var sendFormParam = config.attr("sendFormParam");
			if (sendFormParam && !self.isInRange(sendFormParam, FALSE, TRUE)) {
				return false;
			}
			var keywordReplaceOnMouseover = config.attr("keywordReplaceOnMouseover");
			if (keywordReplaceOnMouseover && !self.isInRange(keywordReplaceOnMouseover, FALSE, TRUE)) {
				return false;
			}
			return true;
		},

		checkBoolNum: function(num) {
			if (typeof num != "undefined" && num.length != 0 && (num == FALSE || num == TRUE)) return num;
			return "";
		},
		escapeHtml: function(val) {
		    return $("<div/>").text(val).html();
		},
		initFailure: function() {
			this.input.attr("autocomplete", "");
		},

		createSuggestDiv: function() {
			var self = this;
			self.suggest = $("<div>").attr("id", "suggest").hide().appendTo(self.suggestDivPos);
			var elmHTML = plugins.createSuggestElems(this);
			self.suggest.append(elmHTML);
		    //add border to last div sggstNoselect swgRow
			self.suggest.find(".swgRow .sggstKeyword").last().addClass("addBorder");
			self.suggest.delegate("." + self.cssKeyword, "mouseup", function(e) {
				var $keyword = $(this),
				    s = $keyword.text();
				if (e.which != 1 || self.mouseInput != s || self.clickEnableFlag == FALSE) {
					return;
				}
				self.mouseState = 2;
				self.input.blur();
				var keyword = plugins.getSelectedText(self, $keyword.parent("." + self.cssRow));
				self.input.val(keyword);
				self.sggstSelectNum = self.index;
				self.usingChar = s;
				self.clickEnableFlag = FALSE;
				self.decisionFlag = TRUE;
				self.submitWay = 2;
				setTimeout(function() {
					self.button.click();
				}, 10);
				self.eventStop();
			});
			self.suggest.delegate("." + self.cssKeyword, "mousedown", function(e) {
				if (e.which != 1) {
					self.input.blur();
					return;
				}
				self.mouseInput = $(this).text();
				self.mouseState = 1;
				return false;
			});
			self.suggest.delegate("." + self.cssKeyword, "mouseover", function(e) {
				self.over($(this).text());
			});
			self.suggest.delegate("." + self.cssKeyword, "mouseout", function(e) {
				$(this).parent().removeClass(self.cssSelect).addClass(self.cssNoSelect);
				self.mouseState = 0;
			});
			self.suggest.delegate("." + self.cssKeyword, "mousemove", function(e) {
				self.mouseMove = TRUE;
			});

			var remarks = "<div class=\"" + self.cssRemarks + "\">"
					+ "<div class=\"" + self.cssRemarksBox + "\">"
							+ "<div class=\"" + self.cssComment + "\">";
			self.remarks = $(remarks);
		},

		preSearch: function() {
			return true;
		},

		search: function() {
			var self = this,
				value = self.input.val(),
				ajaxEvent;

			if (!self.preSearch()) {
				return;
			}
			if (self.onoffInitFlag == FALSE) {
				return;
			}
			if (!value || self.isMatch(value, self.spaceRegExp)) {
				self.usingChar = "";
				self.sggstSelectNum = -1;
				self.hide();
				return;
			}
			if (value == self.lastInput) {
				return;
			}
			self.lastInput = value;
			self.backup = value;
			self.readyState = 0;
			clearTimeout(self.waitTimeout);
			clearInterval(self.showTimer);
			clearTimeout(ajaxEvent);
			ajaxEvent = setTimeout(function() {
				self.index = - 1;
				self.mouseMove = FALSE;
				self.maxIndex = 0;

				plugins.invokeFunction(self, "search");

				self.waitTimeout = setTimeout(function() {
					clearInterval(self.showTimer);
				}, self.pollingTime * self.retryCount);

				clearInterval(self.showTimer);
				self.showTimer = setInterval(function() {
					if (READY > self.readyState) {
						return;
					}
					self.suggest.append(self.remarks);
					clearTimeout(self.waitTimeout);
					clearInterval(self.showTimer);
					if (COMPLETE > self.readyState) {
						setTimeout(function() {
							self.showInternal();
						}, self.pollingTime);
					} else {
						self.showInternal();
					}
				}, self.pollingTime);

			}, self.justAddedToQueueTimeout);
			self.postSearch();
		},

		showInternal: function() {
			var self = this;
			self.mouseMove = TRUE;
			var visibleRows = self.suggest.children().not(self.remarks).filter(function() {
				return $(this).css("display") !== "none";
			});
			if (self.onoff == ON && visibleRows.size() > 0) {
				self.suggest.show();
			} else {
				self.suggest.hide();
			}
		},

		postSearch: function() {
		},

		read: function(jsonUrl, successCallback) {
			var self = this,
				ajaxTimer = setTimeout(function() {
					self.isTimeout = true;
					return;
				}, self.ajaxSearchTimeout);
			self.isTimeout = false;
			self.searchWordHistory[self.suggestId][self.reqIndex] = self.lastInput;
			try {
				$.ajax({
					url: jsonUrl,
					cache: true,
					timeout: self.ajaxSearchTimeout,
					dataType: "jsonp",
					scriptCharset: self.encoding,
					jsonp: self.paramCallback,
					success: function(data,textStatus, xhr) {
						clearTimeout(ajaxTimer);
						if (self.isTimeout) {
							return;
						}
						var query = self.getParsedUrlInfo(this.url);
						var callbackSequence = query[self.paramCallback].replace('jsonp','');
						var useInfo = {
							'index': self.resIndex,
							'query': query,
							'cbsq' : callbackSequence
						};
						data.useInfo = useInfo;
						successCallback(data);
					},
					error: function() {
						self.resIndex = self.resIndex? self.resIndex + 1: 1;
					}
				});
			} catch(e) {
				clearTimeout(self.waitTimeout);
				clearInterval(self.showTimer);
				return;
			}
		},
		getParsedUrlInfo: function(returnUrl) {
			if (!returnUrl) {
				return null;
			}
			var parser = document.createElement('a');
			parser.href=returnUrl;
			var parsedUrl={};
			var queries = parser.search.replace('?','').split('&').forEach(function(q){
				var query = q.split('=');
				parsedUrl[query[0]] = query.length == 2? query[1]:''
			});
			return parsedUrl;
		},
		eventStart: function() {
			var self = this;
			clearInterval(self.viewEvent);
			self.clickEnableFlag = true;
			self.decisionFlag = false;

			self.viewEvent = setInterval(function() {
			    self.nowFontSize = $("html").css("font-size");
				if (self.currentFontSize != self.nowFontSize) {
					self.currentFontSize = self.nowFontSize;
					self.resize();
				}
				self.controlOnElem();
				self.search();
			}, 100);
		},

		eventStop: function() {
			var self = this;
			clearInterval(this.viewEvent);
			setTimeout(function() {
				self.hide();
			}, 200);
		},

		hide: function(reset) {
			var self = this;
			if (reset && self.lastInput.length != 0) {
				self.input.val(self.backup);
				self.sggstSelectNum = -1;
				self.usingChar = "";
			}
			self.lastInput = self.input.val();
			self.suggest.hide();
		},

		select: function(replace) {
			var self = this,
				$suggest = self.suggest.children("." + self.cssSelect + ", ." + self.cssNoSelect);
			$suggest.filter("." + self.cssSelect).removeClass(self.cssSelect).addClass(self.cssNoSelect);
			var v = $suggest.filter(":visible").eq(self.index);
			if (self.index != -1) {
				v.removeClass(self.cssNoSelect).addClass(self.cssSelect);
			}
			if (replace) {
				var d = "";
				if (self.index <= -1 || self.index >= self.maxIndex) {
					d = self.backup;
					self.usingChar = "";
					self.sggstSelectNum = -1;
				} else {
					d = plugins.getSelectedText(self, v);
					self.usingChar= d;
					self.sggstSelectNum = self.index;
				}
				self.input.val(d);
				self.lastInput = d;
			}
		},

		up: function() {
			var self = this;
			if (self.maxIndex == 0 || self.lastInput.length == 0 || self.config.attr(self.configCollection).length == 0) return;
			if (self.index <= -1) self.index = self.maxIndex;
			if (self.suggest.is(":visible")) {
				self.index--;
				self.select(TRUE);
			} else if (self.respInput == self.lastInput && self.onoff == ON) {
				self.select();
				self.suggest.show();
			}
		},

		down: function() {
			var self = this;
			if (self.maxIndex == 0 || self.lastInput.length == 0 || self.config.attr(self.configCollection).length == 0) return;
			if (self.index >= self.maxIndex) self.index = -1;
			if (self.suggest.is(":visible")) {
				self.index++;
				self.select(TRUE);
			} else if (self.respInput == self.lastInput && self.onoff == ON) {
				self.select();
				self.suggest.show();
			}
		},

		over: function(text) {
			var self = this,
			    n = -1,
				$suggest = self.suggest.children("." + self.cssSelect + ", ." + self.cssNoSelect);
			$suggest.filter("." + self.cssSelect).removeClass(self.cssSelect).addClass(self.cssNoSelect);
			$suggest.filter(":visible").each(function(i, v) {
				if (text == $(v).text()) {
					n = i;
					return false;
				}
			});
			var flag = (self.keywordReplaceOnMouseover == TRUE && self.mouseMove == TRUE);
			if (flag) {
				self.mouseOver = TRUE;
				self.input.blur();
				self.input.focus();
			}
			self.index = n;
			self.select(flag);
			setTimeout(function() {
				self.mouseOver = FALSE;
			}, 50);
		},

		preJump: function() {
			return true;
		},

		jump: function(use) {
			var self = this;
			if (!self.preJump()) {
				return;
			}

			if (self.decisionFlag == TRUE) {
				self.scVal = use;
			}else {
				self.scVal = FALSE;
			}
			self.sendSubmitLog(use);
		},

		sendSubmitLog: function(suggestUse) {
			var self = this;
			var c = self.config.attr(self.configCollection);
			if (c.length != 0) {
				var q = self.input.val().replace(self.spaceRegExp, "");
				var u = self.baseUrl + "/" + self.submitLogCommand + "?"
					 + self.paramSuggestid + "=" + self.suggestId
					+ "&" + self.paramCollection + "=" + c
					+ "&" + self.paramReqid + "=" + self.sggstReqid
					+ "&" + self.paramSuggestOnOff + "=" + self.onoff
					+ "&" + self.paramSelectNum + "=" + self.sggstSelectNum
					+ "&" + self.paramSelect + "=" + encodeURIComponent(self.usingChar)
					+ "&" + self.paramSuggestUse + "=" + suggestUse
					+ "&" + self.paramSubmitWay + "=" + self.submitWay
					+ "&" + self.paramInput + "=" + encodeURIComponent(q);

				u += plugins.addSubmitLog(self);

				if (self.sendFormParam == TRUE) {
					u += "&" + self.paramFormParam + "=" + encodeURIComponent(self.form.serialize());
				}
				if (self.exParam.length != 0) {
					u += "&" + self.paramExParam + "=" + encodeURIComponent(self.exParam);
				}

				try {
					var key = self.lastInput,
					    enc = self.encoding,
					    col = self.config.attr(self.configCollection),
					    type;
					if (!$.browser.msie) {
						type = "json";
					} else {
						type = "jsonp";
					}

					setTimeout(function() {
						return true;
					}, self.ajaxSubmitLogTimeout);
					$.ajax({
						url: u,
						cache: true,
						timeout: self.ajaxSubmitLogTimeout,
						async: false,
						dataType: type,
						scriptCharset: enc,
						jsonp: self.paramCallback,
						success: function(data) {
						}
					});
				} catch(e) {
					return;
				}
			}
		},

		isUse: function() {
			var self = this;
			return (self.usingChar.length != 0 && self.usingChar.indexOf(self.input.val()) == 0)? TRUE:FALSE;
		},

		judge: function() {
			var self = this;
			var ua = navigator.userAgent.toLowerCase();
			for (var i=0; i < self.blackList.length; i++) {
			    var val = self.blackList[i];
			    if (val.length == 0) continue;
				var re = new RegExp("(" + val + ")");
				if (re.exec(ua) != null) {
					return -1;
				}
			}
			if (self.addBlackList.length != 0) {
				var addBlackArr = self.addBlackList.split(",");
				for (var i=0; i < addBlackArr.length; i++) {
					var val = addBlackArr[i];
					if (val.length == 0) continue;
					if (ua.indexOf(val) != -1) {
						return -1;
					}
				}
			}
			if ($.browser.msie) {
				var self = this;
				var v = $.browser.version;
				if (v > 5 && v < 7 ) {
					self.IeVersion = 6;
				} else if (v > 6 && v < 8 ) {
					self.IeVersion = 7;
				}
			}
			if (self.IeVersion == 6) self.onoffEnable = FALSE;
			for (var i=0; i < self.onOffBlackList.length; i++) {
			    var val = self.onOffBlackList[i];
				if (val.length == 0) continue;
				var re = new RegExp("(" + val + ")");
				if (re.exec(ua) != null) {
					self.onoffEnable = FALSE;
					break;
				}
			}
			return self.IeVersion;
		},

		preResize: function() {
			return true;
		},

		resize: function() {
			var self = this;
			if (!self.preResize()) return;
			var textPos = self.getTextPos();
			var top;
			var left;
			if (self.IeVersion == 7) {
				var inputPosArray = self.getIe7TextPos(textPos);
				top = inputPosArray["top"];
				left = inputPosArray["left"];
			} else {
				top = textPos.top;
				left = textPos.left;
			}
			var totalHeight = Math.ceil(self.input.outerHeight());
			self.suggest.css({
				top:top+totalHeight,left:left
			});
			self.changeSuggestWidth();
			self.postResize();
		},

		postResize: function() {
		},

		getTextPos: function() {
			return this.input.position();
		},

		getIe7TextPos: function(textPos) {
			var inputPosArray = new Array();
			var html = document.documentElement;
			var body = document.body;
			var bodyPos = body.getBoundingClientRect();
			var zoomX = (bodyPos.right - bodyPos.left) / body.offsetWidth;
			var zoomY = (bodyPos.bottom - bodyPos.top) / body.offsetHeight;
			var inputPos = textPos;
			inputPosArray["top"] = Math.ceil(inputPos.top / zoomY);
			inputPosArray["left"] = Math.ceil(inputPos.left / zoomX);
			return inputPosArray;
		},

		changeSuggestWidth: function() {
			var self = this;
			var iw = self.input.outerWidth();
			var sw = self.suggest.outerWidth();
			if (iw != sw) {
				self.suggest.css({width:iw});
				var f = self.suggest.find("." + self.cssKeyword);
				f.css({width:(iw - parseInt(f.css("paddingLeft")) - parseInt(f.css("paddingRight")))});
			}
		},

		onoffReady: function() {
			var self = this;
			if (self.onoffEnable == TRUE) {
				self.createOnElm();
				self.createOffElm();
				self.checkCookie();
			} else {
				self.setInitOnoffNum(ON);
			}
		},

		checkCookie: function() {
			var self = this;
			var u = self.baseUrl + "/" + self.cookieCommand + "?"
					+ self.paramGroupId + "=" + self.groupId
					+ "&" + self.paramCookieMethod + "=" + self.paramCookieCheck;
			$.ajax({
				type: "GET",
				url: u,
				dataType: "jsonp",
				timeout: 500,
				jsonp: self.paramCallback,
				success: function(data) {

				    var result = data["result"];
					if (typeof result != "undefined" && (result == 0 || result == 1)) {
					    var onoff = (result == 0)? ON:OFF;
						self.setInitOnoffNum(onoff);
					}
				}
			});
			setTimeout(function() {self.setInitOnoffNum(ON);}, 1000);
		},

		setInitOnoffNum: function(num) {
			var self = this;
			if (self.onoffInitFlag == TRUE) return;
			self.onoff = num;
			self.onoffInitFlag = TRUE;
			self.displayOnoff();
		},

		createOnElm: function() {
			var self = this;
			self.onElem = $("<div />").hide().attr({"class":self.cssOn, "title":self.openToolTips}).click(function() {
				self.setOnoffNum(ON);
				self.input.focus();
				setTimeout(function() {
					self.lastInput="";
				}, 120);
			});

			self.input.after(self.onElem);
		},

		createOffElm: function() {
			var self = this;
			self.offElem = $("<div />").attr({"class":self.cssOff,"title":self.hideToolTips})
							.append($("<span />").attr("class",self.cssOffImage)
							);
			self.remarks.children().append(self.offElem);
			self.suggest.delegate("." + self.cssOff, "mousedown", function(e) {
					 if (e.which != 1) {
					self.input.blur();
					return;
				}
				self.mouseState = 1;
				self.setOnoffNum(OFF);
				self.input.blur();
				return false;
			});
            self.suggest.delegate("." + self.cssOff, "mouseout", function() {
					self.mouseState = 0;
			});

		},

		setOnoffNum: function(num) {
			var self = this;
			self.onoff = num;
			self.setCookie(num);
			self.displayOnoff();
		},

		setCookie: function(num) {
			var self = this;
			var method = (num == ON) ? self.paramCookieDelete : self.paramCookieAdd;
			var u = self.baseUrl + "/" + self.cookieCommand + "?"
					+ self.paramGroupId + "=" + self.groupId
					+ "&" + self.paramCookieMethod + "=" + method;
			$.ajax({
				type: "GET",
				url: u,
				dataType: "jsonp",
				timeout: 500,
				jsonp: self.paramCallback,
				success: function(data) {
					 // nothing to do
				}
			});
		},

		displayOnoff: function() {
			var self = this;
			if (self.onoffEnable == TRUE) {
				if (self.onoff == ON) {
					self.onElem.hide();
					self.resize();
					self.input.attr("autocomplete", "off");
				} else {
					self.resize();
					self.input.attr("autocomplete", "");
					self.controlOnElem();
					self.suggest.hide();
				}
			}
		},

		controlOnElem: function() {
		    var self = this;
		    if (self.onoffEnable != TRUE || self.onoff != OFF || self.byteNumToHideOpenSggst == 0) return;
		    if (self.isByteLengthOver(self.input.val(),self.byteNumToHideOpenSggst) == TRUE) {
			     self.onElem.hide();
			} else if (!self.onElem.is(":visible")) {
			    self.onElem.show();
			}
		},

		isSuggestUse: function() {
		    var self = this;
            return ((typeof self.scVal != "undefined") && self.scVal == TRUE);
        },

		/**
		 * Check whether a value matches against a regular expression. 
		 * @param value
		 * 		the value to test
		 * @return
		 * 		true if matches
		 */
		isMatch: function(value, pattern) {
			return (value && new RegExp(pattern).test(value)) ? true : false;
		},

		/**
		 * Check a value is int number, greater equals to min and less equals to max.
		 * @param value
		 * 		the value to test
		 * @return
		 * 		true if value is valid int
		 */
		isInRange: function(value, min, max) {
			var num = parseInt(value);
			return !isNaN(num) && num >= min && num <= max;
		},

		/**
		 * Check target value is NOT an empty array.
		 * @param {object} value - The value to test
		 * @return {boolean} true if value is an array whitch length is greater than 0
		 */
		isNotEmptyArray: function(value) {
			return typeof value === "object" && typeof value.pop === "function" && value.length > 0;
		},

		/**
		 * Create emphasized word html. If keyword can be split by whitespace, each word should be emphasized.
		 * @param {string} keyword - keyword which is returned.
		 * @return {string} html string. if keyword is empty or invalid, return empty string.
		 */
		createWordLine: function(keyword) {
			var self = this;
			if (!keyword || self.isMatch(keyword, self.spaceRegExp)) {
				return "";
			}
			var wordLineHtml = self.escapeHtml(keyword),
				strongkey = self.respInput.toLowerCase(),
				strongkeys = strongkey.split(self.whitespaceMatcher),
				key;
			for (var i = 0, l = strongkeys.length; i < l; i++) {
			    key = self.escapeHtml(strongkeys[i]);
			    //wordLineHtml = wordLineHtml.replace(new RegExp("(^|\\s)(" + self.escapeRegExp(key) + ")"), "$1<strong>$2</strong>");
                wordLineHtml = wordLineHtml.replace(new RegExp("(^|\\s)(" + self.escapeRegExp(key) + ")"), "$1<weak>$2</weak>");
			}
			return wordLineHtml;
		},

		/**
		 * Escape characters to be treated as a literal string within a regular expression.
		 * @param {string} string - any string
		 * @return {string} a literal which can be used within a regular expression
		 */
		escapeRegExp: function(string) {
			return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
		},

        isByteLengthOver: function (text, limitLength) {
			if (text === undefined) return FALSE;
			var count = 0,
			n = '',
			len=text.length,
			txtChar,
			i;
			for (i = 0; i < len; i++) {
				n = escape(txtChar = text.charAt(i));
				count += (n.length < 4 && !/%[0|1|8-9|A-F]\w|%7F/.test(n)) ? 1 : 2;
				if (count > limitLength) {
					return TRUE;
				}

			}
			return FALSE;
		}
	};

	$(function() {
	    var rsuggest = new RSuggest();
	    //DEV CHANGE - 12/14/2015 ph
	    //create object to get some things ready to call and create public js object to call by ab tester (searchplat.suggest.rsuggest.init("#sggstConfig"))
		//rsuggest.init("#sggstConfig");
	});

})();

