$(document).ready(function() {
		Shadowbox.init({
			skipSetup: true
		});
		
		var TOUCH_DEVICE = (typeof document.ontouchstart != "undefined") ? true : false;
		
		if(!TOUCH_DEVICE){
			$('.slide_list_item a').addClass('deskHover');
		}
		
		$('.six_panel_pane').hover(function(){
				$(this).find('div').toggleClass('hover');
		});
		$('.two_panel_pane').hover(function(){
				$(this).find('div').toggleClass('hover');
		});
		
		if(navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/Android/i) != null) {
			$('.pane_txt').addClass('hover');
			$('.shop_now').addClass('hover');
			$('.shop_now_arrow').addClass('hover');
		};
        //Hover animations
        $('.home_video_thumb').hover(function() {
            $(this).stop().animate({
                opacity:.70
            }, 300);
        });
        $('.home_video_thumb').mouseout(function(){
            $(this).stop().animate({
                opacity:1
            }, 100);
        });
        
        $('.home_video_thumb a').on('click', function(evt){
            evt.preventDefault();
            evt.stopPropagation();
            var link = $(this);
            var rels = [];
            var tmp = $(this).attr('rel').split(';');
            for(var i=1; i<tmp.length; i++){
                var t = tmp[i].split('=');
                rels[t[0]] = t[1];
            }
            Shadowbox.open({
                content: link.attr('href'),
                player: 'inline',
                height: rels['height'],
                width: rels['width']
            });
        });
		
    });