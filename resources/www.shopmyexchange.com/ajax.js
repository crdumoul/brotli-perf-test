
$(document).ready(function(){

    
    
});

function sendFormOnPage(formId, page) {
	var dataString = $("#" + formId).serialize();
	$.ajax({
		type: "POST",
		url: "/checkout/gadgets/validate.jsp",
		data: dataString,
		dataType: "jason",
		async: false
	});
	window.location.href=page;
}

function estimateCartShipping(formId) {
	sendFormOnPage(formId, "/cart");
}
