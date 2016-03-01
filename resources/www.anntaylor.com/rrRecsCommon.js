// **************************
// rrRecsCommon - for ann.com
// 2014.05.29 - updated environement set up
//
// - populateCommonVars() function consolidates {rr} common instrumentation code into one central .js file
// - createPlacement() function creates html placement content from returned {rr} JSON object
//
// The following code must be present on the html/jsp page that references this file ahead of inclusion of this file:
// <script type='text/javascript' src='//media.richrelevance.com/rrserver/js/1.0/p13n.js'></script>
// **************************

var R3_COMMON = new r3_common();
var plcmnt0Name = '';
var plcmnt1Name = '';
var isInternational = 'false';
var rrRecs = '';
var shortDesc ='';
var showOrig = true;
	
function populateCommonVars(sessionID,userID,placement0Name,placement1Name,contextPath,productPageType,requestInternational) {

	plcmnt0Name = placement0Name;
	plcmnt1Name = placement1Name;
	
	if(requestInternational){
		isInternational = requestInternational;
	}

	R3_COMMON.addSegment('ann', 'Ann Taylor');
	R3_COMMON.setApiKey('fd45a23e448c9953');

	// ***** environment set up **********************************
	var contextPath ="";
	if(window.location.hostname != null){
		contextPath = window.location.hostname;
	}
	//console.log('{rr} contextPath: '+contextPath);
	if (contextPath == 'www.anntaylor.com') {
		//*********** production
		R3_COMMON.setBaseUrl(window.location.protocol+'//recs.richrelevance.com/rrserver/');
	} else {
		//*********** NON-production
		R3_COMMON.forceDevMode();
		R3_COMMON.forceDisplayMode();
	 	R3_COMMON.useDummyData();
		R3_COMMON.setBaseUrl(window.location.protocol+'//integration.richrelevance.com/rrserver/');
	}
	// ************************************************************

	R3_COMMON.setSessionId(sessionID);
	R3_COMMON.setUserId(userID); 
	if (placement0Name) {
		R3_COMMON.addPlacementType(plcmnt0Name);
	}
	if (placement1Name) {
		R3_COMMON.addPlacementType(plcmnt1Name);
	}

	RR.jsonCallback = function(){

		showOrig = RR.recsDisabled;

		if (placement0Name) {

		/*##########################################
		/ removed on 12/12/2013 post A/B TEST

			// omniture track A/A, A/B split
			s.linkTrackVars='prop30,eVar26';
			if (showOrig) {
				if (RR.controlSide == false) {
					s.prop30 = s.eVar26 = 'ControlValidation';
				} else {
					s.prop30 = s.eVar26 = 'control';
				}
			} else {
				s.prop30 = s.eVar26 = 'test';
			}
			s.tl(this,'o','rrRecs ABsplit');
		//#############################################*/

			switch (plcmnt0Name) {
				case 'item_page.ann1' :
				case 'item_page.ann_oos1' :
					if (showOrig) {
						$('#origRelatedProds').css("display","inline");
					} else {
						$('#origRelatedProds').empty();
						createPlacement(RR.data.JSON.placements[0], rrPlacement0, isInternational);
						createPlacement(RR.data.JSON.placements[1], rrPlacement1, isInternational);
					}
					break;
				case 'cart_page.ann1' :
					if (showOrig) {
						$('#relatedThumbs').css("display","inline");
					} else {
						$('#relatedThumbs').empty();
						$('#relatedThumbs').removeClass('thumbs')
						$('#relatedThumbs').css("display","inline");
						createPlacement(RR.data.JSON.placements[0], relatedThumbs, isInternational);
					}
					break;
				case 'cart_page.ann_empty' :
					if (!showOrig) {
						$('#relatedThumbs').empty();
						$('#relatedThumbs').removeClass('thumbs')
						$('#relatedThumbs').css("display","inline");
						createPlacement(RR.data.JSON.placements[0], relatedThumbs, isInternational);
					}
					break;
				case 'search_page.ann1' :
					if (!showOrig) {
						createPlacement(RR.data.JSON.placements[0], rrPlacement1, isInternational);
					}
					break;

				case 'search_page.ann_noresults1' :
					if (!showOrig) {
						createPlacement(RR.data.JSON.placements[0], searchTipsRR, isInternational);
					}
					break;
			}	
		}
	}
}

