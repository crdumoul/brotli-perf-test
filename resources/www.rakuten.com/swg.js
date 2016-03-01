/**
 * @license suggest - swg.js 2.4.0
 * Copyright (c) @year Rakuten.Inc
 * Date : @compressesDate
 */
(function() {
	if (typeof jQuery == "undefined") {
		return;
	}
    //DEV CHANGE - 12/14/2015 ph
	//var $ = jQuery.noConflict();

	if (typeof searchplat == "undefined"
			|| typeof searchplat.suggest == "undefined"
			|| typeof searchplat.suggest.plugins == "undefined") {
		return;
	}

	// constants
	var FALSE = 0,
		TRUE = 1,
		WEIGHT = 2;

	/**
	 * Suggest with genre object.
	 */
	var RSwg = function() {
	};

	/**
	 * Rswg prototype.
	 */
	RSwg.prototype = {
		/** Suggest with genre css attribute. */
		cssRow: "swgRow",

		// query parameters
		paramGenre: "ge",
		paramGenreUse: "gu",
		paramOutputFormat: "of",
		paramSortLogic: "sl",
		maxRows: 10,
		maxAddGenreRows: 1,
		maxEachGenreRows: 3,
		noGenreId: "0",
		swgQuery: "swg",
		swgOutput: "osgenre",
		gbQuery: "",
		gbOutput: "osgenre",
	//	spellCheck: null,
		genreSelectBox: $([{ value : this.noGenreId, isDummy : true }]),

		/**
		 * Check validity of configuration.
		 * @param
		 * 		rsuggest object
		 * @return
		 * 		true if all parameters are valid
		 * 		false if any parameter is invalid
		 */
		validateConfig: function(rsuggest) {
			var self = this,
				config = rsuggest.config;
			if (config == undefined) {
				return false;
			}

			// required parameter
			if (!rsuggest.isMatch(config.attr("selectboxId"), /^[a-zA-Z0-9_\-]+$/)) {
				return false;
			}

			// optional parameters
			var maxRows = config.attr("maxRows");
			if (maxRows && !rsuggest.isInRange(maxRows, 10, 30)) {
				return false;
			}
			var maxAddGenreRows = config.attr("maxAddGenreRows");
			if (maxAddGenreRows && !rsuggest.isInRange(maxAddGenreRows, 1, 10)) {
				return false;
			}
			var maxEachGenreRows = config.attr("maxEachGenreRows");
			if (maxEachGenreRows && !rsuggest.isInRange(maxEachGenreRows, 3, 10)) {
				return false;
			}
			var noGenreId = config.attr("noGenreId");
			if (noGenreId && !rsuggest.isMatch(noGenreId, /^[a-zA-Z0-9_\-]+$/)) {
				return false;
			}
			var swgQuery = config.attr("swgQuery");
			if (swgQuery && !rsuggest.isMatch(swgQuery, /^[^<>]+$/)) {
				return false;
			}
			self.swgQuery = swgQuery || self.swgQuery;
			var swgOutput = config.attr("swgOutput");
			if (swgOutput && !rsuggest.isMatch(swgOutput, /^[^<>]+$/)) {
				return false;
			}
			var genreBoostQuery = config.attr("genreBoostQuery");
			if (genreBoostQuery && !rsuggest.isMatch(genreBoostQuery, /^[^<>]+$/)) {
				return false;
			}
			self.gbQuery = genreBoostQuery || self.gbQuery;
			var genreBoostOutput = config.attr("genreBoostOutput");
			if (genreBoostOutput && !rsuggest.isMatch(genreBoostOutput, /^[^<>]+$/)) {
				return false;
			}
			self.spellCheck = config.attr("dym");
			if (self.spellCheck && !rsuggest.isMatch(self.spellCheck, /^[01]$/)) {
				return false;
			}

			return true;
		},

		/**
		 * Initialize RSwg.
		 * @param {object} rsuggest - RSuggest object.
		 * @return {boolean} true if successfully initialized.
		 */
		init: function(rsuggest) {
			var self = this,
				config = rsuggest.config;

			if (!self.validateConfig(rsuggest)) {
				return false;
			}

			self.maxRows = config.attr("maxRows") || self.maxRows;
			self.maxAddGenreRows = config.attr("maxAddGenreRows") || self.maxAddGenreRows;
			self.maxEachGenreRows = config.attr("maxEachGenreRows") || self.maxEachGenreRows;

			var genreSelectBox_ = config.attr("selectboxId");
			self.noGenreId = config.attr("noGenreId") || "0";
			if (typeof genreSelectBox_ != "undefined" && genreSelectBox_.length > 0) {
				self.genreSelectBox = $("#" + genreSelectBox_);
			}
			if (typeof self.genreSelectBox.val() == "undefined"
						|| (!self.genreSelectBox.attr("isDummy")
								&& self.genreSelectBox.find("option[value=" + self.noGenreId + "]").length == 0)) {
				rsuggest.config = $();
				return false;
			}

			rsuggest.form.bind("reset", function() {
				setTimeout(function() {
					self.genreSelectBox.val(self.noGenreId);
				}, rsuggest.afterWaitingforEventTimeout);
			});

			var gbOutput = config.attr("genreBoostOutput") || self.genreBoostOutput;
			/* *
			* 自身の値から判定し、付与するクエリーを返す
			* @param none
			* @return クエリーの1部 (WithGenre or GenreBoost)
			*/
			self.genreSelectBox.getAddingQuery = function() {
				var addQuery;
				if (this.val() == self.noGenreId) {
					addQuery = self.paramSortLogic + "=" + self.swgQuery
							+ "&" + self.paramOutputFormat + "=" + self.swgOutput;
				} else {
					addQuery = self.paramGenre + "=" + this.val()
							+ "&" + self.paramOutputFormat + "=" + self.gbOutput;
					if (self.gbQuery) {
						addQuery += "&" + self.paramSortLogic + "=" + self.gbQuery;
					}
				}
				return addQuery;
			}

			/* *
			* 自身のchangeイベントの度にrespInput(最後にレスポンスを受けた文字列）をクリアする
			* これにより、セレクトボックスを変更した後、入力テキスト上で、矢印キーを押下しても候補が表示されなくなる。
			* @param none
			* @return none
			*/
			self.genreSelectBox.change(function() {
				rsuggest.respInput = "";
			}
			);

			var gName = self.genreSelectBox.attr("name") || "g";
			/* *
			* 自身の値が[未選択]、かつ選択された候補がジャンルつきである場合、hidden[name = g]を作成して
			* ジャンルIDをセットする。その際にセレクトボックスのジャンルを送信しない措置として
			* セレクトボックスの名前を削除する。
			* @param none
			* @return 正常であればtrue
			*/
			self.genreSelectBox.setGenreId = function() {
				var selectedGenre = self.getGenreId(rsuggest);
				var genreHidden = genreSelectBox_ + "_hidden_for_suggest";
				if (rsuggest.form.children("#" + genreHidden).length) {
					rsuggest.form.children("#" + genreHidden).remove();
				}

				if (this.val() == self.noGenreId && selectedGenre.length > 0 ) {
					self.genreHidden = $("<input />").attr("id", genreHidden).attr("name", gName).attr("type", "hidden").val(selectedGenre);
					self.genreHidden.appendTo(rsuggest.form);
					// セレクトボックスが存在するようであれば、名前を消してパラメータが飛ばないようにする
					if ( ! this.isDummy) {
						$(this).removeAttr("name");
					}
				}
			}
			// bodyにonunloadのイベント記述がなければ、登録する（operaのブラウザバック対策）
			if ($("body[onunload]").length == 0){
				$(window).bind("unload", function() {
				}
				);
			}

			/* *
			* テキストボックスの基準位置を返す
			* @param none
			* @return {object} textの位置オブジェクト
			* suggest_divをbodyの直下にしている場合 -> offset()
			* suggest_divをtextの直下にしている場合 -> position()
			*/
			rsuggest.getTextPos = function() {
				return this.input.offset();
			}

			rsuggest.button.bind("click.swg", function(e) {
				try {
					self.genreSelectBox.setGenreId();
					rsuggest.jump(rsuggest.isUse());
				} catch(e) {
					// nothing to do
				};
				return true;
			});

			return true;
		},

		/**
		 * Create suggest candidate elements.
		 * @return {string} constracted element's string.
		 */
		createSuggestElems: function(rsuggest) {
			var self = this,
				keywordElem = "<span class=\"" + rsuggest.cssKeyword + "\"></span></div>",
				suggestRowElem = "<div class=\"" + rsuggest.cssNoSelect + " " + rsuggest.cssRow + "\">" + keywordElem,
				genreRowElem = "<div class=\"" + rsuggest.cssNoSelect + " " + self.cssRow + "\">" + keywordElem,
				suggestElems = "";

			var wordIndex = 0,
				eachGenreRowIndex = 0;
			for (var i = 0, len = self.maxRows; i < len; i++) {
			    //skip what's being typed
                /*
				if (i == 0 && self.maxRows == 1) {
					suggestElems += suggestRowElem;
					continue;
				}
                */
				if (wordIndex < self.maxAddGenreRows && eachGenreRowIndex < self.maxEachGenreRows) {
					suggestElems += genreRowElem;
					eachGenreRowIndex++;
					if (eachGenreRowIndex == self.maxEachGenreRows) {
						wordIndex++;
					}
				} else {
					suggestElems += suggestRowElem;
					wordIndex++;
				}
			}

			return suggestElems;
		},

		postInit: function(rsuggest) {
			var self = this,
				$keywords = rsuggest.suggest.find("." + self.cssRow + " > ." + rsuggest.cssKeyword);

			// set only keyword when the candidate is clicked (not include genre name).
			$keywords.bind("mouseup", function(e) {
				e.stopPropagation();
				var $swgKeyword = $(this);
				var s = $swgKeyword.text();
				if (e.which != 1 || rsuggest.mouseInput != s || rsuggest.clickEnableFlag == FALSE) {
					return;
				}
				rsuggest.over($swgKeyword.text());
				rsuggest.mouseState = 2;
				rsuggest.input.blur();
				rsuggest.input.val(self.getSelectText($swgKeyword));
				rsuggest.sggstSelectNum = rsuggest.index;
				rsuggest.usingChar = s;
				rsuggest.clickEnableFlag = FALSE;
				rsuggest.decisionFlag = TRUE;
				rsuggest.submitWay = 2;
				setTimeout(function(){
					rsuggest.button.click();
				}, rsuggest.justAddedToQueueTimeout);
				rsuggest.eventStop();
			});
		},

		/* *
		* 有効な数値を得るメソッド
		* @param {string} val 検証したい値
		* @param {int} defaultVal デフォルト値
		* @param {int} minVal 最小値
		* @param {int} maxVal 最大値
		* @return
		* 値が数値化できない場合 -> default
		* 値が最小値以下の場合   -> minVal
		* 値が最大値以上の場合   -> maxVal
		*/
		getValidIntValue : function(val, defalutVal, minVal, maxVal) {
			val = (isNaN(val) || val.length == 0) ? defalutVal : parseInt(val);
			if( val < minVal ) return minVal;
			if( val > maxVal ) return maxVal;
			return val;
		},

		/* *
		* 選択した候補のキーワード部分だけを返す
		* @param {element} e 選択中の候補行
		* @return キーワード文字列
		*/
		getSelectText : function(e) {
			var tmp_elm = e.clone();
			tmp_elm.children("span").remove();
			return tmp_elm.text();
		},

		/* *
		* 選択中の候補のジャンルIDを返す
		* @param none
		* @return ジャンルID。選択していない時や、ジャンルが存在しない時は空文字を返す。
		*/
		getGenreId: function(rsuggest) {
			var $genreSpan = rsuggest.suggest
					.children(":eq(" + rsuggest.sggstSelectNum + "):not(." + rsuggest.cssNoSelect + ")")
					.children("." + rsuggest.cssKeyword)
					.children("span[key]");
			return $genreSpan.length === 0 ? "" : $genreSpan.attr("key");
		},

		/**
		 * Search suggestions.
		 * getAddingQuery()を呼ぶ箇所のみ追加
		 * @param none
		 * @return none
		 */
		search: function(rsuggest) {
			var self = this;
			var q = rsuggest.lastInput.replace(rsuggest.spaceRegExp, "");
			if (q.length == 0) {
				rsuggest.readyState += WEIGHT;
				return;
			}
			var c = rsuggest.config.attr(rsuggest.configCollection);
			var cacheKey = c + self.genreSelectBox.val();
			if(typeof rsuggest.resultCache[cacheKey] == "undefined") {
				rsuggest.resultCache[cacheKey] = {};
			}
			var swgCache = rsuggest.resultCache[cacheKey];
			if (typeof swgCache[q] == "undefined") {
				try {
					var u = rsuggest.baseUrl + "/" + rsuggest.searchCommand + "?"
							+ rsuggest.paramCollection + "=" + c
							+ "&" + rsuggest.paramReqid + "=" + rsuggest.sggstReqid
							+ "&" + rsuggest.paramSuggestid + "=" + rsuggest.suggestId
							+ "&" + rsuggest.paramInput + "=" + encodeURIComponent(q)
							+ "&" + rsuggest.paramEncoding + "=" + rsuggest.encoding
							+ "&" + self.genreSelectBox.getAddingQuery()
							+ "&" + rsuggest.paramSpellCheck + "=" + self.spellCheck;
					if (rsuggest.exParam.length != 0) {
						u += "&" + rsuggest.exParam;
					}

					rsuggest.read(u, function(data) {
						self.show(rsuggest, data);
					});
				} catch(e) {
					rsuggest.readyState += WEIGHT;
				}
			} else {
				self.show(rsuggest, swgCache[q]);
			}
		},

		/**
		 * Show suggestions contains genre info.
		 * openSearch用のパーサーへと修正しているので、当JSを利用する場合は、旧レスポンスは対象外となる。
		 * ジャンルを付与する候補の上限数、1レコードあたりのジャンル上限数に基づいて、ジャンルのレスポンスを展開する。
		 * @param {Object} resData レスポンスデータ
		 * @param {String} key 検索文字列
		 * @param {String} cacheKey キャッシュの第１キー、colection + genreId
		 * @return none
		 */
		show: function(rsuggest, resData) {
			var self = this,
				data = $.extend(true, [], resData),
				completions = data[1],
				descriptions = data[2];
			rsuggest.suggest.children("." + rsuggest.cssRow + ", ." + self.cssRow).hide();
			if (!rsuggest.isNotEmptyArray(completions)
					|| !rsuggest.isNotEmptyArray(descriptions)) {
				rsuggest.readyState += WEIGHT;
				return;
			}

			var genreIdsArray = descriptions[0],
				genres = descriptions[1];
			if (!rsuggest.isNotEmptyArray(genreIdsArray)
					|| typeof genres != "object") {
				rsuggest.readyState += WEIGHT;
				return;
			}
			var inputWord = '';
			if (data && data.useInfo && data.useInfo.query && data.useInfo.query.q) {
				inputWord = data.useInfo.query.q;
			}

			var key = inputWord? inputWord : rsuggest.lastInput,
				col = rsuggest.config.attr(rsuggest.configCollection),
				cacheKey = col + self.genreSelectBox.val();
			if (typeof rsuggest.resultCache[cacheKey][key] == "undefined") {
				rsuggest.resultCache[cacheKey][key] = resData;
			}

			self.lastData = resData;
			var len = completions.length;
			if (len > self.maxRows) {
				len = self.maxRows;
			}

			rsuggest.respInput = rsuggest.lastInput;

			// show suggest rows
			var viewCount = 0,
				$suggest = rsuggest.suggest.children("." + rsuggest.cssRow);
			$suggest.filter("." + rsuggest.cssSelect).removeClass(rsuggest.cssSelect).addClass(rsuggest.cssNoSelect);
			$suggest.each(function(i, v) {
				var $row = $(v);
				if (i < len) {
					var keyword = completions[i],
						wordLineHtml = rsuggest.createWordLine(keyword);
					$row.show().children("." + rsuggest.cssKeyword).html(wordLineHtml);
					viewCount++;
				} else {
					$row.hide();
				}
			});

			// show swg rows
			var	wordIndex = 0,
				genreList = [""],
				eachGenreRowIndex = 0,
				$swg = rsuggest.suggest.children("." + self.cssRow);
			$swg.filter("." + rsuggest.cssSelect).removeClass(rsuggest.cssSelect).addClass(rsuggest.cssNoSelect);
			$swg.each(function(i, v) {
				var $row = $(v),
					keyword = completions[wordIndex],
					wordLineHtml = rsuggest.createWordLine(keyword);
					genreIds = genreIdsArray[wordIndex],
					existSwg = false;
				if (typeof genreIds != "undefined") {
					var genreId = genreIds[eachGenreRowIndex],
						genreName = genres[genreId] || " ";
					if (rsuggest.isMatch(genreId, /^[^\s]+/)) {
						existSwg = true;
						wordLineHtml += "<span key=\"" + genreId + "\">" + genreName + "</span>";
						$row.show().children("." + rsuggest.cssKeyword).html(wordLineHtml);
						viewCount++;
					}
				}

				if (!existSwg) {
					$row.hide();
				}

				eachGenreRowIndex++;
				if (eachGenreRowIndex >= self.maxEachGenreRows) {
					wordIndex++;
					eachGenreRowIndex = 0;
				}
			});
			rsuggest.maxIndex += viewCount;
			rsuggest.readyState += WEIGHT;
		},

		/**
		 * Set additional parameter for submit log.
		 * @param {object} rsuggest - RSuggest object.
		 * @return {string} additional query or empty string.
		 */
		addSubmitLog: function(rsuggest) {
			var self = this,
				genreId,
				query = "&" + self.paramGenre + "=" + self.genreSelectBox.val();
			if (typeof self.genreHidden == "undefined") {
				genreId = self.noGenreId;
			} else {
				genreId = self.genreHidden.val();
			}
			query += "&" + self.paramGenreUse + "=" + genreId;
			query += "&" + rsuggest.paramSpellCheck + "=" + self.spellCheck;

			return query;
		},

		/**
		 * Get keyword without genre name.
		 * @param {object} rsuggest - RSuggest object.
		 * @param {element} row - a row element of suggest
		 */
		getSelectedText: function(rsuggest, row) {
			var $row = $(row);
			if (!$row.has("." + self.cssRow)) {
				return null;
			} else {
				var $tmp = $row.children("." + rsuggest.cssKeyword).clone();
				$tmp.children("span").remove();
				return $tmp.text();
			}
		}
	};

	var rswg = new RSwg();
	searchplat.suggest.plugins.add(rswg);

})();