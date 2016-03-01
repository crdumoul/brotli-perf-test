$(document).ready(function(e) {
	var navCount = 0;
	$('.sticker_wrapper li').mouseover(function() {
		var $this = $(this);
		if (!$this.children().hasClass('navButtonCalendar') || !$this.hasClass('navButtonOutlet')) {
			$this.children('.sticker_menu').addClass('hover');
			$this.addClass('hover');
		}
	}).mouseleave(function() {
		$('.sticker_wrapper li').children('.sticker_menu').removeClass('hover');
		$('.sticker_wrapper li').removeClass('hover');
	})
	
	$('.fixedBarNav').mouseover(function() {
		var $this = $(this);
		$this.children('.fixedBarDrop').addClass('hover');
		$this.children('#account-tab').addClass('icon_hover');
		$this.children('#help-tab').addClass('icon_hover_help');
		$this.addClass('hover');
	}).mouseleave(function() {
		$('.fixedBarNav').children('.fixedBarDrop').removeClass('hover');
		$('.fixedBarNav').children('#account-tab').removeClass('icon_hover');
		$('.fixedBarNav').children('#help-tab').removeClass('icon_hover_help');
		$('.fixedBarNav').removeClass('hover');
	})
	
	$('.navBtn').on('touchstart', function(e) {
		e.stopImmediatePropagation();
		e.preventDefault();
		return false;
	});
	
	$('.fixedBarNav').each(function(){
		if(navCount < 2){
			$(this).on('touchstart', function(e){
				e.stopImmediatePropagation();
				e.preventDefault();
				return false;
			});
			$(this).on('touchend', function(e) {
				e.preventDefault();
				$('.sticker_menu').removeClass('hover one-touch');
				$('li').removeClass('hover');
				var $this = $(this);
				if ($this.children('.fixedBarDrop').hasClass('one-touch')) {
					$this.children('.fixedBarDrop').removeClass('hover one-touch');
					$this.removeClass('hover');
					$this.children('#account-tab').removeClass('icon_hover');
					$this.children('#help-tab').removeClass('icon_hover_help');
				} else {
					$('.fixedBarDrop').removeClass('hover one-touch');
					$('.fixedBarNav').removeClass('hover');
					$('#help-tab').removeClass('icon_hover_help');
					$('#account-tab').removeClass('icon_hover');
					$this.children('.fixedBarDrop').addClass('hover one-touch');
					$this.addClass('hover');
					$this.children('#account-tab').addClass('icon_hover');
					$this.children('#help-tab').addClass('icon_hover_help');
				}
			});
			navCount++;
		}
	});
	
	if (navigator.userAgent.match(/Android/i) != null) {
		$('.navBtn').on('click', function(e) {
			e.stopImmediatePropagation();
			e.preventDefault();
			return false;
		});
	}
	
	$('.navBtn').on('touchend', function(e) {
		e.preventDefault();
		var $this = $(this);
		if ($this.hasClass('navButtonCalendar') || $this.hasClass('navButtonOutlet')) {
			location.href = $this.children('a').attr('href');
		} else {
			if ($this.parent('li').children('.sticker_menu').hasClass('one-touch')) {
				$this.parent('li').children('.sticker_menu').removeClass('hover one-touch');
				$this.parent('li').removeClass('hover');
			} else {
				$('.sticker_menu').removeClass('hover one-touch');
				$('li').removeClass('hover');
				$('.fixedBarDrop').removeClass('hover one-touch');
				$('.fixedBarNav').removeClass('hover');
				$('#help-tab').removeClass('icon_hover_help');
				$('#account-tab').removeClass('icon_hover');
				$this.parent('li').children('.sticker_menu').addClass('hover one-touch');
				$this.parent('li').addClass('hover');
			}
		}
	});

	$('.fixedBarNav .drop-inner').on('touchend', function(e) {
		e.preventDefault();
		var $this = $(this);
		location.href = $this.children('a').attr('href');
	});

	$(document).on('touchstart', function(e) {
		if ($(e.target).parents().index($('.sticker_menu_container')) == -1) {
			$('.sticker_menu').removeClass('hover one-touch');
			$('li').removeClass('hover');
		}
	});
	
	$(document).on('touchstart', function(e) {
		if ($(e.target).parents().index($('.fixedBarNav')) == -1) {
			$('.fixedBarDrop').removeClass('hover one-touch');
			$('.fixedBarNav').removeClass('hover');
			$('#help-tab').removeClass('icon_hover_help');
			$('#account-tab').removeClass('icon_hover');
		}
	});
	
	$('.tablet_close_x').on('touchend', function() {
		setTimeout(function() {
			$('.sticker_menu').removeClass('hover one-touch');
			$('li').removeClass('hover');
		}, 500)
	});
	
});

/** Drop Down Store Locator functionality **/
function open_locator() {
	var storeLocInput = document.getElementById('locationInput').value;
	var hostname = window.location.hostname;
	var storeLocURL = 'http://'+hostname+'/content/locator/?cm=TnDdStoreLcns#d='+ storeLocInput;
	window.location.href = storeLocURL;
	
	// Check to see if already on store locator page, if so reload the page with new ending on URL string
	var storeLocURL = window.location.toString();
	var urlStrArray = storeLocURL.split('/');
	var strToCheck = (urlStrArray[3] + '/' + urlStrArray[4]).toString();
	
	if (strToCheck == "content/locator") {
		location.reload();
	}
	
}

function checkStoreLocator() {
	var cssObj1 = {
		'color' : '#000',
		'font-style' : 'normal'
	}
	$('#locationInput').css(cssObj1);	
}
function restoreStoreLocator() {
	var cssObj2 = {
		'color' : '#7F7F7F',
		'font-style' : 'italic'
	}
	$('#locationInput').css(cssObj2);
}

/** Footer Email form Functionality **/
function open_emailform() {
	var footerEmailInput = document.getElementById('userEmail').value;
	var emailFormURL = ('http://ebm.e.footlocker.com/r/regf2?a=0&aid=1095704045&n=2&email1='+footerEmailInput+'&email2='+footerEmailInput).toString();
	window.location.href = emailFormURL;
}