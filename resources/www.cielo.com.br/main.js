var mobileFooter = function()
{
	return { 
		init: function () {
				var mapa = $(".mapa");
				var mapaLink = $(".mapa-do-site");
				
				mapa.hide();
				mapaLink.addClass('seta-baixo');
				
				mapaLink.click(function(e) {
					mapa.slideToggle("slow");
					mapaLink.toggleClass('seta-baixo');
					
					e.preventDefault();
				});
		}
	};
	
}(); 

var goToTop = function(){
	return {
		init: function(){
			$(".goto-top").click(function(event) {
	 			//$('body, html').animate({scrollTop:0}, {duration: 2000, easing:'easeOutQuart'});
				var link = this;
				 $.smoothScroll({
					  scrollTarget: link.hash,
					  easing:'easeOutQuart',
					  speed: 2000
				});
				
	 		});
		}
	};
}();

var tabsUi = function(){
	return {
		init: function(){
			
            
            $(".ui-tabs-nav li a").click(function(){ 
                
                if(!$(this).parent().hasClass("ui-tabs-active")){
                    
                    var newBlocoAtivo = $(this).attr("href");
                    $(this).parent().addClass("ui-tabs-active").siblings().removeClass("ui-tabs-active");
                    
                    $(newBlocoAtivo).siblings(".ui-tabs-panel").hide();
                    $(newBlocoAtivo).show();
                    
                }
                
                return false;
                
            
            });
		}
	};
}();


var tabsModal = function(){
	
	return {
		init: function(){
			 
			$(".modal-tabs li a").click(function(){ 
				if(!$(this).parent().hasClass("active")){
					$(this).parent().addClass("active").siblings().removeClass("active");
					
					var intexContent = $(this).parent().index();
					
					/*
					$(".modal-tab-content:eq("+ intexContent +")").siblings().fadeOut('slow', function(){ 
						$(".modal-tab-content:eq("+ intexContent +")").fadeIn();																			   
					}); */
					
					$(".modal-tab-content:eq("+ intexContent +")").siblings().hide();
					$(".modal-tab-content:eq("+ intexContent +")").show();	
				}
				
				return false;
			});
		}
	};
}();

var simplesTab = function(){
	
	return {
		init: function(){
			 
			$(".menu-abas a").click(function(){ 
               
                if(!$(this).hasClass("ativo"))
                {
                    
                    $(".menu-abas a").each(function(){
                    
                        $(this).removeClass("ativo");
                    });
                    
                    $(this).addClass("ativo");
                    
                    var tabAtiva = $(this).data("tab");
                    
                    $(tabAtiva).siblings().hide();
                    $(tabAtiva).show(); 
                    
                    
                }
                
                return false;
            
            });
		}
	};
}();




var tabsSite = function(){
	if(isMobile){
		return {
			init: function(){
				$(".abas-tabs li a").click(function(){ 
					if(!$(this).parent().hasClass("active")){
						$(this).parent().addClass("active").siblings().removeClass("active");
						
						var intexContent = $(this).parent().index();

						$(".tab-content:eq("+ intexContent +")").siblings().hide();
						$(".tab-content:eq("+ intexContent +")").show();	

						// $(".tab-content:eq("+ intexContent +")").css("display", "block").siblings().css("display", "none");
						
						
						
					}
					return false;
				});
			}
		};
	}else{
		return {
			init: function(){
				$(".abas-tabs li a").click(function(){ 
					if(!$(this).parent().hasClass("active")){
						$(this).parent().addClass("active").siblings().removeClass("active");
						
						var intexContent = $(this).parent().index();
				
				/*
						$(".tab-content:eq("+ intexContent +")").siblings().fadeOut('slow', function(){ 
							$(".tab-content:eq("+ intexContent +")").fadeIn();																			   
						});
						*/
						
						$(".tab-content:eq("+ intexContent +")").siblings().hide();
						$(".tab-content:eq("+ intexContent +")").show();	
						
					}
					return false;
				});
			}
		};
	}
}();


