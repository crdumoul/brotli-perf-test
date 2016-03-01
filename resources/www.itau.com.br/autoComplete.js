function fctTeclaEnter(){
	if ($(".buscaSiteItau").val() == "") {         
		alert("Digite a Informação a ser pesquisada.");
		return false;
	}else{
		return true;
	}
} 

function fctAutoComplete(valor) {
	$(".buscaSiteItau").val(valor);
	$("#frmHome").submit();
}

Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

var EnviarAjax = function(query) {
	var context = "itc";
	$.ajax({
		url: "https://ww16.itau.com.br/ws/BuscaPeloFast.asmx/AutoCompleteFast" + "?Query=" + query + "&Context=" + context,
		cache: false,
        dataType: 'jsonp',
        crossDomain: true,
        timeout: 5000,
		data: "{}",
		success: function(response) {

			var dados = eval('(' + response.d + ')');
			var arrDados = "";
			var listaResultados = {};
			
			$("#ulAutoComplete").remove();
			$(".autoComplete").css('display', 'none');			
		   
			if (dados != "not Found") {
				//cria o box com resultados				
				$(".autoComplete").css('display','block'); 
				$("#divAutoComplete").append("<ul id='ulAutoComplete'><li></li></ul>");
				//Resultados começam na 4ª posicao e vao ateh o final do array
				for(var j = 3; j < dados.length; j = j + 2 ) {
					
					//cada posicao do resultado, pode ter mais de um item separados por '|'
					var resultados = dados[j].split("|");
					
					for(var i = 0; i < resultados.length; i++) {
						listaResultados[resultados[i].replace(/ /g, '').toLowerCase()] = resultados[i];
					}
				}
				
				for(var propertyName in listaResultados) {
						var item = '<li><a href="#" onclick="fctAutoComplete(\'' + listaResultados[propertyName] + '\')">' + listaResultados[propertyName] + '</a></li>'
						
						if ($(".buscaSiteItau").val()==listaResultados[propertyName]) {
							$("#ulAutoComplete li:first").before(item);
						}
						else {
							$("#ulAutoComplete li:last").after(item);
						}
					}
			}
		}
	});
};

//Função de criação e leitura do cookie
var STATICFILE_IMG_MCIV_HOME, linkPoliticaPriv, srcImgAlerta, srcImgFechar, stage;

