// Bundled with Fusion v0.1



/*
 * File: host_map.js
 */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  WARNING: Moovweb auto-generated file. Any changes you make here will *
 *  be overwritten.                                                      *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

(function(){

var mapProxyToOrigin = {"http://intl.target.com":"http://www.target.com","https://intl.target.com":"https://www.target.com"};
var mapOriginToProxy = {"http://target.com":"http://intl.target.com","http://www.target.com":"http://intl.target.com","https://target.com":"https://intl.target.com","https://www.target.com":"https://intl.target.com"};

if (typeof(mw) == "undefined") {
	window.mw = {};
}

if(typeof(mw.catch_all_domain) == "undefined") {
	mw.catch_all_domain = ".moovapp.com";
} else {
  if (mw.catch_all_domain[0] != ".") {
  	console.log("Bad catch all domain");
  }
}


function detect_catch_all(url) {
	var found_index = url.host.indexOf(mw.catch_all_domain);
	var length = url.host.length;

	if (found_index != -1 && (found_index + mw.catch_all_domain.length) == length) {
		return true;
	}
	return false;
}

function strip_catch_all(url) {
	var found_index = url.host.indexOf(mw.catch_all_domain);
	var length = url.host.length;

	url.host = url.host.slice(0, found_index);
	return url;
}

function add_catch_all(url) {
	url.host = url.host + mw.catch_all_domain;
	return url;	
}

function getParsedURL(url) {
	var elem = document.createElement("a")
	elem.href = url;
	return elem;
}

function getSchemeAndHostname(url) {
	var result = {};
	result.scheme = url.protocol;
	result.host = url.host;
	return result;
}

function getKey(url) {
	var components = getSchemeAndHostname(url);
	return components.scheme + "//" + components.host;
}

function fetch(url, map) {
	var key = getKey(url);
	var result = map[key];
	
	if (result === undefined) {
		if (typeof(mw) != 'undefined' && mw.debug == true) {
			console.log("Warning. No rule to modify host (" + key + ").")
		}
		return url.href;
	}
	
	return result + url.pathname + url.search + url.hash;
}

function detect(rawURL) {
  var properties = {
    "secure": false,
    "schema_relative": false,
    "relative": false
  };  
  properties.raw = rawURL;
  
  if (rawURL.indexOf("https://") != -1) {
    properties.secure = true;
  } else if(rawURL.indexOf("http://") == -1) {
    if (rawURL.indexOf("//") == 0) {
      properties.schema_relative = true;
    } else {
      properties.relative = true;
    }
  }
  
  return properties;
}

function denormalize(url, properties) {
  url = getParsedURL(url);
  if (properties.relative) {    
    return url.pathname + url.search + url.hash;
  } else {
    if (properties.secure) {
      return url.href.replace("http://","https://");
    } 
    if (properties.schema_relative) {
      return url.href.replace(/^https*:/, "");
    }
    
  }
  return url.href;
}

mw.proxyURLToOrigin = function(rawURL){	

	var properties = detect(rawURL);

	// Make sure it includes the host, or it will still be proxied!
	properties.relative = false;

	var url = getParsedURL(rawURL);
	var catch_all = detect_catch_all(url);

  if (catch_all) {    
	  url = strip_catch_all(url);
  }
	
	url = fetch(url, mapProxyToOrigin);
	url = denormalize(url, properties);

	return url;
}

mw.originURLToProxy = function(rawURL){

	var properties = detect(rawURL);
	var url = getParsedURL(rawURL);
	var catch_all = detect_catch_all(url);

  if (catch_all) {    
	  url = strip_catch_all(url);
  }

  url = getParsedURL(fetch(url, mapOriginToProxy));
  var globalLocation = getParsedURL(window.location.href);
  if (detect_catch_all(globalLocation)) {
      url = add_catch_all(url);
  }

	url = denormalize(url.href, properties);
	
	return url;
}

}());



/*
 * File: cachify.js
 */
