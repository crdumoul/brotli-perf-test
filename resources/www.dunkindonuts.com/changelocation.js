/**
 * Change location jquery plugin. To see supported html structure please go to apps/dunkindonuts/components/changelocation/changelocation.jsp
 * @see apps/dunkindonuts/components/changelocation/changelocation.jsp
 * @author Ilya Mestnikov
 * @version 1.0
 * @param <code>options</code> contains the following fields:
 * - url: url to submit request.
 * - ... 
 */
var doLocationSearch;
(function($){
	
	/**
	 * US zip validator
	 */
	function isValidUSZip(sZip) {
	   return /^\d{5}(-\d{4})?$/.test(sZip);
	}

	doLocationSearch = function (){
	    $.ajax({
	        url:url ,
	        dataType: 'jsonp',
	        crossDomain: true,
	        //async:false,
	        data:
	        {
	            key: key,
	            origin: origin,
	            radius: radius,
	            hostedData: hostedData,
	            maxMatches: maxMatches,
	            ambiguities: 'ignore'
	        },
	        success: function(data)
	        {   
                var lResponse = data;   
                if (data.searchResults != null && data.searchResults != 'undefined'){
                    if (data.searchResults[0].fields.dma_cd !=null && data.searchResults[0].fields.dma_cd!= 'undefined'){                     
                    $('.locationText').html(data.searchResults[0].fields.city + ', ' + data.searchResults[0].fields.state+ ' ' + data.searchResults[0].fields.postal);
                    //Assign variable for Closest store search
                    currentDMAWidget = data.searchResults[0].fields.postal;   
                    // create Cookie for future use
                    createCookie('DMA',data.searchResults[0].fields.city +":" + data.searchResults[0].fields.state + ":" + data.searchResults[0].fields.postal+":" + data.searchResults[0].fields.dma_cd +":" + origin ,'7');  
                    }
                              
                }
               else
                {        
                           //White%20Plains%3ANY%3A10601%3A501%3A4.23.179.144
                    $('.locationText').html(defaultCity + ', ' + defaultState+ ' ' + defaultZip);
                    currentDMAWidget = defaultZip;                    
                    // create Cookie for future use
                    createCookie('DMA',defaultCity +":" + defaultState + ":" + defaultZip+":" + defaultDMA +":" + origin ,dmaCookieDays);                  
                }  
            },
	        error: function(e)
	        {
	           alert(e.message);
	        }
	    }); 
	}
	
	$.fn.extend({
		changelocation: function(options) {
			 var o = $.extend({
				view: "#locationView",
				edit: "#locationEdit",
				loginLink: "#changingLocation .logout",
				changeBtn: "#changeLocation",
				changeInput: "input[name=locationInput]",
				cancelBtn: "#locationUpdateCancel",
				updateBtn: "#locationUpdate",
				locationText: ".locationText",
				locationError: "#locationError",
				suggestionMessage: CQ.I18n.getMessage("changelocation.zip"),
				errorMessage: CQ.I18n.getMessage("changelocation.validzip")
			}, options);
			
			return $(this).each(function() {
				var view = $(o.view); //view block
				var edit = $(o.edit); // edit block
				var loginLink = $(o.loginLink); //login link
				var changeBtn = $(o.changeBtn, view); // button to change from view to edit
				var cancelBtn = $(o.cancelBtn, edit); // button to cancel 
				var updateBtn = $(o.updateBtn, edit);
				var changeInput = $(o.changeInput, edit); // location input field
				var locationText = $(o.locationText, view); //block containing formatted location text
				var form = $(this).parent("form");
				changeBtn.click(function(){
					view.hide();
					loginLink.hide();
					edit.show();
					changeInput.val(o.suggestionMessage);
					return false;
				});
				
				changeInput.blur(function() {
					if ($(this).val() == "") {
						$(this).val(o.suggestionMessage);
					}
				});
				
				changeInput.focus(function() {
					if ($(this).val() == o.suggestionMessage) {
						$(this).val("");
					}
				});
				
				cancelBtn.click(function() {
					view.show();
					loginLink.show();
					edit.hide();
					return false;
				});
				
				updateBtn.click(function() {
					form.submit();
					return false;
				});
				
				form.submit(function(){
					var val = changeInput.val();
					if (!isValidUSZip(val)) {
						$(o.locationError, edit).text(o.errorMessage);
						return false;
					}
				});
			});
		}
	});
	
})(jQuery);