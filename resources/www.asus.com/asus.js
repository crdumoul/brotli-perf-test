window.asus = window.asus || {};
asus = asus || {};
/* Asus Website script function start */
(function() {
asus.script = {
	val : {
		entry_url : "http://www.asus.com/entry.htm"
	},
	in_page : {
		index : function(){
				columnClass = (typeof columnClass === "undefined") ? "" : columnClass;
                $("#article-zone").addClass(columnClass);
		},
		about_asus : function(){
			if (typeof ($("#menu_aboutasus") != "undefined")) {
				$("#menu_aboutasus").parent().addClass("active"); 
				
			} 
		},
		news : function(){
			if (typeof ($("#menu_news") != "undefined")) {
				$("#menu_news").parent().addClass("active"); 
			} 
		},
		awards : function(){
			if (typeof ($("#menu_awards") != "undefined")) {
				$("#menu_awards").parent().addClass("active"); 
			} 
		},
        business: function(){
			$("#main-product-nav ul.nav >li:eq(1) a:eq(0)").attr("href","#");
		}
	},
	get_local : function (){
        //var arr = ["aeen", "lk", "pk", "in", "tr", "tw", "bd", "cn", "hk", "vn", "kr", "jp", "ru", "th", "sg", "nz", "ph", "id", "au", "my", "br", "ar", "de", "pl", "no", "se", "dk", "gb", "sk", "cz", "chfr", "chit", "chde", "ro", "it", "rs", "ua", "hu", "fi", "pt", "es", "fr", "benl", "befr", "nl", "za", "cafr", "caen", "us", "aear", "mv", "mx" , "ir", "il", "aa", "affa", "afpa", "saen", "newglobal","newtw","newsg","newau","newgb","newpt","newes","newfr","newnl","newcafr","newcaen","newus","newpk","newin","newbd","newnz","newph","newmy","newde","newpl","newit","newmv","newlk","newcn","newru","newid","newua","newza","newmx","newaa","newtr","newvn","newkr","newth","newbr","newar","newdk","newchfr","newchit","newchde","newae","newhk","newjp","newno","newse","newsk","newcz","newro","newrs","newhu","newfi","newbenl","newbefr","newaear","newil", "newafpa", "newafda", "newsaen", "newsaar", "newaeen", "ch-fr", "ch-it", "ch-de", "ae-en", "ae-ar", "be-nl", "be-fr", "ca-fr", "ca-en", "sa-en", "sa-ar", "newaf-pa", "newch-fr", "newch-it", "newch-de", "newbe-nl", "newbe-fr", "newca-en", "newca-fr", "newsa-en", "newsa-ar", "newaf-fa", "newae-ar", "newae-en", "neweg" , "newiq", "eg" , "iq", "newua-ua", "newua-ru", "ua-ua", "ua-ru", "nafr-fr", "nafr-ar", "newnafr-fr", "newnafr-ar", "newuk", "uk", "ie", "af-pa", "af-fa", "newnp", "np"];

          var arr = ["aeen", "lk", "pk", "in", "tr", "tw", "bd", "cn", "hk", "vn", "kr", "jp", "ru", "th", "sg", "nz", "ph", "id", "au", "my", "br", "ar", "de", 
            "pl", "no", "se", "dk", "gb", "sk", "cz", "chfr", "chit", "chde", "ro", "it", "rs", "ua", "hu", "fi", "pt", "es", "fr", "benl", "befr", "nl", "za", 
            "cafr", "caen", "us", "aear", "mv", "mx" , "ir", "il", "aa", "affa", "afpa", "saen", "newglobal","newtw","newsg","newau","newgb","newpt","newes","newfr",
            "newnl","newcafr","newcaen","newus","newpk","newin","newbd","newnz","newph","newmy","newde","newpl","newit","newmv","newlk","newcn","newru","newid","newua",
            "newza","newmx","newaa","newtr","newvn","newkr","newth","newbr","newar","newdk","newchfr","newchit","newchde","newae","newhk","newjp","newno","newse","newsk",
            "newcz","newro","newrs","newhu","newfi","newbenl","newbefr","newaear","newil", "newafpa", "newafda", "newsaen", "newsaar", "newaeen", "ch-fr", "ch-it", "ch-de", 
            "ae-en", "ae-ar", "be-nl", "be-fr", "ca-fr", "ca-en", "sa-en", "sa-ar", "newaf-pa", "newch-fr", "newch-it", "newch-de", "newbe-nl", "newbe-fr", "newca-en", "newca-fr", 
            "newsa-en", "newsa-ar", "newaf-fa", "newae-ar", "newae-en", "neweg" , "newiq", "eg" , "iq", "newua-ua", "newua-ru", "ua-ua", "ua-ru", "nafr-fr", "nafr-ar", "newnafr-fr", 
            "newnafr-ar", "newuk", "uk", "ie", "af-pa", "af-fa", "newnp", "np", "tn-fr","newtn-fr","tn-ar","newtn-ar","ma-fr","newma-fr","ma-ar","newma-ar",
            "dz-fr","newdz-fr","dz-ar","newdz-ar","newke","ke","newng","ng","newtn-fr","tn-fr", "newtn-ar","tn-ar", "newma-fr","ma-fr","newma-ar","ma-ar","newdz-fr","dz-fr",
            "newdz-ar", "dz-ar", "newke", "ke", "ng", "newng", "middleeast-fa", "newmiddleeast-fa","bg", "latin","gr"];

          /*var arr = ["aeen", "lk", "pk", "in", "tr", "tw", "bd", "cn", "hk", "vn", "kr", "jp", "ru", "th", "sg", "nz", "ph", "id", "au", "my", "br", "ar", "de", 
            "pl", "no", "se", "dk", "gb", "sk", "cz", "chfr", "chit", "chde", "ro", "it", "rs", "ua", "hu", "fi", "pt", "es", "fr", "benl", "befr", "nl", "za", 
            "cafr", "caen", "us", "aear", "mv", "mx" , "ir", "il", "aa", "affa", "afpa", "saen", "newglobal","newtw","newsg","newau","newgb","newpt","newes","newfr",
            "newnl","newcafr","newcaen","newus","newpk","newin","newbd","newnz","newph","newmy","newde","newpl","newit","newmv","newlk","newcn","newru","newid","newua",
            "newza","newmx","newaa","newtr","newvn","newkr","newth","newbr","newar","newdk","newchfr","newchit","newchde","newae","newhk","newjp","newno","newse","newsk",
            "newcz","newro","newrs","newhu","newfi","newbenl","newbefr","newaear","newil", "newafpa", "newafda", "newsaen", "newsaar", "newaeen", "ch-fr", "ch-it", "ch-de", 
            "ae-en", "ae-ar", "be-nl", "be-fr", "ca-fr", "ca-en", "sa-en", "sa-ar", "newaf-pa", "newch-fr", "newch-it", "newch-de", "newbe-nl", "newbe-fr", "newca-en", 
            "newca-fr", "newsa-en", "newsa-ar", "newaf-fa", "newae-ar", "newae-en", "neweg" , "newiq", "eg" , "iq", "newua-ua", "newua-ru", "ua-ua", "ua-ru", "nafr-fr", 
            "nafr-ar", "newnafr-fr", "newnafr-ar", "newuk", "uk", "ie", "newie", "newnp", "np","tn-fr","newtn-fr","tn-ar","newtn-ar","ma-fr","newma-fr","ma-ar","newma-ar",
            "dz-fr","newdz-fr","dz-ar","newdz-ar","newke","ke","newng","ng","newtn-fr","tn-fr", "newtn-ar","tn-ar", "newma-fr","ma-fr","newma-ar","ma-ar","newdz-fr","dz-fr",
            "newdz-ar","dz-ar","newke","ke", "ng", "newng", "af-fa", "af-pa"];*/

		var rtnVal = window.location.pathname.split("/")[1].toLowerCase();
		var defaultVal = 'global';
		for (var val in arr) {
			if ( arr[val] == rtnVal) { defaultVal =   arr[val]; break; }
		}
        if(window.location.host == "www.asus.com.cn") defaultVal = "cn";

        //:[2012/11/16] Angel, check domain name
        switch (window.location.hostname.toLowerCase().replace('origin-', '')) {
            case "cdn.asus.com":
            case "cdn-amazon.asus.com":
            case "cdn-chinacache.asus.com":
                defaultVal = "tw";
                break;
            case "www.asus.com.cn":
                defaultVal = "cn";
                break;
            case "test.sk.asus.com":
                defaultVal = "sk";
                break;
        };

		asus.script.get_local = function() { return defaultVal; } ;
		return defaultVal;
	},
	isMultipleLanguageWebsite : function () {
        switch (asus.script.get_local().replace("new","")) {
			case "ch-fr":
			case "ch-de":
			case "ch-it":
			case "ca-en":
			case "ca-fr":
			case "be-fr":
			case "be-nl":
			case "ae-en":
			case "ae-ar":
			case "sa-ar":
			case "sa-en":
			case "af-fa":
			case "af-pa":
			case "nafr-ar":
			case "nafr-fr":
            case "ua-ua":
            case "ua":
            case "tn-fr":
            case "tn-ar":
            case "ma-fr":
            case "ma-ar":
            case "dz-fr":
            case "dz-ar":
                return true;
			default:
				return false;
		}
	},
	getShortLanguage : function(strLanguage) {
		switch (strLanguage.toLowerCase()) {
			case "chit":
				return "it"
			case "chfr":
			case "befr":
			case "cafr":
				return "fr";
			case "chde":
				return "de";
			case "benl":
				return "nl";
			case "caen":
				return "en";
			case "aear":
				return "ar";
			case "ae":
				return "en";
			default:
				return strLanguage;
		}
	},
	isApplicationPathSite : function() {
		var domain = window.location.hostname.toLowerCase().replace('origin-', '');
		return ((domain == "athena.asus.com") || (asus.script.get_local() != "global" && asus.script.get_local() != "cn"));
	}
};

asus.start = start = function(setting) {
    if (asus.is_ready()){startfunction(); }
    else {setTimeout( function(){asus.start()}, 1 ); }  
};

startfunction = function(){



    if (window.detachEvent) {

     
        /*$('img').each(function() {
            if (this.complete == true) {

            } else {
                $(this).css("visibility","hidden");
               $(this).load(function() {
                  $(this).css("visibility","");
               });
            }
        });*/
    }
    else {
        $("img").on("error",  function(){
            if ($(this).parent().parent().hasClass('add-play-icon') || $(this).parent().hasClass('add-play-icon')) {
                return false;
            }
            $(this).css("visibility","hidden");
        }); 
    }
	// 2011/11/22 Angel
    if (top.location != location) {
        var pre_url = '';
		try {
		    var enable_flag = false;
		    pre_url = (document.referrer) ? document.referrer.split('/')[2] : top.location.host;
		    //var pre_url = (typeof(document.referrer) == "undefined") ? top.location.host : document.referrer.split('/')[2];
		    enable_flag = (pre_url.indexOf(".asus.com") == -1 && pre_url.indexOf(".cnzz.com") == -1 && pre_url.indexOf(".baidu.com") == -1);
			if ((document.referrer.split('/')[2] != location.host || top.location.host != location.host || document.referrer == asus.script.val.entry_url) && enable_flag) top.location.href = location.href;
        }
		catch (err) {
		    if (pre_url.indexOf(".asus.com") == -1 && pre_url.indexOf(".cnzz.com") == -1 && pre_url.indexOf(".baidu.com") == -1) top.location.href = location.href;
		}
	}

	// load local css
    if (asus.script.get_local().replace("new", "") != "global" && asus.script.get_local().replace("new", "") != "middleeast-fa")
		$("#ctl00_localcss").attr("href", "/websites/" + asus.script.get_local().replace("new","").replace("-","") + "/css/n_local.css");
    if (asus.script.get_local().replace("new", "") == "middleeast-fa")
        $("#ctl00_localcss").attr("href", "/websites/affa/css/n_local.css");
    if (asus.script.get_local().replace("new", "") == "ae-en")
        $("#ctl00_localcss").attr("href", "/websites/ae/css/n_local.css");

	// nofocus
	$("a").focus(function() { $(this).blur(); });
	$("input").focus(function(){
		if ($(this).attr("type") == "image" || $(this).attr("type") == "checkbox") {
			$(this).blur();
		}
	});
	
	if (asus.script.get_local() == "ie") {
	    $("#footer_country_link").html("<a href=\"http://www.asus.com/entry.htm\" onclick=\"googleTrackEvent('Country_Lang_Menu', this, true);return false;\" title=\"entry_page\">Ireland / <span class=\"lang_set\">English</span></a>");
	}
	if (asus.script.get_local() == "middleeast-fa") {
	    $("#footer_country_link").html("<a href=\"http://www.asus.com/entry.htm\" onclick=\"googleTrackEvent('Country_Lang_Menu', this, true);return false;\" title=\"entry_page\">MiddleEast-fa / <span class=\"lang_set\" style=\"color:#fff\">فارسی</span></a>");
	}

    /*
	if(asus.script.isMultipleLanguageWebsite()){
		$("#products-sitemap a").each(function(e) {
		   $(this).attr('href', '/' + asus.script.getShortLanguage(asus.script.get_local()) + $(this).attr('href'));
		});
	}
	else if (asus.script.isApplicationPathSite()){
		$("#products-sitemap a").each(function(e) {
		   $(this).attr('href', '/' + asus.script.get_local() + $(this).attr('href'));
		});
	}
    */

	//if (getcookiedata("isBusiness") == "BusinessType") { $("#main-product-nav ul.nav >li:eq(0) a:first").text("Consumer");  }
	//else { $("#main-product-nav ul.nav >li:eq(0) a:first").text("Products"); }
	
	
	// Search
	var search_fn = function(){
		var newWeb = ['global','ae-en','lk','in','tr','tw','cn','hk','vn','kr','jp','ru','th','sg','nz','ph','id','au','my','latin','de','pl',
'no', 'se', 'dk', 'uk', 'sk', 'cz', 'ch-fr', 'ch-it', 'ch-de', 'ro', 'it', 'rs', 'ua', 'hu', 'fi', 'pt', 'es', 'fr', 'be-nl', 'be-fr', 'nl', 'gr', 'ca-fr',
'ca-en','us','ae-ar','mx','bg','ie','sa-en','sa-ar','eg','ua-ua','nafr-ar','nafr-fr'];
		var keyword = $("#searchinput").val();
        var DefaultKeyword = $("#searchinputDefault").val();
        if (keyword != DefaultKeyword) {
            //:2014/06/19 Angel, remove shop re-search function
            //var searchType = (getcookiedata("SearchType")) ? "&SearchType=Shop" : "";
            //var searchType = "";
            //if (isApplicationPathSite()) window.location.href = '/' + asus.script.get_local() + '/Pages/results.aspx?SearchKey=' + encodeURI(keyword) + searchType;
            //if (isApplicationPathSite()) window.location.href = '/' + asus.script.get_local() + '/Search/Search?SearchKey=' + encodeURI(keyword) + searchType;
            //else window.location.href = '/Search/Search?SearchKey=' + encodeURI(keyword) + searchType;
			
			//:2015/07/06 Kyle, new searchportal
			if(newWeb.indexOf(asus.script.get_local())>0 ){
				if (isApplicationPathSite()) window.location.href = '/' + asus.script.get_local() + '/search/results.aspx?SearchKey=' + encodeURI(keyword) ;
				else{
				window.location.href = '/search/results.aspx?SearchKey=' + encodeURI(keyword) ;
				}
			}
			else{
				if (isApplicationPathSite()) 
				window.location.href = '/' + asus.script.get_local() + '/Search/Search?SearchKey=' + encodeURI(keyword);
				else 
				window.location.href = '/Search/Search?SearchKey=' + encodeURI(keyword);
			}
        }
	}
    $("#searchinput").keypress(function(event) {
        if (event.keyCode == 13) { search_fn(); return false; }
    });
	$("#search-btn").on("click", function(){search_fn(); return false;});

	
    // infonumber
    setInterval(function(){ 
		if (document.getElementById("api_message")) {return;}
		var po = document.createElement('script');
		po.type = 'text/javascript';
		po.async = true;
		po.id = 'api_message';
		po.src = 'https://www.asus.com/api_message.aspx?' +  new Date().getTime()
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(po, s);
        
    },600000);
            
            
	//XML_ReaderByWebservice("getCompare_Xml", "CompareTitle", "");
	// Recently_panel
	asus.Recently_panel.rehtml();
	
	// Init menu
	asus.initMenu();

	// ADD class
	$("html").addClass(in_page); 

    //setCompareList();
    
	// page_function
	if (in_page == 'Index') {asus.script.in_page.index();}
	if (in_page == 'About_ASUS') {asus.script.in_page.about_asus();}
	if (in_page == 'About_ASUS') {asus.script.in_page.about_asus();}
	if (in_page == 'News') {asus.script.in_page.news();}
	if (in_page == 'Award') {asus.script.in_page.awards();}
	if (in_page == 'Business') {asus.script.in_page.business();}
};



/**
 * 	Init menu 
 *  update : 2015/01/08 
 *  By Lambert
 */
asus.initMenu = function (){
  var nav = $("#asus-api-header .aai-nav"),
      navWidth = nav.width(),
      navItem = nav.find("li")
      navItemMaxWidth = Math.round(nav.width() / navItem.length);
      currentNavWidth = 0;

  navItem.each(function(i, e){ /* 先計算總寬並標記須修正 */
   
    var itemWidth = Math.round($(this).outerWidth()) ;
    var itemHtml = $(this).html();
    currentNavWidth += itemWidth;

    if($(window).width() > 719){ /* 小螢幕不處理 */

        if(itemWidth > navItemMaxWidth){
            
            $(this).addClass('limit');

            if(itemHtml.indexOf("&amp;") != -1){ /* 有&先斷行，再判斷是否破表 */
                
                if(!$(this).hasClass('char2br')){ /* & 加斷行 */
                    $(this).addClass('char2br').html(itemHtml.replace("&amp;", "&amp;<br>"));
                }

                if($(this).width() > navItemMaxWidth){ /* 寬度超過鎖寬度 */
                    $(this).width(navItemMaxWidth);
                }

            }else{

                $(this).width(navItemMaxWidth); 

            }
  

        }else{
            $(this).removeClass('limit').removeAttr('style');
        }
    }else{ /* 小螢幕拔掉處理 */

        $(this).removeClass('limit').removeAttr('style');
        if($(this).hasClass('char2br')){
            $(this).removeClass('char2br').html(itemHtml.replace("&amp;<br>", "&amp;"));
        }
    }

  });
    

  if($(window).width() > 719){ /* 小螢幕不處理 */
		if ( currentNavWidth > navWidth ){

  			if($(window).width() > 959){			
					nav.parent(".aai-menu").css({"padding-left":"10%"});
				}
		 		
		 		nav.parent(".aai-menu")
		 					.find("li").css("padding", "0 0.5%")
		 						.find("a").css("font-size", "14px");
		 						
		}
	}

}



/*
	Recently_panel
    update : 2013/04/22
    duncan 
*/
asus.Recently_panel = {
    val : Array(),
	init : function(){
		var content = asus.cookie.get("recently");
		if (!content) { return; }
		var models = content.split(",");
		var count = 0 ;
		for (var intI = 0; intI < models.length; intI++) {
			var model = Array ;
			if (intI < models.length) { model = models[intI].split("^"); }
			if (model[0] != '' && model[1] != '') {
				asus.Recently_panel.val[count] = Array();
				asus.Recently_panel.val[count][0] = model[0];
				asus.Recently_panel.val[count][1] = model[1];
                asus.Recently_panel.val[count][2] = model[2];
				count++;
				if (count == 10) { break; }
			}
		}
		asus.Recently_panel.init = function(){return; }
	},
	rehtml : function(){
		asus.Recently_panel.init();
		var count = 0;

		for (var intI = 0; intI < 10; intI++) {
			if (asus.Recently_panel.val[intI]) {
				$("#recently_panel ul li").eq(intI).html('<a href="product.aspx?P_ID=' + asus.Recently_panel.val[intI][0] + '"><img src="' + asus.Recently_panel.val[intI][2] + '" alt="Recently' + intI + '" /></a><a href="#" class="removebutton"></a><span class="list-product-name">' + asus.Recently_panel.val[intI][1] + '</span>');
				//$("#recently_panel ul li").eq(intI).html('<a href="product.aspx?P_ID=' + asus.Recently_panel.val[intI][0] + '"><img src="/media/global/products/' + asus.Recently_panel.val[intI][0] + '/P_130.jpg" onerror="this.onerror=null;this.src=/media/global/products/' + asus.Recently_panel.val[intI][0] + '/P_setting_fff_1_80_end_130.png;" alt="Recently' + intI + '" /></a><a href="#" class="removebutton"></a><span class="list-product-name">' + asus.Recently_panel.val[intI][1] + '</span>');
				count++;
			}
			else {
				$("#recently_panel ul li").eq(intI).html('');
			}
		}
		$("#recently_panel .removebutton").each(function(i){
			$(this).attr("remove_i",i);
			$(this).on("click",function(){ asus.Recently_panel.reset($(this)); asus.Recently_panel.remove($(this).attr("remove_i")); return false;});
		});
		$("#viewed-list .info-number").html(count);
	},
	remove : function(i){
		//asus.Recently_panel.init();
		asus.Recently_panel.val.splice(i,1); 
		//asus.Recently_panel.rehtml();
		asus.Recently_panel.recookie();
	},
	recookie : function(){
		var str = '';
		for (var intI = 0; intI < asus.Recently_panel.val.length; intI++) {
			if (intI == 10) { break; }
			str += asus.Recently_panel.val[intI][0] + "^" + asus.Recently_panel.val[intI][1] + "^" + asus.Recently_panel.val[intI][2] + ",";
            //str += asus.Recently_panel.val[intI][0] + "." + asus.Recently_panel.val[intI][1] + ",";
		}
		if (str) { asus.cookie.set("recently",str);}
		else{ asus.cookie.del("recently");}
	},
	add : function(id,name,src){
		asus.Recently_panel.init();
		var count = asus.Recently_panel.val.length;
		count = count > 10 ? 10 : count;
		if (count > 0){
		for (var intI = 0; intI < count; intI++) {
			if (asus.Recently_panel.val[intI][0] == id){ return false; }
		}}
		var arr = Array();
		arr[0] = id;
		arr[1] = name;
        arr[2] = src.replace("_000_","_fff_");
		asus.Recently_panel.val.unshift(arr);
		asus.Recently_panel.rehtml();
		asus.Recently_panel.recookie();
	},
	reset:function(t){
		var $ul_parent=$(t).parent().parent(),
			$ul_list=$('#recently_panel .compare-viewed-list');
			$(t).parent().remove();
		if($ul_parent[0]===$ul_list[1]){
			$('<li class="span-5col"></li>').appendTo($ul_parent);
		}else{
			if(asus.Recently_panel.val.length>5){
				var $ct=$($ul_list[1]).find('li').eq(0);
				$ct.appendTo($ul_list[0]);
				$('<li class="span-5col"></li>').appendTo($($ul_list[1]));
			}else{
				$('<li class="span-5col"></li>').appendTo($ul_parent);
			}
		}
		$("#viewed-list .info-number").html(asus.Recently_panel.val.length-1); 
	}
}

/*
  updateifameSize (only one)
    update : 2012/09/17
*/
asus.updateifameSize = function(w,h){
	var obj = getID("ifame_auto_size");
	if (!obj){return false;}
	var class_arr = obj.className.split(" ");
	for (var val in class_arr) {
        if (class_arr[val] == "auto_w") { obj.style.width = (parseInt(w) + 25) + "px"; }
		else if (class_arr[val] == "auto_h") { obj.style.height = (parseInt(h) + 25) + "px"; }
	}
}
if ( document.addEventListener ) {
    window.onmessage = function(e){
        var data = e.data.split("_");
        if ((data[0].match(/^[0-9]+/)) && (data[1].match(/^[0-9]+/))){
        asus.updateifameSize(data[0],data[1]);
        }
    };
}
else if ( document.attachEvent ) {
    window.attachEvent('onmessage',function(e) {
        var data = e.data.split("_");
        if ((data[0].match(/^[0-9]+/)) && (data[1].match(/^[0-9]+/))){
        asus.updateifameSize(data[0],data[1]);
        }
    });
}



/* 
    Block Translation
    update : 2012/05/22 
*/
asus.BTranslation = function(setting) {
    if (asus.is_ready()){new BTranslation_function(setting); }
    else {setTimeout( function(){asus.BTranslation(setting)}, 1 ); }  
};
BTranslation_function = function(setting) {
    if (!getID(setting.block)){return false;}
    var obj = getID(setting.block);
    var in_run;
    var is_start = (document.documentElement.clientWidth < setting.width || !setting.width) ? true : false ;
    var in_eq = setting.main_eq ? setting.main_eq : 0;
    var button = setting.click_button ? getID(setting.click_button) : false;
    obj.BmarginLeft = '';
    for (var i =obj.childNodes.length-1 ;i >=0; i--) { 
        if (obj.childNodes[i].nodeType != 1) { obj.removeChild(obj.childNodes[i]) }
        else {
            obj.childNodes[i].Bwisth = obj.childNodes[i].clientWidth;
            obj.childNodes[i].Bfloat = obj.childNodes[i].style.cssFloat;
            obj.childNodes[i].BmarginLeft = obj.childNodes[i].style.marginLeft;
            obj.childNodes[i].BmarginRight = obj.childNodes[i].style.marginRight;
        }
    }
    var resize = function(){
        is_start = (document.documentElement.clientWidth < setting.width || !setting.width) ? true : false ;
        obj.style.marginLeft = obj.BmarginLeft;
        for (var i =obj.childNodes.length-1 ;i >=0; i--) {
            obj.childNodes[i].style.width = '';
            obj.childNodes[i].style.cssFloat = obj.childNodes[i].Bfloat;
            obj.childNodes[i].style.marginLeft = obj.childNodes[i].BmarginLeft;
            obj.childNodes[i].style.marginRight = obj.childNodes[i].BmarginRight;
            obj.childNodes[i].Bwisth = obj.childNodes[i].clientWidth;
        }
        if (is_start) { runBT(); }
    }
    var in_width = obj.childNodes[in_eq].clientWidth;
    var next = function(){
        clearInterval(in_run);
        in_eq = in_eq+1 < obj.childNodes.length ? in_eq+1 : 0;
        var w = Math.abs(0-parseInt(obj.childNodes[in_eq].style.marginLeft)-parseInt(obj.style.marginLeft));
        var set = 0-parseInt(obj.childNodes[in_eq].style.marginLeft);
        in_run = setInterval( function(){
            run(set,w);
        }, 13 );
    }
    var run = function(p,w){
        var offset = w/setting.move_time*13;
        if (parseInt(obj.style.marginLeft) > p) {
            offset = parseInt(obj.style.marginLeft) - offset <= p ? p : parseInt(obj.style.marginLeft) - offset;
        }
        else if (parseInt(obj.style.marginLeft) < p) {
            offset = parseInt(obj.style.marginLeft) + offset >= p ? p : parseInt(obj.style.marginLeft) + offset;
        }
        obj.style.marginLeft = offset + "px";
        if  (offset == p ){
        
            clearInterval(in_run);
        }
    }
    var runBT =  function(){
        var marginLeft = 0;
        var BmarginLeft = 0;
        for (var i = obj.childNodes.length-1 ; i >= 0 ; i-- ){
            obj.childNodes[i].style.cssFloat = "left";
            obj.childNodes[i].style.marginLeft =  marginLeft + "px";
            obj.childNodes[i].style.width = obj.childNodes[i].Bwisth + "px";
            if (i == in_eq) { BmarginLeft = 0-marginLeft; }
            if (i > 0) {marginLeft -= obj.childNodes[i-1].Bwisth ;}
        }
        obj.style.marginLeft =  BmarginLeft + "px";
    }
    if (is_start) { runBT(); }
    if (button) {asus.addEvent(button,"click",next);}
    asus.addEvent(window,"resize", resize); 
    
};
/* 
    AutoComplete
    update : 2012/11/02 
*/
asus.autoComplete = function(setting) {
    if (asus.is_ready()){new autoComplete_function(setting); }
    else {setTimeout( function(){asus.autoComplete(setting)}, 1 ); }  
};
autoComplete_function = function(setting) {
    if (!getID(setting.input)){return false;}
    var search_obj = ajax_o();
    var obj = getID(setting.input);
    var keyword,search_in,tmp_keyword;
    var select = document.createElement("ul");
    var selectOffset = getOffset(obj);
    obj.parentNode.appendChild(select);
    obj.autocomplete = "off"
    if (setting.autoposition) {
        select.style.top = (selectOffset.top+obj.clientHeight)+"px";
        select.style.left = selectOffset.left+"px";
    }
    select.className = setting.className;
    select.style.display = 'none';
    var in_select = false;
    var select_id = 0;
    var slist = Array();
    var slist_id = Array();
    var keywordselect= function(e){
        if (e.keyCode == 38){ select_list(select_id-1,true); }
        else if (e.keyCode == 40){ select_list(select_id+1,true); }
        else if (e.keyCode == 27){ select.style.display = "none"; }
    }
    var search = function(e){
		var newWeb = [ 'tw'  , 'cn'  , 'sg'  , 'vn'  , 'my'  , 'hu'  , 'id'  , 'th'  , 'uk'  , 'hk'  , 'cz' 
            , 'rs'  , 'sk'  , 'se'  , 'no'  , 'dk'  , 'fi' 
            , 'ch-fr'  , 'ch-it'  , 'ch-de'  , 'ae-en'  , 'ua-ua' 
            , 'jp'  , 'it'  , 'ph'  , 'pl'  , 'nz'  , 'de' 
            , 'ru'  , 'be-nl'  , 'es'  , 'tr'  , 'au'  , 'nl' 
            , 'gr'  , 'ca-fr'  , 'ca-en'  , 'us'  , 'bg'  , 'ie' 
            , 'ua'  , 'mx'  , 'fr'  , 'latin'  , 'in'  , 'kr' 
            , 'be-fr'  , 'sa-en'  , 'sa-ar'  , 'ae-ar'  , 'nafr-ar' 
            , 'nafr-fr'  , 'np'  , 'eg'  , 'ro'  , 'pt'];

            if ((e.keyCode == 38) || (e.keyCode == 40)) { return; }
            else if ((obj.value == '') || (setting.min_length > obj.value.length)) { 
                //setting.autoCompleteselect.html(''); 
                tmp_keyword = ''; 
                //setting.autoCompleteselect.hide(); 
                return; 
            }
            else if ((tmp_keyword == obj.value) || (obj.value == '')) { return; }
            clearInterval(search_in);

            if(newWeb.indexOf(asus.script.get_local())>=0 ){
				//searchPortal(obj.value);
            }else{
            search_in = setInterval(function() { search_run() }, setting.delag);
            }

    };
	var searchPortal = function(inputString) {
		$("#selectbox").find("a").removeClass("highlight");
		var url="https://www.asus.com/searchapi/api/Suggestion";
		var options = {
			queryText: inputString+'*',
			country: setting.lang,
			type: "Products",
			RowLimit: "10",
			eventDBRowLimit: "0"
		};
		ajaxCallJsonp(url + "?", options, inputString);
	}
	var ajaxCallJsonp=function(target, options, inputString) {
		
		var data = $.getJSON(target, options);
		
		//success
		data.success(function (msg) {
			$("#aspnetForm").find("#selectbox").remove();
			msg = MarkHighLight(inputString, msg);
			currentIndex=-1;
			firstStr=$("#searchinput").val();
			$('<div id="selectbox"></div>').html(msg).appendTo("#aspnetForm");
			
			
		$('#searchresults a').mouseover(function () {
			var $parent = $(this).parent();
			$parent.find('a').removeClass('highlight');
			$(this).not('.MoreTag').addClass('highlight');
		}).mouseout(function () {
			$(this).removeClass('highlight');
		});
		
			//replace span to hr
		var $span = $("#selectbox span.category");
		$span.replaceWith(function () {
			return $('<hr/>', {
				html: this.innerHTML,
				style: 'color: #F8F8F8'
			});
		});
		var left = document.getElementById('searchinput').getBoundingClientRect().left;
		var width = $('#searchinput').width;
		$('#selectbox').css({ 'width': width, 'left': left });
		});

		//fail
		data.error(function (msg) {
			$("#aspnetForm").find("#selectbox").remove();
			$('<div id="selectbox"></div>').html("<p id='searchresults'><a><span> fail getting data </span></a></p>").appendTo("#aspnetForm");
		});
	}
	var MarkHighLight =function (inputString, msg) {
		var html = msg;
		if (msg.length > 0) {
			$(html).find('span').each(function () {
				//find highlight word
				var word = $(this).text();
				var index = word.toLowerCase().indexOf(inputString.toLowerCase());
				if (index > -1) {
					var highlight = word.slice(index, index + inputString.length);
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
    var search_run = function(){
        var url = (isApplicationPathSite()) ? "/" + getWebsite() + setting.search : setting.search;
        if (setting.method == 'get'){ url += "?" + obj.name + "=" +form_replace(obj.value); }
        clearInterval(search_in);
        keyword = obj.value;
        search_obj.open(setting.method, url, true);  
        search_obj.onreadystatechange = function(){
            if (search_obj.readyState == 4) {  
                var list = search_obj.responseText.split('\n');
                var insert = '';
                var regex = new RegExp("("+escape_regExp(obj.value)+")","i");
                slist[0] = obj.value;
                var j = 0;
                select.innerHTML = '';
               
                for(var i = 0;i<list.length; i++){
                    var tsplit = list[i].split('|');
					if (tsplit[0] == '') {continue;}
                    // if (tsplit[0].match(regex)){
                    j++; 
                    slist[j] = tsplit[0];
                    slist_id[j] = tsplit[1];
                    tsplit[0] = tsplit[0].replace(regex,'<span class="'+setting.keywordclass+'">'+"$1"+'</span>');
                    var li = document.createElement("li");
                    li.innerHTML += tsplit[0];
                    li.pid = slist_id[j];
                    /*
                    addEvent(li,"click",function(){
                        window.location.href = "product.aspx?P_ID=" + this.pid; 
                    }); */
                    asus.addEvent(li,"click",setting.click,slist_id[j]); 
                    asus.addEvent(li,"mouseover",function(){select_list(this,false);},j); 
                    select.appendChild(li); 
                   // }
                }
 
                tmp_keyword = obj.value;
                select_id = 0;
                //select.style.display = "block";
                select.style.display = (j == 0) ? "none" : "block";
                asus.addEvent(window,"click",removeselect); 
            }
        };  
        if (setting.method == 'get') { search_obj.send(null); }
        else {
            var formname = obj.name;
            search_obj.send(obj.name+"="+form_replace(obj.value));
        }
    }
    var select_list = function(n,v) { 
		if (slist.length == 0){return;}
        var count = select.getElementsByTagName("li").length;
        for (var i = 0; i < count ; i++){
             removeClass(select.getElementsByTagName("li")[i],setting.selectclass);
        }
        select_id = n;
        if (select_id > count) { select_id = 0;}
        else if (select_id < 0) { select_id = count; } 
        if (v) {
            obj.value = slist[select_id];
            tmp_keyword = slist[select_id];
        }
        if (select_id > 0){ addClass(select.getElementsByTagName("li")[select_id-1],setting.selectclass); }
    }
    var resize = function() {
        var selectOffset = getOffset(obj);
        select.style.top = (selectOffset.top+obj.clientHeight)+"px";
        select.style.left = selectOffset.left+"px";
    }
    var removeselect = function() {
        if (in_select == false){
            select.style.display = "none";
			slist = Array();
            removeEvent(window,"click",removeselect);
        }
    }
    asus.addEvent(select,"mouseover",function(){in_select = true;});  
    asus.addEvent(select,"mouseout",function(){in_select = false;});  
    asus.addEvent(obj,"mouseover",function(){in_select = true;});  
    asus.addEvent(obj,"mouseout",function(){in_select = false;});  
    asus.addEvent(obj,"keyup",search);
    asus.addEvent(obj,"keydown",keywordselect);
    if (setting.autoposition) { asus.addEvent(window,"resize",function(){ resize(); }); }
};
    
/* 
    scroll
    update : 2012/12/28
*/
asus.scroll = function(setting) {
    if (asus.is_ready()){ if (!getID(setting.block)){return;} getID(setting.block).asus_scroll = new scroll_function(setting);}
    else {setTimeout( function(){asus.scroll(setting)}, 1 ); }  
};

scroll_function = function(setting) {

    var fn = this;
    var scroll_div = document.createElement("div");
    var scroll_bar = document.createElement("div");
    var scroll_box = document.createElement("div");
    var scroll_M_box = document.createElement("div");
    var in_scroll = false;
    var touch_y = 0;
    var start_move_y = 0;
    this.obj = getID(setting.block);
	var dobj = this.obj ;
    for (var i = 0 ; i < this.obj.childNodes.length ; i++ ){
        scroll_box.appendChild(this.obj.childNodes[0]); i--;
        if ( this.obj.childNodes.length == 0){break;}
    }
    scroll_M_box.appendChild(scroll_box);
    this.obj.appendChild(scroll_M_box);
    scroll_box.style.position = "relative";
    scroll_box.style.top = "0";

    scroll_M_box.style.height = setting.height + "px";
    scroll_M_box.style.overflow =  "hidden";
    scroll_div.appendChild(scroll_bar);
	scroll_div.style.MozUserSelect ="none";
    this.obj.appendChild(scroll_div);
    for (var i in setting.scroll_css){
        scroll_div.style[i] = setting.scroll_css[i];
    }
    for (var i in setting.scroll_bar_css){
        scroll_bar.style[i] = setting.scroll_bar_css[i];
    }
    this.obj.style.display = "block";
    

    var cH = scroll_div.clientHeight;
    var sH = scroll_M_box.scrollHeight;

    this.obj.style.display = "";
    if (cH >= sH) { scroll_div.style.display = "none"; return false; }
    scroll_bar.style.height = cH/sH*cH+"px";
    scroll_bar.style.marginTop = 0;
    /*
    for (var imgs in this.obj.getElementsByTagName("img")){
        this.obj.getElementsByTagName("img")[imgs].onload = function(){
			dobj.style.display = "block";
            sH = scroll_M_box.scrollHeight;
            cH = scroll_div.clientHeight;
			dobj.style.display = "";
            scroll_bar.style.height = cH/sH*cH+"px";
			if (cH >= sH) {scroll_div.style.display = "none";}
        }
    }*/
    this.move = function(y){

            
        var end = false;
        var bar_offset = parseInt(scroll_bar.style.marginTop)-y;
        dobj.style.display = "block";

        sH = scroll_box.scrollHeight > scroll_box.clientHeight ? scroll_box.scrollHeight  :scroll_box.clientHeight ;


      //  cH = scroll_div.scrollHeight > scroll_div.clientHeight ? scroll_div.scrollHeight  :scroll_div.clientHeight ;
        dobj.style.display = "";
        
        if ( document.addEventListener ) {
            scroll_bar.style.height = cH/sH*cH+"px";
			if (cH >= sH) {scroll_div.style.display = "none";}
        }  
        else {
            scroll_bar.style.height = cH/sH*cH+"px";
        }        
      //  dobj.style.display = "block";
       // cH = scroll_div.clientHeight;
       // sH = scroll_M_box.clientHeight;
      //  dobj.style.display = "";
        
      //  if (cH >= sH) {scroll_div.style.display = "none";}
        

        if (bar_offset <= 0){  bar_offset = 0;}
        else if (bar_offset + parseInt(scroll_bar.style.height) >= cH){ bar_offset = cH-parseInt(scroll_bar.style.height);}
        
        if((parseInt(scroll_bar.style.marginTop) <= 0 )&&(y > 0)){ end = true;}
        else if((parseInt(scroll_bar.style.marginTop) + parseInt(scroll_bar.style.height) >= cH )&&(y < 0)){ end = true;}
        
        
        scroll_bar.style.marginTop = bar_offset+"px";
        
        scroll_box.style.top = (cH-sH)*(bar_offset/(cH-parseInt(scroll_bar.style.height))) + "px";
        return end;
    }
    var touch_move  = function(y){
        var ox = touch_y - y;
        fn.move(ox);
    }
    var mousewheel = window.mousewheel ? window : document;
    var DOMMouseScroll = 'mousewheel';
    var domScroll = function(e){
        in_run = false;
        if (in_scroll){
            var offset = e.wheelDelta ? (e.wheelDelta/4) : e.detail * -40;
            var end = fn.move(offset);
            if (end == false){
                if (e.preventDefault) {e.preventDefault();}
                else {return false;}
            }
        }
    }
    var noselect = function(e){
        if (in_mousemove == false) {return true;} 
        if (e.preventDefault) {e.preventDefault();}
        else {return false;}
    }
    var startmove = function(e){
        if (in_mousemove == false) {return true;} 
        var offset = start_move_y - e.screenY;
        start_move_y = e.screenY;
        fn.move(offset);
    }
    asus.addEvent(mousewheel,"mousewheel",domScroll);
    asus.addEvent(mousewheel,"DOMMouseScroll",domScroll);
    asus.addEvent(this.obj,"mouseover",function(){in_scroll = true;});
    asus.addEvent(this.obj,"mouseout",function(){in_scroll = false;});
    asus.addEvent(this.obj,"touchstart",function(e){in_run = false;touch_y = e.touches[0].screenY;},this.obj);
    asus.addEvent(this.obj,"touchmove",function(e){
        if (e.touches.length < 2){ 
            e.preventDefault(); 
            touch_move(e.touches[0].screenY);
        }
    },this.obj);
    var in_mousemove = false;
    asus.addEvent(scroll_bar,"mousedown",function(e){
        in_run = false;
        in_mousemove = true;
        start_move_y = e.screenY;
		scroll_box.style.MozUserSelect ="none";
        asus.addEvent(document,"selectstart",noselect);
        asus.addEvent(document,"mousemove",startmove);
    });
    asus.addEvent(document,"mouseup",function(e){
        in_mousemove = false;
        asus.removeEvent(document,"selectstart",noselect);
        asus.removeEvent(document,"mousemove",startmove);
		scroll_box.style.MozUserSelect ="";
    });
    var in_run = false;
    this.move_to = function(id,time){
        var o = getOffset(this.obj);
        var m = getOffset(getID(id));
        var top = o.top - m.top < cH-sH ? cH-sH : o.top - m.top ;

        if (!time){
            scroll_bar.style.marginTop = (parseInt(scroll_box.style.top)+top)/(cH-sH)*(cH-parseInt(scroll_bar.style.height)) + "px";
            scroll_box.style.top = parseInt(scroll_box.style.top)+top + "px";
        }
        else {
            in_run = true;
            move_to_run(top/time*16,parseInt(scroll_box.style.top)+top);
        }
    }
    var move_to_run = function(offset,set){
        var new_offset = parseInt(scroll_box.style.top)+parseInt(offset);
        scroll_bar.style.marginTop = new_offset/(cH-sH)*(cH-parseInt(scroll_bar.style.height)) + "px";
        scroll_box.style.top = new_offset + "px";
        if (new_offset != set) {
            if (Math.abs(Math.abs(new_offset) - Math.abs(set))< Math.abs(offset)) { 
                offset = ((set > new_offset)&&(set != 0)) ?  new_offset - set : set - new_offset ; 
            }
            if (in_run == true) {setTimeout( function(){move_to_run(offset,set); }, 16 );}
        }
    }
};
    
/* 
    imageZoom
    update : 2012/04/23 
*/
asus.imageZoom = function(setting) {
    if (asus.is_ready()){ new imageZoom_function(setting); }
    else { setTimeout( function(){asus.imageZoom(setting)}, 1 ); }  
};
imageZoom_function = function(setting) {
    if (!getID(setting.tag)){return false;}
    var dom = getID(setting.tag).getElementsByTagName("img");
    var close =  function () {
        this.parent.zoomin = false;
        this.parentNode.removeChild(this);
        triggerEvent("mouseout",this.parent);
    }
    var zoom_on = function(){
        if (this.zoomin == true){return;}
        this.zoomin = true;
        var top = getOffset(this).top;
        var left = getOffset(this).left; 
        document.getElementsByTagName("body")[0].appendChild(this.cloneNode(true));
        var newdom = document.getElementsByTagName("body")[0].lastChild;
        newdom.style.position = "absolute";
        newdom.style.width = this.width * setting.zoom+"px";
        newdom.style.height = this.height * setting.zoom+"px";
        newdom.style.left = left-( (this.offsetWidth * setting.zoom-this.offsetWidth)/2) +"px";
        newdom.style.top = top-( (this.offsetHeight * setting.zoom-this.offsetHeight)/2) +"px";
        newdom.style.zIndex = 3000;
        newdom.className +=  " "+setting.addclass;
        newdom.parent = this;
/*
        asus.addEvent(newdom,"mouseover",function(){
            triggerEvent("mouseover",this.parent);
        },newdom);
*/
        asus.addEvent(newdom,'mouseout', close,newdom);
        
        if (this.parentNode.href){
            newdom.style.cursor = "pointer";
            asus.addEvent(newdom,'click', function(){
                if(document.all)  { 
                    this.parent.click();
                }
                else {
                    var evt = document.createEvent("MouseEvent");   
                    evt.initEvent("click", true, true);   
                    this.parent.dispatchEvent(evt);
                }
            },newdom);
        }
    }
    for (var i=0 ; i<dom.length; i++){
        asus.addEvent(dom[i],"mouseover",zoom_on,dom[i]);
    }
}
    
/* 
    banner
    update : 2013/07/10
*/
asus.banner = function(setting) {

    if (asus.is_ready()){ new banner_function(setting); }
    else { setTimeout( function(){asus.banner(setting)}, 1 ); }
};
banner_function = function(setting) {
    if (!getID(setting.move_div)) {
		if (getID(setting.click_back)) {backobj.style.display = "none";}
		if (getID(setting.click_next)) {nextobj.style.display = "none";}
		return false;
	}
    var touch_on = "ontouchend" in document;
    var obj = getID(setting.move_div);
    var backobj = getID(setting.click_back);
    var nextobj = getID(setting.click_next);
	var n = setting.n ? setting.n : 1;
	if (obj.childNodes.length > 0){
		for (var i = 0 ;i<obj.childNodes.length; i++){
			if (obj.childNodes[i].nodeType != 1){ obj.removeChild(obj.childNodes[i]); i-=1; }
		}
	}
    if ((obj.childNodes.length == 0)||((!touch_on)&&(setting.auto_click_hide))){
		if (getID(setting.click_back)) {backobj.style.display = "none";}
		if (getID(setting.click_next)) {nextobj.style.display = "none";}
		if (obj.childNodes.length == 0) { return false;}
        if ((!touch_on)&&(setting.auto_click_hide)) {

            var lock_l = false;
            var lock_r = false;
            $("#"+setting.move_div).on("mousemove",function(e){
                if (e.clientX > ($("#"+setting.move_div).parent().offset().left + $("#"+setting.move_div).parent().width())/2) {
                    nextobj.style.display = "";
                    backobj.style.display = "none";
                }
                else {
                    backobj.style.display = "";
                    nextobj.style.display = "none";
                }
            });
            asus.addEvent(backobj,"mouseover",function(e){ lock_l = true; }); 
            asus.addEvent(nextobj,"mouseover",function(e){ lock_r = true; }); 
            asus.addEvent(backobj,"mouseout",function(e){ lock_l = false; }); 
            asus.addEvent(nextobj,"mouseout",function(e){ lock_r = false; }); 
            
            $("#"+setting.move_div).on("mouseleave",function(e){
                setTimeout(function(){
                if (!lock_l) { backobj.style.display = "none"; }
                if (!lock_r) { nextobj.style.display = "none"; }
                },200);
            });
        }
	}

    
	if ((setting.random)&&(obj.childNodes.length > 1)){
		var temp = obj.childNodes;
		var list = new Array();
		var list_html = new Object();
		
		for(var i=0, j=temp.length; i<j; i++){
			temp[i].order = Math.random();
			temp[i].ni = "ni_"+i;
			list.push(temp[i]);
			list_html["ni_"+i] = temp[i].innerHTML;
			
		}
		list = list.sort(function(a,b){
			return a.order - b.order;
		});
		obj.innerHTML = '';
		for(; list.length>0; ){
			obj.appendChild(list.pop());
		}
		for (var i = 0 ;i<obj.childNodes.length; i++){
			obj.childNodes[i].innerHTML = list_html[obj.childNodes[i].ni];
		}
	}

    var width = 0;
    var outwidth = 0;
    if (getStyle(obj.childNodes[0],"width") != 'auto' && getStyle(obj.childNodes[0],"width").match(/%/) == null) {
        outwidth = parseInt(getStyle(obj.childNodes[0],"width"));

        if (getStyle(obj.childNodes[0],"padding-left")) {
        if (getStyle(obj.childNodes[0],"padding-left").match(/[0-9]+/)) {
            outwidth += parseInt(getStyle(obj.childNodes[0],"padding-left"));
        }
        }
        if (getStyle(obj.childNodes[0],"padding-right")) {
        if (getStyle(obj.childNodes[0],"padding-right").match(/[0-9]+/)) {
            outwidth += parseInt(getStyle(obj.childNodes[0],"padding-right"));
        }
        }
        if (getStyle(obj.childNodes[0],"paddingLeft")) {
        if (getStyle(obj.childNodes[0],"paddingLeft").match(/[0-9]+/)) {
            outwidth += parseInt(getStyle(obj.childNodes[0],"paddingLeft"));
        }
        }
        if (getStyle(obj.childNodes[0],"paddingRight")) {
        if (getStyle(obj.childNodes[0],"paddingRight").match(/[0-9]+/)) {
            outwidth += parseInt(getStyle(obj.childNodes[0],"paddingRight"));
        }
        }
        if (getStyle(obj.childNodes[0],"border-left-width")) {
        if (getStyle(obj.childNodes[0],"border-left-width").match(/[0-9]+/)) {
            outwidth += parseInt(getStyle(obj.childNodes[0],"border-left-width"));
        }
        }
        
        if (getStyle(obj.childNodes[0],"border-right-width")) {
        if (getStyle(obj.childNodes[0],"border-right-width").match(/[0-9]+/)) {
            outwidth += parseInt(getStyle(obj.childNodes[0],"border-right-width"));
        }
        }
        if (getStyle(obj.childNodes[0],"borderLeftWidth")) {
        if (getStyle(obj.childNodes[0],"borderLeftWidth").match(/[0-9]+/)) {
            outwidth += parseInt(getStyle(obj.childNodes[0],"borderLeftWidth"));
        }
        }
        if (getStyle(obj.childNodes[0],"borderRightWidth")){
        if (getStyle(obj.childNodes[0],"borderRightWidth").match(/[0-9]+/)) {
            outwidth += parseInt(getStyle(obj.childNodes[0],"borderRightWidth"));
        }
        }
        width= parseInt(getStyle(obj.childNodes[0],"width")) ;
    }
    else {
        width = obj.childNodes[0].clientWidth;
        outwidth= obj.childNodes[0].clientWidth;
    }

    var marginRight = getStyle(obj.childNodes[0],"margin-Right") ? parseInt(getStyle(obj.childNodes[0],"margin-Right")) : parseInt(getStyle(obj.childNodes[0],"marginRight")) ;
    var add_padding = setting.add_padding ? setting.add_padding : 0;
    
    marginRight = marginRight ? marginRight : 0;
    marginRight += add_padding;
    var count = obj.childNodes.length;
    var s_count = obj.childNodes.length;
	if (count <= n) {
		if (getID(setting.click_back)) {backobj.style.display = "none";}
		if (getID(setting.click_next)) {nextobj.style.display = "none";}
	}

    var allwidth = (marginRight + outwidth)*count;

    var in_Nodes = setting.loop ? 1 : 0;
    var show = setting.show ? setting.show : n;
    var left = 0;
    var ease = setting.ease ? setting.ease : 'Linear';
    if (count == 1){return false;}
    if (setting.loop){
        for (var i = 0;i < count; i++){
            obj.childNodes[i].style.width = width+"px";
            $("#"+setting.move_div).children().eq(i).attr("di",i);
            obj.appendChild(obj.childNodes[i].cloneNode(true));
            allwidth += obj.childNodes[i].clientWidth ;
            obj.childNodes[i].style.marginRight = marginRight + "px";
        }
        count = obj.childNodes.length;
        obj.insertBefore(obj.childNodes[count-1],obj.childNodes[0]);
        left = 0-width; 
        obj.style.width = allwidth + "px";
        obj.style.left = left+"px"; 
    }
    else {
        for (var i = 0;i < count; i++){
            obj.childNodes[i].style.width = width+"px";
            obj.childNodes[i].style.marginRight = marginRight + "px";
        }
        obj.style.width = allwidth + "px";
        if (backobj) {addClass(backobj,setting.click_end_className);}
    }
    if (setting.cut) {
        var cut_html = '<a href="#"  class="active"></a>';
        for (var i = 1;i < s_count; i++){
            cut_html += '<a href="#"></a>';
        }
        getID(setting.cut).innerHTML = cut_html;
        

        $("#"+setting.cut+" a").each(function(i){
            $(this).on("click", function (){
                var in_dot = $("#"+setting.cut+" a."+setting.in_className).prevAll().length;
                if (in_dot == i) { return false;}
                else {
                    if (in_run) { return; }
                    if (in_dot > i) { back(Math.abs(in_dot-i)); }
                    else  { next(Math.abs(in_dot-i)); }
                }
                return false;
            });
        });
        


 
    }

    var offsetwidth = obj.childNodes[0].clientWidth + marginRight;
    if (offsetwidth == 0) { offsetwidth = obj.childNodes[0].clientWidth; }


    var in_auto,time_bar,time_c,in_run,in_div,touch_x,t_Mask;
    var fz = 20;
    var run =  function(lr,set,oo,fa){
        clearInterval(in_auto);in_auto='';
       // clearInterval(time_bar);time_bar='';
        if (setting.Mask == true){ t_Mask = mask(obj,5000); }
        in_run = setTimeout( function(){run_fn(lr,set,0,oo,fa); }, fz );
    }; 
    var run_fn = function(lr,set,i,oo,fa){
        i++;
        if ((lr == 'l') && (left + offsetwidth/setting.move_time*fz*n < set)){
            
            var tleft = eval("Tween."+ease)(oo,set,i,parseInt(1/fz*setting.move_time));
            
            if (fa){

            var fz_i = 0;
            while (tleft < parseInt(obj.style.left)){
                if (fz_i > fz) { break ; }

                tleft = eval("Tween."+ease)(oo,set,i,parseInt(1/fz*setting.move_time));
                fz_i++;
                i = fz_i;
            }
           
            }
             left = tleft;
            obj.style.left = left +"px" ;
            in_run = setTimeout( function(){run_fn(lr,set,i,oo,fa); }, fz );
        } 
        else if ((lr == 'r') && (left - offsetwidth/setting.move_time*fz*n > set)){
            var tleft = eval("Tween."+ease)(oo,set,i,parseInt(1/fz*setting.move_time));
            
            if (fa){
            var fz_i = 0;
            while (tleft > parseInt(obj.style.left)){
                if (fz_i > fz) { break ; }
                tleft = eval("Tween."+ease)(oo,set,i,parseInt(1/fz*setting.move_time));
                fz_i++;
                i = fz_i;
            }
            }
            
            left = tleft;
            obj.style.left = left +"px" ;
            in_run = setTimeout( function(){run_fn(lr,set,i,oo,fa); }, fz );

        }
        else {
            close_run();
            if (setting.Mask == true){ clear_Mask(); }
            left = set; 
            obj.style.left = left +"px" ;
            if (!in_div) {auto_next();}
        }
    }

    var back = function(vn,fa){
   
        if (in_run) { return; }
        if (!vn) { vn = n;}
        if (setting.loop){
            for (var i = 0; i<vn ;i++){
            if (in_Nodes == 1){ obj.insertBefore(obj.childNodes[count-1],obj.childNodes[0]); left -= offsetwidth;
                if (fa) { obj.style.left = parseInt(obj.style.left)-offsetwidth +"px" ;  }
                else {obj.style.left = left +"px" ; }
            }
            else { in_Nodes -= 1; }
            }
            set_class();   
            run('l',left+offsetwidth*vn,left,fa);
        }
        else if (in_Nodes-1 >= 0){          
            var bn = in_Nodes-vn < 0 ? in_Nodes : vn;
            in_Nodes = in_Nodes-bn >= 0 ? in_Nodes-bn : 0;
            set_class();
            run('l',left+(offsetwidth*bn),left,fa);
            if (backobj) { removeClass(backobj,setting.click_end_className); }
            if (nextobj) { removeClass(nextobj,setting.click_end_className); }
            if ((in_Nodes == 0)&&(backobj)){addClass(backobj,setting.click_end_className);}
        }
    }
    var next = function(vn,fa){
        if (in_run) { return; }
        if (!vn) { vn = n;}
        if (setting.loop){
            for (var i = 0; i<vn ;i++){
            if (in_Nodes >= count-2){ obj.appendChild(obj.childNodes[0]); left += offsetwidth; 
               
                if (fa) { obj.style.left = parseInt(obj.style.left)+offsetwidth +"px" ;  }
                else {obj.style.left = left +"px" ; }
            }
            else { in_Nodes += 1; }
            }
           
            if (!fa) {obj.style.left = left +"px"; }
            
            set_class();
            run('r',left-offsetwidth*vn,left,fa);
        }
        else if (in_Nodes+vn < count){
            var bn = in_Nodes+vn+show > count ? vn-(count-1-in_Nodes-vn) : vn;
            in_Nodes = in_Nodes+bn < count ? in_Nodes+bn : count-1;
            set_class();
            run('r',left-(offsetwidth*bn),left,fa);
            if (backobj) { removeClass(backobj,setting.click_end_className); }
            if (nextobj) { removeClass(nextobj,setting.click_end_className); }
            if ((in_Nodes >= count-vn)&&(nextobj)) {addClass(nextobj,setting.click_end_className);}
        }
    }
    var set_class = function(){
        var sRegExp = RegExp("(^| )"+setting.in_className);
        for (var i = 0;i < count; i++){
            obj.childNodes[i].className = obj.childNodes[i].className.replace(sRegExp,"") ;
        }
        obj.childNodes[in_Nodes].className += " "+setting.in_className;
        
        if (setting.cut) {
            for (var i = 0;i < s_count; i++){
                getID(setting.cut).childNodes[i].className = getID(setting.cut).childNodes[i].className.replace(sRegExp,"") ;
            }
            getID(setting.cut).childNodes[$("#"+setting.move_div).children().eq(in_Nodes).attr("di")].className += " "+setting.in_className;
        }
    };
    
    var auto_next = function(){
        if ((!setting.auto_next_time)||(in_auto)){ return; }
        if ((setting.time_bar)&&(getID(setting.time_bar))){
            time_c = 300;
            clearInterval(time_bar);
            time_bar='';
            time_bar= setInterval( function(){ 
                time_c = time_c + 30;
                if (time_c >=  setting.auto_next_time) { getID(setting.time_bar).style.width = "100%";  }
                else { getID(setting.time_bar).style.width = (time_c/setting.auto_next_time)*100 + "%";}
            }, 30 );
        }
        in_auto = setInterval( function(){ if (in_run) { return; } next(); }, setting.auto_next_time );
    };
    
    var key = function(code) {
        var y_offset = getOffset(getID(setting.move_div)).top + getID(setting.move_div).childNodes[0].clientHeight/2;
        var scrolltop = document.body.scrollTop || document.documentElement.scrollTop;
        if ((scrolltop < y_offset)&&(scrolltop+scrolltop + window.screen.height > y_offset )){
            if (code == "37"){ back();}
            else if (code == "39"){ next();}
        }
    }
    var touch_move  = function(x) {
        fz = 33;
        if (!touch_x){ return; }
        var ox = touch_x - x;
        if (ox < -35){ touch_x = 0;back('',true);}
        else if (ox > 35){ touch_x = 0;next('',true);}
        else {
             if (setting.loop){
            if (ox > 0){ in_Nodes= in_Nodes-1; touch_x = 0;next('',true);}
            else if (ox < 0){in_Nodes= in_Nodes+1;  touch_x = 0;back('',true);}
            }
        }
    }
    var close_run = function(){ clearInterval(in_run); in_run = ''; }
    var clear_Mask= function(){ removeDom(t_Mask,document.getElementsByTagName("body")[0]); }
    var w_size = document.body.clientWidth;
    var resize = function(){
    	  if (setting.resize) { 
           count = setting.resize(count);
           in_Nodes=1;
           back();
        }
        //if (w_size == document.body.clientWidth){return; }
        w_size = document.body.clientWidth
        close_run();
        if (setting.Mask == true){ clear_Mask(); }
        obj.style.width = "auto";
        obj.childNodes[0].style.width = "";
        obj.childNodes[0].style.marginRight = "";
        for (var i = 1;i < count; i++){
            obj.childNodes[i].style.display = "none";
        }
        width = (getStyle(obj.childNodes[0],"width") != 'auto' && getStyle(obj.childNodes[0],"width").match(/%/) == null) ? parseInt(getStyle(obj.childNodes[0],"width")) : obj.childNodes[0].clientWidth;
        for (var i = 0;i < count; i++){
            obj.childNodes[i].style.width = width+"px";
            obj.childNodes[i].style.display = "";
            obj.childNodes[i].style.marginRight = marginRight + "px";
        }
        offsetwidth = obj.childNodes[0].clientWidth+marginRight;
 
        allwidth = count * offsetwidth + offsetwidth;
        obj.style.width = allwidth + "px";
        left = (0-in_Nodes) *offsetwidth;
        obj.style.left = left +"px" ; 
        if (!in_div) { auto_next();}
    }
     resize();
    if (backobj) { asus.addEvent(backobj,"click",function(e){ back(); if (e.preventDefault) {e.preventDefault();} else {return false;} }); }
    if (nextobj) { asus.addEvent(nextobj,"click",function(e){ next(); if (e.preventDefault) {e.preventDefault();} else {return false;} }); }
    asus.addEvent(obj,"mouseover",function(e){ 
        in_div = true ; clearInterval(in_auto);  clearInterval(time_bar); 
        if ((setting.time_bar)&&(getID(setting.time_bar))){
            getID(setting.time_bar).style.width = "0";
        }
        in_auto=''; 
        time_bar=''; 
    });
    asus.addEvent(obj,"mouseout",function(e){
        in_div = false ; 
        auto_next(); 
    });
    var touchstart_left = 0;
    asus.addEvent(obj,"touchstart",function(e){ touchstart_left = parseInt(obj.style.left);  in_div = true ; clearInterval(in_auto); clearInterval(time_bar); touch_x = e.touches[0].screenX;  });
    asus.addEvent(obj,"touchend", function (e){

        in_div = false ; auto_next();

    });
    asus.addEvent(window,"resize",resize);  
    asus.addEvent(obj,"touchmove", function (e){
        if (e.touches.length >= 2){ return; }
        if ((touch_x != 0) && (Math.abs(touch_x-e.touches[0].screenX) >35 )){ 
        if (setting.loop){
        obj.style.left = touchstart_left-(touch_x-e.touches[0].screenX) +"px" ;
        }
        e.preventDefault();
        touch_move(e.touches[0].screenX);
        }
    });
    if (setting.keyboard) { asus.addEvent(document,"keydown",function(e){  key(e.keyCode); }); }
    auto_next();
	set_class();
};
    
/* DOM Mask */
asus.mask = mask = function(dom,zindex){
    var Mask = document.createElement("div");
    var Masktop = getOffset(dom.parentNode).top;
    var Maskleft = getOffset(dom.parentNode).left; 
    document.getElementsByTagName("body")[0].appendChild(Mask);
    Mask.style.position = "absolute";
    Mask.style.width = dom.parentNode.clientWidth+"px";
    Mask.style.height = dom.parentNode.clientHeight+"px";
    Mask.style.left = Maskleft +"px";
    Mask.style.top = Masktop +"px";
    Mask.style.zIndex = zindex;
    return Mask;
};

/* remove DOM */
asus.removeDom = removeDom = function(dom,target){
    try { target.removeChild(dom);} catch(err) {}
}

/* Add Class */
asus.addClass = addClass = function(dom,ClassName){ 
    dom.className += " "+ClassName;
}
/* remove Class */
asus.removeClass = removeClass = function(dom,ClassName){ 
    var sRegExp = RegExp("(^| )"+ClassName);
    dom.className = dom.className.replace(sRegExp,"") ;  
}

/* GET DOM Class */
asus.getClass = getClass = function(ClassName,parentElement){ 
    if (document.getElementsByClassName){ return (parentElement||document).getElementsByClassName(ClassName); }
    var elems = (parentElement||document.body).getElementsByTagName("*");
    var result = [];
    for (i=0; i<elems.length ; i++){
        if ((" "+elems[i].className+" ").indexOf(" "+ClassName+" ")!=-1){ result.push(elems[i]); };
    }
    return result;
}
    
/* GET DOM ID */
asus.getID = getID = function(id){ return document.getElementById(id); };

/* GET DOM Offset */
// return top, left
asus.getOffset = getOffset = function(dom) { 
    var top = 0,left = 0;  
    while(dom) {
        left += dom.offsetLeft;
        top += dom.offsetTop;
        dom = dom.offsetParent;
    }  
    return {'top':top,'left':left};
}

/* Add Event */
asus.addEvent = addEvent = function (target, eventName, handler, argsObject) {
    var eventHander = handler;
    if(argsObject){
        eventHander = function(e){handler.call(argsObject, e); }
    }
    if(window.addEventListener) { target.addEventListener(eventName, eventHander, false); }
    else { target.attachEvent("on" + eventName, eventHander ); }
}

/* Remove Event */
asus.removeEvent = removeEvent = function (target, eventName, handler) {
    if(window.detachEvent) { target.detachEvent("on" + eventName, handler ); }
    else { target.removeEventListener(eventName, handler, false); }
}


/* Trigger Event */
asus.triggerEvent = triggerEvent = function (eventName, Object) {
    if(Object.dispatchEvent == undefined) {
        Object.fireEvent("on"+eventName, event);
    }
    else {
        var evt = document.createEvent("MouseEvents");  
        evt.initEvent(eventName, true, true);   
        Object.dispatchEvent(evt); 
    }
}

/* AJAX 1.0 Object */
asus.ajax_o = ajax_o = function (){ 
    if (window.ActiveXObject) {  return new ActiveXObject("Microsoft.XMLHTTP"); }
    else if (window.XMLHttpRequest) {  return new XMLHttpRequest; }
    return null;  
}
form_replace = function(text){
    text =  encodeURIComponent(text);
    return text;
}
escape_regExp = function(text){
    text = text.replace(/\\/g,'\\\\');
    text = text.replace(/\|/g,'\\|');
    text = text.replace(/\+/g,'\\+');
    text = text.replace(/\$/g,'\\$');
    text = text.replace(/\`/g,'\\`');
    text = text.replace(/\^/g,'\\^');
    text = text.replace(/\*/g,'\\*');
    text = text.replace(/\[/g,'\\[');
    text = text.replace(/\]/g,'\\]');
    text = text.replace(/\?/g,'\\?');
    text = text.replace(/\./g,'\\.');
    return text;
}
    
/* getStyle */
getStyle = function(dom, styleProp){

    var sty ;
    if (dom.currentStyle){ sty = dom.currentStyle[styleProp];}
    else if (window.getComputedStyle) {
        sty = document.defaultView.getComputedStyle(dom, null).getPropertyValue(styleProp);
    }
    return sty;
}

/* cookie */
asus.cookie = {
    val : Object,
    set : function (name,value,expiresec){
        var exdate = new Date();
        exdate.setSeconds(exdate.getSeconds() + expiresec);
        //document.cookie = name + "=" +escape(value) + ((expiresec == null) ? "" : ";expires=" + exdate.toGMTString()) + "; path =/";
        document.cookie = name + "=" + escape(value) + ((expiresec == null) ? "" : ";expires=" + exdate.toGMTString()) + ";domain=" + window.location.host.replace(/.+?\.asus/, '.asus') + "; path =/";
        asus.cookie.val[name] = escape(value);
    },
    get : function (name) {
		try {
			if ( Object.keys(asus.cookie.val).length == 0) { asus.cookie.init(); };
		}
		catch(e) {
			asus.cookie.init();
		}
        asus.cookie.get = function (name) { return asus.cookie.val[name]; };
        return asus.cookie.val[name];
    },
    del : function(name) { 
        var exdate = new Date();
        exdate.setTime(exdate.getTime() - 1);
        var cval = asus.cookie.get(name);
        document.cookie = name + "=" + cval + "; expires=" + exdate.toGMTString() + ";domain=" + window.location.host.replace(/.+?\.asus/, '.asus') + "; path =/";
        //document.cookie = name + "=" + cval + "; expires=" + exdate.toGMTString() + "; path =/";
        delete asus.cookie.val[name];
    },
    init : function () {
        if (!document.cookie) { return false; }
        var list = document.cookie.split(';');
        for (var i = 0; i < list.length; i++ ) {
            var data = list[i].split('=');
            if (!data[1]) { continue; }
            data[0] = data[0].replace(/^\s+/,'');
            asus.cookie.val[data[0]] = unescape(data[1]);
        }
    }
};


/* DOM Loading Event */
asus.is_ready = function() {return false;};

var DomReady = function (){
    var called = false;
    function ready() {
        if (called) return;
        called = true;
        asus.is_ready = function() { return true; }
    }
    if ( document.addEventListener ) {
        document.addEventListener( "DOMContentLoaded", ready , false );
    } 
    else if ( document.attachEvent ) {
        if ( document.documentElement.doScroll && window == window.top ) {
            function tryScroll(){
                if (called) return;
                if (!document.body) return;
                try { document.documentElement.doScroll("left"); ready(); } catch(e) { setTimeout(tryScroll, 0); }
            }
            tryScroll();
        }
        document.attachEvent("onreadystatechange", function(){
            if ( document.readyState === "complete" ) { ready(); }
        });
    }
    if (window.addEventListener) window.addEventListener('load', ready, false);
    else if (window.attachEvent) window.attachEvent('onload', ready);
}();




start();

/* Tween.ease */
/*
initPos 嚙踐�嚙賣謘選蕭嚙踝�豰�?? 
targetPos - 嚙質�蝑���嚙踐�嚙踝蕭謜蕭?嚙踐偃��?嚙踝蕭? 
currentCount 嚙踝蕭??N嚙賜嚙賣�鞈軋�鞊航��橘蕭�賂蕭?
count ?�萄�豰蕭�塚蕭�賂蕭�蕭 
*/
Tween = {
    Linear: function(initPos, targetPos, currentCount, count) {  
        var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
        return c * t / d + b;  
    },  
    Quad: {  
        easeIn: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return c * (t /= d) * t + b;  
        },  
        easeOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return -c * (t /= d) * (t - 2) + b;  
        },  
        easeInOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;  
            return -c / 2 * ((--t) * (t - 2) - 1) + b;  
        }  
    },  
    Cubic: {  
        easeIn: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return c * (t /= d) * t * t + b;  
        },  
        easeOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return c * ((t = t / d - 1) * t * t + 1) + b;  
        },  
        easeInOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;  
            return c / 2 * ((t -= 2) * t * t + 2) + b;  
        }  
    },  
    Quart: {  
        easeIn: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return c * (t /= d) * t * t * t + b;  
        },  
        easeOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;  
        },  
        easeInOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;  
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;  
        }  
    },  
    Quint: {  
        easeIn: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return c * (t /= d) * t * t * t * t + b;  
        },  
        easeOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;  
        },  
        easeInOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;  
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;  
        }  
    },  
    Sine: {  
        easeIn: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;  
        },  
        easeOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return c * Math.sin(t / d * (Math.PI / 2)) + b;  
        },  
        easeInOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;  
        }  
    },  
    Expo: {  
        easeIn: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;  
        },  
        easeOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;  
        },  
        easeInOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            if (t == 0) return b;  
            if (t == d) return b + c;  
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;  
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;  
        }  
    },  
    Circ: {  
        easeIn: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;  
        },  
        easeOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;  
        },  
        easeInOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;  
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;  
        }  
    },  
    Bounce: {  
        easeIn: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
        
            return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;  
        },  
        easeOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  

            if ((t /= d) < (1 / 2.75)) {  
                return c * (7.5625 * t * t) + b;  
            } else if (t < (2 / 2.75)) {  
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;  
            } else if (t < (2.5 / 2.75)) {  
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;  
            } else {  
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;  
            }  
        },  
        easeInOut: function(initPos, targetPos, currentCount, count) {  
            var b = initPos, c = targetPos - initPos, t = currentCount, d = count;  
            if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;  
            else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;  
        }  
    }
};


})();
/* Asus Website script function end */










