$(document).ready(function () {

    $('#shoppingcart_container a').on('click', function () {
        var tabAssistNext = $(this).attr('tabindex');
        var timesRunOOS = 0;
        checkOOS = setInterval(function () {
            timesRunOOS += 1;

            if ($('#outofstock').length > 0) {
                $('#outofstock .message').prepend('<p class="screenreader OOS_overlay" tabindex="1">Attention</p><div class="screenreader OOS_overlay" tabindex="1">Attention</div>');
                $('#outofstock #outofstock_items td').each(function (i, v) {
                    $(v).contents().wrap('<span class="tabAssist" />')
                });
                $('#outofstock p').attr('tabindex', 1);
                $('#outofstock li').attr('tabindex', 1);
                $('#outofstock img').attr('tabindex', 1);
                $('#outofstock a').attr('tabindex', 1);
                $('#outofstock span').attr('tabindex', 1);
                $('.close_center a').attr('tabindex', 1);
                $('#outofstock a').parent('span').attr('tabindex', -1);
                $('#outofstock img').parent('span').attr('tabindex', -1);
                setTimeout(function () {
                    $('.OOS_overlay').focus();
                    //console.log('violin');
                }, 3000);
                $('.close_center a').on('click', function () {
                    location.reload();
                });
                //console.log('violin');
                clearInterval(checkOOS);
            } else if (timesRunOOS === 5) {
                clearInterval(checkOOS);
                //console.log('puggle');
            }
        }, 1000);
    });

    var timesRun = 0;
    checkSFS = setInterval(function () {
        timesRun += 1;
        
        if ($('#outofstock').length > 0) {
            $('#outofstock .message').prepend('<p class="screenreader OOS_overlay" tabindex="1">Attention</p><div class="screenreader OOS_overlay" tabindex="1">Attention</div>');
            $('#outofstock #outofstock_items td').each(function (i, v) {
                $(v).contents().wrap('<span class="tabAssist" />')
            });
            $('#outofstock p').attr('tabindex', 1);
            $('#outofstock li').attr('tabindex', 1);
            $('#outofstock img').attr('tabindex', 1);
            $('#outofstock a').attr('tabindex', 1);
            $('#outofstock span').attr('tabindex', 1);
            $('.close_center a').attr('tabindex', 1);
            $('#outofstock a').parent('span').attr('tabindex', -1);
            $('#outofstock img').parent('span').attr('tabindex', -1);
            setTimeout(function () {
                $('.OOS_overlay').focus();
                //console.log('violin');
            }, 3000);
            $('.close_center a').on('click', function () {
                location.reload();
            });
            //console.log('doodle');
            clearInterval(checkSFS);
        } else if (timesRun === 5) {
            clearInterval(checkSFS);
            //console.log('whippet');
        }
    }, 1000);
    

    $('body').find('a.screenreader.expand_menu').attr('href', 'javascript:void(0);');

    //Clearing alt text on search images
    var pname = window.location.pathname;

    if (pname.indexOf("_-_") >= 0) {
        $('#endeca_search_results li .quickViewButtonWrap a img').each(function (index) {
            $(this).attr('alt', '');
        });
        $('#endeca_search_results li .quickViewButtonWrap a').each(function (index) {
            $(this).attr('title', '');
        });
    }

    //Same page target test

    /*  $("body").on("click", "a[href^='#']", function (e) {
          e.preventDefault();
  
         // //console.log($(this).attr("href"));
         // //console.log($(this).attr("href").slice(1));
          // //console.log($(this).attr("href").next());
          var element = $("#" + $(this).attr("href").slice(1) + "")
          //console.log($(element));
         // //console.log($(element).find("[tabindex]"));
          //console.log($(element).find("[tabindex]")[0]);
          $(element).find("[tabindex]")[0].focus();
          
          $("#" + $(this).attr("href").slice(1) + "").focus();
          $(element).focus();
            
      });*/

    //Checkout test
    $('#billAddrViewPaneData.info_text').attr('tabindex', 600);
    $('#shipAddrViewPaneData.info_text').attr('tabindex', 700);
    $('#shipMethViewPaneData.info_text').attr('tabindex', 800);
    $('#payMethViewPaneData.info_text').attr('tabindex', 900);

    //header tabindex

    $('div#fb_iframe').attr('tabindex', -1);
    $('div#phone-tab p').attr('tabindex', -1);
    $('a[title="Submit Search"] img').attr('tabindex', -1);
    $('#searchform input#reduce_input_text_height').attr('tabindex', 1);

    $('a[href="#skiptomaincontent"]').focusout(function () {
        var spotlight1 = $('#spotlight').spotlight({ transition: 'slide', intervalLength: '8', rotate: true, mouseAction: 'hover' });

        $('#searchform input#reduce_input_text_height').attr('tabindex', 24);
        $('.slide_content ul li').find('a').focusin(function () {

            var focusSlide = $(this).parents('li').index();

            spotlight1.snapTo(focusSlide);
            spotlight1.pauseSlides();
        });
    });

    $('div#fb_iframe iframe').attr('tabindex', 2);
    $('a.social').attr('tabindex', 2);
    $('div#phone-tab').attr('tabindex', 3);
    $('div#phone-tab p').prepend('<a class="screenreader">Contact us at</a>');
    $('div#account-tab a').attr('tabindex', 10);

    $('#account-tab a').focusin(function () {
        $(this).parent('#account-tab').addClass('icon_hover');
    });

    $('#account-tab a').on('click', function () {
        $(this).parent('#account-tab').addClass('icon_hover');
    });

    $('#account-tab a').focusout(function () {
        $(this).parent('#account-tab').removeClass('icon_hover');
    });

    $('div#account-tab a').after('<a tabindex="10" class="screenreader expand_menu" title="Expand Account Menu">Expand Account Menu</a>');

    $('div#account-tab').parent('.fixedBarNav').find('.drop-inner.bg-pattern a').each(function () {
        $(this).attr('tabindex', 10);
    });
    /*
    $('div#account-tab').parent('.fixedBarNav').find('.drop-inner.bg-pattern:last-of-type').append('<a tabindex="11" class="screenreader close_menu" title="Close Account Menu">Close Account Menu</a>');
    */
    //$('div#account-tab').parent('.fixedBarNav').children('#acct-drop').last('.drop-inner.bg-pattern').find('a').after('<a tabindex="11" class="screenreader close_menu" title="Close Help Menu" href="javascript:void(0);">Close Help Menu</a>');

    $('div#account-tab').parent('.fixedBarNav').children('#acct-drop').children('.drop-inner.bg-pattern').last().find('a').after('<a tabindex="11" class="screenreader close_menu" title="Close Account Menu" href="javascript:void(0);">Close Account Menu</a>');

    $('.fixedBarNav a.expand_menu').focusin(function () {
        $(this).css({
            'position': 'relative',
            'left': '0px',
            'top': '0px',
            'width': 'auto',
            'height': 'auto',
            'border-radius': '5%',
            'background': '#fff',
            'color': '#000',
            'font-size': '12px'
        });
    });

    $('.fixedBarNav a.expand_menu').on('click', function () {
        $(this).css({
            'position': 'relative',
            'left': '0px',
            'top': '0px',
            'width': 'auto',
            'height': 'auto',
            'border-radius': '5%',
            'background': '#fff',
            'color': '#000',
            'font-size': '12px'
        });
    });

    $('.fixedBarNav a.expand_menu').focusout(function () {
        $(this).css({
            'height': '1px',
            'width': '1px',
            'top': 'auto',
            'left': '-10000px'
        });
    });
    
    $('div#help-tab a').attr('tabindex', 15);

    $('#help-tab a').focusin(function () {
        $(this).parent('#help-tab').addClass('icon_hover_help');
    });

    $('#help-tab a').on('click', function () {
        $(this).parent('#help-tab').addClass('icon_hover_help');
    });

    $('#help-tab a').focusout(function () {
        $(this).parent('#help-tab').removeClass('icon_hover_help');
    });

    $('div#help-tab a').after('<a tabindex="15" class="screenreader expand_menu" title="Expand Help Menu">Expand Help Menu</a>');
   
    $('#help-tab a.expand_menu').focusin(function () {
        $(this).css({
            'position': 'relative',
            'left': '0px',
            'top': '0px',
            'width': 'auto',
            'height': 'auto',
            'border-radius': '5%',
            'background': '#fff',
            'color': '#000',
            'font-size': '12px'
        });
    });

    $('#help-tab a.expand_menu').on('click', function () {
        $(this).css({
            'position': 'relative',
            'left': '0px',
            'top': '0px',
            'width': 'auto',
            'height': 'auto',
            'border-radius': '5%',
            'background': '#fff',
            'color': '#000',
            'font-size': '12px'
        });
    });

    $('#help-tab a.expand_menu').focusout(function () {
        $(this).css({
            'height': '1px',
            'width': '1px',
            'top': 'auto',
            'left': '-10000px'
        });
    });
    
    $('div#help-tab').parent('.fixedBarNav').find('.drop-inner.bg-pattern a').each(function () {
        $(this).attr('tabindex', 15);
    });
    /*
    $('div#help-tab').parent('.fixedBarNav').find('.drop-inner.bg-pattern:last-of-type').find('a').after('<a tabindex="15" class="screenreader close_menu" title="Close Help Menu" href="javascript:void(0);">Close Help Menu</a>');
    */
    //$('div#help-tab').parent('.fixedBarNav').children('#help-drop').last('.drop-inner.bg-pattern').find('a').after('<a tabindex="15" class="screenreader close_menu" title="Close Help Menu" href="javascript:void(0);">Close Help Menu</a>');

    $('div#help-tab').parent('.fixedBarNav').children('#help-drop').children('.drop-inner.bg-pattern').last().find('a').after('<a tabindex="15" class="screenreader close_menu" title="Close Help Menu" href="javascript:void(0);">Close Help Menu</a>');

    $('.fixedBarNav a.close_menu').focusin(function () {
        $(this).css({
            'position': 'relative',
            'left': '0px',
            'top': '0px',
            'width': '100%',
            'height': 'auto',
            'border-radius': '5%',
            'background': '#fff',
            'color': '#000',
            'font-size': '12px'
        });
    });

    $('.fixedBarNav a.close_menu').on('click', function () {
        $(this).css({
            'height': '1px',
            'width': '1px',
            'top': 'auto',
            'left': '-10000px'
        });
    });

    $('#help-tab a.close_menu').focusout(function () {
        $(this).css({
            'height': '1px',
            'width': '1px',
            'top': 'auto',
            'left': '-10000px'
        });
    });
    
    $('.fixedBarNav a.screenreader.expand_menu').on('click', function () {
        $(this).parents('.fixedBarNav').addClass('hover');
        $(this).parents('.fixedBarNav').find('.fixedBarDrop').addClass('hover');
    });

    $('.fixedBarNav a.screenreader.close_menu').on('click', function () {
        $(this).parents('.fixedBarNav').removeClass('hover');
        $(this).parents('.fixedBarNav').find('.fixedBarDrop').removeClass('hover');
    });

    $('div#welcome_area').children('span').attr('tabindex', 16);
    $('div#welcome_area').children('span').children('a').attr('tabindex', 16);
    $('#order_summary a[title="View Shopping Cart"]').attr('tabindex', 17);
    $('#logo.bg-sprite a img').attr('alt', '');
    $('.sticker_menu a.screenreader').removeAttr('href');

    $('.sticker_menu a.screenreader.close_menu').on('click', function () {
        //console.log("THREE");
        $(this).parents('.sticker_menu').removeClass('hover');
        $(this).parents('.sticker_menu').parent("li").removeClass('hover');
    });

    $('.sticker_menu a.screenreader.close_menu').keypress(function (e) {
        //console.log("one");
        if (e.keyCode == 13 || e.keyCode == 32) {
            $(this).parents('.sticker_menu').removeClass('hover');
            $(this).parents('.sticker_menu').parent("li").removeClass('hover');
        }

    });

    $('.navButtonApproved').parent().children('a.screenreader.expand_menu.smaller').attr('tabindex', 361);
    $('.navButtonApproved a').prepend('<a class="screenreader">Foot Locker Approved</a>');

    $('a#skiptomaincontent.screenreader_show').css({
        'width': '0px !important',
        'height': '0px !important',
        'background-color': 'transparent !important'
    });

    $('.sticker_menu input#locationInput').parent('.find_store').children('.email_submit_btn').attr('tabindex', 352);

    $('a#skiptomaincontent').text('Main Content');

    $('#global_Banner a').attr('tabindex', 500);

    $('#padded_wrapper a').attr('tabindex', 1000);

    //spotlight

    $('#spotlight').find('*').attr('tabindex', -1);
    $('.home_graphic_slide .screenreader .slideshow_previous').hide();
    $('.home_graphic_slide .screenreader .slideshow_next').hide();
    $('.slide_buttons.screenreader a').attr('tabindex', 500);
    $('.slide_buttons.screenreader p').attr('tabindex', 500);
    $('#spotlight .home_graphic_slide a').attr('tabindex', 501);

    //footer

    $('#fl_footer_container .footer_live_chat a').attr('tabindex', 9052);
    $('#fl_footer_container #fl_footer_col4 p.tel_num').attr('tabindex', 9078);
    $('#fl_footer_container #fl_footer_col4 p.tel_num').prepend('<a class="screenreader">Contact us at</a>');
    $('#fl_footer_container #fl_footer_col4 a').attr('tabindex', 9078);
    $('#fl_footer_container #fl_footer_col4 p.tel_num a').attr('tabindex', -1);
    $('#fl_footer_container #fl_footer_col4 input').attr('tabindex', 9078);
    $('#fl_footer_container #fl_footer_col4 img').attr('tabindex', 9078);
    $('#fl_footer_container .footer_email img').attr('title', 'Submit Email Address');
    $('#fl_footer_container #copyright_line').find('*').attr('tabindex', 9080);
    $('#fl_footer_container .footer-icons-slot a').attr('tabindex', 9081);
    $('#fl_footer_container .footer-icons-slot.margin-mod').attr('tabindex', '');
   
    //$('#fl_footer_container .footer_live_chat').attr('tabindex', -1);
    //$('#fl_footer_container .footer_live_chat').find('*').attr('tabindex', -1);
    $('#fl_footer_container .footer_live_chat').attr('tabindex', '');
    $('#fl_footer_container .footer_live_chat p').attr('tabindex', -1);
    $('#fl_footer_container .footer_live_chat span').attr('tabindex', 9052);
    $('#fl_footer_container #fl_footer_col4 p.vip_par').attr('tabindex', -1);
    $('#fl_footer_container #fl_footer_col4 p.tel_num a.screenreader').attr('tabindex', -1);
    $('#fl_footer_container #fl_footer_col4 a[title="Email Sign Up"] p').attr('tabindex', -1);
    $('#fl_footer_container #fl_footer_col4 span').parent('span').attr('tabindex', -1);
    $('#fl_footer_container .footer-icons-slot img').attr('tabindex', -1);
    $('#fl_footer_container #fl_footer_col4 p span br').parent('span').attr('tabindex', -1);
    $('#fl_footer_container #fl_footer_col4 #tab_assist').attr('tabindex', 9078);
    $('#fl_footer_container .footer-icons-slot.margin-mod img').attr('tabindex', '9081');

    //search page tabindex

    if ($('#endecaNav').length > 0) {
        $('a[href="#skiptomaincontent"]').after('<a class="screenreader skip" tabindex="2" href="#endecaNav">Skip to search filters</a><a class="screenreader skip" tabindex="2" href="#endeca_search_results">Skip to search results</a>');

        $('a.screenreader').focusin(function () {
            $(this).addClass('screenreader_show')
        });
        $('a.screenreader').on('click', function () {
            $(this).removeClass('screenreader_show')
        });
        $('a.screenreader').focusout(function () {
            $(this).removeClass('screenreader_show')
        });

        $('a.screenreader.skip').on('click', function () {
            setTimeout(function () {
                window.scrollTo(0, 200)
            }, 100);
        })

    }

    $('#endecaNav h3').attr('tabindex', 1000);
    $('#endecaNav .mainsite_guided_navigation a').attr('tabindex', 1000);
    $('#endecaResultsWrapper h3').attr('tabindex', 2000);
    $('#endecaResultsWrapper .mainsite_search_adjustments .searchResultsPaging').find('*').attr('tabindex', 2000);
    $('#endecaResultsWrapper .mainsite_record_listing #endeca_search_results ul li').find('*').attr('tabindex', 2000);
    $('#advanced-search-container ul li a').attr('tabindex', 1500);
    $('#advanced-search-container ul li iframe').attr('tabindex', 1500);
    $('#advanced-search-container ul li img').attr('tabindex', 1500);
    $('#advanced-search-container ul li p').attr('tabindex', 1500);
    $('#advanced-search-container ul li').find('*').attr('tabindex', 1500);
    $('#endecaResultsWrapper .mainsite_search_adjustments select#sortVal option').removeAttr('tabindex');

    setTimeout(function () {
        $('#endecaResultsWrapper .mainsite_record_listing #endeca_search_results ul li p img').attr('tabindex', -1);
        $('#endecaResultsWrapper .mainsite_record_listing #endeca_search_results ul li a img').attr('tabindex', -1);
        $('#endecaResultsWrapper .mainsite_record_listing #endeca_search_results ul li a.quickviewButton').attr('tabindex', -1);
        $('#endecaResultsWrapper .mainsite_record_listing #endeca_search_results ul li a.quickviewButton span').attr('tabindex', -1);
        $('#endecaResultsWrapper .mainsite_record_listing #endeca_search_results ul li a br').attr('tabindex', -1);
    }, 100);



    //Brands

    $('.mainsite_brands_navigation a').attr('tabindex', 550);


    //Gift Cards

    $('#gcmaincont img').attr('alt', 'Foot Locker Gift Cards the perfect gift');
    $('#gcmaincont h2').attr('tabindex', 550);
    $('#gcmaincont a').attr('tabindex', 550);
    $('#gcmaincont li').attr('tabindex', 550);
    $('#gcmaincont span').attr('tabindex', 550);

    if ($('a[title="View larger Gift Card image"]').length > 0) {
        $('a').attr('tabindex', 550);
        $('b').attr('tabindex', 550);
        $('input').attr('tabindex', 550);
        $('button').attr('tabindex', 550);
        $('font[face="Arial,Helv"]').each(function (i, v) {
            $(v).contents().wrap('<span class="tabAssist" />')
        });
        $('font span').attr('tabindex', 550);
        $('font span a').parent('span').attr('tabindex', -1);
        $('font span b').parent('span').attr('tabindex', -1);
        $('font span br').parent('span').attr('tabindex', -1);
    }
    if ($('a[title="View larger gift card image"]').length > 0) {
        $('a').attr('tabindex', 550);
        $('b').attr('tabindex', 550);
        $('input').attr('tabindex', 550);
        $('button').attr('tabindex', 550);
        $('font[face="Arial,Helv"]').each(function (i, v) {
            $(v).contents().wrap('<span class="tabAssist" />')
        });
        $('font span').attr('tabindex', 550);
        $('font span a').parent('span').attr('tabindex', -1);
        $('font span b').parent('span').attr('tabindex', -1);
        $('font span br').parent('span').attr('tabindex', -1);
    }


    //PDP tabindex
    //console.log('apple');

    $('div.breadCrumb').each(function (i, v) {
        $(v).contents().wrap('<span class="tabAssist" />')
    });
    $('div.breadCrumb span.tabAssist:last').attr('tabindex', 511);

    $('.rv_content ul li:first-child a.recentViewed').attr('tabindex', 513);
    $('.rv_content ul li:nth-child(2) a.recentViewed').attr('tabindex', 514);
    $('.rv_content ul li:nth-child(3) a.recentViewed').attr('tabindex', 515);
    $('.rv_content ul li:nth-child(4) a.recentViewed').attr('tabindex', 516);

    $('span.tab a[data-tab="reviews"]').on('click', function () {
        $('#pdp_tabContent_reviews .BVRRRatingNormalOutOf').attr('tabindex', 530);
        $('#pdp_tabContent_reviews img.BVRRRatingsHistogramButtonImage').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVRRRatingSummaryLinkWriteID a').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVRRReviewTitleContainer .BVRRValue.BVRRReviewTitle').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVRRReviewUserNicknameContainer .BVRRValue.BVRRUserNickname a').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVRRReviewDateContainer .BVRRValue.BVRRReviewDate').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVRRReviewText').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVRRReviewDisplayStyle5Footer a.BVRRSocialBookmarkingSharingLink.BVRRSocialBookmarkingSharingLinkFacebook').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVRRReviewDisplayStyle5Footer a.BVRRSocialBookmarkingSharingLink.BVRRSocialBookmarkingSharingLinkDelIcioUs').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVRRReviewDisplayStyle5Footer a.BVRRSocialBookmarkingSharingLink.BVRRSocialBookmarkingSharingLinkDigg').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVDI_FV .BVDI_FVPositive a.BVDILink.BVDIValue').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVDI_FV .BVDI_FVNegative a.BVDILink.BVDIValue').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVDI_FV .BVDI_FVReportLinkInappropriate a.BVDILink').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVRRPageLink.BVRRPreviousPage a').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVRRPageLink.BVRRNextPage a').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVRRPageLink.BVRRPageNumber a').attr('tabindex', 530);
        $('#pdp_tabContent_reviews .BVRRPageLink.BVRRSelectedPageNumber a').attr('tabindex', 530);
        //console.log('banana');
    });

    $('span.tab a[data-tab="sizing"]').on('click', function () {
        $('[data-info="fit_icon"] .heading').attr('tabindex', 535);
        $('[data-info="fit_icon"] img').attr('tabindex', 535);
        $('[data-info="fit_icon"] .fit_info_wrappers').attr('tabindex', 535);
        $('.size_header .hdr_right .heading').attr('tabindex', 537);
        $('.size_header .hdr_right .fit_copy').attr('tabindex', 537);
        $('.size_header .hdr_right a[title="View Our Fit Guarantee Policy"]').attr('tabindex', 537);
        $('.size_header .hdr_left .heading').attr('tabindex', 538);
        $('.size_table').attr('tabindex', 539);
        //console.log('cherry');
    });

    $('span.tab a[data-tab="questions"]').on('click', function () {
        $('.pdp_questions h1#BVQAHeaderTitleID').attr('tabindex', 550);
        $('.pdp_questions #BVQAHeaderID #BVQAQuestionAndAnswerCountID').attr('tabindex', 560);
        $('.pdp_questions h2#BVQAHeaderSubtitleID').attr('tabindex', 570);
        $('.pdp_questions #BVQAMainID .BVQASearchFormText input#BVQASearchFormTextInputID').attr('tabindex', 570);
        $('.pdp_questions #BVQAMainID .BVQASearchFormSubmit button#BVQASearchFormSubmitButtonID').attr('tabindex', 570);
        $('.pdp_questions #BVQAMainID .BVQAQuestionSummary a').attr('tabindex', 570);
        $('.pdp_questions #BVQAMainID .BVQAQuestionAnswerCount').attr('tabindex', 570);
        //console.log('durian');
    });
    
    $('span.tab a[data-tab="questions"]').each(function (i, v) {
        $(v).contents().wrap('<span aria-hidden="true" />')
    });
    $('span.tab a[data-tab="questions"]').prepend('<p class="screenreader">Questions and answers</p>');

    if ($('.pdp_wrapper').length > 0) {
        $('#dm_shiptohome, #dm_storepickup').attr('tabindex', '');
    };

    if ($('.pdp_wrapper').length > 0) {
        var altStyleCheck = 0;
        checkAltStyles = setInterval(function () {
            altStyleCheck += 1;
            if ($('.pdp_wrapper #product_styles span.group a').length > 0) {

                $('.pdp_wrapper #product_styles li.slideitem0 span.group a').attr('tabindex', 600);
                $('.pdp_wrapper #product_styles li.slideitem1 span.group a').attr('tabindex', 601);
                $('.pdp_wrapper #product_styles li.slideitem2 span.group a').attr('tabindex', 602);
                $('.pdp_wrapper #product_styles li.slideitem3 span.group a').attr('tabindex', 603);
                $('.pdp_wrapper #product_styles li.slideitem4 span.group a').attr('tabindex', 604);

                if ($('.pdp_wrapper #product_styles li.slideitem0 span.group a.selected').length > 0) {
                    $('.pdp_wrapper #product_styles .slide_buttons a.sl_next').attr('tabindex', 600);
                }
                if ($('.pdp_wrapper #product_styles li.slideitem1 span.group a.selected').length > 0) {
                    $('.pdp_wrapper #product_styles .slide_buttons a.sl_next').attr('tabindex', 601);
                }
                if ($('.pdp_wrapper #product_styles li.slideitem2 span.group a.selected').length > 0) {
                    $('.pdp_wrapper #product_styles .slide_buttons a.sl_next').attr('tabindex', 602);
                }
                if ($('.pdp_wrapper #product_styles li.slideitem3 span.group a.selected').length > 0) {
                    $('.pdp_wrapper #product_styles .slide_buttons a.sl_next').attr('tabindex', 603);
                }
                if ($('.pdp_wrapper #product_styles li.slideitem4 span.group a.selected').length > 0) {
                    $('.pdp_wrapper #product_styles .slide_buttons a.sl_next').attr('tabindex', 604);
                }
                clearInterval(checkAltStyles);
                //console.log('dingo');
            } else if (altStyleCheck === 5) {
                clearInterval(checkAltStyles);
                //console.log('sheila');
            }
        }, 1000);
    };

    $('.ratings_reviews[data-info="product_reviews"]').attr('tabindex', '-1');
    $('.messaging[data-info="product_messaging"]').attr('tabindex', '-1');

    
    setTimeout(function () {
        $('.messaging[data-info="product_messaging"] span').attr('tabindex', 710);
        $('.messaging[data-info="product_messaging"] a').attr('tabindex', 710);
        $('.messaging[data-info="product_messaging"] a.info_icon').attr('title', 'details');
        $('.messaging[data-info="product_messaging"] span a').parent('span').attr('tabindex', -1);
    }, 500);

    $('.pinnedDiv a.tabAssist').on('click', function () {
        
        setTimeout(function () {
            if ($('.messaging[data-info="product_messaging"] #boNoticeMessage').length > 0) {
                $('.messaging[data-info="product_messaging"] #boNoticeMessage').attr('tabindex', 710);
                $('.messaging[data-info="product_messaging"] #boNoticeMessage').attr('role', 'alert');
            }
        }, 300);
        
    });
    /*
    setTimeout(function () {
        $('#product_images img.loading_img').attr('tabindex', 564);
    }, 500);

    $('#product_images .slide_buttons a').on('click', function () {
        setTimeout(function () {
            $('#product_images img.loading_img').attr('tabindex', 564);
        }, 500);
    });
    */
    $('.sku_messaging').children('span.message').attr('tabindex', 597);
    $('.sku_messaging').children('span.message').children('span').attr('tabindex', 598);

    $('.other_styles a.selected').parent('span.group').children('a').each(function () {
        var otherStylesOrder = $(this).index();
        $(this).attr('tabindex', otherStylesOrder + 600);
    });


    if ($('.pdp_wrapper').length > 0) {
        setTimeout(function () {
            $('.recommendations[data-info="product_recommendations"] .heading').attr('tabindex', 6500);
            $('#mybuyszone2 a.product_image_link').attr('tabindex', 6500);
            $('#mybuyszone2 span.product_name a').attr('tabindex', 6500);
            $('#mybuyszone2 span.product_price a').attr('tabindex', 6500);
            $('#product_fit_info .heading').attr('tabindex', 6630);
            $('#product_fit_info img').attr('tabindex', 6640);
            //console.log('elderberry');
        }, 2000);
    }
    /*
    setTimeout(function () {
        $('#mybuyszone2 a.product_image_link').attr('tabindex', 650);
        $('#mybuyszone2 span.product_name a').attr('tabindex', 650);
        $('#mybuyszone2 span.product_price a').attr('tabindex', 650);
        //console.log('elderberry');
    }, 1000);
    */
    /*


*/
    if ($('.pdp_wrapper').length > 0) {
        setTimeout(function(){
            $('.info_icon').attr('tabindex', -1);
        }, 3000);
    }

    if ($('.pdp_wrapper').length > 0) {
        checkReviewsRightColumn = setInterval(function () {
            if ($('.ratings_reviews a').length > 0) {
                $('.ratings_reviews .BVRRRatingNormalImg img').attr('tabindex', 700);
                $('.ratings_reviews a').attr('tabindex', 700);
                $('.ratings_reviews .BVRRRatingsHistogramButtonScript img').attr('tabindex', 700);
                //console.log('ghost');
                clearInterval(checkReviewsRightColumn);
            } else {
                //console.log('fig');
            };

        }, 1000);
    }



    $('span.radio_btn input#deliveryMethod_shiptohome').attr('checked', 'checked');
    $('label#lbl_shiptohome').addClass('radio_checked');

    $('#select_size').attr('tabindex', -1);

    $('div#select_size').before('<p class="screenreader" tabindex="725" title="Tab to size and press enter to select a size">Tab to size and press enter to select a size</p>');

    $('div[data-info=product_sizes] #sizes option').each(function () {
        if (!($(this).hasClass('disabled'))) {
            var optionOrder = $(this).index() + 726;
            var optionTitle = $(this).attr('title');
            $('div#select_size').before('<a class="screenreader tabAssist" href="javascript:void(0);" title="' + optionTitle + '" tabindex="' + optionOrder + '"></a>');
        }
    });

    $('a.tabAssist').on('click', function () {
        var assistTitle = $(this).attr('title');
        $(this).parents('div.pinnedDiv').find('option[title="' + assistTitle + '"]').attr('selected', 'selected').trigger('change');
        setTimeout(function () {
            $('#deliveryMethod_shiptohome').focus();
        }, 300);
    });
    /*
    setTimeout(function () {
        $('div#product_images.spotlight').attr('tabindex', 564);
    }, 500);
    */
    setTimeout(function () {
        var pdpMainImgTxt = $('[data-info="product_images"] img.zoom_image').attr('alt');
        $('[data-info="product_images"]').before('<p class="screenreader" tabindex="564">' + pdpMainImgTxt + '</p>');
        $('.pdp_wrapper div.fb-like.fb_iframe_widget').attr('tabindex', 871);
    }, 1000);



  
    //PDP ISA overlay
    
    
    $('input#deliveryMethod_storepickup').on('change', function () {
        $('#lbl_storepickup').click();
        //console.log('frank');

        var pdpISAOrder = $('.delivery.top_item input[value="storepickup"]').attr('tabindex') + 1;

        setTimeout(function () {
            $('#storepickup input.informational').focus();
            $('#storepickup input.informational').attr('tabindex', pdpISAOrder);
        }, 750);
        
        $('#storepickup input.informational').on('change', function () {
            //console.log('florence');
            //setTimeout(function () {
                $('#storepickup p#storecount').each(function (i, v) {
                    $(v).contents().wrap('<span />')
                });
                $('#storepickup span').attr('tabindex', pdpISAOrder);
                $('#storepickup p').attr('tabindex', pdpISAOrder);
                $('#storepickup a').attr('tabindex', pdpISAOrder);
                $('#storepickup a').parent('p').attr('tabindex', -1);
                $('#storepickup a').parent('span').attr('tabindex', -1);
                $('#storepickup span').parent('span').attr('tabindex', -1);
                $('#storepickup a span').attr('tabindex', -1);
                $('#storepickup button span').attr('tabindex', -1);
            //}, 050);
                checkStoreList = setInterval(function () {
                    if ($('#storepickup #storelisting a').length > 0) {
                        $('#storepickup button').attr('tabindex', pdpISAOrder);
                        $('#storepickup select').attr('tabindex', pdpISAOrder);
                        $('#storepickup #storelisting a').attr('tabindex', pdpISAOrder);
                        $('#storepickup #storelisting p').attr('tabindex', pdpISAOrder);
                        $('#storepickup #storelisting span').attr('tabindex', pdpISAOrder);
                        $('#storepickup a').parent('p').attr('tabindex', -1);
                        $('#storepickup a').parent('span').attr('tabindex', -1);
                        $('#storepickup span').parent('p').attr('tabindex', -1);
                        $('#storepickup span').parent('span').attr('tabindex', -1);
                        $('#storepickup a span').attr('tabindex', -1);
                        $('#storepickup button span').attr('tabindex', -1);
                        $('#storepickup button').parent('span').attr('tabindex', -1);
                        clearInterval(checkStoreList);
                    }
            }, 500);
        });

        
        checkISA = setInterval(function () {
            
            if ($('#storepickup [data-btnname="isa_pickupHere"]').length > 0) {
                
                $('#storepickup span').attr('tabindex', pdpISAOrder);
                $('#storepickup input').attr('tabindex', pdpISAOrder);
                $('#storepickup label').attr('tabindex', pdpISAOrder);
                $('#storepickup button').attr('tabindex', pdpISAOrder);
                
                $('#storepickup p').attr('tabindex', pdpISAOrder);
                $('#storepickup select').attr('tabindex', pdpISAOrder);
                $('#storepickup a').attr('tabindex', pdpISAOrder);
                $('#storepickup #image img').attr('tabindex', pdpISAOrder);
                
                $('#storepickup button span').attr('tabindex', -1);
                $('#storepickup a span').attr('tabindex', -1);
               
                $('#storepickup .error').attr('tabindex', -1);
                $('#storepickup a').parents('p').attr('tabindex', -1);
                $('#storepickup a').parents('span').attr('tabindex', -1);
                $('#storepickup span').parents('span').attr('tabindex', -1);
                $('#storepickup span').parents('p').attr('tabindex', -1);
                $('#storepickup a span').attr('tabindex', -1);
                $('#storepickup button span').attr('tabindex', -1);
                
                //console.log('nancy');
                clearInterval(checkISA);
            } else {
                //console.log('elvis');
            }
        }, 1000);
        
        checkSTS = setInterval(function () {
            
            if ($('#storepickup #loc ul li p span a').length > 0) {
                $('#storepickup #shiptohome .sendtohome .method').each(function (i, v) {
                    $(v).contents().wrap('<span />')
                });
                $('#storepickup #loc ul li p span a').attr('tabindex', pdpISAOrder);
                $('#storepickup #loc ul li p').attr('tabindex', pdpISAOrder);
                $('#storepickup #loc ul li button').attr('tabindex', pdpISAOrder);
                $('#storepickup #loc span').attr('tabindex', pdpISAOrder);
                $('#storepickup #loc ul li a').parents('p').attr('tabindex', -1);
                $('#storepickup #loc ul li p.grid.title').attr('tabindex', -1);
                $('#storepickup #loc ul li p.icon').attr('tabindex', -1);
                $('#storepickup #loc ul li p').parents('p').attr('tabindex', -1);
                $('#storepickup span').parents('p').attr('tabindex', -1);
                $('#storepickup #loc ul li [data-btnname="isa_pickupHere"]').attr('title', 'Pickup here');
                $("#storepickup a, #storepickup [data-btnname='isa_pickuphere']").on("click", function () {
                    //console.log('leila');
                    var pdpIsaToMinicart = pdpISAOrder + 1;
                    checkMiniCart = setInterval(function () {
                        if ($('#miniAddToCartWrapper #miniAddToCart_header').length > 0) {
                            $('#miniAddToCartWrapper #miniAddToCart_header').each(function (i, v) {
                                $(v).contents().wrap('<span />')
                            });
                            $('#miniAddToCartWrapper #miniAddToCart_header').prepend('<a href="javascript:void(0);" class="screenreader" id="minicart_tabAssist">Mini Cart</a>');
                            $('#miniAddToCartWrapper #miniAddToCart_header a#minicart_tabAssist').focus();
                            $('#miniAddToCartWrapper #miniAddToCart_header a#minicart_tabAssist').css('border', '1px solid red');
                            //$('#inLineCartAdd').focus();
                            $('#inLineCartAdd a').attr('tabindex', pdpIsaToMinicart);
                            $('#inLineCartAdd h2').attr('tabindex', pdpIsaToMinicart);
                            $('#inLineCartAdd img').attr('tabindex', pdpIsaToMinicart);
                            $('#inLineCartAdd li').each(function (i, v) {
                                $(v).contents().wrap('<span />')
                            });
                            $('#inLineCartAdd div.miniAddToCart_productName').attr('tabindex', pdpIsaToMinicart);
                            $('#inLineCartAdd div.shoppingCart_freeShipping').attr('tabindex', pdpIsaToMinicart);
                            $('#inLineCartAdd span').attr('tabindex', pdpIsaToMinicart);
                            $('#inLineCartAdd .button span').attr('tabindex', -1);
                            $('#inLineCartAdd span span').parent('span').attr('tabindex', -1);
                            $('#inLineCartAdd span a').parent('span').attr('tabindex', -1);
                            $('#inLineCartAdd a#miniAddToCart_close').append('<p class="screenreader">mini cart</p>');
                            $('#inLineCartAdd a#miniAddToCart_close span.x').attr('title', 'close mini cart');
                            //console.log('quail');
                            clearInterval(checkMiniCart);
                        } else {
                            //console.log('ferret');
                        }

                    }, 500);

                });
                //console.log('guava');
                clearInterval(checkSTS);
            } else {
                //console.log('krakatoa');
            }
        }, 1000);

    });
    /*
    function addToCart(skip) {
        var errMsg = productFunctions.validateProduct();
        if (errMsg != "") {
            productFunctions.displayError($('[data-info=add_errors]'), '<ul>' + errMsg + '</ul>');
            $(errMsg).find('*').attr('tabindex', 896);
            $(errMsg).focus();
            return;
        } else {
            $('[data-info=add_errors]').empty();
        }

        if ($("#deliveryMethod_storepickup").is(":checked") && $("#pdp_storeNumber").val() == 0 && skip != 'skip') {
            launchStorePickupOverlay('pdp', isaPDPCallback, 0, 0);
            var pdpISAOrder = $('.delivery.top_item input[value="storepickup"]').attr('tabindex') + 1;
            setTimeout(function () {
                $('#storepickup span').attr('tabindex', pdpISAOrder);
                $('#storepickup input').attr('tabindex', pdpISAOrder);
                $('#storepickup label').attr('tabindex', pdpISAOrder);
                $('#storepickup button').attr('tabindex', pdpISAOrder);
                $('#storepickup p#storecount').parent('div.messaging').attr('tabindex', pdpISAOrder);
                $('#storepickup p').attr('tabindex', pdpISAOrder);
                $('#storepickup select').attr('tabindex', pdpISAOrder);
                $('#storepickup a').attr('tabindex', pdpISAOrder);
                $('#storepickup #storeListing ul').find('*').attr('tabindex', pdpISAOrder);
                $('#storepickup span.areis').attr('tabindex', -1);
                $('#storepickup span.ess').attr('tabindex', -1);
                $('#storepickup span.seemore.normal').attr('tabindex', -1);
                $('#storepickup span.num').attr('tabindex', -1);
                $('#storepickup button span').attr('tabindex', -1);
                $('#storepickup a span').attr('tabindex', -1);
                $('#storepickup p#storecount').attr('tabindex', -1);
                $('#storepickup a').parent('p').attr('tabindex', -1);
                $('#storepickup a').parent('span').attr('tabindex', -1);
                $('#storepickup a span').attr('tabindex', -1);
                $('#storepickup button span').attr('tabindex', -1);
                $('input.informational').focus();
                //console.log('honeydew');
            }, 1000);
            return;
        }

        disableToCartButton();
        if ($("#pdp_hasXYPromo").val() == "true") {
            //console.log('Has XY!');
            disableToCartButton();
            var formData = $('#product_form').serialize();
            var rawUrl = window.location.protocol + '//' + window.location.host + '/catalog/addToCart.cfm?';
            rawUrl += 'TID=' + $.cookie('read', 'TID');
            rawUrl += '&model_nbr=' + $('#pdp_model').val();
            rawUrl += '&URLADDENDUM=&id=0&mvp=&xyMessage=added&supercat=home&submit=yes';

            $('#order_summary_content').html("<strong>Adding item...</strong>");
            $.ajax({
                url: rawUrl,
                type: "POST",
                data: formData,
                error: function () {
                    $('#order_summary_content').html("<strong>Cart Error...</strong>");
                },
                success: function (data, textStatus) {
                    window.location = window.location.protocol + '//' + window.location.host + '/XYPromo/model:' + $('#pdp_model').val() + '/sku:' + $('#pdp_selectedSKU').val() + '/';
                }
            });
        } else {
            //console.log('No XY!');
            miniAddToCart.openMiniAddToCart("product_form")
        }



        enableToCartButton();
        //$.modal.close();

    }
    */
    $('#storepickup a#overlay_close').on('click', function () {
        $('#storepickup').find('*').removeAttr('tabindex');
    });

    $('#storepickup button[data-btnname="isa_pickupHere"]').on('click', function () {
        $('#storepickup').find('*').removeAttr('tabindex');
    });

    $('#storepickup button[data-btnname="isa_addToCart"]').on('click', function () {
        $('#storepickup').find('*').removeAttr('tabindex');
    });

    $('#storepickup button[data-btnname="isa_close"]').on('click', function () {
        $('#storepickup').find('*').removeAttr('tabindex');
    });


    $('.add_to_cart.bottom_item').children().on('click', function () {
        setTimeout(function () {
            if ($('div.[data-info="add_errors"] ul li').length > 0) {
                $('div.[data-info="add_errors"] ul li').each(function (i, v) {
                    $(v).contents().wrap('<span class="tabAssist" />');
                    $('div.[data-info="add_errors"] ul li span.tabAssist').attr('tabindex', 869);
                    $('div.[data-info="add_errors"] ul li span.tabAssist').focus();
                });
            }
        }, 300);
    });

    //Mini Cart test
    $(".right_column").on("click", "input", function () {
        //console.log("TEST");
        if ($(this).hasClass('processing')) {
            return;
        }
        setTimeout(function () {
            $('.pinnedDiv').blur();
            
            //console.log('sean');
        }, 100);

        var dontRunForever = 0
        checkMiniCart = setInterval(function () {
            dontRunForever += 1;
            if ($('#miniAddToCartWrapper #miniAddToCart_header').length > 0) {
                //$('#miniAddToCartWrapper #miniAddToCart_header').focus();
                $('#miniAddToCartWrapper #miniAddToCart_header').each(function (i, v) {
                    $(v).contents().wrap('<span />')
                });
                $('#miniAddToCartWrapper #miniAddToCart_header').prepend('<p class="screenreader" id="minicart_tabAssist">Mini Cart</p>');
                
                $('#inLineCartAdd p').attr('tabindex', 870);
                $('#miniAddToCartWrapper p#minicart_tabAssist').focus();
                //
                //if ($('#miniAddToCartWrapper #miniAddToCart_header span.error').length > 0) {
                  //  $('#miniAddToCartWrapper #miniAddToCart_header span.error').focus();
                //} else {
                  //  $('#miniAddToCartWrapper #miniAddToCart_header').first('span').focus();
                //}
                
                $('#inLineCartAdd a').attr('tabindex', 870);
                $('#inLineCartAdd h2').attr('tabindex', 870);
                $('#inLineCartAdd img').attr('tabindex', 870);
                $('#inLineCartAdd li').each(function (i, v) {
                    $(v).contents().wrap('<span />')
                });
                $('#inLineCartAdd div.miniAddToCart_productName').attr('tabindex', 870);
                $('#inLineCartAdd div.shoppingCart_freeShipping').attr('tabindex', 870);
                $('#inLineCartAdd span').attr('tabindex', 870);
                $('#inLineCartAdd .button span').attr('tabindex', -1);
                $('#inLineCartAdd span span').parent('span').attr('tabindex', -1);
                $('#inLineCartAdd span a').parent('span').attr('tabindex', -1);
                $('#inLineCartAdd a#miniAddToCart_close').append('<p class="screenreader">mini cart</p>');
                $('#inLineCartAdd a#miniAddToCart_close span.x').attr('title', 'close mini cart');
                $('span').each(function () {
                    var $this = $(this);
                    if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
                        $this.attr('tabindex', -1);
                });
                //console.log('robert');
                clearInterval(checkMiniCart);
            } else if (dontRunForever === 14) {
                //console.log('richard');
                clearInterval(checkMiniCart);
            }

        }, 500);
    });


    //mini cart test
    /*$(".right_column input[name='pdp_addtocart']").on("click", function () {
        var dontRunForever = 0
        checkMiniCart = setInterval(function () {
            dontRunForever += 1;
            if ($('#miniAddToCartWrapper #miniAddToCart_header').length > 0) {
                $('#miniAddToCartWrapper #miniAddToCart_header').each(function (i, v) {
                    $(v).contents().wrap('<span />')
                });
                $('#miniAddToCartWrapper #miniAddToCart_header').prepend('<a href="javascript:void(0);" class="screenreader" id="minicart_tabAssist">Mini Cart</a>');
                //$('#miniAddToCartWrapper #miniAddToCart_header').focus();
                $('#miniAddToCartWrapper #miniAddToCart_header a#minicart_tabAssist').focus();
                //$('#inLineCartAdd').focus();
                $('#inLineCartAdd a').attr('tabindex', 870);
                $('#inLineCartAdd h2').attr('tabindex', 870);
                $('#inLineCartAdd img').attr('tabindex', 870);
                $('#inLineCartAdd li').each(function (i, v) {
                    $(v).contents().wrap('<span />')
                });
                $('#inLineCartAdd div.miniAddToCart_productName').attr('tabindex', 870);
                $('#inLineCartAdd div.shoppingCart_freeShipping').attr('tabindex', 870);
                $('#inLineCartAdd span').attr('tabindex', 870);
                $('#inLineCartAdd .button span').attr('tabindex', -1);
                $('#inLineCartAdd span span').parent('span').attr('tabindex', -1);
                $('#inLineCartAdd span a').parent('span').attr('tabindex', -1);
                $('#inLineCartAdd a#miniAddToCart_close').append('<p class="screenreader">mini cart</p>');
                $('#inLineCartAdd a#miniAddToCart_close span.x').attr('title', 'close mini cart');
                if ($('.pinnedDiv:focus').length > 0) { alert('wrong way'); }
                //console.log('robert');
                clearInterval(checkMiniCart);
            } else if (dontRunForever === 14) {
                //console.log('richard');
                clearInterval(checkMiniCart);
            }

        }, 500);

        

    });*/
    //mini cart from ISA

    $("body").on("click", "#storepickup_ShiptoHome .cta_button", function () {
        setTimeout(function () {
            $("#miniAddToCart_header").attr("tabindex", 871);
            $("#miniAddToCart_actions .button").attr("tabindex", 871);
            $('#miniAddToCartWrapper #miniAddToCart_header').focus();
            //console.log('lemon');
            $("#miniAddToCart_actions").find('*').on('click', "onCloseButtonClick('top')");
            $("#miniAddToCart_actions").find('*').on('click', function () {
                //console.log('lion');
            });
        }, 5000);

    });



    $('#addToWishlist.add_to_wishlist').children().on('click', function () {
        var wlOverlayOrder = $('input#pdp_addtowishlist').attr('tabindex') + 1;
        setTimeout(function () {
            $('#ws_login_container').find('*').attr('tabindex', wlOverlayOrder);
            $('#ws_login_container').focus();
            //console.log('melon');
        }, 1000);
    });

    $('.product_styles div ul li a').on('click', function () {
        var findStyleThumb = $(this).attr('[data-sku]');
        $('.product_styles div ul li a').attr('[data-sku]', findStyleThumb).focus();
        //console.log('naranja');
    });

    //click to zoom

    setTimeout(function () {
        $('a.screenreader.zoomBtn').remove();
        $('#open_pushdown').on('click', function () {
            setTimeout(function () {
                $('.full_screen_header a.close_btn').attr('tabindex', 548);
                $('.full_screen_header #zoomIn').attr('tabindex', 547);
                $('.full_screen_header #zoomOut').attr('tabindex', 546);
                $('.full_screen_header #zoomOut').focus();
                $('.full_screen_header .alt_views').attr('tabindex', 549);
                //console.log('papaya');
            }, 500);
        });
        $('a#open_pushdown').after('<a class="screenreader" id="zoomInBtn" tabindex="550" href="javascript:void(0);" title="Zoom In">Zoom In</a><a class="screenreader" id="zoomOutBtn" tabindex="550" href="javascript:void(0);" title="Zoom Out">Zoom Out</a>');
        var currentZoom = 1;
        var maxZoom = 4;
        $('a#zoomInBtn').on('click', function () {
            if (currentZoom + 1 > maxZoom) {
                currentZoom = 1;
            } else {
                currentZoom++;
            }

            var zoomHeight = currentZoom * 500;
            var zoomWidth = currentZoom * 500;

            $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').css({
                'height': zoomHeight,
                'width': zoomWidth
            });
            $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('src', $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('data-zoomsrc') + '?hei=' + zoomHeight + '&wid=' + zoomWidth);

            $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.loading_img').css({
                'height': zoomHeight,
                'width': zoomWidth
            });

            if (currentZoom == maxZoom) {
                $('#product_images .alt_view').attr('data-zoom', 'out');
                $('a.zoomBtn').attr('title', 'Zoom Out').html('Zoom out');
                $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').animate({
                    'top': -(zoomHeight / 4),
                    'left': -(zoomWidth / 4)
                }, 200);
            } else if (currentZoom == 1) {
                $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').animate({
                    'top': 0,
                    'left': 0
                }, 200);
            } else {
                $('#product_images .alt_view').attr('data-zoom', 'in');
                $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').animate({
                    'top': -(zoomHeight / 4),
                    'left': -(zoomWidth / 4)
                }, 200);
            }
            //console.log('quince');
        });
        $('a#zoomOutBtn').on('click', function () {
            if (currentZoom - 1 > maxZoom) {
                currentZoom = 1;
            } else {
                currentZoom--;
            }
            var zoomHeight = currentZoom * 500;
            var zoomWidth = currentZoom * 500;

            $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').css({
                'height': zoomHeight,
                'width': zoomWidth
            });
            $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('src', $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.zoom_image').attr('data-zoomsrc') + '?hei=' + zoomHeight + '&wid=' + zoomWidth);

            $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').children('img.loading_img').css({
                'height': zoomHeight,
                'width': zoomWidth
            });

            if (currentZoom == maxZoom) {
                $('#product_images .alt_view').attr('data-zoom', 'out');
                $('a.zoomBtn').attr('title', 'Zoom Out').html('Zoom out');
                $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').animate({
                    'top': -(zoomHeight / 4),
                    'left': -(zoomWidth / 4)
                }, 200);
            } else if (currentZoom == 1) {
                $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').animate({
                    'top': 0,
                    'left': 0
                }, 200);
            } else {
                $('#product_images .alt_view').attr('data-zoom', 'in');
                $('#product_images .alt_view').children('.mouse_follow').children('.zoom_images').animate({
                    'top': -(zoomHeight / 4),
                    'left': -(zoomWidth / 4)
                }, 200);
               
            } //console.log('raspberry');
        });
        //console.log('stawberry');
    }, 1000);

    var productSizeImgTitle = $('#product_fit_info img').attr('tabindex');
    $('#product_fit_info img').attr('title', productSizeImgTitle);

    //cart tabindex	

    //console.log('zimbabwe');

    $('#shoppingcart_container #cartAction_top a.button').attr('tabindex', 550);

    $('#shoppingcart_container tr.lineitem').each(function () {
        var shopCartOrder = $(this).index() + 550;

        $(this).find('td.itemInfo h4 a').attr('tabindex', shopCartOrder);

        $(this).find('td.itemInfo .attributes').each(function (i, v) {
            $(v).contents().wrap('<span />')
        });
        $(this).find('td.itemInfo .attributes span').attr('tabindex', shopCartOrder);

        $(this).find('td.itemInfo .shipfromstore_restriction_message').attr('tabindex', shopCartOrder);
        $(this).find('td.itemInfo .shipping_restriction_message').attr('tabindex', shopCartOrder);
        $(this).find('td.itemInfo .excluded').attr('tabindex', shopCartOrder);
        $(this).find('td.itemStoreInfo h4 input').attr('tabindex', shopCartOrder);
        $(this).find('td.itemStoreInfo h4 label').attr('tabindex', -1);
        $(this).find('td.itemStoreInfo h4').attr('tabindex', -1);
        $(this).find('td.itemStoreInfo h4 .normal a').attr('tabindex', shopCartOrder);
        $(this).find('td.itemStoreInfo .itemStoreInfo_fob:last').each(function (i, v) {
            $(v).contents().wrap('<span />')
        });
        $(this).find('td.itemStoreInfo .itemStoreInfo_fob span').parent('span').attr('tabindex', -1);

        $(this).find('td.itemStoreInfo .itemStoreInfo_fob span').attr('tabindex', shopCartOrder);
        $(this).find('td.itemStoreInfo .itemStoreInfo_fob a').attr('tabindex', shopCartOrder);
		
		if ($(this).find('td.itemStoreInfo #itemEmailDeliveryPrice').length > 0) {
			$(this).find('td.itemStoreInfo div').each(function (i, v) {
				$(v).contents().wrap('<span />')
			});
			$(this).find('td.itemStoreInfo div span').attr('tabindex', shopCartOrder);
			$(this).find('td.itemStoreInfo div strong').attr('tabindex', -1);
			//$(this).find('td.itemStoreInfo div span.red').attr('tabindex', -1);
			$(this).find('td.itemStoreInfo div br').parent('span').attr('tabindex', -1);

			$(this).find('td.itemActions').each(function (i, v) {
			    $(v).contents().wrap('<span />')
			});
			$(this).find('td.itemActions span').attr('tabindex', shopCartOrder);
			$(this).find('td.itemActions br').parent('span').attr('tabindex', -1);
			$(this).find('td.itemActions input').parent('span').attr('tabindex', -1);
			$(this).find('td.itemActions a').parent('span').attr('tabindex', -1);
		}
        $(this).find('td.itemStoreInfo .itemStoreInfo_fob a').parent('span').attr('tabindex', -1);
        $(this).find('td.itemStoreInfo .itemStoreInfo_fob').attr('tabindex', -1);
        $(this).find('td.itemActions input').attr('tabindex', shopCartOrder);
        $(this).find('td.itemActions a').attr('tabindex', shopCartOrder);
        $(this).find('td.itemActions nobr div').attr('tabindex', -1);
        $(this).find('td.itemPrice').each(function (i, v) {
            $(v).contents().wrap('<span />')
        });

        $(this).find('td.itemPrice span').attr('tabindex', shopCartOrder);
        $(this).find('td.itemPrice span').parent('span').attr('tabindex', -1);

        $(this).find('td.itemPrice span.sale').each(function (i, v) {
            $(v).contents().wrap('<span />')
        });

        $(this).find('td.itemPrice span.sale span').attr('tabindex', shopCartOrder);
        $(this).find('td.itemPrice span.sale span').parent('span').attr('tabindex', -1);
        $(this).find('td.itemPrice span.sale br').parent('span').attr('tabindex', -1);

        $(this).find('td.itemTotal').each(function (i, v) {
            $(v).contents().wrap('<span />')
        });
        $(this).find('td.itemTotal span').attr('tabindex', shopCartOrder);
        $(this).find('input[type="radio"]').attr('tabindex', shopCartOrder);
        $('span').each(function () {
            var $this = $(this);
            if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
                $this.attr('tabindex', -1);
        });
    });

    $('#shoppingcart_items .itemStoreInfo input').on('click', function () {
        setTimeout(function () {
            /*$('#storepickup .content.grey input').one('keydown', function () {
                $(this).attr('value', '');
            });*/
            //console.log('france');
        }, 500);
    });

    $('#shoppingcart_items .itemStoreInfo_fob a').on('click', function () {

        var shopCartStorePickup = $(this).attr('tabindex') - 1;
        setTimeout(function () {
            $('#storepickup p#storecount').each(function (i, v) {
                $(v).contents().wrap('<span />')
            });

            $('#storepickup span').attr('tabindex', shopCartStorePickup);
            $('#storepickup input').attr('tabindex', shopCartStorePickup);
            $('#storepickup label').attr('tabindex', shopCartStorePickup);
            $('#storepickup button').attr('tabindex', shopCartStorePickup);
            //$('#storepickup p#storecount').parent('div.messaging').attr('tabindex', shopCartStorePickup);
            $('#storepickup p').attr('tabindex', shopCartStorePickup);
            $('#storepickup select').attr('tabindex', shopCartStorePickup);
            $('#storepickup a').attr('tabindex', shopCartStorePickup);
            $('#storepickup #storeListing ul').find('*').attr('tabindex', shopCartStorePickup);
            //$('#storepickup span.areis').attr('tabindex', -1);
            //$('#storepickup span.ess').attr('tabindex', -1);
            //$('#storepickup span.seemore.normal').attr('tabindex', -1);
            //$('#storepickup span.num').attr('tabindex', -1);
            $('#storepickup button span').attr('tabindex', -1);
            $('#storepickup a span').attr('tabindex', -1);
            //$('#storepickup p#storecount').attr('tabindex', -1);
            $('#storepickup a').parent('p').attr('tabindex', -1);
            $('#storepickup a').parent('span').attr('tabindex', -1);
            $('#storepickup span').parent('span').attr('tabindex', -1);
            $('#storepickup a span').attr('tabindex', -1);
            $('#storepickup button span').attr('tabindex', -1);
            $('input.informational').focus();
            //console.log('zambia');
        }, 2000);
    });

    $('#shoppingcart_container br').parent('span').attr('tabindex', -1);
    $('#shoppingcart_container span:empty:only-child').attr('tabindex', -1);
    $('[type="hidden"]').parent('span').attr('tabindex', -1);

    setTimeout(function () {
        $('#ymal_wrapper #mybuyspagezone1 td span').first().each(function (i, v) {
            $(v).contents().wrap('<span />')
        });
        $('#ymal_wrapper #mybuyspagezone1 td > span > span').attr('tabindex', 7000);
        $('#ymal_wrapper #mybuyspagezone1 td > span br').parent('span').attr('tabindex', -1);
        $('#ymal_wrapper #mybuyspagezone1 span.mbimgspan a').each(function () {
            var addTitleAccs = $(this).children('img').attr('alt');
            $(this).attr('title', addTitleAccs);
        });
        $('#ymal_wrapper #mybuyspagezone1 span.mbimgspan a').attr('tabindex', 7000);
        $('#ymal_wrapper #mybuyspagezone1 span.mbimgspan a img').attr('tabindex', -1);
        $('#ymal_wrapper #mybuyspagezone1 span.mbnamerowspan a').attr('tabindex', 7000);
        $('#ymal_wrapper #mybuyspagezone1 span.mbpricerowspan a').attr('tabindex', 7000);
        $('#ymal_wrapper #mybuyspagezone1 span.mblistrowspan a').attr('tabindex', 7000);
        $('#ymal_wrapper #mybuyspagezone1 span.mbsalerowspan a').attr('tabindex', 7000);
        //console.log('yugoslavia');
    }, 1000);

    setTimeout(function () {
        $('#rvcarousel .rvzone td:first-of-type span').attr('tabindex', 8000);
        $('#rvcarousel .rvzone span.rvimgspan a').attr('tabindex', 8000);
        $('#rvcarousel .rvzone span.rvnamerowspan a').attr('tabindex', 8000);
        $('#rvcarousel .rvzone span.rvpricerowspan a').attr('tabindex', 8000);
        $('#rvcarousel .rvzone span.rvlistrowspan a').attr('tabindex', 8000);
        $('#rvcarousel .rvzone span.rvsalerowspan a').attr('tabindex', 8000);
        //console.log('yemen');
    }, 1000);

    //cart empty
    $('table.content_area a').attr('tabindex', 8999);
    $('table.content_area p').attr('tabindex', 8999);
    $('table.content_area b').attr('tabindex', 8999);

});

