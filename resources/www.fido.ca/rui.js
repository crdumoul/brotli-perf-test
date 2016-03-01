var _rui = {};
_rui.settings = {};
_rui.settings.hd = {"pixelRatio": 1.1, "modifyAllImgSrc": false}; // disable temporarily


function init_page() {
    $("html").removeClass("no-js");

    // init function by category of their purpose
    init_HTML();
    init_header();
    init_footer();
    init_components();
    init_printing();
    init_bookmarking();
    init_affix();

    // RUI image handling
    ruiUpdateHD();
}

function init_affix() {
    var handle = $(window);
    var wrap = $('.navctn');
    if (wrap.length > 0) {
        var triggerHeight = wrap.offset().top + wrap.height() - $("#header").height();
        $(window).on('scroll', function(e) { if (handle.scrollTop() > triggerHeight) { wrap.addClass('sticky'); } else { wrap.removeClass('sticky'); } });
    }
}

function init_printing() {
    $("[data-action='print']").on("click", function () {
        target = $(this).attr("data-target");
        if (target == null) {   // if no target specified, print everything (?)
            window.print();
        } else {                // print targeted content
            $(target).first().print();
        }
    });
}

function init_bookmarking() {
    $("[data-action='bookmark']").on("click", function () {
        if ($('html').attr('lang') == "fr") {
            alert("Please press Control + D to bookmark this page in French.");
        } else {
            alert("Please press Control + D to bookmark this page.");
        }
    });
}

// header related init functions
function init_HTML() {
    // Old Browser Message
    var isOld = $('html').hasClass('ie-old');
    if (!isOld && !navigator.userAgent.match(/Trident\/7\./)) { // special test for newer IE that matches against Mozilla
        var minVersionCheck = { chrome: 36, mozilla: 34, safari: 600, opera: 27 };
        var thisVersion = parseInt(jQuery.browser.version);
        for (var br in minVersionCheck) {
            isOld = isOld || (jQuery.browser[br] && thisVersion < minVersionCheck[br]);
        }
    }

    if (isOld) {
        $('#oldBrowserMsg').show();

        $('body').off('click', '#oldBrowserMsg .oldBrowserToggle');
        $('body').on('click', '#oldBrowserMsg .oldBrowserToggle', function(e) {
            $(this).closest('#oldBrowserMsg').toggleClass('long');
        });
    }
}

// header related init functions
function init_header() {
    $('body').off('click', '#header .navbar-toggle');
    $('body').on('click', '#header .navbar-toggle', function(e) {
        $('#header .shadow').toggleClass('in');
    });

    $('body').off('click', '#header .shadow');
    $('body').on('click', '#header .shadow', function(e) {
        $('#header .navbar-toggle').trigger('click');
    });

    var curRegion = $('#header #province a').text().substring(0, 2);
    $("#header #province select option[name='" + curRegion + "']").prop('selected', true);
    $('body').on('change', '#header #province select', function (e) {
        window.location = "?setProvince=" + $(this).find(':selected').text();
    });

    $('body').off('click', '.megamenu-submenu');
    $('body').on('click', '.megamenu-submenu', function(e){
    	if ($('body').width() <= 768) {
    		$(this).parent('li').toggleClass("open-submenu");
            e.stopPropagation();
            e.preventDefault();    		
    	}        
    });

}

// footer related init functions
function init_footer() {
    // Nothing here
}

