//Account Summary

$('#myaccount').parents('#primarytable').parent().children('.content_area').find('td').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#myaccount #account_summary #accountSummary .content #defaultAddresses #defaultBillingAddress').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#myaccount #account_summary #accountSummary .content #defaultAddresses #defaultShippingAddress').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

setTimeout(function () {
    $('#myaccount br').parent('span').attr('tabindex', -1);
    $('#myaccount a').parent('span').attr('tabindex', -1);
    $('#myaccount a').parents('p').attr('tabindex', -1);
    $('#myaccount #account_summary #vipSummary .content #vipSummaryContent a[title="View Exclusive VIP Offers"]').parents('p').prev('p').attr('tabindex', -1);
}, 500);

$('#myaccount #account_summary #vipSummary .content #vipSummaryContent a#joinNowLink').on('click', function () {
    $('#myaccount #account_summary #vipSummary .content #vipSummaryContent #VIPRegistration input').attr('tabindex', 550);
    $('#myaccount #account_summary #vipSummary .content #vipSummaryContent #VIPRegistration div').attr('tabindex', 550);
    $('#myaccount #account_summary #vipSummary .content #vipSummaryContent #VIPRegistration #vip_info .vip_info td b').attr('tabindex', 550);
    $('#myaccount #account_summary #vipSummary .content #vipSummaryContent #VIPRegistration #vip_info .vip_info td select').attr('tabindex', 550);
    $('#myaccount #account_summary #vipSummary .content #vipSummaryContent #VIPRegistration #vip_info .vip_info td label b').attr('tabindex', -1);
    $('#myaccount #account_summary #vipSummary .content #vipSummaryContent #VIPRegistration #vip_info .vip_info td label').attr('tabindex', 550);
    $('#myaccount #account_summary #vipSummary .content #vipSummaryContent #VIPRegistration #vip_info .vip_info td ol li').attr('tabindex', 550);
});

$('#myaccount #account_summary #vipSummary .content #vipSummaryContent #VIPRegistration button').on('click', function () {
    $('#myaccount #account_summary #vipSummary .content #vipSummaryContent #VIPResult p').attr('tabindex', 550);
    $('#myaccount #account_summary #vipSummary .content #vipSummaryContent #VIPResult a').attr('tabindex', 550);
});

$('#myaccount #account_summary #orderHistorySummary .content .orders_table th').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#myaccount #account_summary #orderHistorySummary .content .orders_table td').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

//address book addresses

$('#myaccount #address_book .address').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

//

//delete address book addresses

$('#myaccount #edit_contact.accountInfoBox p').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#myaccount #edit_contact.accountInfoBox .box form .content div').each(function (i, v) {
    $(v).contents().wrap('<span />')
});
//

// order history
$('#myaccount #order_history.accountInfoBox .box .content div').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#myaccount #order_history.accountInfoBox .box .content table th').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#myaccount #order_history.accountInfoBox .box .content table td').each(function (i, v) {
    $(v).contents().wrap('<span />')
});
//

//wish list
$('#wishlist #wl_sidebar #wl_search p:first').append('<a class="screenreader" tabindex="550">Search by name and location</a>');
$('#wishlist #wl_sidebar #wl_search #wlSidebarSearchFormDivider').append('<a class="screenreader" tabindex="550">Search by email</a>');
$('#wishlist #wl_content h1#wl_content_top').prepend('<a class="screenreader" tabindex="550">Wish List</a>');

$('#wishlist #wl_content #wl_content_middle #wl_share_form div').each(function (i, v) {
    $(v).contents().eq(2).wrap('<span />')
});

$('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_action').children().each(function (i, v) {
    $(v).contents().wrap('<span />')
});

if ($('#wishlist .item_buy').length <= 0) {
    $('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_action').each(function (i, v) {
        $(v).contents().eq(4).wrap('<span />')
    });
}
//

// credit card
$('#myaccount #my_creditcards.accountInfoBox .box .content #mySaveCardList form#placeHolderForm table tr td.card_number').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#myaccount #my_creditcards.accountInfoBox .box .content #mySaveCardList form#placeHolderForm table tr td.card_expire span:first').each(function (i, v) {
    $(v).contents().wrap('<span />')
});
//