//pdp isa overlay
/*
$('#lbl_storepickup').on('click', function () {
    var pdpISAOrder = $('.delivery.top_item input[value="storepickup"]').attr('tabindex') + 1;
    setTimeout(function () {
        $('#storepickup span').attr('tabindex', pdpISAOrder);
        $('#storepickup input').attr('tabindex', pdpISAOrder);
        $('#storepickup label').attr('tabindex', pdpISAOrder);
        $('#storepickup button').attr('tabindex', pdpISAOrder);
        $('#storepickup p#storecount').parent('div.messaging').attr('tabindex', pdpISAOrder);
        $('#storepickup p').attr('tabindex', pdpISAOrder);
        $('#storepickup select').attr('tabindex', pdpISAOrder);
        $('#storepickup a').attr('tabindex', pdpISAOrder);
        $('#storepickup #storeListing ul').find('*').attr('tabindex', pdpISAOrder);
        $('#storepickup span.areis').attr('tabindex', -1);
        $('#storepickup span.ess').attr('tabindex', -1);
        $('#storepickup span.seemore.normal').attr('tabindex', -1);
        $('#storepickup span.num').attr('tabindex', -1);
        $('#storepickup button span').attr('tabindex', -1);
        $('#storepickup a span').attr('tabindex', -1);
        $('#storepickup p#storecount').attr('tabindex', -1);
        $('#storepickup a').parent('p').attr('tabindex', -1);
        $('#storepickup a').parent('span').attr('tabindex', -1);
        $('#storepickup a span').attr('tabindex', -1);
        $('#storepickup button span').attr('tabindex', -1);
        $('input.informational').focus();
        //console.log('trout');
    }, 2000);
})
*/

