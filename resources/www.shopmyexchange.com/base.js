var querySearch = "";
var menuNavigated = 0;
var milMenuNavigated = 0;

	$(document).ready(function() {
		
		formSweepStakesIframeSource();
		// Function to add nav-Selected to the department Category in the Top Nav
		var departmentSelected = $('#sidebar > div.sideBarTitle > a').text();
		var departmentSelected = $.trim(departmentSelected.toLowerCase());
		
		$('ul.nav > li.nav-Cat > a').each(function() {
			var departmentLi = $.trim($(this).text());
			if(departmentSelected === departmentLi.toLowerCase()){
				$(this).addClass("nav-Selected");
			}			
		});
		
		
		
		
		$('#sidebar ul li ul li ul li').prepend('- ');
		var lengthNav = $('#sidebar > ul.leftNavCategory > li').length;
		
		if($('#sidebar > ul.leftNavCategory > li').eq(lengthNav-1).children().length > 0){
			$('#sidebar > ul.leftNavCategory > li').eq(lengthNav-1).has('ul').attr('class', 'last');
		}else{
			$('#sidebar > ul.leftNavCategory > li').eq(lengthNav-2).attr('class', 'last');			
		}
		
		var lengthFeatureNav = $('#sidebar > ul.featureLeftNav > li').length;
		
		if($('#sidebar > ul.featureLeftNav > li').eq(lengthFeatureNav-1).children().length > 0){
			$('#sidebar > ul.featureLeftNav > li').eq(lengthFeatureNav-1).has('ul').attr('class', 'last');
		}else{
			$('#sidebar > ul.featureLeftNav > li').eq(lengthFeatureNav-2).attr('class', 'last');			
		}		

		$(".ymal ul.cat-list li:nth-child(5n)").addClass('fifth');
		//$("ul.pdp-gallery-thumbs li:nth-child(4n)").addClass('fourth');
		$("#sidebar h4:first").addClass('first');
		$("ul.tab-nav li:first").addClass('first');
		$("ol.checkout-nav li:nth-child(3n)").addClass('third');
		$("ol.checkout-nav li:last").addClass('last');
		$(".topnav-wl").click(wlExpand);
		
		if($(".minicart-iconArea .minicart-link.logged-in-user").length){
				$(".minicart-iconArea").hoverIntent({
					  timeout: 3000,
					  sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
					  interval: 10,   // number = milliseconds for onMouseOver polling interval
					  over: function() {     // function = onMouseOver callback (required)
						  
						$(this).data('hasmouse', true);
						$("#mini-cart").data('hasmouse', false);
						if($("#mini-cart").css('display') != 'block'){
							
							cartExpand();
							
						}
						  
					  },
					  out: function() {	// function = onMouseOut callback (required)
						$(this).data('hasmouse', false);
						if ($("#mini-cart").data('hasmouse')) {
							return;
						}
						cartContract();
						
					  }
				});
					 
				
				//this is to leave the minicart open when we hover the minicart itself
				$("#mini-cart").hoverIntent({
		
		            over: function() {
		        	    $(this).data('hasmouse', true);
		            },
		            out: function() {
		                $(this).data('hasmouse', false);
		                if($(".minicart-iconArea").data('hasmouse')){
		                	return
		                }
		                cartContract();
		            }			
				});
		}else{
			$(".minicart-iconArea").on("click",function(e){
				e.preventDefault();
				if(window.dataDialogStatus == false){
					$(".loginAnchor.cartLink").trigger("click");
				}				
			});
			$(".cartContainer .loginAnchor.cartLink, .minicart-iconArea").on("mouseover",function(){
				if(window.dataDialogStatus == false){
					  $(".loginAnchor.cartLink").trigger("click");
				}
			});
		}
		
		// function for delimit any textarea with the attribute "maxlength" as the maximum number of chars permited
	    $('textarea').keyup(function(e){

	    	//get the limit from maxlength attribute  
	        var limit = parseInt($(this).attr('maxlength'));  
	        //get the current text inside the textarea  
	        var text = $(this).val();  
	        //count the number of characters in the text  
	        var chars = text.length;  
	  
	        //check if there are more characters then allowed  
	        if(chars > limit){  
	            //and if there are use substr to get the text before the limit  
	            var new_text = text.substr(0, limit);  
	  
	            //and change the current text with the new text  
	            $(this).val(new_text);  
	        }  
	    
	    });	
		 
		 
		     $("#searchText").keyup(function(){
        $("#searchTextReal").val($("#searchText").val());
    });
    
    /**
     * START: This is the functionality in charge of showing and hiding the signed in menu.
     */
    
	$("a.cart-signed-in-link").on("mouseover", function(event) {
			$("div.cart-signed-in-menu").css("display","block");
			window.signInMenu = true;
			if( $("#mini-cart").css("display")=="block" ){
			 $("#mini-cart").css("display","none");
			}
	});
	
	$("div.cart-signed-in-menu").on("mouseover",function(e){
		e.stopPropagation();
		window.signInMenu = true;
	}).on("mouseleave",function(e){
		e.stopPropagation();
		$("div.cart-signed-in-menu").css("display","none");
		window.signInMenu = false;
	});
	
	$(".cart-signed-in-link").on("mouseleave", function(event) {
		event.stopPropagation();
		window.signInMenu = false;
		setTimeout(function(){
			if(window.signInMenu == false){
				$("div.cart-signed-in-menu").css("display","none");
			}
		},500);		
	});
	    
    /**
     * START: of the functionality in charge of showing and hiding the signed in menu.
     */
    $(".mil-star-button").hover(
    function(){
        $(".mil-star-menu").css("display", "block");
    }, function(){ //this is the mouse leave function.
        if (milMenuNavigated === 1) {
            $(".mil-star-menu").mouseleave(function(){
                $(".mil-star-menu").css("display", "none");
            });
        }
        else {
            $(".mil-star-menu").css("display", "none");
        }
    });
    
    $(".mil-star-menu").mouseenter(function(){
        milMenuNavigated = 1;
    });    
    
    /**
     * END: of functionality in charge of showing and hiding the military star menu.
     */
		 
		
		/* Start of function to change the select tag color to gray or black ****************/
		changeSelectColor();
		/* End of function to change the select tag color to gray or black ****************/
		
		navigationMenu();
		
		//Function for appearing text in the search box
		appearText();
		
		//Function for appearing text in the enter email address box
		appearEmailText();
		
	      /* Registration Page - Step 1 */
		$(".createAccountContainer #registerUserForm").find("input[type=text],input[type=password]").on("focus",function(){
	    	  $(".createAccountContainer .default-board").hide();
	    	  $(".createAccountContainer .onfocus-board").show();
	      }).on("blur",function(){
	    	  $(".createAccountContainer .default-board").show();
	    	  $(".createAccountContainer .onfocus-board").hide();
	      });
		
	});	
	
	$("ul.cat-list").ready(function() {
		$("ul.cat-list li:nth-child(4n)").addClass('fourth');
	});	
	
	
	/**
	* gets the key vaue from the cookies stored.
	*/
	function getCookieValue(key) {
		currentcookie = document.cookie;
		if (currentcookie.length > 0) {
			firstidx = currentcookie.indexOf(key + "=");
			if (firstidx != -1) {
				firstidx = firstidx + key.length + 1;
				lastidx = currentcookie.indexOf(";", firstidx);
				if (lastidx == -1) {
					lastidx = currentcookie.length;
				}
				return unescape(currentcookie.substring(firstidx, lastidx));
			}
		}
		return "";
	}
	
	function cartExpand(){  
		  
		// update cart icon item count
		dataString = "";
		$.ajax({
			type: "POST",
			url: "/global/util/getCartItemCount.jsp",
			data: dataString,
			dataType: "json",
			success: function(data) {
				if (data.error == "false") {
					updateCartIconItemCount(data.cartItemCount);
				} 
			}
		});

		// load minicart content
		var miniCartUrl = "/minicart/modals/modal-cartsummary.jsp";
		if(window.location.toString().indexOf("https:") == 0){
			miniCartUrl = "/checkout/minicart-ssl.jsp";
		}
		$.ajax({
		    url: miniCartUrl,
		    cache: false,
		    dataType: "html",
		    success: function(data) {
		        $("#mini-cart").html(data);
		         loadMini();
		         // triggers setup of scrollbar/scrollpane functionality
	             $(".scroll-pane").jScrollPane({
	                verticalDragMinHeight: 25,
	                verticalDragMaxHeight: 30
	             });
		         
		    }
		});		
	}
		
	function wlExpand(){  
		$.ajax({
		    url: "/wishlist/modals/modal-wishlist.jsp",
		    cache: false,
		    dataType: "html",
		    success: function(data) {
		        $("#miniwishlist").html(data);
		        //console.log($("#miniwishlist").html());
		        loadMiniWl(); 		        
		    }
		});		
	}
		
	function loadMini(){
		$("#mini-cart").css('height', 'auto');
 		$("#mini-cart").css('display', 'block');
		
		if ($("#miniwishlist").css('display') != 'none') { 
			// hides wishlist
	        $("#miniwishlist").animate({"height":0},200);
	        $("#miniwishlist").fadeOut("fast");
		}
	}
	
	function loadMiniWl(){
		$("#miniwishlist").css('height', 'auto');
        var height = $("#miniwishlist").height();
        $("#miniwishlist").css('height', height + 'px');
		
        var wlLinkPos = $(".topnav-wl").position();
        var wlDivPos = $("#miniwishlist").position();
        var wlNewLeft = wlLinkPos.left + parseInt($(".topnav-wl").css('margin-left'));
        
        $("#miniwishlist").css('top', wlLinkPos.top + $(".topnav-wl").height());
        $("#miniwishlist").css('left', wlNewLeft);
        
		$("#miniwishlist").animate({"height": height},200);
		$("#miniwishlist").fadeIn("fast");
		// hides minicart
        $("#mini-cart").animate({"height":0},200);
        $("#mini-cart").fadeOut("fast");
	}

	function autoCloseCartContract(){
		setTimeout(cartContract,5000);
	}
	
	function cartContract(){ 	
		
		// no fade effect is been used
		$("#mini-cart").fadeOut("fast");
		
	}
	
	function wlContract(){ 
        $("#miniwishlist").animate({"height":0},200);
        $("#miniwishlist").fadeOut("fast");
		// clear div
		$(".close-miniwishlist").remove();
		$(".miniwishlist-header").remove();
		$(".miniwishlist-list").remove();
		$(".miniwishlist-total").remove();
		$(".miniwishlist-button").remove();
        } 
	

	/**************************************************************
	 * Start of functions used to display a pop up 
	 ***************************************************************/

	/**
	* a javascript collection object of all of the window popup options
	*/
	function popupOptions(){
	this.height = screen.availHeight / 2;
	this.width = screen.availWidth / 2;
	this.top = 0;
	this.left = 0;
	this.toolbar = false;
	this.location = false;
	this.directories = false;
	this.status = false;
	this.menubar = false;
	this.scrollbars = false;
	this.resizable = false;
	this.dependent = false;
	this.build = _buildOptions;
	}
	/**
	* a private javascript method for popupOptions which is used
	* to build a popup option string
	*/
	function _buildOptions(){
	var sTemp = "";
	sTemp += "height=" + this.height + ",";
	sTemp += "width=" + this.width + ",";
	sTemp += "top=" + this.top + ",";
	sTemp += "left=" + this.left + ",";
	sTemp += "scrollbars=" + ((this.scrollbars) ? "yes" : "no") + ",";
	sTemp += "toolbar=" + ((this.toolbar) ? "yes" : "no") + ",";
	sTemp += "location=" + ((this.location) ? "yes" : "no") + ",";
	sTemp += "directories=" + ((this.directories) ? "yes" : "no") + ",";
	sTemp += "status=" + ((this.status) ? "yes" : "no") + ",";
	sTemp += "menubar=" + ((this.menubar) ? "yes" : "no") + ",";
	sTemp += "resizable=" + ((this.resizable) ? "yes" : "no") + ",";
	sTemp += "dependent=" + ((this.dependent) ? "yes" : "no");
	return(sTemp);
	}
	/**
	* creates a popup window
	*
	* @param string window url
	* @param string window name
	* @param string [optional] window width
	* @param string [optional] window height
	* @param boolean [optional] whether window is scrollable or not
	* @param boolean [optional] whether window has a toolbar or not
	* @param boolean [optional] whether window is resizable or not
	*/
	function popup(winlink, winname){
	var winwidth = (arguments.length >= 3) ? arguments[2] : screen.availWidth / 2;
	var winheight = (arguments.length >= 4) ? arguments[3] : screen.availHeight / 2;
	var winscroll = (arguments.length >= 5) ? ((arguments[4] == '1') ? true : false) : false;
	var wintoolbar = (arguments.length >= 6) ? ((arguments[5] == '1') ? true : false) : false;
	var winresize = (arguments.length >= 7) ? ((arguments[6] == '1') ? true : false) : true;
	var winmenubar = (arguments.length >= 8) ? ((arguments[7] == '1') ? true : false) : false;
	var oOption = new popupOptions();
	oOption.width = winwidth;
	oOption.height = winheight;
	oOption.scrollbars = winscroll;
	oOption.toolbar = wintoolbar;
	oOption.resizable = winresize;
	oOption.menubar = winmenubar;
	// these values are hard coded
	oOption.top = ((screen.availHeight / 2) - (winheight / 2));
	oOption.left = ((screen.availWidth / 2) - (winwidth / 2));
	oOption.location = false;
	oOption.directories = false;
	oOption.status = false;
	oOption.dependent = false;
	var sOptions = oOption.build();
	window.open(winlink, null, sOptions);
	}
	
	function addElement(rootElementID, content) {
		$(rootElementID).append(content);
	}
	
	/**************************************************************
	 * End of functions used to display a pop up
	 ***************************************************************/
      
	/**************************************************************
	 * trim function for ie's Start:*******************************
	 *************************************************************/
	// Adding trim function to String object
	if(typeof String.prototype.trim !== 'function') {
	  String.prototype.trim = function() {
	    return this.replace(/^\s+|\s+$/g, '');
	  }
	}
	/**************************************************************
	 * trim function for ie's End*******************************
	 *************************************************************/
	
	
	/**************************************************************
	 * Start of function for pinterest url and media***************
	 *************************************************************/
	function createPinterestLink(urlProduct,imageUrl,productDescription){
		var tempUrl = 'http://pinterest.com/pin/create/button/?'+encodeURI("url="+urlProduct+"&media="+imageUrl+"&maskuse=off&wid=1119&size=1121,1254&fit=crop&qlt=70,0&description="+productDescription);
		//alert(tempUrl);
		popup(tempUrl, 'pinterest', 655, 300, true);
	}
	/**************************************************************
	 * End of function for pinterest url and media***************
	 *************************************************************/
	
	
	/**************************************************************
	 * Start of function to create facebook iframe ****************
	 *************************************************************/
	function createFacebookLink(urlProduct,colorCode){
		if(urlProduct == ''){
			urlProduct = "www.justice.com";
		}
		var tempUrl = '<iframe src="//www.facebook.com/plugins/like.php?api_key=240710779389081&amp;href=http://'+urlProduct+'?colorCode='+ encodeURI(colorCode) +'&amp;send=false&amp;layout=box_count&locale=en_US&amp;node_type=link&amp;sdk=joey&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=90" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:50px; height:90px;" allowTransparency="true"></iframe>';
		//console.log(tempUrl);
		$('#facebookIframe').html(tempUrl);
	}
	/**************************************************************
	 * End of function to create facebook iframe*******************
	 *************************************************************/
	
	/**
	 * Needed for ie8
	 */
	function checkBoxClick() {
		this.blur();
		this.focus();
	}
	
	
	/**************************************************************
	 * Start of function to change the select tag color ****************
	 *************************************************************/
	function changeSelectColor(){
		$("select").each(function() {
			var selectOption = $(this).val();
			if(selectOption === "0" || selectOption === "" || selectOption === null){
				$(this).css({'color': '#666'});
			}else{
				$(this).css({'color': '#333'});	
			}
		});
		
		$('select').change(function() {
			if ($(this).val() === "0" || $(this).val() === "" || $(this).val() === null){
				$(this).css({'color': '#666'});
			}else{
				$(this).css({'color': '#333'});	
			}
		});
	}
	/**************************************************************
	 * End of function to change the select tag color ****************
	 *************************************************************/
	
	/**
	* handles error message on product details page
	*/
	function setError(msg, resetMsg, productId, clook, isNote, noBorder){
		var messageField = 'addItemTocartError';
		
		clook = clook || 'false';
		isNote =  isNote || false;
		noBorder = noBorder || false;
		
		if(isNote){
			messageField = 'itemPresellMsg'
		}
		
		if (clook == 'true') {
			messageField = 'clookAddItemTocartError';
			if(isNote){
				messageField = 'clookItemPresellMsg'
			}
		}
		
		if(resetMsg){
			$("#"+messageField+productId).html('');
			$("#"+messageField+productId).hide();
		} else {
				msgDiv = $('<div>'+msg+'</div>');
				if(productId == "" || productId == undefined){
					//show an error message when is no product id related
					return msgDiv.addClass('error-message');
				}else{
					currentMessage = $("#"+messageField+productId).text();
					addMessage = currentMessage.indexOf(msg);
					if(addMessage < 0){
						$("#"+messageField+productId).append(msgDiv);
					}	
					if(noBorder){
						$("#"+messageField+productId).css('border', 'none');
					}
					
					$("#"+messageField+productId).show();
				}
		}
		//Te following function was commented out since this was provocating firefox and ie7 to display the social icons upper and upper each time the add to bag button was clicked.
		/*$("#shareItWrapper").css('margin-top', parseInt($("#shareItWrapper").css('margin-top')) - $("#"+addItemTocartError+productId).outerHeight());*/
	}
	
	  function navigationMenu(){
   //START MEGAMENU FUNCTION
      var cur = "";
       var orgTxt=""; //set value of input boxes back to orginal text
      
       //  Mouse going out of the Megamenu area //
       $(".mainbodyWrapper.main-menu").hoverIntent({
	    	over:	function(){
	    				$(".navigationMegaBox").css('display', 'none');
	    				$(".innerNavigationCell").removeClass("innerNavigationCellActive");
	    			},   		
	    	out: null,
	    	timeout:200,
	    	interval:200
      	});
       
       $("#atg_store_contentContainer").hoverIntent({
	    	over:	function(){
	    				$(".navigationMegaBox").css('display', 'none');
	    				$(".innerNavigationCell").removeClass("innerNavigationCellActive");
	    			},   		
	    	out: null,
	    	timeout:200,
	    	interval:200
      	});
                      
       // END - Mouse going out of the Megamenu area // 
       jQuery(".innerNavigationCell").hoverIntent({
    	   over: function() {
    		   var navigationCell = jQuery(this);
    		   var navigationCellNumber = navigationCell.attr("id");
    		   var navigationMegaBox = jQuery("#navigationMegaBox_" + navigationCellNumber) 
    		   
    		   jQuery("div.navigationMegaBox").css('display', 'none');
    		   jQuery(".innerNavigationCell").removeClass("innerNavigationCellActive");
    		   
    		   navigationCell.addClass("innerNavigationCellActive");
    		   
    		   navigationMegaBox.css("display", "block");
    		   navigationMegaBox.hover(
    				   function() {
    					   // NOOP
    				   }, 
    				   function() {
    					   jQuery(this).css("display", "none");
    					   navigationCell.removeClass("innerNavigationCellActive");
    				   }
			   );
    		   
    		   var items = {};
    		   navigationMegaBox.find(".tier2Container > div").each(function() {
    			   var className = jQuery(this).attr("class").split(" ").pop();
    			   if (!items[className]) items[className] = [];
    			   items[className][items[className].length] = jQuery(this);
    		   });
    		   
    		   jQuery.each(items, function(rowNumber, rowValue) {
    			   var maxHeaderHeight = 0;
    			   
    			   jQuery.each(rowValue, function(key, value) {
    				   var headerHeight = value.children("h3").height();
    				   
    				   if (headerHeight > maxHeaderHeight) {
    					   maxHeaderHeight = headerHeight;
    				   }
    			   });
    			   
    			   jQuery.each(rowValue, function(key, value) {
    				   value.children("h3.megaMenuHeader").height(maxHeaderHeight); 
    			   });
    		   });
    		   
    	   },
    	   
    	   out: null
       });
       
      $("input[type=text]").on( "click", function(event) {
         event.preventDefault();
         orgTxt = $(this).val();
         if (jQuery(this).attr("id") == "searchText") {
             $(this).removeAttr('value').addClass("standardTxt");
         } else {
             $(this).addClass("standardTxt");
         }
        
      });
      
      //END MEGAMENU FUNCTION
   }
	  
     // Set same size for all matching elements
     function evenHeight(element){
        var elementArray =  jQuery(element);
        var maxH=0;
           jQuery.each(elementArray, function(index, val) {
              if (jQuery(val).height() > maxH){
                 maxH = jQuery(val).height();
              }
            });
            jQuery.each(elementArray, function(index, val) {
              jQuery(val).height(maxH);
            });
     }
	  
	  
	  
	  
	  