setTimeout(function () {
    //$('#myaccount #account_summary #orderHistorySummary .content .orders_table td:last-of-type span').attr('tabindex', -1);
   // $('#myaccount #account_summary #orderHistorySummary .content .orders_table tr:last-of-type span').attr('tabindex', -1);
    $('#myaccount #account_summary #wishListSummary .content h2').attr('tabindex', 7000);
    $('#myaccount #account_summary #wishListSummary .content a').attr('tabindex', 7001);
    $('#myaccount #account_summary #wishListSummary .content a.button span').attr('tabindex', -1);
    $('#myaccount #account_summary #wishListSummary .content .wishlist_items td').attr('tabindex', 7999);
    $('#myaccount #account_summary #wishListSummary .content .wishlist_items td.thumb').attr('tabindex', -1);
    $('#myaccount #account_summary #wishListSummary .content .wishlist_items td').find('*').attr('tabindex', 7999);
}, 100);

$(document).ready(function () {
    $('p').each(function () {
        var $this = $(this);
        if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
            $this.attr('tabindex', -1);
    });

    $('span').each(function () {
        var $this = $(this);
        if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
            $this.attr('tabindex', -1);
    });
});

$( document ).on( "searchLoaded", function( event ) {
    $('p').each(function () {
        var $this = $(this);
        if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
            $this.attr('tabindex', -1);
    });

    $('span').each(function () {
        var $this = $(this);
        if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
            $this.attr('tabindex', -1);
    });
});
 

$('#myaccount p').attr('tabindex', 550);
$('#myaccount a').attr('tabindex', 550);
$('#myaccount h1').attr('tabindex', 550);
$('#myaccount h2').attr('tabindex', 550);
$('#myaccount #account_sidenav h3').attr('tabindex', 550);
$('#myaccount h4').attr('tabindex', 550);
$('#myaccount button').attr('tabindex', 550);
$('#myaccount input').attr('tabindex', 550);
$('#myaccount select').attr('tabindex', 550);
$('#myaccount span').attr('tabindex', 550);
$('#myaccount #account_summary #accountSummary .content #loginInfo').attr('tabindex', 550);
$('#myaccount #account_summary #vipSummary .content #vipSummaryContent #vipEnrollbyNum .vipsmall i').attr('tabindex', 550);
$('#myaccount #account_summary #vipSummary .content #vipSummaryContent li').attr('tabindex', 550);
$('#myaccount #account_summary #vipSummary .content #vipSummaryContent #vipEnrollbyNum label').attr('tabindex', 550);
$('#myaccount #account_summary #vipSummary .content #vipSummaryContent table').attr('tabindex', 550);
$('#myaccount #account_survey label').attr('tabindex', 550);
$('#myaccount #account_summary #favoriteStores .content').find('*').attr('tabindex', 550);

$('#myaccount #wishListSummary p.red').attr('tabindex', 8000);

$('#myaccount').parents('#primarytable').parent().children('.content_area').find('td span').attr('tabindex', 8999);