function cartStorePickupOverlay(lineItemSKU, lineItemSize, lineItemQty, lineItemID, calledFrom) {


    var parentOffset = '';
    var offsetTop = 0;
    document.shoppingCartForm.sku.value = lineItemSKU;
    document.shoppingCartForm.QV_size.value = lineItemSize;
    document.shoppingCartForm.QV_quantity.value = lineItemQty;
    document.shoppingCartForm.overlayLineItemId.value = lineItemID;
    // since they clicked on the select store link, punch the correct radio button as well
    $('#radioShipOption_' + lineItemID).each(function () {
        if ($(this).attr('value') == 'STORE') {
            $(this).attr('checked', true);

            var shopCartStorePickup = $(this).parents('.itemStoreInfo').find('.itemStoreInfo_fob a').attr('tabindex');
            $('#storepickup').find('span').attr('tabindex', shopCartStorePickup);
            $('#storepickup').find('input').attr('tabindex', shopCartStorePickup);
            $('#storepickup').find('label').attr('tabindex', shopCartStorePickup);
            $('#storepickup').find('button').attr('tabindex', shopCartStorePickup);
            $('#storepickup').find('p').attr('tabindex', shopCartStorePickup);
            $('#storepickup').find('select').attr('tabindex', shopCartStorePickup);
            $('#storepickup').find('a').attr('tabindex', shopCartStorePickup);
            //$('input[name="location"]').focus();
            $('#storepickup').focus();

            parentOffset = $(this).offset();
            offsetTop = parentOffset.top;
        }
    })
    launchStorePickupOverlay('cart', cartStorePickupOverlayCallback, offsetTop, 0);
    switch (calledFrom) {
        case "changeStoreLink":
            cmCreateConversionEventTag("Change Store", 2, "Shopping Cart");
            break;
        case "selectStoreLink":
        case "storePickupRadio":
            cmCreateElementTag("StorePickup", "Shopping Cart", "");
            break;
    }
    cmCreateConversionEventTag("ISAStorePickup", 1, "Shopping Cart");
    registerConversionEvent("Shopping Cart", "ISAStorePickup");
}

