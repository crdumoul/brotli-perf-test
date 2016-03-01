var zeus = zeus || {};

var zeusLoadMore = {

    loadMoreSettings: '',

    drupalSettings: function() {

        if (zeusLoadMore.loadMoreSettings === '') {
            var load_more_settings = {};
            if(typeof Drupal.settings.zeus_utils_load_more !== 'undefined') {
              load_more_settings = {
                'type': Drupal.settings.zeus_utils_load_more.type, // channel pages or content pages
                'curChannel': Drupal.settings.zeus_utils_load_more.channel, // section or channel
                'limit': Drupal.settings.zeus_utils_load_more.limit, // limit to no. of items to load at a time
                'loadMoreOnScroll': Drupal.settings.zeus_utils_load_more.iscroll, // Flag for infinite scroll
                'image_lazyload_enabled': Drupal.settings.zeus_utils_load_more.image_lazyload_enabled, // Flag image_lazyload_enabled
                'image_pinit_enabled' : Drupal.settings.zeus_load_more.image_pinit_enabled, //image_pinit enabled
              };
            }
            // For content pages add extra information
            if (typeof Drupal.settings.zeus_utils_content_load_more !== 'undefined') {
                load_more_settings.initialNid = Drupal.settings.zeus_utils_content_load_more.nid;
                load_more_settings.nodeType = Drupal.settings.zeus_utils_content_load_more.nodeType;
                load_more_settings.initialUrl = Drupal.settings.zeus_utils_content_load_more.url;
                load_more_settings.initialTitle = Drupal.settings.zeus_utils_content_load_more.title; //node title
                load_more_settings.initialHTitle = Drupal.settings.zeus_utils_content_load_more.htitle; //node head title
                load_more_settings.dataLayerName = Drupal.settings.zeus_utils_content_load_more.dataLayerName; //for dtm
                load_more_settings.siteName = Drupal.settings.zeus_utils_content_load_more.siteName; // site name
                load_more_settings.right_rail_ad = Drupal.settings.zeus_utils_content_load_more.right_rail_ad;
                load_more_settings.right_rail_house_ad = Drupal.settings.zeus_utils_content_load_more.right_rail_house_ad;
                load_more_settings.separator_ad = Drupal.settings.zeus_utils_content_load_more.separator_ad;
                load_more_settings.top_leaderboard_ad = Drupal.settings.zeus_utils_content_load_more.top_leaderboard_ad;
                load_more_settings.forceOBRefresh = Drupal.settings.zeus_utils_content_load_more.force_ob_refresh; //force outbrain refresh
                load_more_settings.enableStickySb = Drupal.settings.zeus_utils_content_load_more.enableStickySb; // enable sticky sharebar
                load_more_settings.enableStickyRR = Drupal.settings.zeus_utils_content_load_more.enableStickyRR; // enable sticky right rail
                load_more_settings.stickyRRDuration = Drupal.settings.zeus_utils_content_load_more.stickyRRDuration; // duration for sticky right rail
                load_more_settings.comments = Drupal.settings.zeus_utils_content_load_more.comments; // Commenting system used on Site
                load_more_settings.houseAdRR = Drupal.settings.zeus_utils_content_load_more.houseAdRR; // Housead on Right rail
            }
            // disqus not available on all pages with load more
            if (typeof Drupal.settings.disqus !== 'undefined' && typeof Drupal.settings.disqus.on_demand !== 'undefined') {
                load_more_settings['disqusOnDemand'] = Drupal.settings.disqus.on_demand;
            } else {
                load_more_settings['disqusOnDemand'] = 0;
            }
            if (typeof Drupal.settings.facebook_comments_box !== 'undefined') {
                load_more_settings['fcb_on_demand'] = Drupal.settings.facebook_comments_box.on_demand || 0;
                load_more_settings['fb_app_id'] = Drupal.settings.facebook_comments_box.app_id;
            }

            zeusLoadMore.loadMoreSettings = load_more_settings;
        }

        return zeusLoadMore.loadMoreSettings;
    },

    // Depending upon the load more type (page type) send to respective handlers
    iScrollLoadMoreHandler: function(type) {

        if (type === 'zeus_smartqueue') {
            zeusLoadMore.loadMoreHandlerZeusSmartqueue();
        } else if (type === 'zeus_content') {
            zeusLoadMore.loadMoreHandlerContent();

        }
    },

    // Depending upon the load more type (page type) get configurations
    iScrollConfigurations: function(type) {

        var configs = {};

        if (type === 'zeus_smartqueue') {
            //@todo: these can be set through drupal settings if they change per site
            configs = { 'parentElem' : '.channel_content_well',
                        'targetElem' : '.infinite-wrap',
                        'offset' : 0.30,
                    };
        } else if (type === 'zeus_content') {
            configs = { 'parentElem' : '#itemsContainer',
                        'targetElem' : '.scroll-item',
                        'offset' : 0.30,
                    };
        }
        return configs;
    },

    iScrollHandler: function () {

        var zeusLoadMoreSettings = zeusLoadMore.drupalSettings();
        var type = zeusLoadMoreSettings['type'];
        var bounds = {};
        var viewport = {};
        // Get configurations for the page type (ie. landing pages or content pages)
        var configs = zeusLoadMore.iScrollConfigurations(type);
        var parentElem = configs.parentElem; // the parent for target element
        var targetElem = configs.targetElem; // this refers to child element within parent

        var offset = configs.offset;
        var itemsContainer = jQuery(parentElem);
        viewport.top = jQuery(window).scrollTop();
        viewport.bottom = viewport.top + jQuery(window).height();

        // get last loaded item
        var lastLoadedItem = itemsContainer.find(targetElem+':last-child');
        if (!lastLoadedItem.length) {
            lastLoadedItem = itemsContainer;
        }
        // Calculate scrolling direction
        if (viewport.top > window.lastScrollTop) {
            window.scrollDir = 'down';
        } else {
            window.scrollDir = 'up';
        }

        // If scrolling down load more content
        if (window.scrollDir === 'down' && window.flagtoload) {
            zeusLoadMore.loadNextOnScroll(lastLoadedItem, viewport.bottom, offset, type);
        }
        if (type === 'zeus_content' && zeusLoadMore.updateScroll === true) {
            // Content pages have extra tasks to update urls, refresh ads etc.
            zeusLoadMore.updatesOnScroll(targetElem, offset);
        }
    },

    // load next item
    loadNextOnScroll: function (lastLoadedItem, vBottom, offset, type) {

        var bounds = {};

        var offsetB1 = (1- offset) * jQuery(window).height();
        var offsetB2 = (offset) * lastLoadedItem.height();
        var offsetB =0;

        if (type == 'zeus_content') {
            // Just to take care of load timing when previous article is small
            if (offsetB2 > offsetB1) {
                offsetB = offsetB2;
            } else {
                offsetB = offsetB1;
            }
        } else {
            offsetB =  offset * jQuery(window).height();
        }
        bounds.top = lastLoadedItem.offset().top;
        bounds.bottom = bounds.top + lastLoadedItem.outerHeight();

        // Once last article is about to reach bottom, load more items
        if ((bounds.bottom - offsetB <= vBottom)) {

            window.flagtoload = false; // not to run another load more until the first one has finished
            zeusLoadMore.iScrollLoadMoreHandler(type);
        }
    },

    // handles the updates on infinite scroll
    // url refresh when next/prev article node come into view
    // also triggers load more when last content item is reached
    updatesOnScroll: function(targetElem, offset) {

        var next_url = '';
        var next_id = '';
        var bounds = {};
        var viewport = {};
        viewport.top = jQuery(window).scrollTop();
        viewport.bottom = viewport.top + jQuery(window).height();
        var host = window.location.protocol+'//'+window.location.host;
        var offsetT = offset * jQuery(window).height();
        var offsetB = (1 - offset) * jQuery(window).height();
        var zeusLoadMoreSettings = zeusLoadMore.drupalSettings();
        var dataLayerName = zeusLoadMoreSettings['dataLayerName'];
        var siteName = zeusLoadMoreSettings['siteName'];
        var itemsContainer = zeusLoadMore.itemsContainer;
        var lastLoadedItem = itemsContainer.find('.scroll-item:last-child');
        var lastLoadedItemId = lastLoadedItem.attr('id').substring(4);
        var dfp = zeusLoadMore.dfp;
        var itemCount = '';

        // take into account all content items as soon as scroll direction change
        if (window.scrollDir !== window.lastScrollDir) {
            jQuery(targetElem).removeClass('bound');
        }
        // take into account all content items as soon as scroll direction change
        if (window.scrollDir !== window.lastScrollDir) {
            jQuery('.scroll-item').removeClass('bound');
        }
        window.lastScrollTop = viewport.top;
        window.lastScrollDir = window.scrollDir;

        // check what content item is in view, update the url corresponding to it
        jQuery(targetElem+':not(.bound) .hero-article').each(function() {

            bounds.top = jQuery(this).offset().top;
            bounds.bottom = bounds.top + jQuery(this).outerHeight();
            if ((bounds.top + offsetT <= viewport.bottom) && (bounds.bottom - offsetB >= viewport.top)) {
                next_id = jQuery(this).closest(targetElem).attr('id').substring(4);

                var activeItem  = jQuery(targetElem+'.active').attr('id');
                var activeItemId = '';
                if (typeof activeItem !== 'undefined') {
                    activeItemId = activeItem.substring(4);
                }

                // Do not run url change, ad refresh if we are still on the active item
                if (activeItemId !== next_id) {

                    jQuery(targetElem).removeClass('active');
                    jQuery(this).closest(targetElem).addClass('bound active');

                    // change sponsored class on body
                    if (zeusLoadMore.sponsored[next_id]) {
                        jQuery('body').addClass('sponsored');
                    } else {
                        jQuery('body').removeClass('sponsored');
                    }

                    next_url = jQuery('#nav-item-'+next_id).attr('href');
                    next_url = host + next_url;
                    // Update the url in the address
                    window.history.pushState({},'', next_url);
                    // refresh interstitial ad
                    var el = jQuery('#item'+next_id);
                    if (el.hasClass('active')) {

                            itemCount = el.attr('class').match(/\item-(\d+)\b/)[1];
                    }

                    dfp = dfp[next_id];
                    // Refresh or load new interstitial ad slot
                    zeusLoadMore.refreshInterstitialAd(itemCount, dfp);
                    // Refresh Ads on both scroll up and down
                    if (typeof itemCount !== 'undefined') {
                        if (window.scrollDir === 'up' || (window.scrollDir === 'down' && lastLoadedItemId !== next_id)) {
                            // ROL-172 increment page view counter to dfp targeting
                            if (jQuery.cookie("zeus_ads_pv") != null) {
                                var page_no = parseInt(jQuery.cookie("zeus_ads_pv")) + 1;
                                jQuery.cookie("zeus_ads_pv", page_no, {path: "/"});
                            }
                            //refresh ads on content page on scroll up/down
                            zeusLoadMore.refreshAds(itemCount);
                        }
                    }
                    //------------------------------------------
                    if (typeof jQuery.data(el[0], 'bindsticky') !== 'undefined') {
                        zeusLoadMore.stickySharebarVerticalHandler(next_id);
                        zeusLoadMore.stickyRightRailHandler(next_id);
                        jQuery.removeData(el[0], 'bindsticky');
                    }

                    // Retrigger DTM for the active content, refresh the pageviews
                    window[dataLayerName] = zeusLoadMore.dtm[next_id];
                    if (typeof _satellite !== 'undefined') {
                        _satellite.pageBottom();
                        _satellite.track('callInfiniteScroll');
                    }
                    // Change page title
                    if (typeof zeusLoadMore.pageTitle[next_id] != 'undefined') {
                        document.title = zeusLoadMore.headTitle[next_id];
                    }

                    // sticky sharebar
                    if (zeusLoadMoreSettings['enableStickySb']) {
                        zeusLoadMore.stickySharebarHorizontalHandler(next_id);
                    }
                }
            }
        });
    },

    // Load more handler for channel/homepages
    loadMoreHandlerZeusSmartqueue: function() {

        // load the settings
        var zeusLoadMoreSettings = zeusLoadMore.drupalSettings();
        var type = zeusLoadMoreSettings['type'];
        var curChannel = zeusLoadMoreSettings['curChannel'];
        var limit = zeusLoadMoreSettings['limit'];
        var loadMoreOnScroll = zeusLoadMoreSettings['loadMoreOnScroll'];
        var channelContentWell = jQuery(".channel_content_well");
        var infiniteWrap = '';
        var image_lazyload_enabled = Drupal.settings.zeus_load_more.image_lazyload_enabled;

        // initially set the load more to continue until the content retrieved is exhausted

        if (loadMoreOnScroll && window.showLoadMore) {
            jQuery('#content').append('<div class="loading-more"></div>');
        }
        var ajaxUrl = window.location.protocol + '//' + window.location.host+'/'+type+'/ajax/'+curChannel+'/'+window.curPage+'/'+limit;
        jQuery.post(ajaxUrl, function( data ) {
            var id = window.curPage + 1;
            channelContentWell.append("<div id='infinite-wrap-"+id+"' class='infinite-wrap'  ></div>");
            infiniteWrap = jQuery("#infinite-wrap-"+id);

            // Add separator ads if infinite scroll is enabled
            if (loadMoreOnScroll && window.showLoadMore) {
                var separatorAdDiv = "<div class='separator-ad' id='separator-ad-"+ id +"'></div>";
                infiniteWrap.append(separatorAdDiv);

                var dfp = zeusLoadMore.dfp;
                var adCont = jQuery('#separator-ad-'+id);
                //DFP
                // Implement GPT tags for newly added content
                if (!jQuery.isEmptyObject(dfp)) {
                    zeusLoadMore.implementGPTTags(id, dfp, 'separator', adCont);
                    window.nextSlotId++;
                }
            }

            infiniteWrap.append(jQuery(data));
            //Channel Image Lazyload
            if(typeof image_lazyload_enabled !== 'undefined' && image_lazyload_enabled == 1) {
              infiniteWrap.find("img[data-src]").lazyloader({distance: 100, icon: "" });
            }
            if (window.curPage >= 1) {
              if (jQuery('.channel_content_ads').length > 0) {
                jQuery(".channel_content_ads").insertAfter(".pager-load-more.page_"+window.curPage);
                 googletag.cmd.push(function() {
                  // Infinite scroll requires SRA
                  googletag.pubads().enableSingleRequest();
                  slot1 = googletag.slots['300x250_advertisement_bottom_channel'];
                  slot2 = googletag.slots['300x250_advertisement_bottom_channel_2'];
                  try {
                	  yieldbot.setSlotTargeting("dfp-ad-300x250_advertisement_bottom_channel", slot1);
                  }catch(e){}
                  try {
                	  yieldbot.setSlotTargeting("dfp-ad-300x250_advertisement_bottom_channel_2", slot2);
                  }catch(e){}
                  googletag.pubads().refresh([slot1, slot2]);
                });
              }
            }
            jQuery(".pager-load-more.page_"+window.curPage).remove();
            window.curPage++;
            if (!loadMoreOnScroll) {
                jQuery(".pager-load-more.page_"+window.curPage).click(function(event) {
                  event.preventDefault();
                  zeusLoadMore.loadMoreHandlerZeusSmartqueue();
                });
            } else {
                jQuery('.pager-load-more li.pager-next').hide();

                // Hide the loading image when load more is complete
                jQuery('.loading-more').remove();
                window.flagtoload = true; // ready to load more on scroll
            }
            if (jQuery(data).length <= limit) {
                window.showLoadMore = false;
                jQuery(".pager-load-more.page_"+window.curPage).remove();
            }
            // PV-549 add DTM direct load call for HP/CP and tags
            if (typeof _satellite !== 'undefined') {
                _satellite.track('callInfiniteScroll');
            }
        });
    },

    // Load more handler for content pages (article pages)
    loadMoreHandlerContent: function(overrideLimit) {

        var zeusLoadMoreSettings = zeusLoadMore.drupalSettings();
        var disqusOnDemand = zeusLoadMoreSettings["disqusOnDemand"];
        var limit = zeusLoadMoreSettings["limit"];
        var channel = zeusLoadMoreSettings['curChannel'];
        var initialNid = zeusLoadMoreSettings['initialNid'];
        var forceOBRefresh = zeusLoadMoreSettings['forceOBRefresh'];
        var itemsContainer = zeusLoadMore.itemsContainer;
        var image_lazyload_enabled = Drupal.settings.zeus_load_more.image_lazyload_enabled;
        var image_pinit_enabled = Drupal.settings.zeus_load_more.image_pinit_enabled;
        var winWidth = jQuery(window).width();
        var houseAdRR = zeusLoadMoreSettings['houseAdRR'];

        if (typeof overrideLimit !== 'undefined') {
            limit = overrideLimit;
        }
        var scrollNavList = jQuery('#scroll-nav-list');
        var last_loaded_nav_item = scrollNavList.find('li.loaded').last();
        // next items to load (in case we want to load more than 1 at a time)
        // but right now it is just 1
        var next_item_all = last_loaded_nav_item.nextAll('.scroll-nav-item:lt('+limit+')');
        var nids_str = '';
        var next_nid = '';
        // loop through and get a concatenated string of node ids for the ajax call
        next_item_all.each(function(index) {
            next_nid = jQuery(this).find('a').attr('id').substring(9);
            nids_str += next_nid + "-";
        });
        if (nids_str) {
            jQuery('#content .loading-more').show();
            var host = window.location.protocol+'//'+window.location.host;
            // ajax call to load more
            jQuery.getJSON('/load-more-content/ajax/'+nids_str, function(json, status) {

                if (status === "success") {
                    var response = jQuery(json.data);
                    itemsContainer.append(response);
                    var currItem = jQuery("#item"+next_nid);


                    //Lazyload image in article
                    if(typeof image_lazyload_enabled !== 'undefined' && image_lazyload_enabled == 1) {
                      currItem.find("img[data-src]").lazyloader({distance: 100, icon: "" });
                    }
                    //Add pinit functionality if image_pinit is enabled
                    if(typeof image_pinit_enabled !== 'undefined' && image_pinit_enabled == 1) {
                      zeusLoadMore.loadMoreAddPinit(json.title[next_nid], json.url[next_nid]);
                    }
                    // workaround to keep scripts on page intact
                    jQuery('datascript').each(function() {
                        var code = jQuery(this).text();
                        if (typeof text == 'undefined' || text === '') {
                            return true;
                        }
                        var current = this;
                        var parent = current.parentNode;
                        var s = document.createElement('script');
                        s.type = 'text/javascript';
                        try {
                            s.appendChild(document.createTextNode(code));
                            parent.insertBefore(s, current); //jquery append removes script tags
                        } catch (e) {
                            s.text = code;
                            parent.insertBefore(s, current);
                        }
                    });
                    jQuery('datascript').remove();

                    // For Slideshows
                    var nodeType = json.nodeType;
                    var extraData = json.extraData;
                    itemsContainer.find('.slideshow-nojs').remove();

                    // Set up the comment count links for iscroll
                   // jQuery('.comment-count-wrap a.show-comments').addClass('show-comments-section');
                    jQuery('.content-wrapper a.show-comments').addClass('show-comments-section');

                    // Disqus
                    // Right now multiple disqus works only when disqus on demand is true
                    // ie. when we load comments on click of button 'show comments'
                    next_item_all.each(function(index) {

                        var node_id = jQuery(this).find('a').attr('id').substring(9);
                        
                        // For Slideshows
                        if (nodeType[node_id] === 'slideshow') {
                            // build the slideshow
                            getSlideshow(node_id, extraData[node_id]);
                        }


                        // Remove newsletter and dfp tag elements in the html
                        jQuery(this).addClass('loaded');
                        var newItem = itemsContainer.find('#item'+node_id);
                        newItem.find(' .dfp-tag-wrapper').remove();
                        // keep only one nls subscription module on the whole page, remove all others
                        newItem.find('.newsletter-container').remove('');

                        var node_url = host+jQuery(this).find('a').attr('href');
                        // Assuming it is either disqus or fb comments on the page, not both
                        if (zeusLoadMoreSettings["comments"] === 'facebook' ) {
                            // facebook comments
                            // @todo: click.zeusFCB got bound after we run our iscroll initialize code
                            // there should be better way to remove the existing show comments click event of first article
                            jQuery('.show-comments').unbind('click.zeusFCB');
                            FB.XFBML.parse(newItem.get(0));
                            zeusLoadMore.getFacebookCommentsCount(node_url, node_id);

                        } else if (disqusOnDemand) {
                            // initialize disqus for newly loaded content items
                            zeusLoadMore.disqusHandlerAjax(node_id, node_url);
                            if (typeof DISQUSWIDGETS !== 'undefined') {
                                DISQUSWIDGETS.getCount();
                            }
                        }
                    });


                    var dfp = json.dfp; //Ads
                    var dtm = json.dtm; // Analytics
                    var pageTitle = json.title; // @todo: Actually referring to node title, change var name
                    var headTitle = json.headTitle; // Head title
                    var url = json.url; // Node URls
                    var sponsored = json.sponsored;

                    itemsContainer.find('.scroll-item:not(.gpt-bound)').addClass('gpt-bound').each(function() {
                        var id = jQuery(this).attr('id').substring(4);
                        // Add item-1, item-2, ... class to the scroll-item div
                        jQuery(this).addClass('item-'+zeusLoadMore.itemCount);
                        zeusLoadMore.itemCount++;

                        // Page Title
                        if (!jQuery.isEmptyObject(pageTitle)) {
                            var pt = jQuery('<textarea/>').html(pageTitle[id]).val();
                            zeusLoadMore.pageTitle[id] = pt;
                        }
                        // Head Title
                        if (!jQuery.isEmptyObject(headTitle)) {
                            var ht = jQuery('<textarea/>').html(headTitle[id]).val();
                            zeusLoadMore.headTitle[id] = ht;
                        }
                        // URL
                         if (!jQuery.isEmptyObject(url)) {
                            zeusLoadMore.url[id] = url[id];
                        }
                        // Sponsored
                         if (!jQuery.isEmptyObject(sponsored)) {
                            zeusLoadMore.sponsored[id] = sponsored[id];
                        }

                        //DFP
                        // Implement GPT tags for newly added content
                        var adCont = itemsContainer.find(' #ad-'+id);
                        var rr = itemsContainer.find(' #item'+id+' .right_rail .inner');

                        if (!jQuery.isEmptyObject(dfp)) {

                            // ROL-172 increment page view counter to dfp targeting
                            if (jQuery.cookie("zeus_ads_pv") != null) {
                                var page_no = parseInt(jQuery.cookie("zeus_ads_pv")) + 1;
                                jQuery.cookie("zeus_ads_pv", page_no, {path: "/"});
                            }

                            // @todo: if infinite scroll enabled pages have 2 right rail ads in future
                            // that has also to be added here

                            // Replace the current correlator with a new correlator.
                            googletag.pubads().updateCorrelator();
                            zeusLoadMore.implementGPTTags(id, dfp[id], 'separator', adCont);
                            zeusLoadMore.implementGPTTags(id, dfp[id], 'right_rail', rr);
                            // Note: we assume here that rr house ad is positioned just after the rr ad
                            // If pos changes, we have to make change here
                            // check if it is setup for site and also if it is added on the page
                            if (houseAdRR == 1) {
                                var rrAd = rr.find('.dfp-tag-rr-ad');
                                // We do not call rr house ad if 300x250 ad div not available
                                // as we would not know where to add it
                                if (rrAd.length) {
                                    zeusLoadMore.implementGPTTags(id, dfp[id], 'right_rail_house_ad', rrAd);
                                }
                            }
                            window.nextSlotId++;
                            zeusLoadMore.dfp[id] = dfp[id];
                        }
                        //dtm analytics (page view)
                        if (!jQuery.isEmptyObject(dtm)) {
                            var dtmdata = dtm[id];
                            dtmdata = jQuery.parseJSON(dtmdata);
                            // Add to the DTM list the dataLayer variables for the newly loaded node
                            // this will be used when the content gets in view
                            zeusLoadMore.dtm[id] = dtmdata;
                        }
                    });

                    // Outbrain ----------------------------
                    var w = window.innerWidth;
                    var ob_data_src  = zeusLoadMore.url[next_nid];
                    currItem.find(' div.OUTBRAIN').each(function() {
                        jQuery(this).attr('data-src', ob_data_src);
                        // Assuming there is no right rail slideshow widget
                        if (nodeType[next_nid] === 'slideshow') {
                            // swap widget id for mobile
                            if (w <= 699) {
                                jQuery(this).attr('data-widget-id', outbrain_slideshow_bottom_mobile); // MB_4
                            } else {
                                jQuery(this).attr('data-widget-id', outbrain_slideshow_bottom); // AR_4
                            }
                        } else if (nodeType[next_nid] === 'article') {
                            // the desktop widget id for article (as compared to slideshow) need not be corrected
                            // as it is set as default
                            // swap widget id for mobile
                            if (w <= 699 && jQuery(this).attr('data-widget-id') === outbrain_article_bottom) {
                                jQuery(this).attr('data-widget-id', outbrain_article_bottom_mobile); // MB_3
                            }
                        }
                    });
                    //---------------------------------------

                    //Subscription miniform on sharebar
                    currItem.find('form[name="uofGenericForm"]').attr('id','subscForm'+next_nid);

                    // Sharebar
                    currItem.find(' .sharebar.horizontal li:visible:first').addClass("first-item");
                    currItem.find(' .sharebar.horizontal li:visible:last').addClass("last-item");
                    if (zeusLoadMoreSettings['enableStickySb']) {
                        setTimeout(function() {
                            zeusLoadMore.stickySharebarVerticalHandler(next_nid);
                        }, 3000);
                    }

                    // Add more items to navigation list if we are about to reach bottom
                    var unloadedItemsNum = scrollNavList.find('li:not(.loaded)').length;
                    if (zeusLoadMore.noMoreData === 0 && unloadedItemsNum < 10 ) {
                        // make an ajax call to add more to navigation list
                        // ajax call to load more
                        jQuery.getJSON('/load-more-nav-items/ajax/' + initialNid + '/' + channel +'/' + zeusLoadMore.navPage, function(navListJson, status) {
                            if (status === "success") {
                                if (jQuery(navListJson.data).length === 0) {
                                    zeusLoadMore.noMoreData = 1;
                                    console.log('zeus load more: no more data');
                                } else {
                                    scrollNavList.append(navListJson.data);
                                    // Increment the counter
                                    zeusLoadMore.navPage++;
                                }
                            }
                        });
                    }
                    //brightcove player
                    if (typeof brightcove !== 'undefined') {
                        brightcove.createExperiencesPostLoad();
                    }

                    // For embedded tweets as per https://dev.twitter.com/web/javascript/initialization
                    if (typeof twttr === 'undefined') {
                        jQuery.getScript('https://platform.twitter.com/widgets.js');

                    } else {
                        // if the script is already, force twitter to scan for
                        // embedded twitter code in the newly added content
                        twttr.widgets.load(
                            document.getElementById("item"+next_nid)
                        );
                    }


                    // Hide the loading image when load more is complete
                    jQuery('.loading-more').hide();
                    // Add widget to dynamically added OB divs
                    // force OB to search for newly added OB divs so widget appear on all content items when scrolling down
                    if (typeof OBR != 'undefined') {
                        OBR.extern.researchWidget();
                        if (zeusLoadMoreSettings['enableStickyRR'] && winWidth >= zeus.tabletBreak ) {
                            // a fix for 0 width and 0 height on all sticky .right_rail after calling OBR.extern.researchWidget
                            jQuery('.right_rail').each( function() {
                                var inr = jQuery(this).find('.inner');
                                jQuery(this).css({'width': inr.css('width'), 'height' : inr.css('height')});
                            });
                        }
                    }

                    // sticky right rail
                    if (zeusLoadMoreSettings['enableStickyRR'] && winWidth >= zeus.tabletBreak ) {
                        setTimeout(function() {
                            zeusLoadMore.stickyRightRailHandler(next_nid);
                        }, 3000);
                    }
                    window.flagtoload = true; // ready to load more on scroll
                 }
            });

        }
    },

    // handles reset of disqus for each node on load more
    disqusReset: function(id, title, url) {

        if (typeof DISQUS !== "undefined") {
            DISQUS.reset(
            {
            config: function ()
            {
                this.page.identifier = id;
                this.page.url = url;
                this.page.title = title;
                //this.language = "en";
            },
            reload: true
            });
        }
    },

    // adds click event to the newly added disqus block in ajax callback
    disqusHandlerAjax: function(id, url) {

        // add show comments button to newly loaded content (and first content item too)
        var bottom = jQuery('#item'+id + ' .bottom');
        bottom.append('<button class="show-comments new">Show comments</button>');

        // add disqus reset handling click event to disqus buttons
        jQuery('.bottom .show-comments.new:not(.bound)').addClass('bound').bind("click",function() {
            jQuery('.bottom .show-comments').removeClass('hidden');
            // IMP: Update the url in the address
            // this should save us from disqus identifier conflict issue
            window.history.pushState({},'', url);
            // on click remove the disqus_thread from old place and add to new place
            jQuery('#disqus_thread').remove();
            jQuery('<div id="disqus_thread"></div>').insertAfter(this);
            jQuery(this).addClass('hidden');
            // Reset disqus for this item
            title = zeusLoadMore.pageTitle[id];
            zeusLoadMore.disqusReset('node/'+id, title, url);
            // Display show comments button back on all other content items
            // apart from the one that is clicked
            jQuery('.bottom button.show-comments:not(.hidden)').show();
            jQuery('#disqus_thread').focus();
        });
    },

    // initial processing for disqus to be ready for multiple disqus on a page
    initializeDisqus: function() {
        // remove the existing show comments of first article
        jQuery('.show-comments').unbind('click.zeusDisqus');
        jQuery('.bottom .show-comments').remove();
        jQuery('#disqus_thread').hide();

        var disqus_loaded = false;
        function getDisqusComments() {
          if (disqus_loaded) return;
          // Make the AJAX call to get the Disqus comments.
          jQuery.ajax({
            type: 'GET',
            url: '//' + disqus_shortname + '.disqus.com/embed.js',
            dataType: 'script',
            cache: false
          });
          disqus_loaded = true;
        }
        // For multiple disqus on a page, load the embed.js on page load itself
        getDisqusComments();

        //take care of dynamically added disqus blocks
        jQuery('#content').on('click', '.bottom .show-comments', function() {
            jQuery('#disqus_thread').show();
            jQuery(this).fadeOut();
        });
        // Add the disqus reset functionality for initial content
        // Others are handled in load more ajax callback
        var zeusLoadMoreSettings = zeusLoadMore.drupalSettings();
        var initialNid = zeusLoadMoreSettings['initialNid'];
        zeusLoadMore.disqusHandlerAjax(initialNid, zeusLoadMore.url[initialNid]);

        // Comments count link
        jQuery('#content').on('click', '.show-comments-section', function(event) {
            event.preventDefault();
            var bottom = jQuery(this).closest('.scroll-item').find('.bottom');
            // Run the disqus reset and click event of show comments button
            bottom.find('.show-comments').click();
            // Do not run normal updates when we scroll to disqus block in code
            zeusLoadMore.updateScroll = false;
            //Scroll to the disqus block we just loaded.
            jQuery('html, body').animate({
              scrollTop: bottom.offset().top
          }, 800);
            // Disqus takes some time load the comments section
            // after reset. Resume normal url updates after some delay
            setTimeout(function() {
                zeusLoadMore.updateScroll = true;
            }, 1500);
        });
    },

    // initial processing for facebook comments
    initializeFbComments: function() {

        var zeusLoadMoreSettings = zeusLoadMore.drupalSettings();
        var fb_app_id = zeusLoadMoreSettings['fb_app_id'];
        // remove the existing show comments of first article
        jQuery('.show-comments').unbind('click.zeusFCB');
        zeusLoadMore.getFacebookCommentsBox(fb_app_id);

        jQuery('#content').on('click', '.bottom .show-comments', function() {

            var item = jQuery(this).closest('.scroll-item');

            jQuery('.facebook-comments-box').hide();
            jQuery('.bottom .show-comments').show();
            item.find('.bottom .show-comments').fadeOut();
            item.find('.bottom .facebook-comments-box').show();

            // fix for: facebook comments and sticky sharebar overlap after comments load
            var nextItem = jQuery(item).next().next();
            if (nextItem.length && nextItem.hasClass('scroll-item')) {
                var next_id = nextItem.attr('id');
                //var next_nid = next_id.substring(4);
                jQuery(window).unbind("scroll.sharebar#"+next_id);
                jQuery(window).unbind("scroll.rightrail#"+next_id);
                jQuery.data(nextItem[0], 'bindsticky', 1);
                //zeusLoadMore.stickySharebarVerticalHandler(next_nid);
                //zeusLoadMore.stickyRightRailHandler(next_nid);
            }
        });

        // Comments count link
        jQuery('#content').on('click', '.show-comments-section', function(event) {
            event.preventDefault();
            var bottom = jQuery(this).closest('.scroll-item').find('.bottom .pane-facebook-comments-box');
            // Run the click event of show comments button
            bottom.find('.show-comments').click();
            // Do not run normal updates when we scroll to comments block in code
            zeusLoadMore.updateScroll = false;
            //Scroll to the comments block we just loaded.
            jQuery('html, body').animate({
              scrollTop: bottom.offset().top - 80
          }, 800);
            // Takes some time load the comments section
            // Resume normal url updates after some delay
            setTimeout(function() {
                zeusLoadMore.updateScroll = true;
            }, 900);
        });

        // Display comment count on first Article
        var zeusLoadMoreSettings = zeusLoadMore.drupalSettings();
        var initialUrl = zeusLoadMoreSettings['initialUrl'];
        zeusLoadMore.getFacebookCommentsCount(initialUrl, zeusLoadMoreSettings['initialNid']);
    },

    // Get the facebook comment count for a url
    getFacebookCommentsCount: function (url, nid) {
        var comment_count = '';
        var fbAPI = 'https://graph.facebook.com/v2.3/?fields=share{comment_count}&id=';
        if (typeof url !== 'undefined') {
            jQuery.getJSON(fbAPI+url)
            .done(function(data) {
                if (typeof data.share != 'undefined' && typeof data.share.comment_count != 'undefined') {
                    if (data.share.comment_count > 0) {
                        comment_count = data.share.comment_count + ' comments';
                    } else {
                        comment_count = 'Write a comment';
                    }
                    //jQuery('#item'+nid+' .comment-count-wrap a.show-comments').text(comment_count);
                }
            })
            .fail(function() {
                comment_count = 'Write a Comment';
                jQuery('#item'+nid+' .comment-count-wrap a.show-comments').text(comment_count);
            });
        }
    },

    getFacebookCommentsBox: function(fb_app_id) {

        jQuery('#facebook-jssdk').remove();
        (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "http://connect.facebook.net/en_US/all.js#xfbml=1&version=v2.3&appId=" + fb_app_id;
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },

    // Refresh or create new slots for interstitial ads
    // @todo: should be merged into refreshAds
    refreshInterstitialAd: function(id, dfp) {

        if (typeof id === 'undefined') {
            return;
        }
        var page_count = 1; // counting ads page views
        if (typeof page_no !== 'undefined') {
            page_count = page_no;
        }
        // add page view counter to DFP targeting
        if (jQuery.cookie("zeus_ads_pv") != null) {
            page_count = jQuery.cookie("zeus_ads_pv");
        }
        if (id == 0) {
            id = '';
            var slotvar = 'interstitial';
            var adDiv = '<div id="dfp-ad-interstitial-wrapper'+'" class="dfp-tag-wrapper interstitial-ad"><div id="dfp-ad-interstitial'+'" class="dfp-tag-wrapper"></div></div>';
            var slotDiv =    'dfp-ad-interstitial';
        } else {
            var slotvar = 'interstitial-'+id;
            var adDiv = '<div id="dfp-ad-interstitial-wrapper-'+id+'" class="dfp-tag-wrapper interstitial-ad"><div id="dfp-ad-interstitial-'+id+'" class="dfp-tag-wrapper"></div></div>';
            var slotDiv =    'dfp-ad-interstitial-' +id;
        }
        var dfpInterstitial = jQuery("#block-dfp-interstitial");

        jQuery('body').css('background-image', '');

        if (typeof dfp !== 'undefined') {
            dfp = dfp['interstitial'];
            var targeting = dfp['targeting'];
            var adunit = dfp['adunit'];

            // refresh interstitial ad
            googletag.cmd.push(function() {

                dfpInterstitial.find(' .dfp-tag-wrapper').remove();

                dfpInterstitial.append(adDiv);
                if (typeof googletag.slots[slotvar] !== 'undefined') {

                    var gslot = googletag.slots[slotvar];
                    gslot.clearTargeting("pv");
                    gslot.setTargeting("pv", page_count);
                    googletag.pubads().refresh([gslot]);
                } else {
                    var googleslot = googletag.defineOutOfPageSlot(adunit, slotDiv).
                    addService(googletag.pubads());

                    googleslot.setTargeting("pv", page_count);
                    // --------------------------------------

                    jQuery.each(targeting, function(index,obj) {
                        if (obj['target'] === 'pv') {
                            return true;
                        }
                        googleslot.setTargeting(obj['target'], obj['value']);
                    });

                    // Display has to be called before
                    // refresh and after the slot div is in the page.
                    googletag.display(slotDiv);
                    //googletag.pubads().refresh([googleslot]);
                    googletag.slots[slotvar] = googleslot;
                }
            });
        } else if (typeof id !== 'undefined') {
            // just refresh interstitial ad
            // used when called externally say from slideshows on slide change
            // dfp object is not available in that case
            googletag.cmd.push(function() {

                if (typeof googletag.slots[slotvar] !== 'undefined') {
                    var gslot = googletag.slots[slotvar];
                    gslot.clearTargeting("pv");
                    gslot.setTargeting("pv", page_count);
                    googletag.pubads().refresh([gslot]);
                }
            });
        }
    },

    // Refresh ads (handles other than interstitial)
    refreshAds: function(itemCount, onlyRR) {
        var zeusLoadMoreSettings = zeusLoadMore.drupalSettings();
        var right_rail_ad = zeusLoadMoreSettings['right_rail_ad'];
        var separator_ad = zeusLoadMoreSettings['separator_ad'] + "-" + itemCount;
        var top_leaderboard_ad = zeusLoadMoreSettings['top_leaderboard_ad'];
        var page_count = 1;
        var gslot = '';

        if (typeof onlyRR === 'undefined' || onlyRR == null) {
            onlyRR = 0; // refresh only RR ad
        }
        // add page view counter to DFP targeting
        if (jQuery.cookie("zeus_ads_pv") != null) {
            page_count = jQuery.cookie("zeus_ads_pv");
        }

        var gptList = [];
        if (itemCount == 0) {
            // for the first item refresh right rail and top leaderboard ad
            gptList.push(googletag.slots[right_rail_ad]);
            if (onlyRR !== 1) {
                gptList.push(googletag.slots[top_leaderboard_ad]);
            }
            try {
                yieldbot.setSlotTargeting(top_leaderboard_ad, googletag.slots[top_leaderboard_ad]);
            }catch(e){}
        } else {
            // for others refresh right rail and separator ad
            right_rail_ad = right_rail_ad + "-" + itemCount;
            if (typeof googletag.slots[right_rail_ad] !== 'undefined') {
                gslot = googletag.slots[right_rail_ad];
                gslot.clearTargeting('pv');
                gslot.setTargeting("pv", page_count);
                gptList.push(gslot);
            }
            // Do not refresh separator ad if we want only RR Ad (onlyRR)
            if (typeof googletag.slots[separator_ad] !== 'undefined' && onlyRR !== 1) {
                gslot = googletag.slots[separator_ad];
                gslot.clearTargeting('pv');
                gslot.setTargeting("pv", page_count);
                gptList.push(gslot);
            }

            try {
                yieldbot.setSlotTargeting(top_leaderboard_ad, googletag.slots[separator_ad]);
            }catch(e){}
        }
        try {
            yieldbot.setSlotTargeting(right_rail_ad, googletag.slots[right_rail_ad]);
        }catch(e){}
        // Refresh ads
        if (gptList.length > 0) {
            googletag.pubads().refresh(gptList);
        }
        // Advertisement text to be added on refresh ad if not present already
        var rrad = jQuery('#dfp-ad-'+right_rail_ad);
        if (!rrad.find('.slug').length) {
            var slugDiv = '<div class="slug">Advertisement</div>';
            jQuery('#dfp-ad-'+right_rail_ad).prepend(slugDiv);
        }
    },

    refreshSlideshowAds: function() {
        var zeusLoadMoreSettings = zeusLoadMore.drupalSettings();
        var right_rail_ad = zeusLoadMoreSettings['right_rail_ad'];
        var top_leaderboard_ad = zeusLoadMoreSettings['top_leaderboard_ad'];
        var interstitial_ad = '';
        
        if (typeof Drupal.settings.zeus_slideshow_settings.top_banner_ad !== 'undefined') {
          top_leaderboard_ad = Drupal.settings.zeus_slideshow_settings.top_banner_ad;
        }
        if (typeof right_rail_ad === 'undefined' && typeof Drupal.settings.zeus_slideshow_settings.slideshow_rightrail_ad !== 'undefined') {
          //300x250_advertisement_right_rail
          right_rail_ad = Drupal.settings.zeus_slideshow_settings.slideshow_rightrail_ad;
        }
        if (typeof Drupal.settings.zeus_slideshow_settings.interstitial !== 'undefined') {
          interstitial_ad = Drupal.settings.zeus_slideshow_settings.interstitial;
        }
        // add page view counter to DFP targeting
        if (jQuery.cookie("zeus_ads_pv") != null) {
            page_count = jQuery.cookie("zeus_ads_pv");
        }
        // Add right rail and top leaderboard ads to googletag refresh list
        var gptList = [];
        var gslot = '';
        if (typeof googletag.slots[right_rail_ad] !== 'undefined') {
            gslot = googletag.slots[right_rail_ad];
            gslot.clearTargeting('pv');
            gslot.setTargeting("pv", page_count);
            gptList.push(gslot);
        }
        if (typeof googletag.slots[top_leaderboard_ad] !== 'undefined') {
            gslot = googletag.slots[top_leaderboard_ad];
            gslot.clearTargeting('pv');
            gslot.setTargeting("pv", page_count);
            gptList.push(gslot);
        }
        if (typeof googletag.slots[interstitial_ad] !== 'undefined') {
            jQuery('body').css('background-image', '');
            gslot = googletag.slots[interstitial_ad];
            gslot.clearTargeting('pv');
            gslot.setTargeting("pv", page_count);
            gptList.push(gslot);          
        }
        try {
            yieldbot.setSlotTargeting(top_leaderboard_ad, googletag.slots[top_leaderboard_ad]);
        } catch(e) {}

        try {
            yieldbot.setSlotTargeting(right_rail_ad, googletag.slots[right_rail_ad]);
        } catch(e) {}
        
        try {
            yieldbot.setSlotTargeting(interstitial_ad, googletag.slots[interstitial_ad]);
        } catch(e) {}
        
        // Refresh ads
        if (gptList.length > 0) {
            googletag.pubads().refresh(gptList);
        }
        // Advertisement text to be added on refresh ad if not present already
        var rrad = jQuery('#dfp-ad-'+right_rail_ad+'-wrapper');
        if (!rrad.find('.slug').length) {
            var slugDiv = '<div class="slug">Advertisement</div>';
            jQuery('#dfp-ad-'+right_rail_ad).prepend(slugDiv);
        }
    },

    // handles the multiple repeating ads on infinite scroll
    implementGPTTags: function(id, dfp, component, contElem) {

        if (typeof dfp !== 'undefined' && typeof dfp[component] !== 'undefined') {
            var zeusLoadMoreSettings = zeusLoadMore.drupalSettings();
            var type = zeusLoadMoreSettings['type'];
            var houseAdRR = zeusLoadMoreSettings['houseAdRR'];

            if (type === 'zeus_content') {
                var right_rail_ad = zeusLoadMoreSettings['right_rail_ad'] + "-" + window.nextSlotId;
                var separator_ad = zeusLoadMoreSettings['separator_ad'] + "-" + window.nextSlotId;
                if (houseAdRR == 1) {
                    var right_rail_house_ad = zeusLoadMoreSettings['right_rail_house_ad'] + "-" + window.nextSlotId;
                }
            }
            var slotvar = '';

            var page_count = 1; // counting ads page views
            if (typeof page_no !== 'undefined') {
                page_count = page_no;
            }

            dfp = dfp[component]; //Get dfp for specified component
            var slotName = dfp['slotname'] + ' ' + window.nextSlotId;
            // Generate next slot name
            var slot = zeusLoadMore.generateNextSlot(dfp['slot']);
            var adunit = dfp['adunit'];
            var targeting = dfp['targeting'];
            var size = jQuery.parseJSON(dfp['size']);
            // Create a div for the slot
            var slotDiv = document.createElement('div');
            slotDiv.id = slot; // Id must be the same as slotName
            var slotContDiv = document.createElement('div');
            slotContDiv.id = slot + '-wrapper';
            slotDiv.className = "dfp-tag-wrapper";
            slotContDiv.className = "dfp-tag-wrapper";

            if (component === 'right_rail') {
               contElem.prepend(slotContDiv);
               slotvar = right_rail_ad;
               // Adding extra class to rr ad only when house ad has to be added after it later on
               if (houseAdRR == 1) {
                   slotContDiv.className += " dfp-tag-rr-ad";
               }
            }
            else if (component === 'separator') {
               contElem.append(slotContDiv);
               slotvar = separator_ad;
            }
            else if (component === 'right_rail_house_ad' && houseAdRR == 1) {
                contElem.after(slotContDiv);
                slotvar = right_rail_house_ad;
            }

            jQuery('#'+slotContDiv.id).append(slotDiv);

            if (component === 'right_rail') {
                var slugDiv = '<div class="slug">Advertisement</div>';
                jQuery('#'+slot).prepend(slugDiv);
            }

            // Define the slot itself, call display() to
            // register the div and refresh() to fetch ad.
            googletag.cmd.push(function() {
              // Infinite scroll requires SRA
              googletag.pubads().enableSingleRequest();
              var googleslot = googletag.defineSlot(adunit, size, slot).
                setTargeting("tile", slotName).
                //setCollapseEmptyDiv(true,true).
                addService(googletag.pubads());

                // add page view counter to DFP targeting
                if (jQuery.cookie("zeus_ads_pv") != null) {
                    page_count = jQuery.cookie("zeus_ads_pv");
                }
                googleslot.setTargeting("pv", page_count);
                // --------------------------------------

                jQuery.each(targeting, function(index,obj) {
                    if (obj['target'] === 'tile' || obj['target'] === 'pv') {
                        return true;
                    }
                    googleslot.setTargeting(obj['target'], obj['value']);
                });
                if (component === 'separator' && typeof cmapping !== 'undefined') {
                    googleslot.defineSizeMapping(cmapping);
                }
                try {
                    yieldbot.setSlotTargeting(slot, googleslot);
                }catch(e){}

                // Display has to be called before
                // refresh and after the slot div is in the page.
                googletag.display(slot);
                //googletag.pubads().refresh([googleslot]);
                if (type === 'zeus_content') {
                    // Add to global googletag.slots for later refresh
                    googletag.slots[slotvar] = googleslot;

                }
            });
        }
    },

    // Function to generate unique names for slots
    generateNextSlot: function(slot) {
        var id = window.nextSlotId;
        return 'dfp-ad-'+ slot + '-' + id;
    },

    // handles stickiness for a sharebar on a iscroll page
    // referring to a specific one at a time by nid
    stickySharebarVerticalHandler: function(nid) {

        /* vertical sharebar sticky */
        var sharebar_top = '#header';    // top most point for sharebar
        var sharebar_bottom = '.bottom'; // bottom most point for sharebar
        var contentItem = jQuery('#item'+nid); // Outer element for this content (Article/slideshow)
        var el = contentItem.find('.sharebar.vertical');
        var headerHeight = jQuery(sharebar_top).outerHeight();
        var extraSpace = 20;

        // if sharebar present for this content
        if (el.length) {
            sharebar_bottom = contentItem.find(sharebar_bottom);
            if (sharebar_bottom.length) {
                var stickyTop = el.offset().top;
                var stickyHeight = el.height();
                var extraMargin = headerHeight + extraSpace;
                // Move the sharebar on scroll
                jQuery(window).bind("scroll.sharebar#item"+nid, function() {
                    var limit = sharebar_bottom.offset().top - stickyHeight - extraMargin;
                    var windowTop = jQuery(window).scrollTop() + extraMargin;
                    if (stickyTop > windowTop) {
                        el.css({ position: 'absolute', top: "" });
                    }
                    else {
                        if (limit < windowTop) {
                            var diff = (limit - windowTop) + extraMargin;
                            el.css({ position: 'fixed', top: diff});
                        } else {
                            el.css({ position: 'fixed', top: extraMargin});
                        }
                    }
                });
            }
        }
    },

    // initial processing for sharebar thats happens one time
    initializeSharebar: function() {
        var zeusLoadMoreSettings = zeusLoadMore.drupalSettings();
        var initialNid = zeusLoadMoreSettings['initialNid'];
        // add stickiness to the sharebar on first article
        zeusLoadMore.stickySharebarVerticalHandler(initialNid);
        jQuery('#item'+initialNid+' .sharebar.horizontal li:visible:first').addClass("first-item");
        jQuery('#item'+initialNid+' .sharebar.horizontal li:visible:last').addClass("last-item");

        // initialization stuff for h sharebar
        // topmost point for sharebar to stick to
        if (typeof Drupal.settings.sharebar_top !== 'undefined') {
            zeusLoadMore.sharebar_top = jQuery('#'+Drupal.settings.sharebar_top);
        }  else {
            zeusLoadMore.sharebar_top = jQuery('#header');
        }
        zeusLoadMore.adminMenu = jQuery('#admin-menu');

        zeusLoadMore.stickySharebarHorizontalHandler(initialNid);
        //-------------------------------------------------
    },

    stickySharebarHorizontalHandler: function(nid) {
        // current item in view
        var item = jQuery('#item'+nid);
        // Add sticky behaviour for Horizontal format sharebar in view
        var elH = item.find('.sharebar.horizontal');
        zeusLoadMore.adminMenuH = -1;

        // if horizontal sharebar is visible then only add the sticky behaviour
        if (elH.filter(":visible").length) {

            // initializations for horizontal sharebar
            // take into account admin menu height
            var adminMenuH = 0;
            // top position of sharebar
            var stickyTopH = elH.offset().top;
            // height for sharebar
            var stickyHeightH = elH.height();
            // header height for sharebar to stick to
            var headerHeightH = zeusLoadMore.sharebar_top.outerHeight() ;

            // bottom most point will be article body text or filed under tags section
            // as in slideshow
            var sharebarBHEl = item.find('article section.field-body');
            if (!sharebarBHEl.length) {
                sharebarBHEl = item.find('.field-tags');
            }
            if (sharebarBHEl.length) {
                var sharebar_bottomH = sharebarBHEl.offset().top + sharebarBHEl.outerHeight(true);
                // Calculate limit for bottom most point
                var limitH = sharebar_bottomH - stickyHeightH - headerHeightH;
                var win = jQuery(window);

                // remove old sticky behaviours attached for h sharebar and add to the current one in view
                jQuery(window).off("scroll.stickySbH").on("scroll.stickySbH", function() {
                    if (zeusLoadMore.adminMenuH == -1) {
                        if (zeusLoadMore.adminMenu.filter(":visible").length) {
                            zeusLoadMore.adminMenuH = zeusLoadMore.adminMenu.outerHeight();
                            adminMenuH = zeusLoadMore.adminMenuH;
                            limitH = limitH - adminMenuH;
                        }
                    }
                    var windowTop = win.scrollTop() + headerHeightH;
                    if ((stickyTopH < windowTop) && (limitH > windowTop)) {
                      elH.css({ top: headerHeightH + adminMenuH});
                      elH.addClass('floating');
                    }
                    else {
                      elH.css({ top: "" });
                      elH.removeClass('floating');
                    }
                });
            }
        }
    },

    // handles stickiness for right rail on a iscroll page
    // referring to a specific one at a time by nid
    // wish we had some way to work through one scroll function itself for all rr
    // but could not get that working correctly for all cases
    stickyRightRailHandler: function(nid) {
        var top = '#header';    // top most point for rr
        var bottom = '.bottom'; // bottom most point for rr
        var contentItem = jQuery('#item'+nid); // Outer element for this content (Article/slideshow)
        var el = contentItem.find('.right_rail .inner');
        var headerHeight = jQuery(top).outerHeight();
        if (jQuery("body").hasClass("node-type-slideshow")) {
            headerHeight += jQuery('.region-banner-ad').outerHeight();
        }
        var extraSpace = 20;
        var limitN = 0;
        var diff = 0;
        var limit = 0;
        var stickyRRDuration = 0;
        if (typeof zeusLoadMore.stickyRRDuration !== 'undefined') {
            var stickyRRDuration = zeusLoadMore.stickyRRDuration * 1000;
        }

        // if rr present for this content
        if (el.length) {
            var stickyTop = el.offset().top;
            var win = jQuery(window);

            // On scroll behaviour for RR
            win.bind("scroll.rightrail#item"+nid, function() {
                var stickyHeight = el.height();
                var skyboxHeight = jQuery('.OUTBRAIN.ob-shrink').outerHeight();
                var extraMargin = headerHeight + extraSpace;
                // if we have reached bottom and there is no timeout,
                // always calculate fresh limit as outbrain and images load slow or the right and bottom outbrain module collides
                if (typeof jQuery.data(el[0], 'timeout') === 'undefined' || typeof jQuery.data(el[0], 'limit') === 'undefined') {
                    limit = contentItem.find(bottom).offset().top - stickyHeight - extraMargin;
                } else {
                    limit = jQuery.data(el[0], 'limit');
                }
                var windowTop = win.scrollTop() + extraMargin;
                // Element has not reached the top of window
                if (stickyTop + skyboxHeight > windowTop) {
                    // remove sticky as rr  has scrolled to orig pos
                    if (el.hasClass('sticky')) {
                        el.css({ top: "" });
                        el.removeClass('sticky');
                        // remove all set data for rr and start afresh
                        jQuery.removeData(el[0], 'limit');
                        jQuery.removeData(el[0], 'return');
                        jQuery.removeData(el[0], 'timeout');
                    }
                }
                else {
                    // Element has reached the limit (maybe timeout or bottom of content)
                    if (limit < windowTop) {
                        diff = (limit - windowTop) + extraMargin;
                        el.css({ top: diff});
                        el.addClass('sticky');
                        jQuery.data(el[0], 'return', 1);                        // rr returning to top of content
                    } else {
                        // element has reached top of window and has not yet reached the limit
                        // so set it STICKY
                        el.css({ top: extraMargin });
                        // set the right rail fixed to the top
                        if (!el.hasClass('sticky')) {
                            el.addClass('sticky');
                            if (stickyRRDuration > 0) {
                                // for duration based stickiness
                                setTimeout(function() {
                                    // when the timeout is called, first check if the element
                                    // has already reached the bottom limit
                                    // in that case this is not needed
                                    if (typeof jQuery.data(el[0], 'return') === 'undefined') {
                                        limitN =  el.offset().top;
                                        diff = (limitN - windowTop);
                                        //el.css({ top: diff});
                                        jQuery.data(el[0], 'return', 1);            // rr returning to top of content
                                        jQuery.data(el[0], 'timeout', 1);           // timeout for sticky
                                        jQuery.data(el[0], 'limit', limitN);
                                    }
                                }, stickyRRDuration);
                            }
                        }
                    }
                }
            });
        }
    },

    initializeOutbrainWidgetIds: function() {
        if (typeof outbrain_slideshow_bottom === 'undefined') {
            outbrain_slideshow_bottom = 'AR_4';
        }
        if (typeof outbrain_slideshow_bottom_mobile === 'undefined') {
            outbrain_slideshow_bottom_mobile = 'MB_4';
        }
        if (typeof outbrain_article_bottom === 'undefined') {
            outbrain_article_bottom = 'AR_3';
        }
        if (typeof outbrain_article_bottom_mobile === 'undefined') {
            outbrain_article_bottom_mobile = 'MB_3';
        }
        if (typeof outbrain_article_rightrail === 'undefined') {
            outbrain_article_rightrail = 'SB_3';
        }
    },
    //Loadmore pinit changes
    loadMoreAddPinit: function(title, url) {
      this.pageURL = encodeURI(url);
      this.nodeTitle = jQuery.trim(title);
      this.description = "";
      var self = this;  var articleContainer = ".hero-article .image-inner img";
	    jQuery(articleContainer).each(function() {
	      if(jQuery(this).width() > 100) {
	        var desc = "";
	        desc = encodeURI(self.nodeTitle + " "+ desc + " " +self.pageURL);
	        self.description = desc;
	        jQuery(this).wrap('<div class="pinit"></div>');
	        var imgSrc = jQuery(this).attr("data-src");
	        if (typeof imgSrc == "undefined" || imgSrc.toLowerCase().indexOf("http") < 0) {
	          imgSrc = jQuery(this).attr("src");
	        }
	        if (imgSrc.toLowerCase().indexOf("http") >= 0) {
	          var pinitImageHref = encodeURI(imgSrc);
	        } else {
	          var pinitImageHref = encodeURI(window.location.protocol+"//"+document.location.hostname+imgSrc);
	        }
	        var pageURL = encodeURI(self.pageURL);
            var pinitScript = '<a id="active-pinit" href="http://pinterest.com/pin/create/button/?url='+pageURL+'&media='+pinitImageHref+'&description='+self.description+'" class="pin-it-button" count-layout="none"></a><div class="clk-pinit"></div>';
            jQuery(this).after('<div class="pinit-btn-container">'+pinitScript+'</div>');
	      }
	    });
        jQuery(".clk-pinit").click(function(event) {
	      var pinit_href = jQuery(this).prev("a").attr("data-pin-href");
	      if (typeof pinit_href == "undefined" || pinit_href == "") {
	        pinit_href = jQuery(this).prev("a").attr("href");
	      }
	      var pinitleft = jQuery(window).width()-632;
	      var pinittop = jQuery(window).height()-253;
	      var pinitleft = pinitleft/2;
	      var pinittop = pinittop/2;
	      window.open(pinit_href, "Pinterest", "width=632,height=253,status=0,left="+pinitleft+",top="+pinittop+",toolbar=0,menubar=0,location=1,scrollbars=1");
	      return false;
	    });
    }
}

// Handles the initialization and triggering of load more
function initializeLoadMore() {

    zeusLoadMore.updateScroll = true;
    window.curPage = 0; // initialize counter for load more
    window.nextSlotId = 1; // initialize nextSlot ID for ads
    window.showLoadMore = true; // begin the load more unless content retrieved is exhausted
    var zeusLoadMoreSettings = zeusLoadMore.drupalSettings();
    var type = zeusLoadMoreSettings['type'];
    var channel = zeusLoadMoreSettings['curChannel'];
    var disqusOnDemand = zeusLoadMoreSettings['disqusOnDemand'];
    // flag for infinite scroll or load more on click
    var loadMoreOnScroll = zeusLoadMoreSettings['loadMoreOnScroll'];
    var initialNid = zeusLoadMoreSettings['initialNid'];
    var initialUrl = zeusLoadMoreSettings['initialUrl'];
    var initialTitle = zeusLoadMoreSettings['initialTitle'];
    var initialHTitle = zeusLoadMoreSettings['initialHTitle'];
    zeusLoadMore.dtm = {};
    zeusLoadMore.pageTitle = {};
    zeusLoadMore.headTitle = {};
    zeusLoadMore.url = {};
    zeusLoadMore.sponsored = {}; //used on content pages

    //zeusLoadMore.currPage = 0; //initialize counter for zeus smartqueue load more
    zeusLoadMore.dfp = {}; //used for zeus_smartqueue
    zeusLoadMore.extraData = {}; // used for slideshows
    zeusLoadMore.itemCount = 1;
    zeusLoadMore.itemsContainer = jQuery('#itemsContainer');

    // If infinite scroll is enabled
    if (typeof loadMoreOnScroll !== 'undefined' && loadMoreOnScroll === 1) {

        window.flagtoload = true;
        window.lastScrollTop = 0;
        /*** based on http://ejohn.org/blog/learning-from-twitter/ **/
        jQuery(window).scroll(function() {
                window.didScroll = true;
        });

        setInterval(function() {
                if ( window.didScroll  ) {
                    window.didScroll  = false;
                    zeusLoadMore.iScrollHandler();
                }
        }, 500);

        if (type === 'zeus_content') {
            if (typeof dataLayer !== 'undefined') {
                zeusLoadMore.dtm[initialNid] = dataLayer;
            }
            zeusLoadMore.url[initialNid] = initialUrl;
            zeusLoadMore.pageTitle[initialNid] = initialTitle;
            zeusLoadMore.headTitle[initialNid] = initialHTitle;
            zeusLoadMore.navPage = 1; // Used when adding more to scroll navigation list
            zeusLoadMore.noMoreData = 0; // Flag to check if there is any more data
            // ajax call to load the settings
            // need it before any load more call
            jQuery.getJSON('/load-more-settings-content/ajax/'+initialNid, function(json, status) {
                if(status === "success") {
                    zeusLoadMore.dfp[initialNid] = json.dfp;
                }
            });

            // Set up the comment count links for iscroll
          //  jQuery('.comment-count-wrap a.show-comments').addClass('show-comments-section');
            jQuery('.content-wrapper a.show-comments').addClass('show-comments-section');

            if (zeusLoadMoreSettings['comments'] === 'facebook') {
                // facebook
                zeusLoadMore.initializeFbComments();

            } else if (disqusOnDemand === 1) {
                // disqus
                zeusLoadMore.initializeDisqus();
            }
            // Outbrain
            zeusLoadMore.initializeOutbrainWidgetIds();
            // Sponsored
            if (jQuery('body').hasClass('sponsored')) {
                zeusLoadMore.sponsored[initialNid] = 1;
            } else {
                zeusLoadMore.sponsored[initialNid] = 0;
            }

        } else if (type === 'zeus_smartqueue') {
            window.flagtoload = false;
            // ajax call to load the settings
            // need it before any load more call
            // @todo: right now separator ad does not work without iscroll
            jQuery.getJSON('/load-more-settings/ajax/'+channel, function(json, status) {
                if(status === "success") {
                    zeusLoadMore.dfp = json.dfp;
                    window.flagtoload = true;
                }
            });
        }
        jQuery('.pager-load-more li.pager-next').hide(); // Hide load more button if infinite scroll enabled
    } else {
        // default is load more click
       if (type === 'zeus_smartqueue') {
           jQuery(".pager-load-more.page_"+curPage).click(function(event) {
             event.preventDefault();
             zeusLoadMore.loadMoreHandlerZeusSmartqueue();
           });
       }
    }
}

// initialize sticky sharebar/rr after images are loaded
jQuery(window).load(function() {

    if (typeof Drupal.settings.zeus_utils_load_more !== "undefined") {

        var zeusLoadMoreSettings = zeusLoadMore.drupalSettings();
        var loadMoreOnScroll = zeusLoadMoreSettings['loadMoreOnScroll'];
        var enableStickySb = zeusLoadMoreSettings['enableStickySb'];
        var enableStickyRR = zeusLoadMoreSettings['enableStickyRR'];
        zeusLoadMore.stickyRRDuration = zeusLoadMoreSettings['stickyRRDuration'];
        var winWidth = jQuery(window).width();
        if (typeof zeus.tabletBreak === 'undefined') {
            zeus.tabletBreak = 980;
        }

        // If infinite scroll is enabled
        if (typeof loadMoreOnScroll !== 'undefined' && loadMoreOnScroll === 1) {
            // sharebar
            if (enableStickySb) {
                zeusLoadMore.initializeSharebar();
            }
            // right rail
            if (enableStickyRR && winWidth >= zeus.tabletBreak) {
                // a fix for firefox where the sticky right rail shifting to extreme right on first article
                var rr = jQuery('#itemsContainer .right_rail');
                var inr = rr.find('.inner');
                rr.css({'width': inr.css('width'), 'height' : inr.css('height')});

                // sticky RR for first content
                zeusLoadMore.stickyRightRailHandler(zeusLoadMoreSettings['initialNid']);
            }
        }
    }
});
;
// custom scripts for pausing other brightcove players on the same page when another players "play" button is clicked or starts playing (is autoplay).
// See: http://docs.brightcove.com/en/video-cloud/smart-player-api/samples/stop-other-players-when-video-starts.html

var players = [],	  // array to hold players
  player,
  APIModules,
  videoPlayer;

function onTemplateLoad(experienceID){
  APIModules = brightcove.api.modules.APIModules;
  // Add each player's id to the players array
  players.push(experienceID);
}

function onTemplateReady (event) {
  // Add a PLAY event handler to each player
  player = brightcove.api.getExperience(event.target.experience.id);
  videoPlayer = player.getModule(APIModules.VIDEO_PLAYER);
  // Wrap handler in anonymous function
  videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY, function(event) {onPlay(event);});
}

function onPlay(event) {
  var id = event.target.experience.id;

  // Loop through the players array, and stop the others
  for (var i = 0; i < players.length; i++) {
    if (players[i] != id) {
      var player = brightcove.api.getExperience(players[i]);
      var videoPlayer = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
      videoPlayer.pause(true);
    }
  }
};