//  abas carrossel
var abasCarossel = function (){
	return {
		init: function(){
			
			var itemAtivo = 0;
			var animando = false;
			$(".abas-tabs li a").click(function(){
				
				if(!$(this).parent().hasClass("active") && animando == false){
					
					animando = true;
					var obj = $(this);
					var intexContent = $(this).parent().index();
					
					//anima opacidade das abas
					obj.parent().animate({ opacity: 0.25}, 500, function(){ 
						obj.parent().animate({ opacity: 1}, 500);
					});

					
					//interação mobile sem animação
					if(isMobile)
					{
						$(".tabs-content .tab-content:eq("+ itemAtivo +")").addClass("tab-desativada");
						$(".tabs-content .tab-content:eq("+ intexContent +")").removeClass("tab-desativada");
						animando = false;
						
					} else {
						
						//anima a saida do conteudo que estava ativo verificando a direção da animação
						if(intexContent > itemAtivo){
							$(".tabs-content .tab-content:eq("+ itemAtivo +")").animate({ "left" : "-250%"}, 1000, function(){ 																							
								$(this).addClass("tab-desativada").css({ "left" : "0px"});
								animando = false;
							});
							$(".tabs-content .tab-content:eq("+ intexContent +")").removeClass("tab-desativada").css({ "left" : "150%" }).animate({  "left" : "0px"  });
						} 
						else
						{
							
							$(".tabs-content .tab-content:eq("+ itemAtivo +")").animate({ "left" : "250%"}, 1000, function(){ 																							
								$(this).addClass("tab-desativada").css({ "left" : "0px"});
								animando = false;
							});
							
							$(".tabs-content .tab-content:eq("+ intexContent +")").removeClass("tab-desativada").css({ "left" : "-150%" }).animate({  "left" : "0px"  });
						}
                        
                       
                        var newH = ($(".tabs-content .tab-content:eq("+ intexContent +")").height());
                        $(".tabs-content").height(newH);
						
					}
					
					//troca as abas
					obj.parent().addClass("active").siblings().removeClass("active");
					
					
					//manipulação das abas full screem
					if(obj.parent().hasClass("aba-left"))
					{
						$(".abas-tabs .aba-centro").removeClass("off");
						$(".bg-tabs-active-left").removeClass("bg-tabs-active-left-off");
						$(".bg-tabs-active-right").removeClass("bg-tabs-active-right-on");
					}
					else if(obj.parent().hasClass("aba-right"))
					{
						obj.parent().prev().addClass("off");
						$(".bg-tabs-active-left").addClass("bg-tabs-active-left-off");
						$(".bg-tabs-active-right").addClass("bg-tabs-active-right-on");
					} 
					else
					{
						obj.parent().removeClass("off");
						$(".bg-tabs-active-right").removeClass("bg-tabs-active-right-on");
						$(".bg-tabs-active-left").addClass("bg-tabs-active-left-off");
					}
					
					itemAtivo = intexContent;
							
					
					
				}
				return false;
			});
			
		}
	};
	
}();


// 2 ou mais abas  ccompletamente personalizadas com o bg fluido 
//posicionar bg fluido no CSS

var triTabs = function(){
	return{
		init : function(){
			
			
			var itemAtivo = 0;
			$(".abas-tabs li a").click(function(){
				
				
				if(!$(this).parent().hasClass("active")){

					var obj = $(this);
					var intexContent = $(this).parent().index();
					
					$(".tabs-content .tab-content:eq("+ itemAtivo +")").hide();
					$(".tabs-content .tab-content:eq("+ intexContent +")").show();
					
					obj.parent().addClass("active").siblings().removeClass("active");
										
					if(obj.parent().hasClass("aba-left"))
					{
						$(".abas-tabs .aba-centro").removeClass("off");
						$(".bg-tabs-active-left").removeClass("bg-tabs-active-left-off");
						$(".bg-tabs-active-right").removeClass("bg-tabs-active-right-on");
					}
					else if(obj.parent().hasClass("aba-right"))
					{
						obj.parent().prev().addClass("off");
						$(".bg-tabs-active-left").addClass("bg-tabs-active-left-off");
						$(".bg-tabs-active-right").addClass("bg-tabs-active-right-on");
					} 
					else
					{
						obj.parent().removeClass("off");
						$(".bg-tabs-active-right").removeClass("bg-tabs-active-right-on");
						$(".bg-tabs-active-left").addClass("bg-tabs-active-left-off");
					}
					
					itemAtivo = intexContent;
					
					

					//animação das abas - desativadas
					/*
					if(intexContent > itemAtivo){
						$(".tabs-content .tab-content:eq("+ itemAtivo +")").animate({ "left" : "-150%"}, 1000, function(){ 																							
							$(this).hide().css({ "left" : "0px"});
							
						});
					} 
					else
					{
						$(".tabs-content .tab-content:eq("+ itemAtivo +")").animate({ "left" : "150%"}, 1000, function(){ 																							
							$(this).hide().css({ "left" : "0px"});
						});
					}

					setTimeout(function(){ 
							
							
							//mostra o bloco escolhido
							//$(".tabs-content .tab-content:eq("+ intexContent +")").fadeIn('slow');
							
							if(intexContent > itemAtivo){
								$(".tabs-content .tab-content:eq("+ intexContent +")").css({ "left" : "150%" }).show().animate({  "left" : "0px"  });	
							} else{
								$(".tabs-content .tab-content:eq("+ intexContent +")").css({ "left" : "-150%" }).show().animate({  "left" : "0px"  });
							}
							
							//troca a class da aba
							obj.parent().addClass("active").siblings().removeClass("active");
							
							
							itemAtivo = intexContent;
							
							
							
							//manipula as bordas e bg da aba full screen
							if(obj.parent().hasClass("aba-left"))
							{
								$(".abas-tabs .aba-centro").removeClass("off");
								$(".bg-tabs-active-left").removeClass("bg-tabs-active-left-off");
								$(".bg-tabs-active-right").removeClass("bg-tabs-active-right-on");
							}
							else if(obj.parent().hasClass("aba-right"))
						    {
								obj.parent().prev().addClass("off");
								$(".bg-tabs-active-left").addClass("bg-tabs-active-left-off");
								$(".bg-tabs-active-right").addClass("bg-tabs-active-right-on");
							} 
							else
							{
								obj.parent().removeClass("off");
								$(".bg-tabs-active-right").removeClass("bg-tabs-active-right-on");
								$(".bg-tabs-active-left").addClass("bg-tabs-active-left-off");
							}
			
					}, 1000); */
										
				}
				return false;
			});
		}
	};
	
}();

