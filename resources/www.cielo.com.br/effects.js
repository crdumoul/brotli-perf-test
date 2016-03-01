var hoverEffects = function()
{
	return { 
		init: function () { 
            /*
            $(".bt").each(function(index, el) {
               var el = $(this);

                var originalColor = el.css('background');
                var hoverColor;

                el.hover(function() {
                    if( !hoverColor ) {
                        hoverColor = el.css('background');
                        el.css('background',originalColor);
                    }
                    el.animate({background:hoverColor}, "slide");
                },function(){
                    el.animate({background:originalColor}, "slide");
                });
            });

			/*$("a:not([role='option'])").each(function(index, val) {
                 var el = $(this);

                var originalColor = el.css('background-color');
                var hoverColor;

                el.hover(function() {
                    if( !hoverColor ) {
                        hoverColor = el.css('background-color');
                        el.css('background-color',originalColor);
                    }
                    el.animate({backgroundColor:hoverColor}, "slide");
                },function(){
                    el.animate({backgroundColor:originalColor}, "slide");
                });
            });*/
		}
	};
	
}(); 