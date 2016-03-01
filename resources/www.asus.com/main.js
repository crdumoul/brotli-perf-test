(function($) {
    window.af = window.af || {};
    lowerBrowserFuncionInit();

    $(function() {
        af.initLandingPage();
    });

    var domain = "//www.asus.com";

    if(window.location.host.split(".")[0] == "athena") domain = "//athena.asus.com"; 
    if(window.location.host.split(".")[0] == "test") domain = "//test.asus.com"; 

    var localDomain = domain,
        local,
        debugMode = 0,
        isRtlLang = false,
        publicObj = {}; // 曝光成全域


    /* detect local lang */
    if(typeof asus !== "undefined"){
        local = typeof asus.script.get_local === "function" ? asus.script.get_local() : "";
        if(local == "global"){
            localDomain = domain;
        }else if(local == "cn"){
            localDomain = domain + ".cn";
        }else{
            localDomain = localDomain + "/" + local;
        }

        var rtlCounties = ['eg', 'il', 'ae-ar', 'middleeast-fa', 'nafr-ar', 'sa-ar', 'af-fa'];

        /* detect rtl country */
        isRtlLang = rtlCounties.indexOf(local) >= 0 ? true : false;
    }


    var detect = detect();
    var layout = initLayout();

    af = {
        /* 首頁載入用 */
        initLandingPage: function() {
            var options = {};

            /* 自行註冊放入 */
            // options.menuSuccessCallback = af.initViewedCompareBlock;
            
            layout.init(options);
            layout.otherEffect();
            layout.addEventMoreBtn();
            layout.customRule();

            af.initSearchAutocomplete(),
            af.initShoppingCart(),
            af.initMemberInfo(),
            af.initComparison()

            if(debugMode){
                $(".link-area").hide();
            }

        },
        local: local,
        setting:{
            search:{
                APIurl: local != "cn" ? domain + "/searchapi/api/Suggestion" :  localDomain + "/searchapi/api/Suggestion" ,
                redirectUrl: localDomain + "/search/results.aspx?SearchKey="
            }
        },
        /* 初始化會員資料 */
        initMemberInfo: function() {
            //
            $("#anchorMemberLogout, #anchorMemberlogin").hide();

            var url = ( typeof isApplicationPathSite === 'function' && isApplicationPathSite()) ? "/" + getWebsite() + "/member.asmx/checkMember" : "/member.asmx/checkMember";
            url = "//" + window.location.host + url;
            var sitename = (window.location.host == "www.asus.com.cn") ? "cn" : getWebsite(),
                memberMenu = $("#af-header").find(".nav-member"),
                memberInfoMenu = memberMenu.find(".member-info");

            $.ajax({
                dataType: 'json',
                url: url,
                type: 'POST',
                data: { lang: strLang, strLogin: strLogin.replace("&#39;", "'"), strRegister: strRegister.replace("&#39;", "'"), websitename: sitename },
                success: function (obj) {
                    if (obj.status == "1") {

                        if (getWebsite() == "cn") {
                            memberInfoMenu.find(".member-center-btn").attr("href", "https://account.asus.com.cn/info.aspx?lang=" + strLang + "&site=" + getWebsite())
                                          .find(".logout").attr("href", "https://account.asus.com.cn/logout.aspx?ReturnUrl=" + window.location.href);
                        }
                        else {
                            memberInfoMenu.find(".member-center-btn").attr("href", "https://account.asus.com/info.aspx?lang=" + strLang + "&site=" + getWebsite()).end()
                                          .find(".logout").attr("href", "https://account.asus.com/logout.aspx?ReturnUrl=" + window.location.href);
                        }

                        
                        /* 更新會員資料 */
                        memberInfoMenu.removeClass("not-login")
                            .find(".user-img img").attr("src", obj.img_src.replace("small", "big")).end()
                            .find(".user-name").html(obj.email).end()
                            .find(".member-center-btn").text(sysWording.ASUSAccount).end()
                            .find(".logout").text(sysWording.Logout).end()
                            .addClass("show");

                        af.initMessagePanel();
                        af.getMsg();

                        try { wmx_set_account(obj.cus_id); }
                        catch (err) { }
                    }
                    else {
                        memberMenu.find(".msg-center").addClass("hide");
                        memberInfoMenu
                            .addClass('not-login')
                            .children("a")
                                .attr({
                                    "data-href": obj.signin_url,
                                    "lang": strLang,
                                    "data-lang": strLang,
                                    "data-appid": "0000000002",
                                    "data-js-returnurl": "asus.url.the_url",
                                })
                                .addClass("postlink")
                                .html(strLogin + '<i class="icon icon-profile"></i>')
                                .on("click", postlink_fn);

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            });

            function postlink_fn(event) {

                var frm = $("<form>");
                frm.attr({'action':$(this).data('href'), 'method': 'post'});
                frm.appendTo("body");
                var datas = $(this).data();
                for (var k in datas) {
                    var input = $("<input>");
                    if (k.match(/^js/)){input.attr({'name':k.replace(/^js/, ""), 'value': eval(datas[k])}); }
                    else { input.attr({'name':k, 'value': datas[k]}); }
                    input.appendTo(frm);
                }
                frm.submit();
                return false;
            };
        },
        /* 搜尋自動完成 */
        initSearchAutocomplete: function() {
            var searchApiUrl = af.setting.search.APIurl,
                searchResultUrl = af.setting.search.redirectUrl;

            /* 手機版搜尋按鈕 */
            $("#af-header").find(".mobile-action").find(".btn").on("click", goToSearchResult);

            $("#top-search-bar")
                .on("keyup", function(e) {
                    // TODO setTimeout
                    $this = $(this);
                    var searchResultList = $this.parent().find(".search-result"),
                        resultWrapper = searchResultList.find("#searchresults");


                    if (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 27) {
                        getSearchResult(searchApiUrl, $this.val(), function(returnData) {
                            if (returnData.status && $this.val() != "") {
                                var html = MarkHighLight($this.val(), returnData.result);
								html = SuggestChangeHref($this.val(), html);
                                searchResultList.html(html);
                            }else{
                                searchResultList.empty();
                            }
                        });
                        $this.data("origin-input", $this.val());
                    } else if (e.keyCode == 38) {
                        changeFocusItem(resultWrapper, 'up', $this);
                        if($("#searchresults").find(".highlight").length < 1 ){
                            $this.val($this.data("origin-input")).data("isOrigin", true);
                        }
                    } else if (e.keyCode == 40) {
                        changeFocusItem(resultWrapper, 'down', $this)
                        if($("#searchresults").find(".highlight").length < 1 ){
                            $this.val($this.data("origin-input")).data("isOrigin", true);
                        }
                    } else if (e.keyCode == 27) {
                        changeFocusItem(resultWrapper, 'exit', $this)
                        searchResultList.empty();
                    }

                })
                .on("keydown", function(e) {
                    if (e.keyCode == 13) {
                        goToSearchResult();
                    }
                })
                .on("focus", function(e){
                    $this = $(this);
                    var searchResultList = $this.parent().find(".search-result"),
                        resultWrapper = searchResultList.find("#searchresults");

                    getSearchResult(searchApiUrl, $this.val(), function(returnData) {
                        
                        if (returnData.status && $this.val() != "") {
                            var html = MarkHighLight($this.val(), returnData.result);
							html = SuggestChangeHref($this.val(), html);
                            searchResultList.html(html);
                        }else{
                            searchResultList.empty();
                        }
                    });
                })
                .on("blur", function(){
                    // setTimeout 是為了點連結有效
                    setTimeout(function(){
                        if(!debugMode){
                            $("#searchresults").empty();
                        }
                    }, 200);
                });

            
            /* 單點效果 */
            $("#af-header").find(".search-bar").find(".btn-search-submit").on("click", goToSearchResult);
            
            /* 上下鍵效果 */
            function changeFocusItem(resultList, action, inputArea) {

                var resultLength = resultList.find("a").length - 1,
                    currentIndex = resultList.find(".highlight").index(),
                    newIndex,
                    isOrigin = inputArea.data("isOrigin");


                if (action == "up") {
                    if(currentIndex - 1 < 0) {
                        newIndex = (isOrigin == 1) ? resultLength : -1;
                    }else{
                        newIndex = currentIndex - 1;
                    }

                }

                if (action == "down") {
                    if (currentIndex < 0) {
                        newIndex = 0;
                    } else {
                        newIndex = (currentIndex + 1 > resultLength) ? -1 : currentIndex + 1;
                    }
                }

                if (action == "exit") {
                    resultList.find("a").removeClass('highlight');
                }

                var searchValue = "";

                resultList.find(".highlight").removeClass("highlight").end();
                if(newIndex >= 0){
                    resultList.find("a").eq(newIndex).addClass('highlight');
                    inputArea.data("isOrigin", 0);
                }

                inputArea.val(resultList.find(".highlight").find(".searchheading").text());

            }


            // 取得 MIS API 資料
            function getSearchResult(searchApiUrl, inputString, callback) {

                var ApiUrl = searchApiUrl;
                var options = {
                    queryText: $.trim(inputString) + "*",
                    country: asus.script.get_local().replace("new", ""),
                    type: "products,commercial",
                    RowLimit: "10,10",
                    eventDBRowLimit: "0"
                };

                var resultObj;

                var getResultCallback = (typeof callback == 'function') ? callback : resultObj;



                $.ajax({
                    url: ApiUrl,
                    dataType: 'json',
                    data: options,
                    global: false
                })
                .done(function(data) {
                    // Hightlight
                    resultObj = {
                        status: true,
                        msg: "success",
                        result: data
                    };

                    getResultCallback(resultObj);

                })
                .fail(function(data) {
                    resultObj = {
                        status: false,
                        msg: "get result fail"
                    };
                    getResultCallback(resultObj);
                });

            }

            // 高亮搜尋字
            function MarkHighLight(inputString, msg) {
                var inputStringTrim = $.trim(inputString);
                var html = $(msg);
                if (msg.length > 0) {
                    $(html).find('span').each(function () {
                        //find highlight word
                        var word = $(this).text();
                        var index = word.toLowerCase().indexOf(inputStringTrim.toLowerCase());
                        if (index > -1) {
                            var highlight = word.slice(index, index + inputStringTrim.length);
                            //surround highlight word with <span class='keyword'></span>
                            var keyword = '<span class="keyword">' + highlight + '</span>';
                            //replace span.text() in msg surrounded word
                            var regex = new RegExp(highlight, 'g');
                            var surroundedWord = word.replace(regex, keyword);
                            $(this).html(surroundedWord);
                        }
                    });
                }
                return html;
            }
			
			// 修改href，增加 SearchKey=input 文字
            function SuggestChangeHref(inputString, msg) {
				var inputStringTrim = $.trim(inputString);
                var html = $(msg);
                if (msg.length > 0) {
                    $(html).find('a').each(function () {
						$(this).attr("href", $(this).attr("href") + "?SearchKey=" + inputStringTrim + "/");
                    });
                }
                return html;
            }
			
            // 轉到搜尋結果頁
            function goToSearchResult() {

                var keyword = $("#top-search-bar").val();
                var DefaultKeyword = $("#top-search-bar").data("origin-input");
                // if (keyword != DefaultKeyword) {
                    //var searchType = (getcookiedata("SearchType")) ? "&SearchType=Shop" : "";
                    var searchType = "";
                    // if (isApplicationPathSite()) window.location.href = '/' + asus.script.get_local() + '/Search/Search?SearchKey=' + encodeURI(keyword) + searchType;
                    // else window.location.href = '/Search/Search?SearchKey=' + encodeURI(keyword) + searchType;
                    // 
                    /* 走global 會導致搜尋問題，暫時先將global額外處理 */

                    window.location.href = af.setting.search.redirectUrl + encodeURI(keyword) + searchType;
                    
                // }

            }
        },
        /* 瀏覽紀錄 */
        initRecentlyViewed: function() {
            asus.RecentlyView.rehtml();
        },
         /* 產品比較新功能 */
        initComparison: function(){
            var isShowComparison = false,
            hasCompareItem = false, /* get from cookie */
            compareItems,
            preString = "asusCompareList";

            var comparePanel = new StickyCompare();

            comparePanel.init();
            publicObj.comparePanel = comparePanel;

            /* compare effect */
            function StickyCompare(){
                
                var hasCompareItem = false,
                    comparePanel = "#comparison",
                    storeName = "asusCompareList",
                    compareList = new CompareListModel(storeName),
                    limit = 4;

                function initAddToCompareCheckbox(){
                    $('body')
                        .off('change.compare')
                        .on('change.compare', '.add-compare-check', function() { 
                            var obj = {},
                                $this = $(this),
                                key = $this.attr('alt')
                                showBar = true;

                            if($(this).is(":checked")){ // 如果勾選
                                obj = {
                                    'key' : key,
                                    'modelName' : $(this).data('modelname') ? $(this).data('modelname') : "",
                                    'url' : $(this).data('url') ? $(this).data('url') : "",
                                    'imgType' : 'png',
                                    'imgSrc' : $(this).data("imgsrc") ? $(this).data("imgsrc") : $(this).parent().parent().find(".hot-product-pic").attr("src"),
                                    'prodGroup' : $(this).attr("product-group")
                                }
                                hasCompareItem = true;
                                var imgSrc = obj.imgSrc + "";
                                if(imgSrc.indexOf(".jpg") > 0){ // 確定圖片格式，避免因為每次新 render 導致的視覺問題
                                    obj.imgType = "jpg";
                                }

                                if (compareList.count() >= limit) {
                                    var alertString = sysWordingRead ? sysWording.CompareAlert : 'Accept ' + limit + ' models only, please remove one first.';
                                    showPopover(alertString);
                                }


                                compareList.add(obj);
                                initComparisonPanel();
                            }else{
                                compareList.remove(key);
                            }

                            renderItems(showBar);
                        });

                    if($(".add-compare-check").length || $(".add-to-list").length ){
                        initComparisonPanel();
                        renderItems();
                    }
                }

                /* 提示訊息要更換效果可在此調整 */
                function showPopover(_string, _obj){
                    alert(_string);
                }

                function initComparisonPanel(){

                    /* 有值 */
                    if(compareList.isExist()){

                        /* 沒有Panel */
                        if($(comparePanel).length < 1){

                            var comparisonTitleWord = sysWordingRead ? sysWording.ProductComparisonTitle : "Product Comparison",
                                comparisonInfoWord  = sysWordingRead ? sysWording.ProductCompareRemark : "Product added to comparison. Add up to " + limit + " products or proceed to view compare products selected.",
                                comparisonViewBtnWord = sysWordingRead ? sysWording.CompareNow : "VIEW COMPARISON";


                            var panelHtml = 
                            "<div id=\"comparison\" style=\"display:none\" class=\"close\">" + 
                                "<div class=\"compare-hidden-toggle\">" +
                                "</div>" +
                                "<div class=\"close-btn comparison-close-btn\">×</div>" + 
                                "<div class=\"comparison-wrapper\">" + 
                                    "<div class=\"comparison-title\">" + 
                                        "<h3 class=\"title\">" + comparisonTitleWord + "</h3>" + 
                                        "<p class=\"info\">" + comparisonInfoWord + "</p>" +
                                    "</div>" + 
                                    "<div class=\"comparison-items\">" + 
                                        "<ul class=\"comparison-ul\">" + 
                                        "</ul>" + 
                                    "</div>" + 
                                    "<a class=\"go-to-compare\">" + comparisonViewBtnWord + "</a>" +
                                "</div>" + 
                            "</div>";

                            $(panelHtml).appendTo("body");
                        }

                        var comparisonPanel = $(comparePanel),
                            showBar = true;

                        $(comparePanel).show()
                            .off("click.compareBtns")
                            .on("click.compareBtns", ".close-btn", function(){
                                comparisonPanel.addClass("close");
                            })
                            .on("click.compareBtns", ".compare-hidden-toggle", function(){
                                renderItems(showBar);
                                comparisonPanel.removeClass("close");

                            })
                            // 單品項關閉按鈕
                            .on("click.compareBtns", ".compare-product-info .close", function(){
                                var key = $(this).parent().data("pid");
                                compareList.remove(key);
                                renderItems(showBar);
                            })
                            .on("click.compareBtns", ".go-to-compare", function(){
                                compareList.setGroupId();
                                window.name = "";
                                window.location.href = 'compare.aspx';
                            });

                    }
                }

                /* 清單CRUD */
                function CompareListModel (_schemaName){

                    var list = [],
                        groupList = {},
                        preString = _schemaName,
                        currentPid = null,
                        count = 0,
                        refresh = true,
                        store = new Store(preString);
                        construct();

                    function construct(){ /* 初始化 */
                        currentPid = $(".add-compare-check:eq(0)").attr("product-group") !== "undefined" ? "pgid_" + $(".add-compare-check:eq(0)").attr("product-group") : null;
                        if(currentPid != null){
                            store.setItemKey(currentPid);
                            list = store.getProdsByGroup() || list;
                            count = list.length + 0;
                        }
                    }

                    /* store 抽象 */
                    function Store(_storeName, _itemKey){
                        var store = window.sessionStorage || {}, // af.util.cookie
                            storeName = _storeName,
                            subItemKey = _itemKey;

                        function getAll(){
                            return JSON.parse(store.getItem(storeName));
                        }

                        function setAll(_obj){
                            store.setItem(storeName, JSON.stringify(_obj));
                        }

                        /**
                         * [getProdsByGroup description] 
                         * @param  {String} _key 非必要，初始化預設會先指定
                         * @return {Array}  取得單一產品分類陣列
                         */
                        function getProdsByGroup(_key){ /* 取一 */
                            var parentObj = getAll(storeName) || {status:null, current:subItemKey, result:{}},
                                key = _key || subItemKey;
                            return (typeof parentObj.result !== 'undefined' && parentObj.result[key]) && parentObj.result[key];
                        }

                        function setProdsByGroup(_prods, _key){ /* 設定一項 */
                            var parentObj = getAll(storeName) || {status:null, current:subItemKey, result:{}},
                                key = _key || subItemKey;

                            parentObj.current = key;
                            parentObj.result[key] = _prods;
                            setAll(parentObj);
                        }

                        function setItemKey(_key){
                            subItemKey = _key;
                        }

                        return {
                            get: getAll,
                            set: setAll,
                            getProdsByGroup: getProdsByGroup,
                            setProdsByGroup: setProdsByGroup,
                            setItemKey: setItemKey
                        }
                    }

                    function addItem(_obj){
                        var prods = store.getProdsByGroup() || [];
                        if(typeof _obj == 'undefined' || prods.length >= limit) return;

                        prods.push(_obj);
                        count = prods.length;
                        store.setProdsByGroup(prods);
                        refresh = true;
                    }

                    function removeItem(_id){
                        var prods = store.getProdsByGroup() || [];
                        if(!prods.length) return;
                        for( var i=0; i < prods.length; i++ ){
                            if (prods[i].key == _id) {
                                prods.splice(i, 1)
                            }
                        }
                        count = prods.length;
                        store.setProdsByGroup(prods);
                        refresh = true;
                    }

                    function getItem(_id){
                        var itemList = store.getProdsByGroup(_id);
                        return itemList;
                    }

                    function showAll(){
                        var itemList = store.get() || {};
                        return itemList;
                    }

                    function getCount(){
                        return count;
                    }

                    function isNeedRefresh(){
                        return refresh;
                    }

                    /* 設定當前頁面產品線ID */
                    function setGroupId(_pid){
                        var compareObj = store.getProdsByGroup() || { status:null, current:null, result:{} };
                        compareObj.current = _pid;
                        store.setProdsByGroup(compareObj);
                    }

                    function getGroupId(){
                        var compareObj = store.getProdsByGroup() || { status:null, current:null, result:{} };
                        return compareObj.current;
                    }


                    return {
                        add : addItem,
                        remove: removeItem,
                        get: getItem,
                        showAll: showAll,
                        count: getCount,
                        setGroupId: setGroupId,
                        needRefresh: isNeedRefresh,
                        isExist: function(){
                            return (count > 0)
                        }
                    }
                }

                /* 刷新清單 */
                function renderItems(_isShowBar){
                    var $comparePanel = $(comparePanel);
                    if( compareList.count() || compareList.needRefresh() ){
                        var compareItems = compareList.get() || [];

                        // 恢復頁面的勾選
                        if($(".add-compare-check").length ){
                            // if($comparePanel.hasClass('close')) $comparePanel.removeClass('close');

                            $(".add-compare-check").each(function(e, index){
                                var isSelected = false;
                                for( var i = 0; i < compareItems.length; i ++ ){
                                    if( $(this).attr("alt") == compareItems[i].key ) isSelected = true;
                                };

                                $(this).attr("checked", isSelected);
                                
                            });
                        }

                        $comparePanel.find(".comparison-ul").empty();

                        if(compareItems && compareItems.length){
                            if(_isShowBar){
                                $comparePanel.removeClass('close');
                                for( var i = 0; i < compareItems.length; i++ ){
                                    renderCompareItem(compareItems[i]);
                                };
                            }

                        }else{
                            setTimeout(function(){
                                $comparePanel.addClass('close');
                            }, 500);
                        }
                    }

                    function renderCompareItem(_obj){
                        var compareWrap = $("#comparison").find(".comparison-ul"),
                            key = _obj.key,
                            imgUrl,
                            productName = "modelName" in _obj ? _obj.modelName : "model name",
                            productLink = "url" in _obj ? _obj.url : "url";

                            if( typeof _obj.imgSrc !== 'undefined'){
                                imgUrl = _obj.imgSrc;
                                if(_obj.imgType == "png") imgUrl.replace("setting_fff_1", "setting_x_0");
                            }else{
                                imgUrl = "/media/global/products/" + key + "/"
                                imgUrl += _obj.imgType == 'png' ? 'P_setting_x_0_90_end_130.png' : 'P_130.jpg';
                            }

                        var itemDom = "<li class=\"item\">" + 
                                            "<div class=\"compare-product-info\" data-pid=\"" + key + "\">" +
                                                "<span class=\"close\"></span>" +
                                                "<a href\"" + productLink  + "\">" + 
                                                    "<img class=\"product-image\" src=\"" + imgUrl + "\">" +
                                                "</a>" + 
                                                "<h4 class=\"product-title\">" + productName + "</h4>" +
                                            "</div>" +
                                      "</li>";

                            compareWrap.append(itemDom);
                    }
                }
                
                return {
                    init: function(){

                        initComparisonPanel();
                        if( $(".add-to-compare").length || $(".add-to-list").length ){
                            initAddToCompareCheckbox();
                        }
                        
                    },
                    destroy: function(){
                        $('body').off('change', '.add-compare-check');
                    },
                    updateCheckbox: function(){
                        renderItems();
                    }
                }
            }
        },
         /* 最近瀏覽及比較清單 */
        initViewedCompareBlock: function(){

            $("#menu_compare").find(".aai-mst-header").find("a").on("click", aaiInnerOpen)
                .eq(0).addClass("active");

            /* 初始化最近瀏覽 */
            set_scroll($("#menu_compare"), "viewed-list");


            /* 手動派入sysWording 
             * sysWording 是 ASUS 統一派入多國語的全域變數
             */

            $("#menu_compare").find(".aai-mst-header").find("a").each(function(){
                if(sysWording){
                    if($(this).data("id") == "viewed-list") $(this).text(sysWording.RecentlyViewed);
                    if($(this).data("id") == "div_compare_panel") $(this).text(sysWording.CompareList);
                }

            });

            af.initRecentlyViewed();

            function aaiInnerOpen() {
                var linkID = $(this).data('id');
                $(this)
                    .siblings().removeClass('active').end()
                    .addClass('active');
                // if(!af.isMobile()){
                    set_scroll($("#menu_compare"), linkID);
                // }
            }

            function set_scroll(obj, obj_link) {
                var link_id = obj_link,
                    targetDom = $("#" + link_id);


                if (targetDom.length > 0) {

                    targetDom
                        .siblings().removeClass('active').end()
                        .addClass('active');

                    if ((!targetDom.find('.is_scroll').length > 0) && (!$(this).data('url'))) {
                        asus.scroll({
                            block: link_id,
                            scroll_css: { "position": "absolute", "right": "0px", "top": "60px", "bottom": "0px", "background": "#909090", "border-radius": "3px", "width": "7px" },
                            scroll_bar_css: { "background": "#F3F3F3", "cursor": "pointer", "border-radius": "2px", "width": "5px", "border": "1px solid #909090", "margin": "50px 0 0" },
                            auto_hide: true,
                            height: obj.find('.aai-mms-list').height() - 85
                        });
                        targetDom.append('<div class="is_scroll"></div>');
                    }
                }
                else { return true; }
            }
        },
        /* 初始化訊息中心 */
        initMessagePanel: function() {

            var msg_data = (getWebsite() == "cn") ? '//www.asus.com.cn/message.aspx?lang=' + strLang :
            '//www.asus.com/message.aspx?lang=' + strLang;
            var memberMenu = $("#af-header").find(".nav-member");
            $.ajax({
                url: msg_data,
                dataType: 'jsonp',
                jsonp: 'callback',
                cache: true,
                jsonpCallback: '_asus_message_fn',
                success: function(res) {
                    var msgCenterPanel = memberMenu.find(".msg-center"),
                        msgCount = msgCenterPanel.find(".count");

                    msgCenterPanel.show();
                    msgCenterPanel.find(".sender-list").html(res.message);
                    msgCenterPanel.find(".af-msg-center-footer").find("a")
                        .attr("href", "https://account.asus.com/msgcenter.aspx?lang=" + strLang + "&site=" + getWebsite());

                    msgCenterPanel.find(".list-item").on("click", message_detail);


                    if (res.Total == "0") {
                        msgCount
                            .text("0")
                            .css({'display': 'none' });
                    } else {
                        msgCount
                            .text(res.Total)
                            .css({'display': 'block' });
                    }
                },
                error: function() {}
            });

            var message_detail = function() {
                var message_id = $(this).data('messageid');
                window.open("https://account.asus.com/msgcenter.aspx?sid=" + message_id + "&lang=" + strLang + "&site=" + getWebsite());
            };
        },
        /* 初始化購物車 */
        initShoppingCart: function(){
            var memberMenu = $("#af-header").find(".nav-member"),
                dataTag = memberMenu.find(".shopcart").find("a").eq(0).find("i");

            if(dataTag.length < 1) return;
            checkShoppingCart(dataTag.data("query-url"), memberMenu.find(".shopcart").find(".count"), dataTag.data("url"));

            function checkShoppingCart(ApiUrl, $countEle, shopingCartUrl){
                var memberMenu = $("#af-header").find(".nav-member");
                $.getJSON(ApiUrl, function (data) {
                    if (!data.shoppingCart.isEmpty) {
                        $countEle.show().text(data.shoppingCart.totalQuantity);
                        memberMenu.find(".shopcart").on("click", function(){
                            $('#ifrmMiniCart').attr('src', shopingCartUrl );
                        });
                    }else{
                        memberMenu.find(".shopcart").off("click");
                    }
                });
            }

        },
        initGlobalVar: function(that) {
            /* 不得已要宣告在外部的funciton在這初始化 */


            // 這個是MIS的Search API
            that.MoreClick = function() {
                if ($('#top-search-bar').val() != '') {
                    var DefaultKeyword = $("#searchinputDefault").val();
                    //window.location.href = 'http://' + window.location.host + window.location.pathname + '?SearchKey=' + encodeURI($('#searchinput').val());
                    // window.location.href = 'http://www.asus.com/tw/searchportal/results.aspx?SearchKey=' + encodeURI($('#searchinput').val());
                    window.location.href = af.setting.search.redirectUrl + encodeURI($('#searchinput').val());
                    return false;
                }
            }

            // Compare function
            // 都要曝成全域，會外部呼叫
            that.Search = function(){return false}
            that.afeUtil = publicObj;
        },
        getMsg: function(){

            setInterval(function(){
                if (document.getElementById("api_message")) {return;}
                var po = document.createElement('script');
                po.type = 'text/javascript';
                po.async = true;
                po.id = 'api_message';
                po.src = 'https://' + localDomain + '/api_message.aspx?' +  new Date().getTime()
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(po, s);

            },600000);
        }
    };

    /* let IE 8 support indexOf */
    function lowerBrowserFuncionInit(){
        if (!('indexOf' in Array.prototype)) {
            Array.prototype.indexOf= function(find, i /*opt*/) {
                if (i===undefined) i= 0;
                if (i<0) i+= this.length;
                if (i<0) i= 0;
                for (var n= this.length; i<n; i++)
                    if (i in this && this[i]===find)
                        return i;
                return -1;
            };
        }
    }
    /**
     * 放偵測函式
     */
    function detect(){

        return {
            isMobile: function() {
                var check = false;
                (function(a) {
                    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
                })(navigator.userAgent || navigator.vendor || window.opera);
                return check;
            }
        }

    }

    /**
     * 純layout不介接其他後端資料，用來同步API版天地功能
     * 
     */
    function initLayout(){

        var layout = {
            init: function(options) {

                if (detect.isMobile()) {
                    $("body").addClass('d-mobile');
                }

                layout.initHeaderMenu(options),
                layout.initFooterMenu(),
                layout.resize(),
                layout.orientationChange();

                /* 首頁載入 */
                if($("body").hasClass('landingPage')){
                    layout.initLandingPage();
                }

                if($(window).width() < 721){
                    layout.initMobileFilter();
                }
            },
            initLandingPage: function(){

                var topBarHeight = $("#af-header .nav-bar").height();
                var contentHeight = $(window).height() - topBarHeight;

                if ($(window).width() > 990) {
                    $("#af-container").find(".af-part").eq(0).addClass("scale").height(contentHeight);
                } else {
                    $("#af-container").find(".af-part").eq(0).removeClass("scale").height("auto");
                }
            },
            initHeaderMenu: function(options) {
                var mMenu = layout.initMobileHeaderMenu(options),
                    dMenu = layout.initDesktopHeaderMenu(options);
                if($(window).width() <= 720){
                    if($("#af-header").find(".mobile-menu-toggle").hasClass('mobile')) return;
                    dMenu.cancel();
                    mMenu.init();
                }else{
                    mMenu.cancel();
                    dMenu.init();
                }
            },
            initDesktopHeaderMenu: function(options) {

                var headerMenu = $("#af-header").find(".nav-bar"),
                    mainNav = headerMenu.find(".nav-main"),
                    memberNav = headerMenu.find(".nav-member"),
                    submenu = headerMenu.find(".submenu-area"),
                    submenuItem = submenu.find(".submenu"),
                    hoverTimer, subMenuTimer; 

                    /* 算選單位置 */
                    initMenuPos();

                var init = function(){
                    $(".outer-wrapper").width('auto');
                    var triggerOnceFlag = true; // fix for tablet

                    /* 主選單的子選單 */
                    /* 點選後開啟 hover open 功能，但子選單 hover out 後就 remove hover mode */
                    mainNav.find("li")
                        .on("click", function(e) {
                            var that = this;

                            if($(this).hasClass("active") && triggerOnceFlag){
                                $("body").removeClass('menu-hover-mode');
                                resetMenu();
                            }else{
                                $("body").addClass("menu-hover-mode");
                                showMenu(that);
                                triggerOnceFlag = true;
                            }

                        })
                        .on("mouseenter", function(event) {
                            if(!$("body").hasClass('menu-hover-mode')){ return };
                            triggerOnceFlag = false;
                            var that = this;

                            if(hoverTimer){
                                clearTimeout(hoverTimer)
                            }
                            
                            if(!$(this).hasClass("active")){
                                showMenu(that);
                            }
                        })
                        .on("mouseleave", function(event){
                            var _this = this;
                            triggerOnceFlag = true;
                        
                            if(hoverTimer){
                                clearTimeout(hoverTimer)
                            }

                            hoverTimer = setTimeout(function(){
                                // resetMenu();
                            }, 400);

                        });

                    memberNav.find(".member-item").on("click", function(e) {

                        /* 拔掉主選單開啟的部分 */
                        // resetMenu(),
                        var btn = $(this).find("a");
                        
                        /* 如果點的是本身(icon)就關掉 */
                        if($(this).hasClass("open") && btn.has(e.target).length === 1){
                            resetMenu(); return
                        }

                        $("body").addClass("show-header-menu");

                        $(this)
                            .addClass('open')
                            .siblings().removeClass('open');

                        if($(this).hasClass("products-compare")){
                            // trigger once
                            if($(this).find(".aai-mst-header").find(".active").length <= 0 ){
                                if(options && typeof options.menuSuccessCallback === "function"){
                                    options.menuSuccessCallback();                                    
                                }
                            }
                        }

                        /* 點其他地方關掉 */
                        layout.outsideClick(memberNav, function(container, e) {
                            $("body").removeClass('menu-hover-mode show-header-menu');
                            memberNav.find(".member-item").removeClass('open');
                        })
                    });

                    /* 子選單開啟狀態 */
                    submenuItem
                        .on("mouseenter", function(event) {

                            if(hoverTimer){
                               clearTimeout(hoverTimer)
                            }
                        })
                        .on("mouseleave", function(event) {
                            if(hoverTimer){
                                clearTimeout(hoverTimer)
                            }

                            hoverTimer = setTimeout(function(){
                                if(!debugMode){
                                    resetMenu();
                                    resetMenuLine();
                                    $("body").removeClass("menu-hover-mode");
                                }
                            }, 400);
                        });
                }

                /* 處理多行換欄 
                 * 
                 * 迴圈處理 two-column ，先使用checkHeight算高度，並判斷超過520px則複製一份到右邊，
                 * 舊的則隱藏
                 */
                function submenuCutColumn(itemEleClass){

                    var maxHeight = 520;
                    var targetEle = $("#af-header").find(itemEleClass);

                    if(targetEle.find(".right-column").length < 1){
                        $("<div class='right-column'></div>").appendTo(targetEle);
                    }

                    /* 只處理一次 */
                    if(targetEle.find(".right-column").find(".sub-group").length > 0){
                        return
                    }

                    var currentHeight = 0,
                        flag = 0; // 判斷是否超過高度
                    /* 迴圈算高度，超過則搬到另一個區塊 */
                    targetEle.find(".sub-group").each(function(i2, e2){

                        if(flag > 0){
                            targetEle.find(".right-column").append($(this).clone());
                            $(this).addClass("hide");

                        }else{
                            $(this).addClass("checkHeight");
                            currentHeight += $(this).height() + 15 ; // 邊距

                            if(currentHeight > maxHeight){
                                flag = i2;
                                targetEle.find(".right-column").append($(this).clone());
                                $(this).addClass("hide");
                            }
                        }

                    });

                    targetEle.find(".checkHeight").removeClass('checkHeight');
                    targetEle.find(".right-column").append(targetEle.find(".highlight"));
                }

                function showMenu(selectMenu){
                    var that = selectMenu;

                    $("body").addClass("show-header-menu");


                    $(that)
                        .siblings('li').removeClass('active').end()
                        .addClass("active");

                    var target = $(that).data("target");
                    if (target !== undefined) {
                        submenu
                            .find(".submenu").removeClass('show').end()
                            .find("." + target).addClass('show');

                        if (target == "products-menu") {
                            initSubmenu("products-menu", "products");
                        }

                        if (target == "commercial-menu") {
                            initSubmenu("commercial-menu", "commercial");
                        }

                        if (target == "store-menu") {
                            initSubmenu("store-menu", "store");
                        }

                        /* 點其他地方關掉 */
                        // layout.outsideClick(submenu, function(container, e) {
                        //     $("body").removeClass('menu-hover-mode');
                        //     resetMenu();
                        //     resetMenuLine();
                        // })

                    } else {
                        submenu
                            .find(".submenu").removeClass('show');
                    }

                    menuLine(that);
                }

                function initSubmenu(submenuName, prefix) {
                    var subMenu = $("#af-header").find("." + submenuName),
                        showArea = subMenu.find(".display-area"),
                        hoverDelayTime = 75;

                    /**
                     * 滑到目標區停止更換
                     * subMenuTimer用來傳遞執行的切換函式
                     */
                    showArea.find(".sub-cat-list")
                        .off("hover")
                        .hover(function(){
                            if(subMenuTimer){
                                clearTimeout(subMenuTimer)
                            }
                        });

                    subMenu.find("." + prefix + "-item") // TODO timer優化 
                        .off("mouseenter")
                        .on("mouseenter", function(event) {

                            var that = this;
                            if(subMenuTimer){
                                clearTimeout(subMenuTimer)
                            }

                            /* 用來觸發 */
                            subMenuTimer = setTimeout(function(){
                                var itemId = $(that).data("submenu-id"),
                                    itemEleClass = "." + prefix + "-" + itemId;

                                $(that).siblings('li').removeClass("active").end().addClass('active');


                                if (showArea.find(itemEleClass).length > 0) {
                                    /* 對兩欄的欄位切開 */
                                    if(subMenu.find(itemEleClass).hasClass("two-column")){

                                        /* 將要處理的地方傳遞 */
                                        setTimeout(function(){
                                           submenuCutColumn(itemEleClass);
                                        }, 100);
                                    }
                                    subMenu.addClass('show-sub-items');
                                    showArea.find(".sub-item").removeClass('show').end()
                                            .find(itemEleClass).addClass('show');
                                } else {
                                    subMenu.removeClass('show-sub-items');
                                    showArea.find(".sub-item").removeClass('show');
                                }

                            }, hoverDelayTime);
                                
                        })
                        .on("click", function() { /* 平板用 */
                            var itemId = $(this).data("submenu-id"),
                                itemEleClass = "." + prefix + "-" + itemId;

                            if (showArea.find(itemEleClass).length > 0) {
                                subMenu.addClass('show-sub-items');
                                showArea.find(".sub-item").removeClass('show').end()
                                    .find(itemEleClass).addClass('show');
                            } else {
                                subMenu.removeClass('show-sub-items');
                                showArea.find(".sub-item").removeClass('show');
                            }

                        });
                }

                function initMenuPos(){
                    var preWidth = 107; /* logo and margin */
                    mainNav.find("li").each(function(i, e){
                        var pos = $(this).position(),
                            target = $(this).data("target"),
                            parentWidth = $(this).parent().width();
                        

                        if (target !== undefined) {
                            if(!isRtlLang){
                                submenu.find("." + target).css("left", pos.left + preWidth + 20);
                            }else{
                                submenu.find("." + target).css("right", preWidth + parentWidth - pos.left - $(this).width() - 30);
                            }
                        }
                    });
                }

                // 動態線
                function menuLine(menuEle) {
                    var $menu = $(menuEle),
                        inner = $("#af-header").find(".af-inner").find(".nav-main"),
                        menuWidth = $menu.innerWidth(),
                        menuOffset = $menu.offset().left - inner.offset().left,
                        magicLine;

                    var line_height = ($("#asus-api-header").height()-3 );

                    if($("#af-header").find(".nav-main").find(".magic-line").length < 1){
                        magicLine = document.createElement("span");
                        magicLine.className = "magic-line";
                        $("#af-header").find(".nav-main").append(magicLine);
                    }

                    $("#af-header").find(".magic-line")
                            .stop()
                            .animate(
                                {width:menuWidth+'px', left:menuOffset+'px', opacity: 0.9},
                                300, 
                                function(){

                            });
                }

                function resetMenuLine(){
                    $('#af-header').find(".magic-line").stop().animate({width:0, left:0, opactty: 0.4});
                }


                // 把狀態全部清掉
                function resetMenu(){
                    resetMenuLine();
                    $("body").removeClass("show-header-menu");
                    submenu.find(".submenu").removeClass('show');
                    memberNav.find(".member-item").removeClass('open');
                    mainNav.find("li").removeClass('active');
                }

                return {
                    init: function(){
                        init()
                    },
                    cancel: function(){
                        resetMenu();
                        /* 清除 main nav */
                        mainNav.find("li").off("click").off("mouseenter").off("mouseleave");
                        memberNav.find(".member-item").off("click");
                        submenuItem.off("mouseenter").off("mouseleave");
                    },
                    resize: function(){
                        initMenuPos()
                    }
                }
            },
            initMobileHeaderMenu: function(options) {


                $(".outer-wrapper").width($(window).width());

                var headerMenu = $("#af-header").find(".nav-bar"),
                    mainNav = headerMenu.find(".nav-main"),
                    memberNav = headerMenu.find(".nav-member"),
                    submenu = headerMenu.find(".submenu-area"),
                    toggleBtn = $("#af-header").find(".mobile-menu-toggle"),
                    target = "";

                var init = function(){
                    toggleBtn.addClass('mobile');

                    // headerMenu.find(".sub-area").prependTo(headerMenu);

                    toggleBtn.off("click").on("click", function() {
                        var wH = $(window).height();
                        var $body = $("body");
                        $body.toggleClass('show-menu trans');
                        //       .height(wH);
                        // headerMenu.height(wH);
                        // submenu.find(".submenu").height(wH-60);

                        if (!$body.hasClass("show-menu")) {


                            // 拔掉所有階層 class
                            $body
                                .removeClass(function(index, css) {
                                    return (css.match(/\bmenu-level-\S+/g) || []).join(' ');
                                })
                                //.height("auto");

                            //headerMenu.height("auto");
                            setTimeout(function(){
                                $(".zindex0").removeClass('zindex0');
                            }, 200);
                            submenu.find(".submenu").removeClass('show');

                            /* 寫死，拔掉btn-adv */
                            $(".btn-adv").removeClass('point-right');
                            memberNav.find(".member-item").removeClass('open');

                        }else{
                            mainNav.addClass('show zindex0');
                        }
                    });

                    // 主選單 1 -> 2
                    mainNav.find("li").on("click", function() {
                        target = $(this).data("target");
                        if (target !== undefined) {
                            submenu.find(".submenu").removeClass("show").end()
                                .find("." + target).addClass('show');
                            gotoMenuLevel(2);
                        }

                    });

                    // 返回第一層 2 -> 1
                    submenu.find(".submenu").find(".title").on("click", function() {
                        submenu.find(".submenu").removeClass("show");
                        gotoMenuLevel(1);
                    });

                    // 第二層 2-> 3
                    submenu.find(".submenu").find(".nav").find("li").on("click", function() {
                        var submenuID = $(this).data("submenu-id"),
                            prefix = "",
                            submenuArea = $(this).parent().siblings(".display-area"),
                            targetEle;

                        if (target == "products-menu") {
                            prefix = "products";
                        }

                        if (target == "commercial-menu") {
                            prefix = "commercial";
                        }

                        if (target == "store-menu") {
                            prefix = "store";
                        }

                        submenuArea.addClass('show');
                        targetEle = submenuArea.find(".sub-cat-list").find("." + prefix + "-" + submenuID);

                        // 有三層才開
                        if (targetEle.length > 0) {
                            targetEle.addClass('show');
                            targetEle.find(".origin-title")
                                .one("click", function() {
                                    gotoMenuLevel(2);
                                    submenuArea.removeClass('show')
                                                .find(".sub-cat-list").find(".sub-item").removeClass('show');
                                });

                            gotoMenuLevel(3);
                        } else {
                            submenuArea.removeClass('show')
                                .find(".sub-cat-list").find(".sub-item").removeClass('show');
                        }
                    });

                    // 會員選單
                    memberNav.find(".member-item").on("click", function(e) {
                        // 不是點到按鈕
                        if ($(this).hasClass('open') && $(this).find(".icon").eq(0).is(e.target)) {
                            headerMenu.removeClass('show-member-menu');
                            $(this).removeClass('open')
                        } else {

                            headerMenu.addClass('show-member-menu');
                            $(this).siblings().removeClass('open').end()
                                .addClass('open');

                        }


                        if($(this).hasClass("products-compare")){
                            // trigger once
                            if($(this).find(".aai-mst-header").find(".active").length <= 0 ){
                                if(options && typeof options.menuSuccessCallback === "function"){
                                    options.menuSuccessCallback();                                    
                                }
                            }
                        }
                    });
                }
                
                // 切換選單動態效果
                function gotoMenuLevel(gotoLevel) {
                    window.scrollTo(0, 0);
                    var lastLevelNum = gotoLevel - 1,
                        nowLevel = "menu-level-" + gotoLevel,
                        lastLevel = "menu-level-" + lastLevelNum,
                        $body = $("body");

                    if (!$body.hasClass(nowLevel)) {
                        $body.removeClass(function(index, css) {
                            return (css.match(/\bmenu-level-\S+/g) || []).join(' '); // removes anything that starts with "menu-level-"
                        }).addClass(nowLevel);
                    }
                }

                return {
                    init: function(){
                        init()
                    },
                    cancel: function(){
                        /* 清除 main nav */
                        toggleBtn.removeClass('mobile');

                        mainNav.find("li").off("click");
                        submenu.find(".submenu").find(".title").off("click").end()
                                                .find(".nav").off("click");
                        memberNav.find(".member-item").off("click");
                    }
                }
            },
            initMobileFilter: function(){
                var target = $(".left-menu-zone");

                if($(window).width() < 721){

                    /* 賦予樣式 */
                    target.addClass("afe slide-sidebar");

                    $("#product-home").find(".btn-adv").off("click")
                        .on("click", function(){

                            if($("body").hasClass("show-menu")){
                                $("body").removeClass("show-menu");
                                $(this).removeClass('point-right');

                                setTimeout(function(){
                                    $(".zindex0").removeClass('zindex0');
                                }, 200);
                            }else{
                                $("body").addClass("show-menu");
                                $(this).addClass('point-right');
                                target.addClass('zindex0');
                            }
                        });
                }else{
                    target.removeClass('afe slide-sidebar')
                }
            },
            initFooterMenu: function() {
                var menu = $("#af-footer").find(".mobile-menu");
                menu.on("click", function() {
                    $(this).toggleClass('show-submenu');
                })
            },
            otherEffect: function(){
                /* 後續需要模組化再重新切 */

                var onlineService = initOnlineService(local);

                /* 首頁外全加 */
                if(!$("body").hasClass('landingPage')){
                    onlineService.init();
                }

                /* 右下角客服即時通 */
                function initOnlineService(_local){
                    var ApiUrl = "//demeter.asus.com/WSC/Support_API_New/SupportNewAPI/GetOnlineChatUrl/",
                        ApiOption;
                    

                    if(_local != "global"){
                        /* 此為規則，後端 key 為倒置，所以送參數要轉 */
                        ApiUrl += _local.indexOf("-") === -1 ? _local : _local.split("-")[1] + "-" + _local.split("-")[0];
                    }

                    return {
                        init: function(){

                            if($("#online-service").length > 0 ) return;

                            $.getJSON(ApiUrl + "?callback=?" , ApiOption).done(function(result){
                                if(result && result.StatusCode == 0){
                                    var onlineServiceString = result.Link_Name ? result.Link_Name : "Online Chat",
                                        serviceUrl = result.URL;
                                        onlineChatBtn = '<div id="online-service"><a class="btn" onclick="javascript:window.open(\'' + serviceUrl + '&lang=' + _local + '\', \'\',  \'width=520, height=700\'); ga(\'send\', \'event\', \'button\', \'clicked\', \'onlinechat\');">' + onlineServiceString + '</a></div>';

                                    $(onlineChatBtn).appendTo("body");
                                }
                            });
                            
                        }
                    }
                };
            },
            addEventMoreBtn: function(){
                /* 目前只有增加台灣，預計以後還會增加Global */
                if(local == "tw" || local == "global") {
                    var eventSiteUrl = localDomain + "/event",
                        eventMenu = $("#af-header").find(".hot-menu"),
                        moreBtnDom = "<a class='more-btn' href='" + eventSiteUrl + "' target='_blank' > See All </a>";

                    eventMenu.append(moreBtnDom);
                }
            },
            /* 額外處理的效果 */
            customRule: function(){
                if(local == "global"){
                    var tabletCustomUrl = "//www.asus.com/lifestyle/zenpad/";
                    $("#af-header").find(".sub-products-list").find(".products-155.sub-item").find(".sub-cat-title").find("a").attr("href", tabletCustomUrl);
                }
            },
            /* 點選外部隱藏
             * $element 目標，也就是允許的範圍，通常都是子選單或下拉的內容區塊
             * action callback
             * */
            outsideClick: function($element, action) {
                $(document).off("mouseup").mouseup(function(e) //鎖off會導致無法拖曳放開的事件
                    {
                        var container = $element;
                        if (!container.is(e.target) // 不是自身
                            && container.has(e.target).length === 0 // 子孫元素沒有
                            && container.closest(e.target).length === 0) //下一個元素沒有
                        {
                            action(container, e);
                        }
                    });
            },
            orientationChange: function(){
                /* 橫向 */
                function onLadnscape() {
                    // if (af.isMobile() && $("body").hasClass('d-mobile')) {
                    //     $("body").removeClass('d-mobile');
                    // }
                    
                    if($(window).width() <= 720){
                        (document.querySelector && document.querySelector('meta[name="viewport"]') !== null && document.querySelector('meta[name="viewport"]') ).content = "width=800";
                    }else{
                        (document.querySelector && document.querySelector('meta[name="viewport"]') !== null && document.querySelector('meta[name="viewport"]') ).content = "width=device-width";

                    }
                    $(".outer-wrapper").width("100%");
                }

                /* 直向 */
                function onPortrait() {
                    // if (af.isMobile() && !$("body").hasClass('d-mobile')) {
                    //  $("body").addClass('d-mobile');
                    if($(window).width() > 720){
                        (document.querySelector && document.querySelector('meta[name="viewport"]') !== null && document.querySelector('meta[name="viewport"]')).content = "width=device-width";
                    }
                        $(".outer-wrapper").width($(window).width());

                    // }
                }
                
                function detectOrientationChange() {
                    switch (window.orientation) {
                        case -90:
                        case 90:
                            onLadnscape();
                            break;
                        default:
                            if(asus.cookie.get('viewType') == "desktop") return;
                            onPortrait();
                            break;
                    }

                }

                detectOrientationChange();

                if (detect.isMobile()) {
                    window.addEventListener('orientationchange', detectOrientationChange);
                }
            },
            resize: function() {
                var resizeTimer;

                $(window).on("resize", function() {

                    if(resizeTimer){
                        clearTimeout(resizeTimer)
                    }

                    resizeTimer = setTimeout(function () {
                        layout.initHeaderMenu();
                        initHeroBanner();
                        layout.initMobileFilter();

                    }, 500);
                });


                function initHeroBanner(){
                    if ($(window).width() > 990) {
                        var topBarHeight = $("#af-header .nav-bar").height();
                        var contentHeight = $(window).height() - topBarHeight;
                        $("#af-container").find(".af-part").eq(0).addClass("scale").height(contentHeight);
                    } else {
                        $("#af-container").find(".af-part").eq(0).removeClass("scale").height("auto");
                    }
                }
            }
        }
        return layout;
    }
    window.af = af;
    af.initGlobalVar(window);

   

})(jQuery);