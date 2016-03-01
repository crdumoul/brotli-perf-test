/*
	This function is called when the color or size of a product is modified in the storefront.
*/
function sr_productColorSizeChange(thisProduct) {
	
	var _smtr = _smtr || window._smtr || []; _smtr.push(["pageView", { "pageType": "product", 
		"productId": thisProduct.selectedVar.id,
		"masterId": thisProduct.pid, 
		"productName": thisProduct.name }]);
	return false;
}