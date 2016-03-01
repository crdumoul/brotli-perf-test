(function(personalcategory,window){

	var savedData = {
		"pageId": "",
		"trackingId" : "",
		"pcrSchema": "",
		"resxLinks" : ""
	},

	categoryListings = [], pcrschemaData = '', schemeTemplate = '';

	personalcategory.processPCRData = function(pcrData, schemeTemplate, podTemplate){

		var categories = pcrData.contents,
			categoryTitle = pcrData.title,
			categorySchemaId = pcrData.schemaId,
			pcrHTML = '';

		savedData.pcrSchema = categorySchemaId;
		savedData.pageId = pcrData.pageId;		
		savedData.trackingId = pcrData.trackingId;

		categoryListings.categories = categories;
		categoryListings.headerTitle = categoryTitle;
		categoryListings.categorySchemaId = categorySchemaId;

		pcrHTML = Mustache.to_html(schemeTemplate, categoryListings, {"categories": podTemplate});

		$(".pcr").html(pcrHTML);
	};

}(
	THD.Utility.Namespace.createNamespace('THD.Thirdparty.PersonalCategory'),
	window
));