/*
  Cachify 1.0
  by Hampton Catlin

  This is a simple library that works with Moovweb's "cache"
  mixer to make it very easy to late load content onto 
  the Moov'd site.
*/
document.addEventListener("DOMContentLoaded", function() {
  var cache = document.querySelector("[data-cache-hold]");
  if (cache) {
    var xhr = new XMLHttpRequest;
    var prefix = location.href.indexOf("?") == -1 ? "?" : "&";
    xhr.open("GET", document.location.href + prefix + "_mw_cached_fragments=true&_=" + Date.now());
    xhr.setRequestHeader("X-Requested-With", "CacheRequest");
    try { xhr.responseType = "json"; } catch(e) {}
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var data = Array.isArray(xhr.response) ? xhr.response : JSON.parse(xhr.responseText);
          for (var i = 0; i < data.length; i++) {
            var node = document.querySelector("[data-cache-hold='" + (i+1) + "']");
            if (node)
              node.outerHTML = data[i];
          }
        }
        else
          console.log("Looks like the cachify process failed. Oh noes!");
      }
    };
    xhr.send();
  }
});



/*
 * File: main/stub.js
 */
//removing mention of gift cards and registry
var array = []
var removeGiftCardElement = setInterval(function(){
	for (var i=0; i < document.querySelectorAll('#Search div.searchbox-wrapper span').length; i++){
		if(document.querySelectorAll('#Search div.searchbox-wrapper span')[i].innerText && (document.querySelectorAll('#Search div.searchbox-wrapper span')[i].innerText.indexOf("gift card") != -1 || document.querySelectorAll('#Search div.searchbox-wrapper span')[i].innerText.indexOf("registry") != -1 || document.querySelectorAll('#Search div.searchbox-wrapper span')[i].innerText === "help" || document.querySelectorAll('#Search div.searchbox-wrapper span')[i].innerText === "recall")){
			array.push(document.querySelectorAll('#Search div.searchbox-wrapper span')[i]);

			if(document.querySelector('#Search div.searchbox-wrapper span')){
				if(document.querySelector('#Search div.searchbox-wrapper span').innerText.indexOf('gift') != -1 || document.querySelector('#Search div.searchbox-wrapper span').innerText.indexOf('registry') != -1 || document.querySelector('#Search div.searchbox-wrapper span').innerText.indexOf('help') != -1 || document.querySelector('#Search div.searchbox-wrapper span').innerText.indexOf('recall') != -1){
					document.querySelector('#goSearch').setAttribute('disabled', 'disabled');
				} else {
					document.querySelector('#goSearch').removeAttribute('disabled');
				}
			}
		}
	}

	if (array.length != 0 && array != null){
		for (var i = 0; i < array.length; i++){
			var element = array[i];
			if(element.parentNode != null && element.className !== "2-column leftmenu"){
				element.parentNode.removeChild(element);
			}
		}
	}
}, 250);
//done removing gift cards and registry

//disclaimer css
var disclaimerMessage = setInterval(function(){
	if(document.querySelector('div.bfx-cc-expanded') !== null){
		if(document.querySelector('#bfx-cc-wrapper > div.bfx-cc-expanded').getAttribute('style') !== "display: none;"){
			document.querySelector('#intldisclaimer').setAttribute('style', 'display:none !important;');
			document.querySelector('div.bfx-cc-collapsed').setAttribute('style', 'height:25px !important;');
		} else {
			document.querySelector('#intldisclaimer').setAttribute('style', 'z-index:99999; width:668px; margin-top: -78px; margin-left: 25px; font-size:82% !important; margin-bottom:5px; display:block !important;');
			document.querySelector('div.bfx-cc-collapsed').setAttribute('style', 'height:85px !important;');
		}
	}
}, 250);
//done with disclaimer css

//fixing rating alignment and proxy leak
var ratingAlignment = setInterval(function(){
	if (document.querySelectorAll('div > ul > li > div > div.product-rating') !== null){
		for (var i=0; i < document.querySelectorAll('div > ul > li > div > div.product-rating').length; i++){
			document.querySelectorAll('div > ul > li > div > div.product-rating')[i].setAttribute('style', 'width: 123px;  position: absolute;top: 270px;')
			if(document.querySelectorAll('div > ul > li > div > div.product-rating > div > a')[i]){
				document.querySelectorAll('div > ul > li > div > div.product-rating > div > a')[i].href = document.querySelectorAll('div > ul > li > div > div.product-rating > div > a')[i].href.replace(/www\.target\.com/g, location.host);
			}
		}
	}
}, 250);
//

//fixing featured products proxyleak
var featuredProducts = setInterval(function(){
	if(document.querySelector('#hl_1_home_page') !=null){
		for (var i=0; i < document.querySelectorAll('div.hl-image-container').length; i++){
			if(document.querySelectorAll('div.hl-image-container a')){
				document.querySelectorAll('div.hl-image-container a')[i].href = document.querySelectorAll('div.hl-image-container a')[i].href.replace(/www\.target\.com/g, location.host);
			}
		}
	}
}, 250);
//

