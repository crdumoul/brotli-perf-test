
(function() {	
    var cx = '012556927010794422044:xub2jikb_di';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
			
    var gssStyles = document.createElement('link');
    gssStyles.type = 'text/css';
    gssStyles.href = '/css/cse.css';
	gssStyles.rel = 'stylesheet'; 
    s.parentNode.insertBefore(gssStyles, s);
})();


var isSearchResults = false;
var gssScript = document.getElementById("gssScript");
if (gssScript) {
	//script gets the src attribute based on ID of page's script element:
	var requestURL = document.getElementById("gssScript").getAttribute("src");

	//next use substring() to get querystring part of src
	var queryString = requestURL.substring(requestURL.indexOf("?") + 1, requestURL.length);

	//Next split the querystring into array
	var params = queryString.split("&");
	for(var i = 0; i < params.length; i++){
		var name  = params[i].substring(0,params[i].indexOf("="));
		var value = params[i].substring(params[i].indexOf("=") + 1, params[i].length);
		if (name == 'csa' && value == 'searchResults') {
			isSearchResults = true;
		}
	}	
}



var gssCallback = function() {
  if (document.readyState == 'complete') {
    // Document is ready when CSE element is initialized.		 
	renderSearchControls();	
  } else {
    google.setOnLoadCallback(renderSearchControls, false);
  }
};

var gsearch = function() {
	var searchControl = google.search.cse.element.getElement('ingcbSearch');	
	searchControl.execute(document.getElementById('gsc-i-id1').value);
};

var renderSearchControls = function() {
	google.search.cse.element.render(
	{
	  div: "gssSearchBox",
	  tag: 'searchbox-only',
	  gname: 'ingcbSearch',
	  attributes: {resultsUrl: '/portal/newgen/search.html'}
	});	
	google.search.cse.element.render(
	{
	  div: "gssSearchBoxMobile",
	  tag: 'searchbox-only',
	  attributes: {resultsUrl: '/portal/newgen/search.html'}
	});		

	if (isSearchResults == true) {
		
		google.search.cse.element.render(
        {
          div: "gssSearchResults",
          tag: 'searchresults-only',
		  gname: 'ingcbSearch'
        });			
	} 
};
// Insert it before the CSE code snippet so that cse.js can take the script
// parameters, like parsetags, callbacks.
window.__gcse = {
  parsetags: 'explicit', callback: gssCallback
};


if(!$.fn.fancybox){
		$.holdReady( true );
        $("head").append('<link rel="stylesheet" href="/credit-card/images/overviewBanner/jquery.fancybox1.css?v=2.1.5">');
		$("head").append('<script  src="/credit-card/images/overviewBanner/jquery.fancybox1.js?v=2.1.5" type="text/javascript"></script>');
        $.holdReady( false );
	}

