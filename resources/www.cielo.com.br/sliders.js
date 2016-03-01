/* Deploy 20140703 */

/*
Utiliza o js: idangerous.swiper-2.1.min.js
*/

var banner;
var depoimentos;

var sliderBanner = function () {
	return {

		init: function () {
			
			
			function animaSaida(){
				
				$(".pagination-content").hide();
			
				//anim��o original
				$( ".anima-03 > h4" ).css('transform', 'rotateX(-135deg)');
				$( ".anima-03 > h4" ).css('-webkit-transform', 'rotateX(-135deg)');

				
				$(".secundaria").each(function(){ 
					$(this).animate({ "bottom" : "-1800px"}, 1000 , function(){ $(this).css({"left" : "-2800px",  "bottom" : "0px" })  });					   
				});
				
				$(".titulo-banner").animate({"right" : "-1800px"}, 1000 );
				$(".subtitulo-banner").animate({"right" : "-1800px"}, 1000 );
				$(".subtitulo-sub").animate({"right" : "-1800px"}, 1000 );
				
				setTimeout(animaEntrada, 1000);
			}
			
			function animaEntrada(){							
				$( ".anima-03 > h4" ).show();
				$( ".anima-03 > h4" ).css('transform', 'rotateX(0deg)');
				$( ".anima-03 > h4" ).css('-webkit-transform', 'rotateX(0deg)');
				
				$(".swiper-slide-active .secundaria").show();
				$(".swiper-slide-active .secundaria").animate({ "left" : "-125px"}, 1000 );	
				
				$(".swiper-slide-active .titulo-banner").animate({"right" : "0px"}, 1000 );
				$(".swiper-slide-active .subtitulo-banner").animate({"right" : "0px"}, 1000 );
				$(".swiper-slide-active .subtitulo-sub").animate({"right" : "0px"}, 1000 );
				

				setTimeout(function(){ 
					$(".pagination-content").fadeIn();
				}, 1000);
				
			}
			
			if (isMobile) {
				
				banner = new Swiper('.slider-banner',{
					pagination: '.paginacao-banner .pagination',
					createPagination: true,
					paginationClickable: true,
					slidesPerView: 1,
					speed:500,
					grabCursor: false,
					loop: true,
					noSwiping: true,
					autoplay: 10000000,
					
				});

			}else{
				
				banner = new Swiper('.slider-banner',{
					pagination: '.paginacao-banner .pagination',
					createPagination: true,
					paginationClickable: true,
					slidesPerView: 1,
					speed:2300,
					autoplay: 10000,
					grabCursor: false,
					loop: true,
					noSwiping: true,
					autoplay: 10000,
					DOMAnimation: false,
					
					onSlideChangeStart: function(banner){
						animaSaida();
					},
					
					onInit:  function(){
					},
					
					onFirstInit: function(){
						animaSaida();
					}
				});
			}
			
			
			$('.paginacao-banner .prev-item').on('click', function (e) {
				e.preventDefault();
				banner.swipePrev();
			});

			$('.paginacao-banner .next-item').on('click', function (e) {
				e.preventDefault();
				banner.swipeNext();

			});
				
				
			if (!isMobile) {
				$(".titulo-botao").each(function() {
					var idx = $(this).data("id-slide");
					var titulo = $(this).val();
					idx = idx - 1;
					$(".paginacao-banner .swiper-pagination-switch:eq("+idx+")").text(titulo);
				});

				$(".paginacao-banner").removeClass('transparent');

			}
		},
	}
}();


/* 
utiliza o plugin jquery.touchSwipe.min.js
*/

var slideDepoimentos = function () {
	return {

		init: function () {
			
            
			
			sliderDepoimentos.init();
            
			

		},
	}
}();



var sliders = [];
var slideMobile = function () {
    return {

        init: function (seletor, paginacao, gotoSlide) {
        	
			if (seletor == null || seletor == "") {
        		seletor = [".swiper-container"];
        		paginacao = [".pagination-content"];
        	}

        	if (gotoSlide == null || gotoSlide == "" || gotoSlide == undefined)
        	{
        		gotoSlide = 0
        	}

        	for (var i = 0; i < seletor.length; i++) {

				//verificar se o seletor existe
				if($(seletor[i]).length > 0)
				{
					var prop = {};
	
					prop['loop'] = true;
					prop['slidesPerView'] = 1;
					prop['grabCursor'] = true;
					prop['paginationClickable'] = true;
					prop['pagination'] = paginacao[i] + " .pagination";
					prop['initialSlide'] = gotoSlide;
					
					var myvar = "mySwiper" + i;
	
					$(paginacao[i]).attr({id: '' + myvar + ''});
	
					sliders[myvar] = new Swiper(''+seletor[i]+'',prop);
				}
	           
	        }

			$('.prev-item').on('click', function (e) {
				e.preventDefault();
				var myvar = $(this).parent().parent().parent().attr("id");
				sliders[myvar].swipePrev();
			});

			$('.next-item').on('click', function (e) {
				e.preventDefault();
				var myvar = $(this).parent().parent().parent().attr("id");
				sliders[myvar].swipeNext();
			});
			
			setTimeout(function(){ $("#carrossel-tef").css("display", "none");}, 1000);


        },
    };

}();




