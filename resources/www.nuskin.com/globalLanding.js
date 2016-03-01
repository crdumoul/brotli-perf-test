//get or create the "nuskin" namespace
var nuskin = nuskin || {},
	rememberLocationState = null;


//require nuskin.util namespace
if(!nuskin.util) {
	alert("global landing error: missing nuskin.util namespace");
}
$(function(){
    $('#globalLanding .links a, #globalLanding .regionLinkListContainer a').click(function() {
        if($('#rememberLocation:checked').length > 0) {
            dojo.cookie('nuskin.hello.savedLocation', this.href, {path:'/', expires: 365});
        }
    });
})
var redirect = true;
var hashString = window.location.hash.substring(1);
if (hashString && hashString == "choose") {
	redirect = false;
}
var savedLocation = dojo.cookie('nuskin.hello.savedLocation');
if(redirect && savedLocation) {
	var locationValid = false;
	dojo.query('#globalLanding .links a, #globalLanding .regionLinkListContainer a').forEach(function(node, index, nodeList){
		var href = dojo.attr(node, 'href');
		//console.log('   link: '+href);
		if(href == savedLocation || savedLocation.match(href+"$") == href) {
			locationValid = true;
		}
	});
	if(locationValid) {
		window.location = savedLocation;
	} else {
		//invalidate the cookie
		dojo.cookie('nuskin.hello.savedLocation', null, {path:'/', expires: -1});
	}
}

//Checks whether or not the device is mobile
function isMobile() {
	var mobileWidthBreak = 767;
	return ($( window ).width() <= mobileWidthBreak);
}

//The Global Links have a default height, but height cannot be smoothly
//linked to device height with CSS alone
function fitGlobalLinksToScreen() {
	var newHeight,
		height = $( window ).height(),
		usedVerticalSpace = $('header').outerHeight() + $('#rememberLocationFieldSet').outerHeight() + 80;

	if(isMobile()) {
		newHeight = (height - usedVerticalSpace) + 'px';
		$('#globalLanding .links, #globalLanding .regionLinkListContainer').css("max-height",newHeight);
		$('#globalLanding .links, #globalLanding .regionLinkListContainer').css("height",newHeight);
	} else {
		$('#globalLanding .links, #globalLanding .regionLinkListContainer').css("max-height",'');
		$('#globalLanding .links, #globalLanding .regionLinkListContainer').css("height",'');
	}



}

//Sets up the Mobile Links Accordion Functionality so you can
//choose a country within a region.
function configureMobileLinksAccordion() {
	$('.regionLinkList .hdr').click(function(evt) {
		if(isMobile()){
			var scrollTarget,
				target 		= evt.target,
				$parent 	= $(target.parentNode),
				expanded 	= $parent.hasClass('expanded'),
				time 		= 500;

			//Assess the currently active list
			var previousOffset,
				activeList = $('.regionLinkList.expanded ul'),
				offsetCorrection = 0;

			if(activeList.length) {
				previousOffset = activeList.offset();
				offsetCorrection = (previousOffset.top < $parent.offset().top)
					? activeList.height()
					: 0;
			}

			// Toggle between collapsed and expanded states
			$('.regionLinkList').removeClass('expanded');
			if(!expanded) {

				//Expand the accordion
				$parent.addClass('expanded');

				//Focus on the expanded accordion
				scrollTarget = $(target).offset().top - $('.links, .regionLinkListContainer').offset().top - offsetCorrection + $('.links, .regionLinkListContainer').scrollTop();

				$('.links, .regionLinkListContainer').animate({
					scrollTop: scrollTarget
				}, time);
			}
		}

	});
}

function moveRememberMyLocation () {
	if(isMobile() && rememberLocationState != 'mobile') {
		var $remember = $('#rememberLocationFieldSet').detach();

		$('#globalLanding .links, #globalLanding .regionLinkListContainer').after($remember);
		rememberLocationState = 'mobile';
	} else if(!isMobile() && rememberLocationState != 'default') {
		var $remember = $('#rememberLocationFieldSet').detach();

		$('#chooseLocationHeader').after($remember);
		rememberLocationState = 'default';
	}
}


$(document).ready( function(evt) {
	//Code for properly fitting links to the screen
	fitGlobalLinksToScreen();

	//Moves the "remember my location" checkbox
	moveRememberMyLocation();

	//Code for managing accordion behavior in mobile
	//Even though it is unused in Desktop, the window
	//can still be resized and the user may potentially
	//trigger the mobile view on desktop
	configureMobileLinksAccordion();
});

$( window ).resize( function() {
	fitGlobalLinksToScreen();
	moveRememberMyLocation();
})