document.write('<div style="display:none;"><div id="inline2" style="width:293px;"><img src="/images/MGM-overlay.jpg" alt="Do you have a Citibank Credit Card / Savings account?" usemap="#Map2" /></div></div>');
$("body").append('<map name="Map2" id="Map2"><area alt="YES" title="YES" onclick="$.fancybox.close();" href="https://www.online.citibank.co.in/credit-card/mgm/member-get-member-webservice.htm?site=PORTAL&creative=NGX&section=INCCAMGMWEBPYESBUT&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INCCAMGMWEBPYESBUT" shape="rect" coords="46,86,136,115" target="_blank"/><area alt="NO" title="NO" onclick="$.fancybox.close();" href="https://www.online.citibank.co.in/portal/cards/jul15/MGM/MGM-application-form.htm?site=PORTAL&creative=NGX&section=INCCAMGMAPPFRMPNOBUT&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INCCAMGMAPPFRMPNOBUT" shape="rect" coords="158,86,249,115" target="_blank"/></map>');

 $(document).ready(function(){
	$(".welcom").fancybox({
		"onComplete": function(){
			if($('#fancybox-wrap').is(':visible')){
				$('#fancybox-wrap').addClass('credit-card-sec');
				  $("#fancybox-wrap.credit-card-sec").css({'width':293});
                 $(".credit-card-sec #fancybox-content, .credit-card-sec #inline1").css({'width':293});
			}
		}
	});
	

	$("#fancybox-close").click(function(){
        $("#fancybox-close").parents("#fancybox-wrap").removeClass("credit-card-sec");
    });
	$("#fancybox-close").click(function(){
$("#fancybox-overlay, #fancybox-wrap").fadeOut(800);
});

	
	$("#thirdLight, #fancy2").fancybox({
		"onCleanup": function(){
			$('#fancybox-wrap').hasClass('credit-card-sec').removeClass('credit-card-sec');
		}
	});

});
$('head').append('<link rel="stylesheet" href="/css/creditmgamenu.css" type="text/css">');
document.write('<div class="topMenu">'+
	'<ul class="topMenuLeft">'+
		'<li><a href="/?eOfferCode=INHOGNTHECIIN" title="CITIBANK INDIA">CITIBANK INDIA</a></li>'+
	'</ul>'+
	'<ul class="topMenuRight stoppropagationQL">'+
	'<li class="visible-desktop"><a href="https://www.online.citibank.co.in/portal/newgen/cards/tab/apply-now.htm?site=PORTAL&creative=NGX&section=INHOCCTHEAPPLY&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INHOCCTHEAPPLY" target="_blank" title="APPLY FOR CREDIT CARDS">APPLY FOR CREDIT CARDS</a></li>'+
		'<li class="divideBar visible-desktop">|</li>'+
		'<li class="visible-desktop"><a href="/press-room/citi-in-india.htm?eOfferCode=INHOGNTHEABOUS" title="ABOUT US">ABOUT US</a></li>'+
		'<li class="divideBar visible-desktop">|</li>'+
		'<li class="visible-desktop"><a href="/customerservice/home.htm?eOfferCode=INHOGNTHECONTU" title="CONTACT US">CONTACT US</a></li>'+
		'<li class="divideBar visible-desktop">|</li>'+
		'<li class="visible-desktop"><a href="/portal/important-communication.htm?eOfferCode=INHOIVTFECHD" target="_blank" title="REGULATORY DISCLOSURES">REGULATORY DISCLOSURES</a></li>'+
		'<li class="hidden-desktop importantLinks last"><a href="javascript:;" title="IMPORTANT LINKS" class="dropLink">IMPORTANT LINKS</a>'+
		'<div class="dropdown">'+
		'<div class="dropdownArrow"></div>'+
			'<ul>'+
			'<li><a href="https://www.online.citibank.co.in/portal/newgen/cards/tab/apply-now.htm?site=PORTAL&creative=NGX&section=INHOCCTHEAPP&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INHOCCTHEAPP" target="_blank" title="APPLY FOR CREDIT CARDS">APPLY FOR CREDIT CARDS</a></li>'+
				'<li><a href="/press-room/citi-in-india.htm?eOfferCode=INHOGNTHEABOU" title="ABOUT US">ABOUT US</a></li>'+
				'<li><a title="CONTACT US" href="/customerservice/home.htm?eOfferCode=INHOGNTHECONT">CONTACT US</a></li>'+
				'<li><a href="/portal/important-communication.htm?eOfferCode=INHOIVTFECH" target="_blank" title="REGULATORY DISCLOSURES">REGULATORY DISCLOSURES</a></li>'+
			'</ul>'+
		'</div>'+
		'</li>'+
		'<li class="visible-phone searchIconmMob">'+
		'</li>'+
		'		<li class="search hidden-phone last"><div class="innerwrap"><span class="searchIcon"> </span>'+
'			<div id="gssSearchBox"><input type="button" value="| GO" class="searchBtn" title="GO" onclick="javascript:gsearch()" /></div>'+
'		</div></li>'+   
	'</ul>'+
'</div>'+
'<div class="searchMobWrap">'+
'	<div class="searchBoxWrap">'+
'		<span id="gssSearchBoxMobile"></span>'+
'	</div>'+
'</div>'+
'<div class="banner">'+
    '<div class="mainMenu hidden-desktop">'+
        '<a href="javascript:;" class="mainMenuIcon"></a>'+
        '<a href="javascript:;" class="logOutIcon visible-tablet appredirect" target="_blank" ></a>'+
        '<a href="javascript:;" class="logOutIconapplogo visible-tablet"></a>'+
        '<a href="#appsignonpop" class="logOutIcon visible-phone appredirect windwosapp fancy-openbox"></a>'+
        '<a class="logo" href="/"></a>'+
        '<div class="pageTitle hidden-phone"></div>'+
        '<a class="leftNavIcon hidden-phone" href="javascript:;"></a>'+
    '</div>'+
    '<div class="logoWrap">'+
        '<a href="/" class="logo visible-desktop" title="Citi"></a>'+
//        '<a href="javascript:;" class="citiLogo visible-desktop" title="Citi"></a>'+
    '</div>'+
'</div>'+
'<div id="nav" class="top-Navigation mainNav">'+
	'<ul class="mainNavList visible-desktop">'+
		'<li><a href="/?eOfferCode=INHOGNTTNHOME" id="topMnu" class="noMegaMenu" title="Home">Home</a></li>'+
		'<li><a href="javascript:;" rel="bankingSubMenu" id="topMnubanking" title="Banking">Banking</a></li>'+
		'<li><a href="javascript:;" rel="CreditSubMenu" id="topMnucreditcards" title="Credit Cards">Credit Cards</a></li>'+
		'<li><a href="javascript:;" rel="lendingSubMenu" id="topMnuloans" title="Loans">Loans</a></li>'+
		'<li><a href="javascript:;" rel="investingSubMenu" id="topMnuinvesting" title="Investments">Investments</a></li>'+
		'<li><a href="javascript:;" rel="insuranceSubMenu" id="topMnuinsurance" title="Insurance">Insurance</a></li>'+
		'<li><a href="javascript:;" rel="onlineservicesSubMenu" id="topMnuonlineservices" title="Online Services">Online Services</a></li>'+
		'<li><a href="/card-offers/special-offers.htm?eOfferCode=INHOSOTTNSPOF" id="topMnuSpecialOffers" title="Special Offers" class="noMegaMenu">Special Offers</a></li>'+
		'<li><a href="/products-services/banking/citigold/citigold.htm?eOfferCode=INHOCGTTNCIGO" title="Citigold" class="noMegaMenu" target="_blank">Citigold</a></li>'+
		'<li><a href="/citi-nri.htm?eOfferCode=INHONRIBTTNNRIB" title="NRI Banking" class="noMegaMenu" target="_blank">NRI Banking</a></li>'+
	'</ul>'+
	'<ul class="mainNavList hidden-desktop">'+
		'<li><a href="/?eOfferCode=INHOGNTTNHOME" title="Home">Home</a></li>'+
		'<li><a href="/products-services/banking/bank-account/banking.htm" title="Banking">Banking</a></li>'+
		'<li><a href="/credit-card/credit-card.htm?eOfferCode=PNSPSCC" title="Credit Cards">Credit Cards</a></li>'+
		'<li><a href="/products-services/loans/loans.htm" title="Loans">Loans</a></li>'+
		'<li><a href="/products-services/investments/investments-home.htm" title="Investments">Investments</a></li>'+
		'<li><a href="/products-services/insurance/insurance.htm?eOfferCode=PNSPSINS" title="Insurance">Insurance</a></li>'+
		'<li><a href="/products-services/online-services/online-services-home.htm" title="Online Services">Online Services</a></li>'+
		'<li><a href="/card-offers/special-offers.htm?eOfferCode=INHOSOTTNSPOF" title="Special Offers">Special Offers</a></li>'+
		'<li><a href="/products-services/banking/citigold/citigold.htm?eOfferCode=INHOCGTTNCIGO" title="Citigold" target="_blank">Citigold</a></li>'+
		'<li><a href="/citi-nri.htm?eOfferCode=INHONRIBTTNNRIB" title="Customer Service" target="_blank" target="_blank">NRI Banking</a></li>'+
	'</ul>'+
		'<ul class="mainNavSignOn stoppropagationQL visible-desktop">'+
			'<li class="">'+
				'<a href="javascript:;" onclick="Loginpanel();" class="visible-dektop" title="Login">'+
					'<span class="lockSign"><img width="1" height="1" border="0" alt="" src="/images/spacer.gif"></span>'+
					'<span class="txtSign">Login</span>'+
				'</a>'+
			'</li>'+
		'</ul>'+
	'<div class="megaMenuCnt visible-desktop">'+
		'<div class="mmContainer megamenu stoppropagation rounded" id="bankingSubMenu">'+
			'<div class="mmContainerInner">'+
				'<ul class="mMenuList">'+
					'<li>'+
						'<h4 class="mMenuListHdr"><a href="/products-services/banking/bank-account/banking.htm?eOfferCode=INHOBATMMPEBA" title="Personal Banking">Personal Banking</a></h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/cpc.htm?eOfferCode=INHOBATMMCPCL" target="_blank" title="Citigold Private Client">Citigold Private Client</a>'+
							'</li>'+
							
							'<li>'+
								'<a href="/products-services/banking/citigold/citigold.htm?eOfferCode=INHOBATMMCIGO" title="Citigold" target="_blank">Citigold</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/banking/Citi-Priority.htm?eOfferCode=INHOBATMMCTPY" title="Citi Priority">Citi Priority</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/banking/citibanking-account.htm?eOfferCode=INHOBATMMCIAC" title="Citibanking Account">Citibanking Account</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/banking/bank-account/expat-account.htm?eOfferCode=INHOBATMMCEAC" title="Citibank Expatriate Account">Citibank Expatriate Account</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/banking/suvidha/suvidha-salary-account.htm?site=PORTAL&creative=NGX&section=INHOBATMMCSUV&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INHOBATMMCSUV" title="Citibank Suvidha">Citibank Suvidha</a>'+
							'</li>'+
						'</ul>'+
						'<h4 class="mMenuListHdr" style=" margin: 0px 0 0; "><a href="/products-services/commercial-bank/global-banking/global-banking.htm?eOfferCode=INHOBATMMGBAN" title="Global Banking">Global Banking</a></h4>'+
						'<ul>'+
							'<li style="padding-top:0,0,0,1px;">'+
								'<p style="padding-top:9px;" class="learnMoreBtn lrnHpBtn last  " style=""><a style="color: white;font-size: 12px;width: 78%;" href="https://www.online.citibank.co.in/products-services/banking/Citi-Priority-Account-form.htm?site=PORTAL&creative=NGX&section=INCCACITPRITY&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INCCACITPRITY" target="_blank" class="greyBtn blueBtnGrad" title="OPEN A BANK ACCOUNT">OPEN A BANK ACCOUNT</a></p>'+
							'</li>'+
						'</ul>'+
					'</li>'+
					'<li>'+
						'<h4 class="mMenuListHdr"><a href="/portal/newgen/corporate/global_commercial_banking/gcb_home.htm?eOfferCode=INHOBATMMSMEB" title="SME Banking">SME Banking</a></h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/portal/newgen/corporate/global_commercial_banking/CRB/crb_home.htm?eOfferCode=INHOBATMMCCBA" title="Citi Commercial Bank">Citi Commercial Bank</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/commercial-bank/citi-business.htm?eOfferCode=INHOBATMMCIBU" title="Citi Business">Citi Business</a>'+
							'</li>'+
						'</ul>'+
						'<h4 class="mMenuListHdr"><a href="/portal/newgen/corporate/product_services/corporate_home/corporate_home.htm?eOfferCode=INHOBATMMCOBA" title="Corporate Banking">Corporate Banking</a></h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/portal/newgen/corporate/product_services/cash_management.htm?eOfferCode=INHOBATMMCAMA" title="Cash Management">Cash Management</a>'+
							'</li>'+
							'<li>'+
								'<a href="/portal/newgen/corporate/product_services/trade_solutions.htm?eOfferCode=INHOBATMMTRSO" title="Trade Solutions">Trade Solutions</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/loans/loans.htm?eOfferCode=INHOBATMMLOAN" title="Loans">Loans</a>'+
							'</li>'+
							'<li>'+
								'<a href="/portal/newgen/corporate/product_services/markets.htm?eOfferCode=INHOBATMMMARK" title="Markets">Markets</a>'+
							'</li>'+
						'</ul>'+
					'</li>'+
					'<li class="last">'+
						'<h4 class="mMenuListHdr">Useful Links</h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/portal/standalone/Dec15/Banking/htm/fatca-crs.htm?eOfferCode=INHOBATMMFATCACRS" title="FATCA and CRS" target="_blank">FATCA and CRS</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/online-services-home.htm?eOfferCode=INHOBATMMONSE" title="Online Services">Online Services</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/statement-on-email.htm?eOfferCode=INHOBATMMESTA" title="Statement on Email">Statement on Email</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/investments/deposits/deposits.htm?tab=jump2&tc=timeDeposit&eOfferCode=INHOBATMMINRA" title="Interest Rate">Interest Rate</a>'+
							'</li>'+
							'<li>'+
								'<a href="/customerservice/download_forms.htm?eOfferCode=INHOBATMMUSEF" title="Useful Forms">Useful Forms</a>'+
							'</li>'+
							'<li>'+
								'<a href="/soc/schedule-of-fees-and-charges.htm?eOfferCode=INHOBATMMFECH" title="Fees &amp; Charges">Fees &amp; Charges</a>'+
							'</li>'+
							'<li>'+
								'<a href="/portal/newgen/seo/banking/images/RTGSCITI.pdf" target="_blank" title="Citibank IFSC Codes">Citibank IFSC Codes</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/oxygen-service-disclaimer.htm?eOfferCode=PREMOBRECNW" title="Prepaid Recharge" target="_blank">Prepaid Recharge</a>'+
							'</li>'+
						'</ul>'+
						'<h4 class="mMenuListHdr"><a href="/customerservice/home.htm?eOfferCode=INHOBATMMCOUS" title="Contact Us">Contact Us</a></h4>'+
					'</li>'+
				'</ul>'+
				'<div  class="mmOffer rounded">'+
					'<a href="/products-services/banking/Citi-Priority.htm?eOfferCode=INHOBATMMCTPY02"><img src="/images/offers/instant-pay.png" alt="Your priorities are our priorities. Introducing new age banking with Citi Priority. A world of exclusive privileges awaits you." title="Your priorities are our priorities. Introducing new age banking with Citi Priority. A world of exclusive privileges awaits you."></a>'+
				'</div>'+
			'</div>'+
			'<div class="mmBottomArea rounded">'+
				
			'</div>'+
		'</div>'+
		'<div class="mmContainer megamenu stoppropagation rounded stop_creditcards" id="CreditSubMenu">'+
			'<div class="mmContainerInner">'+
			'<div class="mmcontn-parent">'+
			'<div class="mmcontn">'+
			 '<div class="mmcontent_innerpage">'+
				'<div class="mmoffer-round">'+
				     '<h2>Choose cards based on your needs</h2>'+
					 '<span></span>'+
				'</div>'+
				'<div class="mmoffer_maintab">'+
				
				'<div class="mmoffer-parent">'+
				     '<div class="mmoffer_subpare">'+
						'<p class="mmoffer-p">Fuel</p>'+
						'<a href="/portal/newgen/cards/tab/indianoil-platinumcard.htm?eOfferCode=INHOINOPLMCAD" target="_blank"><img src="/images/card1.jpg" alt="IndianOil Card" title="IndianOil Card"/></a>'+
						'<p class="mmoffer-p_last">IndianOil Card</p>'+
					 '</div>'+
					 
					 '<div class="mmoffer_subpare">'+
						'<p class="mmoffer-p">Shopping</p>'+
						'<a href="/portal/newgen/cards/rewards/citi-rewards-card.htm?eOfferCode=INHOCITIRESCAD" target="_blank"><img src="/images/card2.jpg" alt="Rewards Card" title="Rewards Card"/></a>'+
						'<p class="mmoffer-p_last">Rewards Card</p>'+
					 '</div>'+
					 
					 '<div class="mmoffer_subpare">'+
						'<p class="mmoffer-p">Travel</p>'+
						'<a href="/portal/newgen/cards/tab/citi-premiermiles-card.htm?eOfferCode=INHOCITIPREMICAD" target="_blank"><img src="/images/card3.jpg" alt="PremierMiles Card" title="PremierMiles Card"/></a>'+
						'<p class="mmoffer-p_last">PremierMiles Card</p>'+
					 '</div>'+
					 '<div class="mmoffer_subpare">'+
						'<p class="mmoffer-p">Cash Back</p>'+
						'<a href="/portal/newgen/cards/tab/cash-back-credit-card.htm?eOfferCode=INHOCITICASHBAKCRD" target="_blank"><img src="/images/card4.jpg" alt="CashBack Card" title="CashBack Card"/></a>'+
						'<p class="mmoffer-p_last">CashBack Card</p>'+
					 '</div>'+
					 
				'</div>'+
				
				'<div class="mmoffer-parent1">'+
						'<ul>'+
							'<li class="mmoffer-li">'+
								'<p><a href="https://www.online.citibank.co.in/portal/newgen/cards/tab/apply-now.htm?site=PORTAL&creative=NGX&section=INHOAPPFCRECRD&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INHOAPPFCRECRD" target="_blank" title="Apply for a Credit Card">Apply for a Credit Card</a></p>'+
							'</li>'+
							'<li class="mmoffer-li1">'+
								'<p><a href="/credit-card/credit-card.htm?eOfferCode=INHOVEWALCRD" title="View All Cards" target="_blank">View All Cards</a></p>'+	
							'</li>'+
							'<li class="mmoffer-li2">'+
								'<p><a href="https://asia.citi.com/india/InstantApplication/CheckUserStatus.aspx?eOfferCode=INHOCHKUSRSTATS" title="Track Application Status" target="_blank">Track Application Status</a></p>'+
							'</li>'+
						'</ul>'+
				'</div>'+
				
				'</div>'+
				
				'<div class="mmoffer-round mnmoffer_round mmoffer-round_credit">'+
				     '<h2>Refer and earn rewards</h2>'+
					 '<span></span>'+
				'</div>'+
				
				'<div class="mmoffer-parent">'+
				     '<div class="mmoffer_subpare">'+
						'<img src="/images/img.gif" alt=""/>'+
					 '</div>'+
					 
					 '<div class="mmoffer_subpare_para">'+
						'<p><span>Refer your friends and family</span></p>'+
						'<p>for a Citibank Credit Card and earn <br/>up to <span class="WebRupee" style="font-size: 12px; color: #666;">Rs</span> 9,999 Flipkart e-Gift Vouchers</p>'+
					 '</div>'+
				'</div>'+
				
				
				'<div class="mmoffer-parent1">'+
						'<ul>'+
							'<li class="mmoffer-li">'+
								'<p><a href="#inline2" class="welcom" title="Refer a friend NOW!">Refer a friend NOW!</a></p>'+
							'</li>'+
							'<li class="mmoffer-li1">'+
								'<p><a href="https://asia.citi.com/india/EMGM_Referral/MGMDashBoard/Login.aspx" title="Track Referral Status" target="_blank">Track Referral Status</a></p>'+	
							'</li>'+
						
						'</ul>'+
				'</div>'+
				'</div>'+
				'</div>'+
				 '<div class="mmoffer_newupdate mmBottomArea rounded">'+
				  '<div class="mmoffer_ullifooter">'+
						'<ul>'+
							'<li>'+
								'<p><a href="/soc/schedule-of-fees-and-charges.htm?eOfferCode=INHOSOFACHRS" title="Fees & Charges" target="_blank">Fees & Charges</a></p>'+	
							'</li>'+
							'<li>'+
							  '|'+
							'</li>'+
							'<li>'+
								'<p><a href="/portal/newgen/cards/cardmember.pdf" title="Cardmember Terms and Conditions" target="_blank">Cardmember Terms and Conditions</a></p>'+	
							'</li>'+
							'<li>'+
							  '|'+
							'</li>'+
							'<li>'+
								'<p><a href="/portal/newgen/cards/tab/citi-corporate-card.htm?eOfferCode=INHOCITICORCRD" title="Corporate Card" target="_blank">Corporate Card</a></p>'+
							'</li>'+
							'<li>'+
								'<p><a href="/portal/newgen/cards/tab/creditcards_tc.htm?eOfferCode=INHOCRETCRDTC#termsmitc" title="Terms and Conditions" target="_blank">Terms and Conditions</a></p>'+	
							'</li>'+
							'<li>'+
							  '|'+
							'</li>'+
							'<li>'+
								'<p><a href="/portal/newgen/cards/citibank-additional-creditcard/citibank-add-on-credit-card.htm?eOfferCode=INHOCITIADNCRECRD" title="Add-on Credit Card" target="_blank">Add-on Credit Card</a></p>'+	
							'</li>'+
							'<li>'+
							  '|'+
							'</li>'+
							'<li>'+
								'<p><a href="/products-services/online-services/statement-on-email.htm?eOfferCode=INHOSTTOEMAL" title="Statement on E-mail" target="_blank">Statement on E-mail</a></p>'+	
							'</li>'+
						'</ul>'+
				'</div>'+
				'<div class="mmoffer-ullifoore_right">'+
						'<div class="mmoffer-list1">'+
							'<img src="/images/card-icon.png">'+
						'</div>'+
						'<div class="mmoffer-list2">'+
							'<p>Important Update on Interest Rates on Citibank Credit Cards.<a href="/portal/newgen/mailer/Jun15/Credit_Card-Pricing-Changes-Mailer-portal.htm?eOfferCode=INHO01092015CCPCM" title="Learn More" target="_blank"> Learn More.</a></p>'+
						'</div>'+
				'</div>'+
				
				'</div>'+
				'</div>'+
				
				'<div class="mmoffer_rightpage">'+
				'<div  class="mmOffer rounded mmOffer_credit_col">'+
					'<a href="https://www.citibank.co.in/cardstponline/CardPersonalDetails.do?cardType=308&eOfferCode=INHOCRDPRSNLDETS" target="_blank"><img src="/images/offers/Instant-timer-banner-V5.gif" alt="Instant Approval" title="Instant Approval"></a>'+
				'</div>'+
				
				'<div class="mmoffer_round_new mmBottomArea rounded">'+
					'<ul>'+
							'<li class="mmoffer-round1">'+
								'<p><a href="/products-services/online-services/epay.htm?eOfferCode=INHOONLEPAY" title="Pay Credit Card Bills" target="_blank">Pay Credit Card Bills ></a></p>'+
							'</li>'+
							'<li class="mmoffer-round1">'+
								'<p><a href="/card-offers/special-offers.htm?eOfferCode=INHOSPECALOFFS" title="Offers on your Credit Cards" target="_blank">Offers on your Credit Cards ></a></p>'+	
							'</li>'+
							'<li class="mmoffer-round1">'+
								'<p><a href="/portal/newgen/cards/tab/rewards-home.htm?eOfferCode=INHOREWDSHOM" title="Redeem Reward Points" target="_blank">Redeem Reward Points ></a></p>'+	
							'</li>'+
							'<li class="mmoffer-round1">'+
								'<p><a href="https://www.online.citibank.co.in/portal/newgen/cards/emi/loanurcard-callback.htm?site=PORTAL&creative=NGX&section=INHOLOANCRDCALBAK&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INHOLOANCRDCALBAK" title="Instant Loan on your Credit Card" target="_blank">Instant Loan on your Credit Card ></a></p>'+	
							'</li>'+
						
						'</ul>'+
				'</div>'+
			   '</div>'+
			'</div>'+
			
			
		'</div>'+


		'<div class="mmContainer megamenu stoppropagation rounded" id="lendingSubMenu">'+
			'<div class="mmContainerInner">'+
				'<ul class="mMenuList">'+
					'<li>'+
						'<h4 class="mMenuListHdr"><a href="/products-services/loans/loans.htm?eOfferCode=INHOLOTMMLOOV" title="Loans">Loans</a></h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/products-services/loans/ready-cash-personal-loan.htm?eOfferCode=INHOLOTMMPELO" title="Personal Loan">Personal Loan</a>'+
							'</li>'+
							'<li>'+
								'<a href="https://www.online.citibank.co.in/portal/newgen/cards/emi/loanurcard-callback.htm?eOfferCode=INHOLOTMMPALO" title="Loan on your Credit Card" target="_blank">Loan on your Credit Card</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/banking/suvidha/ready-credit.htm?eOfferCode=INHOLOTMMRECR" title="Ready Credit">Ready Credit</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/loans/stock-power.htm?eOfferCode=INHOLOTMMLOAS" title="Loan Against Securities">Loan Against Securities</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/loans/loan-on-commercial-vehicle-construction-equipment.htm?eOfferCode=INHOLOTMMLCVCE" title="Loans for Commercial Vehicle and Construction Equipment">Loans for Commercial Vehicle and Construction Equipment</a>'+
							'</li>'+
							
						'</ul>'+
						
						'<ul>'+
							
							'<li style="padding-top:35px;">'+
								'<p class="learnMoreBtn lrnHpBtn last  " style=""><a style="color: white;font-size: 12px;width: 97%;" href="https://www.online.citibank.co.in/products-services/loans/ready-cash-personal-loan-form.htm?site=PORTAL&creative=NGX&section=INHOLOTMMRDCH&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INHOLOTMMRDCH" target="_blank" class="greyBtn blueBtnGrad" title="APPLY FOR A PERSONAL LOAN">APPLY FOR A PERSONAL LOAN</a></p>'+
							'</li>'+
						'</ul>'+
						
					'</li>'+
					'<li>'+
						'<h4 class="mMenuListHdr"><a href="/products-services/loans/mortgages.htm?eOfferCode=INHOLOTMMMORTG" title="Mortgages">Mortgages</a></h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/products-services/loans/home-loan.htm?eOfferCode=INHOLOTMMCIHL" title="Home Loan">Home Loan</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/loans/takeover-plus-enhancement.htm?eOfferCode=INHOLOTMMCILT" title="Home Loan Takeover">Home Loan Takeover</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/loans/loan-against-property.htm?eOfferCode=INHOLOTMMCLAP" title="Loan Against Property">Loan Against Property</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/loans/topup-existing-loans.htm?eOfferCode=INMMLOTEL" title="Top Up on existing loan">Top Up on existing loan</a>'+
							'</li>'+
						'</ul>'+
						'<h4 class="mMenuListHdr">Tools &amp; Calculators</h4>'+
						'<ul>'+
							'<li>'+
								'<a href="javascript:;"  onclick="MM_openBrWindow(\'/products-services/loans/pop-up/home-loans-emi-calculator.htm?eOfferCode=INHOLOTMMHLEM\',\'\',\'width=760,height=510,top=70,left=125,scrollbars=yes\')" title="Home Loan EMI">Home Loan EMI</a>'+
							'</li>'+
							'<li>'+
								'<a href="https://www.online.citibank.co.in/products-services/EMI-calc/EMI-Calculator.html?site=PORTAL&creative=NGX&section=INHOLOTMMPLEM&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INHOLOTMMPLEM"  title="Personal Loan EMI" target="_blank">Personal Loan EMI</a>'+
							'</li>'+

							
							'<li style="padding-top:9px;">'+
								'<p class="learnMoreBtn lrnHpBtn last  " style=""><a style="color: white;font-size: 12px;width: 80%;" href="https://www.online.citibank.co.in/products-services/loans/home-loan-callback.htm?site=PORTAL&creative=NGX&section=INHOLOTMMHLCB&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INHOLOTMMHLCB" target="_blank" class="greyBtn blueBtnGrad" title="APPLY FOR A HOME LOAN">APPLY FOR A HOME LOAN</a></p>'+
							'</li>'+
						'</ul>'+
					'</li>'+
					'<li class="last">'+
						'<h4 class="mMenuListHdr">Useful Links</h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/products-services/loans/pop-up/home-loan-eligibility-calculator.htm?eOfferCode=INHOLOTMMHLEL" title="Home Loan Eligibility" target="_blank">Home Loan Eligibility</a>'+
							'</li>'+
							
							'<li>'+
								'<a href="/products-services/loans/pop-up/mortgages-calc.htm?eOfferCode=INHOLOTMMMORTGCAL" title="Home Credit Shrinker" target="_blank">Home Credit Shrinker</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/online-services-home.htm?eOfferCode=INHOLOTMMONSE" title="Online Services">Online Services</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/loans/pdfs/Pricing-Grid.pdf" title="Interest Rate" target="_blank">Interest Rate</a>'+
							'</li>'+
							'<li>'+
								'<a href="/customerservice/download_forms.htm?eOfferCode=INHOLOTMMUSFO" title="Useful Forms">Useful Forms</a>'+
							'</li>'+
							'<li>'+
								'<a href="/soc/schedule-of-fees-and-charges.htm?eOfferCode=INHOLOTMMFECH" title="Fees &amp; Charges">Fees &amp; Charges</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/homeloan-online-emi-payment.htm" title="Home Loan EMI Payment">Home Loan EMI Payment</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/loan-online-emi-payment.htm?eOfferCode=LFTNVOS" title="Personal Loan EMI Payment">Personal Loan EMI Payment</a>'+
							'</li>'+
						'</ul>'+
						'<h4 class="mMenuListHdr"><a href="/customerservice/home.htm?eOfferCode=INHOLOTMMCOUS" title="Contact Us">Contact Us</a></h4>'+
					'</li>'+
				'</ul>'+
				'<div  class="mmOffer rounded">'+
					'<img src="/images/offers/instant-pay1.png" alt="Need funds? Instant loan on your credit card at attaractive interest rates. Valid till 18th Jan 2016. " usemap="#instantpaymap"><map name="instantpaymap"><area shape="rect" coords="2,93,61,106" alt="T&Cs apply" href="https://www.online.citibank.co.in/portal/newgen/mailer/nov07/TandC.htm?eOfferCode=INHOLOTMMINSPAY" target="_blank"><area shape="rect" coords="1,112,57,123" alt="Login Now" href="https://www.citibank.co.in/ibank/login/IQPin1.jsp?dOfferCode=LOANONCRED" target="_blank"></map>'+
				'</div>'+
			'</div>'+
			'<div class="mmBottomArea rounded ">'+
				'<span>Receive an Instant call back for a Personal Loan. Simply SMS PL to 52484 or use our </span>'+
				'<a title="Click 4 Call facility" class="mmBottomAreaLink" href="https://www.online.citibank.co.in/products-services/loans/ready-cash-personal-loan-form.htm?site=PORTAL&creative=NGX&section=INHOLOTMMRECE&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INHOLOTMMRECE" target="_blank">Click 4 Call facility</a>.'+
			'</div>'+
		'</div>'+

		'<div class="mmContainer megamenu stoppropagation rounded" id="investingSubMenu">'+
			'<div class="mmContainerInner">'+
				'<ul class="mMenuList">'+
					'<li>'+
						'<h4 class="mMenuListHdr"><a href="/products-services/investments/investments-home.htm?eOfferCode=INHOINVMENTS" title="Investments">Investments</a></h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/products-services/investments/mutual-funds/mutual-funds.htm?eOfferCode=INHOINVMUFD" title="Mutual Funds">Mutual Funds</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/investments/deposits/deposits.htm?eOfferCode=INHOINVDEPS" title="Deposits">Deposits</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/investments/demat/demat-account.htm?eOfferCode=INHOINVDETAC" title="Demat Account">Demat Account</a>'+
							'</li>'+
							'<li style=" margin: 15px 0 0;">'+
								'<a href="/card-offers/cwa-indiahome-disclaimer.htm?eOfferCode=INHOINVETBAC" target="_blank" title="Equity brokerage account">Equity brokerage account</a>'+
							'</li>'+
							
						'</ul>'+
					'</li>'+
					'<li>'+
						'<h4 class="mMenuListHdr"><a href="/products-services/banking/citigold/citigold-research-and-advice.htm?eOfferCode=INHOINVREHRPT" title="Research reports">Research reports</a></h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/products-services/investments/pdfs/CitiChoice-IR1.pdf" target="_blank" title="Citi Choice">Citi Choice</a>'+
							'</li>'+
							'<li>'+
								'<a href="/portal/pdfs/CG-eye-on-the-market.pdf" target="_blank" title="Eye on the Market">Eye on the Market</a>'+
							'</li>'+
							
							'<li style=" margin: 28px 0 0;">'+
								'<p>To know more about our investment products</p>'+
							'</li>'+
							'<li>'+
							'<p style="" class="learnMoreBtn lrnHpBtn last"><strong>SMS INVEST to 52484</strong></p></li>'+
						'</ul>'+
					'</li>'+
					'<li class="last">'+
						'<h4 class="mMenuListHdr">Useful Links</h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/products-services/banking/citigold/citigold.htm?eOfferCode=INHOINVAYCGA" title="Apply for a Citigold account">Apply for a Citigold account</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/insurance/insurance.htm?eOfferCode=INHOINVBYINS" target="_blank" title="Buy Insurance">Buy Insurance</a>'+
							'</li>'+
							'<li>'+
								'<a href="https://www.online.citibank.co.in/portal/newgen/cards/tab/apply-now.htm?site=PORTAL&creative=NGX&section=INHOINVAPYNW&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INHOINVAPYNW" target="_blank" title="Apply for a credit card">Apply for a credit card</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/online-services-home.htm?eOfferCode=INHOINVONLSVS" title="Online services">Online services</a>'+
							'</li>'+
								'<li>'+
								'<a href="/soc/schedule-of-fees-and-charges.htm?eOfferCode=INHOINVFEECHS" title="Fees & Charges">Fees & Charges</a>'+
							'</li>'+

						'</ul>'+
						'<h4 class="mMenuListHdr"><a title="Contact Us" href="/customerservice/home.htm?eOfferCode=INHOINVCONTUS">Contact Us</a></h4>'+
					'</li>'+
				'</ul>'+
				'<div  class="mmOffer rounded">'+
					'<a href="/products-services/banking/citigold/citigold-wealth-management.htm?eOfferCode=INHOINVCGWLMG" title=""><img src="/images/wealthimg.png" alt="Wealth Management Solutions Carefully planned financial strategy, personalised insights and access to world class products and research. Start your Gold Conversation" title="Wealth Management Solutions Carefully planned financial strategy, personalised insights and access to world class products and research. Start your Gold Conversation"></a>'+
				'</div>'+
			'</div>'+
			'<div class="mmBottomArea rounded">'+
				'<span></span>'+
			'</div>'+
		'</div>'+
		'<div class="mmContainer megamenu stoppropagation rounded" id="insuranceSubMenu">'+
			'<div class="mmContainerInner">'+
				'<ul class="mMenuList">'+
					'<li>'+
						'<h4 class="mMenuListHdr"><a href="/products-services/insurance/life-insurance/life-insurance-home.htm?eOfferCode=INHOINSLIIN" title="Life Insurance">Life Insurance</a></h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/products-services/insurance/life-insurance/iRaksha-Supreme.htm?eOfferCode=INHOINSPROT" title="Protection">Protection</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/insurance/life-insurance/fortune-pro.htm?eOfferCode=INHOINSCHPL" title="Child Plan">Child Plan</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/insurance/life-insurance/fortune-maxima.htm?eOfferCode=INHOINSWELTH" title="Wealth">Wealth</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/insurance/life-insurance/MahaLife-Magic.htm?eOfferCode=INHOINSSAVG" title="Savings">Savings</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/insurance/life-insurance/fortune-pro.htm?eOfferCode=INHOINSRETMT" title="Retirement">Retirement</a>'+
							'</li>'+
							'<li style="padding-top:15px;">'+
							'<p style="" class="learnMoreBtn lrnHpBtn last"><a title="APPLY FOR INSURANCE" class="greyBtn blueBtnGrad" target="_blank" href="https://www.online.citibank.co.in/products-services/insurance/insurance-form.htm?site=PORTAL&creative=NGX&section=INHOINSALYHTIN&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INHOINSALYHTIN" style="font-size: 12px; color:white; width: 90%;">APPLY FOR INSURANCE</a></p></li>'+
							
						'</ul>'+
					'</li>'+
					'<li>'+
						'<h4 class="mMenuListHdr"><a href="/products-services/insurance/health-accident/health-accident-home.htm?eOfferCode=INHOINSHTHIN" title="Health insurance">Health insurance</a></h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/products-services/insurance/health-accident/health-forever.htm?eOfferCode=INHOINSHTHINS" title="Health Insurance">Health Insurance</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/insurance/health-accident/smart-cash.htm?eOfferCode=INHOINSHOPCH" title="Hospital Cash">Hospital Cash</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/insurance/health-accident/personal-accident-plans.htm?eOfferCode=INHOINSPRLAD" title="Personal Accident">Personal Accident</a>'+
							'</li>'+
							'<li style=" margin: 10px 0 0;">'+
								'<h4 class="mMenuListHdr"><a href="/products-services/insurance/health-accident/super-health-xs.htm?eOfferCode=INHOINSALHTIN" title="Already have health insurance ?">Already have health insurance ?</a></h4>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/insurance/health-accident/super-health-xs.htm?eOfferCode=INHOINSAPLTU" title="Apply for a Top-up">Apply for a Top-up</a>'+
							'</li>'+
							
							
						'</ul>'+
					'</li>'+
					'<li class="last">'+
						'<h4 class="mMenuListHdr">'+
								'<a href="/products-services/insurance/non-life-insurance/non-life-insurance-home.htm?eOfferCode=INHOINSNLIS" title="Non-Life Insurance">Non-Life Insurance</a></h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/portal/newgen/cards/travel-shield-secure/travel-shield-secure.htm?eOfferCode=INHOINSTRAL" title="Travel">Travel</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/insurance/non-life-insurance/home-power-protect.htm?eOfferCode=INHOINSRELPT"  target="_blank" title="Residential Property">Residential Property</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/insurance/non-life-insurance/fire-and-burglary-insurance.htm?eOfferCode=INHOINSCOMAL" title="Commercial">Commercial</a>'+
							'</li>'+
							
							
						'</ul>'+
						'<h4 class="mMenuListHdr">Useful Links</h4>'+
						'<ul>'+
							'<li style=" margin: 10px 0 0;">'+
								'<a href="https://www.online.citibank.co.in/products-services/insurance/insurance-form.htm?site=PORTAL&creative=NGX&section=INHOINBYINS&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INHOINBYINS" target="_blank" title="Buy Insurance">Buy Insurance</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/banking/citibanking-account.htm?eOfferCode=INHOINSALCBA" title="Apply for a Citibank account">Apply for a Citibank account</a>'+
							'</li>'+
							'<li>'+
								'<a href="https://www.online.citibank.co.in/portal/newgen/cards/tab/apply-now.htm?site=PORTAL&creative=NGX&section=INHOINVAPYNW01&agencyCode=XER&campaignCode=&productCode=&eOfferCode=INHOINVAPYNW01" target="_blank" title="Apply for a Credit Card">Apply for a Credit Card</a>'+
							'</li>'+
							
						'</ul>'+
					'</li>'+
				'</ul>'+
				'<div  class="mmOffer rounded">'+
					'<a href="https://www.online.citibank.co.in/INGCB/portal/citiin/forms/citihealthforever.do" title="" target="_blank"><img src="/images/offers/investing.png" alt="Enjoy your health, forever. Get up to Rs 5 Lakh sum insured & Cashless hospitalisation in over 3,000 hospitals." title="Enjoy your health, forever. Get up to Rs 5 Lakh sum insured & Cashless hospitalisation in over 3,000 hospitals."></a>'+
				'</div>'+
			'</div>'+
			'<div class="mmBottomArea rounded">'+
				'<span>Why is Life Insurance important ?</span>'+
				'<a title="Click here to know more" class="mmBottomAreaLink" href="/products-services/insurance/life-insurance/know-about-insurance.htm?eOfferCode=INHOINSLIEDU">Click here to know more</a>.'+
			'</div>'+
		'</div>'+
		'<div class="mmContainer megamenu stoppropagation rounded" id="onlineservicesSubMenu">'+
			'<div class="mmContainerInner">'+
				'<ul class="mMenuList">'+
					'<li>'+
						'<h4 class="mMenuListHdr"><a href="/products-services/online-services/online-services-home.htm?eOfferCode=INHOOSTOSOV" title="Online Services">Online Services</a></h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/products-services/online-services/internet-banking.htm?eOfferCode=INHOOSTINBA" title="Internet Banking">Internet Banking</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/citi-mobile.htm?eOfferCode=INHOOSTCIMO" title="Citi Mobile">Citi Mobile</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/tablet-banking.htm?eOfferCode=INHOOSTTABA" title="Tablet Banking">Tablet Banking</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/citialert.htm?eOfferCode=INHOOSTCIAL" title="CitiAlert">CitiAlert</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/statement-on-email.htm?eOfferCode=INHOOSTSTEM" title="Statement on E-mail">Statement on E-mail</a>'+
							'</li>'+
							'<h4 class="mMenuListHdr"><a href="/products-services/online-services/online-security.htm?eOfferCode=INHOOSTONSE" title="Online Security">Online Security</a></h4>'+
							'<li style="padding-top:15px;">'+

								'<p class="learnMoreBtn lrnHpBtn last  " style=""><a style="color: white;font-size: 12px;width: 55%;" href="/portal/newgen/bill_disclaimer.htm?eOfferCode=CBOLMNU" class="greyBtn blueBtnGrad" target="_blank" title="PAY UTILITY BILLS">PAY UTILITY BILLS</a></p>'+
							'</li>'+
						'</ul>'+
						
						
					'</li>'+
					'<li>'+
						'<h4 class="mMenuListHdr"><a href="/products-services/online-services/imps.htm" title="Online Payments">Online Payments</a></h4>'+
						'<ul>'+
							'<li>'+
								'<a href="/products-services/online-services/imps.htm?eOfferCode=INHOOSTFUTA" title="Online Funds Transfer">Online Funds Transfer</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/bill-pay.htm?eOfferCode=INHOOSTBILLP" title="Citibank Bill Pay">Citibank Bill Pay</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/epay.htm#citiAccount" title="Online Credit Card payment through Citibank Account">Online Credit Card payment through Citibank Account</a>'+
								'<a href="/products-services/online-services/epay.htm#nonCitiAccount" title="Online Credit Card payment through Non-Citibank Account (E-Pay)">Online Credit Card payment through <br>Non-Citibank Account (E-Pay)</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/online-tax-remittance.htm?eOfferCode=INHOOSTOTRE" title="Online Tax Remittance">Online Tax Remittance</a>'+
							'</li>'+
						'</ul>'+
					'</li>'+
					'<li class="last">'+
						'<h4 class="mMenuListHdr">Useful Links</h4>'+
						'<ul>'+
							'<li>'+
								'<a href="javascript:;" onclick="Loginpanel();" class="visible-dektop"  title="Login & Pay Utility Bills">Login & Pay Utility Bills</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/epay.htm?eOfferCode=INHOOSTOCCPAY#neft" title="Pay CitiBank Credit card Bill online via E-pay/NEFT">Pay CitiBank Credit card Bill online via <br />E-pay/NEFT</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/prepaid-mobile-recharge.htm?eOfferCode=INHOOSTREMO" title="Recharge your mobile">Recharge your mobile</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/loan-online-emi-payment.htm?eOfferCode=INHOOSTPPEM" title="Pay Personal Loan EMI online">Pay Personal Loan EMI online</a>'+
							'</li>'+
							'<li>'+
								'<a href="/products-services/online-services/homeloan-online-emi-payment.htm?eOfferCode=HINDHMKY" title="Pay Home Loan EMI Online">Pay Home Loan EMI Online</a>'+
							'</li>'+
							
							'<li>'+
								'<a href="/products-services/online-services/internet-banking.htm" title="Instant IPIN">Instant IPIN</a>'+
							'</li>'+
						'</ul>'+
						'<h4 class="mMenuListHdr"><a href="/customerservice/home.htm?eOfferCode=INHOOSTCOUS" title="Contact Us">Contact Us</a></h4>'+
					'</li>'+
				'</ul>'+
				'<div  class="mmOffer rounded">'+
					'<a href="/products-services/online-services/statement-on-email.htm?eOfferCode=INCCUSTOEL"><img src="/images/offers/statement-on-email.png" alt="Go Green. Do your bit for the environment by opting for Citibank\'s Statement on Email, rather than physical copies of your statement." title="Go Green. Do your bit for the environment by opting for Citibank\'s Statement on Email, rather than physical copies of your statement."></a>'+
				'</div>'+
			'</div>'+
			'<div class="mmBottomArea rounded">'+
				'<span>Citi Mobile- Now available on the App Store<sup>&reg;</sup> and Android<sup>&trade;</sup> Market. </span>'+
				'<a title="Click here" class="mmBottomAreaLink" href="/products-services/online-services/citi-mobile.htm?eOfferCode=INHOOSTCLHE">Click here</a> to know more.'+
			'</div>'+
		'</div>'+
		'<div class="mmSubArrow"><img alt="" src="/images/spacer.gif"></div>'+
	'</div>'+
'</div>'+
'<div class="lftNavMo">'+
	'<div class="pageTitle visible-phone">&nbsp;</div>'+
'</div>');




