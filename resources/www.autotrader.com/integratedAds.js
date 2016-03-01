/**
 * Created by mlauderdale on 11/4/2014.
 */
 
(function($, window, undefined){
    "use strict";

    var integratedAd = {

        init: function() {

            this._bindEvents();
        },

        _bindEvents: function(){
            var self = this;

            // bind message event to window
            window.addEventListener("message", function(e){
                /*
                *
                * parse "autotrader.com" and make sure ad source matches
                * */
                var originIndex = e.origin.lastIndexOf("autotrader.com");
                try{
                    if(originIndex > -1){
                        var data = JSON.parse(e.data);
                        self.replaceContents(data);
                    }else{
                        return false;
                    }

                }catch(e){}
            }, false);
        },

        replaceContents: function(ad){

            var self = this;
            var destinationId = ad.id;

            /**
             * Match the id to the object passed from DFP
             * and run DOM manipulation function of choice.
             * */
            switch (destinationId) {

                // Search/hero image replacement integration case
                case 'search' : self.integrateSearch(ad);
                    break;

				// Shortcut links in find your car badge box
                case 'searchFormExampleLink' : self.integrateSearchFormShortcut(ad);
                    break;

				// Shortcut links in find your car badge box
                case 'searchShortcut' : self.integrateSearchShortcut(ad);
                    break;

                case 'styleSponsored' : self.showSponsoredStyle(ad);
                    break;

                // News and reviews featured image and label
                case 'featuredMake' : self.showFeaturedContent(ad);
                    break;

                // Add case matches to add new integration
                case 'b' : console.log('b', ad);
                    break;

                // Shortcut links on Find Car Page
                case 'searchShortcutFindCar':
                    self.showSearchShortcutFindCar(ad);
                    break;
            }
        },

        integrateSearch : function(data){

            var $hero = $('.homepage-hero');
            var $img = $hero.find('img');

            var $sponsorWrapper = data.vidUrl ? $hero.find('#hero-sponsored-wrapper') : $('#hero-sponsored-wrapper-no-video');


            var $sponsor = $sponsorWrapper.find('.hero-ia-sponsored-by');
            var $vehicle = $sponsorWrapper.find('.hero-ia-sponsored-vehicle');
            var $vehicleLink = $sponsorWrapper.find('.hero-ia-sponsored-vehicle a');
            var $search = $sponsorWrapper.find('.hero-ia-search');
            var $vidTrigger = $sponsorWrapper.find('.hero-ia-video-trigger img');

            // Insert image source
            $img.attr('src', data.imgUrl);

            // Initialize hero widget
            $hero.hero();

            // Fade from 0% to 100% opacity
            $img.fadeTo(3000, 1);

            // Insert video ad trigger image src
            $vidTrigger.attr('src', data.vidTriggerUrl);

            // Insert sponsored text
            $sponsor.empty();
            $sponsor.append(data.sponsoredBy);

            // Insert vehicle text
            $vehicle.html(data.vehicleText);
            $vehicle.attr('data-birf-cmp', 'sponsored_learnMore');
            $vehicle.attr('data-birf-log', 'component');
            $vehicle.find('a').attr('data-birf-cmp', 'sponsored_learnMore');
            $vehicle.find('a').attr('data-birf-log', 'component');
            $vehicle.find('a').attr('target','_blank');

            // Insert search link
            //$search.text('Search now');
            $search.attr('href', data.searchUrl);
            $search.attr('data-birf-cmp', 'sponsored_searchNow');
            $search.attr('data-birf-log', 'component');

            // temporary fix to unhide make/model examples
            //$('.findyourcar-example').removeClass('atcui-hidden');
            //$('.findyourcar-example').children().removeClass('atcui-hidden');

            $('#hero-sponsored-wrapper, #hero-sponsored-wrapper-no-video').append('<style>div#hero-sponsored-wrapper-no-video{max-width: 1300px;width:98%;padding:5px 1%;left: 0;margin: 0 auto;text-align: right;}</style>');

           // Insert Ad video object data
            if(data.vidUrl && data.sponsoredBy){
                $('#hero-ia-video').attr('data', data.vidUrl);
                $sponsorWrapper.css('display', 'block');
                brightcove.createExperiences();
            }
            else if(!data.vidUrl && data.sponsoredBy){
                $sponsorWrapper.css('display', 'table');
            }
        },

        buildHeroVideoUrl: function(){

        },

        integrateSearchShortcut : function(data){
            var makeHref = data.makeSrc;
            var makeLabel = data.make;
            var modelHref = data.modelSrc;
            var modelLabel = data.model;
            var makeCode = data.makeCode;
            var modelCode = data.modelCode;
            var $make = $('.findyourcar-example-make');
            var $model = $('.findyourcar-example-model');

            /*
            change the href to the subject page and change onclick to repopulate input fields then display link text and 'EX: '
            */
            $make.attr({
                'href': makeHref,
                'onclick' : "window.location(makeHref); return false;"
            }).text(makeLabel)
              .show();
            /*
            change the href to the SRP and change onclick to repopulate input fields
            */
            $model.attr({
                'href': modelHref,
                'onclick' : "window.location(makeHref); return false;"
            }).text(modelLabel)
              .show();
            /*
            *  display 'EX: ' text
            * */
            $('.findYourCar-EX').show();
        },

        integrateSearchFormShortcut : function(data){
            var makeHref = data.makeSrc;
            var makeLabel = data.make;
            var modelHref = data.modelSrc;
            var $zip = $('input[id$="userZipCode"]').val();
            var modelLabel = data.model;
            var makeCode = data.makeCode;
            var modelCode = data.modelCode;
            var impression = data.impression;
            var $make = $('#findyourcar-example-make');
            var $model = $('#findyourcar-example-model');
            //console.log("Set Example Model=" + modelLabel);

            if ( makeCode != undefined && makeCode != "" ) {
                var makeHTML = "<span class=\"findyourcar-example\" style=\"padding:3px 10px;\"><span class=\"findYourCar-EX\">Ex:&nbsp;</span><a href=\"" + makeHref + "\" class=\"findyourcar-example-make\" data-birf-cmp=\"ad_make_lnk\" data-atcbi-thirdparty-click=\"\" data-birf-log=\"component\" data-birf-clickdelay=\"false\">" + makeLabel + "</a><A HREF=\"" + impression + "\"><IMG SRC=\"" + impression + "\" BORDER=0 WIDTH=1 HEIGHT=1 ALT=\"Advertisement\"></A></span></span>";
                $make.html( makeHTML );
            }
            if ( modelCode != undefined && modelCode != "" ) {
                var modelHTML = "<span class=\"findyourcar-example\" style=\"padding:3px 10px;\"><span class=\"findYourCar-EX\">Ex:&nbsp;</span><a href=\"" + modelHref + "\" class=\"findyourcar-example-model\" data-birf-cmp=\"ad_mdl_lnk\" data-birf-log=\"component\" data-qaid=\"lnk-ad-mdl\" data-birf-clickdelay=\"false\">" + modelLabel + "</a><A HREF=\"" + impression + "\"><IMG SRC=\"" + impression + "\" BORDER=0 WIDTH=1 HEIGHT=1 ALT=\"Advertisement\"></A></span></span>";
                $model.html( modelHTML );
            }
            $('#findyourcar-example-trim').html("&nbsp;");
        },

        showFeaturedContent : function(data) {
            var src = data.imgUrl;
            var make = data.make;

            if(src) {
                var $img = $('.featured-logo');

                // Replace image source
                $img.attr('src', src);
            }

            if(make) {
                var $featText = $('.featured-label');

                // Replace html content
                $featText.html(make);
            }
        },

        showSponsoredStyle : function(data) {
            var vehicleStyle = data.vehicleStyle;

            if(vehicleStyle) {
                var $vehicleStyleImg = $('.vehicleStyle_' + vehicleStyle, top.parent.document);
                $vehicleStyleImg.css({'background':'url("' + data.imgURL + '") no-repeat',
                                     'margin-top':'-14px',
                                     'padding-top':'10px'});
            }

            var $vehicleStyleContent = $('.sponsoredContent');

            var $vehicleStyleLogo = $vehicleStyleContent.find('img', top.parent.document);
            var $vehicleStyleTextLine1 = $vehicleStyleContent.find('.sponsoredLTextLine1', top.parent.document);
            var $vehicleStyleTextLine2 = $vehicleStyleContent.find('.sponsoredTextLine2', top.parent.document);
            var $vehicleStyleSearchText = $vehicleStyleContent.find('.searchNowLink', top.parent.document);

            $vehicleStyleLogo.attr('src', data.logoURL);
            $vehicleStyleTextLine1.html(data.styleLabelLine1);
            $vehicleStyleTextLine2.html(data.styleLabelLine2);
            $vehicleStyleSearchText.html(data.searchText);

            //temp fix for position of sponsored box
            $('.sponsoredContent').css('padding', '0');
            $('.sponsoredStyleLogo').css('margin', '0 10px');
            $('.sponsoredText').css('width', 'auto');

            var logo = data.logoURL;
            var textLineOne = data.styleLabelLine1;
            var textLineTwo = data.styleLabelLine2;
            var link = data.searchURL;
            var searchText = data.searchText;
            var impression = data.impression;
            var viewTag = data.viewTag;

            $vehicleStyleContent.removeClass('atcui-hidden');

            if(!($vehicleStyleContent.length)){
                console.log('sponsored exists');
                $('#findCarBadge-styleFlyout', top.parent.document).css('height', '407px');
                $vehicleStyleImg.css({'margin-top':'-7px',
                                  'padding-top':'7px'});

                $('#findCarBadge-styleFlyout', top.parent.document).append('<span id="fordID"><div class="sponsoredContent" id="sponsoredContent" style="clear: left;width: 664px;margin-left: -30px;height: 65px;margin-top: 30px;"> \
                    <div class="sponsoredStyleLogo" style="width: 90px;float: left;padding: 10px;"> \
                    <img src="'+logo+'"></div><div class="sponsoredText" style="color: #666;width: 80%;float: left;box-sizing: border-box;padding: 13px 12px;line-height: 17px;"> \
                    <label class="sponsoredLTextLine1">'+textLineOne+'</label><br><label class="sponsoredTextLine2">'+textLineTwo+'</label><label class="sponsoredDivider"> |</label> \
                    <span class="searchNowLinkSponsored" style="color:blue;cursor:pointer">'+searchText+'</span></div></div></span> \
                    <A HREF="'+impression+'"><IMG SRC="'+impression+'" BORDER=0 WIDTH=1 HEIGHT=1 ALT="Advertisement"></A><script src="'+viewTag+'"></script>');
                $.getScript(viewTag);

            }

            $('.searchNowLinkSponsored').attr({'href': data.searchURL,
                                          'onclick': "window.open('" + data.searchURL + "', '_self')"
                                         })
                                   .text(data.searchText);
            $('.searchNowLink').attr({'href': data.searchURL,
                                          'onclick': "window.open('" + data.searchURL + "', '_self')"
                                         });

        },
        showSearchShortcutFindCar: function(data) {
            $(document).ready(function(){
            var makeHref = data.makeSrc;
            var makeLabel = data.make;
            var modelHref = data.modelSrc;
            var modelLabel = data.model;
            var makeCode = data.makeCode;
            var modelCode = data.modelCode;
            var impression = data.impression;
            var viewTag = data.viewTag;
            console.log('make - model added');

            if($('.int_model_sponsor').length == 0){
                $('#j_id_ay-searchform-col-wrapper-col1-listingsSearch-makemodelSEVO-make1').before('<div class="int_make_sponsor '+makeCode+'" style="padding:3px 10px"><span class="findYourCar-EX atcui-hidden" style="display: inline;">Ex: </span><a href="'+makeHref+'">'+makeLabel+'</a><A HREF="' + impression + '"><IMG SRC="' + impression + '" BORDER=0 WIDTH=1 HEIGHT=1 ALT="Advertisement"></A></div>');
                $('#j_id_ay-searchform-col-wrapper-col1-listingsSearch-makemodelSEVO-model1').before('<div class="int_model_sponsor '+modelCode+'" style="padding:3px 10px"><span class="findYourCar-EX atcui-hidden" style="display: inline;">Ex: </span><a href="'+modelHref+'">'+modelLabel+'</a><A HREF="' + impression + '"><IMG SRC="' + impression + '" BORDER=0 WIDTH=1 HEIGHT=1 ALT="Advertisement"></A></div>');
                $('#j_id_ay-searchform-col-wrapper-col1-listingsSearch-makemodelSEVO-trim1').before('<div class="int_trim_sponsor '+modelCode+'" style="height:20px"></div>');
            }
                //setInterval(function() {
                    $(document).on('change', '#j_id_ay-searchform-col-wrapper-col1-listingsSearch-search-type-listingType, #j_id_ay-searchform-col-wrapper-col1-listingsSearch-bodystyle-j_id_dn-vehicleStyleCodes, #makemodel select, #makemodelSEVO select', function(){
                        console.log('changed');
                        var makeExists = $('.int_make_sponsor').length;
                        var modelExists = $('.int_model_sponsor').length;
                        console.log('make '+makeExists);
                        console.log('model '+modelExists);

                        setTimeout(function(){
                        console.log('added');
                            if($('.int_make_sponsor').length == 0){
                                $('#j_id_ay-searchform-col-wrapper-col1-listingsSearch-makemodelSEVO-make1').before('<div class="int_make_sponsor '+makeCode+'" style="padding:3px 10px"><span class="findYourCar-EX atcui-hidden" style="display: inline;">Ex: </span><a href="'+makeHref+'">'+makeLabel+'</a><A HREF="' + impression + '"><IMG SRC="' + impression + '" BORDER=0 WIDTH=1 HEIGHT=1 ALT="Advertisement"></A></div>');
                            }
                            if($('.int_model_sponsor').length == 0){
                                $('#j_id_ay-searchform-col-wrapper-col1-listingsSearch-makemodelSEVO-model1').before('<div class="int_model_sponsor '+modelCode+'" style="padding:3px 10px"><span class="findYourCar-EX atcui-hidden" style="display: inline;">Ex: </span><a href="'+modelHref+'">'+modelLabel+'</a><A HREF="' + impression + '"><IMG SRC="' + impression + '" BORDER=0 WIDTH=1 HEIGHT=1 ALT="Advertisement"></A></div>');
                            }
                            if($('.int_trim_sponsor').length == 0){
                                $('#j_id_ay-searchform-col-wrapper-col1-listingsSearch-makemodelSEVO-trim1').before('<div class="int_trim_sponsor '+modelCode+'" style="height:20px"></div>');
                            }
                        },500);

                        });

            })

       }
    }

    // init self
    integratedAd.init();

})(jQuery, window);

