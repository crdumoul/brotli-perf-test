(function (){
	"use strict";

	var ns = namespace("skybe.nm08");
	var url = skybe.nm08.urlJSON;
	var urlCRMPreferenceCenter = skybe.nm08.urlCRMPreferenceCenter;
	var copyrightpredefined = skybe.nm08.copyrightpredefined;
	
	var setActionForm = function(action) {
		$("form.be-nlfooter").attr("action", action);
		$("form.be-nlfooter").attr("method", "POST");
	};
	//Open Login Module (CM13): CM13 must be included in page => should be CM13 module to expose this function (see checkLoginOnButton() function)
	var openLoginModule = function(object, nextUrl){
		var loginEl = $("div.cm13__extWrapper");
		if (loginEl) {
			loginEl.removeClass("nothingActive").addClass("isActive");
			$(window).scrollTop(0);
			$("#cm13_nextUrlPostLogin").value=nextUrl;
			$("section.be-cm13-singleline").removeClass("nothingActive").addClass("isActive");
		} else {
			console.error("Login Module CM13 is not included in page!");
			throw new Error("Login Module CM13 is not included in page!");
		}
	};
	
	function img_find() {
		var imgs = document.getElementsByTagName("img");
	    var imgSrcs = [];

	    for (var i = 0; i < imgs.length; i++) {
	    	if ((imgs[i].src != document.URL) && (imgs[i].src != "")) {
		    	var obj = {};
		    	obj.src = imgs[i].src;
		    	obj.alt = (imgs[i].alt).replace(/"/g, "&quot;");
		        imgSrcs.push(obj);
	    	}
	    }
	    
	    // Responsive images, find all images made with SVG objects
	    $("object").contents().filter(function(){ return this.nodeType == 8; }).each(function(i, e){
	        var img = e.nodeValue;
	        img = img.substring(img.indexOf('<img'));
	        var endIndex = img.indexOf('/>');
	        if (endIndex == -1)
	        	endIndex = (img.indexOf('>') != -1) ? img.indexOf('>') + 1 : -1;
	        else
	        	endIndex = endIndex + 2;
	        if (endIndex != -1)
	        	img = img.substring(0, endIndex);
	    	if (img.indexOf('/>') == -1)
	    		img = img.substring(0, img.length - 1) + "/>";
	    	// console.log(img);
	    	img = $.parseXML(img);
	    	img = img.getElementsByTagName("img");
	    	
			if ($(img).attr("src") != "") {
		    	var obj = {};
				obj.src = $(img).attr("src");
				obj.alt = ($(img).attr("alt")).replace(/"/g, "&quot;");
		        imgSrcs.push(obj);
		    }
	    });
	    
	    if (copyrightpredefined != undefined)
    	{
	    	$(document).ready(function(){
				$(".copyright--link.j-expandableLink").show();
				$("#copyright-notes").html(copyrightpredefined + "<br>");
	    	});
    	}
	    else
    	{
			$("#copyright-notes").html("");
    	}
	    
	    if (imgSrcs.length > 0) {
		    $.ajax({
		    	url: skybe.nm08.urlImageCopyright,
		    	type: "POST",
		    	async: true,
		    	data: {"imageSrcs" : JSON.stringify(imgSrcs)},
		    	dataType : "json",
		    	success: function(result) {
		    		console.log("Images URL successfully sent. Tags that have been found are " + result);
	
		    		// result's first element is the timeout				    		
		    		if (result.length <= 0) {
		    		    if (copyrightpredefined == undefined)
		    		    	$(".copyright--link.j-expandableLink").hide();
		    		}
		    		else {
		    			$(".copyright--link.j-expandableLink").show();
		    			var copyright = $("#copyright-notes").html();
		    			
		    			for (var i = 0; i < result.length; i++) {
		    				copyright = result[i] + "; " + copyright;
		    			}
		    			
		    			if (copyright.indexOf(";") == 0)
		    				copyright = copyright.substring(2);
		    			
		    			$("#copyright-notes").html(copyright);
		    		}
		    	}
		    });
		}
		else {
			$(".copyright--link.j-expandableLink").hide();
		}
	}
	skybe.nm08.copyrightUpdater = img_find;

	$(document).ready(function(){
		
		img_find();
		
		
		$("form.be-nlfooter").submit(function() {
			if (url) { // case 'user not logged' OR case 'user logged no email deposited'
				if (url.new_customer) {
					// case 'user not logged': is enabled to choose customer type (new_/existing)
					var customerEl = $("input[name='formField_nlfooter_customer']:checked");
					if (customerEl.length == 0) {
						return false;
					} else {
						var customer = customerEl.val();
						if (customer == "new_customer") {
							var action = url[customer];
							
							// proposal
							if(typeof(Storage) !== "undefined")
							sessionStorage.nm08Email = $("[name='formField_nlfooter_email']").val();
							
							setActionForm(action);
						} else if (customer == "existing_customer") {
							//checkLoginOnButton(this,url[customer]);
							//redirect to the TN01
							window.location.replace(urlCRMPreferenceCenter);
							//openLoginModule(this,url[customer]);
							return false;
						} else { // case not possible
							return false;
						}
						
					}
				} else {
					// case 'user logged no email deposited' (existing customer)
					var action = url.existing_customer;
					setActionForm(action);
					if(typeof(Storage) !== "undefined")
						sessionStorage.nm08Email = $("[name='formField_nlfooter_email']").val();
				}
			} else {
				// user logged email deposited
				window.location.replace(urlCRMPreferenceCenter);
				return false;
			}
			
		});
		
	}); 

	
}) ();