document.write('<div style="display:none;"><div id="appsignonpop" class="signonpopcls"><ul><li><p id="iphoneandpop" style="text-align:center"><a class="ipadandroidlink ipadioslink visible-phone" href="/card-offers/citi-moble-iphone-disclaimer.htm" title="Download the Citi Mobile Smart Banking App">Download the Citi Mobile Smart Banking App</a><a class="ipadandroidlink ipadioslink visible-tablet" href="/card-offers/citi-moble-iphone-disclaimer.htm" title="Download the Citi Tablet Smart Banking App">Download the Citi Tablet Smart Banking App</a><a href="/card-offers/citi-moble-iphone-disclaimer.htm" title="iOS App store" class="ipadioslink"><img id="iphonelogo" src="/images/mobile/appStore.png" title="iOS App store" alt="iOS App store" style="text-align:center" /></a><a href="/card-offers/citi-mobile-android-disclaimer.htm" id="playlogo" title="Google Play store" class="ipadandroidlink"><img id="androidlogo" src="/images/mobile/android.png" title="Google Play store" alt="Google Play store" style="text-align:center"/></a></p></li><li><hr /></li><li><p id="windowspop" style="text-align:center"><a href="https://mobile.citibank.co.in/mlogin/" title="Continue on Mobile Website" class="contcls">Continue on Mobile Website</a></p></li></ul></div></div>'); 

