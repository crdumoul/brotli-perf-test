/*
 * Function to track events via JS
 */
var js_track = {
	/*s_times: {},
	s_renderTime: function (start, end) {
		var time = end - start;
		if (time > 0) {
			time = time/1000;
			this.s_times.time_render = time;
		}
	},
	s_loadTime: function (start, end) {
		var time = end - start;
		if (time > 0) {
			time = time/1000;
			this.s_times.time_load = time;
		}
		utag.link({
			event_type: 'page_load_metrics',
			time_render: this.s_times.time_render,
			time_load: this.s_times.time_load
		});
	},*/
	s_createContent: function(type) {
		utag.link({
			event_type: 'form_community_entry',
			community_entry_type: type
		});
	},

	s_chatClicked: function(chatType) {
		utag.link({
			event_type: 'click_bold_chat',
			chat_type: chatType
		});
	},

	s_trackItemLevelError: function(errorMsg, prodId) {
		utag.link({
			event_type: 'error_log_cart_item_level',
			item_level_cart_error_message: errorMsg,
			item_level_cart_error_prod_list: prodId

		});
	},


	// Offshore: We need the vehicle id to be passed in utag.link while adding a vehicle
	// Onshore: This cannot be done. The vehicle id is not present until after it is added.
	s_addVehicle: function(desc, id) {
		utag.link({
			event_type: 'form_add_vehicle',
			vehicle_description: desc,
			preferredVehicleId: id
		});
	},

	s_setStore: function(storeNo, region) {
		utag.link({
			event_type: 'click_set_store',
			storeId: storeNo,
			special_interaction_description: 'set as preferred store:' + region
		});
	},

	s_removeVehicle: function(desc, id) {
		utag.link({
			event_type: 'form_remove_vehicle',
			vehicle_description: desc,
			vehicld_id: id
		});
	},

	s_videoStart: function(videoName) {
        utag.link({
            video_name: videoName,
			event_type: 'video_start'
        });
    },

	s_videoEnd: function(videoName) {
        utag.link({
            video_name: videoName,
			event_type: 'video_end'
        });
    },

	s_formStart: function(formName) {
        utag.link({
            form_name: formName,
			event_type: 'form_start'
        });
    },

	s_formEnd: function(formName) {
        utag.link({
            form_name: formName,
			event_type: 'form_end'
        });
    },

	s_trackTopNavMenu: function(linkName) {
		utag.link({
			product_finding_method: 'catalog menu:header section',
			special_interaction_description: 'catalog menu:' + linkName,
			event_type: 'special_interaction'
		});
	},

	s_trackCatalogMostPopularCategory: function(linkName) {
		utag.link({
			product_finding_method: 'catalog menu:popular category section',
			special_interaction_description: 'catalog menu:popular categories:' + linkName,
			event_type: 'special_interaction'
		});
    },

	s_trackCatalogAllCategories: function(linkName) {
		utag.link({
			product_finding_method: 'catalog menu:all categories section',
			special_interaction_description: 'catalog menu:all categories section:' + linkName,
			event_type: 'special_interaction'
		});
	},

	s_trackTopNavStaticMenu: function(linkName) {
		utag.link({
			special_interaction_description: 'static menu item:' + linkName,
			event_type: 'special_interaction'
		});
	},

	s_searchResultClicked: function(type, text, term) {
		utag.link({
			event_type: 'click_search_result',
			result_clicked: text,
			result_type: type
		});
	},

	s_findStore: function(term, region) {
		utag.link({
			event_type: 'form_find_store_success',
			store_search_term: term,
			special_interaction_description: 'store locator:' + region,
		});
	},

	s_setPreferredVehicle: function(desc, id) {
		utag.link({
			event_type: 'form_set_preferred_vehicle',
			vehicle_description: desc,
			preferredVehicleId: id
		});
	},

	s_addCart: function(productIds) {
		utag.link({
			event_type: 'add_to_cart_success',
			productIds: productIds
		});
	},

	s_removeCart: function(productId) {
		utag.link({
			event_type: 'remove_cart_success',
			products: productId
		});
	},

	s_recommendationsInteraction: function(prodTitle, page) {
		utag.link({
			event_type: 'click_recommendations',
			productTitle: prodTitle,
			page: page
		});
	},

	s_relatedCartItems: function(productId) {
        utag.link({
            product_related_items: productId,
			product_finding_method: 'related items:cart page',
			event_type: 'related_items_cart'
        });
    },

	s_findRepairShop: function(e, section) {
		utag.link({
			event_type: 'click_link_find_repair_shop',
			description: section
		});
	},

	s_trackProceedToCheckout: function() {
		utag.link({
			event_type: 'click_button_proceed_to_checkout'
		});
	},

	s_trackSendList: function() {
		utag.link({
			event_type: 'click_button_send_list_to_store'
		});
	},

	s_trackCouponAdd: function(couponId) {
		utag.link({
			event_type: 'coupon_claim',
			couponId: couponId
		});
	},

	s_trackCouponRemove: function() {
		utag.link({
			event_type: 'click_button_remove_coupon'
		});
	},

	s_pageView: function(thisName) {
		utag.link({
			event_type: 'page_view',
			description: 'PageName ' + thisName
		});
	},

	s_printShoppingCart: function() {
		utag.link({
			event_type: 'click_print_shopping_cart'
		});
	},

	s_newUser: function() {
		utag.link({
			event_type: 'page_view_myzone_registration'
		});
	},

	s_login_count: 0,
	s_login: function() {
		if (typeof utag === "undefined" && js_track.s_login_count < 10) {
			js_track.s_login_count++
			window.setTimeout(function () {
				if (window.console) {
					console.log('calling s_login recursively +' + js_track.s_login_count);
				}
				js_track.s_login();
			}, 250);
		} else {
			if (window.console) {
				console.log('Sending login event to tealium.');
			}
			utag.link({
				event_type: 'page_view_login'
			});
		}
	},

	s_shelfRelatedParts: function(shelfParts) {
		utag.link({
			shelf_related_parts: shelfParts,
			product_finding_method: 'related parts:shelf page'
		});
	},

	s_shelfRelatedProducts: function(shelfProducts) {
		utag.link({
			shelf_related_products: shelfProducts,
			product_finding_method: 'related products:shelf page'
		});
	},

	s_repairGuideSection: function(guideSection) {
		utag.link({
			repair_guide_section: guideSection,
			event_type: 'repair_guide'
		});
	},

    s_repairGuideChapter: function(guideChapter) {
    	utag_data['repair_guide_chapter'] = guideChapter;
	},


    s_setHierarchy: function(hierValue) {
        utag_data['page_hierarchy'] = hierValue;
    },

	s_productArticleInfo: function(article) {
        utag.link({
            article_product_how_to_info: article,
			event_type: 'product_how_to_info'
        });
    },

	s_componentLocation: function(componentValue) {
        utag.link({
            vehicle_component_location: componentValue,
            event_type: 'click_link_component_location'
        });
    },

	s_trackHeaderLoginLinks: function(linkName) {
		utag.link({
			special_interaction_description: 'header section:' + linkName,
			event_type: 'special_interaction'
		});
    },

	s_trackCatalogFooterMenu: function(linkName) {
		utag.link({
			product_finding_method: 'footer menu:shop az.com',
			special_interaction_description: 'footer menu:shop az.com:' + linkName,
			event_type: 'special_interaction'
		});
    },

	s_trackFooterViewBySection: function(linkName) {
		utag.link({
			product_finding_method: 'footer menu:view by section',
			special_interaction_description: linkName,
			event_type: 'special_interaction'
		});
    },

	s_carouselInteraction: function(carouselItem) {
        utag.link({
            special_interaction_description: carouselItem,
			event_type: 'special_interaction'
        });
    },

	s_storeRebates: function(inStoreRebates) {
        utag.link({
            in_store_rebates: inStoreRebates,
			event_type: 'store_rebates'
        });
    },

	s_productZoom: function() {
		utag_data['product_zoom'] = 'yes';
    },

	s_specifiationCategory: function(categoryValue) {
        utag.link({
            vehicle_specification_category: categoryValue
        });
    },

	s_specifiationItem: function(itemValue) {
        utag.link({
            vehicle_specification_item: itemValue
        });
    },

	s_viewDetailsAndBuy: function(productId) {
		utag.link({
			event_type: 'view_details_and_buy',
			products: productId
		});
	},

	s_checkTheFit: function(productId) {
		utag.link({
			event_type: 'check_the_fit',
			products: productId
		});
	},

	s_removeUserAccount: function () {
		utag.link({
			event_type: 'remove_user_account'
		});
	},

	s_quickSubscribe: function(email, region) {
		utag.link({
			event_type: 'form_submission_quick_subscribe',
			email: email,
			special_interaction_description: 'email subscription:' + region
		});
	},

	s_serverSideErrorTracking: function(errorMsg) {
		utag.link({
			event_type: 'server_side_error_message',
			error_message: errorMsg
		});
    },

	// Need to add to requirements
	s_getStoreDirections: function(storeNo) {
		utag.link({
			event_type: 'click_get_store_directions',
			storeId: storeNo
		});
	},

   s_javaScriptError: function (msg, url, line, column, errorObj) {
    	var jsErrorMsg = 'Error: ' + msg + ' Script: ' + url + ' Line: ' + line + ' Column: ' + column;
        utag.link({
            Js_error: errorObj,
            link_text: jsErrorMsg,
            event_type: 'error_javascript'
        });
    },

    s_lookUpParts: function () {
	    utag.link({
	    	event_type: 'look_up_parts'
	    });
    },

    // TODO
	//offshore: Below in the commented out section are the additional functions needed for capturing events,eVars and props

	/*
	//triggered when the user has crossed 50% of the video time. 'videoName' represents the name of the currently accessed video
	s_video50: function(videoName) {
        utag.link({
            video_name: videoName,
			event_type: 'video_50'
        });
    },

	// on clicking any of the social media buttons on the site. 'socialMedia' is the name of the accessed site like facebook,twitter,etc
	s_socialMediaInteraction: function(socialMedia) {
        utag.link({
            social_channel: socialMedia,
			event_type: 'social_media'
        });
    },
	*/




    // TODO
    // The following are required events that are actually page load events that can be captured in the data layer.
    // We shouldn't have to implement in the front-end.

	//on load of all pages. 'hierValue' represents the breadcrumb display text. Please make sure the individual levels of the breadcrumb are separated by the '/' delimiter
    // Ex: "Home/Parts/Batteries,Starting And Charging/Batteries/Battery"
   	//Please don't populate the data layer variable 'page_hierarchy' in case no breadcrumb is present on the page.
    /*
    s_setHierarchy: function(hierValue) {
        utag_data['page_hierarchy'] = hierValue;
    },

    // PER Vijay, not required.
    //on load of all pages. 'shopRunnerFlag' represents if the current user is logged in as a shop runner customer/not.
	//set 'shopRunnerFlag' to true if the user is logged in as shop runner customer else false
	//if the shoprunner info can be obtained through cookies, please let us know the cookie name and other details so that we can handle it via tealium
	s_checkShopRunnerStatus: function(shopRunnerFlag) {
        utag_data['shop_runner'] = shopRunnerFlag;
    },

	// ONSHORE: moved vehicleCount to beforeContent.jsp where it is added to the data layer.
	*/


	//not in code
	s_navVideo: function () {
		if(typeof s.t === 'function'){
			s.t({eVar3: 'navVideo'});
		}
	},
	//not in code
	s_footerVideoLink: function () {
		if(typeof s.t === 'function'){
			s.t({eVar3: 'footerVideoLink'});
		}
	},
	//not in code
	s_chatShown: function () {
		if(typeof s.tl === 'function'){
			s.events = "event15";
			s.linkTrackVars = 'events';
			s.linkTrackEvents = 'event15';
			s.tl(true, 'o', "Chat Shown");
		}
	},
	//not in code
	s_abTest: function (test, onOff) {
		s.eVar70 = test + ":" + onOff;
		s.linkTrackVars = 'eVar70';
		s.tl(true, 'o', test);
	},
	//not in code
	s_trackLink: function (linkName) {
		s.eVar46 = linkName;
		s.prop34 = linkName;
		s.linkTrackVars = 'eVar46,prop34';
		s.tl(true, 'o', linkName);
	},
	//not in code
	s_trackViewDetailsBuy: function () {
		s.events = "event28";
		s.linkTrackVars = "events";
		s.linkTrackEvents = "event28";
		s.tl(true, 'o', 'View Details and Buy');
	}
};