// Function for disappearing text in the search box 
function disappearText(){
   $("#searchText").val("");
}

// Function for appearing text in the search box and cleaning the text in the real input 
function appearText(){
   $("#searchText").val("Search Keyword or Item #");
   $("#searchTextReal").val("");
}

// Function for disappearing text in email address box
function disappearEmailText(){
	if($("#signUp").val() == "Enter Email Address" ){
		$("#signUp").val("");
	}
}

// Function for appearing text in email address box and cleaning the text in the real input 
function appearEmailText(){
	var email=$("#signUp").val();
	if(email!=null && email.trim()==""){
		$("#signUp").val("Enter Email Address");
	}
}


//Function used in home page
function redirectTonewsLetter(){
	window.location.href="/sweepstakes";
}

//Function used in home page
function redirectMilstarLoginButton(){
   window.location.href="https://www.MyECP.com";
}

/**
* Handles email sign up
*/
function searchEmailSignupKeyPress(e, contextPath) {
   if (window.event) { e = window.event; }
   if (e.keyCode == 13) {
	  e.cancelBubble = true;
	  e.returnValue = false;
      emailSignupRedirect(contextPath);
   }
}

function emailSignupRedirect(contextPath) {
	if(window.emailSignUpFooter != undefined){
		var email = emailSignUpFooter.email.value;
		var url = contextPath + '/account/profile';
	}else{
		var email = $(".footerSocial input#signUp").val();
		var url = contextPath + '/account/profile';
	}
	window.location = url;
}