$('#myaccount').parents('#primarytable').parent().children('.content_area').find('td span br').attr('tabindex', -1);
//$('#myaccount').parents('#primarytable').parent().children('.content_area').find('td span br').parent('span').attr('tabindex', -1);
//$('#myaccount').parents('#primarytable').parent().children('.content_area').find('td span b').parent('span').attr('tabindex', -1);
$('#myaccount').parents('#primarytable').parent().children('.content_area').find('td span p').parent('span').attr('tabindex', -1);
$('#myaccount').parents('#primarytable').parent().children('.content_area').find('td span a').parent('span').attr('tabindex', -1);
$('#myaccount #account_summary #accountSummary .content #defaultAddresses #defaultBillingAddress br').parent('span').attr('tabindex', -1);
$('#myaccount #account_summary #vipSummary .content #vipSummaryContent p strong').attr('tabindex', -1);
$('#myaccount #account_summary #vipSummary .content #vipSummaryContent br').attr('tabindex', -1);
$('#myaccount #account_summary #vipSummary .content #vipSummaryContent span span').parent('span').attr('tabindex', -1);
$('#myaccount #account_summary #orderHistorySummary.box .content table').attr('tabindex', -1);
$('#myaccount #account_summary #orderHistorySummary.box .content .orders_table th.order_action span').attr('tabindex', -1);
$('#myaccount #account_summary #orderHistorySummary.box .content .orders_table span p').parent('span').attr('tabindex', -1);
$('#myaccount #account_summary #orderHistorySummary .content .orders_table td').attr('tabindex', -1);
$('#myaccount').parents('#primarytable').parent().children('.content_area').find('td span br').parent('span').attr('tabindex', -1);
$('#myaccount').parents('#primarytable').parent().children('.content_area').find('td span b').parent('span').attr('tabindex', -1);
$('#myaccount #account_summary #accountSummary .content #defaultAddresses span a').parent('span').prev('span').attr('tabindex', -1);
$('#myaccount br').parent('span').attr('tabindex', -1);
$('#myaccount b').parent('span').attr('tabindex', -1);

//VIP Offer Page
$('.flc_container .flc_slot').find('*').attr('tabindex', 550);
$('.flc_container .flc_slot_container img').attr('tabindex', 550);

$('.flc_container .flc_slot input').parent('.code').attr('tabindex', -1);
$('.flc_container .flc_slot a').parent('.coupon_disclaim').attr('tabindex', -1);

$('.flc_container .flc_slot_container img').attr('alt', 'Foot Locker VIP Club Offers');

//VIP Membership Page

$('.vip_club').prepend('<a class="screenreader">Become a Foot Locker VIP member to ensure you always get the best offers and latest updates from Foot Locker. When you join the Foot Locker VIP club, you will receive these exclusive benefits: A coupon for $10 off a future purchase of $50 (delivered via email within 48-72 hours); Email, mailed and/or text messaged coupons during the year; Early access to select products; Special product and promotional information via e-mail and/or text message; VIP access to special events; Spend $300 in 12 months and reach Platinum Status, where you get reward cards, birthday mailings, and more</a>');
$('.vip_club a').attr('tabindex', 550);



//My Account Edit Address
setTimeout(function () {
    $('#myaccount p.flashMsg').attr('tabindex', 550);
}, 500);

$('#myaccount #edit_contact b').attr('tabindex', 550);

//My Account Edit Login
$('#myaccount #edit_login.accountInfoBox .box form .content table tr:first td label').attr('tabindex', 550);


//My Account Favorite Stores

$('#myaccount #account_sidenav ul li a[onclick="return myFavoriteStores()"]').on('click', function () {
    setTimeout(function () {
        $('#storepickup span').attr('tabindex', 550);
        $('#storepickup input').attr('tabindex', 550);
        $('#storepickup label').attr('tabindex', 550);
        $('#storepickup button').attr('tabindex', 550);
        $('#storepickup p').attr('tabindex', 550);
        $('#storepickup p#storecount').parent('div.messaging').attr('tabindex', 550);
        $('#storepickup select').attr('tabindex', 550);
        $('#storepickup a').attr('tabindex', 550);
        $('#storepickup #selFav').attr('tabindex', 550);
        $('#storepickup span.areis').attr('tabindex', -1);
        $('#storepickup span.ess').attr('tabindex', -1);
        $('#storepickup span.seemore.normal').attr('tabindex', -1);
        $('#storepickup span.num').attr('tabindex', -1);
        $('#storepickup p#storecount').attr('tabindex', -1);
        $('#storepickup a').parent('p').attr('tabindex', -1);
        $('#storepickup a').parent('span').attr('tabindex', -1);
        $('#storepickup a span').attr('tabindex', -1);
        $('#storepickup button span').attr('tabindex', -1);
        $('input.informational').focus();
    }, 2000);
})


//Wish List
$('#wishlist a').attr('tabindex', 550);
$('#wishlist p').attr('tabindex', 550);
$('#wishlist h4').attr('tabindex', 550);
$('#wishlist input').attr('tabindex', 550);
$('#wishlist select').attr('tabindex', 550);
$('#wishlist button').attr('tabindex', 550);
$('#wishlist li').attr('tabindex', 550);

