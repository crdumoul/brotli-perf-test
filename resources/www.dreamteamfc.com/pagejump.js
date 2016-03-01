jQuery(function(){
	jQuery(window).on('hashchange', function() {
		if(window.location.hash == ''){

			var thispage = window.location.pathname;
			history.pushState(document.referrer, '', document.referrer);
			history.pushState('', document.title, thispage);
			

			window.addEventListener('popstate', function(event) {
				if(event.state) window.location.href = event.state;
			});
		}
	});

});
