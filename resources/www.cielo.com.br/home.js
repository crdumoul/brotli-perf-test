/* Deploy 20140620-2 */

// script da pagina nivel
$(document).ready(function(){ 

	$(".close-tutorial").click(function(){ 								
		var closeTutorial = $(this).data("tutorial");	
		$(closeTutorial).hide();
		return false;								
	});
	
	sliderBanner.init();
	
	$("#comeceaqui .header a").click(function(){
		
		 var link = this;
                
		$.smoothScroll({
			scrollTarget: link.hash,
			//offset: Eoffset,
			easing:'easeOutQuart',
			speed: 2000
			//exclude: ['.rough','#chunky'] // adicionar execess�es
		});
		
		return false;
				
	});
    
    
    //envio form
	$(".form-comece .bt").click(function(){ 
		$(".form-comece").submit();
	});
    
    // manipular select aqui
	$('select').selectmenu({
		change: function(e, object){

			
			if(object.value != 0){
				$("select").closest('li').removeClass('has-error');
			} else{
                $("select").closest('li').addClass('has-error');
            }
		}
	});
	
	$.validator.addMethod("valueNotEquals", function(value, element, arg){
	  return arg != value;
	 }, "Value must not equal arg.");
    
    
    $(".form-comece").validate({
		rules: {
    		nome: "required",
            email: { required: true, email: true},
			tiponegocio: { valueNotEquals: 0},
        },
	
		 errorElement: 'span', errorClass: 'help-block', focusInvalid: false, highlight: function (element) { // hightlight error inputs
            $(element).closest('li').addClass('has-error'); // set error class to the control group
        },
		
	 	invalidHandler: function(event, validator) {
			
		},
		
		success: function (label) {
            label.closest('li').removeClass('has-error');
            label.remove();
        },
	    
		submitHandler: function(form) {
			//form.submit();
            
             var modal = form.redirect.value;
             var nome = form.nome.value;
             var email = form.email.value;
             var tipo = form.tiponegocio.selectedIndex;
            
            strUrl = modal + "?nome=" + nome + "&email=" + email + "&tipo=" + tipo;
            
            opemModalOnReady(strUrl);

	  	}
	 });
    
  
	//interações Mobile e não mobile
	if(isMobile)
	{	
		slideMobile.init(
			[".carousel-servicos", 
			 ".carousel-nada-supera", 
			 ".carousel-depoimentos"],

			[".paginacao-carousel-servicos-mobile",
			 ".paginacao-carousel-nada-supera",
			 ".paginacao-carousel-depoimentos"]
		);
		

		$(".paginacao-carousel-servicos").removeClass('paginacao-carousel-servicos-desk');
		$(".carousel-servicos .content-slider").removeClass('content-slider');
	} 
	 else
    {
		
    	slideServicos.init();
		slideDepoimentos.init();
		
		$(window).bind("mousewheel", function() {
		    $("html, body").stop();
		});
		
		
	
		
		
		var footer = $(".footer-fix");

		footer.show();
		
		var offset = $('.footer-ok').offset();

		$(window).scroll(function() {


			var offsetDepo = parseInt($(".part-slider-depoimentos").offset().top ) + parseInt($(".part-slider-depoimentos").height()) + 85;
			var offsetJanela = parseInt(parseInt($(window).height()) + parseInt($(document).scrollTop()));

			if( offsetDepo > offsetJanela ){
		  		footer.show();
				
		  	} else {
		  		footer.hide();
		 	}
	 	});

	 	$(window).bind('touchend', function(event)  {
		    var offsetDepo = parseInt($(".part-slider-depoimentos").offset().top ) + parseInt($(".part-slider-depoimentos").height()) + 85;
			var offsetJanela = parseInt(parseInt($(window).height()) + parseInt($(document).scrollTop()));

			if( offsetDepo > offsetJanela ){
		  		footer.show();
				
		  	} else {
		  		footer.hide();
		 	}
		});


	 	$(".footer-fix section").append($(".footer-ok .top-footer").html());
		goToTop.init();
		
		
		$(".cielo-um-clique").click(function(event) {								 
			$('body, html').animate({scrollTop:4000}, {duration: 2000, easing:'easeOutQuart'});
	 	}); 
		
	}

	
});