//  estrutura h5 - div 
var defaultAccordion = function (){
	return {
		init: function(){
			$(".accordion > h4, .accordion > h3").click(function(){
				$(this).toggleClass("ui-accordion-header-active");
				$(this).next().slideToggle();
				return false;
			});
			
		}
	};
	
}();


// funcao de imprimir, definir o conteudo a ser impresso no atributo data-bloco
var printBloco = function (){
	return {
		init: function(){
			 
			$(".printBloco").click(function(){
						
				var bloco = $(this).data("bloco");

				var html = $(bloco).html();
				
				var newWin = window.open('', 'printPop', 'width=800,height=800');
				newWin.document.write("<html>"+document.getElementsByTagName('head')[0].innerHTML+"<body>" + html + "</body></html>");
				//newWin.window.location.reload();    
				newWin.focus();                    
				newWin.print();
				newWin.close();
				return false;
			});
		}
	};
	
}();


var btMinhaconta = function() {
	if(isMobile){
		return {
			init: function() {

				$(".bt-acessar-conta").bind("click", function(){
					$(".bt-acessar-conta").addClass("onClick");
				});
			}
		};
	}else{
		return {
			init: function() {
				$(".acessar-conta").hover(function(){ 
					
					$(".acessar-conta .bt-over").stop().animate({ "height" : "0px" },400, "easeOutQuart");
					$(".acessar-conta  .bt-out").stop().animate({ "height" : "87px" },400, "easeOutQuart");
				
				}, function(){ 
				
					$(".acessar-conta .bt-out").stop().animate({ "height" : "0px" },400, "easeOutQuart");
					$(".acessar-conta .bt-over").stop().animate({ "height" : "87px" },400, "easeOutQuart");
				});
			}
		};
	}
}();

var ajustaIe8 = function() {
	return {
		init: function() {
			if ($("html").hasClass('ie8')) {
				$(".bt").corner("16px");
			}
		}
	};
}();


var readyOpenModalByURL = function() {
	return {
		init: function() {
			
			var url = window.location.href;
			var arrayPart  = url.split("#");
			
			if(arrayPart.length > 1){
				var modal = arrayPart[arrayPart.length - 1];
				var cond1 = $("#" + modal).length > 0;
				var cond2 = $("#" + modal).hasClass("reveal-modal");
				
				if(cond1 && cond2){
					$('#' + modal).reveal($(".openModal").data());
				}	
			
			}
	
		}
	};
}();



var linksHashTag = function() {
	return {
		init: function() {
			$("a[href='#']").click(function(event) {
				event.preventDefault();
			});
		}
	};
}();


// Auto complete
var searchAtendimento = function() {
	return {
		init: function() {
			
			//propriedades
			var url = "request-auto-complete.html";
			var param = "?s=";
			var request = null;
			var api = $('.box-busca-result .result-scroll').jScrollPane({ maintainPosition : false }).data('jsp');
			
			$(".box-search input").keyup(function(){ 
				
				//pega o valor
				var value = $(this).val();
				
				//cancela a requisi��o atual se hover
				if(request != null){
					clearTimeout(request);
				}	

				if(value != "")	{
					//delay da digita��o para iniciar o request
					request = setTimeout( function(){ 
						
						$.get( url + param + value, function( data ) {
						  if(data.length){
							  $(".box-busca-result").show();
							  
							  //destroi o scroll aplicado
							  api.destroy();
							  
							  $('.box-busca-result .result-scroll').html(data);
							  
							  //aplica o scroll - esta configurado para tamanho minimo de 450px
							  api = $('.box-busca-result .result-scroll').jScrollPane({ maintainPosition : false, mouseWheelSpeed   : 80 }).data('jsp');
						  } else{
							  $(".box-busca-result").hide();
						  }
						}); 

					}, 500);
				}else{
					
					$(".box-busca-result").hide();
					
					if(request != null){
						clearTimeout(request);
					}	
				}		
			});

			$('html').click(function() {
				$(".box-busca-result").hide();
			});

			// $(".box-busca-result").on( "mouseleave", function() {
			// 	$(".box-busca-result").hide();
			// });
		}
	};
}();