$('#wishlist #wl_content #wl_content_middle #wl_form label').attr('tabindex', 550);
$('#wishlist #wl_content #wl_content_middle span.note-text').attr('tabindex', 550);
$('#wishlist #wl_content h1#wl_content_top .wlFacebookLike').attr('tabindex', 550);
$('#wishlist #wl_content h1#wl_content_top #wlFacebookShare').attr('tabindex', 550);

$('#wishlist #wl_content #wl_content_middle [data-btnname="wishlist_save"]').attr('tabindex', 551);

$('#wishlist #wl_content #wl_content_middle #wl_share_form label').attr('tabindex', 600);
$('#wishlist #wl_content #wl_content_middle #wl_share_form span').attr('tabindex', 600);
$('#wishlist #wl_content #wl_content_middle #wl_share_form div span').attr('tabindex', 600);
$('#wishlist #wl_content #wl_content_middle #wl_share_form [data-btnname="wishlist_share"]').attr('tabindex', 601);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody a').attr('tabindex', 650);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody th').attr('tabindex', 650);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody input').attr('tabindex', 650);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_sku').attr('tabindex', 650);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_size').attr('tabindex', 650);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_color').attr('tabindex', 650);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_thumb').find('*').attr('tabindex', 650);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_action .item_want').find('*').attr('tabindex', 650);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_action .item_got').find('*').attr('tabindex', 650);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_action .item_buy input').attr('tabindex', 650);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_action .item_buy label').attr('tabindex', 650);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_action span').attr('tabindex', 650);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody td.item_price').find('*').attr('tabindex', 650);
$('#wishlist #wl_content #wl_content_middle #wl_items #disclaimerText').attr('tabindex', 650);
$('#wishlist #wl_legal_footer').attr('tabindex', 650);

$('#wishlist #wl_content h1#wl_content_top #wlPrintLink a img').attr('tabindex', -1);
$('#wishlist #wl_content #wl_content_middle [data-btnname="wishlist_save"] span').attr('tabindex', -1);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_action span [data-btnname="wishlist_selectAll"]').parents('td').find('span').attr('tabindex', -1);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_action div').parent('span').attr('tabindex', -1);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_action a span').attr('tabindex', -1);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody .item_action a').parent('span').attr('tabindex', -1);
$('#wishlist #wl_content h1#wl_content_top span#wlFacebookLike').attr('tabindex', -1);
$('#wishlist #wl_content h1#wl_content_top span#wlFacebookShare').attr('tabindex', -1);
$('#wishlist #wl_content #wl_content_middle #wl_form label[for="rdoPublicPrivate"]').attr('tabindex', -1);
$('#wishlist #wl_content #wl_content_middle #wl_form label[for="rdoPublicPublic"]').attr('tabindex', -1);
$('#wishlist #wl_content #wl_content_middle #wl_items [data-btnname="wishlist_selectAll"]').parents('span').attr('tabindex', -1);
$('#wishlist #wl_content #wl_content_middle #wl_items [data-btnname="wishlist_selectAll"]').parents('span').prev('span').attr('tabindex', -1);
$('#wishlist #wl_content #wl_content_middle #wl_items .button span').attr('tabindex', -1);
$('#wishlist #wl_content #wl_content_middle #wl_items .button span').parent('span').attr('tabindex', -1);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody th[colspan="4"]').attr('tabindex', -1);
$('#wishlist label[for="chkDeleteWishList"]').attr('tabindex', -1);
$('#wishlist #wl_content #wl_content_middle #wl_items tbody td.item_price .sale_price strong').attr('tabindex', -1);

//My Account Credit Card

$('#myaccount #my_creditcards td.card_type img').attr('tabindex', 550);

$('#myaccount #my_creditcards .classHidden').attr('tabindex', -1);
$('#myaccount #my_creditcards .classHidden').parent('span').attr('tabindex', -1);
$('#myaccount #my_creditcards td.card_type span').attr('tabindex', -1);
$('#myaccount #my_creditcards td.card_expire span:first').attr('tabindex', -1);