// carousel and tabs
function init_components() {
    // basic tabs
    $('.rui-navtabs .nav-tabs').each(function() { var t=$(this); t.css('height',''); t.css('height',t.height() + 'px'); });
    $(window).off('resize');
    $(window).on('resize', function() { $('.rui-navtabs .nav-tabs').each(function() { var t=$(this); t.css('height',''); t.css('height',t.height() + 'px'); }); });


    // carousels
    var carousels = $('.rui-carousel');
    if (carousels.length > 0) {
        carousels.find('.slides').owlCarousel({
            items: 4,
            navigation: true,
            pagination: true,
            autoHeight: true,
            scrollPerPage: true,
            navigationText: ['<i class="rui-icon-button-left"></i>', '<i class="rui-icon-button-right"></i>'],
            startDragging: function() {
                if (!$('body').hasClass('popover-visible')) {
                    return;
                }
                $('.tip-toggle').popover('hide');
            },
            beforeMove: function() {
                if (!$('body').hasClass('popover-visible')) {
                    return;
                }
                $('.tip-toggle').popover('hide');
            }
        });
    }

    // popovers
    var toggles = $('.tip-toggle');
    if (toggles.length > 0) {
        toggles.popover({
            placement: "auto right",
            content: function() {
                var ref = $(this).attr('data-ref');
                return (ref != null && ref.indexOf("#") == 0) ? $(ref).html() : "";
            }
        });
        toggles.on('show.bs.popover', function(e) {
            $('body').addClass('popover-visible');
        });
        $('body').on('click', function(e) {
            if (!$(this).hasClass('popover-visible')) {
                return;
            }
            var t = $(e.target);
            $('.tip-toggle').not(t).popover('hide');
        });
    }
    
    var selectMenus = $('.rui-select-menu');
    if (selectMenus.length > 0) {
        selectMenus.on('change', function() {
            var href = $(this).val();
            if (href != null && href.length > 0) {
                window.location.href = href;
            }
        });
    }

    // smooth scrolling anchors
    $(".smooth-scroll").off('click');
    $(".smooth-scroll").on('click', function() {
        var tgt = $($(this).attr('data-target'));
        if (tgt.length != 1) { return; }
        $('html, body').animate({ scrollTop: parseInt(tgt.offset().top) }, 500);
    });

    // smarttabs/accordion
    $('.rui-smarttabs .tabcontent').on('show.bs.collapse', function(e) { if (!$(e.target).hasClass('tabcontent')) { return; } $(e.target).parent().attr('open','open'); $("html,body").animate({scrollTop:$(e.target).closest('.tab-content').offset().top-100},300); });
    $('.rui-smarttabs .tabcontent').on('hidden.bs.collapse', function(e) { $(e.target).parent().attr('open',false); });
    $('.rui-smarttabs').each(function() {
        var t = $(this);
        var ul = $("<ul></ul>");
        ul.addClass("generated").addClass("nav").addClass("nav-tabs").addClass("hidden-xs");
        t.find('summary').each(function() {
            var sum = $(this);
            var li = $("<li role='presentation'><a role='tab' data-toggle='tab'></a></li>");
            var a = li.find('a');
            a.attr('href', sum.attr('href') + "-tab");
            a.attr('aria-controls', sum.attr('aria-controls') + "-tab");
            a.html(sum.html());
            sum.parent().attr('id',sum.attr('aria-controls') + "-tab");
            sum.parent().addClass('tab-pane');
            ul.append(li);
        });
        ul.find('li:first-child').addClass('active');
        t.find('.tab-content').parent().prepend(ul);
        t.find('details:first-child').addClass('active');
    });

    // relocate package expansions on !mobile
    if ($('body').width() >= 768) {
        $('.rui-package-detailsbox-container').each(function () {
            var t = $(this);
            t.parent().find('> :lt(' + t.index() + ')').filter('.rui-package-detailsbox:not(.moved)').addClass('moved').insertAfter(t);
        });
    }
    $('.rui-package-detailsbox').on('shown.bs.collapse', function(e) { if (!$(e.target).hasClass('rui-package-detailsbox')) { return; } $("html,body").animate({scrollTop:$(e.target).offset().top-150},300); });

    // legal modal print
    var printButtons = $(".modal-header .print");
    if (printButtons.length > 0) {
        printButtons.on('click', function(e) {
            var tgt = $(e.target);
            var dialog = tgt.closest('.modal-content');
            dialog.print();
        });
    }

    setupAvailabilityForm();
}

