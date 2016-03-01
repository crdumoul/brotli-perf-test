/* Deploy 20140620 */

/* 
utiliza o plugin jquery.touchSwipe.min.js
*/

var sliderDepoimentos = function () {
	return {

		init: function () {

			if(isMobile){
			
			 var sliderDepoimentos = new Swiper('.part-slider-depoimentos .swiper-container',{
				pagination: '.part-slider-depoimentos .pagination',
				loop:true,
				grabCursor: true,
				paginationClickable: true
			  });
			  
			  $('.part-slider-depoimentos .prev-item').on('click', function(e){
				e.preventDefault();
				sliderDepoimentos.swipePrev();
			  });
			  
			  $('.part-slider-depoimentos .next-item').on('click', function(e){
				e.preventDefault();
				sliderDepoimentos.swipeNext();
			  });
		

			} else {
				
				var negativo = 580;
				
				
				if($(document).width() < 1130)
				{
					var negativo = 0;
				}
				
				
				function moveEsteiraDepoimentos(indexItem)
				{
					var mov = 628;
					var movimentoEsteira = (indexItem * mov + negativo);
					$(".carousel-depoimentos .itens-carousel-depoimentos").animate({ "right" :  movimentoEsteira + "px"}, 1000);
				}
	
				
				//quantidade de itens
				var itemCount = $(".carousel-depoimentos .itens-carousel-depoimentos li").length;
				
				//só existe funcionalidade se tiver  mais de 2 itens
				if(itemCount > 2){
					
					//clona os dois primeiros e os dois últimos itens que serão cortados.
					var lastItem = $(".carousel-depoimentos .itens-carousel-depoimentos li:last");
					var prevLastItem = $(".carousel-depoimentos .itens-carousel-depoimentos li:last").prev();
					var prevLastItem2 =$(".carousel-depoimentos .itens-carousel-depoimentos li:last").prev().prev();
                    var prevLastItem3 =$(".carousel-depoimentos .itens-carousel-depoimentos li:last").prev().prev().prev();
                    
                    
                    var firstItem = $(".carousel-depoimentos .itens-carousel-depoimentos li:first");
					var nextFirstItem = $(".carousel-depoimentos .itens-carousel-depoimentos li:first").next();
                    var nextFirstItem2 = $(".carousel-depoimentos .itens-carousel-depoimentos li:first").next().next();
                    var nextFirstItem3 = $(".carousel-depoimentos .itens-carousel-depoimentos li:first").next().next().next();
                    
                    prevLastItem3.clone().prependTo(".itens-carousel-depoimentos");
					prevLastItem2.clone().prependTo(".itens-carousel-depoimentos");
                    prevLastItem.clone().prependTo(".itens-carousel-depoimentos");
                    lastItem.clone().prependTo(".itens-carousel-depoimentos");
                    
					firstItem.clone().appendTo(".itens-carousel-depoimentos");
					nextFirstItem.clone().appendTo(".itens-carousel-depoimentos");
                    nextFirstItem2.clone().appendTo(".itens-carousel-depoimentos");
                    nextFirstItem3.clone().appendTo(".itens-carousel-depoimentos");
					
                    
                    if(itemCount == 3)
                    {
                        prevLastItem.clone().prependTo(".itens-carousel-depoimentos");
                        lastItem.clone().prependTo(".itens-carousel-depoimentos");
                        
                        firstItem.clone().appendTo(".itens-carousel-depoimentos");
					    nextFirstItem.clone().appendTo(".itens-carousel-depoimentos");
                    }
	
					//seta o tamanho da esteira
					var widthE = 0;
					$(".carousel-depoimentos .itens-carousel-depoimentos li").each(function(){
						
						var widthLi = $(this).width();
						widthE = (widthLi + widthE);
					});
					$(".carousel-depoimentos .itens-carousel-depoimentos").width(widthE);
				
					//posiciona a esteira negativamente
					$(".carousel-depoimentos .itens-carousel-depoimentos").css({ "right" : negativo + "px"});
					
					
					//cria os bullets
					countPaginas = Math.ceil(itemCount / 2);
					var htmlPages = "";
					
					for(var i = 0; i < countPaginas; i++)
					{
						if(i == 0){
							htmlPages += '<span class="swiper-pagination-switch swiper-active-switch"></span>';
						} else {
							htmlPages += '<span class="swiper-pagination-switch"></span>';
						}
					}
					$(".paginacao-carousel-depoimentos .pagination-list").html(htmlPages);
	
					
					//movimentação da esteira pelos bullets
					$(".paginacao-carousel-depoimentos .swiper-pagination-switch").on("click", function(){ 
						var indexItem = $(this).index();
						moveEsteiraDepoimentos(indexItem);
						$(this).addClass("swiper-active-switch").siblings().removeClass("swiper-active-switch");
					
					});
					
					
					//movimentação da esteira pela setas
					$(".next-depoimento-page").on("click" , function(){ 
						var nextItem = $(".paginacao-carousel-depoimentos .swiper-active-switch").next();
						if(nextItem.hasClass("swiper-pagination-switch")){
							var indexItem = nextItem.index();
							moveEsteiraDepoimentos(indexItem);
							nextItem.addClass("swiper-active-switch").siblings().removeClass("swiper-active-switch");
						}
						return false;
					});
					
					$(".prev-depoimento-page").on("click" , function(){ 
						var prevItem = $(".paginacao-carousel-depoimentos .swiper-active-switch").prev();
						if(prevItem.hasClass("swiper-pagination-switch")){
							var indexItem = prevItem.index();
							moveEsteiraDepoimentos(indexItem);
							prevItem.addClass("swiper-active-switch").siblings().removeClass("swiper-active-switch");
						}
						return false;
					});
					
		
					//movimentação pelo toush
					$(".carousel-depoimentos .itens-carousel-depoimentos").swipe({
					  swipeLeft: function(event, direction, distance, duration, fingerCount) {
						var nextItem = $(".paginacao-carousel-depoimentos .swiper-active-switch").next();
						if(nextItem.hasClass("swiper-pagination-switch")){
							var indexItem = nextItem.index();
							moveEsteiraDepoimentos(indexItem);
							nextItem.addClass("swiper-active-switch").siblings().removeClass("swiper-active-switch");
						}
					  },
					  
					  swipeRight: function(event, direction, distance, duration, fingerCount) {
						var prevItem = $(".paginacao-carousel-depoimentos .swiper-active-switch").prev();
						if(prevItem.hasClass("swiper-pagination-switch")){
							var indexItem = prevItem.index();
							moveEsteiraDepoimentos(indexItem);
							prevItem.addClass("swiper-active-switch").siblings().removeClass("swiper-active-switch");
						}
					  }
					});
					
				} 
				else
				{
				
				}
			
			}

		},
	};
}();