var cookiesMarcoCivil = {

	generateMsgAlert: function(){
	
		if(window.location.pathname === '/vgn-ext-templating/v/index.jsp'){	stage = 'mgmt';	}else{ stage = 'live'; }
		
		if(stage === 'mgmt'){
			linkPoliticaPriv = window.location.protocol+'//'+window.location.hostname+window.location.pathname+'?vgnextoid=477acafc0b76d310VgnVCM100000d8193a0aRCRD&appInstanceName=default';
		}else if(stage === 'live'){
			linkPoliticaPriv = window.location.protocol+'//'+window.location.hostname+'/seguranca/termos-de-uso/';
		}

		STATICFILE_IMG_MCIV_HOME = '/_arquivosestaticos/Itau/img/marco_civil/';
		//linkPoliticaPriv = 'http://conteudowebdes/vgn-ext-templating/v/index.jsp?vgnextoid=88773aa02f96d310VgnVCM100000d8193a0aRCRD&appInstanceName=default';
		//linkPoliticaPriv = 'https://www.itau.com.br/seguranca/politica-de-privacidade';
		srcImgAlerta = STATICFILE_IMG_MCIV_HOME+'ico-alerta-aviso.png';
		srcImgFechar = STATICFILE_IMG_MCIV_HOME+'ico-fechar-branco.png';

		$('<div>', { 'id': 'marcoCivil', 'class': 'marco-civil-container', 'html': '<img class="img-alerta" src="'+srcImgAlerta+'" alt="Imagem triangular com exclamação indicando um aviso de alerta" title="Imagem triangular com exclamação indicando um aviso de alerta"><div class="textDescription">Os nossos termos de uso e política de privacidade foram atualizados e ao continuar navegando neste site você aceita suas condições. <a href="'+linkPoliticaPriv+'" target="_blank" id="linkSaibaMais"> Saiba mais.</a></div><img class="btn-fechar" src="'+srcImgFechar+'" alt="Imagem em formato X para fechar a mensagem de alerta de termos de uso e política de privacidade" title="Imagem em formato X para fechar a mensagem de alerta de termos de uso e política de privacidade">' } ).prependTo('body');

		$('.marco-civil-container').css( { 'height':'36px','background-color':'rgb(87, 87, 87)','color':'#FFF','font-weight':'normal' } );
		$('.marco-civil-container a').css( { 'text-decoration':'underline','color':'#FFF','font-weight':'bold' } );
		$('.marco-civil-container .textDescription').css( { 'position':'absolute','margin':'10px','font-size':'14px','display':'inline-table','float':'left','left':'40px' } );
		$('.marco-civil-container .img-alerta').css( { 'margin':'4px 0 7px 15px','float':'left' } );
		$('.marco-civil-container .btn-fechar').css( { 'float':'right','margin':'11px','*margin-top':'-23px','width':'11px','cursor':'pointer' } );

	},

	createCookie: function(name,value,days){

		var expires;

		if (days > 0){
			var dt = new Date();
			dt.setTime(dt.getTime()+(days*24*60*60*1000));
			expires = "; expires="+dt.toGMTString();
		}else{
			expires = "";
		}

		document.cookie = name+"="+value+expires+"; path=/";
		
		try 
		{
			if ((typeof(bresources) != "undefined")) {
				bresources.setvariable("itau_marcocivil", "1");
			}
		} catch(eer){

		}

	},

	readCookie: function(name){

		var cookieExists = false;
		var pageCookiesBBA = document.cookie.split(';');

		for(var i=0; i < pageCookiesBBA.length; i++){

			var ck = pageCookiesBBA[i];

			while (ck.charAt(0) == ' '){
				ck = ck.substring(1,ck.length);
			}

			if(ck){

				var cparts = ck.split('=');

				if (cparts[0] == name){
					cookieExists = true;
					break;
				}

			}

		}

		if((!cookieExists)&&(typeof(bresources) == "undefined")){
			cookiesMarcoCivil.generateMsgAlert();
		}

		try 
		{
			if ((typeof(bresources) != "undefined")) {
				var consulta = bresources.getvariable("itau_marcocivil");
				if(consulta != '1')
					cookiesMarcoCivil.generateMsgAlert();
			}
		} catch(eer){

		}

	}

};

