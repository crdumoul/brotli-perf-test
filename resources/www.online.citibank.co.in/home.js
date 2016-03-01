
/*Home Page Banner Rotation*/
if( tablet.detect() || mobile.detect() ) {
(function(window, document, $, R) { // put the vars you need and match them at the bottom
	Response.create({ mode: 'src',  prefix: 'src',  breakpoints: [0,320,480,481,641,800,1025,1281]});
	Response.band(0, 320);
	Response.band(321, 480);
	Response.band(800,1025);
}(this, this.document, this.jQuery, this.Response));
}
/*Home Page Banner Rotation*/

	$(document).ready(function(){
		
		$(".pageTitle").remove()
		$(".leftNavIcon").remove()
		$(".logo").css("display","block")

		var deviceIphone = "iphone";
		var deviceIpod = "ipod";
		var deviceIpad = "ipad";
		var devicePalm = "palm";
		var deviceS60 = "series60";
		var deviceSymbian = "symbian";
		var engineWebKit = "webkit";
		var deviceAndroid = "android";
		var deviceWinMob = "windows ce";
		var deviceWinPhone = "windows phone";
		var deviceBB = "blackberry";
		//Initialize our user agent string to lower case.
		var uagent = navigator.userAgent.toLowerCase();
		if (uagent.search(deviceIphone) > -1 || uagent.search(deviceIpad) > -1 || uagent.search(deviceIpod) > -1){
            if(uagent.search(deviceWinPhone) > -1){
			$('.appStoreWrap').remove();
        }else
        {

			$('.appStoreWrap').html('<p id="bbbbb">Download the Citi Mobile Smart Banking App</p><a href="/card-offers/citi-moble-iphone-disclaimer.htm?eOfferCode=INCCUIPNED" title="Download on the App Store"><img src="/images/mobile/appStore.png" alt="Download on the App Store" title="Download on the App Store" width="192px"/></a>');
            }
            }
		else if(uagent.search(deviceAndroid) > -1){
		
			
			$('.appStoreWrap').html('<p id="bbbbb">Download the Citi Mobile Smart Banking App</p><a href="/card-offers/citi-mobile-android-disclaimer.htm?eOfferCode=INCCUANDRD" title="Download on the App Store"><img src="/images/mobile/android.png" alt="Download on the App Store"  title="Download on the App Store" /></a>');
		}
		else{
			$('.appStoreWrap').remove();
		}

		$('.flexslider').flexslider({
			controlsContainer: ".slider",
				animation: "fade",
				controlNav: true,
					manualControls: ".offerContentList li"
				/*start: function(slider){
					$('body').removeClass('loading');
				}*/
			});
		
		$("body").on("click.fndtn",".generalInfo",function(e){
			e.stopPropagation();
			$ch = $(this).parents(".cS-signOnLinkHldr");
			if($ch.find(".cS-generalInfoHolder").css("display") == "none"){
				$(this).addClass("active");
				$('div.headTxtPos').css({
					"background-image":"url(/images/tile-diagonal-lines-dark.gif)",
					"width":"753px",
					"display":"block"
				});
				$(".cS-generalInfoHolder").slideDown();
			}else{
				$(".cS-generalInfoHolder").slideUp(function(){
					$('div.headTxtPos').removeAttr("style");
					$(".generalInfo").removeClass("active");
				});
			}
		});
		
		/*$(".generalInfo").on("click.fndtn",function(e){
			e.stopPropagation();
			$ch = $(this).parents(".cS-signOnLinkHldr");*/
			/*if($ch.find(".cS-generalInfoHolder").css("display") == "block")
			{
				$ch.find(".generalInfoMenu").fadeOut(200, function(){
						$(this).parent().animate({
										height: '0px'
									  }, 600, function() {
											$(this).slideUp('fast', function(){
												$(this).siblings('div').animate({
												width: '175px'
											}, 400, function() {
												$(this).css({"overflow":"hidden","background-image":""}).find('a').removeClass("active");
											});
									  });
						});
				});
			}*/
			/*if (!$(".generalInfoMenu, .headTxtPos").is(":animated"))
			{
				if($ch.find(".cS-generalInfoHolder").css("display") == "none")
				{
					$('div.headTxtPos').css({"background-image":"url(/images/tile-diagonal-lines-dark.gif)"});
					$(this).parent('div').animate({
												width: '753px'
											}, 400, function() {
												$(this).siblings(".cS-generalInfoHolder").slideDown('fast', function(){
													$(this).animate({
															height: '150px'
														  }, 500, function() {
																$(this).find(".generalInfoMenu").fadeIn(200);
														  });
												});
												
											});
					$(this).addClass("active");
				}
				else
				{
					//$(this).parent('div').css({ "position":"relative"});
					$(".generalInfoMenu").fadeOut(200, function(){
						$(".cS-generalInfoHolder").animate({
										height: '0px'
									  }, 500, function() {
											$(this).slideUp('fast', function(){
												$(".generalInfo").parent('div').animate({
												width: '175px'
											}, 400, function() {
												$(".generalInfo").parent('div').css("overflow","hidden");
												$(".generalInfo").parent('div').css("background-image","");
											});
									  });
						$("a.generalInfo").removeClass("active");
						});
					});
				}
			}
			
		});*/

		//SignOn function Start
		$('.signOnHldr').click(function(){
			$('.selectDiv').stop(true, true).slideDown('slow');
			$('.selectDiv a').click(function(){
				var txtAnc = $(this).text();
				$('.selectTxt').text(txtAnc);
			});
			
		});

		$('.applyHldr').click(function(){
			$('.applyDiv').stop(true, true).slideToggle('slow');
			$('.applyDiv a').click(function(){
				/*var txtAnc = $(this).text();
				$('.applyTxt').text(txtAnc);*/
			});
			
		});
		//SignOn function End
	});

