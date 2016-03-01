
var iPhone5 = /iPhone OS 5_0/i.test(navigator.userAgent);
var iPhone5_1 = /iPhone OS 6_1/i.test(navigator.userAgent);
//alert(navigator.userAgent);
(function ($) {

	$.fn.setEqualHeight = function (ele) {
		var maxHeight = 0;
		var maxElement = null;
		$(ele).css({ "height": "auto" })
		$(ele).each(function (i) {
			if (($(this).height() + parseInt($(this).css("padding-bottom")) + parseInt($(this).css("padding-top"))) > maxHeight) {
				maxHeight = $(this).height() + parseInt($(this).css("padding-top")) + parseInt($(this).css("padding-bottom"));
				maxElement = this;
			}
		});
		$(ele).not($(maxElement)).each(function () {
			$(this).height(maxHeight - parseInt($(this).css("padding-top")) - parseInt($(this).css("padding-bottom")))
		})
	};

	$.fn.rgNavigation = function (options) {
		$('li > ul:not(.show)', this).hide();
		$('li > ul li a[class=sublistActive]', this).parents('ul').show().prev('a').addClass('listActive');
		$('li:has(ul)', this).addClass('accordionNavList');
		$('li:has(ul) > a, span', this).on('click.fndtn', function () {
			currentURL = document.location.href;
			gotoLink = $(this).attr('href');
			$(this).toggleClass('listActive');
			$(this).next('span.rightArrow').toggleClass('listActive');
			$(this).next('span.rightArrowSub').toggleClass('listActive');
			$(this).prev('a').toggleClass('listActive listActiveOnlyBold');
			$(this).siblings('ul').slideToggle('fast');
			$(this).parent().siblings('li').children('ul:visible').slideUp('fast')
				.parent('li').find('a, span').removeClass('listActive listActiveDown listActiveOnlyBold');
			if (currentURL.indexOf(gotoLink) != -1 && currentURL.indexOf('.htm') == -1) return false;
			else if (currentURL.indexOf(gotoLink) == -1 || currentURL.indexOf('.htm')) return true;
			else return false;
		});
	};

	$.fn.urlParam = function (name) {
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
		return results[1] || 0;
	}

	/* $.fn.preSelectLftNav = function (navTxt) {
		setTimeout(function () {
			$(".listActive").removeClass("listActive");
			$(".listActiveOnlyBold").removeClass("listActiveOnlyBold");

			
			var t = $("#leftNav a[title='" + navTxt + "']")

			if (!t.hasClass('hdLinks')) {
				var t = $("#leftNav a[title='" + navTxt + "']").attr({ "href": "javascript:;" }).addClass("listActive").parents("ul").prev().removeClass("listActive");
				if ($("#leftNav a[title='" + navTxt + "']").addClass("listActive").siblings('ul').hasClass("leftNavSubLinks")) {
					$("#leftNav a[title='" + navTxt + "']").attr({ "href": "javascript:;" }).addClass("listActive listActiveDown listActiveOnlyBold").siblings('ul').show();
				}
				if ($("#leftNav a[title='" + navTxt + "']").parents(".leftNavSubLinks").hasClass("leftNavSubLinks")) {
					t.parents(".accordionNavList").find("a").eq(0).addClass("listActiveDown")
				}
			} else t.attr({ "href": "javascript:;" }).addClass("listActiveOnlyBold");
			t.trigger("click")
		}, 500);
	}; */
	
	$.fn.preSelectLftNav = function (navTxt) {
		setTimeout(function () {
			$(".listActive").removeClass("listActive");
			$(".listActiveOnlyBold").removeClass("listActiveOnlyBold");
			
			var t = $("#leftNav a[datarel='" + navTxt + "']");
			if (!t.hasClass('hdLinks')) {
				var t = $("#leftNav a[datarel='" + navTxt + "']").attr({ "href": "javascript:;" }).addClass("listActive").parents("ul").prev().removeClass("listActive");
				if ($("#leftNav a[datarel='" + navTxt + "']").addClass("listActive").siblings('ul').hasClass("leftNavSubLinks")) {
					$("#leftNav a[datarel='" + navTxt + "']").attr({ "href": "javascript:;" }).addClass("listActive listActiveDown listActiveOnlyBold").next().addClass("listActive").siblings('ul').show();/* changes by tamil */
				}
				if ($("#leftNav a[datarel='" + navTxt + "']").parents(".leftNavSubLinks").hasClass("leftNavSubLinks")) {
					t.parents(".accordionNavList").find("a").eq(0).addClass("listActiveDown")
				}
			} else t.attr({ "href": "javascript:;" }).addClass("listActiveOnlyBold");
			t.trigger("click")
		}, 500);
	};

	$.fn.tab = function (options) {
		$("body").on('click',"ul.tabs li:not('.active')", function() {
			$this = $(this);
			$tabsContainer = $this.parents('.tabsContainer');
			if(!$(this).hasClass("tabClose") ) 
			{
				$tabsContainer.find("ul.tabs li:first").removeClass('activeArrow');
				$tabsContainer.find("ul.tabs li.removeActive").removeClass("removeActive");
				$tabsContainer.find("ul.tabs li.active").removeClass('active');
				$this.addClass('active');
				$tabsContainer.siblings('div.tabContentWrap').slideDown(500);
				$tabsContainer.siblings('div').children(".tabContent").hide().removeClass('active_content')
					//.eq($this.index()-1).addClass('active_content').fadeIn();	//display curresponding div of the clicked anchor
				if ($.browser.msie && $.browser.version < 9.0) {
					$tabsContainer.siblings('div').children(".tabContent").eq((($(this).index())/2)-1).addClass('active_content').fadeIn().css('display','block');
				}
				else{
					$tabsContainer.siblings('div').children(".tabContent").eq($(this).index()-1).addClass('active_content').fadeIn().css('display','block');
				}
			}
			else
			{
				if($this.hasClass("activeArrow"))
				{
					$this.removeClass("activeArrow");
					$tabsContainer.find("ul.tabs li.removeActive").addClass("active").removeClass("removeActive");
					$tabsContainer.siblings('div.tabContentWrap').slideDown(500);
					//$(".tabs li:not(':first') a").css("background-position","0 0px");
				}
				else{
					$this.addClass("activeArrow");
					$tabsContainer.find("ul.tabs li.active").addClass("removeActive").removeClass("active");
					$tabsContainer.siblings('div.tabContentWrap').slideUp(500);
					//$(".tabs li:not(':first') a").css("background-position","0 -10px");
				}
			}
			if (!mobile.detect() && !tablet.detect()) {$('.scroll-pane').jScrollPane();}
		});
	};
})(jQuery);
$(function () {
	$.when(
	$.getScript("/js/jquery.mousewheel.js"),
	$.getScript("/js/jquery.jscrollpane.min.js"),
	$.Deferred(function (deferred) {
		$(deferred.resolve);
	})).done(function () {
		if (!tablet.detect() && !mobile.detect()) {
			$('.scroll-pane').jScrollPane();
		} else {
			$('.tooltip .scroll-pane').jScrollPane({showArrows: true});

		}
	});
})
function Select_OpenNewwindow1( url, width, height, options, name ){if (! width ) width = 250;if (! height ) height = 250;if (! options ) options = "scrollbars=yes,menubar=no,toolbar=no,location=yes,status=no,resizable=no";if (! name ) name = "otherwindows";var newWin = window.open( url, name, "width=" + width + ",height=" + height + "," + options );}
function fb(url) {
//window.open(url);
	if (confirm('By clicking "OK" you acknowledge that you are leaving a Citibank website to go to a third party website, and that Citibank does not accept any responsibility for the operation of the third party website. \nDo you wish to continue?')) {
	window.open(url);
	}
}

function fbgold(url) {
	if (confirm('By clicking "OK" you acknowledge that you are leaving a Citibank website to go to a third party website, and that Citibank does not accept any responsibility for the operation of the third party website. \nDo you wish to continue?')) {
		window.open(url);
	}
}

function speedbumpMY(url) {
	if (confirm('You are now leaving the Citibank India website and entering a third party website. \n\n Any information you may provide on the third party website shall be subject to the confidentiality and security terms of such website and not the privacy policies of Citibank India, and Citibank India shall not bear any responsibility for any unauthorized  disclosure or breach of confidentiality in relation to such information provided. \n\n Furthermore any link to a third party website contained herein does not constitute an endorsement by Citibank India of such third party, their website or their products and/or services, and Citibank India also makes no warranties as to the content of such website. \n\n Would you like to continue?')) {
		window.open(url);
	}
}