/* Temp */
function getWebsite() { return asus.script.get_local(); }
function isApplicationPathSite() { return asus.script.isApplicationPathSite(); }
function isMultipleLanguageWebsite() { return asus.script.isMultipleLanguageWebsite(); }
function getShortLanguage(strLanguage) { return asus.script.getShortLanguage(strLanguage); }
function getcookiedata(cookieName) { return asus.cookie.get(cookieName); }
function infonumber(data){
    asus.getID("anchorMemberDrop").getElementsByTagName('span')[0].innerHTML = data.Unread;
    document.getElementsByTagName("head")[0].removeChild(document.getElementById("api_message"));
}
var above_left = '0';

$(document).ready(function () {
    var touch_on = "ontouchend" in document;
    /* memberbar */
    var memberbar_allclose = function () {
        $("#compare-button").removeClass("active");
        $("#member-button").removeClass("active");
        $("#memberbar .member-arrow").hide();
        $("#memberbar a.dropdown-toggle").parent().removeClass('open');
    };

    asus.login = member_login = function () {
        var form = document.createElement('form');
        form.id = 'asus_login';
        if (document.getElementById("anchorMemberDrop")) {
            form.action = document.getElementById("anchorMemberDrop").href;
        }
        else {
            form.action = document.getElementById("asus_memberlogin").href;
        }
        form.method = 'post';
        form.style.display = 'none';

        var input_AppID = document.createElement('input');
        input_AppID.name = 'AppID';
        input_AppID.value = "0000000002";

        var input_ReturnUrl = document.createElement('input');
        input_ReturnUrl.name = 'ReturnUrl';
        input_ReturnUrl.value = window.location.href;

        var input_lang = document.createElement('input');
        input_lang.name = 'lang';
        if (document.getElementById("anchorMemberDrop")) {
            input_lang.value = document.getElementById("anchorMemberDrop").hreflang;
        }
        else {
            input_lang.value = document.getElementById("asus_memberlogin").hreflang;
        }
        form.appendChild(input_AppID);
        form.appendChild(input_ReturnUrl);
        form.appendChild(input_lang);

        document.getElementById("memberbar-zone").appendChild(form);
        form.submit();

    };

    $("#anchorMemberDrop").one("click", function () {
        var loadUrl = "https://account.asus.com/memberdrop.aspx";
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = loadUrl + '?callback=LoadMemberDrop&lang=' + $(this).attr("lang") + '&t=' + new Date().getTime();
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);
        return false;
    });

    $("#memberbar a.dropdown-toggle").click(function () {
        if (this.id == "asus_memberlogin") { memberbar_allclose(); member_login(); return false; }
        if (!$(this).parent().hasClass('open')) {
            memberbar_allclose();
            if     (($(this).parent().attr('id') == "compare-list") && ($(this).find(".info-number").text() == 0)) { return false; }
            else if (($(this).parent().attr('id') == "viewed-list") && ($(this).find(".info-number").text() == 0)) { return false; }
            else if (($(this).parent().attr('id') == "cart-list") && ($(this).find(".info-number").text() == 0)) { return false; }

            $(this).parent().toggleClass('open');
            if (($(this).parent().hasClass('open'))&&($(this).parent().attr('id') == "compare-list")) {
                $("#compare-button").addClass("active");
            }

            else if(($(this).parent().hasClass('open'))&&($(this).parent().attr('id') == "member-list")) {
                $("#member-button").addClass("active");
            }
            
            else if(($(this).parent().hasClass('open'))&&($(this).parent().attr('id') == "cart-list")) {
                var MiniCart = '//www.asus.com/' + getWebsite() + '/MiniCart.aspx';
                if (getWebsite() == "cn") {
                    MiniCart = '//www.asus.com.cn/MiniCart.aspx';
                }
                $("#ifrmMiniCart").height(380);
                $("#ifrmMiniCart").attr("src",MiniCart);
            }
            
            $(this).find(".member-arrow").show();

        }
        else {
            memberbar_allclose();
        }
        return false;
    });
    if (!touch_on) {
        $("#compare-button,#member-button").on("mouseenter", function () {
            $(document).off("mousedown", memberbar_allclose);
        });
        $("#memberbar").on("mouseleave", function () {
            $(document).one("mousedown", memberbar_allclose);

        }).on("mouseenter", function () {
            $(document).off("mousedown", memberbar_allclose);
        });
    }
    $("#asus_memberregister").on("click", function () {
        if (!$("#asus_register")[0]) {
            var form = document.createElement('form');
            form.id = 'asus_register';
            form.action = document.getElementById("asus_memberregister") ? document.getElementById("asus_memberregister").href : document.getElementById("anchorMemberDrop").href;
            form.method = 'post';
            form.style.display = 'none';

            var input_AppID = document.createElement('input');
            input_AppID.name = 'AppID';
            input_AppID.value = '0000000002';

            var input_ReturnUrl = document.createElement('input');
            input_ReturnUrl.name = 'ReturnUrl';
            input_ReturnUrl.value = window.location.href;
            form.appendChild(input_AppID);
            form.appendChild(input_ReturnUrl);
            document.getElementById("memberbar-zone").appendChild(form);
        }
        $("#asus_register").submit();
        return false;
    });

    var get_close = asus.getClass("close-drop", document.getElementById("memberbar-zone"));
    for (var i = 0; i < get_close.length; i++) {
        asus.addEvent(get_close[i], "click", function (e) {
            memberbar_allclose();
            if (e.preventDefault) { e.preventDefault(); }
            else { return false; }
        });
    }


    /* menu */
    var menu_open = false;
    var nav_button_open = false;
    var search_button_open = false;
    var menu_left = '0';
    var tpm;

    var nav_in_mouseover = false;
    var nav_mouseover = function () {
        nav_in_mouseover = true;
        tpm = $(this);
        setTimeout(function () {
            if (nav_in_mouseover == true) {
                tpm.siblings().find("div").hide();
                tpm.find("div").show();

            }
        }, 300);
        return false;
    };
    var nav_mouseout = function () {
        nav_in_mouseover = false;
        tpm = $(this);
        setTimeout(function () {
            if (nav_in_mouseover == false) {
                $("#nav>li").find("div").hide();
            }
        }, 300);
    };
    var nav_click = function () {
        if ($(this).parent().find("div").length == 0){
            return true;
        }
        $(this).parent().find("div").toggle();
        $(this).parent().siblings().find("div").hide();
        return false;
    };
    

    if ($(window).width() > 720){
        if (touch_on) {
            $("#nav>li>a").on("click", nav_click);
        }
        else {
           // $("#nav>li>a").on("click", nav_click);
            $("#nav>li").on("mouseenter", nav_mouseover);
            $("#nav>li").on("mouseleave", nav_mouseout);
        }
    }
    var phone_menu = function () {

        if (($(window).width() > 720) && (menu_open == true)) {
            $("#main-product-nav-button").off("click");
            $("#search-nav-button").off("click");
            nav_button_open = false;
            menu_open = false;
            $("#main-product-nav").hide();
            $("#main-product-nav-button .icon-list").removeClass("active");
            $("#search-nav-button .icon-search").removeClass("active");
            $("#nav li").off("click");
            $(".back-title").remove();
            menu_left = 0;
            $("#nav").css({ "left": "0%" });
            if (touch_on) {
                $("#nav>li>a").on("click", nav_click);
            }
            else {
                $("#nav>li").on("mouseenter", nav_mouseover);
                $("#nav>li").on("mouseleave", nav_mouseout);
            }
            //----------------------
            above_left = 0;
            $("#member-above span").off("click");
            $("#member-above .back-title").remove();
            return;
        }

        else if (($(window).width() <= 720) && (menu_open == false)) {
            menu_open = true;
            if (touch_on) {
                $("#nav>li").off("click", nav_click);
            }
            else {
                $("#nav>li").off("mouseenter", nav_mouseover);
                $("#nav>li").off("mouseleave", nav_mouseout);
            }

            $("#main-product-nav").hide();
            $("#main-search").hide();
            $("#main-product-nav-button").on("click", function () {

                if (nav_button_open == false) {
                    nav_button_open = true;
                    $("#main-product-nav").show();
                    $("#main-product-nav-button .icon-list").addClass("active");
                    search_button_open = false;
                    $("#main-search").hide();
                    $("#search-nav-button .icon-search").removeClass("active");
                }
                else {
                    nav_button_open = false;
                    $("#main-product-nav").hide();
                    $("#main-product-nav-button .icon-list").removeClass("active");
                }
            });
            $("#search-nav-button").on("click", function () {
                if (search_button_open == false) {
                    search_button_open = true;
                    $("#main-search").show();
                    $("#search-nav-button .icon-search").addClass("active");
                    nav_button_open = false;
                    $("#main-product-nav").hide();
                    $("#main-product-nav-button .icon-list").removeClass("active");
                }
                else {
                    search_button_open = false;
                    $("#main-search").hide();
                    $("#search-nav-button .icon-search").removeClass("active");
                }
            });

            var next_obj, text, mbox, onbacktitle;
            $("#nav li").on("click", function () {

                if ($(this).contents('div').length || $(this).contents('ul').length) {

                    if ($(this).contents('div').length) { mbox = 1; $(this).contents('div').show(); next_obj = $(this).contents('div').children('ul'); }
                    else if ($(this).contents('ul').length) { mbox = 2; $(this).contents('ul').show(); next_obj = $(this).contents('ul'); }
                    if ($(this).contents('a').length) { text = $(this).contents('a').text(); }
                    else { text = $(this).contents().eq(0).text(); }

                    next_obj.prepend('<li class="back-title" dataclose="' + mbox + '">' + text + '</li>');
                    $(".back-title").off("click");
                    $(".back-title").one("click", function () {
                        onbacktitle = $(this);
                        $("#nav").css({ "left": menu_left + "%" });
                        menu_left = menu_left + 100;
                        $("#nav").animate({ "left": menu_left + "%" }, 500, function () {
                            if (onbacktitle.attr("dataclose") == 1) {
                                onbacktitle.parents("div").eq(0).hide();
                            }
                            else {
                                onbacktitle.parents("ul").eq(0).hide();
                            }
                            onbacktitle.remove();
                        });

                        return false;
                    });
                    $("#nav").css({ "left": menu_left + "%" });
                    menu_left = menu_left - 100;
                    $("#nav").animate({ "left": menu_left + "%" }, 500);
                    return false;
                }
                else if ($(this).contents('a').length) {
                    location.href = $(this).contents('a').attr("href");
                }
                return false;
            });

            //---------------------------------------------
            $("#member-above ul ul").each(function () {
                var text = $(this).prev().text();
                $(this).prepend('<li class="back-title">' + text + '</li>');
            });


            $("#member-above ul li.arrow-style ul .back-title").remove();

            $("#member-above .back-title").on("click", function () {
                above_left = above_left + 100;
                $("#member-above>ul").animate({ "left": above_left + "%" }, 500);
                return false;
            });

            $("#member-above span").on("click", function () {

                $(this).next().show();
                above_left = above_left - 100;
                $("#member-above>ul").animate({ "left": above_left + "%" }, 500);
            });


        }


    };
    $(window).on("resize", phone_menu);
    phone_menu();

    //member menu 
    $("#member-button").on("click", function () {
        $("#asus_memberlogin").click();
        $("#anchorMemberDrop").click();
    });


    $("#compare-button").on("click", function () {
        $("#compare-list .dropdown-toggle").click();
    });

});