var availSuccess = null;
var availCode = null;
function setupAvailabilityForm() {
    $('.form-availability').submit(function(e) {
        e.preventDefault();
        $(this).find('.btn').click();
    })
    $("#modal-availability").on('show.bs.modal', function(event) {
        var dialog = $(this);
        cleanAvailabilityDialog(dialog);
        $("#modal-availability .avail-signin").show();
        $('#modal-availability .avail-checkanother a').attr('data-dismiss','modal').off('click');
        var trig = $(event.relatedTarget);
        var isBanner = trig.closest('form').length > 0;
        var form = isBanner ? trig.closest('form') : trig.closest('.rui-packages').find('> form');
        //if (availCode != null && availSuccess === true) {
        //    dialog.find('.modal-footer .btn').attr('href', trig.attr('data-buylink'))[0].click();
        //    return false;
        //}
        return true;
    });
    $("#modal-availability form .btn").on('click', function(event) {
        var dialog = $("#modal-availability");
        $("#modal-availability .avail-signin").hide();
        $('#modal-availability .avail-checkanother a').attr('data-dismiss','').on('click', function() {
            cleanAvailabilityDialog(dialog);
            dialog.addClass('show-ask').removeClass('show-loading');
        });
        cleanAvailabilityDialog(dialog);
        form = $(this).closest('form');
        callAvailability(dialog, form);
    });
    $("#modal-availability").on('shown.bs.modal', function(event) {
        var dialog = $(this);
        var trig = $(event.relatedTarget);
        var isBanner = trig.closest('form').length > 0;
        var form = isBanner ? trig.closest('form') : trig.closest('.rui-packages').find('> form');
        if (!isBanner) {
            // buy button mode
            var tgtform = $("#modal-availability form");
            tgtform.attr('action', form.attr('action'));
            tgtform.find('[name=serviceLabel]').val(form.find('[name=serviceLabel]').val());
            tgtform.find('[name=serviceType]').val(form.find('[name=serviceType]').val());
            tgtform.find('[name=buyFlowLink]').val(trig.attr('data-buylink'));

            var label = form.find('[name=serviceLabel]').val();
            dialog.find('.service-name').text(label);
            var introtext = form.find('[name=introText]').val();
            var elIntro = dialog.find('.avail-intro');
            introtext == null ? elIntro.hide() : elIntro.html(introtext).show();
            var newClass = 'show-ask';
            if (availCode != null) {
                if (availSuccess === true) {
                    newClass = 'show-yes';
                } else {
                    newClass = 'show-no';
                }
            }
            dialog.addClass(newClass).removeClass('show-loading');
            return;
        }
        callAvailability(dialog, form);
    });
}
function cleanAvailabilityDialog(dialog) {
    var classes = dialog.attr('class').split(' ');
    for (var i=0; i<classes.length; i++) {
        if (classes[i].length > 0 && classes[i] != 'modal' && classes[i] != 'fade' && classes[i] != 'in') {
            dialog.removeClass(classes[i]);
        }
    }
    dialog.addClass('show-loading');
}


