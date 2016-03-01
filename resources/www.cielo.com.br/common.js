/* Deploy 20140701 */

//manipulaçãoo viewport


// principais script
$(document).ready(function(){ 

	btMinhaconta.init();

	//interações
	hoverEffects.init();
	inFieldLabel.init();
	formComponentes.init();
	
	//interacoes Mobile e nao mobile
	if(isMobile)
	{
		menuHeaderMobile.init();
		mobileFooter.init();
		$(".mapa select").change(function() {
			var link = $(this).val();
			if (link != "") {
				console.log(link);
				document.location = link;
			}
		});
	}
	else
    {
    	$("a[href^='tel:']").click(function() {
		 return false;
		});

		menuFixo.init();
		//ajustaIe8.init();
		linksHashTag.init();
		goToTop.init();
	}
	
	if(! (typeof jQuery.validator === 'undefined')){
		jQuery.validator.addMethod( "letrasespacos", 
				function(value, element){
				    valid = false;
				    check = /[^-\.a-zA-Z\s\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02AE]/.test(value);
				    if(check==false)
				        valid = true;
				    return this.optional(element) || valid;
				}, 
				jQuery.format("O Campo só aceita letras e espaços.")
		);
	};


});

window.onload = function(){ 
	if(isMobile){
		$('.mapa select').selectmenu({
			change: function(e, object){
				//mais informa��es: https://github.com/fnagel/jquery-ui/wiki/Selectmenu
				//alert(object.value);
				window.location.href = object.value;
				
				var htmlA = $("<a></a>");
				htmlA.attr("href", object.value);
				htmlA.attr("id", "linkFooter");
				htmlA.appendTo($("body"));
				
				$("#linkFooter").on("click", function(){
					
					$(this).click();
				});
				
				
			}
		});
		
	}
	
};



function ajustaMobile() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('#Viewport').attr('content', 'width=640');
    }
	
    if (isAndroid && !isMobile) {
        $('#Viewport').attr('content', 'width=1024');
    }
	
    else if (isMobile) { 
		$('#Viewport').attr('content', 'width=640'); 
	}
}

function setAlturaModal(h){
		$("#iframeModalUrl").height(h);
		$("#preLoad").hide();
		$("#iframeModalUrl").css("visibility" , "visible");
}

function fecharModal(h){
		$(".reveal-modal-bg").click();
		resetModal();
}

function resetModal(){
	$("#iframeModalUrl").attr("src", "");
	$("#iframeModalUrl").height(500);
}

function openModalParent(modal){
	resetModal();
	$("#preLoad").show();
	$("#iframeModalUrl").attr("src" , modal);
}


function opemModalOnReady(url){
	$("#iframemodal").reveal();
	$("#iframeModalUrl").attr("src", url);
}

function getParameterByName(name) {
	
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



ajustaMobile();