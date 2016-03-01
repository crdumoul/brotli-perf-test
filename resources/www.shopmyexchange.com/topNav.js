function redirectToURL(redirectURL){
       		window.location.replace(redirectURL);
       	}

window.dataDialogStatus = false;

function openLoginPopup(element) {
	if (window.dataDialogStatus != true) {
		window.dataDialogStatus = true;
		$(".sign-in-container").appendTo("body").css({
			"display" : "block",
			"top" : "-" + $(".sign-in-container").height() + "px",
			"left" : ($(window).width() / 2) - ($(".sign-in-container").width() / 2) + "px",
			"opacity" : "0"
		}).animate({
			"opacity" : "1",
			"top" : ($(window).height() / 2) - ($(".sign-in-container").height() / 2) + "px"
		});
		setTimeout(function() {
			$("body").attr("data-dialog-status", "true");
		}, 1000);
	} else {
		window.dataDialogStatus = false;
		$(window).trigger("click");
		if(window.marketPlaceLink){
			window.marketPlaceLink = false;
		}		
	}
	if ($(element).attr("urlToRedirect")) {
		$(".sign-in-container .login-button").attr("urlToRedirect", $(element).attr("urlToRedirect"));
	}
	$(".sign-in-container .login-button").attr("data-location", $(this).attr("href"));
	$("#username").focus();
	if($(element).hasClass("marketplace")){
		window.marketPlaceLink = true;
		window.marketPlaceURL = $(element).attr("href");
	}
}

$(document).ready(function(){
    	if($('#loginPopup').val() == 'enabled'){
    		openLoginPopup();
    	}

       $(".loginAnchor").click(function(e){
    	   e.preventDefault();
    	   openLoginPopup(this);
        });
       
       $(".marketPlaceloginAnchor").click(function(e){
    	   e.preventDefault();
    	   $(".marketPlaceloginAnchor").addClass("marketplace");
    	   openLoginPopup(this);
        });
       
		$("body").click(function(e){
			e.stopPropagation();
			if($("body").attr("data-dialog-status") == "true"){
			   $(".sign-in-container").animate({"top":"-"+$(".sign-in-container").height()+"px","left":($(window).width()/2)-($(".sign-in-container").width()/2)+"px","opacity":"0"},function(){
        		   $(".sign-in-container").css("display","none");
        		   $("body").attr("data-dialog-status","false");
        		   window.dataDialogStatus = false;
        	   });
			}
		});
		$(".sign-in-container").click(function(){
			$("body").attr("data-dialog-status","false");
			setTimeout(function(){
       			$("body").attr("data-dialog-status","true");
       	    },1000);
        });		
});
