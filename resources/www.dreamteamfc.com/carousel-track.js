jQuery(function(){


	jQuery(window).on('hashchange',function(){
		if(location.hash.toLowerCase().indexOf("jp-carousel-") >= 0){
			var imageid = location.hash.replace('#', '');
			//var url = location.protocol+'//'+location.host+location.pathname;
			var catslug = jQuery('article.article').attr('catslug');

			//console.log('tracking: '+imageid+' in category '+catslug);
			
			utag.view({
				page_name : "gallery image:" + imageid,
				page_section : catslug,
				page_type : "gallery image",
				utag_copy : true
			});
		}
	});
 
});