$(function(){
	$('input[id^="priceH"]').on('click', function(){
		if ($(this).prop('checked')){
			$('input[id^="priceH"]').prop('checked', false);
			$(this).prop('checked', true);
		}
	});
	$('form#keywordSearch').submit(function(){
		var value = $('input[type=text]', $(this)).val();
		value = value.replace(/\s/g,'');
		if(value.length <= 0) {
			return false;
		}
	});
	$('form#priceSearch').submit(function(){
		var value = $('input[type=radio]:checked', $(this)).val();
		if(value == undefined) {
			return false;
		}
	});
});