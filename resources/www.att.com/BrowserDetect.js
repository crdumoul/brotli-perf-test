// JavaScript Document
var browse;
var os;
var SafariMacUser = false;
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		browse = this.browser;
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		//alert(this.version);			
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
		os = this.OS;
		hideFlash(browse, os);
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iOS"
	 	},
		{
			string: navigator.userAgent,
			subString: "iPod",
			identity: "iOS"
	 	},
		{
			string: navigator.userAgent,
			subString: "iPad",
			identity: "iOS"
	 	},
		{
			string: navigator.userAgent,
			subString: "Android",
			identity: "Android"
	 	},
		{
			string: navigator.userAgent,
			subString: "BlackBerry",
			identity: "Blackberry"
	 	},		
		{
			string: navigator.userAgent,
			subString: "BB10",
			identity: "Blackberry"
	 	},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
		
	]

};
BrowserDetect.init();
	function hideFlash(brw, o){
		if(brw == 'Safari' && o == 'Mac'){
			SafariMacUser = true;
		}
	}

	jQuery("#toggleToGrid").live('keydown', function(e){
		var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
		if(key == 13) // the enter key code
		{
			jQuery('.gridToggleLeft').click();
		}
	});
	jQuery("#toggleToList").live('keydown', function(e){
		var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
		if(key == 13) // the enter key code
		{
			jQuery('.listToggleRight').click();
		}
	});

	jQuery(".darkCheck .ui-radio, .darkCheck .ui-checkbox").live('focus',function(){
		jQuery(this).css("border", "1px dotted #fff");
	});
	jQuery(".darkCheck .ui-radio, .darkCheck .ui-checkbox").live('blur',function(){
		jQuery(this).css("border", "none");
	});