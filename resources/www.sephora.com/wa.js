var wa = wa || {};

wa.config = {
  RELEASE: '20160224',  // update with every release
  BASE_PATH: '/javascripts/analytics/',

  /***
   wa.min.js must detect how to include other libraries when it is
   included on dev/qa environments and  by third parties includeStates
   defines how the other wa JS file should be referenced
   */
  includeStates: [{
    NAME: 'preproduction',
    PROD_MODE: false,
    HOSTS: [
      'localhost',  // local dev
      'qa.sephora.com', // qa
      'preview.qa.sephora.com', // preview
      'staging.merchantmail.net', // acxiom pre-production
      'sandbox.qa.sephora.com', // qa
      'origin.qa.sephora.com', // qa
      'staging.illuminate.sephora.com', // staging
      'staging.sephora.com',
      'dev.illuminate.sephora.com', // dev
      'dev.sephora.com',
      'qa.illuminate.sephora.com', // qa
      'qa.sephora.com', // qa
      'm-qa.sephora.com',  // mobile qa
      'm-qa.illuminate.sephora.com', // mobile qa
      'community.qa.sephora.com', // community qa
      'ebf.sephora.com', // EBF environment
      'test.skedge.me', // online res test
      'dev.reserve.sephora.com', // online res test
	  'dev-canada.sephora.com',
	  'fr-dev-canada.sephora.com',
	  'qa-canada.sephora.com',
	  'fr-qa-canada.sephora.com',
      'fr-sephora-dev.onelink-translations.com',
      'fr-sephora-qa.onelink-translations.com',
      'gallery-qa.sephora.com',
      new RegExp( '\\d+\\.\\d+\\.\\d+\\.\\d+' ) // RegExp for all ips
    ],
    INCLUDE_HOST: '' // defaults to relative include with port used
  }, {
    NAME: 'online reservations development/test',
    PROD_MODE: false,
    HOSTS: ['test.skedge.me', 'dev.reserve.sephora.com', 'dev-m-reserve.sephora.com'],
    INCLUDE_HOST: 'dev.illuminate.sephora.com'
  }, {
    NAME: 'online reservations production',
    PROD_MODE: true,
    HOSTS: ['www.skedge.me', 'skedge.me', 'reserve.sephora.com', 'm-reserve.sephora.com'],
    INCLUDE_HOST: 'www.sephora.com'
  }, {
    NAME: 'external preproduction',
    PROD_MODE: false,
    HOSTS: ['m-qa.sephora.com','community.qa.sephora.com','m-qa.illuminate.sephora.com'],
    INCLUDE_HOST: 'qa.illuminate.sephora.com' // external QA should pull wa2 from sephora QA server
  }, {
    NAME: 'sephora 2.0 beta',
    PROD_MODE: true,
    HOSTS: ['beta.sephora.com','illuminate.becho.net'],
    INCLUDE_HOST: 'beta.sephora.com'
  }, {
    NAME: 'production',
    PROD_MODE: true,
    HOSTS: [
      'www.sephora.com',
      'sephora.com',
      'shop.sephora.com',
      'community.sephora.com',
      'm.sephora.com',
      'reviews.sephora.com',
      's.brandingbrandmobile.com',
      'www.sephoracanada.com',
      'birthday.sephora.com',
      'sephoralove.com', // promo microsite
      'www.sephoralove.com', // promo microsite
      'sephoralove.ca',
      'www.sephoralove.ca',
      'app.sephora.com',
	  'canada.sephora.com',
	  'www.sephora.ca',
	  'sephora.ca',
	  'fr-canada.sephora.com',
	  'coloroftheyear.sephora.com',
	  'gallery.sephora.com',
      'sephora.cashstar.com'
    ],
    INCLUDE_HOST: 'www.sephora.com'
  }]

};

/** @constructor */
wa.lineItem = function (productId, productName, skuId, skuName, quantity, price, special, biType, notInStock, isAncillary) {
  this.productId = productId;
  this.productName = productName;
  this.skuId = skuId;
  this.skuName = skuName;
  this.quantity = quantity;
  this.price = price;
  this.special = special ? special.toLowerCase() : "";
  this.biType = biType ? biType.toLowerCase() : "unspecified";
  this.notInStock = notInStock;
  this.isAncillary = isAncillary;
};

/** @constructor */
wa.Payment = function (type, value) {
  this.type = type;
  this.value = value;
};

/** @constructor */
wa.Refinement = function (type, value) {
  this.type = type;
  this.value = value;
};