var simplesSlideMobile = function()
{
	return { 
	
		init: function () {
			  
			  var mySwiper = new Swiper('.swiper-container',{
				pagination: '.pagination',
				loop:true,
				grabCursor: true,
				paginationClickable: true
			  });
			  
			  $('.prev-item').on('click', function(e){
				e.preventDefault()
				mySwiper.swipePrev()
			  });
			  
			  $('.next-item').on('click', function(e){
				e.preventDefault()
				mySwiper.swipeNext()
			  });
		},
	};
	
}();


var slideServicos = function() {
	return {
		init: function () {
		
             var qtdItensCarrossel = $(".carousel-servicos .swiper-slide").length;
            
            if(qtdItensCarrossel > 4)
            {
                var swiperServicos = new Swiper('.carousel-servicos',{
                    pagination: '.paginacao-carousel-servicos-desk .pagination',
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    grabCursor: false,
                    paginationClickable: true,
                    calculateHeight: true
                  });

                  $('.paginacao-carousel-servicos-desk .prev-item').on('click', function(e){
                    e.preventDefault()
                    swiperServicos.swipePrev()
                  });

                  $('.paginacao-carousel-servicos-desk .next-item').on('click', function(e){
                    e.preventDefault()
                    swiperServicos.swipeNext()
                  });


                    $('.paginacao-carousel-servicos-desk .swiper-pagination-switch').each(function(index){ 
                            if(index % 4 != 0){
                            $(this).hide();
                        }
                    });

                    $(".paginacao-carousel-servicos-desk .swiper-pagination-switch:visible").last().hide();
                    $('.paginacao-carousel-servicos-desk .swiper-pagination-switch').slice(-4, -3).show();

                } else{
                    
                    $(".paginacao-carousel-servicos-desk").css("visibility", "hidden");
                }
            
            
		}
	}
}();

var swiperAgenda = [];
var slideAgenda = function() {
	return {
		init: function () {
		
            for(var i = 1; i < 7; i++)
            {
                var strContent = "swiper-eventos" + i;
                var strPagination = "paginacao-eventos" + i;
                var myvar = "mySwiper" + i;
                
               swiperAgenda[myvar] = new Swiper('.' + strContent,{
                    pagination: '.' + strPagination + ' .pagination',
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    grabCursor: false,
                    paginationClickable: true,
                    calculateHeight: true
                  });
                
                $('.' + strPagination  + ' .prev-item').attr("rel", myvar);
                $('.' + strPagination  + ' .next-item').attr("rel", myvar);
            }
            
            
            $(".paginacao-eventos").each(function(){
                
				$(this).find(".swiper-pagination-switch").each(function(index){ 
                    if(index % 4 != 0){
                        $(this).hide();
                    }
				});
				
				$(this).find(".swiper-pagination-switch:visible").last().hide();
				$(this).find(".swiper-pagination-switch").slice(-4, -3).show();
                
            });
           
            
             $('.agenda .prev-item').on('click', function(e){
                var myvar = $(this).attr("rel");      
                e.preventDefault();
                swiperAgenda[myvar].swipePrev();
                 
                 
              });

              $('.agenda .next-item').on('click', function(e){
                var myvar = $(this).attr("rel");   
                e.preventDefault();
                swiperAgenda[myvar].swipeNext();
              });
			
		}
	}
}();




var swiperServicosExclusivos = function() {
	return {
		init: function () {
		
            var qtdItensCarrossel = $(".carousel-servicos-exclusivos .swiper-slide").length;
            
            if(qtdItensCarrossel > 4)
            {
                
                var swiperServicosExclusivos = new Swiper('.carousel-servicos-exclusivos',{
                    pagination: '.paginacao-carousel-servicos-exclusivos .pagination',
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    grabCursor: false,
                    paginationClickable: true,
                    calculateHeight: true
                  });

                  $('.paginacao-carousel-servicos-exclusivos .prev-item').on('click', function(e){
                    e.preventDefault()
                    swiperServicosExclusivos.swipePrev()
                  });

                  $('.paginacao-carousel-servicos-exclusivos .next-item').on('click', function(e){
                    e.preventDefault()
                    swiperServicosExclusivos.swipeNext()
                  });



                   $('.paginacao-carousel-servicos-exclusivos .swiper-pagination-switch').each(function(index){ 
                            if(index % 4 != 0){
                            $(this).hide();
                        }
                    });

                    $(".paginacao-carousel-servicos-exclusivos .swiper-pagination-switch:visible").last().hide();
                    $('.paginacao-carousel-servicos-exclusivos .swiper-pagination-switch').slice(-4, -3).show();
            } else{
                
                $(".paginacao-carousel-servicos-exclusivos").css("visibility", "hidden");
                
            }
		}
	}
}();



