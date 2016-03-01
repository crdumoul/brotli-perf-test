jQuery(function(){
   
  
   var cur = "";
   var orgTxt = ""; //set value of input boxes back to original text

//   jQuery("div.innerNavigationCell").hover(function(){
//      cur = jQuery(this).attr('id');
//      jQuery(this).addClass("innerNavigationCellActive");
//      jQuery("#apparelMenu_" + cur).css('display', 'block');
//      
//      jQuery("#apparelMenu_" + cur).hover(function(){
//         jQuery("#apparelMenu_" + cur).css('display', 'block');
//         jQuery("#" + cur).addClass("innerNavigationCellActive");
//      }, function(){
//         jQuery("#apparelMenu_" + cur).css('display', 'none');
//         jQuery("div.innerNavigationCell").removeClass("innerNavigationCellActive");
//         });
//   }, function(){
//            jQuery("#apparelMenu_" + cur).css('display', 'none');
//            jQuery("div.innerNavigationCell").removeClass("innerNavigationCellActive");
//      }
//   );
   
   /* Function to change the height of the Cells in NavigationMegaBox  and 
      add the navigationHeaderImg to the cell with the image.
   */
   jQuery(window).load(function() {
      jQuery(".navigationMegaBox").each(function (index){
         jQuery(this).css('visibility', 'hidden');
         jQuery(this).css('display', 'block');
         var maxHeightCell = 0;
         var countCell = 0;
         var findImage = false;
         
         jQuery(this).children().each(function(indexCell) {
            if(maxHeightCell < jQuery(this).height()) {
               maxHeightCell = jQuery(this).height();
            }
            countCell++;
            
            if(jQuery(this).find('h3.megaMenuHeader').length == 0) {
               jQuery(this).addClass('navigationHeaderImg');
               findImage = true;
            }
         });
         
         /* This section remove the navigationMegaCellsBorder to the last Cell if the menu
            has an image in the last cell, we need to remove "navigationMegaCellsBorder" class from
            the last two cells
         */
         jQuery(this).children().eq(countCell-1).removeClass('navigationMegaCellsBorder');
         
         if(findImage) {
            jQuery(this).children().eq(countCell-2).removeClass('navigationMegaCellsBorder');
         }
         
         for(var cell=0; cell < countCell; cell++){
            jQuery(this).children().eq(cell).css('height', maxHeightCell);
         }
         
         jQuery(this).css('visibility', '');
         jQuery(this).css('display', 'none');
      });
   });
   
   jQuery("input[type=text]").on("click", function(event){
      event.preventDefault();
      orgTxt = jQuery(this).val();
      if (jQuery(this).attr("id") == "searchText") {
          $(this).removeAttr('value').addClass("standardTxt");
      } else {
          $(this).addClass("standardTxt");
      }
   });

   /* If we find elements to center vertically then load the script */
   if (jQuery(".va").length > 0) {
      jQuery(document).ready(function(){
         jQuery.getScript("/ux/common/js/vertical-align.js", function(){
            jQuery(".va").vAlign();
         });
      });
   }

   checkedGeneralInput();
   initiateHoverImage();
   if(window.navigator){
	   if(navigator.userAgent.toString().indexOf("MSIE 8.0") > -1 || navigator.userAgent.toString().indexOf("MSIE 9.0") > -1){
		   setStylishDropDown();
	   }
   }
});