//fixing featured products proxyleak
var featuredProducts = setInterval(function(){
	if(document.querySelector('#hl_1_home_page') != null){
		for (var i=0; i < document.querySelectorAll('div.hl-image-container').length; i++){
			if(document.querySelectorAll('div.hl-image-container a')){
				document.querySelectorAll('div.hl-image-container a')[i].href = document.querySelectorAll('div.hl-image-container a')[i].href.replace(/www\.target\.com/g, location.host);
				document.querySelectorAll('a.hl-prod-title')[i].href = document.querySelectorAll('a.hl-prod-title')[i].href.replace(/www\.target\.com/g, location.host);
			}
		}
	}
	if (document.querySelector('.pdph1') != null){
		for (var i=0; i < document.querySelectorAll('div.producttitle-container').length; i++){
			if(document.querySelectorAll('div.producttitle-container a')){
				document.querySelectorAll('div.producttitle-container a')[i].href = document.querySelectorAll('div.producttitle-container a')[i].href.replace(/www\.target\.com/g, location.host);
				document.querySelectorAll('div.image-container a')[i].href = document.querySelectorAll('div.image-container a')[i].href.replace(/www\.target\.com/g, location.host);
			}
		}
	}
}, 250);
//


// Hide checkout button
function isInternational() {
	return document.cookie && document.cookie.indexOf('bfx.isInternational=true') > -1;
}

if (isInternational()) {
	var buttonDisabler = setInterval(function(){
		if (location.pathname.match(/\/checkout_cartview/) !== null){
			if (document.querySelector('.proceedtoCheckout') !== null){
				if (!document.querySelector('.proceedtoCheckout').hasAttribute('data-bfx-disabled')){
					document.querySelector('.proceedtoCheckout').setAttribute('style', 'visibility:hidden');
				}
				clearInterval(buttonDisabler);
			}
		}
	}, 250);
}
//

function removeSessionStorageItems() {
  try {
    if (window.sessionStorage) {
      var itemsToRemove = [];
      for (var i=0; i<window.sessionStorage.length; i++) {
        if (window.sessionStorage.key(i).indexOf(':user') > -1 ||
            window.sessionStorage.key(i).indexOf(':merchant') > -1) {
          itemsToRemove.push(window.sessionStorage.key(i));
        }
      }
      for (var i=0; i<itemsToRemove.length; i++) {
        window.sessionStorage.removeItem(itemsToRemove[i]);
      }
    }
  }
  catch(e) {
  }
}

function insertWMPromo(id, HPBannerId) {
	if(document.querySelector('#bfx-wm-promo')){
		var promoBox = document.querySelector('#bfx-wm-body');
		var wmPromo = document.createElement('div');
		wmPromo.id = "wmPromo";
		document.getElementById(id).removeAttribute('style');
		wmPromo.appendChild(document.getElementById(id));
		promoBox.insertBefore(wmPromo, promoBox.lastChild);
		clearInterval(WMPromo);
	}
}

