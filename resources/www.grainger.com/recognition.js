(function($, Grainger, TemplatesReco, TemplatesPricing){
	var headerPromise = false;

	// Function to fetch the ribbon via ajax
	function fetchRibbon(){
		var returnPromise = false;
		//Only if we are logged-in and not a customized user
		if( Grainger.helper.UserHelper.isLoggedIn() &&
			Grainger.recognitionFlag && Grainger.recognitionFlag === 'true'){
			//Start the ajax request ASAP
			returnPromise = Grainger.fetch({
				type: 'get',
				cache: false,
				dataType: 'json',
				noWaitModal: true,
				url: '/headercontent/links'
			});

			if ($('#authNav, #userAuthLinks').doesExist()) {
				returnPromise.then(renderRibbon).fail(headerAjaxFail);
			}

		} else {
			$('#authNav, #userAuthLinks').removeClass('ribbon-wrapper-loading');
		}
		return returnPromise;
	};

	//populate the header template with good ajax response
	function renderRibbon(json) {
		// authNav
		if (!Grainger.gCookiePresent) {
			$('#ribbonWrapper').replaceWith(TemplatesReco.authNav(json)).removeClass('ribbon-wrapper-loading');
		}

		// userAuthLinks
		var $reloadUserAuthLinks = $('.reload-userAuthLinks'),
			$userAuthLinks = $('#userAuthLinks');
		if ($reloadUserAuthLinks.doesExist()) {
			json.account.lastInitial = json.account.lastName.substring(0,1)+'.';
			$userAuthLinks.replaceWith(TemplatesReco.userAuthLinks(json));
			$reloadUserAuthLinks.removeClass('reload-userAuthLinks');
		}
		$userAuthLinks.removeClass('ribbon-wrapper-loading');
	}

	//console log with bad ajax response
	function headerAjaxFail() {
		console.log('ajax call failed');
	}

/*
 *	loadCustomPrices()
 *
 *	Popular uses include...
 *	PRICE - collects skus for all existing $('.price-replace') and inserts the price
 *	ICONS - collects skus and inserts appropriate icons
 *	PREVIOUSLY PURCHASED NOTICE - collects skus, inserts text and unhides container
 *
 *	This function will only run if $('.price-replace').doesExist(). You need a price call to get the icons, et al.
 *
 */
	function loadCustomPrices() {
		var dataArray = [],
			dataStr = '',
			$prices = $('.price-replace'),
			$icons = $('.product-icon-replace'),
			$ppiNote = $('.ppi-note-replace'),
			idpsku = $('[data-template=idp]').data('sku'),
			productsBySku = [];

		if ($prices.doesExist()) {
			// collect skus for request
			$prices.each( function() {
				var sku = $(this).data('sku');
				if ($.inArray(sku, dataArray) === -1) {
					dataArray.push(sku);
				}
			});

			dataStr = dataArray.join(',');

			Grainger.fetch({
				type: 'get',
				cache: false,
				dataType: 'json',
				noWaitModal: true,
				url: contextPath+'/product/info?productArray='+dataStr
			}).then(function(productData){
				var neoPricing = false;
				var nroPricing = false;
				$.each(productData, function(sku, product) {
					// cram data into proper shape to fit into template.
					if (product.isDiscontinued) {
						product.sellPriceType = 'discontinued';
					} else if (product.isCommodity) {
						product.sellPriceType = 'commodity';
					} else {
						switch (product.sellPriceType) {
							case 'onsale' :
								product.sellPriceType = 'sale';
								break;
							case 'clearance' :
								product.sellPriceType = 'clearance';
								break;
							default :
								product.sellPriceType = 'regular';
								break;
						}
					}

					if(product.neoPricing && !neoPricing) {
						neoPricing = true;
					}
					else if(product.nroPricing && !nroPricing) {
						nroPricing = true;
					}

					// store data the array of product objects indexed by sku
					productsBySku[sku] = {
						isDiscontinued: product.isDiscontinued,
						isCommodity: product.isCommodity,
						sellPriceType: product.sellPriceType,
						price: product.sellPrice,
						listPrice: product.listPrice,
						showStriked: product.strikeListPrice === 'true' ? true : null,
						formattedTitle: product.sellPriceLabel.replace('Price:',''),
						ShipPackQty: product.ShipPackQty,
						pricingSpriteClass: product.saleIcon ? product.saleIcon.spriteClass : null,
						units: product.uomLabel ? '/ ' + product.uomLabel : null,
						saleExpiryDate: product.saleExpiryDate ? product.saleExpiryDate : null,
						isSpecial: product.isSpecial,
						savings: product.savings,
						neoPricing: product.neoPricing,
						nroPricing: product.nroPricing,
						tooltip: {
							content: Grainger.templates.disclaimers.pricingSignedIn({
								tooltipLabelAuth: Grainger._messages["product.tooltipLabel.auth"],
								primaryCat: product.primaryCat
							}),
							placement: 'bottom'
						},
						formattedPPIDate: product.lastOrderDate,
						icon: product.cspIcon
					};
				});

				// insert the new prices into the DOM
				$prices.each( function() {
					$this = $(this);
					$this.html(TemplatesPricing[$this.data('template')](productsBySku[$this.data('sku')]));
				});

				// insert icons
				$icons.each( function() {
					$this = $(this);
					addProductIcon($this, productsBySku[$this.data('sku')].icon, TemplatesPricing.icon);
				});

				// insert previously purchased item notice
				$ppiNote.each( function() {
					$this = $(this);
					if (productsBySku[$this.data('sku')].formattedPPIDate) {
						$this.html(TemplatesPricing[$this.data('template')](productsBySku[$this.data('sku')]));
						$this.removeClass('hide');
					}
				});
				
				//update digitalData - if IDP we only consider the values for IDP sku, all skus otherwise
				if(idpsku != 'undefined' && productsBySku[idpsku]) {
					if(!productsBySku[idpsku].neoPricing) {
						productsBySku[idpsku].neoPricing = false;
					}
					if(!productsBySku[idpsku].nroPricing) {
						productsBySku[idpsku].nroPricing = false;
					}
					digitalData.user.profile.attributes.neoPricing = productsBySku[idpsku].neoPricing;
					digitalData.user.profile.attributes.nroPricing = productsBySku[idpsku].nroPricing;
				}
				else {
					digitalData.user.profile.attributes.neoPricing = neoPricing; 
					digitalData.user.profile.attributes.nroPricing = nroPricing;
				}

				$(window).trigger("dynamic-pricing-loaded");

			}).always( function() {
				// prevent items from being replaced again, maybe reveal a style change
				$prices.removeClass('price-replace');
				$icons.removeClass('product-icon-replace');
				$ppiNote.removeClass('ppi-note-replace');
			});
		}
	};

	//Function to add additional product Icons to PIDP page
	function addProductIcon($el, context, template){
		$el.append(template(context));
	};

	//an event to load prices
	$(window).on('timeToLoadThePrices', function(e){
		loadCustomPrices();
	});

	//an event to render the header ribbon
	$(window).on('readyToRenderTheHeaderRibbon', function(e){
		if (headerPromise) {
			headerPromise.then(renderRibbon).fail(headerAjaxFail);
		}
	});

	//start fetch ribbon now
	headerPromise = fetchRibbon();

	//switch those prices when the DOM is ready
	$(function(){
		loadCustomPrices();
	});

	//Expose Methods and Variables
	Grainger.recognition = {
		fetchRibbon: fetchRibbon,
		loadCustomPrices: loadCustomPrices,
		addProductIcon: addProductIcon
	};

}(
	//Dependencies
	window.jQuery, 
	window.Grainger,
	window.Grainger.templates.recognition,
	window.Grainger.templates.pricing
));