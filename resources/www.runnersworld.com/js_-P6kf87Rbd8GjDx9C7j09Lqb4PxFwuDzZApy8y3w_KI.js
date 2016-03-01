(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * Setup a series of event handlers for the video page that handle ajax interactions for
 * reloading data into parts of the page when a click event or drop down change event
 * occurs.
 */
jQuery(document).ready(function($) {

    /***********************************/
    /* Jquery event trapping functions */
    /***********************************/
    if (jQuery("body").hasClass("node-type-video")) {
        //User has selected a new filtering category in the drop down.
        jQuery("body").on("change", "#filter_by", function (event) {
            event.preventDefault();
            filter_video_grid_handler();
        });

        //User has entered a search term in the search box and clicked the magnifying glass button
        jQuery("body").on("click", "#submit", function (event) {
            event.preventDefault();
            search_video_grid_handler(event);
        });

        //User has clicked the load more button (still here for < Prevention sites)
        jQuery("body").on("click", "a#load-more-button", function (event) {
            event.preventDefault();
            load_more_videos_handler(event);
        });

        //User has clicked the title on a video in the video grid
        jQuery("body").on("click", "a#video-title-link", function (event) {
            event.preventDefault();   //absorb the actual click so we don't end up going to that URL.
            load_video_player_by_title_handler(event);
        });

        //User has clicked on a video thumbnail in the video grid
        jQuery("body").on("click", "a#thumbnail-id", function (event) {
            var item = jQuery(this);
            var clickedThumbnailLink = item.attr("href");
            event.preventDefault();   //absorb the actual click so we don't end up going to that URL.
            load_video_player_by_thumbnail_handler(clickedThumbnailLink);
        });

        //Avoid infinite scroll handling if there is a load more button present in the DOM (for non-infinite scroll sites).
        if (! jQuery("#load-more-button").length > 0) {
            jQuery(window).scroll(function () {
                if (jQuery(window).scrollTop() + jQuery(window).height() > jQuery(document).height() - 100) {
                    load_more_videos_handler();
                }
            });
        }
    }

    /**********************************/
    /* Jquery event handler functions */
    /**********************************/
    function load_video_player_by_title_handler(event) {
        var clickedVideoTitleLink = String(event.target);
        var node_path = clickedVideoTitleLink.substring(clickedVideoTitleLink.lastIndexOf('/') + 1);
        var ajaxUrl = window.location.protocol + '//' + window.location.host + '/video-play/' + node_path;

        $.ajax({
            type: "GET",
            url: ajaxUrl,
            dataType: "html",
            success: function(data) {
                jQuery('#video-header-player-container').html(data);

                //update the URL in the browser so bookmarking will be correct for the content just loaded via Ajax call.
                history.pushState({}, '', clickedVideoTitleLink);

                //refresh the ads at the bottom of the content well.
                if (jQuery('.channel_content_ads').length > 0) {
                    googletag.cmd.push(function() {
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

                //Scroll up to the video player we just loaded.
                jQuery('html, body').animate({
                    scrollTop: jQuery("#video-header-player-container").offset().top
                }, 200);

            }
        });
    }

    function load_video_player_by_thumbnail_handler(clickedThumbnailLink) {
        var node_path = clickedThumbnailLink.substring(clickedThumbnailLink.lastIndexOf('/') + 1);
        var ajaxUrl = window.location.protocol + '//' + window.location.host + '/video-play/' + node_path;

        $.ajax({
            type: "GET",
            url: ajaxUrl,
            dataType: "html",
            success: function(data) {
                jQuery('#video-header-player-container').html(data);

                //update the URL in the browser so bookmarking will be correct for the content just loaded via Ajax call.
                history.pushState({}, '', clickedThumbnailLink);

                //refresh the ads at the bottom of the content well.
                if (jQuery('.channel_content_ads').length > 0) {
                    googletag.cmd.push(function() {
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

                //TODO: Update og:image tags with the brightcove still image URL for the new video just loaded
                var ajaxMetaTagRefreshUrl = window.location.protocol + '//' + window.location.host + '/video-get-metatags/' + node_path;
                $.ajax({
                    type: "GET",
                    url: ajaxMetaTagRefreshUrl,
                    dataType: "text",
                    success: function(text) {
                        //NOTE: If we need to refresh more meta tags than just the og:image in the future you can build support
                        //for that here.
                        var new_video_brightcove_still_url = text;
                        jQuery("meta[name='og:image']").attr('content', new_video_brightcove_still_url);
                    }
                });
                //Scroll up to the video player we just loaded.
                jQuery('html, body').animate({
                    scrollTop: jQuery("#video-header-player-container").offset().top
                }, 200);
            }
        });
    }

    function filter_video_grid_handler() {
        var cur_search_term = '';
        Drupal.settings['zeus_video']['tid'] = jQuery( "#filter_by" ).val();
        Drupal.settings['zeus_video']['search_term'] = '';

        // Reset the load more counter
        Drupal.settings['zeus_video']['start_page'] = 0;

        var ajaxUrl = window.location.protocol + '//' + window.location.host + '/video-filter/' + jQuery( "#filter_by" ).val() + '//0';
        $.ajax({
            type: "GET",
            url: ajaxUrl,
            dataType: "html",
            success: function(data) {
                jQuery(".video-container" ).empty();

                if(data.length == 0) {
                    jQuery('.video-container').html('<h1 class="title">Unable to find any matching videos</H1>');
                } else {
                    jQuery('.video-container').html(data);
                }
                jQuery('#search_by').val('');   //clear out the search text box since we are now on a different filter condition

                //refresh the ads at the bottom of the content well.
                if (jQuery('.channel_content_ads').length > 0) {
                    googletag.cmd.push(function() {
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
            },
            error: function() {
                jQuery(".video-container" ).empty();
                jQuery('.video-container').html('<h1 class="1title">Unable to find any matching videos</H1>');
                jQuery('#search_by').val('');   //clear out the search text box since we are now on a different filter condition

                //refresh the ads at the bottom of the content well.
                if (jQuery('.channel_content_ads').length > 0) {
                    googletag.cmd.push(function() {
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
        });
        //Scroll up to the first row of search results we just loaded into the grid.
        jQuery(window).scrollTop(jQuery('.filtered').offset().top);
    }

    function search_video_grid_handler(event) {
        // Reset the load more counter
        Drupal.settings['zeus_video']['start_page'] = 0;

        var ajaxUrl = window.location.protocol + '//' + window.location.host + '/video-search/' + jQuery( "#search_by" ).val();
        $.ajax({
            type: "GET",
            url: ajaxUrl,
            dataType: "html",
            success: function(data) {
                jQuery('.video-container').empty();
                jQuery('.video-container').html(data);

                //reset filter category to "All Videos" After searching
                jQuery('select[name="filter_by"]').find('option[value="all"]').attr("selected",true);

                //refresh the ads at the bottom of the content well.
                if (jQuery('.channel_content_ads').length > 0) {
                    googletag.cmd.push(function() {
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

                //Scroll up to the first row of search results we just loaded into the grid.
                jQuery(window).scrollTop(jQuery('.filtered').offset().top);
            }
        });
    }

    function load_more_videos_handler(event) {
        if (jQuery('#loading-indicator').hasClass('loading')) {
            //we're already loading so bail
            return;
        } else {
            jQuery('#loading-indicator').addClass('loading');
        }

        jQuery('.video-container').append('<div class="loading-more"></div>');

        if (typeof Drupal.settings.zeus_video != 'undefined') {

            var cur_page = Drupal.settings['zeus_video']['start_page'];
            var cur_tid = jQuery('#filter_by').val();
            var cur_search_term = jQuery('#search_by').val();
            Drupal.settings['zeus_video']['tid'] = cur_tid;
            Drupal.settings['zeus_video']['search_term'] = cur_search_term;

            if (cur_page == null) {
                cur_page = 0;
            }
            if (cur_tid == null) {
                cur_tid = 'all';
            }
            if (cur_search_term == null || cur_search_term == '1') {
                cur_search_term = "none";
            }
        }

        cur_page++;
        var ajaxUrl = window.location.protocol + '//' + window.location.host + '/video-load-more/' + cur_tid + '/' + cur_search_term + '/' + cur_page;
        Drupal.settings['zeus_video']['start_page'] = cur_page;

        $.ajax({
            type: "GET",
            url: ajaxUrl,
            dataType: "html",
            success: function (data) {
                jQuery(".channel_content_ads").remove();  //remove the old ad content from below the old video grid content
                jQuery(".pager").remove();
                jQuery("#loading-indicator").remove();

                jQuery('.video-container').append(data);   //Append the next nine videos to the end of the video content grid.  The new load more button is part of that content.
                jQuery('#loading-indicator').removeClass('loading');

                if (cur_page >= 1) {
                    if (jQuery('.channel_content_ads').length > 0) {
                        jQuery(".channel_content_ads").insertAfter(".pager-load-more.page_" + cur_page);
                        if (jQuery("#loading-indicator").length > 0) {
                            googletag.cmd.push(function () {
                                slot1 = googletag.slots['video_page_bottom_banner'];
                                try {
                                    yieldbot.setSlotTargeting("dfp-ad-300x250_advertisement_bottom_channel", slot1);
                                }catch(e){}
                                googletag.pubads().refresh([slot1]);
                            });
                        } else {
                            googletag.cmd.push(function () {
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
                }

                jQuery( ".loading-more" ).remove();  //hide the loading more image
                Drupal.settings['zeus_video']['start_page'] = cur_page;
                cur_page++;
            },
            error: function() {
                jQuery( ".loading-more" ).remove();  //hide the loading more image
                jQuery(".video-container").append("<h1 class='title'>No additional videos to show</h1>");
            }
        });

    }

});