var WMPromo = setInterval(function(){
	if (document.cookie.indexOf('bfx.country=CA') > -1 && document.querySelector('#promo')){
		document.querySelector('#CAPromoImg').removeAttribute('style');
		insertWMPromo('WMPromoBannerCA');
	} else if ( document.cookie.indexOf('bfx.country=HK') > -1 && document.querySelector('#promo')){
		document.querySelector('#HKPromoImg').removeAttribute('style');
		insertWMPromo('WMPromoBannerHK');
	} else if ( document.cookie.indexOf('bfx.country=IN') > -1 && document.querySelector('#promo')){
		document.querySelector('#INDPromoImg').removeAttribute('style');
		insertWMPromo('WMPromoBannerIND');
	} else if ( document.cookie.indexOf('bfx.country=IL') > -1 && document.querySelector('#promo')){
		document.querySelector('#ISRPromoImg').removeAttribute('style');
		insertWMPromo('WMPromoBannerISR');
	} else if ( document.cookie.indexOf('bfx.country=JP') > -1 && document.querySelector('#promo')){
		document.querySelector('#JPNPromoImg').removeAttribute('style');
		insertWMPromo('WMPromoBannerJPN');
	} else if ( document.cookie.indexOf('bfx.country=MX') > -1 && document.querySelector('#promo')){
		document.querySelector('#MEXPromoImg').removeAttribute('style');
		insertWMPromo('WMPromoBannerMEX');
	} else if ( document.cookie.indexOf('bfx.country=SA') > -1 && document.querySelector('#promo')){
		document.querySelector('#SARPromoImg').removeAttribute('style');
		insertWMPromo('WMPromoBannerSAR');
	} else if ( document.cookie.indexOf('bfx.country=SG') > -1 && document.querySelector('#promo')){
		document.querySelector('#SGPPromoImg').removeAttribute('style');
		insertWMPromo('WMPromoBannerSGP');
	} else if ( document.cookie.indexOf('bfx.country=AE') > -1 && document.querySelector('#promo')){
		document.querySelector('#UAEPromoImg').removeAttribute('style');
		insertWMPromo('WMPromoBannerUAE2');
	} else if ( document.cookie.indexOf('bfx.country=GB') > -1 && document.querySelector('#promo')){
		document.querySelector('#UKPromoImg').removeAttribute('style');
		insertWMPromo('WMPromoBannerUK', '#UKPromoImg');
	} else if ( document.cookie.indexOf('bfx.country=CN') > -1 && document.querySelector('#promo')){
		document.querySelector('#CNPromoImg').removeAttribute('style');
		insertWMPromo('WMPromoBannerCN', '#CNPromoImg');
	}
}, 500);

/* PREVENT FLICKER */
listen('bfx-loadEnd', function() {
   // Handling bfx-loadEnd event. Show prices.
   setTimeout(function(){
		showPrice('#price_main');
		showPrice('.sale');
		showPrice('li.summaryCol.subTotal > span.summaryCol2');
		showPrice('.price');
	}, 1200);
});

(function(e,n,t,a,o){function c(n){e[a]._apiKey=n.key;e[a]._env=n.env;e[a]._logLevel=n.logLevel
}e[a]=c;e[a].l=1*new Date;var i,l;i=n.createElement(t);l=n.getElementsByTagName(t)[0];
i.async=1;i.src=o;l.parentNode.insertBefore(i,l)})(window,document,"script","bfx",
"https://bfx-objects.borderfree.com/v1/dist/bfx.js");
bfx({key:'df662130-5b03-11e5-83ec-950b72561902'});

// Hooks
var __bfx = __bfx || {};
__bfx.hooks = __bfx.hooks || {};
// Drop cookie on redirect
__bfx.hooks.contextChooserRedirect = function() {
  document.cookie = "intlship=false; domain=.target.com; path=/; max-age=86400";
}
// Show checkout button
__bfx.hooks.localizerLoadEnd = function() {
  var buttonEnabler = setInterval(function(){
	if (document.querySelector('.proceedtoCheckout') !== null){
      document.querySelector('.proceedtoCheckout').setAttribute('data-bfx-disabled', 'true');
      document.querySelector('.proceedtoCheckout').setAttribute('style', 'visibility:visible');
      clearInterval(buttonEnabler);
	}
  }, 250);
}

if (document.cookie.indexOf('bfx.target.currencyForced=true') === -1){
	__bfx.hooks.countryCookieSet = function(){
		if (document.cookie && document.cookie.indexOf('bfx.country=CA') > -1 && document.cookie.indexOf('bfx.currency') === - 1){
			document.cookie = "bfx.target.forceCurrency=CAD; path=/; max-age=86400";
		}
	}

	__bfx.hooks.currencyCookieSet = function() {
		if (document.cookie && document.cookie.indexOf('bfx.country=CA') > -1){
			if (document.cookie.indexOf('bfx.target.forceCurrency=CAD') > -1){
				document.cookie = "bfx.target.forceCurrency=CAD; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
				document.cookie = "bfx.target.currencyForced=true; path=/; domain=.target.com; max-age=86400";
				document.cookie = "bfx.currency=USD; path=/; max-age=86400";
			}
		}
	}

	__bfx.hooks.loadBegin = function() {
		if (document.cookie && document.cookie.indexOf('bfx.target.currencyForced=true') > -1){
			document.cookie = "bfx.target.currencyForced=true; path=/; domain=.target.com; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  		removeSessionStorageItems();
			location.reload();
		}
	}
}
//Listen for events
function listen(eventName, eventHandler) {
   console.log('Listening for ' + eventName + ' event.');
   if (window.addEventListener) {
      window.addEventListener(eventName, eventHandler, false);
   } else if (window.attachEvent) { //IE 8 and older
      if (eventName.indexOf('bfx') > -1) { //custom bfx events
         window.attachEvent("onpropertychange", function (event) {
            if (event.propertyName == eventName) {
               eventHandler(eventHandler);
            }
         });
      } else { //standard js events
         window.attachEvent(eventName, eventHandler);
      }
   }
}