var slideTour = function() {
	return {
		init: function () {
		
			slideTour = new Swiper('.carousel-tour',{
				pagination: '.paginacao-carousel-tour .pagination',
				slidesPerView: 1,
				slidesPerGroup: 1,
				grabCursor: false,
				paginationClickable: true,
				calculateHeight: true,
				loop: false
			  });
			  
			  $('.paginacao-carousel-tour .prev-item').on('click', function(e){
				e.preventDefault()
				slideTour.swipePrev()
			  });
			  
			  $('.paginacao-carousel-tour .next-item').on('click', function(e){
				e.preventDefault()
				slideTour.swipeNext()
			  });
		}
	}
}();



var sliderTef = function() {
	return {
		init: function () {
            
            var qtdItensCarrossel = $(".carousel-comparacao02 .swiper-slide").length;
            
            if(qtdItensCarrossel > 4)
            {
                
                var swiperSliderTef = new Swiper('.carousel-comparacao02',{
                    pagination: '.paginacao-carousel-comparacao02-desk .pagination',
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    grabCursor: false,
                    paginationClickable: true,
                    calculateHeight: true

                  });

                  $('.paginacao-carousel-comparacao02-desk .prev-item').on('click', function(e){
                    e.preventDefault();
                    swiperSliderTef.swipePrev();
                  });

                  $('.paginacao-carousel-comparacao02-desk .next-item').on('click', function(e){
                    e.preventDefault();
                    swiperSliderTef.swipeNext();
                  });


                $('.paginacao-carousel-comparacao02-desk .swiper-pagination-switch').each(function(index){ 
                            if(index % 4 != 0){
                            $(this).hide();
                        }
                });

                $(".paginacao-carousel-comparacao02-desk .swiper-pagination-switch:visible").last().hide();
                $('.paginacao-carousel-comparacao02-desk .swiper-pagination-switch').slice(-4, -3).show();
                
                
            } else{
                $(".paginacao-carousel-comparacao02-desk").css("visibility", "hidden");
            }
            
            
		}
	}
}();


var slideBancoImagens = function() {
	return {
		init: function () {
		
			if (isMobile) {
			var slideBancoImagens = new Swiper('.carousel-bancoimagens',{
				pagination: '.pagination-carousel-bancoimagens  .pagination',
				slidesPerView: 1,
				slidesPerGroup: 1,
				grabCursor: false,
				paginationClickable: true,
				calculateHeight: true
			  });
			  
			  $('.pagination-carousel-bancoimagens  .prev-item').on('click', function(e){
				e.preventDefault();
				slideBancoImagens.swipePrev();
			  });
			  
			  $('.pagination-carousel-bancoimagens  .next-item').on('click', function(e){
				e.preventDefault();
				slideBancoImagens.swipeNext();
			  });

			  
			} else {
                
                var qtdItensCarrossel = $(".carousel-bancoimagens .swiper-slide").length;
            
                if(qtdItensCarrossel > 4)
                {
				
				var slideBancoImagens = new Swiper('.carousel-bancoimagens',{
                    pagination: '.pagination-carousel-bancoimagens  .pagination',
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    //grabCursor: false,
                    paginationClickable: true,
                    calculateHeight: false
                  });
			  
                  $('.pagination-carousel-bancoimagens  .prev-item').on('click', function(e){
                    e.preventDefault();
                    slideBancoImagens.swipePrev();
                  });

                  $('.pagination-carousel-bancoimagens  .next-item').on('click', function(e){
                    e.preventDefault();
                    slideBancoImagens.swipeNext();
                  });

                    var marcacao = 0;
                    $('.pagination-carousel-bancoimagens  .swiper-pagination-switch').each(function(index ){ 

                        if(marcacao == 1){
                            marcacao++;
                            $('.pagination-carousel-bancoimagens  .swiper-pagination-switch:eq('+ index +')').hide();

                        } else if(marcacao == 2){
                            $('.pagination-carousel-bancoimagens  .swiper-pagination-switch:eq('+ index +')').hide();
                            marcacao = 0;
                        } else{
                            marcacao++;
                        }
                    });
				
                 }
                else{
                    $(".pagination-carousel-bancoimagens").css("visibility", "hidden");
                }
			}
		}
	}
}();