function refreshIntegratedAds() {
	googletag.pubads().refresh([atc.ads._definedAdSlots["threeByThreeIntegratedAd"],atc.ads._definedAdSlots["twoByTwoIntegratedAd"]])
}
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-makemodelSEVO-make1-selectOneMenu',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-makemodelSEVO-model1-selectOneMenu',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-search-type-listingType-0',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-search-type-listingType-1',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-search-type-listingType-2',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-bodystyle-j_id_dq-vehicleStyleCodes-0',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-bodystyle-j_id_dq-vehicleStyleCodes-1',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-bodystyle-j_id_dq-vehicleStyleCodes-2',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-bodystyle-j_id_dq-vehicleStyleCodes-3',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-bodystyle-j_id_dq-vehicleStyleCodes-4',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-bodystyle-j_id_dq-vehicleStyleCodes-5',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-bodystyle-j_id_dq-vehicleStyleCodes-6',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-bodystyle-j_id_dq-vehicleStyleCodes-7',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-bodystyle-j_id_dq-vehicleStyleCodes-8',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-bodystyle-j_id_dq-vehicleStyleCodes-9',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-bodystyle-j_id_dq-vehicleStyleCodes-10',refreshIntegratedAds);
$('body').on('change','#j_id_ay-searchform-col-wrapper-col1-listingsSearch-bodystyle-j_id_dq-vehicleStyleCodes-11',refreshIntegratedAds);


/**************************************
 DFP-Side Template
 **************************************/
/*
 (function(window, undefined) {

     window.postMessage(JSON.stringify({
         "id": "hero",
         "imgUrl": "http://daem4901.autotrader.com:4503/content/dam/autotrader/homepage/hero/HP_Hero_UnSold_150k.jpg"
     }),window.location.href);

 })(window);
 */