// function called on tracked events
wa.tries = 0;
wa.action = function(obj) {
  try {
    wa.trackAction(obj);
  } catch (e) {
    // sometimes the wa2 file is not loaded when this is called; try again
    if(wa.tries < 10){
      setTimeout(function(){wa.action(obj);}, 1000);
      wa.tries++;
    }
  }
};

wa.setCookie = function (name, value, days) {
  try {
    var expires = '';
    if (!wa.isEmpty(days)) {
      var dt = new Date();
      dt.setTime(dt.getDate() + days);
      expires = '; expires=' + dt.toGMTString();
    }
    document.cookie = name + '=' + escape(value) + expires + '; path=/';

  } catch (e) {}
};

wa.getCookie = function (name) {
  try {
    var results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    var result = ( results && results.length > 2 ) ? unescape(results[2]) : "";
    if (results) {
      return result;
    } else {
      return null;
    }
  } catch (e) {}
};

wa.deleteCookie = function (name) {
  this.setCookie(name, '', -1);
};

wa.loadScript = function (js,callback) {
  try {
    var b = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');

    if (s.readyState){  // IE
      s.onreadystatechange = function() {
        if (s.readyState == "loaded" || s.readyState == "complete") {
          s.onreadystatechange = null;
          callback();
        }
      };
    } else {  // Others
      s.onload = function(){
        callback();
      };
    }
    s.type = 'text/javascript';
    s.src = js;
    b.appendChild(s);
  } catch (e) {}
};

wa.isEmpty = function (a) {
  return a === null || typeof a == 'undefined' || a === '';
};

wa.inStringRegExpList = function (a,v) {
  for (var i = a.length; i--;) {
    if (typeof a[i] == 'string' && a[i] == v) {
      return true;
    } else if (a[i] instanceof RegExp && a[i].test(v)) {
      return true;
    }
  }
  return false;
};

wa.getQueryParam = function(name, href) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var result = RegExp('[\\?&]' + name + '=([^&#]*)').exec(href);
  return result === null ? '' : decodeURIComponent(result[1].replace(/\+/g, ' '));
};

// cleanup data being passed into SiteCatalyst
// (perform recursive URL-decoding, etc.)
wa.clean = function(txt) {
  // called 3x because some content is encoded multiple times
  txt = decodeURIComponent(decodeURIComponent(decodeURIComponent(txt)));
  return txt;
};

// called twice to make sure both document ready and script loaded
wa.initOnReady = function() {
  if (wa.config.ready) {
    if((typeof wa !== 'undefined') && ("waInitReady" in wa)) {
        wa.init();
    } else {
        $("body").one("waInitReady", function(){wa.init();});
    }
  } else {
    wa.config.ready=true;
  }
};

  // new function to load wa2
  wa.loadWa2 = function() {
  var host = location.hostname.toLowerCase();

  // determine what environment for include paths
  var includeStateFound = false;
  var i = wa.config.includeStates.length;
  while (i-- && !includeStateFound) {
    var state = wa.config.includeStates[i];
    includeStateFound = (wa.inStringRegExpList(state.HOSTS, host)) ? true : includeStateFound;
    if (includeStateFound) {
      wa.config.includeName = state.NAME;
      wa.config.includeHost = state.INCLUDE_HOST;
      wa.config.prodMode = state.PROD_MODE;
    }
  }
  if (!includeStateFound) {
    wa.config.includeName = 'no include state found';
    wa.config.includeHost = "";
    wa.config.prodMode = false;
  }

  var locationPort = '';
  if(!wa.isEmpty(location.port)) {
	  locationPort = ':'+location.port;
  } 
  
  // if no host specified, include relatively with port for dev instances
  wa.config.baseURL = (wa.isEmpty(wa.config.includeHost)) ? '//' + host + locationPort : '//' +
	wa.config.includeHost;
  wa.config.baseURL += wa.config.BASE_PATH;

  // non blocking loading of wa library
  wa.loadScript(wa.config.baseURL + 'wa2.js?release=' + wa.config.RELEASE,
	function() {
	    wa.config.ready = true;
	    wa.initOnReady();
	}
  );

  // make sure both document ready and library loaded before initialization
  try {
    jQuery(document).ready(

        function () {
		//wa.initOnReady();
        });
    wa.config.jQueryFound = true;
  } catch (e) {
    wa.config.jQueryFound = false;
    if (window.addEventListener) {
      //window.addEventListener('load', wa.initOnReady, false);
    } else if (window.attachEvent) {
      //window.attachEvent('onload', wa.initOnReady);
    }
  }

};