if ($('.pdp_wrapper .product_info div').length > 0) {
    $(this).children().attr('tabindex', 597);
    $('.pdp_wrapper .product_info span.message a').attr('tabindex', 598);
}

setTimeout(function () {
    $('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm div').attr('tabindex', 5000);
    //console.log('wakanda');
}, 500);

$('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm h6').attr('tabindex', 5000);
$('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm form ol li').children('*').attr('tabindex', 5000);
$('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm #estimator_submit a.button').attr('tabindex', 5000);
$('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm #estimator_submit a.button').parent('#estimator_submit').attr('tabindex', -1);

$('#shoppingcart_container #cartTotalestimatorValues tr').children().each(function (i, v) {
    $(v).contents().wrap('<span />')
});
$('#shoppingcart_container #cartTotalestimatorValues tr span').attr('tabindex', 6000);
$('#shoppingcart_container #shoppingcart_bottom #cartAction_bottom a.button').attr('tabindex', 6500);


$('#cartTotalEstimator #cartTotalEstimatorLeftColumn select#estimator_country').change(function () {
    setTimeout(function () {
        $('#cartTotalEstimator #cartTotalEstimatorLeftColumn a#countryNotListed').focus();

        $('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm h6').attr('tabindex', 5000);
        $('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm div').attr('tabindex', 5000);
        $('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm form ol li').children('*').attr('tabindex', 5000);
        $('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm #estimator_submit a.button').attr('tabindex', 5000);
        $('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm #estimator_submit a.button').parent('#estimator_submit').attr('tabindex', -1);

        if ($('#shoppingcart_container #cartTotalestimatorValues tr span').length <= 0) {
            $('#shoppingcart_container #cartTotalestimatorValues tr').children().each(function (i, v) {
                $(v).contents().wrap('<span />')
            });
            $('#shoppingcart_container #cartTotalestimatorValues tr span').attr('tabindex', 6000);
            $('#shoppingcart_container #shoppingcart_bottom #cartAction_bottom a.button').attr('tabindex', 6500);
        }
        $('span').each(function () {
            var $this = $(this);
            if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
                $this.attr('tabindex', -1);
        });
        //console.log('vietnam');
    }, 3000);
});

