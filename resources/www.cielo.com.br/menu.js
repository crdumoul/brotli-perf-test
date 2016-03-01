/*
Utiliza o js: jquery.smooth-scroll.js
*/

var menuFixo = function()
{
	return { 
		init: function () {
			var top = $(".menuFixo");
			var array = new Array();
			
			
            $(window).scroll(function () {
                var scroll = $(window).scrollTop();

                if (scroll >= 87) {
                    $(".ctnt-menuFixo").css("position", "fixed");
                    $(".ctnt-menuFixo").css("top", "0%");
					// $(".ctnt-menuFixo .cielo28x28").animate({ "margin" : "29px 15px 0 0" }, 600);
					
                } else {
                    $('.ctnt-menuFixo').css('position', 'relative');
                    $('.ctnt-menuFixo').css('top', '0');
					// $(".ctnt-menuFixo .cielo28x28").stop(true,true).animate({"margin" : "29px 15px 0 -30px" }, 600);
                }
            });
            
            $(".areaTitle-txt a").click(function(){ 
                
                var link = this;
                
                $.smoothScroll({
                    scrollTarget: link.hash,
                    //offset: Eoffset,
                    easing:'easeOutQuart',
                    speed: 2000
                    //exclude: ['.rough','#chunky'] // adicionar execess�es
                });
                
            });

			//ancoras
			$('.menuFixo ul a').click(function(e) {

				e.preventDefault();

				$('.menuFixo ul a').each(function() {
					$(this).removeClass("actv");
				});

				$(this).addClass("actv");
				
				var link = this;
				var posScroll = $(window).scrollTop();
				var Eoffset = 0;
				if (posScroll > 90){
					Eoffset = -95;

				} else {
					Eoffset = -90;
				}

				var isIE8 = $("html").hasClass('ie8');

				if (!isIE8) {

					$.smoothScroll({
						scrollTarget: link.hash,
						offset: Eoffset,
						easing:'easeOutQuart',
						speed: 2000
						//exclude: ['.rough','#chunky'] // adicionar execess�es
					});
				} else{
					var id = $(this).attr("href");
					var objScroll = $(id).offset().top;
					var finalScroll = 0;
					if (posScroll > 0){
						finalScroll = (objScroll - 95);
					} else {
						finalScroll = (objScroll - 194);
					}
				
					$("html").scrollTop( finalScroll );
				}
			}); 
		}
	};
}(); 


/*
Utiliza o js: sly.min.js
*/
var menuFixoMobile = function (){
	
	return {

		init: function(){ 
			
			$(".frameBasic ul li:first").removeClass("active");
			
			var frame = new Sly('.menuFixo .frameBasic', {
				horizontal: 1,
				itemNav: 'basic',
				smart: 1,
				activateOn: null,
				mouseDragging: 1,
				touchDragging: 1,
				releaseSwing: 1,
				//startAt: 3,
				scrollBy: 1,
				speed: 300,
				elasticBounds: 1,
				easing: 'easeOutExpo',
				dragHandle: 1,
				dynamicHandle: 1
				
			}, { 
				load: function(){ 
					var width = $(".frameBasic ul").width();
					var newWidth = (new Number(width) +  30);
					$(".frameBasic ul").width(newWidth);
					$(".frameBasic").css("visibility" , "visible"); 
				}
			}).init();
		}
	};
}();


var menuHeaderMobile = function (){
	
	return {
		init: function(){ 
			$(".abre-menu").click(function(event) {
				event.preventDefault();
				event.stopPropagation();
				
				$("header ul").slideDown('slow');
				$(".abre-menu").hide();
				$(".fecha-menu").show();

			});

			$(".fecha-menu").click(function(event) {
				event.preventDefault();
				event.stopPropagation();

				$("header ul").slideUp('slow');
				
				$(".fecha-menu").hide();
				$(".abre-menu").show();
			});

			$("body").click(function(event) {
				if (!$(".fecha-menu").is(':hidden')) {
					
					$("header ul").slideUp('slow');
					
					$(".fecha-menu").hide();
					$(".abre-menu").show();
				}
			});
		}
	};
}();                                                                                                                                                                                                                                                                                                                     



var menuFixoAjustaMargem = function()
{
	return { 
		init: function () {
			$(window).scroll(function () {

				if (!isMobile) {
					if($(".menuFixo")) {
			                var scroll = $(window).scrollTop();

			                if (scroll >= 90) {
			                    $("main").css({
			                        marginTop: '108px'
			                    });
			                } else {
			                    $("main").css({
			                        marginTop: '0'
			                    });
			                }
			    		
					}
				}
    		});
		}
	};
}();