$(document).ready(function() {
	
	//Redirect delink
	var caminho = window.location.pathname;
	var idCanal = $('#headerChannel').val();
	if(caminho.indexOf('/cartoes/app/') > -1 && idCanal.indexOf('4637f4030d4f7410VgnVCM2000009d3e3a0aRCRD') > -1 ){
	   $('head').prepend('<link rel="canonical" href="www.itau.com.br/cartoes/aplicativo-itaucard/"/>');
     }else if(caminho.indexOf('/cartoes/app-itaucard/') > -1 && idCanal.indexOf('882c832c379f4410VgnVCM1000009c3e3a0aRCRD') > -1 ){
	   $('head').prepend('<link rel="canonical" href="www.itau.com.br/cartoes/aplicativo-itaucard/"/>');
	 }

	$(".buscaSiteItau").keyup(function() {
		var tam = $(this).val().length;
		if (tam > 2)
			EnviarAjax($(this).val());
		else
			$(".autoComplete").hide(); 	
	});
	
	//Função para ocultar o balao de sugestao quando clicar fora dele
	var ocultaSugestao = function(){
		$("#ulAutoComplete").remove();
		$(".autoComplete").css('display', 'none');
	};
	
	$(document).bind("click", function(e) {
		if(e.target.id !== 'busca_geral' && $(e.target.id).attr('class') !== '.autoComplete') {
			ocultaSugestao();
		}
	});
	
	//Verifica se existe o cookie do marco civil
	cookiesMarcoCivil.readCookie('marcocivilsession');
	
	//Oculta a tira e grava o cookie do marco civil
	$('#marcoCivil .btn-fechar, #marcoCivil #linkSaibaMais').click(function(){
		$('#marcoCivil').slideUp('slow');
		setTimeout("$('#marcoCivil').remove()", 1500);

		if($(this).attr('id') == 'linkSaibaMais'){
			// params: nome, valor, dias para expirar cookie
			cookiesMarcoCivil.createCookie('marcocivilsession', 'closed', 365);
		}

	});
	

	//Função para tornar a lupa da busca clicavel	
	//Busca Geral
	$('#header .buscaItau #frmHome fieldset').append('<img id="lupa" src="/_arquivosestaticos/Itau/defaultTheme/img/lupaTransp.png" alt="Imagem da busca" />');
	$('#header .buscaItau #frmHome fieldset').css('width','160px').css('height','30px');
	$('#lupa').click(
		function(){
			if ($(".buscaSiteItau").val() == 'O que você procura?') {         
				alert("Digite a Informação a ser pesquisada.");
				return false;
			}else{
				$("#frmHome").submit();
			}
		}
	);
	
	$('.formSearchHelp').append('<img id="lupaHelp" src="/_arquivosestaticos/Itau/defaultTheme/img/lupaTransp.png" alt="Imagem da busca" />');	
	//Resultado da busca
	if($('#contentBusca').val() != undefined){
		$('#lupaHelp').click(
			function(){
				if ($("#search").val() != 'Digite a Palavra Chave' && $("#search").val() != '') {
					var urlClear = window.location.href;
					if (urlClear.indexOf("?q")>0) {
						urlClear = urlClear.substring(0, urlClear.indexOf('?q'));
						window.location.href = urlClear + "?q="+$("#search").val();
					}
					else {
						urlClear = urlClear.substring(0, urlClear.indexOf('&'));
						window.location.href = urlClear + "?q="+$("#search").val();
					}

				} else {
					alert("Digite a Informação a ser pesquisada.");
					return false;
				}
			}
		);
	}else{
		//Precisa de ajuda
		$('#lupaHelp').click(
			function(){
				if ($("#search").val() != "" && $("#search").val() != 'Digite a Palavra Chave') {
					//remove evento de click para mostrar todos os itens de cada tipo (chamada da funcao 'mostrarMaisItens')
					$('#liPerguntasFrequentes').unbind('click');
					$('#liVideos').unbind('click');
					$('#liDocumentos').unbind('click');
					
					Buscar(1, $('#iptNavigator').val());
					
				} else {
					alert("Digite a Informação a ser pesquisada.");
				}
			}
		);
	}
	
	//Busca do localizador
	$('#localizador .contentLocalizador .localSearch form fieldset').append('<img id="lupaLocal" src="/_arquivosestaticos/Itau/defaultTheme/img/lupaTransp.png" alt="Imagem da busca" />');
	$('html').append('<style>#lupaLocal{width: 20px;height: 25px;position: relative;display: block;right: 15px;top: -29px;cursor: pointer;float: right;}</style>');
	$('#lupaLocal').click(function(){
		//var valor = form.local_search.value;
		var valor = $('#local_search').val();		
		
		valor = $.trim(valor);
		form = $('.localSearch form');
			
		//busca por CEP: 4 digitos, somente numeros
		if(valor.length == 4 && !isNaN(valor)){
			buscaAgencia(valor); //Busca agencia pelo endereco
		}else{
			//busca por endereco
			buscaEndereco(form); //Busca endedereco pelo nro da agencia
		}
	});

	//Busca atendimento -  Respostas Rápidas
	$('.txt3Col .colDest .content #formRespostas').append('<img id="lupaRespostas" src="/_arquivosestaticos/Itau/defaultTheme/img/lupaTransp.png" alt="Imagem da busca" />');
	$('html').append('<style>#lupaRespostas{width: 20px;height: 25px;position: relative;display: block;right: 7px;top: -42px;cursor: pointer;float: right;}</style>');
	$('#lupaRespostas').click(function(){
		if ($(".content #formRespostas #search").val() == 'O que você procura?') {         
			alert("Digite a Informação a ser pesquisada.");
			return false;
		}else{
			$('.content #formRespostas').submit();
		}
	});
	
	
	//Busca atendimento - Agências
	$('.txt2Col .boxBordaBg .linha1 #formRespostas').append('<img id="lupaAgencias" src="/_arquivosestaticos/Itau/defaultTheme/img/lupaTransp.png" alt="Imagem da busca" />');
	$('html').append('<style>#lupaAgencias{width: 20px;height: 25px;position: relative;display: block;right: -13px;top: -37px;cursor: pointer;float: right;}</style>');
	$('#lupaAgencias').click(function(){
		if ($(".linha1 #formRespostas #search").val() == 'O que você procura?') {         
			alert("Digite a Informação a ser pesquisada.");
			return false;
		}else{
			$('.boxBordaBg .linha1 #formRespostas').submit();
		}
	});

	


	// Bandeiras Footer Site 
 
	$('.btnAcessoRapido').before('<div class="listaIdiomas" style="display: none;">'+
									'<div id="divListaIdiomas">'+
									'<div class="divPais"><a target="_blank" href="http://www.itau.com.ar" class="nomePais"><img class="bandeiras" alt="BandeiraArgentina" width="25" src="/_arquivosestaticos/Itau/img/latam/flagFooterArgentina.png" />Argentina</a></div>'+
									'<div class="divPais"><a target="_blank" href="https://banco.itau.cl" class="nomePais"><img class="bandeiras" alt="BandeiraChile" width="25" src="/_arquivosestaticos/Itau/img/latam/flagFooterChile.png"/>Chile</a></div>'+
									'<div class="divPais"><a target="_blank" href="https://www.itau.com.py/" class="nomePais"><img class="bandeiras" alt="BandeiraParaguai" width="25" src="/_arquivosestaticos/Itau/img/latam/flagFooterParaguai.png"/>Paraguai</a></div>'+
									'<div><a target="_blank" href="https://www.itau.com.uy" class="nomePais"><img class="bandeiras" alt="BandeiraUruguai" width="25" src="/_arquivosestaticos/Itau/img/latam/flagFooterUruguai.png"/>Uruguai</a></div>'+												
									
									'</div>'+			
				   '</div>'+
				   '<a id="selecaoIdiomas" href="#"><img alt="BandeiraBrazil" width="25" src="/_arquivosestaticos/Itau/img/latam/flagFooterBrasil.png" /></a>');
				   
				   
	$("#divListaIdiomas a").click(function(){
	   $('.listaIdiomas').slideUp();
	});			
		
	$('#selecaoIdiomas').click(function(){
	   if($('.listaIdiomas').is(':visible')){
			$('.listaIdiomas').slideUp();
	   }else{
			$('.listaIdiomas').slideDown();
	   }
	  return false;
	});
	
	if (window.location.href.indexOf("renegocie/piloto/simulacao/") > -1 || window.location.href.indexOf("d83f3e26fa521510VgnVCM1000009c3e3a0aRCRD") > -1 ){
		var nomeParam = localizaParam("NOME");
	 	var cpfParam = localizaParam("CPF");
		function localizaParam(parametro){
		  var url = window.location.search.substring(1);
		  var listaParametros = url.split("&");
			for (var i=0;i<listaParametros.length;i++) {
				var param = listaParametros[i].split("=");
				if (param[0] == parametro) {
				  return param[1];
				}
			}
		}	
		$("#reneg3Iframe").attr('src','https://bankline.itau.com.br/renegociacaoPF/reneg3.htm?NOME='+nomeParam+'&CPF='+cpfParam);
	}
	
});