//Customer Service

$('a[href="http://www.westernunion.com"]').attr('title', 'Western Union');

$('#custserv td').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#custserv p').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#custserv #contenttitle').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#custserv a').attr('tabindex', 550);
$('#custserv li').attr('tabindex', 550);
$('#custserv p').attr('tabindex', 550);

$('#custserv td span').attr('tabindex', 550);
$('#custserv p span').attr('tabindex', 550);

$('#custserv #itemchild').attr('tabindex', 550);
$('#custserv #helpindextitle').attr('tabindex', 550);
$('#custserv #contenttitle span').attr('tabindex', 550);

$('#custserv #helpindex li a').parent('li').attr('tabindex', -1);
$('#custserv li a').parent('li').attr('tabindex', -1);
$('#custserv li div').parent('li').attr('tabindex', -1);
$('#custserv #helpcontent #helpheader .chat-custserv-header-button a').attr('tabindex', -1);
$('#custserv span br').parent('span').attr('tabindex', -1);
$('#custserv p span').parent('p').attr('tabindex', -1);
$('#custserv span a').parent('span').attr('tabindex', -1);
$('#custserv span hr').parent('span').attr('tabindex', -1);
$('#custserv span span').parents('span').attr('tabindex', -1);

//receipt page

$('#orderReceiptContent').parents('#inside').children('#primarytable.content_area').find('td').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#orderReceipt #storePickup strong').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#orderReceipt div.thankyou p.print').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#orderReceipt .orderInfo .infoBox').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#orderReceipt .orderInfo th').each(function (i, v) {
    $(v).contents().wrap('<span />')
});
$('#orderReceipt .orderInfo td').each(function (i, v) {
    $(v).contents().wrap('<span />')
});

$('#orderReceipt p').attr('tabindex', 550);
$('#orderReceipt a').attr('tabindex', 550);
$('#orderReceipt span').attr('tabindex', 550);
$('#orderReceipt input').attr('tabindex', 550);
$('#orderReceipt button').attr('tabindex', 550);


$('#orderReceipt #vipEnrollOption').find('*').attr('tabindex', 550);
$('#orderReceipt #quickRegisterDiv input').attr('tabindex', 550);
$('#orderReceipt #quickRegisterDiv label').attr('tabindex', 550);
$('#orderReceipt .itemDeliveryOptionLeadTime').attr('tabindex', 550);


//$('#orderReceipt .orderInfo th').attr('tabindex', 550);
//$('#orderReceipt .orderInfo .infoBox').attr('tabindex', 550);
//$('#orderReceipt .orderInfo td').attr('tabindex', 550);
$('#orderReceiptPromo').attr('tabindex', 550);


$('#primarytable.content_area td span').attr('tabindex', 8999);

//$('#orderReceipt .orderInfo .infoBox p').attr('tabindex', -1);
//$('#orderReceipt span.red').attr('tabindex', -1);
$('#orderReceipt p.print').attr('tabindex', -1);
$('#orderReceipt a').parent('span').attr('tabindex', -1);
$('#orderReceipt br').parent('span').attr('tabindex', -1);
//$('#orderReceipt strong').parent('span').attr('tabindex', -1);
$('#orderReceipt div').parent('span').attr('tabindex', -1);
$('#orderReceipt span').parent('span').attr('tabindex', -1);
$('#orderReceipt p').parent('span').attr('tabindex', -1);
//$('#orderReceipt div.thankyou span.red').attr('tabindex', -1);
//$('#orderReceipt div#storePickup span.red').attr('tabindex', -1);
$('#orderReceipt td.deliveryicon').find('*').attr('tabindex', -1);
$('#orderReceipt .itemDeliveryOptionLeadTime span').attr('tabindex', -1);
$('#primarytable.content_area td br').parent('span').attr('tabindex', -1);
$('#primarytable.content_area td span').parent('span').attr('tabindex', -1);
$('#primarytable.content_area td b').parent('span').attr('tabindex', -1);
$('#primarytable.content_area td p').parent('span').attr('tabindex', -1);
$('#primarytable.content_area td a').parent('span').attr('tabindex', -1);