$('#cartTotalEstimator #cartTotalEstimatorLeftColumn [data-btnname="cart_calculate"]').on('click', function () {
    setTimeout(function () {

        $('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm div').attr('tabindex', 5000);
        $('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm h6').attr('tabindex', 5000);
        $('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm form ol li').children('*').attr('tabindex', 5000);
        $('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm #estimator_submit a.button').attr('tabindex', 5000);
        $('#shoppingcart_container #cartTotalEstimator #cartTotalEstimatorForm #estimator_submit a.button').parent('#estimator_submit').attr('tabindex', -1);

        if ($('#shoppingcart_container #cartTotalestimatorValues tr span').length <= 0) {

            $('#shoppingcart_container #cartTotalestimatorValues tr').children().each(function (i, v) {
                $(v).contents().wrap('<span />')
            });
            $('#shoppingcart_container #cartTotalestimatorValues tr span').attr('tabindex', 6000);
            $('#shoppingcart_container #shoppingcart_bottom #cartAction_bottom a.button').attr('tabindex', 6500);
        }
        $('span').each(function () {
            var $this = $(this);
            if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
                $this.attr('tabindex', -1);
        });
        //console.log('venezuela');
    }, 3000);
});
/** Screenreader Expand Nav Functionality **/

$(document).ready(function (e) {
    $('a.screenreader.expand_menu').on('click', function () {
        $('li').removeClass('hover');
        $('li').children('.sticker_menu').removeClass('hover');
        $(this).parent('li').addClass('hover');
        $(this).parent('li').children('.sticker_menu').addClass('hover');
    });
    $('a.screenreader.close_menu').on('click', function () {
        $(this).parents('li').removeClass('hover');
        $(this).parents('li').children('.sticker_menu').removeClass('hover');
    });

    $('a.screenreader.expand_menu').keypress(function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            $('li').removeClass('hover');
            $('li').children('.sticker_menu').removeClass('hover');
            $(this).parents('.fixedBarNav').addClass('hover');
            $(this).parents('.fixedBarNav').find('.fixedBarDrop').addClass('hover');
        }

    });
    $('.fixedBarNav a.screenreader.close_menu').keypress(function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            $(this).parents('.fixedBarNav').removeClass('hover');
            $(this).parents('.fixedBarNav').find('.fixedBarDrop').removeClass('hover');
            $('a.screenreader.close_menu').css({
           'height': '1px',
           'width': '1px',
           'top': 'auto',
           'left': '-10000px'
            
            });
          
        }
    });

    $('a.screenreader').focusin(function () {
        $(this).addClass('screenreader_show')
    });
    $('a.screenreader').on('click', function () {
        $(this).removeClass('screenreader_show')
    });
    $('a.screenreader').focusout(function () {
        $(this).removeClass('screenreader_show')
    });


});
$('a[href="#skiptomaincontent"]').before('<div class="screenreader" id="notLoadedYet">Loading</div><p class="screenreader" id="notLoaded">Loading</p>');
$('p#notLoaded').attr('role', 'alert').attr('aria-live', 'assertive');
$('div#notLoadedYet').attr('role', 'alert').attr('aria-live', 'assertive');
var fiveSecRule = 0
checkPageLoad = setInterval(function () {
    fiveSecRule += 1;
    if ($('p#loadAssist').length > 0) {
        clearInterval(checkPageLoad);
    } else if (fiveSecRule === 20) {
        clearInterval(checkPageLoad);
    }
}, 1000);
window.onload = function () {
    //console.log('hi');
    $('div#notLoadedYet').remove();
    $('p#notLoaded').remove();
    $('a[href="#skiptomaincontent"]').before('<div class="screenreader" id="pageLoaded">Page is loaded</div><p class="screenreader" id="loadAssist">Page is loaded</p>');
    $('p#loadAssist').attr('role', 'alert').attr('aria-live', 'assertive');
    $('div#pageLoaded').attr('role', 'alert').attr('aria-live', 'assertive');
    $('option').removeAttr('tabindex');
    setTimeout(function () {
        $('p#loadAssist').remove();
        $('div#pageLoaded').remove();
        if ($('#endecaNav').length < 0) {
            $('input#reduce_input_text_height').focus();
        }
    }, 2000);
};
/*

$('a[href="#skiptomaincontent"]').before('<a href="javascript:void(0);" class="screenreader" id="notLoaded" tabindex="1">Loading</a>');
$('a#notLoaded').attr('role', 'alert');
var fiveSecRule = 0
checkPageLoad = setInterval(function () {
    fiveSecRule += 1;
    if ($('a#loadAssist').length > 0) {
        //console.log('cookies');
        clearInterval(checkPageLoad);
    } else if (fiveSecRule === 5) {
            clearInterval(checkOOS);
            //console.log('clarinet');
        } else {
        $('a[href="#skiptomaincontent"]').before('<a href="javascript:void(0);" class="screenreader" id="notLoaded" tabindex="1">Loading</a>');
        $('a#notLoaded').focus();
        setTimeout(function () {
            $('a#notLoaded').remove();
            
        }, 499);
        //console.log('cream');
    }
}, 500);
window.onload = function () {
    //console.log('hi');
    $('a[href="#skiptomaincontent"]').before('<a href="javascript:void(0);" class="screenreader" id="loadAssist" tabindex="1">Page is loaded</a>');
    $('a#loadAssist').focus();
    setTimeout(function () {
        $('a#loadAssist').remove();
        $('input#reduce_input_text_height').focus();
    }, 2999);
};*/