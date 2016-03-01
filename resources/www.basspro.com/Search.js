//-----------------------------------------------------------------
// Licensed Materials - Property of IBM
//
// WebSphere Commerce
//
// (C) Copyright IBM Corp. 2013, 2014 All Rights Reserved.
//
// US Government Users Restricted Rights - Use, duplication or
// disclosure restricted by GSA ADP Schedule Contract with
// IBM Corp.
//-----------------------------------------------------------------


if(typeof(SearchJS) == "undefined" || SearchJS == null || !SearchJS){

	SearchJS = {

		/**
		 * This variable controls the timer handler before triggering the autoSuggest.  If the user types fast, intermittent requests will be cancelled.
		 * The value is initialized to -1.
		 */
		autoSuggestTimer: -1,

		/**
		 * This variable controls the delay of the timer in milliseconds between the keystrokes before firing the search request.
		 * The value is initialized to 400.
		 */
		autoSuggestKeystrokeDelay : 400,

		/**
		 * This variable indicates whether or not the user is hovering over the autoSuggest results popup display.
		 * The value is initialized to false.
		 */
		autoSuggestHover : false,

		/**
		 * This variable stores the old search term used in the auto suggest search box
		 * The value is initialized to empty string.
		 */
		autoSuggestPreviousTerm : "",

		/**
		 * This variable stores the URL of currently selected static autosuggest recommendation
		 * The value is initialized to empty string.
		 */
		autoSuggestURL : "",

		/**
		 * This variable stores the index of the selected auto suggestion item when using up/down arrow keys.
		 * The value is initialized to -1.
		 */
		autoSelectOption : -1,

		/**
		 * This variable stores the index offset of the first previous history term
		 * The value is initialized to -1.
		 */
		historyIndex : -1,

		/**
		 * This variable indicates whether a the cached suggestions have been retrieved.
		 * The value is initialized to false.
		 */
		retrievedCachedSuggestions : false,

		/**
		 * This variable sets the total number of static autosuggest recommendations used for each static category/grouping.
		 * The value is initialized to 4.
		 */
		TOTAL_SUGGESTED : 4,

		/**
		 * This variable sets the total number of previous search history terms.
		 * The value is initialized to 2.
		 */
		TOTAL_HISTORY : 2,

		/**
		 * This variable controls when to trigger the auto suggest box.  The number of characters greater than this threshold will trigger the auto suggest functionality.
		 * The static/cached auto suggest will be performed if this threshold is exceeded.
		 * The value is initialized to 1.
		 */
		AUTOSUGGEST_THRESHOLD : 1,

		/**
		 * This variable controls when to trigger the dynamic auto suggest.  The number of characters greater than this threshold will trigger the request for keyword search.
		 * The static/cached auto suggest will be be displayed if the characters exceed the above config parameter, but exceeding this threshold will additionally perform the dynamic search to add to the results in the static/cached results.
		 * This value should be greater or equal than the AUTOSUGGEST_THRESHOLD, as the dynamic autosuggest is secondary to the static/cached auto suggest.
		 * The value is initialized to 1.
		 */
		DYNAMIC_AUTOSUGGEST_THRESHOLD : 1,

		/**
		 * This variable is an internal constant used in the element ID's generated in the autosuggest content.
		 * The value is initialized to 1000.
		 */
		CACHED_AUTOSUGGEST_OFFSET : 1000,

		/**
		 * This variable is used to indicate whether or not the auto suggest selection has reached the end of the list.
		 * The value is initialized to false.
		 */
		END_OF_LIST : false,
		/**
		  * The auto suggest container ID's
		 */
		STATIC_CONTENT_SECTION_DIV: ["autoSuggestStatic_1", "autoSuggestStatic_2", "autoSuggestStatic_3"],


		/**
		 * NLS message for header
		*/
		staticContentHeaderHistory:"",

		/**
		 * URL to retrieve Cached suggestions
		*/
		CachedSuggestionsURL:"",

		/**
		 * URL to retrieve auto suggest keywords
		*/
		SearchAutoSuggestServletURL:"",

		/**
		 * Timeout variable for department dropdown list
		*/
		searchDepartmentHoverTimeout:"",
		/**
		 * Timeout variable for suggestions dropdown list
		*/
		searchSuggestionHoverTimeout:"",

		searchDepartmentSelect: function(categoryId, lel){
			byId('searchDepartmentLabel').innerHTML=lel.innerHTML;
			byId('search_categoryId').value = categoryId;
			this.hideSearchDepartmentList();
			return false;
		},

		cancelEvent: function(e) {
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			if (e.preventDefault) {
				e.preventDefault();
			}
			e.cancelBubble = true;
			e.cancel = true;
			e.returnValue = false;
		},

		searchDepartmentKeyPressed: function(event, pos, size, categoryId, item){
			if (event.keyCode == 13) { // enter
				this.searchDepartmentSelect(categoryId, item);
				var scrElement = document.getElementById("mobileSearchDropdown");
				if (scrElement != null && scrElement.style.display == 'block'){
					dojo.byId("MobileSimpleSearchForm_SearchTerm").focus();
				}else{
					document.CatalogSearchForm.searchTerm.focus();
				}
			} else if (event.keyCode == 38) { // up arrow
				if (pos != 0) {
					dojo.byId('searchDepartmentList_' + (pos - 1)).focus();
					this.cancelEvent(event);
				}
			} else if (event.keyCode == 40) { // down arrow
				if (pos != size) {
					dojo.byId('searchDepartmentList_' + (pos + 1)).focus();
					this.cancelEvent(event);
				}
			} else if (event.keyCode == 27) { // escape
				var scrElement = document.getElementById("mobileSearchDropdown");
				if (scrElement != null && scrElement.style.display == 'block'){
					dojo.byId("MobileSimpleSearchForm_SearchTerm").focus();
				}else{
					document.CatalogSearchForm.searchTerm.focus();
				}
				this.hideSearchDepartmentList();
			} else if (event.shiftKey && event.keyCode == 9) { // tab
				var scrElement = document.getElementById("mobileSearchDropdown");
				if (scrElement != null && scrElement.style.display == 'block'){
					dojo.byId("MobileSimpleSearchForm_SearchTerm").focus();
				}else{
					document.CatalogSearchForm.searchTerm.focus();
				}
				this.cancelEvent(event);
				this.hideSearchDepartmentList();
			} else if (event.keyCode == 9) { // tab
				dojo.byId('search_submit').focus();
				this.cancelEvent(event);
				this.hideSearchDepartmentList();
			}

			return false;
		},

		hideSearchDepartmentList: function(){
			byId('searchDepartmentList').style.display="none";
		},

		init:function(){
			dojo.connect(document.CatalogSearchForm.searchTerm, "onfocus", SearchJS, SearchJS._onFocus);
			dojo.connect(document.CatalogSearchForm.searchTerm, "onblur", SearchJS, SearchJS._onBlur);
			dojo.connect(document.CatalogSearchForm.searchTerm, "onkeyup", SearchJS, SearchJS._onKeyUp);
			dojo.connect(document.getElementById("searchDropdown"), "onkeyup", SearchJS, SearchJS._onKeyTab);
//			dojo.connect(dojo.byId("Mobilesearch_submit"), "onclick", SearchJS, SearchJS._MobileonClick);
//			dojo.connect(dojo.byId("navSearchMobile"), "onclick", SearchJS, SearchJS._showMobileSearchComponent);
//			dojo.connect(dojo.byId("search_submit"), "onclick", SearchJS, SearchJS._onClick);

			this.staticContentHeaderHistory = storeNLS["HISTORY"];
		},

		showSearchComponent:function(){
			var srcElement = document.getElementById("searchDropdown");
			if(srcElement != null) {
				srcElement.style.display= 'block';
			}
		  },

		hideSearchComponent:function(){
			var srcElement = document.getElementById("searchDropdown");
			if(srcElement != null) {
				srcElement.style.display= 'none';
			}
		},

		_showMobileSearchComponent:function(){
			var srcElement = document.getElementById("mobileSearchDropdown");
			if(srcElement != null) {
			  if(srcElement.style.display == "block") {
				  DepartmentJS.close('mobileSearchDropdown');
				srcElement.style.display= 'none';
			  }
			  else
			  {
				dojo.query(".subDeptDropdown ").forEach(function(node){
					DepartmentJS.close(node.id);
				});
				DepartmentJS.close("departmentsDropdown");
				srcElement.style.display='block';
			  }
			}
		  },

		setCachedSuggestionsURL:function(url){
			this.CachedSuggestionsURL = getAbsoluteURL() + url;
		},

		setAutoSuggestURL:function(url){
			this.SearchAutoSuggestServletURL = getAbsoluteURL() + url;
		},

		_onFocus:function(evt){
			this.showSearchComponent();
			this.retrieveCachedSuggestions();
		},

		_MobileonFocus:function(evt){
			this.showSearchComponent();
			this.retrieveCachedSuggestions();
		},

		_onBlur:function(evt){
			clearTimeout(this.searchSuggestionHoverTimeout);
			this.searchSuggestionHoverTimeout = setTimeout("SearchJS.showAutoSuggest(false)",100);
		},

		_MobileonBlur:function(evt){
			clearTimeout(this.searchSuggestionHoverTimeout);
			this.searchSuggestionHoverTimeout = setTimeout("SearchJS.showAutoSuggest(false)",100);
		},

		_onKeyPress:function(evt){
			return evt.keyCode != dojo.keys.ENTER;
		},

		_onKeyUp:function(evt){
			var srcElement = document.getElementById("searchDropdown");
			srcElement.style.display='block';
			this.doAutoSuggest(evt, this.SearchAutoSuggestServletURL, document.CatalogSearchForm.searchTerm.value);
		},
		_onKeyTab:function(evt){
			if(evt.keyCode == '9' || evt.which == '9'){
				dojo.byId("searchFilterButton").focus();
			}
		},
		_MobileonKeyUp:function(evt){
			var srcElement = document.getElementById("mobileSearchDropdown");
			srcElement.style.display='block';
			this.doAutoSuggest(evt, this.SearchAutoSuggestServletURL, dojo.byId("MobileSimpleSearchForm_SearchTerm").value);
		},

		_handleEnterKey:function() {
			document.CatalogSearchForm.searchTerm.value = trim(document.CatalogSearchForm.searchTerm.value);
			if(document.CatalogSearchForm.searchTerm.value.length > 0) {
				if(this.END_OF_LIST) {
					this.gotoAdvancedSearch(byId("advancedSearch").href);
				}
				else if(this.autoSuggestURL != "") {
					//When enter key is hit with one of the suggested keywords or results highlighted, then go to the URL specified for that result..
					// go to suggested URL
					document.location.href = this.autoSuggestURL;
				}
				else {
					//Enter key is hit, when the focus was in search term input box.. Submit the form and get the results..
					document.CatalogSearchForm.searchTerm.value = trim(document.CatalogSearchForm.searchTerm.value);
					submitSpecifiedForm(document.CatalogSearchForm);
				}
			}

		},


		_onClick:function(evt){
			document.CatalogSearchForm.searchTerm.value = trim(document.CatalogSearchForm.searchTerm.value);
			if(document.CatalogSearchForm.searchTerm.value.length > 0) {
				if(typeof TealeafWCJS != "undefined"){
					TealeafWCJS.processDOMEvent(evt);
				}
				submitSpecifiedForm(document.CatalogSearchForm);
			}
			return false;
		},

		_MobileonClick:function(evt){
			document.MobileCatalogSearchForm.searchTerm.value = trim(document.MobileCatalogSearchForm.searchTerm.value);
			if(document.MobileCatalogSearchForm.searchTerm.value.length > 0) {
				if(typeof TealeafWCJS != "undefined"){
					TealeafWCJS.processDOMEvent(evt);
				}
				submitSpecifiedForm(document.MobileCatalogSearchForm);
			}
			return false;
		},

		doDynamicAutoSuggest:function(url, searchTerm, showHeader) {
			// if pending autosuggest triggered, cancel it.
			if(this.autoSuggestTimer != -1) {
				clearTimeout(this.autoSuggestTimer);
				this.autoSuggestTimer = -1;
			};

			// call the auto suggest
			this.autoSuggestTimer = setTimeout(function() {
				wc.render.getRefreshControllerById("AutoSuggestDisplayController").url = url + "&term=" + encodeURIComponent(searchTerm) + "&showHeader=" + showHeader;
				console.debug("update autosuggest "+url);
				wc.render.updateContext("AutoSuggest_Context", {});
				this.autoSuggestTimer = -1;
			}, this.autoSuggestKeystrokeDelay);
		},

		gotoAdvancedSearch:function(url) {
			var searchTerm = byId("SimpleSearchForm_SearchTerm").value;
			document.location.href = url + '&searchTerm=' + searchTerm;

		},

		showAutoSuggest:function(display) {
			var autoSuggest_Result_div = document.getElementById("autoSuggest_Result_div");
			if (dojo.isIE < 7){
				var autoSuggest_content_div = document.getElementById("autoSuggest_content_div");
				var autoSuggestDropDownIFrame = document.getElementById("autoSuggestDropDownIFrame");
			}

			if(autoSuggest_Result_div != null && autoSuggest_Result_div != 'undefined') {
				if(display) {
					autoSuggest_Result_div.style.display = "block";
					if (dojo.isIE < 7) {
						autoSuggestDropDownIFrame.style.height = autoSuggest_content_div.scrollHeight;
						autoSuggestDropDownIFrame.style.display = "block";
					}
				}
				else {
					if (dojo.isIE < 7) {
						autoSuggestDropDownIFrame.style.display = "none";
						autoSuggestDropDownIFrame.style.height = 0;
					}
					autoSuggest_Result_div.style.display = "none";
				}
			}
		},

		showAutoSuggestIfResults:function() {
			// if no results, hide the autosuggest box

			var scrElement = document.getElementById("mobileSearchDropdown");
			if(typeof(staticContent) != "undefined" && document.getElementById(this.STATIC_CONTENT_SECTION_DIV[0]).innerHTML == "" && document.getElementById("autoSuggestHistory").innerHTML == "" && document.getElementById("dynamicAutoSuggestTotalResults") == null) {
				this.showAutoSuggest(false);
			}
			else if(scrElement != null && scrElement.style.display == 'block')
			{
					if(document.getElementById("MobileSimpleSearchForm_SearchTerm").value.length <= this.AUTOSUGGEST_THRESHOLD)
					{
						this.showAutoSuggest(false);
					}
					else
					{
						this.showAutoSuggest(true);
					}
			}
			else {
					if(document.CatalogSearchForm.searchTerm.value.length <= this.AUTOSUGGEST_THRESHOLD)
					{
						this.showAutoSuggest(false);
					}
					else
					{
						this.showAutoSuggest(true);
					}
			}
		},

		selectAutoSuggest:function(term) {
			var scrElement = document.getElementById("mobileSearchDropdown");
			if (scrElement != null && scrElement.style.display == 'block'){
				var searchBox = document.getElementById("MobileSimpleSearchForm_SearchTerm");
			}else{
				var searchBox = document.CatalogSearchForm.searchTerm;
			}

			searchBox.value = term;
			searchBox.focus();
			this.autoSuggestPreviousTerm = term;
			if(typeof TealeafWCJS != "undefined"){
				TealeafWCJS.createExplicitChangeEvent(searchBox);
			}
			submitSpecifiedForm(document.CatalogSearchForm);
		},

		highLightSelection:function(state, index) {
			var selection = document.getElementById("autoSelectOption_" + index);
			if(selection != null && selection != 'undefined') {

				if(state) {
					selection.className = "autoSuggestSelected";
					var scrElement = document.getElementById("mobileSearchDropdown");
					if (scrElement != null && scrElement.style.display == 'block'){
						var searchBox = document.getElementById("MobileSimpleSearchForm_SearchTerm");
					}else{
						var searchBox = document.CatalogSearchForm.searchTerm;
					}
					searchBox.setAttribute("aria-activedescendant", "suggestionItem_" + index);
					var totalDynamicResults = document.getElementById("dynamicAutoSuggestTotalResults");
					if((totalDynamicResults != null && totalDynamicResults != 'undefined' && index < totalDynamicResults.value) || (index >= this.historyIndex)) {
						searchBox.value = selection.title;
						this.autoSuggestPreviousTerm = selection.title;
						this.autoSuggestURL = "";
					}
					else {
						this.autoSuggestURL = selection.href;
					}
				}
				else {
					selection.className = "";
				}
				return true;
			}
			else {
				return false;
			}
		},

		enableAutoSelect:function(index) {
			this.highLightSelection(false, this.autoSelectOption);
			var item = document.getElementById('autoSelectOption_' + index);
			item.className = "autoSuggestSelected";
			this.autoSelectOption = index;
		},

		resetAutoSuggestKeyword:function() {
			var originalKeyedSearchTerm = document.getElementById("autoSuggestOriginalTerm");
			if(originalKeyedSearchTerm != null && originalKeyedSearchTerm != 'undefined') {
				var scrElement = document.getElementById("mobileSearchDropdown");
				if (scrElement != null && scrElement.style.display == 'block')
				{
					var searchBox = document.getElementById("MobileSimpleSearchForm_SearchTerm");
				}else{
					var searchBox = document.CatalogSearchForm.searchTerm;
				}
				searchBox.value = originalKeyedSearchTerm.value;
				this.autoSuggestPreviousTerm = originalKeyedSearchTerm.value;
			}
		},


		clearAutoSuggestResults:function() {
			// clear the static search results.
			for (var i = 0; i < staticContent.length; i++) {
				document.getElementById(this.STATIC_CONTENT_SECTION_DIV[i]).innerHTML = "";
			}
			this.autoSuggestPreviousTerm = "";
			this.autoSuggestURL = "";
			// clear the dynamic search results;
			document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
			this.showAutoSuggest(false);
		},

		doAutoSuggest:function(event, url, searchTerm) {
			if(searchTerm.length <= this.AUTOSUGGEST_THRESHOLD ) {
				this.showAutoSuggest(false);
			}

			if(event.keyCode == dojo.keys.ENTER) {
				this._handleEnterKey();
				return;
			}

			if(event.keyCode == dojo.keys.TAB) {
				this.autoSuggestHover = true;
				return;
			}

			if(event.keyCode == dojo.keys.ESCAPE) {
				this.showAutoSuggest(false);
				return;
			}

			if(event.keyCode == dojo.keys.UP_ARROW) {
				var totalDynamicResults = document.getElementById("dynamicAutoSuggestTotalResults");
				if(this.END_OF_LIST) {
					dojo.removeClass("autoSuggestAdvancedSearch", "autoSuggestSelected");
					this.END_OF_LIST = false;
					this.autoSelectOption--;
					if(!this.highLightSelection(true, this.autoSelectOption)) {
						if(this.autoSelectOption == this.CACHED_AUTOSUGGEST_OFFSET && totalDynamicResults != null && totalDynamicResults != 'undefined') {
							this.autoSelectOption = totalDynamicResults.value-1;
							this.highLightSelection(true, this.autoSelectOption);
						}
					}
				}
				else if (this.highLightSelection(true, this.autoSelectOption-1)) {
					this.highLightSelection(false, this.autoSelectOption);
					if(this.autoSelectOption == this.historyIndex) {
						this.resetAutoSuggestKeyword();
					}
					this.autoSelectOption--;
				}
				else if(this.autoSelectOption == this.CACHED_AUTOSUGGEST_OFFSET && totalDynamicResults != null && totalDynamicResults != 'undefined') {
					this.highLightSelection(false, this.CACHED_AUTOSUGGEST_OFFSET);
					this.autoSelectOption = totalDynamicResults.value-1;
					this.highLightSelection(true, this.autoSelectOption);
				}
				else {
					// up arrow back to the very top
					this.highLightSelection(false, this.autoSelectOption);
					this.autoSelectOption = -1;
					var originalKeyedSearchTerm = document.getElementById("autoSuggestOriginalTerm");
					this.resetAutoSuggestKeyword();
				}
				return;
			}

			if(event.keyCode == dojo.keys.DOWN_ARROW) {
				if(this.highLightSelection(true, this.autoSelectOption+1)) {
					this.highLightSelection(false, this.autoSelectOption);
					this.autoSelectOption++;
				}
				else if(this.autoSelectOption < this.CACHED_AUTOSUGGEST_OFFSET && this.highLightSelection(true, this.CACHED_AUTOSUGGEST_OFFSET)) {
					// down arrow into the cached autosuggest section
					this.highLightSelection(false, this.autoSelectOption);
					this.autoSelectOption = this.CACHED_AUTOSUGGEST_OFFSET;
					this.resetAutoSuggestKeyword();
				}
				else if(!this.END_OF_LIST) {
					dojo.addClass("autoSuggestAdvancedSearch", "autoSuggestSelected");
					this.highLightSelection(false, this.autoSelectOption);
					this.autoSelectOption++;
					this.END_OF_LIST = true;
					var scrElement = document.getElementById("mobileSearchDropdown");
					if (scrElement != null && scrElement.style.display == 'block'){
						var searchBox = document.getElementById("MobileSimpleSearchForm_SearchTerm");
					}else{
						var searchBox = document.CatalogSearchForm.searchTerm;
					}
					searchBox.setAttribute("aria-activedescendant", "advancedSearch");
				}
				return;
			}

			if(searchTerm.length > this.AUTOSUGGEST_THRESHOLD && searchTerm == this.autoSuggestPreviousTerm) {
				return;
			}
			else {
				this.autoSuggestPreviousTerm = searchTerm;
			}

			if(searchTerm.length <= this.AUTOSUGGEST_THRESHOLD) {
				return;
			};

			// cancel the dynamic search if one is pending
			if(this.autoSuggestTimer != -1) {
				clearTimeout(this.autoSuggestTimer);
				this.autoSuggestTimer = -1;
			}

			if(searchTerm != "") {
				this.autoSelectOption = -1;
				var hasResults = this.doStaticAutoSuggest(searchTerm);
				if(searchTerm.length > this.DYNAMIC_AUTOSUGGEST_THRESHOLD) {
					var showHeader = true; // hasResults;
					this.doDynamicAutoSuggest(url, searchTerm, showHeader);
				}
				else {
					// clear the dynamic results
					document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
				}
			}
			else {
				this.clearAutoSuggestResults();
			}
		},

		tokenizeForBidi:function(displayName, searchName, searchTerm, searchTermLower) {
			var tokens = displayName.split( " > " );
			var html = "";
			var str = "";
			if(tokens.length > 0) {
				html = html + "<div class='category_list'>";
				for(i = 0; i < tokens.length; i++) {
					if(i!=0) {
						// not the first token
						html = html + "<span class='gt'>&nbsp; > &nbsp;</span>";
					}
					if(i == tokens.length - 1) {
						// last token
						var index = searchName.toLowerCase().indexOf(searchTermLower);
						var subStringBefore = searchName.substr(0, index);
						var subStringAfter =  searchName.substr(index + searchTerm.length);
						var highLighted = "<span class='highlight'>" + searchTerm + "</span>";
						str = subStringBefore + highLighted + subStringAfter;
					}
					else {
						str = tokens[i];
					}
					html = html + str;
				}
				html = html + "</div>";
			}
			return html;
		},

		doStaticAutoSuggest:function(searchTerm) {
			var resultList = ["", "", "", "", "", ""];
			var emptyCell = 0;
			var searchTermLower = searchTerm.toLowerCase();
			var listCount = this.CACHED_AUTOSUGGEST_OFFSET;
			var divStart = "<div class='list_section'><div";
			var divEnd =   "</div></div>";

			for(var i = 0; i < staticContent.length; i++) {
				var count = 0;
				for(var j = 0; j < staticContent[i].length; j++) {
					var searchName = staticContent[i][j][0];
					var searchURL = staticContent[i][j][1];
					var displayName = staticContent[i][j][2];
					var index = searchName.toLowerCase().indexOf(searchTermLower);
					if(index != -1) {

						var htmlDisplayName = this.tokenizeForBidi(displayName, searchName, searchTerm, searchTermLower);

						resultList[i] = resultList[i] + "<ul class='autoSuggestDivNestedList'><li id='suggestionItem_" + listCount + "' role='listitem' tabindex='-1'><a id='autoSelectOption_" + listCount + "' title='" + searchName + "' onmouseout='this.className=\"\"; this.autoSuggestURL=\"\";' onclick='SearchJS.hideSearchComponent();' onmouseover='SearchJS.enableAutoSelect(" + listCount + "); this.autoSuggestURL=this.href;' href=\"" + searchURL + "\">" + htmlDisplayName + "</a></li></ul>";
						count++;
						listCount++;
						if(count >= this.TOTAL_SUGGESTED) {
							break;
						}
					}
				}
			}

			for (var i = 0; i < staticContent.length; i++) {
				document.getElementById(this.STATIC_CONTENT_SECTION_DIV[i]).innerHTML = "";
				if(resultList[i] != "") {
					var heading =  "<ul class='autoSuggestDivNestedList'><li class='heading'><span>" + staticContentHeaders[i] + "</span></li></ul>";
					document.getElementById(this.STATIC_CONTENT_SECTION_DIV[emptyCell]).innerHTML = heading + divStart + " role='list' title='" + staticContentHeaders[i] + "' aria-label='" + staticContentHeaders[i] + "'>" + resultList[i] + divEnd;
					emptyCell++;
				}
			}

			var historyList = "";
			var searchHistorySection = document.getElementById("autoSuggestHistory");
			searchHistorySection.innerHTML = "";
			var historyArray = new Array();
			this.historyIndex = listCount;

			var searchHistoryCookie = getCookie("searchTermHistory");
			if(typeof(searchHistoryCookie) != 'undefined') {
				var termsArray = searchHistoryCookie.split("|");
				var count = 0;
				for(var i = termsArray.length - 1; i > 0; i--) {
					var theTerm = termsArray[i];
					var theLowerTerm = theTerm.toLowerCase();
					if(theLowerTerm.match("^"+searchTermLower) == searchTermLower) {
						var repeatedTerm = false;
						for(var j = 0; j < historyArray.length; j++) {
							if(historyArray[j] == theLowerTerm) {
								repeatedTerm = true;
								break;
							}
						}
						if(!repeatedTerm) {
							historyList = historyList + "<ul class='autoSuggestDivNestedList'><li id='suggestionItem_" + listCount + "' role='listitem' tabindex='-1'><a href='#' onmouseout='this.className=\"\"' onmouseover='SearchJS.enableAutoSelect(" + listCount + ");' onclick='SearchJS.selectAutoSuggest(this.title); return false;' title='" + theTerm + "' id='autoSelectOption_" + listCount+ "'><strong>" + searchTerm + "</strong>" + theTerm.substring(searchTerm.length, theTerm.length) + "</a></li></ul>";
							historyArray.push(theLowerTerm);
							count++;
							listCount++;
							if(count >= this.TOTAL_HISTORY) {
								break;
							}
						}
					}
				}
			}


			if(historyList != "") {
				var heading =  "<ul class='autoSuggestDivNestedList'><li class='heading'><span>" + this.staticContentHeaderHistory + "</span></li></ul>"
				searchHistorySection.innerHTML = heading + divStart + " title='" + this.staticContentHeaderHistory + "'>" + historyList + divEnd;
				emptyCell++;
			}

			if(emptyCell > 0) {
				this.showAutoSuggest(true);
				return true;
			}

			return false;
		},

		retrieveCachedSuggestions:function() {
			if(!this.retrievedCachedSuggestions) {
				wc.render.getRefreshControllerById("AutoSuggestCachedSuggestionsController").url = this.CachedSuggestionsURL;
				console.debug("update cache sugg "+this.CachedSuggestionsURL);
				wc.render.updateContext("CachedSuggestions_Context", {});
			}
		},

		/**
		 * Updates the searchTermHistory cookie value...
		 */
		updateSearchTermHistoryCookie:function(updatedSearchTerm){
			var cookieKey = "searchTermHistory";
			var cookieValue = "|" + updatedSearchTerm;
			var searchTermHistoryCookie = getCookie(cookieKey);
			if(typeof(searchTermHistoryCookie) != 'undefined') {
				cookieValue =  dojo.cookie(cookieKey) + cookieValue;
			}
			dojo.cookie(cookieKey, cookieValue, {path:'/'});
		},

		updateSearchTermHistoryCookieAndRedirect:function(updatedSearchTerm, redirectURL){
			this.updateSearchTermHistoryCookie(updatedSearchTerm);
			document.location.href = redirectURL;
		},

		isValidNumber:function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n) && n >= 0;
		},

		/**
		 * Validation method for advanced search form
		 */
		validateForm: function(form) {
			form["minPrice"].value = trim(form["minPrice"].value);
			form["maxPrice"].value = trim(form["maxPrice"].value);

			var minValue = form["minPrice"].value;
			var maxValue = form["maxPrice"].value;

			var minIsValid = this.isValidNumber(minValue);
			var maxIsValid = this.isValidNumber(maxValue);

			if(minValue.length > 0 && !minIsValid) {
				MessageHelper.formErrorHandleClient(form["minPrice"].id, MessageHelper.messages["EDPPaymentMethods_AMOUNT_NAN"]);
				return false;
			}
			else if(maxValue.length > 0 && !maxIsValid) {
				MessageHelper.formErrorHandleClient(form["maxPrice"].id, MessageHelper.messages["EDPPaymentMethods_AMOUNT_NAN"]);
				return false;
			}
			else if (minValue.length > 0 && maxValue.length > 0 && parseFloat(minValue) > parseFloat(maxValue)) {
				MessageHelper.formErrorHandleClient(form["maxPrice"].id, MessageHelper.messages["ERROR_PRICE_RANGE"]);
				return false;
			}
			
			form["searchTerm"].value = trim(form["searchTerm"].value);
			form["filterTerm"].value = trim(form["filterTerm"].value);
			form["manufacturer"].value = trim(form["manufacturer"].value);
			
			var searchTerm = form["searchTerm"].value;
			var filterTerm = form["filterTerm"].value;
			var manufacturer = form["manufacturer"].value;
			
			if (searchTerm.length == 0 && filterTerm.length == 0 && manufacturer.length == 0) {
				MessageHelper.formErrorHandleClient(form["searchTerm"].id, MessageHelper.messages["ERROR_EMPTY_SEARCH_FIELDS"]);
				return false;
			}
			
			form.submit();
		}

	};

	/**
	 * Declares a new render context for the AutoSuggest display.
	 */
	wc.render.declareContext("AutoSuggest_Context",null,"");

	/**
	 * Declares a new render context for the Cached Suggestions.
	 */
	wc.render.declareContext("CachedSuggestions_Context",null,"");

	/**
	 * Declares a new refresh controller for Cached Suggestions
	 */
	wc.render.declareRefreshController({
	   id: "AutoSuggestCachedSuggestionsController",
	   renderContext: wc.render.getContextById("CachedSuggestions_Context"),
	   url: "",
	   formId: ""

	   /**
		* Retrieves the cached suggestions used in the autosuggest box.
		* This function is called when a render context changed event is detected.
		*
		* @param {string} message The render context changed event message
		* @param {object} widget The registered refresh area
		*/
	   ,renderContextChangedHandler: function(message, widget) {
			  var controller = this;
			  var renderContext = this.renderContext;
			  widget.refresh(renderContext.properties);
	   }

	   /**
		* Updates the cached suggestions.
		*
		* @param {object} widget The registered refresh area
		*/
	   ,postRefreshHandler: function(widget) {
			  var controller = this;
			  var renderContext = this.renderContext;
			  var response = document.getElementById('cachedSuggestions');
			  if(response == null) {
					 // No response or an error page.   Clear the contents.
					 document.getElementById("autoSuggestCachedSuggestions_div").innerHTML = "";
			  }
			  else {
					 var scripts = response.getElementsByTagName("script");
					 var j = scripts.length;
					 for (var i = 0; i < j; i++){
							var newScript = document.createElement('script');
							newScript.type = "text/javascript";
							newScript.text = scripts[i].text;
							document.getElementById('autoSuggestCachedSuggestions_div').appendChild (newScript);
					 }
					 SearchJS.retrievedCachedSuggestions = true;
					 var scrElement = document.getElementById("mobileSearchDropdown");
					 if (scrElement != null && scrElement.style.display == 'block')
					 {
						 searchTerm = document.getElementById("MobileSimpleSearchForm_SearchTerm").value;
					 }
					 else
					 {
						 searchTerm = document.CatalogSearchForm.searchTerm.value;
					 }
					 if(searchTerm.length > SearchJS.AUTOSUGGEST_THRESHOLD) {
							SearchJS.doStaticAutoSuggest(searchTerm);
					 }
			  }
	   }
	});

		/**
		 * Declares a new refresh controller for Auto Suggest
		 */
	wc.render.declareRefreshController({
		   id: "AutoSuggestDisplayController",
		   renderContext: wc.render.getContextById("AutoSuggest_Context"),
		   url: "",
		   formId: ""

		   /**
			* Displays the keyword suggestions from the search index
			* This function is called when a render context changed event is detected.
			*
			* @param {string} message The render context changed event message
			* @param {object} widget The registered refresh area
			*/
		   ,renderContextChangedHandler: function(message, widget) {
				  var controller = this;
				  var renderContext = this.renderContext;
				  widget.refresh(renderContext.properties);
		   }

		   /**
			* Display the results.
			*
			* @param {object} widget The registered refresh area
			*/
		   ,postRefreshHandler: function(widget) {
				  var controller = this;
				  var renderContext = this.renderContext;
				  var response = document.getElementById('suggestedKeywordResults');
				  if(response == null) {
					// No response or an error page.   Clear the contents.
					document.getElementById("autoSuggestDynamic_Result_div").innerHTML = "";
				  }
				  SearchJS.showAutoSuggestIfResults();
		   }
	});

}
