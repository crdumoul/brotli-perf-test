jQuery(document).ready(function($) {
	if (jQuery('section.field-body img.media-image').length) {
        // Process the inline images to add extra fields/attributes
        processInlineImages('section.field-body img.media-image');       
    }
    
	if (jQuery('.tag .channel_left .channel_description img.media-image').length) {
		// Process the inline images to add extra fields/attributes
		processInlineImages('.tag .channel_left .channel_description img.media-image');
		//console.log("processing tag description inline image");
	}

    function processInlineImages(selector) {
        var fids = [];
        var imgselector = 'section.field-body img.media-image';
        
        //jQuery('section.field-body img.media-image').each(function() {
        jQuery(selector).each(function() {

            var classNames = $(this).attr('class').split(/\s+/);
            // iterate over all class  
            jQuery.each(classNames, function(index, item) {
                // Find class that starts with img__fid__
                if(item.indexOf("img__fid__") == 0){
                  // Store it
                  fidClass = item;
                }
            });
            fids.push(fidClass.substring(10));

       });

       var fids_list =fids.join('-');
       // Make an ajax call to fetch extra file fields data for the inline images (added by media module)
       var ajaxUrl = window.location.protocol + '//' + window.location.host+'/'+'api/image-attributes/'+fids_list;
       //ajax call
       jQuery.getJSON(ajaxUrl, function(data, status) {
                if(status == "success") {     
                    // Add caption and credit information to each inline image (added by media module)
                    jQuery.each(fids, function (index, value) {
                        addCaptionCredit(value, data[value]['caption'], data[value]['credit'], selector);
                    });
                }
        });       
    }
    function addCaptionCredit(fid, captiontext, credittext, imgselector) {
    	var inline_img_selector = 'section.field-body img.media-image.img__fid__'+fid;
    	var inline_img_div_style = 'zeus-inline-image-outer';
    	if(imgselector !== 'undefined' && imgselector === '.tag .channel_left .channel_description img.media-image') {
    		inline_img_selector = '.tag .channel_left .channel_description img.media-image.img__fid__'+fid;
    		inline_img_div_style = 'zeus-inline-image-outer tag-inline-image';
    	}

        jQuery(inline_img_selector).each(function()  {

            var imgwidth = jQuery(this).width() ? jQuery(this).width() : false;
            var imgheight = jQuery(this).height() ? jQuery(this).height() : false;
            // Get image alignment and style to apply to container
            if(jQuery(this).attr('align')){
                var alignment = jQuery(this).attr('align');
                jQuery(this).css({'float':alignment}); // add to css float
                jQuery(this).removeAttr('align');
            }else if(jQuery(this).css('float')){
                var alignment = jQuery(this).css('float');
            }else{
                var alignment = 'normal';
            }
            var style = jQuery(this).attr('style') ? jQuery(this).attr('style') : '';

            // Reset img styles as are added to container instead
            jQuery(this).removeAttr('width');
            jQuery(this).removeAttr('height');
            jQuery(this).css('width', '');
            jQuery(this).css('height', '');     
            jQuery(this).removeAttr('align');
            jQuery(this).removeAttr('style');

            //Display inline block so it doesn't break any text aligns on the parent container
            jQuery(this).wrap("<div class=\""+inline_img_div_style+"\"><div class=\"zeus-inline-image-container\" style=\"" + style + "\"></div></div>");
            jQuery(this).parent().addClass('new-image-caption-container-' + alignment);

            // Add dimensions, if available
            var grandparentWidth = jQuery('section.field-body').width();
            
            if(imgwidth && imgwidth == 20){
                jQuery(this).width(grandparentWidth);
                jQuery(this).parent().width(grandparentWidth);
            } else if(imgwidth){
                //jQuery(this).width(imgwidth);
                //jQuery(this).parent().width(imgwidth);
            }
            if(imgheight && imgheight == 20){
            	newimageHeight = grandparentWidth * 3/4;
            	//jQuery(this).height();
            } else if(imgheight){
                //jQuery(this).height(imgheight);
            }

            if (typeof credittext !== 'undefined'  && credittext !== "") {
            	// Append photo credit
            	jQuery(this).parent().append( credittext );
            }
            // Append caption
            if (typeof captiontext !== 'undefined' && captiontext !== "") {
                jQuery(this).parent().parent().append(captiontext);
            }
            
        });
    }
});;
/*
 * search field handling for mobile
 */
zeus.search = function() {
	
	jQuery('.header__region .block-zeus-search').addClass('hidesearch');
	jQuery('.header__region .block-zeus-search .zeus-search-icon').addClass('hidesearch');
	
	jQuery('#zeus-search-field-block-form').submit(function(e) {
		e.preventDefault();//prevent the form from actually submitting
		var searchString = jQuery('input[name=stext]').val(); // get input search string
		var redirectPath = "http://" + window.location.host + "/search/" + jQuery.trim(searchString);
		window.location.href = redirectPath; // redirect to search results page
		
	});
	
	jQuery('#zeus-search-field-form').submit(function(e) {
		e.preventDefault();//prevent the form from actually submitting
		var searchString = jQuery('input[name=searchString]').val(); // get input search string
		var redirectPath = "http://" + window.location.host + "/search/" + jQuery.trim(searchString);
		window.location.href = redirectPath; // redirect to search results page
		
	});
	jQuery('#zeus-search-icon').click(function() {		
		if (jQuery('#zeus-search-form-container').hasClass('show')) {
			// search input field is visible
			var searchString = jQuery('input[name=searchString]').val(); // get input search string
			
			if (jQuery.trim(searchString).length === 0) {
				// if no search string available hide the input field
				jQuery('#zeus-search-form-container').removeClass('show');
				jQuery('.header__region .block-zeus-search').removeClass('showsearch').addClass('hidesearch');
				jQuery('.header__region .block-zeus-search .zeus-search-icon').removeClass('showsearch').addClass('hidesearch');
			} else {
				// if search string available, submit the form to show search results
				jQuery('#zeus-search-field-form').submit();
			}
		} else {
			// search input field not visible, show it onclick
			jQuery('#zeus-search-form-container').addClass('show');
			jQuery('.header__region .block-zeus-search').addClass('showsearch').removeClass('hidesearch');
			jQuery('.header__region .block-zeus-search .zeus-search-icon').addClass('showsearch').removeClass('hidesearch');
		}		
	});
}

/*
 * On ready
 */
jQuery(document).ready(function() {
	
	// Initialize search field
	zeus.search();
	
});;