$(document).ready(function(){
	$('.logOutIcon.visible-tablet').addClass("appredirect");
	$('.logOutIcon.visible-tablet').attr("href", "javascript:;");
    if(navigator.userAgent.match(/IEMobile|Windows Phone/i)){
        $('.windwosapp').removeClass('appredirect');
        $(".windwosapp").attr("href", "https://mobile.citibank.co.in/mlogin/");
        $('#iphoneandpop').hide();
    }
    else if(navigator.userAgent.match(/iPhone|iPod/i))
    {
        $('#iphonelogo').show();
        $('#androidlogo').hide();
        $('.appdownlink').attr("href", "/card-offers/citi-moble-iphone-disclaimer.htm");
    }else if(navigator.userAgent.match(/iPad/i))
	{
		$('.logOutIcon.visible-tablet').removeClass("appredirect");
		$('.logOutIcon.visible-tablet').attr("href", "https://www.citibank.co.in/ibank/login/IQPin1.jsp");

	}else if(navigator.userAgent.match(/Android/i))
    {    
                
        if(navigator.userAgent.match(/(tablet|ipad|playbook|silk)|(android(?!.*mobile))|GT-P3100|SM-T211|SM-T231|GT-N7000|GT-N8000|A102|SM-T805|SM-T111|SM-T110|ASUS-2B16|ASUS-2B32|ASUS-1B32|GT-P8110|P8110|me370t|JWR66N|Asus-K008|Asus-K009|SM-T311/i))
        {
            //$("#playlogo").attr("href", "/card-offers/Android-disclaimer.htm");
            $('#iphonelogo').hide();
            $('#androidlogo').show();
            $('.appdownlink').attr("href", "/card-offers/Android-disclaimer.htm");
            $('.ipadandroidlink').attr("href", "/card-offers/Android-disclaimer.htm");
            
        }else{
            $('#androidlogo').show();
            $('#iphonelogo').hide();
            $('.appdownlink').attr("href", "/card-offers/citi-mobile-android-disclaimer.htm");
            $('.ipadandroidlink').attr("href", "/card-offers/citi-mobile-android-disclaimer.htm");
            
        }
    }
    
     $(".logOutIconapplogo").click(function(){
        if(navigator.userAgent.match(/Android/i))
        {
            //$(this).css('background-image', 'url("images/tablet/play-store.png")');
            $(this).attr("href", "/card-offers/Android-disclaimer.htm");
        } else if(navigator.userAgent.match(/iPad/i))
        {
            //$(this).css('background-image', 'url("images/tablet/app-store.png")');
            $(this).attr("href", "/card-offers/iphone-disclaimer.htm");
        }
    });
    
    
   	$('a.fancy-openbox').fancybox();
    
        
$(".appredirect").click(function(){
	$.fancybox.open([
		{
		href : '#appsignonpop',
		closeBtn:false
		}    
	], {
		padding : 0   
		}
		);
	});
});

function MM_openBrWindow(theURL,winName,features) { 
  window.open(theURL,winName,features);
}