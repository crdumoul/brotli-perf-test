//$Revision$, $Date$ and $Author$
/*jslint bitwise: false, eqeqeq: false, plusplus:false, newcap: true, nomen:true, onevar: true, regexp: false, white: false, plusplus: false */
/*global window $ jQuery ATT reporting_ready*/


/*
 * Webtrend selectors for HR2.0
* @method cqWebtrend
* @param object {}
* @return {Object} nothing
* @example
*/
ATT.namespace('cqWebtrend');
var crosssellpopup = false;
ATT.cqWebtrend = new function ($, doc) {	
	var mtTDConsumpEng;
	var mtTDPageId;
	var PBaddCart = jQuery('#isPreOrderable').val() === 'true' ? 'HRock_Cart_Add_PreOrder_Submit' : 'HRock_Cart_Add_Submit';
    var getCTClickId, $cqclickid, filterdata, sku, wtSkuPrice, 
            wtSkuQty, filterevent, wtPaperlessbillopt, servQty, planPrice, servPrice, planQty, href = doc.location.href, actualpath,
        cartId = "",
        wtargs, evt,
        wtMIRInd = $('.mir').val() ? "Y" : "N", existingId,
        wtzip  , wtcartstate, buyflowType, wtcartcontent ,
        commonLogs = [], contextarr = ["#deviceLayout,.navigation,#cart-preview-container,#helpMeChoose "],
        context = contextarr.join(''),
        addArrItems = function(arr){
            if(ATT.type(arr) !== 'array'){
                return;
            }
            
            var i = arr.length ,sum = 0;   
            arr = ATT.util.filter(arr, function(n) { return n;});
            while(i--){
                sum+=arr[i];
            }

            return sum;
        },
        ecParams = function(wtargs) {
            var wtSLID = $('meta[name="DCSext.wtSLID"]'), wtAcctNum = $('meta[name="DCSext.wtAcctNum"]'), wtCTN = $('meta[name="DCSext.wtCTN"]');
            if (wtSLID.length === 1) {
                wtargs.push('DCSext.wtSLID');
                wtargs.push(wtSLID.attr('content'));
            }
            if (wtAcctNum.length === 1) {
                wtargs.push('DCSext.wtAcctNum');
                wtargs.push(wtAcctNum.attr('content'));
            } else if (wtCTN.length == 1) {
                wtargs.push('DCSext.wtCTN');
                wtargs.push(wtCTN.attr('content'));
            }
            return wtargs;
        },
        eventCheck = (function () {
            var href = location.href, evt , filterevent, wt, 
                wtcartcontent = function (){
                    if (!!ATT.globalVars.cartContents && !!ATT.globalVars.cartContents.wtCartContents) {
                        wt = ATT.globalVars.cartContents.wtCartContents;
                    } else if(ATT.util.getCookie('wtContents') && ATT.util.getCookie('wtContents') != "undefined"){
                        wt = ATT.util.getCookie('wtContents');
                    } else {
                        wt = "";
                    }
                    return wt;
                };
            
            if (~href.indexOf('/devices/') || ~href.indexOf('/cellphones/') || ~href.indexOf('/tablets/') || ~href.indexOf('/addaline')) {
                filterevent = "HRock_DeviceListFilter_Click";
                evt = "HRock_DeviceListView_Click";
            }
            if (~href.indexOf('/services/')) {
                filterevent = 'HRock_ServiceListFilter_Click';
            }
            if (~href.indexOf('/accessories/') ||~href.indexOf('/audio/') ||~href.indexOf('chargers/') ||~href.indexOf('cases/') || ~href.indexOf('/wearables/')) {
                filterevent = 'HRock_AccessoryListFilter_Click';
                evt = "HRock_AccessoryListView_Click";
            }
            if (~href.indexOf('/plans')) {
                filterevent = 'HRock_PlanListFilter_Click';
                evt = "HRock_PlanListView_Click";
            }
            if (~href.indexOf('/packageslist')) {
                filterevent = 'HRock_PackageListFilter_Click';
                evt = "HRock_PackageListView_Click";
            }
            
            

            if (ATT.globalVars.cartContents && ATT.globalVars.cartContents.cartId) {
                cartId = ATT.globalVars.cartContents.cartId;
            } else {
                cartId = "";
            }
            
            wtcartstate = ATT.globalVars.wtCartState;
            
            return{
                evt:evt,
                filterevent:filterevent,
                wtcartcontent:wtcartcontent,
                cartId:cartId,
                wtcartstate:wtcartstate
            };
        }()),
        
        cbEvents = {
            cqClick:function (e) {
                var clickid = this.getAttribute("data-cqpath"), $target = $(e.target), src = e.target.getAttribute("src"), 
                    helem = $target.attr('href'), i, $this = $(this), loc,linkLoc,linkName,
                    pageSection = { Marquee_:"#marquee", PriceBlock_:'.priceblock', Carousel_: '.carouselWrapper', MarqueeTile_:'.marqueeTile', LinkFarm_Col_: '.linkFarmCol', ServiceBar_: '.serviceItem', 
                                    GlobalFooter: '#footer', LeftRail_:'.left-rail,#left-body', RightRail_:'.right-rail',ShoppingAssistant_:'#shoppingassistant', WirelessTile_:'.wirelessvalueTile',
                                    Body:'#primary-content,#tabsLinks, #right-body', PageHeaderBand:'#underNav', BasicValueTile_:'.basicvalueTile', LeadGenerationBar:'#stayConnectedID',
                                    SecondaryContent_:'#secondary-content'};
                // if target element has data-preventWtCQClickHit="true" then no wtCqClickId will be generated.
                if ($target.data('preventWtCQClickHit')==true || this.getAttribute("data-preventWtCQClickHit")=="true"){
                    return;
                }   
                if ($target.data('linkLoc')) { // if data-linkLoc is specified on anchor this will override the default loc.  Only do this per EDD requirement.
                    loc = $target.data('linkLoc').replace(" ",'');
                } else {
                    for(i in pageSection){
                        if ($this.parents(pageSection[i]).length) {
                            loc = i.replace(/_$/, '_' + ($(pageSection[i]).index($(this).parents(pageSection[i]))+1)) || '';
                        }
                    }
                }
                if(!loc){loc = "unknownLoc";}
                if(/^#tab/.test(helem)){
                    ATT.log('inside:'+ helem +'~~'+$target.text());
                    linkLoc="Tab_"+loc;
                    if(/^#tab4/.test(helem)){
                    	clickid = clickid + '~~'+loc+ $.trim($target.attr('data-message'));
                    	 linkName=$.trim($target.attr('data-message'));
                    }else{
                    	clickid = clickid + '~~'+loc+ $.trim($target.text());
                    	linkName=$.trim($target.text());
                    }
                }else{
                    if($target.data('linkName')) {
                        clickid = clickid + '~~'+loc+ $target.data('linkName').replace(" ",'');
                        linkName=$target.data('linkName').replace(" ",'');
                    } else {
                        clickid = clickid ? clickid + '~~'+loc : '';
                        linkName='';
                    }
                }
                
                wtargs = ['DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtNoHit', 1, 'DCSext.wtCustType', 'Consumer'];
                wtargs.push('DCSext.ctClickId', getCTClickId.apply(this));
                wtargs.push('DCSext.wtLinkLoc',linkLoc);
                wtargs.push('DCSext.wtLinkName',linkName);

                if($target.data('dcsuri')) { 
                    wtargs.push('DCS.dcsuri');
                    wtargs.push($target.data('dcsuri'));
                }
                //Web trend - capturing Additional click parameters - Defect #42634
				if (v_ufPage === true) {
					
					if(crosssellpopup) {
                    	 wtargs.push('DCSext.wtPN', 'HRUverse UF Cross-Sell Option2_Pg');
                         wtargs.push('DCSext.wtAppName', $('meta[name="DCSext.wtAppName"]').attr('content'));
                         wtargs.push('DCSext.wtLinkLoc', "HRUverse UF Cross-Sell Option2_Pg_Body");
                    }
                    else { wtargs.push('DCSext.wtPN', $('meta[name="DCSext.wtPN"]').attr('content'));
                         wtargs.push('DCSext.wtAppName', $('meta[name="DCSext.wtAppName"]').attr('content'));
                         wtargs.push('DCSext.wtLinkLoc', $('meta[name="DCSext.wtPN"]').attr('content')+"_Body");
                    }
					
					if ($.trim($target.text()) !== "") {
						wtargs.push('DCSext.wtLinkName', $.trim($target.text()));
					} else {
						wtargs.push('DCSext.wtLinkName', e.target.getAttribute("alt"));
					}
				}
				/*** Carousel Click Tracking ***/
				$currentTarget = $(e.currentTarget);
				carLinkLoc = $currentTarget.data('carousel-name') || $currentTarget.data('carouselName') || "";
				if (carLinkLoc != "") {
					carLinkSku = $currentTarget.data('carousel-sku') || $currentTarget.data('carouselSku') || "";
					wtargs.push('DCSext.wtLinkLoc', carLinkLoc);
					wtargs.push('DCSext.wtOfferSku', carLinkSku);
					clickid=carLinkLoc;
					carLinkIndex = "0" + ($currentTarget.parents('.wirelessCarouselTypeNoTab').find('li').index($currentTarget.parents("li")) + 1);
					if (carLinkIndex.length > 2) {
						carLinkIndex = carLinkIndex.substring(1);
					}
					wtargs.push('DCSext.wtLinkName', carLinkIndex);
				}
                              

                // CartSummary Accessory UpSell CrossSell Modals 
				$accModalcurrentTarget = $(e.currentTarget);
				accModalLinkLoc = $accModalcurrentTarget.data('accmodal-name') || $accModalcurrentTarget.data('accmodalName') || "";
                //alert("AT CQ webtrend accModalLinkLoc: "+accModalLinkLoc);
				if (accModalLinkLoc != "") {
					accModalLinkSku = $accModalcurrentTarget.data('accmodal-sku') || $accModalcurrentTarget.data('accmodalSku') || "";
     //               alert("AT CQ webtrend accModalLinkSku: "+accModalLinkSku);
					wtargs.push('DCSext.wtLinkLoc', accModalLinkLoc);
					wtargs.push('DCSext.wtOfferSku', accModalLinkSku);
                    wtargs.push('DCSext.wtLinkName', accModalLinkSku);
     //               alert("AT CQ in if comdition");

                    clickid=accModalLinkLoc;
				}

                // View X Bought Y Click Tracking 
				$vxbycurrentTarget = $(e.currentTarget);
				vxbyLinkLoc = $vxbycurrentTarget.data('vxby-name') || $vxbycurrentTarget.data('vxbyName') || "";
     //            alert("AT CQ webtrend vxbyLinkLoc: "+vxbyLinkLoc);
				if (vxbyLinkLoc != "") {
					vxbyLinkSku = $vxbycurrentTarget.data('vxby-sku') || $vxbycurrentTarget.data('vxbySku') || "";
     //               alert("AT CQ webtrend vxbyLinkSku: "+vxbyLinkSku);
					wtargs.push('DCSext.wtLinkLoc', vxbyLinkLoc);
					wtargs.push('DCSext.wtOfferSku', vxbyLinkSku);
                    wtargs.push('DCSext.wtLinkName', vxbyLinkSku);
     //               alert("AT CQ in if comdition");

                    clickid=vxbyLinkLoc;

                    vxvyLinkIndex = "0" + ($currentTarget.parents('.vxby_g_container').find("tr").index($currentTarget.parents("tr")) + 1);
     //               alert("vxvyLinkIndex: " + vxvyLinkIndex);
        			if (vxvyLinkIndex.length > 2) {
						vxvyLinkIndex = vxvyLinkIndex.substring(1);
        			}

                    wtargs.push('DCSext.wtLinkName', vxvyLinkIndex);


				}


      		    // View X Viewed Y Click Tracking 
				$vxvycurrentTarget = $(e.currentTarget);
				vxvyLinkLoc = $vxvycurrentTarget.data('vxvy-name') || $vxvycurrentTarget.data('vxvyName') || "";
     //            alert("AT CQ webtrend vxvyLinkLoc: "+vxvyLinkLoc);
				if (vxvyLinkLoc != "") {
					vxvyLinkSku = $vxvycurrentTarget.data('vxvy-sku') || $vxvycurrentTarget.data('vxvySku') || "";
     //               alert("AT CQ webtrend vxvyLinkSku: "+vxvyLinkSku);
					wtargs.push('DCSext.wtLinkLoc', vxvyLinkLoc);
					wtargs.push('DCSext.wtOfferSku', vxvyLinkSku);
                    wtargs.push('DCSext.wtLinkName', vxvyLinkSku);
     //               alert("AT CQ in if comdition");

                    clickid=vxvyLinkLoc;

                    vxvyLinkIndex = "0" + ($currentTarget.parents('.vxvy_g_container').find("tr").index($currentTarget.parents("tr")) + 1);
       //             alert("vxvyLinkIndex: " + vxvyLinkIndex);
        			if (vxvyLinkIndex.length > 2) {
						vxvyLinkIndex = vxvyLinkIndex.substring(1);
        			}

                    wtargs.push('DCSext.wtLinkName', vxvyLinkIndex);


				}
                // HR Thank You Page Recs Click Tracking 
                $hrtycurrentTarget = $(e.currentTarget);
                hrtyLinkLoc = $hrtycurrentTarget.data('hrty-name') || $hrtycurrentTarget.data('hrtyName') || "";
                if (hrtyLinkLoc != "") {
                    hrtyLinkSku = $hrtycurrentTarget.data('hrty-sku') || $hrtycurrentTarget.data('hrtySku') || "";
                    wtargs.push('DCSext.wtLinkLoc', hrtyLinkLoc);
                    wtargs.push('DCSext.wtOfferSku', hrtyLinkSku);
                    wtargs.push('DCSext.wtLinkName', hrtyLinkSku);
                    clickid=hrtyLinkLoc;
                    hrtyLinkIndex = "0" + ($currentTarget.parents('.hrty_g_container').find("tr").index($currentTarget.parents("tr")) + 1);
                    if (hrtyLinkIndex.length > 2) {
                        hrtyLinkIndex = hrtyLinkIndex.substring(1);
                    }
                    
                    wtargs.push('DCSext.wtLinkName', hrtyLinkIndex);
                }



     //           alert("wtargs: " +  wtargs);
                if(clickid || $target.data('linkName')){
                    window.dcsMultiTrack.apply(this, wtargs);
     //               alert("Applky happens");
                }
            }
        };
        
        getCTClickId = function () { 
            var obj = jQuery(this); 
         	var pageSectionElement = obj.closest('[data-teaserid]'); 
            //var cntIDs = pageSectionElement.find('[data-tisid]'); 
            //var firstcntID = jQuery(cntIDs[0]).attr('data-tisid'); 
            var cntID = obj.closest('[data-tisid]').attr('data-tisid'); //firstcntID;//obj.closest('[data-tisid]').attr('data-tisid'); 
            var cmsName = 'TDATA-HR'; 
          if (!cntID) { 
                         cntID = obj.attr('data-cqpath'); 
              cmsName = 'CQ'; 
          } 
          if(cmsName === 'TDATA-HR') {
        	  
        	  wtargs.push('DCSext.mtTDPageId', tdataPageID);
        	  wtargs.push('DCSext.mtTDConsumpEng', 'ATTCOM');
        	  
          }
          
          var pSection = pageSectionElement.attr('data-teaserid'); 
          var pageSection = (!pSection) ? 'body' : pSection; 
 
            return [ 
                   obj.attr('data-cqpath'), // content id 
                   undefined, // undefined 
                   pageSection, //obj.closest('[data-teaserid]').data('teaserid'), // page section 
                   cntID,//obj.data('cqpath'), // content id 
                   undefined, // undefined,  for cmsName//'CQ' // TODO implment TDATA or CQ 
                   cmsName 
             ].join('~'); 
      };
        
        this.getLobContractSummary = function(){
            var summaryModel = {"24":0, "12": 1, "0": 2, "20": 3};
            var contracts = [0,0,0,0];
            var contractSummary = "";
            
            if(ATT.globalVars.cartContents && ATT.globalVars.cartContents.lob){
                jQuery.each(ATT.globalVars.cartContents.lob.items, function(index, item){
                    var summaryIndex = summaryModel[item.contractLength];
                    if(typeof summaryModel[item.contractLength] == 'undefined'){return true}
                    if(typeof contracts[summaryIndex] == 'undefined'){contracts[summaryIndex] = 0}
                    contracts[summaryIndex]++
                });
                
                contractSummary = contracts.join("~");
                ATT.globalVars.cartContents.contractSummary = contractSummary;
               // window.localStorage.setItem("contractSummary", contractSummary);
                return contractSummary;
            }else{
            	return ATT.globalVars.cartContents.contractSummary;
               // return window.localStorage.getItem("contractSummary");
            }
        }
        
        /**
        * This function will work only on checkout page which has options to change shipping methods
        *
        */
        this.storeFulfillChangeInd = function () {
            if ( (!! ATT.globalVars.cartContents.wtStoreFulfillChangeInd && ATT.globalVars.cartContents.wtStoreFulfillChangeInd =="Y" ) || ATT.util.getCookie('wtStoreFulfillChangeInd') == "Y"){
                return "Y";
            }else{
                return "";
            }
        }
        /****RTI WT tags on page load
        ?   wtEvent
        ?   wtSuccessFlag
        ?   wtStatusCode or wtStatusMsg
        ?   wtOOSSKU
        ?   wtOOSSKUCount
        ?   wtSKUCount
        ?   wtSLID (authenticated customers only)
        ?   wtBAN/wtCTN/wtBTN (authenticated customers only) 
        ************/
        
        
        this.wtRTIOther = function wtRTIOther() {
            //var wtargs = ['DCSext.wtSuccessFlag', 1, 'DCSext.wtStatusCode', 0, 'DCSext.wtBAN', ATT.globalVars.ban];
            jQuery('head > meta[name="DCSext.wtSuccessFlag"]').remove();
            jQuery('head > meta[name="DCSext.wtStatusCode"]').remove();

            jQuery('<meta/>', {name: 'DCSext.wtSuccessFlag', content: 1}).appendTo('head');
            jQuery('<meta/>', {name: 'DCSext.wtStatusCode', content: 0}).appendTo('head');
            jQuery('<meta/>', {name: 'DCSext.wtBAN', content: ATT.globalVars.ban}).appendTo('head');
            
            var r = (ATT.util.getCookie("colam_ctn") || ""),
            j = $.parseJSON('{"' + r.replace(/%3B/gi, '","').replace(/%3D/gi, '":"').replace(/%40/gi, '@') + '":""}'),
            a=/^[0-9]*$/;
            if (j.uid !== undefined ) {
                var logintype = a.test(j.uid) ? "CTN" : "SLID";
                if (logintype === "CTN") {
                    //wtargs.push('DCSext.wtCTN', j.uid);
                    jQuery('<meta/>', {name: 'DCSext.wtCTN', content: j.uid}).appendTo('head');
                }else {
                    //wtargs.push('DCSext.wtSLID', j.uid);
                    jQuery('<meta/>', {name: 'DCSext.wtSLID', content: j.uid}).appendTo('head');
                }
            }
            
            //window.dcsMultiTrack.apply(this, wtargs);         
        } 
        
        /****RTI WT tags on page load/view/filter/showmore
        ?   wtOOSSKU
        ?   wtOOSSKUCount
        ?   wtSKUCount
        ***************/

        this.wtRTISku = function wtRTISku() {
            var wtrti = ATT.cqWebtrend.wtSKUDetails();
            jQuery('<meta/>', {name: 'DCSext.wtOOSSKU', content: wtrti.oosSKU}).appendTo('head');
            jQuery('<meta/>', {name: 'DCSext.wtOOSSKUCount', content: wtrti.oosSKUCount}).appendTo('head');
            jQuery('<meta/>', {name: 'DCSext.wtSKUCount', content: wtrti.SKUCount}).appendTo('head');
            
        }
        this.wtSKUDetails = function wtRTISku() {
            var sku = [], i = jQuery('.outOfStockOpacity').length, m = jQuery('img[id*="image-sku"]').length, n = jQuery('div[id*="item_sku"]').length;
            var SKUCount = (m!=0) ? m : n;          
            var oos = (m!=0) ? jQuery('.outOfStockOpacity') : jQuery('.outOfStockOpacity').parents('div[id*="item_sku"]');
            while (i--) {
                sku[i] = (m!=0) ? jQuery(oos[i]).attr('id').split('-')[1] : jQuery(oos[i]).attr('id').split('_')[1] ;
            }
            var oosSKU = sku.join('|');
            var oosSKUCount = jQuery('.outOfStockOpacity').length;
            oosSKUCount = (oosSKUCount!=0) ? oosSKUCount :'0';
            
            return {
                oosSKU:oosSKU,
                oosSKUCount:oosSKUCount,
                SKUCount:SKUCount
            };
        }
        this.delay = function(millis) {
            var dfd = jQuery.Deferred();
            setTimeout(function() {
                dfd.resolve();
            }, millis || 3000);
            return dfd.promise();
        }
    
       //this function makes an ajax call to athe jsp to report CSR JMS events
        this.loadcsrjmsevents = function (event) {
        	
        	var resourcePath = document.location.pathname.replace('.html','');
        	resourcePath = resourcePath.replace('.xhr','');
        	var  ajaxPath = resourcePath + '.csrjmsevents.xhr.html';
        	
                jQuery.ajax({
                	'async': true,
                	 data: ({eventName:event}),
                     type:"GET",
                     url : ajaxPath,
                     cache:false,
                     success:function(response, status, xhr) {
                     }
                });
        }
        
    //check to see if list pages add proper params
    $('div[class*=listPage-left-nav]').click(function (e){
        
        var r = $(e.target).parents('div[id*=navigation]').attr('id'), upper = (r==="navigation")?"Shared Plans":"Individual Plans", navselected = $.trim($(this).text()), combine = upper +'|'+navselected;
        wtargs = ['DCSext.wtFilterSelect', combine, 'DCSext.wtNoHit', 1,
            'DCSext.wtEvent', eventCheck.filterevent, 'DCSext.wtEventType', 'User',
            'DCSext.wtCart', eventCheck.cartId, 'DCSext.wtCartType', 'eCommerce', 'DCSext.wtBAN', ATT.globalVars.ban,
            'DCSext.wtStatusCode', "0", 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
            'DCSext.wtZipCode',ATT.globalVars.zip(), 'DCSext.wtCartState', eventCheck.wtcartstate,
            "DCSext.wtCustType", "consumer", 'DCSext.wtCQClickId', $cqclickid, 'DCSext.wtSuccessFlag', 1,
            "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtCustType", "consumer"];
        window.dcsMultiTrack.apply(this, wtargs);
    });

    //filters delegation
    $('body').delegate('.listFilterGroup', 'click', function () {
        var navselected = $('.listPage-left-nav-selected-top').text() ||
                          $('.listPage-left-nav-selected-middle').text() ||
                          $('.listPage-left-nav-selected-bottom').text();
        $cqclickid = $(this).data('cqpath');
        filterdata = $.trim(navselected) + '|' +
            $.trim($(this).closest("form").find('h3').text()) + "|" +
            $.trim($(this).closest("li").find("label").text() || $(this).closest("li").find("a").data("tokencontent").replace(/[^a-z0-9//\-$. ]/gi, ''));

        if (filterdata.charAt(0) === "|") {
            filterdata = filterdata.slice(1);
        }

        ATT.cqWebtrend.delay(4000).then(function() {
            var wtrti = ATT.cqWebtrend.wtSKUDetails();
            wtargs = [
                'DCSext.wtFilterSelect', filterdata, 'DCSext.wtNoHit', 1,
                'DCSext.wtEvent', eventCheck.filterevent, 'DCSext.wtEventType', 'User',
                'DCSext.wtCart', eventCheck.cartId, 'DCSext.wtCartType', 'eCommerce', 'DCSext.wtBAN', ATT.globalVars.ban,
                'DCSext.wtStatusCode', "0", 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
                'DCSext.wtZipCode',ATT.globalVars.zip(), 'DCSext.wtCartState', eventCheck.wtcartstate,
                "DCSext.wtCustType", "consumer", 'DCSext.wtCQClickId', $cqclickid, 'DCSext.wtSuccessFlag', 1,
                "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtCustType", "Consumer",
                "DCSext.wtOOSSKU", wtrti.oosSKU,"DCSext.wtOOSSKUCount", wtrti.oosSKUCount,"DCSext.wtSKUCount", wtrti.SKUCount
            ];
            window.dcsMultiTrack.apply(this, wtargs);
        });
    });
    
    // clear filters
    $('.clearFilter', '#content').bind('click', function () {
        ATT.cqWebtrend.delay(4000).then(function() {
            var wtrti = ATT.cqWebtrend.wtSKUDetails();
            var wtclick = '/content/att/shop/en/wireless/devices/cellphones/jcr:content/filterparsys/clearall/clearallfilter';
            wtargs = ['DCSext.wtFilterSelect', "Clearfilter", 'DCSext.wtNoHit', 1,
                'DCSext.wtEvent', eventCheck.filterevent, 'DCSext.wtEventType', 'User',
                'DCSext.wtCart', eventCheck.cartId, 'DCSext.wtCartType', 'eCommerce',
                'DCSext.wtStatusCode', "0", 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
                'DCSext.wtZipCode',ATT.globalVars.zip(), 'DCSext.wtCartState', eventCheck.wtcartstate,
                "DCSext.wtCustType", "consumer", 'DCSext.wtCQClickId', wtclick, 'DCSext.wtSuccessFlag', 1,
                "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtCustType", "consumer",
                "DCSext.wtOOSSKU", wtrti.oosSKU,"DCSext.wtOOSSKUCount", wtrti.oosSKUCount,"DCSext.wtSKUCount", wtrti.SKUCount];
            window.dcsMultiTrack.apply(this, wtargs);
        });
    });

/**************add to cart hook up********************************************************/

     
    $(doc).bind('CartSuccess CartConflict', function(e, d) {
        if (!! d.data && !! d.data.wirelessAddToCartResultHolder) {
            var linesLen, 
                losg, 
                eventType = e.type, 
                statusCode, 
                statusFlag, 
                lines,
                skuPrice,
                skuQty,
                cartLine, 
                errorCode, 
                contractLength, 
                contractType = $(d.originatingOrder.originatingTarget).closest(".cartItem").data("contractType"),
                
                losgInContext =  (ATT.globalVars.cartContents && ATT.globalVars.cartContents.losgInContext) ? ATT.globalVars.cartContents.losgInContext:null,
                data = ATT.globalVars.cartContents,     
                currentLine = function (){
                    if(data && data.lob && data.lob.items){
                        lines = data.lob.items;
                        linesLen = lines.length;
                        
                        while(linesLen--){
                            losg = lines[linesLen].id;
                            if(losgInContext === losg){
                                cartLine = lines[linesLen].displayName;
                            }
                        }
                        
                    }
                    return cartLine;
                },
                origTarget = $(d.originatingOrder.originatingTarget)?$(d.originatingOrder.originatingTarget):'',
                addItems, len , sku,
                planList =/\/individualplans\.html|\/familyplans\.html|\/dataplans\.html|\/prepaidplans\.html/, 
                //commonURL = /\/devices\/|\/cellphones\/|\/tablets\/|\/chargers\/|\/cases\/|\/voice\/|\/accessories\/|\/audio\/|\/phone-chargers\/|\/phone-cases\/|\/wearables\//,
                commonURL = jQuery('meta[name*=detailPage]').attr('content'),
                href = location.href,
                item = {
                    sku:[],
                    price:[],
                    quantity:[]
                }, clickid, wtevent = PBaddCart;
            
            addItems = d.data.wirelessAddToCartResultHolder.addItems;
            if((d.data.wirelessAddToCartResultHolder.rollUpErrorCode).indexOf('err.WLS') == -1){
            	errorCode = d.data.wirelessAddToCartResultHolder.rollUpErrorCode ? d.data.wirelessAddToCartResultHolder.rollUpErrorCode : "-2";
            }else {
            	errorCode = d.data.wirelessAddToCartResultHolder.rollUpErrorCode;
            }
            statusCode = e.type === 'CartSuccess' ? '0' : errorCode;
            statusFlag = statusCode === '0' ? 1 : '0'; //ECOM1202-8735
            len = addItems.length;
            
            if(!addItems || !len || origTarget.attr('class')==="noThanks noThanksCart"){
                //skip and do nothing
            }else{
                if(commonURL === 'devicePage' || commonURL === 'accessory'){
                    clickid = $('.addToCart img').data('cqpath') || $('.btn.addToCart').data('cqpath');
                }else if(~href.indexOf('/packages/')){
                    clickid = $('.addPackageToCart img').data('cqpath');
                }else if(planList.test(href)){
                    clickid = '/content/att/shop/wireless/planList/jcr:content';
                }else if(~href.indexOf('/services/')){
                    clickid = '/content/att/shop/wireless/service/jcr:content';
                }else{
                    clickid = "";
                }
                
                v_qtyAllow = jQuery('#qtyAllow').val();
                
                contractLength = "";
                commitmentTermSelect = jQuery('.priceBlock #commitmentTerm');
                if(!commitmentTermSelect.length){commitmentTermSelect = jQuery('.priceBlock input[id="commitmentTerm"]')}
                if (commitmentTermSelect && commitmentTermSelect.length) {contractLength = commitmentTermSelect.val()}
                
                if (typeof v_qtyAllow == "undefined" && typeof ATT.globalVars.cartContents.lob != "undefined"){
                        var skuMap ={};
                        var priceMap = {};
                        var lines = ATT.globalVars.cartContents.lob.items;
                        var linesLen = lines.length;
                
                        while(linesLen--){
                            parts = lines[linesLen].parts;
                            if(typeof parts.device !="undefined" ){
                                deviceLen = parts.device.length;
                            }else if(typeof parts.accessoryonly !="undefined" ){
                                deviceLen = parts.accessoryonly.length;
                            }else if(typeof parts.packageFromAccessoryPackage !="undefined" ){
							deviceLen = parts.packageFromAccessoryPackage.length;
							}
                            while(deviceLen--){
                                if(typeof parts.device!="undefined" ){
                                if(skuMap.hasOwnProperty(parts.device[deviceLen].sku)){
                                    skuMap[parts.device[deviceLen].sku]=skuMap[parts.device[deviceLen].sku]+1;
                                }else{
                                    skuMap[parts.device[deviceLen].sku]=1;
                                    priceMap[parts.device[deviceLen].sku]=parts.device[deviceLen].prices.dueToday;
                                }
                                }else if(typeof parts.accessoryonly!="undefined" ){
                                    if(skuMap.hasOwnProperty(parts.accessoryonly[deviceLen].sku)){
                                        skuMap[parts.accessoryonly[deviceLen].sku]=skuMap[parts.accessoryonly[deviceLen].sku]+1;
                                    }else{
                                        skuMap[parts.accessoryonly[deviceLen].sku]=1;
                                        priceMap[parts.accessoryonly[deviceLen].sku]=parts.accessoryonly[deviceLen].prices.dueToday;
                                    }
                                }
                            }
                        }
                        
                        skuQty="";
                        for(var skuKey in skuMap){
                            if(skuQty!=""){
                                skuQty = skuQty+'|'+skuKey +'~'+skuMap[skuKey];
                            }else{
                                skuQty = skuKey +'~'+skuMap[skuKey];
                            }
                        }
                        skuPrice="";
                        for(var priceKey in priceMap){
                            if(skuPrice!=""){
                                skuPrice = skuPrice+'|'+priceMap[priceKey];
                            }else{
                                skuPrice = priceMap[priceKey];;
                            }
                        }
                    
                    
                }else{
                    
                    var skuPrice = $('div[id*=DueToday]:isvisible').attr('price') ? $('div[id*=DueToday]:isvisible').attr('price') : "";
                    
                    var skuVal = $('div[data-sku]').data('sku') ? $('div[data-sku]').data('sku') : "";
                    if (origTarget && $(origTarget[0])) { //handle accessories ATC
                        skuVal = $(origTarget[0]).parent().data('sku') ? $(origTarget[0]).parent().data('sku') : skuVal;
                    }
                    if (typeof v_qtyAllow == "undefined") {
                        v_qtyAllow = 1;
                        
                    }
                    sku=skuVal + '~'+v_qtyAllow;
                    
                    var lobSku="";
                    
                    if(typeof ATT.globalVars.cartContents.lob != "undefined"){
                        var skuMap ={};
                        var priceMap = {};
                        priceMap[skuVal] = skuPrice;
                        var lines = ATT.globalVars.cartContents.lob.items;
                        var linesLen = lines.length;

                        while(linesLen--){
                            losg = lines[linesLen].id;
                            if(losgInContext === losg){
                                continue;
                            }
                            parts = lines[linesLen].parts;
                            
                            if(typeof parts.device !="undefined" ){
                                deviceLen = parts.device.length;
                            }else if(typeof parts.accessoryonly !="undefined" ){
                                deviceLen = parts.accessoryonly.length;
                            }else if(typeof parts.packageFromAccessoryPackage !="undefined" ){
                                deviceLen = parts.packageFromAccessoryPackage.length;
                            }
                            while(deviceLen--){
                                if(typeof parts.device !="undefined" ){

                                    if(skuVal==parts.device[deviceLen].sku){
                                        v_qtyAllow=parseInt(v_qtyAllow)+1;
                                        sku=skuVal + '~'+v_qtyAllow;
                                    }else{
                                        if(skuMap.hasOwnProperty(parts.device[deviceLen].sku)){
                                            skuMap[parts.device[deviceLen].sku]=skuMap[parts.device[deviceLen].sku]+1;
                                            
                                        }else{
                                            skuMap[parts.device[deviceLen].sku]=1;
                                            priceMap[parts.device[deviceLen].sku]=parts.device[deviceLen].prices.dueToday;
                                        }
                                    }   
                                } else if(typeof parts.accessoryonly !="undefined" ){
                                    
                                    if(skuVal==parts.accessoryonly[deviceLen].sku){
                                        v_qtyAllow=parseInt(v_qtyAllow)+1;
                                        sku=skuVal + '~'+v_qtyAllow;
                                    }else{
                                        if(skuMap.hasOwnProperty(parts.accessoryonly[deviceLen].sku)){
                                            skuMap[parts.accessoryonly[deviceLen].sku]=skuMap[parts.accessoryonly[deviceLen].sku]+1;
                                            
                                        }else{
                                            skuMap[parts.accessoryonly[deviceLen].sku]=1;
                                            priceMap[parts.accessoryonly[deviceLen].sku]=parts.accessoryonly[deviceLen].prices.dueToday;
                                        }
                                    }
                                }
                            }
                        }
                        
                        for(var skuKey in skuMap){
                            if(lobSku!=""){
                                lobSku = lobSku+'|'+skuKey +'~'+skuMap[skuKey];
                            }else{
                                lobSku = skuKey +'~'+skuMap[skuKey];
                            }
                        }
                        skuPrice="";
                        for(var priceKey in priceMap){
                            if(skuPrice!=""){
                                skuPrice = skuPrice+'|'+priceMap[priceKey];
                            }else{
                                skuPrice = priceMap[priceKey];;
                            }
                        }
                    }
                    
                    if(lobSku!=""){
                        sku=sku +'|'+lobSku;
                    }
                    skuQty=sku;
                }
                
                var addToCartWtPN =jQuery('meta[name="DCSext.wtPN"]').attr('content');
                var rptwtFullUri = jQuery('meta[name="DCSext.wtFullUri"]').attr('content');
                if ($('#modalConflictContinue:visible').length == 1) wtevent = 'HRock_Cart_Conflict_Add_Submit';
                wtargs = [
                    'DCSext.wtEvent', wtevent,
                    'DCSext.wtPN', addToCartWtPN,
                    'DCSext.wtFullUri', rptwtFullUri,
                    "DCSext.wtSkuPrice", skuPrice,
                    "DCSext.wtContractLength", contractLength,
                    "DCSext.wtContractType", contractType,
                    'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
                    'DCSext.wtBuyFlowType', ATT.globalVars.flowcode,
                    "DCSext.wtSkuQty", skuQty, 
                    "DCSext.wtMIRInd", wtMIRInd, 
                    'DCSext.wtNoHit', 1, 
                    "DCSext.wtZipCode",ATT.globalVars.zip(),
                    "DCSext.wtCartLine", currentLine(),
                    'DCSext.wtEventType', 'User', 
                    'DCSext.wtStatusCode',statusCode, 
                    'DCSext.wtSuccessFlag', statusFlag, 
                    'DCSext.wtBAN', ATT.globalVars.ban,
                    'DCSext.wtCartType', 'eCommerce', 
                    "DCSext.wtCustType", "consumer", 
                    'DCSext.wtCartState', ATT.globalVars.wtCartState,
                    "DCSext.wtCartContents", eventCheck.wtcartcontent(), 
                    'DCSext.wtCQClickId', clickid, 
                    'DCSext.wtCartId', eventCheck.cartId
                ];
				if(~href.indexOf('/services/')){
                     if($("#mobileShareBannerIntent:visible").length == 1){
                         mobileShareindicator = "N";
                         mobileShareindicator = $("#mobileShareBannerIntent").is(":checked"); 
							 if(mobileShareindicator)
							 {
								wtargs.push("DCSext.wtMobileShareOpt","Y");
							 }
                         else{
								wtargs.push("DCSext.wtMobileShareOpt","N");
							 }                         
                     } 
                }
                extraParams = origTarget.data('extra-params') || origTarget.data('extraParams') || "";
                // check for change in fulfillment method
                if ((extraParams.indexOf('changeToDirectFulfillment') > -1 && ATT.globalVars.cartContents.cartFulfillMethod == 'Store')) {
                    wtargs.push('DCSext.wtStoreFulfillChangeInd','Y');
                    wtargs.push('DCSext.wtCartFulfillMethod','Direct');
                    ATT.globalVars.cartContents.cartFulfillMethod = 'Direct';
                } else if (origTarget.data('selectedStorePickupDetails')) {
                    // check for changes in store related wtparams for BOPIS fulfillment
                    wtargs.push('DCSext.wtCartFulfillMethod','Store');
                    wtargs.push('DCSext.wtStorePickupDetails',origTarget.data('selectedStorePickupDetails'));
                    oldStoreDetails = ATT.globalVars.cartContents.storePickupDetails.split('~');
                    if (ATT.globalVars.cartContents.storePickupDetails && origTarget.data('storeId') && (origTarget.data('storeId') != oldStoreDetails[0])) {
                        wtargs.push('DCSext.wtStoreChangeInd','Y');
                        wtargs.push('DCSext.wtPrevStorePickupDetails',ATT.globalVars.cartContents.storePickupDetails);
                    }
                    storePos = (origTarget.data('storePositionNum') === 0) ? "0":origTarget.data('storePositionNum');
                    if (origTarget.data('storePositionNum') || origTarget.data('storePositionNum') === 0) {
                        wtargs.push('DCSext.wtStorePositionNum',storePos);
                        if ($('#radioAll:checked').length == 1) {
                            wtargs.push('DCSext.wtStoreViewFlag','0');
                        } else {
                            wtargs.push('DCSext.wtStoreViewFlag','1');
                        }
                        if (typeof ATT.sliBopis.currentPageNum() != 'undefined') {
                            wtargs.push('DCSext.wtPageNum',ATT.sliBopis.currentPageNum());
                            wtargs.push("DCS.dcsuri","/shop/virtual/storeresults"+ATT.sliBopis.currentPageNum()+".html");
                        }
                    }
                } else if (extraParams.indexOf('changeToDirectFulfillment') > -1 || extraParams.indexOf('storePickUpLocation') > -1) {
                    wtargs.push("DCSext.wtStorePickupDetails",ATT.globalVars.cartContents.storePickupDetails);
                }
                wtargs.push("DCSext.wtCartFulfillMethod",ATT.globalVars.cartContents.cartFulfillMethod);
                
				/*** Accessory Carousel Tracking ***/
				eventLocation = origTarget.data('wtEventLoc') || "";
				if (eventLocation != "") {
					wtargs.push("DCSext.wtEventLoc", eventLocation);
					wtargs.push("DCSext.wtFullUri", href);
					//Add slot location like link
					//Set wtsku to sku(s) from this 
					//wtargs.push()
					$currentTarget = $(d.originatingOrder.originatingTarget);
					carLinkLoc = $currentTarget.data('carousel-name') || $currentTarget.data('carouselName') || "";
					if (carLinkLoc != "") {
						carLinkSku = $currentTarget.parent().data('sku') || "";
						wtargs.push('DCSext.wtLinkLoc', carLinkLoc);
						wtargs.push('DCSext.wtOfferSku', carLinkSku);
						
						carLinkIndex = "0" + ($currentTarget.parents('.wirelessCarouselTypeNoTab').find('li').index($currentTarget.parents("li")) + 1);
						if (carLinkIndex.length > 2) {
							carLinkIndex = carLinkIndex.substring(1);
						}
						wtargs.push('DCSext.wtLinkName', carLinkIndex);
					}
					if (eventLocation == 'Frequently Purchased') {
						skuList = "";
						for (var i = 0; i < addItems.length; i++) {
							skuList = skuList + addItems[i].catalogRefId + "~" + addItems[i].quantity + "|";
						}
						wtargs.push('DCSext.wtSkuQty', skuList.slice(0,-1));
					}
				}
				if ($('#epttPlan:visible').length == 1){

                    var uid = ATT.cqWebtrend.retrieveLoginId(),
                    targettxt = $('#epttPlan').parent().prev().text(),
                    pricestr = $.trim(targettxt.split('$')[2]),
                    price = pricestr.substring(0, pricestr.indexOf('/')),
             		a = /^[0-9]*$/, logintype ='';
              		if (uid !== undefined) {
             	    	var logintype = a.test(uid) ? "CTN" : "SLID";
              		}
            		var wtSlid = logintype === "SLID" ? uid : "";
					wtargs.push('DCSext.wtSLID', wtSlid);
					wtargs.push('DCSext.wtSkuPrice', price);
					wtargs.push('DCSext.wtBAN', ATT.globalVars.ban);
                    wtargs.push('DCSext.ctClickId', getCTClickId.apply($('#epttPlan')));
				}				
                window.dcsMultiTrack.apply(this, ecParams(wtargs));
            }
        } else {return;}
    });



    /***************  ATC hook up end ******************************************/

    //cart add upsell
    $("#cart").delegate(".addToCart", "click", function () {
         var clickid = $(this).data("cqpath"),
            itemsku = $(this).closest(".cartItem").data("sku"),
            contractLength, 
            contractType = $(this).closest(".cartItem").data("contractType"),
            targettxt = $(this).parent().prev().text(),
            qtySku = itemsku + "~1",
            price = "$" + targettxt.split("$")[1];
         
         var dcswtPN =jQuery('meta[name="DCSext.wtPN"]').attr('content');
         var wtFullUri = jQuery('meta[name="DCSext.wtFullUri"]').attr('content');
        contractLength = "";
        commitmentTermSelect = jQuery('.priceBlock #commitmentTerm');
        if(!commitmentTermSelect.length){commitmentTermSelect = jQuery('.priceBlock input[id="commitmentTerm"]')}
        if (commitmentTermSelect && commitmentTermSelect.length) {contractLength = commitmentTermSelect.val()}
            
        wtargs = [
            'DCSext.wtEvent', PBaddCart,
            'DCSext.wtPN', dcswtPN,
            'DCSext.wtFullUri', wtFullUri,
            "DCSext.wtSkuPrice", price, 
            'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
            "DCSext.wtSkuQty", qtySku, 
            "DCSext.wtMIRInd", wtMIRInd, 
            "DCSext.wtContractLength", contractLength,
            "DCSext.wtContractType", contractType,
            'DCSext.wtNoHit', 1, 
            "DCSext.wtZipCode",ATT.globalVars.zip(),
            'DCSext.wtEventType', 'User', 
            'DCSext.wtStatusCode', "0", 
            'DCSext.wtSuccessFlag', 1, 
            'DCSext.wtBAN', ATT.globalVars.ban,
            'DCSext.wtCartType', 'eCommerce', 
            "DCSext.wtCustType", "consumer", 
            'DCSext.wtCartState', eventCheck.wtcartstate,
            "DCSext.wtCartContents", eventCheck.wtcartcontent(), 
            'DCSext.wtCQClickId', clickid, 
            'DCSext.wtCartId', eventCheck.cartId,
            "DCSext.wtCartFulfillMethod",ATT.globalVars.cartContents.cartFulfillMethod
        ];

        window.dcsMultiTrack.apply(this, wtargs);
        
    });
    
    //dropdown shorting
    $("#priceDropDown").bind('change', function () {

        var viewmodifier = $(this).find('option:selected').text(), evt = eventCheck.evt;

        if (viewmodifier === "Sort by" && $("#viewGridIconSelected").css('display') === "block") {
            viewmodifier = "Grid";
        } else if (viewmodifier === "Sort by" && $("#viewLineIconSelected").css('display') === "block") {
            viewmodifier = "List";
        } else {
            viewmodifier = viewmodifier;
        }
        actualpath = $(this).data('cqpath');
        
        ATT.cqWebtrend.delay(4000).then(function() {
            var wtrti = ATT.cqWebtrend.wtSKUDetails();
            wtargs = ['DCSext.wtEvent', evt, 'DCSext.wtNoHit', 1, 'DCSext.wtBAN', ATT.globalVars.ban,
                'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0",
                'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate,
                "DCSext.wtViewModifier", viewmodifier, "DCSext.wtCQClickId", actualpath,
                "DCSext.wtCartId", eventCheck.cartId, 'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer",
                "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtZipCode",ATT.globalVars.zip(),
                "DCSext.wtOOSSKU", wtrti.oosSKU,"DCSext.wtOOSSKUCount", wtrti.oosSKUCount,"DCSext.wtSKUCount", wtrti.SKUCount];
            window.dcsMultiTrack.apply(this, wtargs);
        });
	        /* To fix QC#1637 for get focus on drop down filter in devicelist pages  */
	        $( "#priceDropDown" ).ajaxComplete(function() {
	
	            $('#priceDropDown').focus();
	    	});	
    });

    // event hook for colorbox complete loading
    $(doc).bind('cbox_complete', function () {
        var mname,
            flowUrl,
            packageFlow,
            errormsg,
            eventOnError, 
            wtargs1, 
            modalinit, 
            modalname, 
            contractLength, 
            modaltitle, 
            modaldcs, 
            flag = true, 
            wtSku, 
            sku, 
            skuPrice, 
            clickid, 
            v_qtyAllow,
            skuVal,
            lobSku="";
        //modalinit = $(".modalHeader").attr("title") || $(".modalHeader h1").attr('title') || $($(".modalHeader")[1]).attr("title");
        modalinit = $('.modalHeader:isvisible').find('[title]').attr('title') ? $('.modalHeader:isvisible').find('[title]').attr('title') : $('.modalHeader:isvisible').attr('title') ? $('.modalHeader:isvisible').attr('title') : $('.modalHeader:isvisible').find('h1').text().replace(/,/g,'').replace(/ /g,'').toLowerCase();
        modalname = modalinit ? modalinit : "session";
        modaltitle = "HRock_" + modalname + "_Pg";
        modaldcs = "/wireless/virtual/" + modalname + ".html";
        flowUrl = location.href;
        packageFlow=flowUrl.indexOf("package") != -1;    
        errormsg= $("#error-box div:last").text();
       
        if (errormsg.length > 0&&(packageFlow)) { 
        eventOnError= PBaddCart ;
        }
        
        if(errormsg.indexOf("wls.atc.err.WLSS10086")!=-1){
    	    wtargs1 = ['DCS.dcsref',location.href, 'DCSext.wtEvent', PBaddCart,'DCSext.wtStatusMsg', errormsg,'DCSext.wtSuccessFlag', '0', 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtCustType", "consumer"];
    		}else{
    		wtargs1 = ['DCS.dcsref',location.href, 'DCSext.wtEvent',eventOnError,'DCSext.wtStatusMsg', errormsg, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtCustType", "consumer"];
         }
        
        if(modalinit === "customerType"){
            
            skuPrice = $('div[id*=DueToday]:isvisible').attr('price') ? $('div[id*=DueToday]:isvisible').attr('price') : "";
            
            skuVal = $('div[data-sku]').data('sku') ? $('div[data-sku]').data('sku') : "";
            
            v_qtyAllow = jQuery('#qtyAllow').val();
            
            if (typeof v_qtyAllow == "undefined") {
                v_qtyAllow = 1;
                
            }
            sku=skuVal + '~'+v_qtyAllow;
            
            contractLength = "";
            commitmentTermSelect = jQuery('.priceBlock #commitmentTerm');
            if(!commitmentTermSelect.length){commitmentTermSelect = jQuery('.priceBlock input[id="commitmentTerm"]')}
            if (commitmentTermSelect && commitmentTermSelect.length) {contractLength = commitmentTermSelect.val()}
            
            clickid = $('img[title^=Add]').data('cqpath') ? $('img[title^=Add]').data('cqpath') : "";
            var pgWtPN =jQuery('meta[name="DCSext.wtPN"]').attr('content');
            var wtFulluri = jQuery('meta[name="DCSext.wtFullUri"]').attr('content');
            wtargs = [
                'DCSext.wtEvent', PBaddCart,
                'DCSext.wtPN', pgWtPN,
                'DCSext.wtFullUri', wtFulluri,
                "DCSext.wtSkuPrice", skuPrice, 
                'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
                "DCSext.wtSkuQty", sku, 
                "DCSext.wtMIRInd", wtMIRInd, 
                "DCSext.wtContractLength", contractLength,
                "DCSext.wtContractType", $(".cartItem").data("contractType"),
                'DCSext.wtNoHit', 1, 
                "DCSext.wtZipCode",ATT.globalVars.zip(),
                'DCSext.wtEventType', 'User', 
                'DCSext.wtStatusCode', -2 , 
                'DCSext.wtSuccessFlag', -2, 
                'DCSext.wtBAN', ATT.globalVars.ban,
                'DCSext.wtCartType', 'eCommerce', 
                "DCSext.wtCustType", "consumer", 
                'DCSext.wtCartState', eventCheck.wtcartstate,
                "DCSext.wtCartContents", eventCheck.wtcartcontent(), 
                'DCSext.wtCQClickId', clickid, 
                'DCSext.wtCartId', eventCheck.cartId,
                "DCSext.wtCartFulfillMethod",ATT.globalVars.cartContents.cartFulfillMethod
            ];
            
                
            window.dcsMultiTrack.apply(this, wtargs);
        }
        
        if  (modalinit === 'StoreSearch') {
            // var skuId = $('#inStoreAvailability').data('sku');
            // var v_language = (window.location.pathname.match(/\/es\//)) ? 'Spanish' : 'English';
            //var wtargs = ['DCSext.wtSku', skuId, 'DCSext.wtLanguage', v_language, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
            //  'DCSext.wtZipCode', ATT.globalVars.zip(), 'DCSext.wtCustType', 'consumer', 'DCSext.wtPN', modaltitle];
            // window.dcsMultiTrack.apply(this, wtargs);
            return true;
        }

        //empty cart
        $('#continue-btn', '#empty-cart-interstitial').bind('mousedown', function () {
            var wtclick = $(this).data('cqpath');
            wtargs = ['DCS.dcsuri', '/shop/cart/emptycart.html', 'DCSext.wtEvent', 'HRock_Cart_EmptyCart_Submit', 'DCSext.wtNoHit', 1,
                'DCSext.wtStatusCode', "0", 'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate,
                'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", 'DCSext.wtBAN', ATT.globalVars.ban,
                'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, "DCSext.wtCartContents", eventCheck.wtcartcontent(),
                'DCSext.wtCQClickId', wtclick, "DCSext.wtZipCode",ATT.globalVars.zip()];
            window.dcsMultiTrack.apply(this, wtargs);
        });

         //ar5204: customertype modal -- Get Started 
        jQuery(doc).bind('cbox_complete', function() {  
            jQuery('#continue', '#addaline', '#upgrades').live('click', function () { 
                var wtclick = jQuery(this).data('cqpath');
                
                wtargs = ['DCS.dcsuri', '/content/att/shop/en/wireless/modals/shopmodals/jcr:content/mainpar/customertype', 'DCSext.wtEvent', 'HRock_Cust_BuyFlowType_Submit',
                'DCSext.wtStatusCode', "0", 'DCSext.wtSuccessFlag', 1,  "DCSext.wtCustType", "consumer",
                'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtCQClickId', wtclick];
            window.dcsMultiTrack.apply(this, wtargs);
                //return false; 
        });
        }); 
        
        //cancel
        $("#cancel", "#colorbox").bind('click', function (e) {
            var wtclick = $(this).data('cqpath'),
                cartIdck = $("#use-email-address").parent().hasClass('checked'),
                idmethod = cartIdck ? "email" : "TNplusName",
                evt = wtclick.match(/savecart.*/) ? "HRock_Cart_SaveCart_Submit" : (wtclick.match(/retrievecart.*/) ? "HRock_Cart_RetrieveCart_Submit" : "HRock_Cart_EmptyCart_Submit"),

                wtargscl = ['DCSext.wtEvent', evt, 'DCSext.wtNoHit', 1, 'DCSext.wtStatusCode', -1, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
                    'DCSext.wtSuccessFlag', -1, 'DCSext.wtCartState', eventCheck.wtcartstate, 'DCSext.wtBAN', ATT.globalVars.ban, 'DCSext.wtCartIdMethod', idmethod,
                    "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtCartId", eventCheck.cartId, "DCSext.wtCQClickId", wtclick,
                    'DCSext.wtCartType', 'eCommerce', "DCSext.wtZipCode",ATT.globalVars.zip()];

            if (evt === "HRock_Cart_SaveCart_Submit") {
                wtargscl.push('DCS.dcsuri', '/shop/cart/save-cart-details.html');
                wtargscl.push('DCSext.wtCustType', "consumer");
            }
            if (evt === "HRock_Cart_RetrieveCart_Submit") {
                wtargscl.push('DCS.dcsuri', '/shop/cart/retrievecart.html');
            }
            if (evt === "HRock_Cart_EmptyCart_Submit") {
                wtargscl.push('DCS.dcsuri', '/shop/cart/emptycart.html');
            }

            window.dcsMultiTrack.apply(this, wtargscl);
        });

        //LNP eligibility
        
        $(doc).bind('LNPEvent', function (e) {
            
            
                
                var wtclick = '/content/att/shop/en/checkout/phone-eligibility/jcr:content/lpn',
                lnpCheck = jQuery('#lnpCheck').val(),
                    $invalidMsg = $('.invalidmsg'), i, n = $invalidMsg.length, 
                   /*line replaced to fix PROD12-3369
                    arr1, arr2, statusMsg, successflag, status, $noentry = jQuery('.formErrorMessage'),*/
                    arr1, arr2, statusMsg, successflag, status, $noentry = jQuery('.formErrorMessage:first'),
                    $invalidnumber = $('.invalidnumber'), j = $invalidnumber.length, lnpEligibility, 
                    /*line replaced to fix PROD12-3369
                    $validnumber = $('.validnumber'), k, l = $validnumber.length, validcontainer = [], invalidmsgcontainer = null;*/
                    $validnumber = $('.validnumber'), k, l = $validnumber.length, validcontainer = [], invalidmsgcontainer = null, statuscode= jQuery('.formErrorMessage:first input[type="hidden"]').val() ? jQuery('.formErrorMessage:first input[type="hidden"]').val() : jQuery('#elgErrorCode').val();
                
                for(i=0 ; i < n; i++){
                    if (invalidmsgcontainer === null) { 
                        invalidmsgcontainer = []; 
                    }
                    if (lnpCheck) {
                        //alert(lnpCheck);
                        invalidmsgcontainer[i] = 'Y~' + $.trim($($invalidMsg[i]).text());
                    } else {
                        //alert("Null");
                    invalidmsgcontainer[i] = 'N~'+ $.trim($($invalidMsg[i]).text());
                }
                }
                for(k=0; k < l; k++){
                    validcontainer[k] =  'Y';
                    //validcontainer[k] =  'Y~'+ $($validnumber[k]).text();
                }
                
                arr1 = ATT.util.filter(invalidmsgcontainer, function(n){return n;});
                arr2 = ATT.util.filter(validcontainer, function (n) {return n;});
                lnpEligibility = $noentry.length ? 'N~'+$.trim($noentry.text()) : arr1.concat(arr2).join('|');
                lnpEligibility = $.isArray(lnpEligibility) ? lnpEligibility : $.makeArray(lnpEligibility);
                
                /*if(lnpEligibility[0] === 'Y'){
                    status = '0';
               }else if(lnpEligibility.length){
                   status ='';
                }else{
                    status = '';
               } */
                
                /* line replaced to fix PROD12-3369
                status = lnpEligibility[0]==='Y' ? '0' : lnpEligibility.length ? '' : '0' ;*/
                status = lnpEligibility[0]==='Y' ? '0' : lnpEligibility.length ? statuscode : '0' ;
                if (lnpCheck === undefined){
                    statusMsg = status === '0' ? '' : lnpEligibility.join('|').split('N~').join('');
                    }
                    else{
                    statusMsg = status === '0' ? '' : lnpEligibility.join('|').split('Y~').join('');
                    }
                successflag =  status==='0' ? 1 : '0'; 
                
                if(statusMsg.length >0 || status.length >0)
                {
                wtargs = ['DCSext.wtEvent', 'HRock_LNP_Eligibility_Submit',
                    'DCSext.wtNoHit', 1, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusMsg', statusMsg,
                    'DCSext.wtStatusCode', status, 'DCSext.wtSuccessFlag', successflag, 'DCSext.wtCartState', eventCheck.wtcartstate,
                    'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", "DCSext.wtCartContents", eventCheck.wtcartcontent(),
                    "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtCQClickId', wtclick, 'DCSext.wtLNPEligibility', lnpEligibility, 'DCSext.wtBAN', ATT.globalVars.ban];
                
                window.dcsMultiTrack.apply(this, wtargs);
                }
            
        });
        
        
        //zipcode submit
        $("form#zipCodeEntryForm").live("submit", function () {
            var clickid = "/content/att/shop/en/zipcode/jcr:content/zipcode";

            wtargs = ['DCSext.wtEvent', 'HRock_ZipCode_Submit',
                'DCSext.wtNoHit', 1, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
                'DCSext.wtStatusCode', "0", 'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate,
                'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", "DCSext.wtCartContents", eventCheck.wtcartcontent(),
                "DCSext.wtZipCode", (ATT.globalVars.zip() || $("#zipCodeEntry").val()), 'DCSext.wtCQClickId', clickid];

            window.dcsMultiTrack.apply(this, wtargs);

        });
		//No Plan Changes Modal, Consider Switching to Mobile Share Plan Modal
		$('.closeNoChangesModal, .considerSwitchToMS #okBtn, .considerSwitchToMS #noThanksBtn, .unlimitedFeatureAlertButtons #cancelConvertRequest, .unlimitedFeatureAlertButtons #okIunderstand').bind('click', function (e) {
			var wtargs,
				wtEvent,
				wtclick = $(this).data('cqpath'),
				wtCTN = '',
				wtSLID = '',
				loginId = ATT.cqWebtrend.retrieveLoginId(),
				ctnPattern = /^[0-9]*$/;

				if (loginId !== undefined && loginId != '') {
					var logintype = ctnPattern.test(loginId) ? "CTN" : "SLID";
					if (logintype === "CTN") {
						wtCTN = loginId;
					}
					else {
						wtSLID = loginId;
					}
				}
				if ($('.closeNoChangesModal').length > 0) {
					wtEvent = 'HRock_NoPlanChangeNotification_Continue_Submit';
				}
				if ($('.considerSwitchToMS').length > 0) {
					wtEvent = 'HRock_ShowMobileSharePlans_Submit';
				}
				if ($('.unlimitedFeatureAlertButtons').length > 0) {
					wtEvent = 'HRock_UnlimitedDataRemovalAlert_Submit';
				}
			wtargs = ['DCSext.wtEvent', wtEvent, 'DCSext.wtStatusCode', '0', 'DCSext.wtSuccessFlag', 1, 'DCSext.wtCQClickId', wtclick,
				'DCSext.wtCTN', wtCTN, 'DCSext.wtSLID', wtSLID, 'DCSext.wtBAN', ATT.globalVars.ban, 'DCSext.wtCartID', eventCheck.cartId, 'DCSext.wtCartType', 'eCommerce',
				'DCSext.wtCartState', ATT.globalVars.wtCartState, 'DCSext.wtCartContents', eventCheck.wtcartcontent(), 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode];
			window.dcsMultiTrack.apply(this, wtargs);
		});


        /************* account selection hook up *************************/
            //TODO setup the account selection ,input[name*=AccountSelectionFormHandler]", "form[action*=accountselection]
        /*$("#acctSelContinue").bind("mousedown", function () {

            var clickid = "/content/att/login/jcr:content/login",
                r = (ATT.util.getCookie("colam_ctn") || ""), //null not acceptable return value 
                j = $.parseJSON('{"' + r.replace(/%3B/gi, '","').replace(/%3D/gi, '":"').replace(/%40/gi, '@') + '":""}'),
                wtslid = j.uid;

            wtargs = ['DCSext.wtEvent', "HRock_Acct_Selection_Submit", 'DCSext.wtNoHit', 1,
                'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0",
                'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate, "DCSext.wtSLID", wtslid,
                "DCSext.wtCQClickId", clickid, 'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer",
                "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtZipCode",ATT.globalVars.zip()];

            window.dcsMultiTrack.apply(this, wtargs);

        });*/

        /*********** account selection end ***************************/
		if (modalname === "noPlanChangesModal") {
			wtargs1.push('DCS.wtPN', 'HRock NoPlanChangesMade Modal Pg');
			wtargs1.push('DCS.wtNoHit', '1');
		}
		if (modalname === "unlimitedFeatureAlertModal") {
			wtargs1.push('DCS.wtPN', 'HRock Unlimited Data Alert Modal Pg');
			wtargs1.push('DCS.wtNoHit', '1');
		}
        if (modalname === "bopisConflict") {
            wtargs1.push('DCS.dcsuri', '/shop/cart/bopisconflict.html');
            wtargs1.push('DCSext.wtCQClickId', $('#bopis-conflict-interstitial').data('cqpath'));
        }
        if (modalname === "emptyCart") {
            wtargs1.push('DCS.dcsuri', '/shop/cart/emptycart.html');
        }
        else if (modalname === "savecartModal") {
            wtargs1.push('DCS.dcsuri', '/shop/cart/save-cart-details.html');
        }
        else if (modalname === "ATT_Print") {
            wtargs1.push('DCS.dcsuri', '/print/attprintmodal.html');
        }
        else if (modalname === "save_cart_thanks") {
            wtargs1.push('DCS.dcsuri', 'shop/cart/save-cart-thanks.html');
        }
        else if (modalname === "PIMModal") {
            wtSku = ATT.globalVars.flattenCartContents.lob_items_0_parts_device_item_sku + "~1";
            wtargs1.push("DCSext.wtSku", wtSku);
        }
        else {
            wtargs1.push('DCS.dcsuri', modaldcs);
        }
        if (flag) {
            if (ATT.DCSSignals) {
                $.when(ATT.DCSSignals.dcs_ready_promise).then(function(){
                    window.dcsMultiTrack.apply(this, wtargs1);
                });
            } else { window.dcsMultiTrack.apply(this, wtargs1); }
            flag = false;
        }
    });

	/*********************cbox_complete end************************************/

	// MSRT Page
	jQuery(document).bind('BESTAPI_SUCCESS', function (event, obj) {
		var timeout = obj.timeout,
			response = obj.ajaxResponse,
			wtStatusMsg,
			wtargs;
		wtStatusMsg = 'HR_MSRT_BESTAPI_SUCCESS|' + response.status.toString() + '|' + timeout.toString();
		wtargs = ['DCSext.wtEvent', 'HRock_System_MSRT_BestAPI_Onload_Check_Submit', 
		          'DCSext.wtSuccessFlag', '1', 
		          'DCSext.wtEventType', 'System', 
		          'DCSext.wtStatusMsg', wtStatusMsg];
		window.dcsMultiTrack.apply(this, wtargs);
	});

	jQuery(document).bind('BESTAPI_FAILURE', function (event, obj) {
		var data = obj.bestResponse,
			timeout = obj.timeout,
			response = obj.ajaxResponse,
			wtStatusMsg,
			wtargs;
		wtStatusMsg = 'HR_MSRT_BESTAPI_FAILURE' + '|' + response.status.toString() + '|' + timeout.toString() + '|' + data.Result.Status.toString() + '|' + data.Result.Code.toString() + '|' + data.Result.Description.toString();
		wtargs = ['DCSext.wtEvent', 'HRock_System_MSRT_BestAPI_Onload_Check_Submit', 'DCSext.wtSuccessFlag', '0', 'DCSext.wtEventType', 'System', 'DCSext.wtStatusMsg', wtStatusMsg];
		window.dcsMultiTrack.apply(this, wtargs);
	});

	jQuery(document).bind('BESTAPI_ERROR_OR_TIMEOUT', function (event, obj) {
		var response = obj.ajaxResponse,
		wtStatusMsg,
		wtargs;
		wtStatusMsg = 'HR_MSRT_BESTAPI_ERROR_OR_TIMEOUT' + '|' + response.status.toString() + '|' + response.statusText.toString();
		wtargs = ['DCSext.wtEvent', 'HRock_System_MSRT_BestAPI_Onload_Check_Submit', 'DCSext.wtSuccessFlag', '0', 'DCSext.wtEventType', 'System', 'DCSext.wtStatusMsg', wtStatusMsg];
		window.dcsMultiTrack.apply(this, wtargs);
	});

	jQuery(document).bind('BESTAPI_SUCCESS', function (event, obj) {
		jQuery('.switchOrKeep').bind('click', function () {
			var	bestApi = ATT.component.msrecommender.reportingBestApi(),
				recommendedPlan = ATT.component.msrecommender.reportingRecommendedPlan(),
				selectedPlan = ATT.component.msrecommender.reportingSelectedPlan(),
				MegabytePerGigabtye = 1024,
				tmpRecommendedPlan = '',
				tmpRecommendedPlanSize = '',
				tmpSelectedPlanSize = '',
				tmpSelectedPlan = '',
				tmpExistingLineConvertedQty = '',
				tmpRecommendedPlanPrice = '',
				loginId = ATT.cqWebtrend.retrieveLoginId(),
				logintype,
				ctnPattern = /^[0-9]*$/,
				wtCTN = '',
				wtSLID = '',
				clickID = jQuery('.switchOrKeep').attr('data-cqpath'),
				statusCode = '1',
				statusMsg = '',
				successFlag = '1', 
				wtargs;

			if (loginId !== undefined && loginId !== '') {
				logintype = ctnPattern.test(loginId) ? "CTN" : "SLID";
	            if (logintype === "CTN") {
	                wtCTN = loginId;
	            }
	            else {
	                wtSLID = loginId;
	            }
			}

			// is the recommended plan defined?
			if ($.trim(recommendedPlan) !== '') {
		
				// set any variables connected to the recommended plan
				tmpRecommendedPlan = recommendedPlan.skuId + '~' + recommendedPlan.displayName;
				tmpRecommendedPlanSize = recommendedPlan.dataUom === 'GB' ? recommendedPlan.includedData * MegabytePerGigabtye : recommendedPlan.includedData;
				tmpRecommendedPlanPrice = recommendedPlan.eligibleMrc;
			}
		
			// is the selected plan defined?
			if ($.trim(selectedPlan) !== '') {
		
				// set any variables connected to the selected plan
				tmpSelectedPlanSize = selectedPlan.dataUom === 'GB' ? selectedPlan.includedData * MegabytePerGigabtye : selectedPlan.includedData;
				tmpSelectedPlan = selectedPlan.skuId + '~' + selectedPlan.displayName;
				tmpExistingLineConvertedQty = selectedPlan.skuId + '~' + bestApi.CurrentPlanUsageInfo.NumberOfDevices;
			}
			wtargs = [
			    'DCSext.wtEvent', 'HRock_MobileSharePlanSelection_Submit',
				'DCSext.wtCTN', wtCTN,
				'DCSext.wtSLID', wtSLID,
				'DCSext.wtCQClickId', clickID, 
				'DCSext.wtStatusCode', statusCode, 
				'DCSext.wtStatusMsg', statusMsg,
				'DCSext.wtSuccessFlag', successFlag, 
				'DCSext.wtCartID', ATT.globalVars.cartContents.cartId, 
				'DCSext.wtCartState', eventCheck.wtcartstate, 
				'DCSext.wtCartContents',eventCheck.wtcartcontent(),
				'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
				'DCSext.wtCurrentDataUsage', bestApi.CurrentPlanUsageInfo.TotalDataConsumption,
				'DCSext.wtCurrentVoiceUsage', bestApi.CurrentPlanUsageInfo.TotalNumberOfMinutes,
				'DCSext.wtCurrentTextUsage', bestApi.CurrentPlanUsageInfo.TotalNumberOfMessages,
				'DCSext.wtRecommendedPlanTextSize', 'unlimited',
				'DCSext.wtRecommendedPlanVoiceSize', 'unlimited',
				'DCSext.wtRecommendedPlan', tmpRecommendedPlan,
				'DCSext.wtRecommendedPlanDataSize', tmpRecommendedPlanSize.toString(),
				'DCSext.wtRecommendedPlanPrice', tmpRecommendedPlanPrice,
				'DCSext.wtSelectedPlanSize', tmpSelectedPlanSize.toString(),
				'DCSext.wtSelectedPlan', tmpSelectedPlan,
				'DCSext.wtExistingLineConvertQty', tmpExistingLineConvertedQty
			];
			window.dcsMultiTrack.apply(this, wtargs);
		});
	});

	jQuery(document).bind('reportIneligibility', function (event, obj) {
		var wtStatusMsg = obj.eligibilitiesStatus,
			wtargs;
		wtargs = ['DCSext.wtEvent', 'HRock_System_MSRT_Ineligibility_Onload_Check_Submit', 'DCSext.wtSuccessFlag', '0', 'DCSext.wtEventType', 'System', 'DCSext.wtStatusMsg', wtStatusMsg];
		window.dcsMultiTrack.apply(this, wtargs);
	});

	// Confirm Switch Page
	$('#confirmSwitchChangePlan').bind('click', function () {
		var wtargs,
			getChangePlanLinkName = $.trim($('#confirmSwitchChangePlan').text());
		wtargs = ['DCSext.wtLinkLoc', 'HRock_MobileSharePlanSwitchconfirmPg_Body', 'DCSext.wtNoHit', 1, 'DCSext.wtLinkName', getChangePlanLinkName];
		window.dcsMultiTrack.apply(this, wtargs);
	});

	$('.confirmSwitchButtons #okConvertContinue, .confirmSwitchButtons #cancelConvertRequest').bind('click', function () {
		var wtargs,
			wtclick = $(this).data('cqpath'),
			wtCTN = '',
			wtSLID = '',
			loginId = ATT.cqWebtrend.retrieveLoginId(),
			ctnPattern = /^[0-9]*$/,
			skuIdAndQty = $('.confirmSwitchButtons #okConvertContinue').data('sku') + "~1",
			skuPrice = parseFloat($("#wtSkuPrice").val()).toFixed(2),
			wtOrderType = $('#wtOrderType').val() == 'POSTPAID' ? 'Y' : 'N',
			wtNextEligible = $('#wtNextEligible').val() == 'true' ? 'Y' : 'N',
			totalLinecount = parseInt($("#ftLineCount").val()) + parseInt($("#indLineCount").val()),
			existingLineConvertQty = $('.confirmSwitchButtons #okConvertContinue').data('sku') + "~" + totalLinecount;

		if (loginId !== undefined && loginId != '') {
			var logintype = ctnPattern.test(loginId) ? "CTN" : "SLID";
			if (logintype === "CTN") {
				wtCTN = loginId;
			}
			else {
				wtSLID = loginId;
			}
		}

		wtargs = [
		    'DCSext.wtEvent', PBaddCart, 
		    'DCSext.wtStatusCode', '0',
		    'DCSext.wtSuccessFlag', this.id === 'cancelConvertRequest' ? '-1' : '1',
		    'DCSext.wtCQClickId', wtclick,
		    'DCSext.wtCTN', wtCTN,
			'DCSext.wtSLID', wtSLID,
			'DCSext.wtBAN', ATT.globalVars.ban,
			'DCSext.wtCartID', eventCheck.cartId,
			'DCSext.wtCartType', 'eCommerce',
			'DCSext.wtCartState', ATT.globalVars.wtCartState,
			'DCSext.wtCartContents', eventCheck.wtcartcontent(),
			'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
			'DCSext.wtSkuQty', skuIdAndQty,
			'DCSext.wtSkuPrice', skuPrice,
			'DCSext.wtMIRInd', 'N',
			'DCSext.wtStorePickupInd', 'N', 
			'DCSext.wtCartFulfillMethod', ATT.globalVars.cartContents.cartFulfillMethod,
			'DCSext.wtPostPaidEligFlag', wtOrderType, 
			'DCSext.wtLeaseEligFlag', wtNextEligible, 
			'DCSext.wtExistingLineConvertQty', existingLineConvertQty
		];
		window.dcsMultiTrack.apply(this, wtargs);
	});

	// One Page Express Upgrader
	$('.enableSubmit').bind('click', function () {
		var wtargs,
			wtCTN = '',
			wtSLID = '',
			loginId = ATT.cqWebtrend.retrieveLoginId(),
			ctnPattern = /^[0-9]*$/,
			wtNextEligible = $('.commitmentTermRadio:checked').val() === 'lease' ? 'Y' : 'N',
			wtUserResp = $("#mpp-name").is(':checked') ? 'Y' : 'N',
			skuIdAndQty = $(".iconicTab.current").attr('data-skuid') + "~1",
			skuPrice = '',
			wtContractType = '';
	
		if (loginId !== undefined && loginId != '') {
			var logintype = ctnPattern.test(loginId) ? "CTN" : "SLID";
			if (logintype === "CTN") {
				wtCTN = loginId;
			}
			else {
				wtSLID = loginId;
			}
		}

		if ($('#leaseTerms').is(':checked') && $('#leaseTermsSelect').val() === '24') {
			wtContractType = 'lease26';
		} else if ($('#leaseTerms').is(':checked') && $('#leaseTermsSelect').val() === '20') {
			wtContractType = 'lease20';
		} else {
			wtContractType = 'Regular';
		}

		$(".pricingcontent:visible").not('.legal').each(function () {
			if($(this).hasClass("pricingregular") && $(this).has("#dueToday") && $(this).css("display") === "block") {
				skuPrice = $.trim($(this).find("#dueToday .price").text().split('$')[1]);
			}
			if($(this).is('[class^="pricinglease"]') && $(this).has("#dueToday") && $(this).css("display") === "block") {
				skuPrice = $.trim($(this).find("#dueToday .price").text().split('$')[1]);
			}
		});

		$('#horiz-accessoryList > li .bundleCheckBox').each(function () {
			 if($(this).is(':checked')) {
				skuIdAndQty += "|" + $(this).closest('div').attr('data-sku') + "~1";
				skuPrice += "|" + $(this).closest('div').attr('data-bundleprice');
			}
		});

		if($("#mpp-name").is(':checked')) {
			skuIdAndQty += "|" + $("#mpp-name").attr('data-sku') + "~1";
			skuPrice += "|" + $.trim($("#summary-mpp-mrc").text().split('$')[1]);
		}

		wtargs = [
		    'DCSext.wtEvent', 'HRock_CheckOut_Order_Submit',
		    'DCSext.wtCTN', wtCTN,
			'DCSext.wtSLID', wtSLID,
			'DCSext.wtBAN', ATT.globalVars.ban,
			'DCSext.wtCartID', eventCheck.cartId,
			'DCSext.wtCartType', 'eCommerce',
			'DCSext.wtCartState', ATT.globalVars.wtCartState,
			'DCSext.wtCartContents', eventCheck.wtcartcontent(),
			'DCSext.wtCartFulfillMethod', ATT.globalVars.cartContents.cartFulfillMethod,
			'DCSext.wtPostPaidEligFlag', 'Y',
			'DCSext.wtLeaseEligFlag', wtNextEligible,
			'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
			'DCSext.wtUserResp', wtUserResp,
			'DCSext.wtSkuQty', skuIdAndQty,
			'DCSext.wtSkuPrice', skuPrice,
			'DCSext.wtContractLength', $('#commitmentTerm').val(),
			'DCSext.wtContractType', wtContractType,
			'DCSext.wtNoHit', '1'
		];
		window.dcsMultiTrack.apply(this, wtargs);
	});

	//cart summary page: US24273 (Change Plan link)
	$('.item.plan .changeCartSummary').bind('click', function () {
		var wtargs,
		getChangePlanLinkText = $.trim($('.item.plan .changeCartSummary').text());
		wtargs = ['DCSext.wtNoHit', 1, 'DCSext.wtLinkLoc', 'HRock_CartSummaryPg_Body', 'DCSext.wtLinkName', getChangePlanLinkText];
		window.dcsMultiTrack.apply(this, wtargs);
	});

    /******************* Grid/list views *************************************/

    $('img[src*=view-list-deselected]').bind('click', function () {
        var viewmodifier, evt = eventCheck.evt, r = $("#priceDropDown").find('option');

        viewmodifier = $("#priceDropDown").find('option:selected').text();
        if (viewmodifier === r[0].innerHTML) {
            viewmodifier = "List";
        } else {
            viewmodifier = viewmodifier;
        }

        ATT.cqWebtrend.delay(4000).then(function() {
            var wtrti = ATT.cqWebtrend.wtSKUDetails();
            wtargs = ['DCSext.wtEvent', evt, 'DCSext.wtNoHit', 1,
                'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0",
                'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate, 'DCSext.wtBAN', ATT.globalVars.ban,
                "DCSext.wtViewModifier", viewmodifier, 'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "Consumer",
                "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtZipCode",ATT.globalVars.zip(),
                "DCSext.wtOOSSKU", wtrti.oosSKU,"DCSext.wtOOSSKUCount", wtrti.oosSKUCount,"DCSext.wtSKUCount", wtrti.SKUCount];
            window.dcsMultiTrack.apply(this, wtargs);
        });
    });


    $('img[src*=view-grid-deselected]').bind('click', function () {
        var viewmodifier = $("#priceDropDown").find('option:selected').text(), 
            r = $("#priceDropDown").find('option'), evt = eventCheck.evt;
        
        if (viewmodifier === r[0].innerHTML) {
            viewmodifier = "Grid";
        } else {
            viewmodifier = viewmodifier;
        }

        ATT.cqWebtrend.delay(4000).then(function() {
            var wtrti = ATT.cqWebtrend.wtSKUDetails();
            wtargs = ['DCSext.wtEvent', evt, 'DCSext.wtNoHit', 1,
                'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0",
                'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate, 'DCSext.wtBAN', ATT.globalVars.ban,
                "DCSext.wtViewModifier", viewmodifier, 'DCSext.wtCartType', 'eCommerce',
                "DCSext.wtCustType", "Consumer", "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtZipCode",ATT.globalVars.zip(),
                "DCSext.wtOOSSKU", wtrti.oosSKU,"DCSext.wtOOSSKUCount", wtrti.oosSKUCount,"DCSext.wtSKUCount", wtrti.SKUCount];
            window.dcsMultiTrack.apply(this, wtargs);
        });
    });

    /***************** grid/list view ends *****************************************************/

        //shopping cart page specific
    $('.line-details').delegate('.removeFromCartSummary', 'click', function () {
        var $this = $(this),
            $price = $.trim($($this.next("div")[0]).text()),
            sku = $this.parent().parent().data('sku') + "~1", wtargs,
            $wtClick = $this.data('cqpath');
        wtMIRInd = $('.mir').val() ? "Y" : "N";
        wtargs = ['DCSext.wtEvent', 'HRock_Cart_Remove_Submit', 'DCSext.wtNoHit', 1,
            'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0",
            'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate, 'DCSext.wtBAN', ATT.globalVars.ban,
            'DCSext.wtMIRInd', wtMIRInd, "DCSext.wtCartContents", eventCheck.wtcartcontent(),
            'DCSext.wtCQClickId', $wtClick, 'DCSext.wtCartType', 'eCommerce',
            "DCSext.wtSkuQty", sku, "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtCustType", "consumer"];
        window.dcsMultiTrack.apply(this, wtargs);
    });

    //save cart

    //retrieve cart
    $(doc).bind('SaveRetrieveCartReturned', function (e, resp) {

        if (resp.event == "HRock_Cart_RetrieveCart_Submit") {
            var wtclick = $('#retrieve-cart-btn').data('cqpath'),
                dcsuri = '/shop/cart/retrievecart.html',
                email = $('input[name*=email]').val(),
                phone = $('input[name*=telePhoneNumber]').val(),
                name = $('input[name*=firstName]').val(),
                TNplusName = phone + name,
                cartIdck = $("#use-email-address").parent().hasClass('checked'),
                cartId = cartIdck ? email : TNplusName,
                filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                phonere = /\d{10}/,
                namere = /^[a-zA-Z]+$/,
                idmethod = cartIdck ? "email" : "TNplusName",
                status = "0",
                success = 1;
        } else {
            wtclick = $('#save-cart-btn').data('cqpath');
            dcsuri = '/shop/cart/save-cart-details.html';
            
            cartId = $("#email-address").val();
            status = "0";
            success = 1;
            idmethod = "";
        }
        if (resp.items.length >= 1) {
            status = resp.items[0].errorCode;
            success = "0";
        }
        wtargs = ['DCS.dcsuri', dcsuri, 
                  'DCSext.wtEvent', resp.event, 
                  'DCSext.wtSuccessFlag', success,
                  'DCSext.wtStatusCode', status,
                  'DCSext.wtCQClickId', wtclick,
                  'DCSext.wtCartId', cartId,
                  'DCSext.wtCartType', 'eCommerce',
                  'DCSext.wtCartState', resp.cartState,  
                  'DCSext.wtCartContents', resp.cartContents,
                  'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
                  'DCSext.wtCartIdMethod', idmethod,
                  'DCSext.wtCartFulfillMethod',resp.cartFulfillMethod,
                  'DCSext.wtStorePickupDetails',resp.storePickupDetails,
                  'DCSext.wtNoHit', 1,
                  'DCSext.wtZipCode',ATT.globalVars.zip(),
                  'DCSext.wtCustType', "consumer"];

        window.dcsMultiTrack.apply(this, ecParams(wtargs));
    });

    //checkout
    $("#cart-container").delegate('#CheckoutForm', 'submit', function () {
        var qty, r = $("div[data-report]"),
            wtclick = jQuery("#checkout-btn-enabled-bottom").parent().attr('data-cqpath'),
            storeFulfillChangeInd= "" ,
            res = [], i = r.length, ind,
            wtEvent,
            shipping = ATT.globalVars.cartContents.orderTotals.shipping.method || "",
            monthlyAmt = ATT.globalVars.cartContents.orderTotals.varFinal.mrcTotal || "0",
            total = ATT.globalVars.cartContents.orderTotals.varFinal.dueToday || "0",
            /*code inserted to fix PROD12-6634 start*/
            totalDT = ATT.globalVars.cartContents.orderTotals.varFinal.totalDueToday || "0",   /*end*/            
            onetimeamt = ATT.globalVars.cartContents.orderTotals.varFinal.firstBill || "",
            promotioncode =  ATT.globalVars.cartContents.orderTotals.promotions,
            cartdiscount;
            delete  ATT.globalVars.cartContents.wtStoreFulfillChangeInd;
           // window.localStorage.removeItem("wtStoreFulfillChangeInd");
            ATT.util.setCookie('wtStoreFulfillChangeInd',"");
            if(promotioncode && ((promotioncode.orderLevelCoupon && promotioncode.orderLevelCoupon.couponCode)  || (promotioncode.cartLevelCoupon && promotioncode.cartLevelCoupon.couponCode) ) ){
                cartdiscount = promotioncode.orderLevelCoupon ? promotioncode.orderLevelCoupon.couponCode : promotioncode.cartLevelCoupon.couponCode ? promotioncode.cartLevelCoupon.couponCode: "";
            } else {
                cartdiscount ="";
            }
			if((ATT.globalVars.flowIndicator == "ACC" && ATT.globalVars.wirelessAuthenticated ) || (ATT.globalVars.cartContents.authState=="authenticated" && ATT.globalVars.cartContents.orderType=="ACCESSORYONLY")){
                wtEvent = 'HRock_Cart_ExpressCheckOut_Submit';
                
            } else {
               wtEvent = 'HRock_Cart_Submit';
            }

        while (i--) {
            res[i] = $(r[i]).data('report') + "~1";
        }
        ind = res.join('|');
        wtargs = [
            'DCSext.wtEvent', wtEvent, 
            'DCSext.wtStatusCode', "0",
            "DCSext.wtCartContents", eventCheck.wtcartcontent(), 
            'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
            "DCSext.wtSkuQty", ind, 
            "DCSext.wtShipping", shipping, 
            "DCSext.wtCustType", "consumer",
            "DCSext.wtZipCode",ATT.globalVars.zip(),
            "DCSext.wtCity",ATT.globalVars.city,
            "DCSext.wtState",ATT.globalVars.userState,  
            "DCSext.dcsua", window.navigator.userAgent, 
            "DCSext.wtAppName", "HRock",
            'DCSext.wtCartOneTimeAmt', onetimeamt, 
            'DCSext.wtCartMonthlyAmt', monthlyAmt,
            /* total replaced with totalDT to fix PROD12-6634 'DCSext.wtNoHit', 1, 'DCSext.wtCartTotalAmt', total, "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtCartId", eventCheck.cartId,*/
            'DCSext.wtNoHit', 1, 
            'DCSext.wtCartTotalAmt', totalDT, 
            "DCSext.wtZipCode",ATT.globalVars.zip(), 
            "DCSext.wtCartId", eventCheck.cartId,/* end*/
            'DCSext.wtSuccessFlag', 1, 
            'DCSext.wtCartState', eventCheck.wtcartstate, 
            'DCSext.wtCartType', 'eCommerce',
            'DCSext.wtCartDiscounts', cartdiscount, 
            'DCSext.wtBAN', ATT.globalVars.ban,
            'DCSext.wtCQClickId',wtclick,
            'DCSext.wtStorePickupDetails', ATT.globalVars.cartContents.storePickupDetails,
            'DCSext.wtContractCt', ATT.cqWebtrend.getLobContractSummary(),
            'DCSext.wtOfferSkuReferFlag', ATT.globalVars.offerSkuReferFlag(),
            'DCSext.sessionid', ATT.globalVars.sessionid
            
        ];
        
        var storePickupShippingMethod= jQuery('input[name=shipping-select]:checked').attr('value');

        if ((storePickupShippingMethod != 'storePickUp' && ATT.globalVars.cartContents.storePickupDetails.length > 0)) {
            
            
            wtargs.push('DCSext.wtStoreFulfillChangeInd','Y');
            wtargs.push('DCSext.wtCartFulfillMethod','Direct');
            wtargs.push('DCSext.wtStorePickupDetails',"");
            wtargs.push('DCSext.wtShipping',storePickupShippingMethod);
            ATT.globalVars.cartContents.wtStoreFulfillChangeInd="Y";
           // window.localStorage.setItem("wtStoreFulfillChangeInd","Y");
            ATT.util.setCookie('wtStoreFulfillChangeInd',"Y");
            
        } else {
            wtargs.push('DCSext.wtShipping',storePickupShippingMethod);
            wtargs.push('DCS.dcsuri', window.location.pathname);
            
            if (storePickupShippingMethod == 'storePickUp') {
                wtargs.push('DCSext.wtCartFulfillMethod','Store');
            } else {
                wtargs.push('DCSext.wtCartFulfillMethod','Direct');
            }
        }
        window.dcsMultiTrack.apply(this, wtargs);

    });

    //compare button hook up

    $('img[src*=btn-en-compare-blu29]').bind('click', function () {

        var $selectedsku = $('input[name*=skuId]:checked'), sku = [], ind,
            i = $selectedsku.length;
            
        while (i--) {
            sku[i] = $($selectedsku[i]).val() + "~1";
        }
        ind = sku.join('|');
        wtargs = ['DCSext.wtEvent', 'HRock_DeviceCompare_Submit', 'DCSext.wtNoHit', 1, 'DCSext.wtBAN', ATT.globalVars.ban,
            'DCSext.wtStatusCode', "0", 'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate,
            'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", "DCSext.wtCartContents", eventCheck.wtcartcontent(),
            'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, "DCSext.wtSkuQty", ind, "DCSext.wtZipCode",ATT.globalVars.zip()];
        window.dcsMultiTrack.apply(this, wtargs);
    });
    
    //show more devices
    $("#showMoreDevices a, #deviceShowAll a, #showMoreAcc a").live('mousedown', function () {
        var wtargs, href = location.href, evt = eventCheck.evt;
        
        ATT.cqWebtrend.delay(4000).then(function() {
            var wtrti = ATT.cqWebtrend.wtSKUDetails();
            
            wtargs = ['DCSext.wtEvent', evt, 'DCSext.wtNoHit', 1,
                'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0" ,
                'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate,
                "DCSext.wtViewModifier", "Show More", 'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "Consumer", 'DCSext.wtBAN', ATT.globalVars.ban,
                "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtZipCode",ATT.globalVars.zip(),
                "DCSext.wtOOSSKU", wtrti.oosSKU, "DCSext.wtOOSSKUCount", wtrti.oosSKUCount,"DCSext.wtSKUCount", wtrti.SKUCount];
            window.dcsMultiTrack.apply(this, wtargs);
        });
    });

    //HRock save and verify address events 

    this.wtSaveVerifyAddress = function (wtParams) {
  	  var wtCTN = '', wtSLID = '',wtBAN='',ctClickId='',addr_ctClickId_this='';
  	  if(wtParams.hreventType=="verifyAddress"){
  		  //var loginId = ATT.cqWebtrend.retrieveLoginId();
          var loginId = ATT.globalVars.loginId,
  		  ctnPattern = /^[0-9]*$/;

  		  if (loginId !== undefined && loginId != '') {
			var loginType = ctnPattern.test(loginId) ? "CTN" : "SLID";
              if (loginType === "CTN") {
				wtCTN = loginId;
			  }else {
				wtSLID = loginId;
			}
  		  }

  		wtBAN=ATT.globalVars.ban;
  		addr_ctClickId_this = jQuery(".verifyAddress");
  		ctClickId = getCTClickId.apply(addr_ctClickId_this);

      }else{
		  wtBAN='';
          ctClickId='';
      }
      wtargs = ['DCSext.wtEvent', wtParams.hrevent, 'DCSext.wtNoHit', 1 ,'DCSext.wtSpecialOffersOpt', "Y",
                'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', wtParams.wtStatusCode,'DCSext.wtCartState', eventCheck.wtcartstate,
				'DCSext.wtSuccessFlag', wtParams.wtSuccessFlag, 'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer",
                "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtPaperlessBillOpt", wtParams.wtPaperlessBillOpt, "DCSext.wtCQClickId", wtParams.wtclick,
				"DCSext.wtNewShippingAddressFlag", wtParams.wtNewShippingAddressFlag,"DCSext.wtCity",ATT.globalVars.city,"DCSext.dcsua", window.navigator.userAgent,
                "DCSext.wtAppName", "HRock","DCSext.wtState", ATT.globalVars.userState,"DCSext.wtZipCode",ATT.globalVars.zip(),"DCSext.sessionid", ATT.globalVars.sessionid,
                "DCSext.wtBAN", wtBAN,"DCSext.wtCTN", wtCTN,"DCSext.wtSLID", wtSLID
               ];
      			window.dcsMultiTrack.apply(this, wtargs);
  }

    //Code for Search Area/Zip Code Modal
    this.wtSearchAreaAndZipCode = function (wtParams) {
    	var wtUserResp='',areaCodeOrZipVal=$("#zipAreaCodeEntry").val();
    	
    	if(wtParams.wtStatusCode==0){
    	
    		if(areaCodeOrZipVal.length==3){
    			wtUserResp="Area Code";
    		}

    		if(areaCodeOrZipVal.length==5){
    			wtUserResp="Zip Code";
    		}
    	}
    	
        wtargs = [ 'DCSext.wtEvent', 'HRock_Choose_AreaCode_Submit','DCSext.wtStatusCode',wtParams.wtStatusCode,'DCSext.wtSuccessFlag',wtParams.wtSuccessFlag,
                   'DCSext.wtUserResp',wtUserResp]; 
        
        window.dcsMultiTrack.apply(this, wtargs);
    }

 // Code for Chossing Different area code 
    jQuery(".yourwirelessnumbers .lnpdd").bind("change", function(){

       if(this.value == 'DIFF_AREA_CODE'){
           ctClickId_this = jQuery(".havectClickId");
           wtCTClickId = getCTClickId.apply(ctClickId_this);
           wtargs = ['DCSext.ctClickId',wtCTClickId ,"DCSext.wtZipCode",ATT.globalVars.zip(),'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,'DCSext.wtNoHit', 1];
           window.dcsMultiTrack.apply(this, wtargs);
       }
   });
   
    //phone details
    //Hrock_CheckOut_PhoneDetails_Submit
//    $('#submitPhonedetail').unbind('mousedown').bind('mousedown', function () {
//  var acheck = $("select", ".yourwirelessnumbers").val() === "-1" ? "chk.pers.err.WLSU30004" : "0",
//  flag = acheck === "chk.pers.err.WLSU30004" ? "0" : 1,
//            wtclick = $(this).data('cqpath') || "/content/att/shop/checkout/phonedetails/jcr:content/phonedetailscontinue",
//            acctType = $("input[type='radio'][name^='consumerType_']:checked").attr("id"),
//            wtAcctType = ((/business/i.test(acctType))? 'B' : 'R');
//            
//        wtargs = ['DCSext.wtEvent', "HRock_CheckOut_PhoneDetails_Submit", 'DCSext.wtNoHit', 1, 'DCSext.wtBAN', ATT.globalVars.ban,
//            'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,"DCSext.wtCustType","consumer", 'DCSext.wtStatusCode', acheck, "DCSext.wtCartId", eventCheck.cartId, 'DCSext.wtCQClickId', wtclick,
//            'DCSext.wtSuccessFlag', flag, 'DCSext.wtCartType', 'eCommerce', 'DCSext.wtCartState', eventCheck.wtcartstate,
//            "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtAcctType", wtAcctType];
//        window.dcsMultiTrack.apply(this, wtargs);
//    });

    //promo code for cart summary
    /*TODO
     wtPromoDiscountStartDate
     wtPromoDiscountEndDate
     wtPromoDuration
     ATT.globalVars.discount = ATT.globalVars.cartContents.orderTotals.promotion.couponCode;
     ATT.globalVars.promoamt =  ATT.globalVars.cartContents.orderTotals.promotion.appliedAmount;
     */
    $(doc).bind('FormResponseReturned', function (event, coupondata) {
        if (window.location.href.indexOf('cartsummary') > -1) {
        var wtclick, evtname, sdate, edate, pduration, code, flag, promotype, amt,
            checkstatus = coupondata.status,
            status = checkstatus === "failure" ? coupondata.messages[0].errorCode : "0",
            promoCode,statusMsg;
            
        if(status == "0" ) {
            statusMsg= "SUCCESS";
        }
        else if (status==undefined || status == "") {
            status= coupondata.messages[0].errorMessage;
        }    

        if (coupondata.queue === "coupon") {
            wtclick = $(".summary-item-actions a", "#enter-coupon-line").data('cqpath');
            evtname = coupondata.action === "apply" ? "HRock_Cart_PromoCode_Submit" : "HRock_Cart_PromoCode_Remove";
            sdate = checkstatus === "failure" ? "" : " 2011-07-01";
            edate = checkstatus === 'failure' ? "" : " 2012-12-31";
            pduration = checkstatus === 'failure' ? "" : "1year";
            flag = checkstatus === 'success' ? 1 : "0";
            promoCode = coupondata.data.promoCode;
            promotype = checkstatus === 'failure' ? "" : "coupon";
            amt = checkstatus === 'failure' ? "" : "-$10";
        } else {
            wtclick = $(".summary-item-actions a", "#employee-referral-line").data('cqpath');
            evtname = coupondata.action === "apply" ? "HRock_Cart_PromoCode_Submit" : "HRock_Cart_PromoCode_Remove";
            sdate = "";
            edate = "";
            promoCode = coupondata.data.employeeId;
            pduration = "";
            flag = checkstatus === 'failure' ? "0" : 1;
            promotype = checkstatus === 'failure' ? "" : "employeeReferral";
            amt = "";
        }

        wtargs = ['DCSext.wtEvent', evtname, 'DCSext.wtNoHit', 1, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', status ,
            'DCSext.wtStatusMsg', statusMsg,
            'DCSext.wtSuccessFlag', flag, 'DCSext.wtCartState', eventCheck.wtcartstate,
            'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", "DCSext.wtPromoCode", promoCode,
            "DCSext.wtCartContents", eventCheck.wtcartcontent(), 'DCSext.wtCartType', 'eCommerce', 'DCSext.wtBAN', ATT.globalVars.ban,
            "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtCQClickId', wtclick, 'DCSext.wtCartId', eventCheck.cartId,
            "DCSext.wtPromoDollarsOffAmount", amt, "DCSext.wtPromoDuration", pduration, 'DCSext.wtPromoType', promotype,
            "DCSext.wtPromoDiscountStartDate", sdate, "DCSext.wtPromoDiscountEndDate", edate, "DCSext.wtPromoCodeStatus", "0"];
        window.dcsMultiTrack.apply(this, wtargs);

        ATT.ajaxWrapper('/shop/cart/cartsummary/jcr:content/cart.cartcontent.xhr.json', function (data) {
            ATT.globalVars.cartContents = data;
            ATT.globalVars.flattenCartContents = ATT.util.flattenObject(data);
        });
        }
    });

    //media icons logs
    $(doc).delegate('map','click', function (e) {
        var wtShare = e.target.getAttribute("title"),
            wtclick = '/content/att/shop/common/jcr:content/socialmedia';


        wtargs = ['DCSext.wtEvent', "HRock_Social_Media_Click", 'DCSext.wtSuccessFlag', 1, "DCSext.wtCartId", eventCheck.cartId,
            'DCSext.wtCQClickId', wtclick, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0",'DCSext.wtBAN', ATT.globalVars.ban,
            'DCSext.wtCartType', 'eCommerce', 'DCSext.wtCartState', eventCheck.wtcartstate, "DCSext.wtCustType", "Consumer",
            "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtShareMethod", wtShare];

        window.dcsMultiTrack.apply(this, wtargs);
    });

    //tabs hook up
    //$("a", "ul.tabs").bind('click', cbEvents.cqClick);
	if(~location.href.indexOf('shop/wireless/msv-notice.html')){
		$("a#msvlivechat").live('click', function () { 
			wtargs = ['DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtCustType', 
							  'Consumer', 'DCSext.wtChatInitAppName','HardRock - Mobile Share Value', 'DCSext.wtChatInitPN', 'HRock Notice Regarding your Mobile Share Value Plan Discount - AT&T','DCSext.ctClickId', getCTClickId.apply(this) ];
			window.dcsMultiTrack.apply(this, wtargs);
		});
    }

    //AAL

    $('#AALSubmitButton', '.addaline').bind('click', function () {

        var aalText= jQuery('input[name=aalsubmittype_SmartPhone]:checked').closest('.radio').siblings('label').text().split(' ');
        if(aalText == null) {
            aalText= jQuery('input[name=aalsubmittype_Tablet]:checked').closest('.radio').siblings('label').text().split(' ');
        }
        if(aalText == null) {
            aalText= jQuery('input[name=aalsubmittype_WirelessHomePhone]:checked').closest('.radio').siblings('label').text().split(' ');
        }
        var wtclick = '/content/att/shop/en/wireless/addaline/jcr:content/addaline',
            aaltype, aalText;

        if(jQuery(".selectedAAL #existingFamilyInput").is(":checked"))
        aaltype="Existing Family Talk";
        else if(jQuery(".selectedAAL #newIndividualDataInput").is(":checked"))
        aaltype="New Individual Data";
        else if(jQuery(".selectedAAL #newIndividualVoiceInput").is(":checked"))
        aaltype="New Individual Voice";
        else if(jQuery(".selectedAAL #existingMSInput").is(":checked"))
        aaltype="Existing Mobile Share";
        else if(jQuery(".selectedAAL #newMSInput").is(":checked"))
        aaltype="New Mobile Share";

        wtargs = ['DCSext.wtEvent', 'HRock_Cart_AAL_Submit', "DCSext.wtSkuQty", "sku5676677~1", "DCSext.wtMIRInd", wtMIRInd, 'DCSext.wtNoHit', 1,
            'DCSext.wtBuyFlowCode', "HRAL~WAL~U~H~I~D~BW", 'DCSext.wtStatusCode', "0" , 'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState',
            eventCheck.wtcartstate, "DCSext.wtCustType", "consumer", "DCSext.wtCartContents", eventCheck.wtcartcontent(),'DCSext.wtBAN', ATT.globalVars.ban,
            'DCSext.wtCartType', 'eCommerce', "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtCQClickId', wtclick, "DCSext.wtAALType", aaltype];

        window.dcsMultiTrack.apply(this, wtargs);
        
        return false;
        
    });
    
    $('a','body').live('click', cbEvents.cqClick);
    //$('.shipping-select').live('click', cbEvents.cqClick);
    $('.bopis .btn').live('click',cbEvents.cqClick);
    //$("ul.carousel1ContentSelector").delegate("a", 'mousedown', cbEvents.cqClick);
   
   // $("a", "#homepageFeatureswelcomeback,#ATTServicesHomepage").live("click", cbEvents.cqClick);

    /*$('a', '#homepageFeatures').live('click', function(){
        var clickid = this.getAttribute("data-cqpath");
        wtargs = ['DCSext.wtCQClickId', clickid, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip()];
        window.dcsMultiTrack.apply(this, wtargs);

    });*/

    //shopping assistant
    $("li.step, #sa-footer a", "#shopping-assistant").live('mousedown', function () {
        var clickid = '/content/att/shop/wireless/hmc/jcr:content/shoppingAssistanceLink';
        wtargs = ['DCSext.wtCQClickId', clickid, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip()];
        window.dcsMultiTrack.apply(this, wtargs);
    });



    //jQuery("a").delegate("div[data-teaserid]", "click", cbEvents.cqClick);
    //extra clicks end

    //HMC hook up
    $("#hmc-submit", "#content").bind('click', function () {
        var actualpath = '/content/att/shop/wireless/hmc/jcr:content/hmc',
            $ques = $(".question-type"),
            $ans = $(".hcmquestion:checked"),
            i = $ques.length, q = [], wtHelpChoose;
        while (i--) {
            q[i] = "Q~" + $.trim($($ques[i]).text()) + "|" + "A~" + $.trim($($ans[i]).parent().next().text());

        }
        wtHelpChoose = q.join("|");
        wtargs = ['DCSext.wtEvent', 'HRock_HMC_ViewReco_Submit', 'DCSext.wtNoHit', 1,
            'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtStatusCode', "0" ,
            'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate,
            "DCSext.wtCQClickId", actualpath, 'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer",
            "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtHelpChoose', wtHelpChoose];

        window.dcsMultiTrack.apply(this, wtargs);

    });

   

    //1.5 reporting issue ECOM1202-3384
    $("form#emailCapture").bind("submit", function () {
        var wtUserResp = $(this).find("input").val(),
            wtEmailAddr, wtshare = "", wtCQClick = "/shop/wireless/upgrade/jcr:content/emailcapture";

        if ($.trim(wtUserResp) === "Enter your email") {
            wtUserResp ='email address';
            ATT.log("no email entered for stay connected");
            
        }
        
        wtargs = ['DCSext.wtEvent', "HRock_Lead_Capture_Submit", 'DCSext.wtSuccessFlag', 1, "DCSext.wtCartId", eventCheck.cartId,
            'DCSext.wtCQClickId', wtCQClick, 'DCSext.wtStatusCode', "0", "DCSext.wtUserResp", wtUserResp,
            'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", "DCSext.wtZipCode",ATT.globalVars.zip(), "DCSext.wtEmailAddr", ""];

        window.dcsMultiTrack.apply(this, wtargs);

    });

    //1.5 linkfarm stuff
    //$("#linkFarm a").live("mousedown", cbEvents.cqClick);
    $(".bopis .ContinueShopping").live("click", function(){
        var dcsURI= window.location.pathname;
        var clickID = "/content/att/shop/en/wireless/accessories/cases/sku4890227/jcr:content";
        wtargs = ['DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,'DCSext.wtCQClickId',clickID,'DCS.dcsuri',dcsURI, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtCustType', 'Consumer'];

        window.dcsMultiTrack.apply(this, wtargs);
    });

    //$("a", ".catalogtabcarousel").live("mousedown", cbEvents.cqClick);

    // 1.5 carousal stuff
   // $("a", ".carouselWrapper").live("mousedown", cbEvents.cqClick);
    $(".jcarousel-next, .jcarousel-prev", ".carouselWrapper").live("mousedown", function(){
        var clickid = '/content/campaigns/att/en/Wireless/overview/Campaign/default/jcr:content/LoBTabcontent/arrowClick';
        wtargs = ['DCSext.wtCQClickId', clickid, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip()];
        window.dcsMultiTrack.apply(this, wtargs);
    }) ;

    /************************* Click to chat ************************************************/
    $('#lpButtonDiv, #lpButtonDiv-2, #lpButtonDivWLSUp').bind('click', function () {

        var wtclick = '/content/att/shop/clicktochat/jcr:content/clicktochat';

        wtargs = ['DCSext.wtEvent', 'Chat_Request_Submit', 'DCSext.wtNoHit', 1, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtChatType', "User_Initiated",
            'DCSext.wtChatID', "liveperson" , 'DCSext.wtStatusCode', "0" , 'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate, "DCSext.flowCode", "livepersonConsole",
            'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", "DCSext.wtCartContents", eventCheck.wtcartcontent(), "DCSext.wtChatVendor", "liveperson",
            "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtCQClickId', wtclick, "DCSext.wtCartId", eventCheck.cartId,"wtCartFulfillMethod",ATT.globalVars.cartContents.cartFulfillMethod];

        window.dcsMultiTrack.apply(this, wtargs);

    });

    /**************** C2C ends ****************************************************************/

    /*****************  HRock_DeviceGeoAvailCheck_Submit ***********************************/
    $("img[src*=btn-en-checkavailability-grid-blu29]").live("mousedown", function(e){
        var clickid = $(e.target).parent().data('cqpath'), wtsku = jQuery(this).parents(".listGrid-item").attr("id").split('_')[1];
        wtargs = ['DCSext.wtEvent', 'HRock_DeviceGeoAvailCheck_Submit', 'DCSext.wtNoHit', 1, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
            'DCSext.wtStatusCode', "0" , 'DCSext.wtSuccessFlag', 1, 'DCSext.wtCartState', eventCheck.wtcartstate, "DCSext.wtSku", wtsku ,
            'DCSext.wtCartType', 'eCommerce', "DCSext.wtCustType", "consumer", "DCSext.wtCartContents", eventCheck.wtcartcontent(),
            "DCSext.wtZipCode",ATT.globalVars.zip(), 'DCSext.wtCQClickId', clickid, "DCSext.wtCartId", eventCheck.cartId];

        window.dcsMultiTrack.apply(this, wtargs);

    });

    /************************   Closing or cancelling modal ********/
    if(~href.indexOf('/login/')){
        $(doc).bind('cbox_complete', function(){
                $('img[src*=btnYes]').live('click', function () {
            var wtclick = '/content/att/shop/en/wireless/modals/shopmodals/jcr:content/mainpar/accountselection;2011339',
                r = (ATT.util.getCookie("colam_ctn") || ""), /* null not acceptable return value */
                j = $.parseJSON('{"' + r.replace(/%3B/gi, '","').replace(/%3D/gi, '":"').replace(/%40/gi, '@') + '":""}'),
                wtslid = j.uid;

            wtargs = [ 'DCSext.wtEvent', 'HRock_Acct_Selection_Submit', 'DCSext.wtNoHit', 1, 'DCSext.wtStatusCode', -1, 'DCSext.wtBuyFlowCode', 'HRAL~WAL~U~H~I~D~BW',
                'DCSext.wtSuccessFlag', -1, 'DCSext.wtCartState', eventCheck.wtcartstate, 'DCSext.wtBAN', ATT.globalVars.ban,
                 "DCSext.wtCartId", eventCheck.cartId, "DCSext.wtCQClickId", wtclick, "DCSext.wtSLID", wtslid, "DCSext.wtCustType", "consumer",
                'DCSext.wtCartType', 'eCommerce', "DCSext.wtZipCode",ATT.globalVars.zip()];
            window.dcsMultiTrack.apply(this, wtargs);
        });
        });
    }

    //homepage login  tracking 
    if(location.pathname === '/'){
        $('#tguardLoginButton','body').live('mousedown', function (e) {
            var clickid = '/content/att/home/login/default/jcr:content/login;2012107',
                 $target = $(e.target);
             wtargs = ['DCSext.wtCQClickId', clickid, 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip()];

             window.dcsMultiTrack.apply(this, wtargs);
            
        });  
    }
   
    jQuery.when(reporting_ready).then(function (reporting) {
    	jQuery('<meta/>', {content: ATT.globalVars.fan, name: 'DCS.wtFAN' }).appendTo('head');
    	jQuery('<meta/>', {content: ATT.globalVars.accountGroupID, name: 'DCS.wtAccntGrp' }).appendTo('head');
    	jQuery('<meta/>', {content: ATT.globalVars.liabilityType, name: 'DCSext.wtLiabilityType' }).appendTo('head');

        reporting.capture([
            {selector: '#submitPersonalPayment', type: 'wtsubmit', name: 'HRock_CheckOut_PersPmtInfo_Submit', value: function() {
                var wtPaperlessBillOpt = $("#signMe").parent().hasClass("checked") ? "Y" : "N",
                    wtclick = $(this).data('cqpath') || "/content/att/shop/checkout/personalpayment/jcr:content/ppibutton";
                var wtEmailAddr=jQuery("input#email[type=text]").val() ? jQuery("input#email[type=text]").val() : jQuery("input#email[type=hidden]").val();
                var wtTxtOrderNotifyOpt= jQuery("#txtOrderNotify").length>0?(jQuery("#txtOrderNotify").is(':checked')?"Y":"N"):"";
                var wtSplOfferOpt=jQuery("#offer").length>0?(jQuery("#offer").is(':checked')?"Y":"N"):"";
                /* commented as getting different value of r .Instead of l%3Den_US%3B getting l%3Den_US
                 * var r = (ATT.util.getCookie("colam_ctn") || ""),
                j = $.parseJSON('{"' + r.replace(/%3B/gi, '","').replace(/%3D/gi, '":"').replace(/%40/gi, '@') + '":""}'),
                a=/^[0-9]*$/;
                var logintype="";
                if (j.uid !== undefined ) {
                    logintype = a.test(j.uid) ? "CTN" : "SLID";
                }*/
                var pLoginType = ATT.objectsearch.findJSON({search: 'profile.loginType'}),
    			loginId = ATT.objectsearch.findJSON({search: 'profile.loginId'}), loginType = '';
                var wtSlid = pLoginType === "SLID" ? loginId: "";
                var ctnVal = pLoginType === "CTN" ?  loginId : "";
                reporting.params.wtBAN = ATT.globalVars.ban;
                reporting.params.wtBuyFlowCode = ATT.globalVars.flowcode;
                reporting.params.wtCartContents = eventCheck.wtcartcontent();
                reporting.params.wtPaperlessBillOpt = wtPaperlessBillOpt;
                reporting.params.wtCartState = eventCheck.wtcartstate;
                reporting.params.wtCQClickId = wtclick;
                reporting.params.wtCartID = wtEmailAddr;
                reporting.params.wtEmailAddr=wtEmailAddr;
                reporting.params.wtCartType="eCommerce";
                reporting.params.wtCartFulfillMethod=ATT.globalVars.cartContents.cartFulfillMethod;
                reporting.params.wtTxtOrderNotifyOpt=wtTxtOrderNotifyOpt;
                reporting.params.wtSpecialOffersOpt=wtSplOfferOpt;
                reporting.params.wtSLID = wtSlid;
                reporting.params.wtCTN = ctnVal;
                
            }, params: 'wtCartType,wtCQClickId,wtCartID,wtEmailAddr,wtCartContents,wtPaperlessBillOpt,wtCartState,wtBAN,wtBuyFlowCode,wtCartFulfillMethod,wtTxtOrderNotifyOpt,wtSpecialOffersOpt,wtSLID,wtCTN'},
            
            {selector: '#submitPhonedetail', type: 'wtsubmit', name: 'HRock_CheckOut_PhoneDetails_Submit', value: function() {
                var wtclick = $(this).data('cqpath') || "/content/att/shop/checkout/phonedetails/jcr:content/phonedetailscontinue";
                var acctType = $("input[type='radio'][name^='consumerType_']:checked").attr("id");
                var wtAcctType = ((/business/i.test(acctType))? 'B' : 'R');

                reporting.params.wtNoHit = 1;
                reporting.params.wtBAN = ATT.globalVars.ban;
                reporting.params.wtBuyFlowCode = ATT.globalVars.flowcode;

                reporting.params.wtCustType = "consumer";


                reporting.params.wtCartId = eventCheck.cartId;
                reporting.params.wtCQClickId = wtclick ;

                reporting.params.wtCartType = "eCommerce";
                reporting.params.wtCartState = eventCheck.wtcartstate;
                reporting.params.wtCartContents = eventCheck.wtcartcontent();
                reporting.params.wtZipCode = ATT.globalVars.zip();
                reporting.params.wtAcctType = wtAcctType;

            }, params: 'wtCartType,wtCQClickId,wtCartId,wtCartContents,wtCartState,wtBAN,wtBuyFlowCode,wtCustType,wtSuccessFlag,wtZipCode,wtAcctType'},
                
            {selector: '#tguardLoginButton:page(/login)', type: 'wtsubmit', name: 'HRock_Login_Submit', value: function() {
                var a=/^[0-9]*$/,
                    logintype = a.test($("#userid").val()) ? "CTN" : "SLID",
                    ctnVal = logintype === "CTN" ?  $("#userid").val() : "",
                    slidVal = logintype === "SLID"  ?   $("#userid").val() : "",
                    wtclick = "/content/att/shop/en/wireless/modals/shopmodals/jcr:content/mainpar/login";
                
               //   reporting.params.wtBuyFlowCode = ATT.globalVars.flowcode;
                reporting.params.wtCQClickId = wtclick;
                reporting.params.wtLoginType = logintype;
                reporting.params.wtCTN = ctnVal;
                reporting.params.wtSLID = slidVal;
                
                
            }, params: 'wtCQClickId,wtLoginType,wtCTN,wtSLID'},
            
            {selector: '#acctSelContinue', type: 'wtsubmit', name: 'HRock_Acct_Selection_Submit', value: function() {
                var wtclick = "/content/att/login/jcr:content/login",
                r = (ATT.util.getCookie("colam_ctn") || ""), // null not acceptable return value 
                j = $.parseJSON('{"' + r.replace(/%3B/gi, '","').replace(/%3D/gi, '":"').replace(/%40/gi, '@') + '":""}'),
                wtslid = j.uid ;
                reporting.params.wtCQClickId = wtclick;
                reporting.params.wtSLID= wtslid;
                reporting.params.wtBuyFlowCode = ATT.globalVars.flowcode;
                reporting.params.wtZipCode = ATT.globalVars.zip();
                reporting.params.wtCartId = eventCheck.cartId;
                
			}, params: 'wtCQClickId,wtSLID,wtBuyFlowCode,wtZipCode,wtCartId'}
            
         ]);
    });
    
    
    /*Join Group Button web Trends*/
    $("#retainCartStatusID .tableGroup a.lrgButton").live('click', function(event){
        wtPlanSelected = $.trim($(".groupNameAHref", $(this).parents('.tableGroup')).text());
        wtAvailPlanLineCt = $("td.button", $(this).parents('.tableGroup')).attr('data-linesavail') + '~' + $("td.button", $(this).parents('.tableGroup')).attr('data-maxlines');
        wtUnAvailPlanCt = $(".tableGroup .button .disabledButton").length;
        wtUnAvailPlanReason = '';
        $(".tableGroup .button .disabledButton").each(function (i) {
            wtUnAvailPlanReason = $(this).next().text();
            if (wtUnAvailPlanCt > 1 && i < wtUnAvailPlanCt)
                wtUnAvailPlanReason = wtUnAvailPlanReason + '~';
        });
        noOfDevices = ATT.globalVars.cartContents.lob.items.length;
        wtCartDeviceFlag = noOfDevices > 0 ? 'Y' : 'N';
        var logintype, glbVars = ATT.globalVars, cartId = "", slid = "", skuPrice = "";
        if (glbVars.cartContents && glbVars.cartContents.cartId) {
            cartId = ATT.globalVars.cartContents.cartId;
        }
        var r = (ATT.util.getCookie("colam_ctn") || ""),
            j = $.parseJSON('{"' + decodeURIComponent(r).replace(/=/gi, '":"').replace(/;/gi, '","') + '":""}'),
            a = /^[0-9]*$/;
        if (j.uid !== undefined) {
            logintype = a.test(j.uid) ? "CTN" : "SLID";
            if (logintype === "SLID") {
                slid = j.uid;
            }
        }
        var parentTableWrapper = $(event.target).parents(".table-wrapper"),
        priceBreakDownDiv = parentTableWrapper.find('.priceBreakdown');
        priceBreakDownDiv.each(function (i, obj) {
            $('.breakdown').each(function (j, objj) {
                skuPrice += $(this).text().substr(1, 5) + "|";
            });
            skuPrice = skuPrice.substring(0, skuPrice.length - 1);
        });
        wtargs = [
            'DCSext.dcsuri', "/shop/wireless/plans/joingroup.html",
            'DCSext.wtEvent', PBaddCart,
            'DCSext.wtSuccessFlag', 1,
            'DCSext.wtStatusMsg', "SUCCESS",
            'DCSext.wtSLID', slid,
            'DCSext.wtBTN', glbVars.ban,
            'DCSext.wtCartID', cartId,
            'DCSext.wtCartType', "eCommerce",
            'DCSext.wtCartState', "I",
            'DCSext.wtCartContents', glbVars.cartContents.wtCartContents,
            'DCSext.wtSkuPrice', skuPrice,
            'DCSext.wtMIRInd', "N",
            'DCSext.dcsua', window.navigator.userAgent,
            'DCSext.wtBuyFlowCode', glbVars.flowcode,
            'DCSext.wtCustType', "Consumer",
            'DCSext.wtPlanSelected', wtPlanSelected,
            'DCSext.wtAvailPlanLineCt', wtAvailPlanLineCt,
            'DCSext.wtUnAvailPlanCt', wtUnAvailPlanCt,
            'DCSext.wtUnAvailPlanReason', wtUnAvailPlanReason,
            'DCSext.wtCartDeviceFlag', wtCartDeviceFlag,
            'DCSext.wtNoHit', 1
        ];
        window.dcsMultiTrack.apply(this, wtargs);
    });

    /*Join Group - price break down Button web Trends*/

    $(".price-breakdown .showHidePrcBrk").live('click',function () {
        var r = (ATT.util.getCookie("colam_ctn") || ""),
        	uid = ATT.cqWebtrend.retrieveLoginId(),
            a = /^[0-9]*$/, logintype ='';
        if (uid !== undefined) {
            logintype = a.test(uid) ? "CTN" : "SLID";
        }
        var wtSlid = logintype === "SLID" ? uid : "",
            wtEmailAddr = $("input#email[type=text]").val() ? $("input#email[type=text]").val() : $("input#email[type=hidden]").val();

        wtargs = [
            'DCSext.dcsuri', "/shop/wireless/plans/joingroup.html",
            'DCSext.wtLinkLoc', "Body",
            'DCSext.wtCustType', "Consumer",
            'DCSext.dcsua', window.navigator.userAgent,
            'DCSext.wtNoHit', "1",
            'DCSext.wtEvent', "HRock_GroupPlan_PriceBreakdown_Click",
            'DCSext.wtSuccessFlag', "1",
            'DCSext.wtStatusCode', "0",
            'DCSext.wtSLID', wtSlid,
            'DCSext.wtBTN', ATT.globalVars.ban,
            'DCSext.wtCartID', wtEmailAddr,
            'DCSext.wtCartType', "eCommerce",
            'DCSext.wtCartState', eventCheck.wtcartstate,
            'DCSext.wtCartContents', eventCheck.wtcartcontent(),
            'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode
        ];
        if($("#showPriceBreak", this).is(":visible"))
        wtargs.push('DCS.wtLinkName', 'Price Breakdown Expand');
        else
        wtargs.push('DCS.wtLinkName', 'Price Breakdown Collapse');
        window.dcsMultiTrack.apply(this, wtargs);
    });

    /* webtrends for "Join Existing Mobile Share Group" on join group page */
    $("#yellowMessage").delegate('#compatibilityMessage a', 'click', function () {
        wtargs = [
            'DCSext.wtLinkName', "Join Existing Mobile Share Group",
            'DCSext.wtLinkLoc', "Body",
            'DCSext.wtCustType', "consumer",
            'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
            'DCSext.dcsua', window.navigator.userAgent,
            'DCSext.wtNoHit', "1"
        ];
        window.dcsMultiTrack.apply(this, wtargs);
    });

    $(".defaultAvlMsgWidth .createNewLable .stdButtonCreateNew").live('click', function (e) {
        wtargs = [
            'DCSext.wtLinkName', "Create New Mobile Share Plan",
            'DCSext.wtLinkLoc', "Body",
        ];
        window.dcsMultiTrack.apply(this, wtargs);
    });

    //webtrend to expand/collapse Family/Mobile groups
    $('#retainCartStatusID .group-name a').live('click', function (e) {
        var wtargs = ['DCS.dcsuri', "/shop/wireless/plans/joingroup.html",
            'DCS.wtLinkLoc', "Body",
            'DCS.wtNoHit', "1",
            'DCS.wtCustType', "Consumer",
            'DCS.dcsua', window.navigator.userAgent
        ];
        var userBreakDownElement = $(this).closest('div').find('.userBreakdown'),
            groupName = $(this).text();

        if (userBreakDownElement.is(":visible")) {
            wtargs.push('DCS.wtLinkName', $.trim(groupName) + " Detail Collapse");
        } else {
            wtargs.push('DCS.wtLinkName', $.trim(groupName) + " Detail Expansion");
        }
        window.dcsMultiTrack.apply(this, wtargs);
    });
    
  //webtrend to expand/collapse upgrade options
    jQuery("#swapEligibility #showMoreLink").click(function(){
    	var wtLinkName ="Show Less Options";
    	if(jQuery(this).hasClass("expandImg"))
    		wtLinkName ="Show More Options";   
    	wtargs = ['DCSext.wtPN',"HRock_Upgrade_Options_Pg",
    	          'DCSext.wtLinkName',wtLinkName,
    	          'DCSext.wtLinkLoc',"HRock Upgrade Options Pg_Body"];	
    	window.dcsMultiTrack.apply(this, wtargs);
    });
    /******************************************************************
     * 1: wireless LOB tab learn link event
     * 2: bazaar voice tab link write click events
 
    $("body:page(wireless)")
        .delegate(".LoBT .valueTile a", "click", cbEvents.cqClick)
        .delegate("#BVContent .BVRRRatingSummaryLinkWrite a", "click", function(e){
            var tmpwtargs = ['DCSext.wtCQClickId', "UNKNOWN", 'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode, 'DCSext.wtNoHit', 1, "DCSext.wtZipCode",ATT.globalVars.zip()];
            window.dcsMultiTrack.apply(this, tmpwtargs);
        });*/
    
    /*
        will execute on the credit check failure page when user choses to cancel their order.
        params are identical to order submit, except wtStatusMsg, and wtSuccessFlag are both
        set to -1.
    */
    jQuery('#cancelOrderButton').click(function() {
        var statusCode = '-1';
        var statusMsg = ''; 
        var successFlag = '-1';
        ATT.cqWebtrend.wtCheckoutOrderSubmit(statusCode, statusMsg, successFlag);
    });

    this.wtCheckoutOrderSubmit = function(statusCode, statusMsg, successFlag){

        var clickID;
        var wtDcsuri;

    clickID = jQuery('#cancelOrderButton').attr('data-cqpath');

    if(clickID == undefined || clickID == ''){
    clickID = '/content/att/shop/en/checkout/orderreview/jcr:content';
    }

    var wtCTN = '';
    var wtSLID = '';
    var wtCartState = eventCheck.wtcartstate;
    var wtCartFulfillMethod = ATT.globalVars.cartContents.wtCartFulfillMethod;
    var wtStorePickupDetails = ATT.globalVars.cartContents.wtStorePickupDetails;
       // var wtCartFulfillMethod = window.localStorage.getItem("wtCartFulfillMethod");
       // var wtStorePickupDetails = window.localStorage.getItem("wtStorePickupDetails");
    var wtOrderNumber = '';

    var loginId = ATT.cqWebtrend.retrieveLoginId();
    var ctnPattern = /^[0-9]*$/;

    if (loginId !== undefined && loginId != '') {
    var logintype = ctnPattern.test(loginId) ? "CTN" : "SLID";
    if (logintype === "CTN") {
    wtCTN = loginId;
    }
    else {
    wtSLID = loginId;
    }

    }

    //override wtCartState as 'C' = 'C'omplete as on ordersummary page cart state becomes 'E' = 'E'mpty
    if(successFlag == '1'){
    wtCartState = 'C';
    jQuery.when(ATT.globalVars).then(function(){
    if(ATT.globalVars.orderNumber != 'undefined' && ATT.globalVars.orderNumber != null){
    wtOrderNumber = ATT.globalVars.orderNumber;
    }
    });
    }

    var wtOrderType, wtNextEligible, wtBuyFlowType;
    wtOrderType = $('#wtOrderType').val() == 'POSTPAID' ? 'Y' : 'N';
    wtNextEligible = $('#wtNextEligible').val() == 'true' ? 'Y' : 'N';
    wtBuyFlowType =$('#wtBuyFlowType').val();
    
    //US27607: Upgrade Eligibility Reporting
    //Check upgrade CTN and if it matches the localStorage value then report wtMRECodes
    var MRECodesStorage = window.localStorage.getItem("MRECodes");
    if ($('.display-name h2').length && MRECodesStorage != null){
    var wtMRECodes, MRECodesArray = [],
    MRECodesStorageArray = MRECodesStorage.split('|');
    $('.display-name h2').each(function () {
    var CTN = jQuery(this).html().replace(/[^0-9]/g, '');
    for (i=0;i<MRECodesStorageArray.length;i++){
    if (MRECodesStorageArray[i].indexOf(CTN) != -1){
    var start_pos = MRECodesStorageArray[i].indexOf(CTN)+ CTN.length+1;
    MRECode = MRECodesStorageArray[i].substring(start_pos);
    MRECodesArray.push(MRECode);
    }
    }
    });
    wtMRECodes = MRECodesArray.join('|');
    }

	var wtNewShippingAddressFlag = localStorage.getItem("wtNewShippingAddressFlag") || "0";
	window.localStorage.removeItem("wtNewShippingAddressFlag");
	
	var wtPaymentType = ATT.globalVars.paymentType || "";

    var wtargs ;
    wtargs = [
    'DCSext.wtNoHit', 1,
    'DCSext.wtCTN', wtCTN,
    'DCSext.wtSLID', wtSLID,
    'DCSext.wtEvent', 'HRock_CheckOut_Order_Submit',
    'DCSext.wtStatusCode', statusCode,
    'DCSext.wtStatusMsg', statusMsg,
    'DCSext.wtBAN', ATT.globalVars.ban,
    'DCSext.wtSuccessFlag', successFlag,
    'DCSext.wtAppName', 'HROCK',
    'DCSext.wtStoreFulfillChangeInd', ATT.cqWebtrend.storeFulfillChangeInd(),
    'DCSext.wtCQClickId', clickID,
    'DCSext.wtCartType', 'eCommerce',
    'DCSext.wtCartID', eventCheck.cartId,
    'DCSext.wtCustType','consumer',
    "DCSext.wtZipCode",ATT.globalVars.zip(),
    "DCSext.sessionid", ATT.globalVars.sessionid,
    "DCSext.wtCity",ATT.globalVars.city, 
    "DCSext.wtState", ATT.globalVars.userState,
    "DCSext.dcsua", window.navigator.userAgent,
    'DCSext.wtCartState', wtCartState,
    'DCSext.wtCartContents',eventCheck.wtcartcontent(),
    'DCSext.wtCartFulfillMethod',wtCartFulfillMethod,
    'DCSext.wtStorePickupDetails',wtStorePickupDetails,
    'DCSext.wtPostPaidEligFlag',wtOrderType,
    'DCSext.wtBuyFlowCode', ATT.globalVars.flowcode,
    'DCSext.wtLeaseEligFlag',wtNextEligible,
    'DCSext.wtMRECodes',wtMRECodes,
    'DCSext.wtBuyFlowType',wtBuyFlowType,
    'DCSext.wtPaymentMethod', wtPaymentType,
    'DCSext.wtOfferSkuReferFlag', ATT.globalVars.offerSkuReferFlag(),
	'DCSext.wtNewShippingAddressFlag', wtNewShippingAddressFlag
    ];

    if(successFlag == '-1'){
    wtargs.push('DCS.dcsuri');
    wtargs.push('/shop/checkout/creditresult.html');
    }
    else{
    wtDcsuri = jQuery('#v_wtSubmitOrderURL').val();
    if(wtDcsuri != undefined && wtDcsuri != '' && wtDcsuri != null && wtDcsuri != 'null'){
    var start = wtDcsuri.indexOf("/shop");
    var end = wtDcsuri.indexOf("?");
    var dcsuri = wtDcsuri.substring(start, end);
    wtargs.push('DCS.dcsuri');
    wtargs.push(dcsuri);
    }
    }
    //if order success then push HRock_System_Order_Confirmed System event parameters to page view
    /* CQ #77028  Moving page view metas to webtrend_global.jsp
    if(successFlag == '1'){
		jQuery('<meta/>', {name: 'DCSext.wtOrderId', content: wtOrderNumber}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtEvent', content: 'HRock_System_Order_Confirmed'}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtEventType', content: 'System'}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtStatusMsg', content: 'SUCCESS'}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtSuccessFlag', content: '1'}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtSLID', content: wtSLID}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtCTN', content: wtCTN}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtCartID', content: eventCheck.cartId}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtCartType', content: 'eCommerce'}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtCartState', content: 'O'}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtCartFulfillMethod', content: wtCartFulfillMethod}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtStorePickupDetails', content: wtStorePickupDetails}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtPostPaidEligFlag', content: wtOrderType}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtLeaseEligFlag', content: wtNextEligible}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtBuyFlowType', content: wtBuyFlowType}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtPaymentMethod', content: wtPaymentType}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtOfferSkuReferFlag', content: ATT.globalVars.offerSkuReferFlag()}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtNewShippingAddressFlag', content: wtNewShippingAddressFlag}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.dcsua', content: window.navigator.userAgent}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtCustType', content: 'consumer'}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtBuyFlowCode', content: ATT.globalVars.flowcode}).appendTo('head');
    }*/

        setTimeout(function() {window.dcsMultiTrack.apply(this, wtargs); }, 5000);
    }
    
    this.retrieveLoginId = function(){
        var colamCookie = (ATT.util.getCookie("colam_ctn") || "");
        var colamString = colamCookie.replace(/%3B/gi, ':').replace(/%3D/gi, ':').replace(/%40/gi, '@');
        var colamArray = colamString.split(':');
        var uidIndex = jQuery.inArray('uid', colamArray);
        var loginId = '';
        if(uidIndex > -1)
        {
            loginId = colamArray[uidIndex + 1];
        }
        return loginId;
    }
    
     jQuery("[id$='_facebook']").live('click', function() {
        var wtargs ;
		var wtCTN = '';
		var wtSLID = '';
		var wtCartState = eventCheck.wtcartstate;
		var wtCartId = eventCheck.cartId;

		var	loginId = ATT.cqWebtrend.retrieveLoginId();
		var ctnPattern = /^[0-9]*$/;

		if (loginId !== undefined && loginId != '') {
			var logintype = ctnPattern.test(loginId) ? "CTN" : "SLID";
			if (logintype === "CTN") {
				wtCTN = loginId;
			}
			else {
				wtSLID = loginId;
			}
		}

        wtargs = [
			'DCSext.wtCTN', wtCTN,
			'DCSext.wtSLID', wtSLID,
			'DCSext.wtEvent', 'HRock_Social_Media_Click',
			'DCSext.wtStatusCode', '0', 
			'DCSext.wtSuccessFlag', '1', 
			'DCSext.wtCartType', 'eCommerce', 
			'DCSext.wtCartID', wtCartId, 
			'DCSext.wtCartState', wtCartState, 
			'DCSext.wtShareMethod','Facebook Like',
			'DCSext.wtNoHit', 1
		]; 
		window.dcsMultiTrack.apply(this, wtargs);
	});

	//Web trend - capturing Additional page parameters - Defect #42634
	var v_pathName = window.location.pathname;
	var v_ufPage = false;
	if (v_pathName.indexOf('availability') !== -1 || v_pathName.indexOf('tv') !== -1 || v_pathName.indexOf('internet') !== -1 || v_pathName.indexOf('bundles') !== -1 || v_pathName.indexOf('home-phone') !== -1 || v_pathName.indexOf('u-verse') !== -1) {
		v_ufPage = true;
		jQuery('<meta/>', {name: 'DCSext.wtAppName', content: 'HROCK'}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtCustTypeSub', content: 'Residential'}).appendTo('head');
		jQuery('<meta/>', {name: 'DCSext.wtBuyFlowType', content: 'PROVIDE'}).appendTo('head');
	}
	
	if (v_pathName.indexOf('availability') !== -1) {
		jQuery('meta[name="DCSext.wtPN"]').attr('content','HRUverse Int Check Avail_Pg');
		jQuery('meta[name="DCSext.wtBuyFlowCode"]').attr('content','');
	} else if (v_pathName.indexOf('tv') !== -1) {
		jQuery('meta[name="DCSext.wtPN"]').attr('content','HRUverse UF Digital TV Landing_Pg');
	} else if (v_pathName.indexOf('internet') !== -1) {
		jQuery('meta[name="DCSext.wtPN"]').attr('content','HRUverse UF Internet Landing_Pg');
	} else if (v_pathName.indexOf('bundles') !== -1) {
		jQuery('meta[name="DCSext.wtPN"]').attr('content','HRUverse UF Bundles_Pg');
	} else if (v_pathName.indexOf('home-phone') !== -1) {
		jQuery('meta[name="DCSext.wtPN"]').attr('content','HRUverse UF Home Phone_Pg');
	} else if (v_pathName.indexOf('u-verse') !== -1) {
		jQuery('meta[name="DCSext.wtPN"]').attr('content','HRUverse UF U-verse Cart_Pg');
	}
	
}(jQuery, document);