function LoadMemberDrop(data) {
    if (data == 'User is not logged in!'){
        asus.login();
    }
    else {
        document.getElementById("ulMemberDrop").innerHTML = data;

        if ($(window).width() < 720) {
            $("#member-above ul ul").each(function(){
                var text = $(this).prev().text();
                $(this).prepend('<li class="back-title">'+text+'</li>');
            });
            
            
            $("#member-above ul li.arrow-style ul .back-title").remove();
            
            $("#member-above .back-title").on("click",function(){
                above_left = above_left +100;
                $("#member-above>ul").animate({"left":above_left+"%"},500);
                return false;
            });
           
            $("#member-above span").on("click",function(){

                $(this).next().show();
                above_left = above_left -100;
                $("#member-above>ul").animate({"left":above_left+"%"},500);
            });
        }
        
        var get_close = asus.getClass("close-drop",document.getElementById("ulMemberDrop"));
        for (var i = 0; i < get_close.length; i++){
             asus.addEvent(get_close[i],"click",function(e){
                $("#memberbar .member-arrow").hide();
                removeClass(document.getElementById("anchorMemberDrop").parentNode,"open");
                if (e.preventDefault) {e.preventDefault();}
                else {return false;}
            });
        }

    }
}

/*
function open_Compare_List(move){
	$("#memberbar a.dropdown-toggle").parent().removeClass('open');
	$("#compare-list a").click();
	if (move) {asus.getID('compare_detail').asus_scroll.move_to(move,100);}
}         
*/