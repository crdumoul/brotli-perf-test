/*
	----------------------------
	Modal Script
	----------------------------

	-Description: displays modal window html overlay

	use:
		<script data-minify="js" src="../../scripts/ads/all-notrid/modal-window.js"></script>

	for videos also include:
		<script data-minify="js" src="../../scripts/ads/all-notrid/add-brightcove.js"></script>


	*Requires
		<link data-minify="css" rel="stylesheet" type="text/css" href="../../system/styles/ads/all-notrid/modal-window.css" media="screen" />

*/

jQuery(function() {

	// add modal canvas wrapper to the dom
	var modalCanvasTpl = '<div id="modal-canvas"></div>';
	jQuery('body').prepend(modalCanvasTpl);

	// load script from Brightcove and initialize
	//if (jQuery('a.modal.video').length) getBrightcove();

	// open overlay
	jQuery('body').on('click', 'a.modal', function(e) {
		e.preventDefault();

		var target = jQuery(this).attr('href'),
			width = jQuery(this).attr('data-width') || 600;
		// call overlay from dom content if not referencing video in overlay
		jQuery(target).clone().width(width).appendTo(jQuery('#modal-canvas').show()).show();

		// video content is often wider - adjust accordingly
		//if (jQuery('.modal-body object')) jQuery('.modal.video').width(jQuery('.modal-body').width() + 40);

	});

	// close overlay click
	jQuery('body').on('click.modal', '.close, #btn-decline', function(e) {
		e.preventDefault();
		jQuery(this).closest('#modal-canvas').empty().hide();
		//jQuery(document).unbind('click.modal');
	});

	// close overlay click "esc"
	jQuery(document).on('keyup.modal', function(e) {
		if ((e.keyCode == 27) && (jQuery('#modal-canvas .close').is(':visible'))) {
			jQuery('#modal-canvas .close').trigger('click');
			//jQuery(document).unbind('keyup.modal');
		}
	});

	// close modal clicking on background overlay
	jQuery('#modal-canvas').on('click.modal', function(event) {
		if (event.target === this) {
			// console.log('modal overlay clicked!');
			jQuery('#modal-canvas .close').trigger('click');
		}
	});

	jQuery('body').on('click', '#modal-canvas .modal-nav a, #modal-canvas a.next, #modal-canvas a.prev', function(e) {
		e.preventDefault();
		var modalId = jQuery(this).attr('href').replace('#', '');
		var modalHtml = jQuery(jQuery(this).attr('href')).not('#modal-canvas').find('.modal-body').html();
		jQuery('#modal-canvas > .modal').attr('id', modalId).find('.modal-body').html(modalHtml);
		jQuery('#modal-canvas').show();
	});

});