//Show element based on selector
function showPrice(selector){
	var showPriceInterval = setInterval(function(){
		if (document.querySelectorAll(selector) != null){
			for ( var i =0; i < document.querySelectorAll(selector).length; i++){
				document.querySelectorAll(selector)[i].style.visibility = "visible";
			}
		}
	}, 250);
}



/*
 * File: main/watcher.js
 */
window.onload = function(){
	//proxy leaks when clicking certain ajax-ed images
	var imageWatcher1 = setInterval(function(){
		if( document.querySelector(".image-container") != null ){
			for (i=0; i < document.getElementsByClassName("image-container").length; i++){
				if(document.getElementsByClassName("image-container")[i].firstElementChild.href){
					document.getElementsByClassName("image-container")[i].firstElementChild.href = document.getElementsByClassName("image-container")[i].firstElementChild.href.replace(/www\.target\.com/, location.hostname);
				}
			}
		}
	},250);

	//when adding something to the bag the modal popup has a proxy leak
	var watcherCheckout = setInterval(function(){
		if( document.querySelector("#checkOutLink") != null ){
			document.querySelector("#checkOutLink").href = document.querySelector("#checkOutLink").href.replace(/www\.target\.com/, location.hostname);
			clearInterval(watcherCheckout);
		}

	},250);

	var imageWatcher2 = setInterval(function(){
		if(document.querySelector('.product-tile') != null){
			for (i=0; i < document.getElementsByClassName("blockSelector").length; i++){
				if(document.getElementsByClassName("blockSelector")[i].href){
					document.getElementsByClassName("blockSelector")[i].href = document.getElementsByClassName("blockSelector")[i].href.replace(/www\.target\.com/, location.hostname);
				}
			}
		}
	},250);


	var miniCartWatcher = setInterval(function(){
		if (document.querySelector('.redButton_big') != null){
			if (document.querySelector('.r') != null){
				document.querySelector('.r').style.fontSize = "80%";
				clearInterval(miniCartWatcher);
			}
		}
	},250);

	// fixing proxy leak on recently viewed items
	var recentlyViewed = setInterval(function(){
		if(document.querySelectorAll('#RecentViewItems div.image a') != null){
			for (i=0; i< document.querySelectorAll("#RecentViewItems div.image a").length; i++){
				if(document.querySelectorAll("#RecentViewItems div.image a")[i].href){
					document.querySelectorAll("#RecentViewItems div.link a")[i].href = document.querySelectorAll("#RecentViewItems div.link a")[i].href.replace(/www\.target\.com/g, location.hostname);
					document.querySelectorAll("#RecentViewItems div.image a")[i].href = document.querySelectorAll("#RecentViewItems div.image a")[i].href.replace(/www\.target\.com/g, location.hostname);
				}
			}
		}
	},250);

	var reviewWatcher = setInterval(function(){
		if(document.querySelector('div.bottomContent a.waRRtag') != null){
			for (i=0; i< document.getElementsByClassName("waRRtag").length; i++){
				if(document.getElementsByClassName("waRRtag")[i].href){
					document.getElementsByClassName("waRRtag")[i].href = document.getElementsByClassName("waRRtag")[i].href.replace(/www\.target\.com/, location.hostname);
				}
			}
		}
	},250);


	function dropCookie(){
		document.cookie = "intlship=false; domain=.target.com; path=/; max-age=86400"
	}
	
	var welcomeMatWatcher = setInterval(function(){
		if (document.querySelector('#leaveIntl') != null){
			dropCookie();
		}
	},250);

	var listenForEvent = function(element, eventName, eventHandler) {
		if (element.addEventListener) {
			element.addEventListener(eventName, eventHandler, false);
		} else if (element.attachEvent) { //IE 8 and older
			element.attachEvent(eventName, eventHandler);
		}
	};

	listenForEvent(document.getElementById('shopUSA'), 'click', function(){
		dropCookie();
	});

};