function callAvailability(dialog, form) {
    var code = form.find('[name=postalCode]').val();
    if (code.length == 0) {
        dialog.addClass('show-err-missing');
        dialog.removeClass('show-loading');
        return;
    }
    code = code.toUpperCase().replace(/[^A-Z0-9]/g,"");
    if (!code.match(/^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$/)) {
        dialog.addClass('show-err-invalid');
        dialog.removeClass('show-loading');
        return;
    }
    var type = form.find('[name=serviceType]').val();
    $.ajax({
        type    : "GET",
        url     : form.attr('action'),
        data    : { postalCode: code, lob : type },
        dataType: 'json'
    }).done(function( data ) {
        if (data && data.length == 1) { data = data[0]; }
        availSuccess = availCode = null;
        var type = form.find('[name=serviceType]').val();
        var label = form.find('[name=serviceLabel]').val();
        dialog.find('.service-name').text(label);
        dialog.find('.postal-code').text(code.substring(0,3) + " " + code.substring(3));
        if (!(data) || data.error === true || data.onError === true) {
            dialog.addClass('show-err-generic');
            dialog.removeClass('show-loading');
            return;
        }
        if (data.invalidPostalCode === true) {
            dialog.addClass('show-err-invalid');
            dialog.removeClass('show-loading');
        }
        
        /* Story:S40260 ; Author: Harkirat Singh [START]  */        
        
        var postalCodeProvinceVar = data['postalCodeProvince'];
        
        // use of Dedicated service to find province of searched postal code
        var findProvinceService = form.find('[name=find-province-service]').val();
        if(findProvinceService && findProvinceService != ""){
        	$.ajax({
                type	: "GET",
                async	: false,
                url     : findProvinceService,
                data	: { postalCode: code, lob : 'internetAvailable' },
                dataType: 'json'
            }).done(function( dataResult ) {
            	// flaten the array if only one object in result
				if (dataResult && dataResult.length == 1) { 
					dataResult = dataResult[0]; 
				}
				// set province from this service call
		        postalCodeProvinceVar = dataResult['postalCodeProvince'];
            }).fail(function( jqXHR, textStatus ) {
                dialog.addClass('show-err-generic');
                dialog.removeClass('show-loading');
            });
        }
       
        
        var provinceFromCookie = readCookie('province');
        // check if shopping province is different than searched province
        if(postalCodeProvinceVar && provinceFromCookie && (postalCodeProvinceVar !== provinceFromCookie)){
            if(data[type] === true || data['lobAvailable'] === true){
                // searched service is available
                dialog.find('.modal-footer .btn').attr('href', (""+'?setProvince='+postalCodeProvinceVar));
                dialog.addClass('show-other-province-yes');
                dialog.removeClass('show-loading');
                availSuccess = true;
            }else{
                // searched service is not available
                dialog.find('.modal-footer .btn').attr('href', ("/consumer/shop"+'?setProvince='+postalCodeProvinceVar));
                dialog.addClass('show-other-province-no');
                dialog.removeClass('show-loading');
                availSuccess = false;
            }
            return;
        }
        // else: continue with existing flow
        /* Story:S40260 ; Author: Harkirat Singh [END]  */

        availCode = code;
        if (data[type] === true || data['lobAvailable'] === true) {
            dialog.find('.modal-footer .btn').attr('href', form.find('[name=buyFlowLink]').val());
            dialog.addClass('show-yes');
            dialog.removeClass('show-loading');
            availSuccess = true;
        } else {
            dialog.addClass('show-no');
            dialog.removeClass('show-loading');
            availSuccess = false;
        }
    }).fail(function( jqXHR, textStatus ) {
        dialog.addClass('show-err-generic');
        dialog.removeClass('show-loading');
    });
}

function ruiDeviceIsHD() {
    return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: ' + _rui.settings.hd.pixelRatio + 'dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: ' + _rui.settings.hd.pixelRatio + '), only screen and (-o-min-device-pixel-ratio: ' + _rui.settings.hd.pixelRatio + '), only screen and (min--moz-device-pixel-ratio: ' + _rui.settings.hd.pixelRatio + '), only screen and (min-device-pixel-ratio: ' + _rui.settings.hd.pixelRatio + ')').matches)) || (window.devicePixelRatio && window.devicePixelRatio > _rui.settings.hd.pixelRatio));
}
function ruiUpdateHD(dom) {
    var domSelector;
    if (typeof dom != "undefined") {
        domSelector = $(dom).find('img');
    } else {
        if (_rui.settings.hd.modifyAllImgSrc) {
            domSelector = "section img";
        } else {
            domSelector = "section img[class*=rui-image]";
        }
    }
    if (ruiDeviceIsHD()) {
        $('body').addClass('hd');
        $(domSelector).each(function () {
            var src = $(this).attr('src');
            if (src.indexOf("@hd") < 0) {
                var extension = src.substring(src.lastIndexOf("."), src.length);
                $(this).attr('src', src.replace(extension, "@hd" + extension));
            }
        });
    } else {
        $('body').removeClass('hd');
        $(domSelector).each(function () {
            var src = $(this).attr('src');
            if (src.indexOf("@hd") < 0) {
                $(this).attr('src', src.replace("@hd", ""));
            }
        });
    }
}



// Cookie handling
function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else
        var expires = "";
    var host = window.location.host.replace("www", "");
    document.cookie = name + "=" + value + "; domain=" + host + expires + "; path=/";
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function signOut() {
    setCookie("SM_USERAUTHENTICATED", "", -1);
    setCookie("SMSESSION", "LOGGEDOFF", 9999);
    window.location.reload();
}

function disableTypeaheadOnTotes() {
    $('#search').find('a').removeAttr('data-target').attr('href','/web/content/search');
}

var recaptchaCompleted = false;

function reCaptchaFilledCallback () {
    recaptchaCompleted = true;
}
function reCaptchaExpiredCallback () {
    recaptchaCompleted = false;
}
function reCaptchaVerifyOnSubmit() {
    return recaptchaCompleted;
}