function submitSearchForm(form, queryId){
    var query = escape($("#" + queryId).val());
    var tempText = $("#searchText").val();
    
    if (typeof query != "undefined" && query != "" && tempText.toLowerCase() != "search keyword or item #") {
        window.location.href = form.action + "?Ntt=" + query;
    }
    else {
        location.reload();
    }
    return false;
    
}

function searchKeyword(){
	var url = null;
	var searchTerm = $('.headerInput').val();
	if(searchTerm == "Search Keyword or Item #" || searchTerm == ""){
		appearText();
		return false;
	}else{
		return true;
	}
}

function searchKeywordNR(){
	var url = null;
	var searchTerm = $('.headerInputNR').val();
	if(searchTerm == "Search Keyword or Item #" || searchTerm == ""){
	appearText();
	return false;
	}else{
	return true;
	}
	} 

/*
 * Function required when an input is not valid and the border should be red
 * colored
 */
  function addInputError(selector) {
     addInputError(selector, "");
  }
  
  function addInputError(selector, message) {
     jQuery(document).ready(function() {
         $(selector).addClass("error");
         $(selector).append(message);
     });
  }
  
  /**
   * Function to display content on an overlay
   * @param url		- url to display
   * @param oOptions	- user options for overlay behavior
   */
  function displayModal(url,pOptions){
  	
  	var defaults = {minWidth:640, minHeight:460, escClose:false}
  	var options = $.extend({}, defaults, pOptions);
  	
  	if(undefined != url && '' != url){
  		closeModal();
  		$("#modalWindow").empty()
  		$("#modalWindow").addClass("modal-container");
  		$("#modalWindow").load( url, function( response, status, xhr ) {
  			if(status == "success"){
  				$("#modalWindow").html(response);
  				// Set Scroll Vertical ScrollBars If Content expands greater that window height
  				$("#modalWindow").css({"height":($(window).height()-20)+"px","overflow":"auto","margin-left":"auto","margin-right":"auto"});  				
  				$(window).on("resize",function(){
  					if($("#modalWindow > .modal").length){
  						$("#modalWindow").css({"height":($(window).height()-20)+"px"});
  						if($("#modalWindow .modal").outerHeight(true) > $("#modalWindow").height()){
  							$("#modalWindow > .modal").css("margin-top","0");
  						}else{
  							$("#modalWindow > .modal").attr("style",$("#modalWindow > .modal").attr("style").replace("margin-top: 0",";"));
  						}
  						
  						if($("#modalWindow").height() < $("#modalWindow > .modal").outerHeight(true)){
  		  					$("#modalWindow > .modal").css("margin-top","0");
  		  				}else{
  		  					$("#modalWindow > .modal").css("margin-top",(($("#modalWindow").height()/2)-($("#modalWindow > .modal").innerHeight()/2))+"px");
  		  				}
  					}
  				});
  				
  				if($("#modalWindow link").length){
  					window.modalCssFound = 0;
	  				window.modalCssLoadCheckInterval = setInterval(function(){
	  					for(i=0; i< document.styleSheets.length; i++){
	  						for(j=0;j<$("#modalWindow link").length;j++){
	  							if(document.styleSheets[i].href !== null && document.styleSheets[i].href.toString().indexOf($("#modalWindow link").eq(j).attr("href")) > -1){
	  	  							window.modalCssFound++;
	  	  						}
	  						}  						
	  	  				}
	  					if(window.modalCssFound >= $("#modalWindow link").length){
	  						clearInterval(modalCssLoadCheckInterval);	  						
	  						$("#modalWindow").css({"width":($("#modalWindow > .modal").innerWidth()+20)+"px"});
	  						if($("#modalWindow .modal").outerHeight(true) > $("#modalWindow").height()){
	  							$("#modalWindow > .modal").css("margin-top","0");
	  						}
	  						if($("#modalWindow").height() < $("#modalWindow > .modal").outerHeight(true)){
	  		  					$("#modalWindow > .modal").css("margin-top","0");
	  		  				}else{
	  		  					$("#modalWindow > .modal").css("margin-top",(($("#modalWindow").height()/2)-($("#modalWindow > .modal").innerHeight()/2))+"px");
	  		  				}
	  					}	  					
	  				},1500); 
  				}else{
  					var loadedImages = 0;
  					$("#modalWindow > .modal img").on("load error",function(){
  						loadedImages++;
  					});
  					window.modalImgLoadCheckInterval = setInterval(function(){
  						if($("#modalWindow > .modal img").length == loadedImages){
  							clearInterval(modalImgLoadCheckInterval);
  							$("#modalWindow").css({"width":($("#modalWindow > .modal").innerWidth()+20)+"px"});
  							if($("#modalWindow .modal").outerHeight(true) > $("#modalWindow").height()){
  								$("#modalWindow > .modal").css("margin-top","0");
  							}
  							if($("#modalWindow").height() < $("#modalWindow > .modal").outerHeight(true)){
  			  					$("#modalWindow > .modal").css("margin-top","0");
  			  				}else{
  			  					$("#modalWindow > .modal").css("margin-top",(($("#modalWindow").height()/2)-($("#modalWindow > .modal").innerHeight()/2))+"px");
  			  				}
  						}
  					},1500);  					
  				}
  			}
  		});
  		
  		$("#modalWindow").modal(options);
  		$("#simplemodal-overlay").css("cursor","default");
  	}
  	
  }
  
  /**
   * Do a modal proper closing
   */
  function closeModal() {
      jQuery.modal.close();
      $("#modalWindow").empty()
      jQuery("#modalWindow").removeClass("modal-container");
      // unload zoom in case is active
      unloadMagicZoom();
  }
  
  /**
   * Find out if the modal window is active
   * @returns {Boolean}
   */
  function isModalActive(){
	  var isActive = false;
	  var content = $('#modalWindow').html(); 
	  
	  if(undefined != content && '' != content ){
		  isActive = true;
	  }
	  
	  return isActive;
  }
  
  /** Zoom scripts */
  function loadMagicZoomPlus(originalImage, pathOfLargeImage){
      
      $('#'+originalImage).addimagezoom({ // single image zoom
          zoomrange: [3, 10],
          magnifiersize: [500,400],
          magnifierpos: 'right',
          cursorshade: true,
          largeimage: pathOfLargeImage 
      });
  }

  /**
   * Function to turn off the magic zoom when there is no need  to keep it running
   */
  function unloadMagicZoom(){
  	//Zoom uses 4 divs to display content, remove them to shut it of
	$('.zoomstatus, .magnifyarea, .cursorshade, .zoomtracker').remove();
  	
  }

/*
 * cart icon item count update function
 */
function updateCartIconItemCount(count){
	if($(".cartIconItemCount").length > 0){
		if(count != 0){
			$(".cartIconItemCount").html(count);
		}else{
			$(".cartIconItemCount").html("");
		}	
	}
}

/**
* Handler to display a generic error message proving a section to display
*/
function setError(msg, resetMsg, productId){
    if(resetMsg){
        $("#addItemTocartError"+productId+"").html("")
        $("#addItemTocartError"+productId+"").hide();
    } else {
        $("#addItemTocartError"+productId+"").show();
        $("#addItemTocartError"+productId+"").html(msg);
    }
}

function formSweepStakesIframeSource(){
	var sweepStakesHiddenValue = $('#sweepStakesHiddenField').val();
	if(sweepStakesHiddenValue != null && sweepStakesHiddenValue != 'undefined'){
		var sweepsFrameSrc = $('iframe#sweeps').attr('src');
		sweepsFrameSrc = sweepsFrameSrc + sweepStakesHiddenValue;
		$('iframe#sweeps').attr('src',sweepsFrameSrc);
	}
}