/***************************************************************************************
   generic function to change the checked image on Checkbox input fields
****************************************************************************************/
function checkedGeneralInput() {
   jQuery('body').on("click","input[type='checkbox']",function(e){
	  $(this).next("label").removeClass("checked");
 	  $(this).next().next("label").removeClass("checked");
      if($(this).is(":checked")){
    	  $(this).next("label").addClass("checked");
    	  $(this).next().next("label").addClass("checked");
    	  $(this).addClass("checked");
      }else{
    	  $(this).removeClass("checked");
      }
      $("input[type='checkbox'],input[type='radio']").next("label").addClass("refresh").removeClass("refresh");
      $("input[type='checkbox']+input[type=hidden],input[type='radio']+input[type=hidden]").next("label").addClass("refresh").removeClass("refresh");
   });
   
   jQuery('body').on("click",'input[type="radio"]:not(:disabled)',function(e){
	   jQuery("body").find('input[name="'+jQuery(this).attr("name")+'"]').next("label").removeClass("checked");
	   jQuery("body").find('input[name="'+jQuery(this).attr("name")+'"]').next().next("label").removeClass("checked");
	   jQuery(this).next("label").addClass("checked");
	   jQuery(this).next().next("label").addClass("checked");
	   $("input[type='checkbox'],input[type='radio']").next("label").addClass("refresh").removeClass("refresh");
	   $("input[type='checkbox']+input[type=hidden],input[type='radio']+input[type=hidden]").next("label").addClass("refresh").removeClass("refresh");
   });
}

/***************************************************************************************
generic function to change close button hover image
****************************************************************************************/
function initiateHoverImage(){
	// close button
	$("body").on("mouseover","img[src*='closeModal14x14.png'],img[src*='close-button.png']",function(){
		var extension = $(this).attr("src").substring($(this).attr("src").lastIndexOf("."));
		var fileName = $(this).attr("src").substring(0,$(this).attr("src").lastIndexOf("."));
		$(this).attr("src",fileName+"-hover"+extension);
		
		$(this).off("mouseout").on("mouseout",function(){
			var extension = $(this).attr("src").substring($(this).attr("src").lastIndexOf("."));
			var fileName = $(this).attr("src").substring(0,$(this).attr("src").lastIndexOf("-hover"));
			$(this).attr("src",fileName+extension);
		});
	});	
}

function setStylishDropDown(){
	$("select").each(function(){
		if($(this).parent(".outer-cover").length == 0 && $(this).closest(".selectstyle").length == 0){
			var marginVal = $(this).css("margin");
			if($(this).css("margin") == ""){
				marginVal = 0;
			}
			$(this).wrap('<div class=\'outer-cover\' style=\'position:relative;background-image:url(/ux/themes/main/common/img/dropdown_blue_arrow.png);background-position:right center;background-repeat:no-repeat;background-color:#ffffff;height:'+$(this).outerHeight()+'px;line-height:'+$(this).outerHeight()+'px;width:'+($(this).width()-16)+'px;padding-left:10px;display:inline-block;vertical-align:middle;padding-right:26px;margin:'+marginVal+';overflow:hidden;\'></div>');
			$(this).css({"position":"absolute","width":"auto","right":"0","top":"0","opacity":"0","background-image":"none","background-color":"transparent","padding":"0","margin":"0"});
			$(this).parent().append("<span>"+$(this).find("option:selected").text()+"</span>");			
		}
	});
	$("select").on("change",function(){
		if($(this).parent(".outer-cover").length){
			$(this).next("span").text($(this).find("option:selected").text());
			$(this).parent(".outer-cover").css({"width":($(this).width()-16)+"px"});
		}
	});	
}

/*Popup*/

$( 'a[href="#"]' ).click( function(e) {
      e.preventDefault();
   } );

function closepopup(){
   $('.popup').fadeOut('slow');
   $('.popup-overlay').fadeOut('slow');
   return false;
}

$('.shipped-to-popup').click(function(){
     $('#shipped-popup').fadeIn('slow');
     $('.popup-overlay').fadeIn('slow');
     $('.popup-overlay').height($(window).height());
     return false;
 });


$('.billed-to').click(function(){
     $('#popup').fadeIn('slow');
     $('.popup-overlay').fadeIn('slow');
     $('.popup-overlay').height($(window).height());
     return false;
 });

 $('.close').click(function(){
     closepopup();
 });