function createPlacement(RRData, placementId, isInternational) {
	
	// i7Fix- check when RRData is undefined
	if(typeof RRData === "undefined"){
		return;
	}

	// set data variables
	var msg = RRData.message;
	var items = RRData.items;

	// create rrRecs div
	var div = document.createElement('div');
	rrRecs = "rrRecs";
	if (placementId.id == 'rrPlacement0') {
	rrRecs ="rrRecsV";
	}
	div.setAttribute('id',rrRecs);
	div.setAttribute('class','clearfix');

		// create heading and add to rrRecs div
		var h4 = document.createElement('h4');
		h4.innerHTML = msg;
	div.appendChild(h4);

		// create list of items and add to rrRecs div
		var ol = document.createElement('ol');
	div.appendChild(ol);
	
	// populate list
	var li = "";
	var a = "";
	var img = "";
	var span = "";
	var br = "";
	var imgDiv = "";
	var overlayDiv = "";
	var infoDiv = "";
	var topVal = "";
	var bkgrnd = "";
	for(var i in items) {
		// link
		a = document.createElement('a');
		a.href = items[i].linkurl;
			li = document.createElement('li');
			a.onclick = function () {
            	// omniture
            	s.linkTrackVars='prop29,eVar3';
                switch (plcmnt0Name) {
					case 'item_page.ann1' :
						s.prop29 = s.eVar3 = 'Prod Crosssell';
						break;
					case 'item_page.ann_oos1' :
						s.prop29 = s.eVar3 = 'ProdSO Crosssell';
						break;
					case 'cart_page.ann1' :
						s.prop29 = s.eVar3 = 'Cart upsell';
						break;
					case 'search_page.ann1' :
						s.prop29 = s.eVar3 = 'Search Recommendations';
						break;
					case 'search_page.ann_noresults1' :
						s.prop29 = s.eVar3 = 'Search No Result';
						break;
				}	
				if (placementId.id == 'rrPlacement1') { 
					switch (plcmnt1Name) {
						case 'item_page.ann2' :
							s.prop29 = s.eVar3 = 'Prod Bottom';
							break;
						case 'item_page.ann_oos2' :
							s.prop29 = s.eVar3 = 'ProdSO Bottom';
						break;
					}
				}
				s.tl(this,'o','rrRecs');
        	};
				// image
				imgDiv = document.createElement('div');
				imgDiv.className += 'image';
				if ((placementId.id == 'rrPlacement0') && ((plcmnt0Name == 'item_page.ann1' || plcmnt0Name == 'item_page.ann_oos1'))){
					imgDiv.setAttribute('id', 'image'+i);
				}
					// image
						img = document.createElement('img');
						img.src = 'http://'+items[i].imageurl;
						img.width = 102;
						img.height = 125;
						img.id = 'productImage'+i;
						img.setAttribute('alt', items[i].name);
								
					imgDiv.appendChild(img);
				
					// overlay
					overlayDiv = document.createElement('div');
					overlayDiv.className +=  'overlay';
					if ((placementId.id == 'rrPlacement0') && ((plcmnt0Name == 'item_page.ann1' || plcmnt0Name == 'item_page.ann_oos1'))){
						overlayDiv.setAttribute('id', 'overlay'+i);
					}
							//info
							infoDiv = document.createElement('div');
							if ((placementId.id == 'rrPlacement0') && ((plcmnt0Name == 'item_page.ann1' || plcmnt0Name == 'item_page.ann_oos1'))){
								infoDiv.className +=  'info';
							} 
									// name
									shortDesc = items[i].name;
									//Code for termnating string after 75 char for vertical RR product only
									if (placementId.id == 'rrPlacement0') {
											shortDesc = shortDesc.substr(0,75);
									}

									span = document.createElement('span');
									span.innerHTML = shortDesc;
							infoDiv.appendChild(span);
				
									// <br />
									br = document.createElement('br');
							infoDiv.appendChild(br);
									// price
									span = document.createElement('span');
										if (items[i].pricemin == "") {
											// print the price.	
											span.innerHTML = '$'+((Number(items[i].price)).toFixed(2));
										} else {
											// min is present - check if max is there or not
											if (items[i].pricemax != ""){
												// max is present - print the range.
												span.innerHTML = '$'+((Number(items[i].pricemin)).toFixed(2))+'-$'+((Number(items[i].pricemax)).toFixed(2));
											}else {
												// print the price.
												span.innerHTML = '$'+((Number(items[i].price)).toFixed(2));
											}
										}
							//new code added by Rahul ANNINC-1973	
							if(isInternational == "false"){
								infoDiv.appendChild(span);
							}
						overlayDiv.appendChild(infoDiv);
					imgDiv.appendChild(overlayDiv);
					// rating - if rating value is not -1.0, and it is not null, show rating
					if ((items[i].rating != '') && (items[i].rating != undefined)) {
						// image
						img = document.createElement('img');
						img.setAttribute('border', '0');
						img.setAttribute('title', 'Ratings-'+items[i].rating);
						img.setAttribute('alt', 'Ratings-'+items[i].rating);
						img.id = 'ratingImg';
						img.width = 81;
						img.height = 14;
						if ((placementId.id == 'rrPlacement0') && ((plcmnt0Name == 'item_page.ann1' || plcmnt0Name == 'item_page.ann_oos1'))){
							img.src = '/webassets/ann/en_US/assets/images/bazaarvoice/stars_wht/rating-'+items[i].rating.substring(0,1)+'_'+items[i].rating.substring(2)+'.gif';
							img.className += " clearfix";
							infoDiv.appendChild(img);
							//console.log('add to info');
						} else {
							img.src = '/webassets/ann/en_US/assets/images/bazaarvoice/category/rating-'+items[i].rating.substring(0,1)+'_'+items[i].rating.substring(2)+'.png';
							imgDiv.appendChild(img);
							//console.log('add to img');
						}
						
					}
						a.appendChild(imgDiv);
					li.appendChild(a);
			ol.appendChild(li);
	}

	// append rrRecs div to body placement div
    placementId.appendChild(div);

	//Code to get and set height of RR Product
	var max = -1;
	$('#rrRecs li').each(function(i,val){
    		var h = $(this).find('.overlay').height(); 
    		max = h > max ? h : max;
	});

       var prodImgHeight   = $('.rrPlacementH .image #productImage0').height();
	   var ratingImgHeight = $('.rrPlacementH .image #ratingImg').height();
       var totRrHeight     = max + prodImgHeight +  ratingImgHeight; 
	$('.rrPlacementH #rrRecs').css('height',totRrHeight);


}

