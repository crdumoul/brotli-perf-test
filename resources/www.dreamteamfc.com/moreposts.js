jQuery(function(){

	jQuery('#moreposts').click(function(){
		
		var getpage = jQuery(this).attr('page');
		
			$.ajax({
				type: 'POST',
				url: ajaxurl,
				data: {
					action: 'posts_ajax',
					page: getpage
				},
				success: function(data) {
					$('#main-content').append(data);
				},

				error: function(MLHttpRequest, textStatus, errorThrown){
					alert(errorThrown);
				}
			});
		
	});
	
});