function speedbumpMYMic(url) {
	if (confirm("You are now leaving Citibank Website &amp; entering a third party site. Please be advised that you will no longer be subject to or under the protection of the privacy or security policies of Citibank's website. The inclusion of the third party link in Citibank's website does not imply that Citibank endorses or support the content of the third party website. The content of the third party website is solely the responsibility of the provider or the website. Any transaction that you enter into with any vendor, merchant or other party from this site is between you and that vendor, merchant or other party. All information you provide and all dealings between you and the third party will be subject to all terms, conditions, privacy policies, warranties and representations of the applicable third party site. You are advised to read the said terms, conditions, privacy policies, warranties and representations Citibank India does not accept any liability for information you provide at such third party site or for the content of or for the product and services provided in the third party website. Would you like to continue?")) {
		window.open(url);
	}
}

/*Print Script*/
function printField() 
{
	/*var s = $(".TermsAndConditions").html();
	pWin = window.open('','pWin','location=yes, menubar=yes, toolbar=yes');	
	pWin.document.open();
	pWin.document.write('<html><head><style type="text/css"> table{ font-size:13px; } .jspPane,.scroll-pane,.jspContainer{height:auto!important;width:100%!important;}</style></head><body><font face= Arial size=2pt>');
	pWin.document.write(s);
	pWin.document.write('</font></body></html>');
	pWin.print();
	pWin.document.close();
	pWin.close();*/
}
/*Print Script*/

