$(document).ready(function(){ 
	$(".close-reveal-modal").click(function(){ 
		window.parent.fecharModal();
		return false;
	});
	
	
	
	$(".openModalParent").click(function(){ 
		var modal = $(this).attr("href");
		window.parent.openModalParent(modal);
		return false;
	});
	
	
	
});

window.onload = function(){
	
};



function ajustaAltura()
{
	$(".modal-config").css("visibility", "visible");
	var h = $(".modal-config").height();
	
	if(window.parent.length > 0){
		window.parent.setAlturaModal(h);
	} else{
		$(".modal-config").addClass("noParent");
	}
}


function redirectModal(URL)
{
	
	var path = window.location.pathname;
	
	
	if(window.parent.length < 1){
		window.location.href = URL + "?modal=" + path;
	}
}