$(document).ready(function(){
	var loc = location.href;
	//$("#qrCode").html("<img src='http://api.qrserver.com/v1/create-qr-code/?data="+loc+"&#38;size=106x106&#38;prov=goqrme' alt='' title='' />");
	$(".printIcon").click(function(){
		var s = $(this).parents(".scrollArea").find(".TermsAndConditions").html() || $(".printSection").html();
		pWin = window.open('','pWin','location=yes, menubar=yes, toolbar=yes');	
		pWin.document.open();
		pWin.document.write('<html><head><style type="text/css"> table{ font-size:13px; } .jspPane,.scroll-pane,.jspContainer{height:auto!important;width:100%!important;}</style></head><body><font face= Arial size=2pt>');
		pWin.document.write(s);
		pWin.document.write('</font></body></html>');
		pWin.print();
		pWin.document.close();
		pWin.close();
	});

	/* Filter */
	/*var allCards = $(".productsMain").clone();

	$("body").on("click",".cardsTab li:not('.active')",function(){
		count = 0;
		$prd = "";
		$("html,body").animate({scrollTop:$(this).offset().top},1000)
		var cardType = $(this).find('a').attr("class");
		$(".cardsTab li").removeClass("active");
		$(this).addClass("active");
		//$(".productsMainCont").remove();

		if(cardType == "showAll"){
			$(".productsMain").html(allCards);
			$(".filterType").text("Show All Cards")
		}
		
		if (cardType == "production"){
			$details = $(allCards).clone();
			details = $details.find(".prduction_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("prduction_card");
		}

		if (cardType == "child"){
			$details = $(allCards).clone();
			details = $details.find(".child_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("child_card");
		}

		if (cardType == "wealth"){
			$details = $(allCards).clone();
			details = $details.find(".wealth_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("wealth_card");
		}

		if (cardType == "savings"){
			$details = $(allCards).clone();
			details = $details.find(".savings_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("savings_card");
		}

		if (cardType == "retirement"){
			$details = $(allCards).clone();
			details = $details.find(".retirement_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("retirement_card");
		}

		if (cardType == "topProducts"){

			$details = $(allCards).clone();
			details = $details.find(".top_products").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("top_products");
		}
			

		if(cardType == "travel"){
			$(".filterType").text("Travel")
			$details = $(allCards).clone();
			details = $details.find(".travel_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("travel_card");
		}

		if(cardType == "retail"){
			$(".filterType").text("Retail")
			$details = $(allCards).clone();
			details = $details.find(".retail_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("retail_card");
		}

		if(cardType == "lifestyle"){
			$(".filterType").text("Lifestyle")
			$details = $(allCards).clone();
			details = $details.find(".lifestyle_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("lifestyle_card");
		}

		if(cardType == "fuel"){
			$(".filterType").text("Fuel")
			$details = $(allCards).clone();
			details = $details.find(".fuel_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("fuel_card");
		}

		setTimeout(function(){
			myEqualHeight()
		},100);
		
	});*/
	/* Filter End*/
	if ((location.href).indexOf('tab') > 0)
	{
		var val = -1;
		$opn = getParameter('tab');
		if(tablet.detect())
		{
			switch($opn)
			{
				case 'jump1': val=1; break;
				case 'jump2': val=2; break;
				case 'jump3': val=3; break;
				case 'jump4': val=4; break;
				case 'jump5': val=5; break;
				case 'jump6': val=6; break;
				case 'jump7': val=7; break;
				case 'jump8': val=8; break;
			}
			$val = val-1;
		}
		else
		{
			switch($opn)
			{
				case 'jump1': val=0; break;
				case 'jump2': val=1; break;
				case 'jump3': val=2; break;
				case 'jump4': val=3; break;
				case 'jump5': val=4; break;
				case 'jump6': val=5; break;
				case 'jump7': val=6; break;
				case 'jump8': val=7; break;
			}
			$val = val;
		}

		if (val != -1)
		{
			$(".tabs li").removeClass('active').eq($val+1).addClass('active');
			$(".tabContentWrap .tabContent").removeClass('active_content').eq($val).addClass('active_content');
			$(".tabContentWrap .tabHeading").removeClass('active').eq($val).addClass('active');
			//$(".tabs li:visible").eq($val).addClass('active');
			$('.active_content').show();
			if (mobile.detect() && !tablet.detect()) { $("body, html").animate({'scrollTop':$(".tabHeading.active").offset().top},1200);}
			else { $("body, html").animate({'scrollTop':$(".tabs").offset().top},1200);}
		}

	}

	var allCards = $(".productsMain").html();
	
	$("body").on("click",".cardsTab li:not('.active')",function(){
		count = 0;
		$prd = "";
		$("html,body").animate({scrollTop:$(this).offset().top},1000);
		var cardType = $(this).find('a').attr("class");
		$(".cardsTab li").removeClass("active");
		$(this).addClass("active").blur();
		var filTxt = $(this).find('a').attr('title');
		$(".filterType").text(filTxt);

		if (cardType == "viewAll"){
			$(".productsMain").html(allCards);
		}

		if (cardType == "showAll"){
			$(".productsMain").html(allCards);
			$(".productWrap").show().eq(0).removeClass('last');
		}

		if (cardType == "featuredCards"){
			$details = $(allCards).clone();
			details = $details.find(".feature_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("feature_card");
		}

		if (cardType == "travel"){
			$details = $(allCards).clone();
			details = $details.find(".travel_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("travel_card");
		}

		if (cardType == "lifestyle"){
			$details = $(allCards).clone();
			details = $details.find(".lifestyle_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("lifestyle_card");
		}
		
		if (cardType == "cashback"){
			$details = $(allCards).clone();
			details = $details.find(".cashback_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("cashback_card");
		}

		if (cardType == "retail"){
			$details = $(allCards).clone();
			details = $details.find(".retail_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("retail_card");
		}

		if (cardType == "fuel"){
			$details = $(allCards).clone();
			details = $details.find(".fuel_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("fuel_card");
		}

		if (cardType == "production"){
			$details = $(allCards).clone();
			details = $details.find(".prduction_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("prduction_card");
			$(".productsList").css({"width":"96%", "padding-top":"20px"});
		}

		if (cardType == "wealth"){
			$details = $(allCards).clone();
			details = $details.find(".wealth_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("wealth_card");
		}

		if (cardType == "health"){
			$details = $(allCards).clone();
			details = $details.find(".health_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("health_card");
		}

		if (cardType == "savings"){
			$details = $(allCards).clone();
			details = $details.find(".savings_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("savings_card");
		}

		if (cardType == "retirement"){
			$details = $(allCards).clone();
			details = $details.find(".retirement_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("retirement_card");
		}

		if (cardType == "child"){
			$details = $(allCards).clone();
			details = $details.find(".child_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("child_card");
		}
		
		if (cardType == "topProducts"){

			$details = $(allCards).clone();
			details = $details.find(".top_products").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("top_products");
		}
			

		if (cardType == "health-insurance-plans"){
			$details = $(allCards).clone();
			details = $details.find(".health-insurance-plans_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("health-insurance-plans_card");
		}
	
		if (cardType == "family-floater-plans"){
			$details = $(allCards).clone();
			details = $details.find(".family-floater-plans_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("family-floater-plans_card");
		}
			
		if (cardType == "accident-Plans"){
			$details = $(allCards).clone();
			details = $details.find(".accident-Plans_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("accident-Plans_card");
		}
		if (cardType == "topProducts4healthaccident"){

			$details = $(allCards).clone();
			details = $details.find(".top_products_limat").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("top_products_limat");
		}
			
		if (cardType == "travel-plans"){
			$details = $(allCards).clone();
			details = $details.find(".travel-plans_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("travel-plans_card");
		}
		if (cardType == "commercial-plans"){
			$details = $(allCards).clone();
			details = $details.find(".commercial-plans_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("commercial-plans_card");
		}
		if (cardType == "property-Plans"){
			$details = $(allCards).clone();
			details = $details.find(".property-Plans_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("property-Plans_card");
		}
		if (cardType == "topProducts4nonLI"){
			$details = $(allCards).clone();
			details = $details.find(".topProducts4nonLI_card").remove().removeClass("left right center");
			$(".productsMain").html(details);
			filter("topProducts4nonLI_card");
		}
		setTimeout(function(){
			myEqualHeight()
		},100);
		$(this).blur();
	});
	
	


	/* Tab open */
	$(".Tabopen").click(function () {
        var opn = $(this).attr('data-rel');
        if (tablet.detect()) {
            switch (opn) {
            case 'first':val = 1;break;
            case 'second':val = 2;break;
            case 'third':val = 3;break;
            case 'fourth':val = 4;break;
            case 'fifth':val = 5;break;
            case 'sixth':val = 6;break;
            case 'seven':val = 7;break;
            }
        } else {
            switch (opn) {
            case 'first':val = 0;break;
            case 'second':val = 1;break;
            case 'third':val = 2;break;
            case 'fourth':val = 3;break;
            case 'fifth':val = 4;break;
            case 'sixth':val = 5;break;
            case 'seven':val = 6;break;
            }
        }
        $(".tabs li:visible:eq(" + val + ")").trigger("click");
        $(".tabHeading:visible:eq(" + val + ")").trigger("click");
    });
    $(document).trigger('pageinit');
   
	/* Tab open */
	
	$(".abtClrHead, .dealsHead, .manageHead, .accessibilityHead").each(function() {
		var banerTxtHeight = $(this).find('.left').height()/2;
		$(this).find('.left').css({'margin-top':-banerTxtHeight,'top':'52%','position':'relative'});
	});

	setTimeout(function(){
		$(".bannerProd, .bannerHolder").each(function() {
			var banerTxtHeight = $(this).find('.bannerTitle').height()/2;
			$(this).find('.bannerTitle').css({'margin-top':-banerTxtHeight,'top':'50%'});
		})
	},300);

	var val="", tab="";
	tab = getParameter(tab);
	switch (tab)
	{
		case "globalTrans": val="CITIBANK GLOBAL TRANSFER";break;
		case "travelAsst": val="TRAVEL ASSISTANCE";break;
		case "globalView": val="ONLINE GLOBAL VIEW";break;

		case "citigold": val="CITIGOLD";break;
		case "propertyInvest": val="PROPERTY INVESTMENT";break;
		case "marketWR": val="MARKET WATCH &amp; RESEARCH";break;

		case "24banking": val="CITIBANK GLOBAL TRANSFER";break;
		case "location": val="TRAVEL ASSISTANCE";break;
		case "payConv": val="ONLINE GLOBAL VIEW";break;

		case "cards": val="CARDS";break;
		case "mortgages": val="MORTGAGE";break;
		case "readyCredit": val="READY CREDIT";break;

		case "CWP": val="CITI WORLD PRIVILEGES";break;
		case "citiRewards": val="CITI REWARDS";break;
		case "globalLounge": val="GLOBAL LOUNGE ACCESS";break;
		case "citiGlobeshopper": val="CITI GLOBESHOPPER";break;
		case "loanLifestyle": val="HOME LOAN LIFESTYLE";break;
		default: val='';break;
	}
	setTimeout(function(){
		$(".tabs li  a[title='"+val+"']").trigger('click')
		//if (val !=""){$("body").preSelectLftNav(convert_case(val.toLowerCase()));}
	},600);

$(function(){
		function moveFloatMenu() {
			var menuOffset = menuYloc.top + $(this).scrollTop() + "px";
			$('.socialMedia').animate({top:menuOffset},{duration:500,queue:false});
		}
		menuYloc = $('.socialMedia').offset();
		//$(window).scroll(moveFloatMenu);
		//moveFloatMenu();
	});

	$("body").on("click","ul.slidesjs-pagination li a",function(){
		if(!$(this).hasClass("active")){$(this).addClass("active");}
	});
	/*$("body").on("click",'.sbToggle, .sbSelector',function(){
		if ($(this).siblings('a').hasClass('sbToggleOpen') || $(this).hasClass('sbToggleOpen'))
		{
			$(this).siblings('ul.sbOptions').addClass("scroll-pane");
		}
		setTimeout(function(){
			$('.scroll-pane').jScrollPane({contentWidth: '0px'})
		},300);
	});*/

	$("body").on("click","#fancybox-wrap .cancel",function(){
		$("#fancybox-close").trigger("click");
	})

	$(function () {
	$.when(
	$.getScript("/js/jquery.slides.min.js"),
	$.Deferred(function (deferred) {
		$(deferred.resolve);
	})).done(function () {
			$('#promotionslides').slidesjs({
				navigation: false
			});
		});
	});
	
	$('.lftNavMo').click(function()
	{
		if($(this).hasClass("active"))
		{
			$('#sidebar').slideUp('slow', function() {
				$('.lftNavMo.active').removeClass('active');
			});
		}
		else
		{
			$('#sidebar').slideDown('slow', function() {
				$('.lftNavMo').addClass('active');
			});
		}
	});

	$t = 0;
	$(".atIcon, .closeIcon, .closeIcon2").click(function(evt){
		evt.stopPropagation();
		if ( $t == 0)
		{
			$(".socialMedia").animate({"right": "+=791px"}, 500);
			$t=1;
		}
		else
		{
			$(".socialMedia").animate({"right": "-=791px"}, 500);
			$t=0;
		}
		$("#swiffycontainer > div").css('cursor','pointer');
	
	/*portal 3*/
	if (mobile.detect() || tablet.detect()){$vl = "-532px";}
		else {$vl = "-532px";}
		$(".socialMedia1").each(function(){
			if ($(this).css("right") == "-532px") 
			{
				$(this).animate({"right" : "-791px"}, 500);
			}
		})
		
		$('body').on("click",function(){
            if ($(".socialMedia1").css("right") == "-532px")
            {
                $(".socialMedia1").animate({"right" : "-791px"}, 500);
            }
        }) 
		if ( $(this).parents(".socialMedia1").css("right") == "-791px")
		{
			$(this).parents(".socialMedia1").animate({"right": "-532px"}, 500);
			$t=1;
		}
		else
		{
			$(this).parents(".socialMedia1").animate({"right": "-791px"}, 500);
			$t=0;
		}

	})
	
	/*portal 3*/
	
	$(document).click(function(e) {
		if (!$(e.target).parents().hasClass("socialMedia"))
		{
			if ($(".socialMedia").css("right") == "0px") 
			{
				$(".socialMedia").animate({"right" : "-791px"}, 500);
				$t=0;
			}
		}
	})

	setTimeout(function(){
		if(!$("ul.slidesjs-pagination li:first").children('a').hasClass("active")){$("ul.slidesjs-pagination li:first").children('a').addClass("active")}
	},800);

	$("#socialcall, #socialemail, #socialfb, #atIcon, #atIcon1").mouseover(function(){
		var socialval = $(this).find('img').attr('src').replace('-off','-on');
		$(this).find('img').attr('src',socialval);
		$(this).parents('.mediaIconsList').find('.iconDesc').show();
	});

	$("#socialcall, #socialemail, #socialfb, #atIcon, #atIcon1").mouseout(function(){
		$('.iconDesc').hide();
		var socialval = $(this).find('img').attr('src').replace('-on','-off');
		$(this).find('img').attr('src',socialval);
	});

	if($("#navScroll").is(':visible'))
	{
		if (mobile.detect() && !tablet.detect()) 
		{
			//$(".airAsiaTopMnu").css({'position':'inherit','width':'auto'});
			var cc=0;
			$("#navScroll").animate({
				"scrollLeft": $("#navScroll ul li.activeScroll").offset().left-60
			}, 400);
			$("#navScroll ul li").each(function(){
				cc += $(this).outerWidth(true);
			})
			$("#navScroll ul").css({"width": cc + "px"});

			$("body").on('click','.menuLftArro.active',function(){
				$("#navScroll ul li.activeScroll").addClass('removeScroll');
				$("#navScroll ul li").removeClass('activeScroll');
				$('.removeScroll').prev().addClass('activeScroll');
				var frameWidth = $("#navScroll ul li.activeScroll").outerWidth(true);
				$("#navScroll ul li").each(function(){
					$(this).removeClass('removeScroll');
				})
				$(".menuRhtArro").addClass('active');
				$("#navScroll").animate({
					"scrollLeft": "-=" + frameWidth
				}, 1200, function () {
					if ($("#navScroll").scrollLeft() == 0) {
						$(".menuLftArro").removeClass('active');
					} else {
						$(".menuLftArro").addClass('active');
					}
				});
			});

			$("body").on('click','.menuRhtArro.active',function(){
				$("#navScroll ul li.activeScroll").addClass('removeScroll');
				var cc = 0, frameWidth = $("#navScroll ul li.activeScroll").outerWidth(true);
				var imgCount = $("#navScroll ul li").length;
				$("#navScroll ul li").removeClass('activeScroll');
				$('.removeScroll').next().addClass('activeScroll');
				$("#navScroll ul li").each(function(){
					$(this).removeClass('removeScroll');
				})
				$("#navScroll ul li").each(function(){
					cc += $(this).outerWidth(true);
				})
				$("#navScroll ul").css({
					"width": cc + "px"
				})

				$(".menuLftArro").addClass('active');
				$("#navScroll").animate({
					"scrollLeft": "+=" + frameWidth
				}, 1200, function () {
					if ($("#navScroll").scrollLeft() + $("#navScroll").width() +4 >= cc) {
						$(".menuRhtArro").removeClass('active');
					} else {
						$(".menuRhtArro").addClass('active');
					}
				});
			});
		}
	}

	if (mobile.detect() && !tablet.detect()) 
		{
			if ($(".microSiteTopMenuRgt").length > 0)
			{
				$(".microSiteTopMenuRgt").animate({
						"scrollLeft": $(".microSiteTopMenuRgt ul li a.active").offset().left-60
					}, 400);
			}
			$("body").on('click','.menuLftArro.active',function(){
				$(".microSiteTopMenuRgt ul li.activeScroll").addClass('removeScroll');
				$(".microSiteTopMenuRgt ul li").removeClass('activeScroll');
				$('.removeScroll').prev().addClass('activeScroll');
				var frameWidth = $(".microSiteTopMenuRgt ul li.activeScroll").outerWidth(true);
				$(".microSiteTopMenuRgt ul li").each(function(){
					$(this).removeClass('removeScroll');
				})
				$(".menuRhtArro").addClass('active');
				$(".microSiteTopMenuRgt").animate({
					"scrollLeft": "-=" + frameWidth
				}, 1200, function () {
					if ($(".microSiteTopMenuRgt").scrollLeft() == 0) {
						$(".menuLftArro").removeClass('active');
					} else {
						$(".menuLftArro").addClass('active');
					}
				});
			});

			$("body").on('click','.menuRhtArro.active',function(){
				$(".microSiteTopMenuRgt ul li.activeScroll").addClass('removeScroll');
				var cc = 0, frameWidth = $(".microSiteTopMenuRgt ul li.activeScroll").outerWidth(true);
				var imgCount = $(".microSiteTopMenuRgt ul li").length;
				$(".microSiteTopMenuRgt ul li").removeClass('activeScroll');
				$('.removeScroll').next().addClass('activeScroll');
				$(".microSiteTopMenuRgt ul li").each(function(){
					$(this).removeClass('removeScroll');
				})
				$(".microSiteTopMenuRgt ul li").each(function(){
					cc += $(this).outerWidth(true);
				})
				$("ul#carousel").css({
					"width": cc + "px"
				})

				$(".menuLftArro").addClass('active');
				$(".microSiteTopMenuRgt").animate({
					"scrollLeft": "+=" + frameWidth
				}, 1200, function () {
					if ($(".microSiteTopMenuRgt").scrollLeft() + $(".microSiteTopMenuRgt").width() +4 >= cc) {
						$(".menuRhtArro").removeClass('active');
					} else {
						$(".menuRhtArro").addClass('active');
					}
				});
			});
			//alert("1");
		}

});


$(document).bind('pageinit', function(){
	
	$(".Tabopen").click(function(){
		
		if(mobile.detect())
		{
			var opn= $(this).attr('id');
			switch(opn)
			{
				case 'first': val=1; break;
				case 'second': val=2; break;
				case 'third': val=3; break;
				case 'fourth': val=4; break;
				case 'fifth': val=5; break;
				case 'sixth': val=6; break;
			}
			$(".tabs li:eq("+val+")").trigger("click");
		}
		
	});
});

function myEqualHeight() {
	$(".productWrap").each(function () {
		$("body").setEqualHeight($("h2", this));
		$("body").setEqualHeight($("h3", this));
		$("body").setEqualHeight($(".productsListDetails", this));
	})
	/*$(".productsEqualHeight").each(function () {
		$("body").setEqualHeight($(".productsList h2", this));
		$("body").setEqualHeight($(".info", this));
		$("body").setEqualHeight($(".infoTxt", this));
		$("body").setEqualHeight($(".tabInnerListHolder", this));
		$("body").setEqualHeight($(".getDetail", this));
	})*/

	$(".bottomLinksWrap").each(function () {
		$("body").setEqualHeight($("li h3", this));
		$("body").setEqualHeight($("li.left, li.center, li.right", this));
	})
	$(".colLinksWrap").each(function () {
			$("body").setEqualHeight($("li.left, li.center, li.right", this));
		})
	/*$(".colLinksWraptabBlock").each(function () {
		$("body").setEqualHeight($("li.left, li.center, li.right", this));
	})*/
	if (!mobile.detect())
	{
		$(".bottomLinksWrap").each(function () {
			$("body").setEqualHeight($("li.quickLinks  h3", this));
			$("body").setEqualHeight($("li.quickLinks .quickLinkscol, li.quickLinks .quickLinkscol2, li.quickLinks .quickLinkscol3", this));
		})
	}
	$(".microAccessLst, .micProdLstDet").each(function () {
		$("body").setEqualHeight($("h3", this));
		$("body").setEqualHeight($("p", this));

		$("body").setEqualHeight($(".left, .center, .right", this));
	})
	
	$(".dealsDetails").each(function () {
		$("body").setEqualHeight($("li p", this));
		$("body").setEqualHeight($("li a", this));
	})
	$(".promoInnBlock").each(function () {
		$("body").setEqualHeight($("li h3", this));
		$("body").setEqualHeight($("li.left, li.right", this));
	})
	$(".promoInnBlock").each(function () {
		$("body").setEqualHeight($("li h3", this));
		$("body").setEqualHeight($("li.left.features, li.right.features", this));
	})
	$(".promoBoxBlock").each(function () {
		$("body").setEqualHeight($("li h3", this));
		$("body").setEqualHeight($("li.left, li.right", this));
	})
	$(".miciconBlockShow").each(function () {
		$("body").setEqualHeight($("li h3"));
		$("body").setEqualHeight($("li p"));
		
	})
	$(".mainLst").each(function () {
		$("body").setEqualHeight($("h4", this));
		$("body").setEqualHeight($("p", this));
		$("body").setEqualHeight($("li.left, li.right", this));
	})
	$(".premierMilesLstInn").each(function () {
		$("body").setEqualHeight($("h3", this));
		$("body").setEqualHeight($("p", this));
	})
	$(".mobGetList").each(function () {
		$("body").setEqualHeight($(".mobGetList ul li", this));
		$("body").setEqualHeight($("p", this));
		$("body").setEqualHeight($("h3", this));
	})
}

$(document).ready(function () {
	$("#topMnu" + type).attr({ "href": "javascript:;" }).addClass("activeTabHighlight");
	$(".pageTitle").text(pageTitle);

	$('.flyout,.mainNavSignOn').css('z-index','999');
	$("body").tab();
	$("#leftNav").rgNavigation();
	$("body").on('click','.hideDetails', function () {
		$(this).removeClass('hideDetails').addClass('showDetails');
		$(".linkListDetails").slideUp();
	});
	$("body").on('click','.showDetails', function () {
		$(this).removeClass('showDetails').addClass('hideDetails');
		$(".linkListDetails").slideDown();
	});

	$("body").on("click",".tabContent > div a, .showHideArea .showHideHdr > a,  .showHideArea1 .showHideHdr1 > a,  .micShowHideArea .micShowHideHdr > a", function () {
		if($(this).children('span').hasClass('hide'))
		{
			$(this).children('span').removeClass('hide').addClass('show');
			$(this).parent().siblings('div').slideToggle(500);
		}
		else if($(this).children('span').hasClass('show'))
		{
			$(this).children('span').removeClass('show').addClass('hide');
			$(this).parent().siblings('div').slideToggle(500);
		}
	})

	$("body").on("click",".cardCheck input[type='radio']", function () {
		$this = $(this)
		$thsPos = $this.parents('.cardSelectList').position().top;
		//$(this).parent().siblings('.openClose').find('.openArrow').trigger('click');
		$(".cardName .cardDetails").css("display","none");
	 $(this).parent().siblings('.cardName').find('.cardDetails').css("display","block");
	 $(".cardSelectList .openClose a").removeClass("closeArrow").addClass('openArrow');
	 $(this).parent().siblings('.openClose').find('a').removeClass('openArrow').addClass('closeArrow');
	  setTimeout(function () {
			if (!mobile.detect() && !tablet.detect()) {
				$('.scroll-pane').jScrollPane();
				if(!$this.parents('.cardSelectList').find('.cardSelectList').is(":visible"))
				{
					var pane = $this.parents('.scroll-pane');
					pane.jScrollPane(
						{
							showArrows: false,
							animateScroll: true
						}
					);
					var api = pane.data('jsp');
					//api.scrollTo(0,$thsPos);
				}
			}
		}, 500);
	});

	$("body").on("click",".closeArrow, .openArrow", function () {
		$(this).toggleClass("closeArrow").toggleClass("openArrow");
		$(this).parents(".cardSelectList").find(".cardDetails").slideToggle('slow');
		if (!mobile.detect() && !tablet.detect()) {
			setTimeout(function () {
				$('.scroll-pane').jScrollPane()
			},500);
		}
		/*if($(this).hasClass("closeArrow"))
		{
			var pane = $('.cardSelect .scroll-pane');
			pane.jScrollPane(
				{
					showArrows: false,
					animateScroll: true
				}
			);
			var api = pane.data('jsp');
			api.scrollTo(0,$(this).parents('.cardSelectList').position().top);
		}*/
	});
	$("body").on("click",".fancyCancel",function(){
		$.fancybox.close();
	})

	/*Mobile Navigations */
	$("body").on("click",".mainMenuIcon", function () {
		$(this).toggleClass("active");
		$("#nav").slideToggle();
	})
	$("body").on('click',".leftNavIcon", function () {
		$(this).addClass('leftNavIconDown').removeClass('leftNavIcon');
		$("#sidebar").slideDown();
	});
	$('body').on('click', ".leftNavIconDown", function () {
		$(this).addClass('leftNavIcon').removeClass('leftNavIconDown');
		$("#sidebar").slideUp();
	});
	$(".importantLinks a.dropLink").click(function(){
		$(this).next().slideToggle()
	})
	$("body").on("click",".hideArrow", function () {
		$(this).removeClass("hideArrow").addClass("showArrow");
		$(this).parents(".productsList, .productsListPro").find(".productsListDetails").slideUp();
	})
	$("body").on("click",".showArrow", function () {
		$(this).removeClass("showArrow").addClass("hideArrow");
		$(this).parents(".productsList, .productsListPro").find(".productsListDetails").slideDown();
	})
	
	$("body").on("click",".hideArrow", function () {
		$(this).removeClass("hideArrow").addClass("showArrow");
		$(this).parents(".productsListMicro").find(".micProdLstDet").slideUp();
	})
	$("body").on("click",".showArrow", function () {
		$(this).removeClass("showArrow").addClass("hideArrow");
		$(this).parents(".productsListMicro").find(".micProdLstDet").slideDown();
	})
	
	
	$("body").on("click",".showArrow", function () {
		$(this).removeClass("showArrow").addClass("hideArrow");
		$(this).parents(".readyTab1").find(".newCredit").slideDown('slow');
	})
	
	$("body").on("click",".showArrow", function () {
		$(this).removeClass("showArrow").addClass("hideArrow");
		$(this).parents(".readyTab2").find(".existingCustomer").slideDown('slow');
	})

	$("body").on("click",".hideArrow", function () {
		$(this).removeClass("hideArrow").addClass("showArrow");
		$(this).parents(".readyTab1").find(".newCredit").slideUp();
	})
	var lnkLstTop, lnkLstWidth = $(".linkLstWrap").css("top");
	$("body").on("click","#footerLnk", function (e) {
		e.stopPropagation();
		$(".linkLstWrap").fadeIn(200);
		if(mobile.detect() || tablet.detect()){lnkLstTop = $(".linkLstWrap").outerWidth(true)+parseInt(lnkLstWidth)+5;}
		else {lnkLstTop = $(".linkLstWrap").outerWidth(true)+10;}
		if(!$(".linkLstWrap").hasClass('active')) {
			$(".linkLstWrap").animate({'top':'-'+lnkLstTop+'px','height':$(".linkLstWrap").outerWidth(true)},800,function(){
				if (mobile.detect() && !tablet.detect())
				{
					$("html,body").animate({"scrollTop":$(".linkLstWrap").offset().top},500);
				}
			})
			$(".linkLstWrap").addClass('active');
		}
		else{
			$(".linkLstWrap").animate({'top':lnkLstWidth,'height':0},800)
			$(".linkLstWrap").removeClass('active').fadeOut(600);
		}
	})

	$("body").on("click",".hideArrow", function () {
		$(this).removeClass("hideArrow").addClass("showArrow");
		$(this).parents(".readyTab2").find(".existingCustomer").slideUp();
	})
	
	/*$("body").on("click",".showArrow", function () {
		$(this).removeClass("showArrow").addClass("hideArrow");
		$(this).parents(".microAccessArea").find(".productsListMic").slideDown('slow');
	})
	
	$("body").on("click",".hideArrow", function () {
		$(this).removeClass("hideArrow").addClass("showArrow");
		$(this).parents(".microAccessArea").find(".productsListMic").slideUp();
	})*/
	
		

	$("body").on("click",".showArrow", function () {
		$(this).removeClass("showArrow").addClass("hideArrow");
		$(this).parents(".secureTab1").find(".secInetBanking").slideDown('slow');
	})

	$("body").on("click",".hideArrow", function () {
		$(this).removeClass("hideArrow").addClass("showArrow");
		$(this).parents(".secureTab1").find(".secInetBanking").slideUp();
	})

	$("body").on("click",".showArrow", function () {
		$(this).removeClass("showArrow").addClass("hideArrow");
		$(this).parents(".secureTab2").find(".secOnlinePurchases").slideDown('slow');
	})

	$("body").on("click",".hideArrow", function () {
		$(this).removeClass("hideArrow").addClass("showArrow");
		$(this).parents(".secureTab2").find(".secOnlinePurchases").slideUp();
	})
	
	$("body").on("click",".showArrow", function () {
		$(this).removeClass("showArrow").addClass("hideArrow");
		$(this).parents(".secureTab3").find(".secMblBanking").slideDown('slow');
	})

	$("body").on("click",".hideArrow", function () {
		$(this).removeClass("hideArrow").addClass("showArrow");
		$(this).parents(".secureTab3").find(".secMblBanking").slideUp();
	})
	
	$("body").on("click",".showArrow", function () {
		$(this).removeClass("showArrow").addClass("hideArrow");
		$(this).parents(".secureTab4").find(".secMblVishing").slideDown('slow');
	})

	$("body").on("click",".hideArrow", function () {
		$(this).removeClass("hideArrow").addClass("showArrow");
		$(this).parents(".secureTab4").find(".secMblVishing").slideUp();
	})



	$("body").on("click",".collapseUp", function () {
		$(this).removeClass("collapseUp").addClass("collapseDown");
		$(this).parents(".collapseWrap").find(".collapseContent").slideDown('slow');
	})
	$("body").on("click",".collapseDown", function () {
		$(this).removeClass("collapseDown").addClass("collapseUp");
		$(this).parents(".collapseWrap").find(".collapseContent").slideUp('slow');
	})
	
	$('.searchIconmMob').click(function () {
		$(this).toggleClass('active');
		$(".searchMobWrap ").toggleClass("active",function(){
			$("#searchBox").text('Search...');
		});
	});
		
	$(".toolTipLink").click(function (e) {
		$("#text").val(0);
		$("#rm").val("0.00");
		var index = 0;
		var val = $("#tenure > option").eq(index).text();
		$("#tenure > option").eq(index).attr("selected","selected")
		var str = $("#tenure option:selected").text();
		$("#tenure:first").attr("selected", true);
		$(".sbSelector").text(str);
		$(".tooltip").hide();
		$(this).next().show();
	})
	$(".clsInfoIcon").click(function (e) {
		$(".tooltip").hide();
		$(this).next().show();
		$('.tooltip .scroll-pane').jScrollPane({showArrows: true});
	})
	$(".tipClose").click(function () {
		$(this).parents(".tooltip").hide();
	})

	$(".tabHeading").click(function () {
		if (!$(this).hasClass("active") && $(this).next().is(":hidden")) {
			//$(this).parents('.tabContentWrap').find(".tabContent").slideUp(400);
			//$(this).parents('.tabContentWrap').find(".tabHeading").removeClass("active");
			$(this).addClass("active").next().slideDown("slow", function () {
				$("html,body").animate({
					scrollTop: $(this).offset().top - 83
				}, 1000)
			});
		} else {
			$(this).removeClass("active").next().slideUp();
		}
	})

	$("body").on("click",".appFooterScrolBot", function () {
		$(this).addClass("appFooterScrolTop").removeClass("appFooterScrolBot");
		$(this).parents(".footerMenu").css({
			"height": "auto"
		})
	})
	$("body").on("click",".appFooterScrolTop", function () {
		$(this).addClass("appFooterScrolBot").removeClass("appFooterScrolTop");
		$(this).parents(".footerMenu").css({
			"height": "16px"
		})
	})

	if (mobile.detect() || param == 'App') {
		$('body').on('click',".termsMinus", function () {
			$(this).removeClass('termsMinus').addClass('termsPlus');
			$(this).parents('.scrollAreaWrap').siblings('div.TermsAndConditions').slideUp();
		});
		$('body').on('click',".termsPlus", function () {
			$(this).removeClass('termsPlus').addClass('termsMinus');
			$(this).parents('.scrollAreaWrap').siblings('div.TermsAndConditions').slideDown();
		});
	}

	if (!mobile.detect() && !tablet.detect()) {
		$("body").on("click.fndtn",".flyout a", function () {
			var parent = $(this).parent().find("div.dropFlyout");
			var object = $(this);
			parent.clearQueue();
			parent.stop();
			$(this).stop();
			if ($(".activeMMenu").size() > 0) {
				$(".activeMMenu").stop(false, false).animate({
					"top": "-270px"
				}, 500, function () {
					$(this).removeClass("activeMMenu");
					$(".megaMenuCnt").css({
						"height": "0"
					});
					$(".activeTab").removeClass("activeTab");
					if ($(".activeSubMenu").size() > 0) {
						if (excuted == true) return false;
						parent.stop();
						$(".dropFlyoutList").fadeTo("slow", 0, function () {
							flagDispaly = $(parent).css("display");
							$(".activeSubMenu").stop(false, false).slideUp('slow', function () {
								if (flagDispaly != "block") {
									parent.addClass("activeSubMenu").stop(false, false).slideToggle(function () {
										$(".dropFlyoutList", parent).fadeTo("slow", 1);
										$(this).next("css3-container").show();
									}).parents("li").addClass("active");
								}
							}).removeClass("activeSubMenu").parents("li").removeClass("active");
						})
					} else {
						if (object.parent().find("div.dropFlyout")) {
							$(".dropFlyoutList", parent).fadeTo("slow", 0);
							parent.addClass("activeSubMenu").stop(false, false).slideDown(function () {
								$(".dropFlyoutList", parent).fadeTo("slow", 1);
								$(this).next("css3-container").show();
							}).parents("li").addClass("active");
							excuted = true;
						}
					}
				});
			} else {
				if ($(".activeSubMenu").size() > 0) {
					$(".dropFlyoutList").fadeTo("slow", 0, function () {
						flagDispaly = $(parent).css("display");
						$(".activeSubMenu").stop(false, false).slideUp('slow', function () {
							if (flagDispaly != "block") {
								parent.addClass("activeSubMenu").stop(false, false).slideToggle(function () {
									$(".dropFlyoutList", parent).fadeTo("slow", 1);
									$(this).next("css3-container").show();
								}).parents("li").addClass("active");
							}
						}).removeClass("activeSubMenu").parents("li").removeClass("active");
					})
				} else {
					if ($(this).parent().find("div.dropFlyout")) {
						$(".dropFlyoutList", parent).fadeTo("slow", 0);
						parent.addClass("activeSubMenu").stop(false, false).slideToggle(function () {
							$(".dropFlyoutList", parent).fadeTo("slow", 1);
							$(this).next("css3-container").show();
						}).parents("li").addClass("active");
					}
				}
			}
		})


		$("body").click(function (e) {
			if (!$(e.target).parents().hasClass("stoppropagationQL")) {
				if ($(".activeSubMenu").size() > 0) {
					$(".dropFlyoutList").fadeTo("slow", 0, function () {
						$(".activeSubMenu").stop(false, false).slideUp().removeClass("activeSubMenu").parents("li").removeClass("active");
					})
				}
			}
			
			if (!$(e.target).parents().hasClass("linkLstWrap")) {
				$(".linkLstWrap").animate({'top':lnkLstWidth,'height':0},800);
				$(".linkLstWrap").removeClass('active').fadeOut(600);
			}
			

			if (!$(e.target).hasClass("selectTxt")) {
				$('.selectDiv').slideUp('slow');
			}

			if (!$(e.target).hasClass("applyTxt")) {
				$('.applyDiv').slideUp('slow');
			}
			//if($(".cS-generalInfoHolder").css("display") == "block")
			if(!$(e.target).parents().hasClass("cS-signOnLinkHldr") && !$(e.target).hasClass("generalInfo"))
			{
				//$(".generalInfo").parent('div').css({ "position":"relative"});
				/*if (!$(".generalInfoMenu, .headTxtPos").is(":animated"))
				{
					$(".generalInfoMenu").fadeOut(200, function(){
						$(".cS-generalInfoHolder").animate({
										height: '0px'
									  }, 800, function() {
											$(this).slideUp('fast', function(){
												$(".generalInfo").parent('div').animate({
												width: '175px'
											}, 600, function() {
												$(".generalInfo").parent('div').css("overflow","hidden");
												$(".generalInfo").parent('div').css("background-image","");
											});
									  });
						$("a.generalInfo").removeClass("active");
						});
					});
				}*/
				$(".cS-generalInfoHolder").slideUp(function(){
					$('div.headTxtPos').removeAttr("style");
				$("a.generalInfo").removeClass("active");
				});
			}
			
		})
	}

	/*Header Section Start Script*/
	$("#topMnu" + type).attr({ "href": "javascript:;" }).addClass("activeTabHighlight");

	$(".pageTitle").text(pageTitle)
	$(".pageTitlePad").text(pageTitle)
	var leftAnimate = {
		"bankingSubMenu": "49",
		"CreditSubMenu": "123",
		"lendingSubMenu": "196",
		"investingSubMenu": "255",
		"insuranceSubMenu": "340",
		"onlineservicesSubMenu": "427"
		/*"investmentsSubMenu": "440"*/
	};
	$(".mainNavList li").each(function() {
		$("a", this).on('click.fndtn', function (e) {
		
		if ($(".socialMedia1").css("right") == "-532px")
            {
                $(".socialMedia1").animate({"right" : "-791px"}, 500);
            }
			e.stopPropagation();
			if($(".dropFlyout").hasClass("activeSubMenu"))
			{
				$(".dropFlyout").slideUp().removeClass("activeSubMenu");
				$(".dropFlyout").parent().removeClass("active");
			}
			var object = $(this);
			if($(this).hasClass("noMegaMenu")){
				return true;
			}
			if ($(".activeSubMenu").size() > 0) {
				$(".mnuSubCnt").fadeTo("slow", 0, function () {
					$(".activeSubMenu").stop(false, false).slideUp("slow", function () {
						showMegaMenu($(object));
					}).removeClass("activeSubMenu").parents("li").removeClass("active");
				});
			} else showMegaMenu($(this));
			$('.selectDiv').slideUp('slow');
			$(".applyDiv").slideUp('slow');
		})
	})

	$(document).click(function(e) {
		if (!$(".top-Navigation").parents(".top-Navigation").hasClass("top-Navigation")) {
			$(".mmSubArrow").hide();
			$(".activeMMenu").animate({
				"top": "-270px"
			}, 1000, function () {
				$(".megaMenuCnt").css({
					"height": "0"
				});
			})
			$(".activeMMenu").removeClass("activeMMenu");
			$(".activeTab").removeClass("activeTab");
		}
	});

	function showMegaMenu(object) {
		$(".mmSubArrow").hide();
		$(".activeTab").removeClass("activeTab");
		var rel = $(object).addClass('activeTab').attr("rel");
		if ($('.activeMMenu').size() > 0) {
			$(".activeMMenu").hide();
			$(".activeMMenu").css('top', "-437px");
			$(object).removeClass("activeMMenu");
			$(".activeTab").removeClass("activeTab");
			$(object).addClass('activeTab');
			$(".megaMenuCnt").css({
				"height": "437px"
			}).promise().done(function () {
				$("#" + rel).addClass('activeMMenu').css("top", "0");
				$("#" + rel).show();
				$(".mmSubArrow").show();
			})
			$(".mmSubArrow").stop(true, false).animate({
				"left": leftAnimate[rel]
			}, 500, function () {
				$(".mmSubArrow").show();
			});
		} else {
			$(".megaMenuCnt").css({
				"height": "437px"
			}).promise().done(function () {
				$("#" + rel).addClass('activeMMenu').animate({
					"top": "0"
				}, 500, function () {
					$(".mmSubArrow").show();
				})
				$("#" + rel).show();
			})
			$(".mmSubArrow").css({
				"left": leftAnimate[rel] + "px"
			});
		}
	}

	/* all orientation function on page load */
	$("#footer").after("<p id='back-top' style='display:none;'><span></span></p>");

	if ($.browser.msie && $.browser.version <= 9.0) {
		setTimeout(function () {
			$.getScript("/js/PIE.js", function () {
				if (window.PIE) {
					$('.rounded,.bannerTitleGold, .curvedCorners').each(function () {
						PIE.attach(this);
					});
				}
			})
		}, 100);
	}
	$(".tabsmenu li").click(function(){
		$this = $(this);
		$(".tabsmenu li").removeClass('active');
		$(".tabsmenu li > div").removeClass('tabmenutopArrow');
		$this.addClass('active');
		$this.children("div").addClass('tabmenutopArrow');

		$this.parents(".tabsmenuContainer").siblings("div").children(".tabmenuContent").removeClass("active")
			.eq($this.index()).addClass("active");
	});

	$(".tabMenuHeading").click(function () {
		if (!$(this).hasClass("active") && $(this).next().is(":hidden")) {
			$(this).addClass("active").next().slideDown("slow", function () {
				$("html,body").animate({
					scrollTop: $(this).offset().top - 60
				}, 1000)
			});
		} else {
			$(this).removeClass("active").next().slideUp();
		}
	})

	$("body").on("click","a[title='RESET']",function(){
		document.forms[0].reset();
		$(".nova").each(function(){
			$(this).selectbox('detach');
			$(this).prop('selectedIndex',0);
			$(this).selectbox('attach');
		})
	})
});

/* call orientation function on orientation change */
$(window).bind( 'orientationchange', function(){
	setTimeout(function(){
		$(".bannerProd, .bannerHolder").each(function() {
			$(this).show();
			var banerTxtHeight = $(this).find('.bannerTitle').height()/2;
			$(this).find('.bannerTitle').css({'margin-top':-banerTxtHeight,'top':"50%"});
		})
		$(".dealsHead, .manageHead, .accessibilityHead").each(function() {
			var banerTxtHeight = $(this).find('.left').height()/2;
			$(this).find('.left').css({'margin-top':-banerTxtHeight,'top':'52%','position':'relative'});
		})
		myEqualHeight()
	},100);
	
	$mobindx = -1;
	setTimeout(function () {
		var banerTxtHeight = $(".bannerTitle").height()/2;
		$(".bannerTitle").css({'margin-top':-banerTxtHeight,'top':'50%'});
		if (mobile.detect() || tablet.detect())
		{
			$wid = $(window).width();
			$hei = $(window).height();
			$scnPort = ($wid >= 480 && $wid <= 640) && ($hei >= 700 && $hei <= 1000);
			$scnLand = ($wid <= 1024 && $wid >= 800) && ($hei >= 380 && $hei <= 580);
			//alert("Width : "+$wid+"\n Height : "+$hei+"\n$scnPort :"+$scnPort+"\n$scnLand : "+$scnLand)
			if ($scnLand)
			{
				$(".TermsAndConditions").addClass('visible-termsCond');
			}
			else if ($scnPort)
			{
				$(".TermsAndConditions").removeClass('visible-termsCond');
			}

			if ( $(".tabs").length > 0 && ($scnPort || $scnLand) )
			{
				if ($scnPort)
				{
					// Landscape to Portrait orientation
					$(".tabContentWrap").show();
					if (!$(".tabClose").hasClass("activeArrow"))
					{
						$tbidx = $(".tabs li.active").index();
						$(".tabHeading").removeClass('active').eq($tbidx-1).addClass('active');
						$(".tabContent").hide().eq($tbidx-1).show();
					}
					else {
						$(".tabContent").hide();
						$(".tabHeading").removeClass('active');
					}
				}
				else if ($scnLand)
				{
					// Portrait to Landscape orientation
					$(".tabHeading").each(function(){
						if ($(this).hasClass('active'))
						{
							$mobindx = $(this).index() / 2;
							return false;
						}
					})
					if ($mobindx != -1 && $(".tabContent").is(":visible"))
					{
						$(".tabs li").removeClass('active removeActive').eq($mobindx+1).addClass('active');
						$(".tabContentWrap .tabContent").removeClass('active_content').removeAttr('style').eq($mobindx).addClass('active_content').show();
						$(".tabClose").removeClass("activeArrow");
					}
					else {
						$(".tabClose").addClass("activeArrow");
						$(".tabs li.active").removeClass('active').addClass('removeActive');
						$(".tabContentWrap").hide();
						$(".tabContentWrap .tabContent").removeAttr('style');
					}
				}
			}
		}
	},300)
});
$(window).load(function () {
	setTimeout(function () {
		setTimeout(myEqualHeight,250);
	});
});

$(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#back-top').fadeIn();
		} else {
			$('#back-top').fadeOut();
		}
	});

	// scroll body to 0px on click
	$('#back-top span').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

});



if (mobile.detect() || tablet.detect()) {
	/*Zepto for Css3 */
	if ('__proto__' in {}) {
		document.write("<script src='/js/zepto.js'></script>");
		$(function () {
			Zepto("body,html").tap(function (e) {
				if (!Zepto(e.target).hasClass("mainMenuIcon") && !Zepto(e.target).parents(".mainNav").hasClass("mainNav")) {
					$("#nav").slideUp();
					$(".mainMenuIcon ").removeClass("active");
				}
				if (!Zepto(e.target).hasClass("leftNavIcon") && !Zepto(e.target).hasClass("leftNavIconDown") && !Zepto(e.target).parents("#sidebar").is(":visible")) {
					$("#sidebar").slideUp();
					$('.leftNavIconDown').removeClass('leftNavIconDown').addClass('leftNavIcon');
				}
				if (!Zepto(e.target).hasClass("lftNavMo") && !Zepto(e.target).hasClass("active") && !Zepto(e.target).parents("#sidebar").is(":visible")) {
					$("#sidebar").slideUp();
					$('.lftNavMo').removeClass('active');
				}
				if (!Zepto(e.target).parents(".importantLinks").hasClass("importantLinks") && $(".dropdown").is(":visible")){
					$(".dropdown").slideUp();
				}
			})
		})
	}
	/*Zepto for Css3 */
}


function getParameter(parmeter)
{
	var sli=""
	var a=top.window.location;
	str=new String(a)
	var index = str.indexOf(parmeter);
	if(index!=-1)
	{
		var str1 = str.substring(index);
		var index1 = str1.indexOf("&");
		if (index1 == -1)
		{
			var index = str1.indexOf("=");
			var sli = str1.slice(index+1);
		}
		else
		{
			var index = str1.indexOf("=");
			var sli = str1.slice(index+1,index1);
		}
	}
	return sli;
}

/*For Footer Links*/
var externallinkty = 0;
function toggleExternalLinks() {
	if (externallinkty == 0) {
		document.getElementById("externallinkscontainer").style.display = "";
		moveUpExternalLink();
	} else moveDownExternalLink();
}

function moveUpExternalLink() {
	if (externallinkty > -190) {
		externallinkty -= 10;
		$('#externallinks').animate({
			top: '-=10'
		}, 30, moveUpExternalLink);
	} else {
		
	}
}

function moveDownExternalLink() {
	if (externallinkty < 0) {
		externallinkty += 10;
		$('#externallinks').animate({
			top: '+=10'
		}, 30, moveDownExternalLink);
	} else document.getElementById("externallinkscontainer").style.display = "none";
}



function capitaliseTxt(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function convert_case(str) {
  return str.toLowerCase().replace( /(^| )(\w)/g, function(x){return x.toUpperCase();} );
}

function sb(url)
{
	var name = confirm("You are now leaving the Citibank India website and entering a third party website.\n\nAny information you may provide on the third party website shall be subject to the confidentiality and security terms of such website and not the privacy policies of Citibank India, and Citibank India shall not bear any responsibility for any unauthorized  disclosure or breach of confidentiality in relation to such information provided.\n\nFurthermore any link to a third party website contained herein does not constitute an endorsement by Citibank India of such third party, their website or their products and/or services, and Citibank India also makes no warranties as to the content of such website.\n\nWould you like to continue?");
	if(name){window.open(url);}
}

/*tabsmenuWrapper tab added by tamilanban*/

	$.fn.tab = function (options) {
		$("body").on('click',"ul.tabs li:not('.active')", function() {
			$this = $(this);
			if($(this).hasClass('linkTab')){ }
			else{
				$tabsContainer = $this.parents('.tabsContainer');
				if(!$(this).hasClass("tabClose") ) 
				{
					$tabsContainer.find("ul.tabs li:first").removeClass('activeArrow');
					$tabsContainer.find("ul.tabs li.removeActive").removeClass("removeActive");
					$tabsContainer.find("ul.tabs li.active").removeClass('active');
					$this.addClass('active');
					$tabsContainer.siblings('div.tabContentWrap').slideDown(500);
					$tabsContainer.siblings('div').children(".tabContent").hide().removeClass('active_content')
					//.eq($this.index()-1).addClass('active_content').fadeIn();	//display curresponding div of the clicked anchor
					if ($.browser.msie && $.browser.version < 9.0) {
						$tabsContainer.siblings('div').children(".tabContent").eq((($(this).index())/2)-1).addClass('active_content').fadeIn();
					}
					else{
						$tabsContainer.siblings('div').children(".tabContent").eq($(this).index()-1).addClass('active_content').fadeIn();
					}
				}
				else
				{
					if($this.hasClass("activeArrow"))
					{
						$this.removeClass("activeArrow");
						$tabsContainer.find("ul.tabs li.removeActive").addClass("active").removeClass("removeActive");
						$tabsContainer.siblings('div.tabContentWrap').slideDown(500);
						//$(".tabs li:not(':first') a").css("background-position","0 0px");
					}
					else{
						$this.addClass("activeArrow");
						$tabsContainer.find("ul.tabs li.active").addClass("removeActive").removeClass("active");
						$tabsContainer.siblings('div.tabContentWrap').slideUp(500);
						//$(".tabs li:not(':first') a").css("background-position","0 -10px");
					}
				}
			}
			if (!mobile.detect() && !tablet.detect()) {$('.scroll-pane').jScrollPane();}
			return false;
		});
	};

	
function filter(card) {
    var m, e = 0,
        i;
    var $prd = '';
    for (m = 0; m < Math.ceil($("." + card).length / 3); m++) {
        $prd += '<div class="productWrap">';
        for (i = e; i <= e + 2; i++) {
            if ($('.productsList').eq(i).is(':visible')) {
                $prd += '<div class="productsList ' + card + '">' + $('.productsList').eq(i).html() + '</div>';
            }
        }
        e = i;
        $prd += '</div>';
    }
    $(".productsMain").html('').html($prd);
    count = 1;
    $("." + card).each(function (i) {
        if (count == 1) {
            $(this).addClass("left");
        }
        if (count == 2) {
            $(this).addClass("center");
        }
        if (count == 3) {
            $(this).addClass("right");
        }
        count++;
        if (count == 4) {
            count = 1;
        }
    });
    $(".productWrap:last").addClass('last');
}

function Loginpanel()
{
	var mainwin;
	var wdh=screen.width;
	var hgt=0.85*screen.height;
	var st="toolbar=0,location=1,directories=0,status=1,menubar=0,scrollbars=1,resizable=0,top=0,left=0,width="+wdh+",height="+hgt;
	mainwin=window.open("https://www.citibank.co.in/ibank/login/IQPin1.jsp","",st);
}
function Loginpanel1()
{
	var mainwin;
	var wdh=screen.width;
	var hgt=0.85*screen.height;
	var st="toolbar=0,location=1,directories=0,status=1,menubar=0,scrollbars=1,resizable=0,top=0,left=0,width="+wdh+",height="+hgt;
	mainwin=window.open("https://www.citibank.co.in/ibank/login/IQPin_uid.jsp","",st);
}
function nri()
{
	document.getElementById("nrilink").href="/citi-nri.htm";
	document.getElementById("nrilink").onclick="return ! window.open(this.href);"
}
var popupunld = true;
var dropofpopup=true;
function popupunload()
{
if(popupunld)
{
MM_dropofpopupWindow('https://online.citibank.co.in/portal/newgen/3rdparty/IOCSEM/images/mob-pop1.html?site=PORTAL&creative=NGX&section=STPDRP&agencyCode=XER&campaignCode=&productCode=&eOfferCode=STPDRP','popup','width=760,height=620,scrollbars=no,resizable=no');
}
}
function MM_dropofpopupWindow(theURL,winName,features) 
{ 
	if(dropofpopup==true)
	{
		window.open(theURL,winName,features);
	}
}

 function myFunction() {
    var x = document.getElementById("mySelect").value;
	
    if(x==1){
		document.getElementById("tabcontainer1").style.display='none';
        document.getElementById("tabcontainer2").style.display='none';
		document.getElementById("tabcontainer3").style.display='none';
		document.getElementById("tabcontainer4").style.display='none';
		document.getElementById("tabcontainer5").style.display='none';
	}
	else if(x==2){
		document.getElementById("tabcontainer1").style.display='block';
        document.getElementById("tabcontainer2").style.display='none';
		document.getElementById("tabcontainer3").style.display='none';
		document.getElementById("tabcontainer4").style.display='none';
		document.getElementById("tabcontainer5").style.display='none';
	}
	else if(x==3){
		document.getElementById("tabcontainer1").style.display='none';
        document.getElementById("tabcontainer2").style.display='block';
		document.getElementById("tabcontainer3").style.display='none';
		document.getElementById("tabcontainer4").style.display='none';
		document.getElementById("tabcontainer5").style.display='none';
	}
	else if(x==4){
		document.getElementById("tabcontainer1").style.display='none';
        document.getElementById("tabcontainer2").style.display='none';
		document.getElementById("tabcontainer3").style.display='block';
		document.getElementById("tabcontainer4").style.display='none';
		document.getElementById("tabcontainer5").style.display='none';
	}
	else if(x==5){
		document.getElementById("tabcontainer1").style.display='none';
        document.getElementById("tabcontainer2").style.display='none';
		document.getElementById("tabcontainer3").style.display='none';
		document.getElementById("tabcontainer4").style.display='block';
		document.getElementById("tabcontainer5").style.display='none';
	}
	else if(x==6){
		document.getElementById("tabcontainer1").style.display='none';
        document.getElementById("tabcontainer2").style.display='none';
		document.getElementById("tabcontainer3").style.display='none';
		document.getElementById("tabcontainer4").style.display='none';
		document.getElementById("tabcontainer5").style.display='block';
	}
}

/**11/8/2015*/
$(document).ready(function(){
	$("#topMnubanking,#topMnuloans,#topMnuinvesting,#topMnuinsurance,#topMnuonlineservices,#topMnuSpecialOffers").click(function(){
		$("#CreditSubMenu").css("display","none");
	});
});
/*end*/
