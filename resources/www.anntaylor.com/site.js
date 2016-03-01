/* --- */
(function($) {
    "use strict";

    // the kbhover() jQuery plugin triggers the analogous hover effect on the jQuery element
    // when a focus event occurs on it or one of it's children. This provides the same user user 
    // experience for keyboard navigation as for mouse navigation.
    $.fn.kbhover = function() {
        var selector = "a, area, object, :input:enabled";
        return this.each(function(i, el) {
            $(selector, el).add($(el).is(selector) ? el : null).bind("focusin focusout", function(event) {
                $(el).trigger(event.type === "focusin" ? "mouseenter" : "mouseleave");
            });
        });
    };

    // Add default (NOP) href attribute on any anchor missing an href
    $.fn.fixMissingHref = function() {
        $("a", this).each(function() {
            $(this).attr('href', function(i, o) {
                return (o ? o : 'javascript:void(0);');
            });
        });
        return this;
    };

    // Create a keyboard navigation cycle by placing navigation sentinal
    // links before and after the innerhtml of each jQuery element. When a 
    // sentinal gains focus, an event handler will pass focus to the opposite
    // sentinal, keeping focus between the sentinal pairs.  Note that the last 
    // tab direction determines how the keyboard user passes through a sentinal.
    // 
    // Note that this effectively creates a keyboard trap unless the caller
    // provides an exit link.  If the exit link uses the site default css class,
    // then the keyboard focus will be returned to returnFocus element in
    // click. returnFocus defaults to the active element.
    //
    // Focus is initially sent to the first sentinal in the first jQuery object.
    (function() {
        var forwardTab = true,
            mousedown = function(e) {
                forwardTab = true;
            },
            keypress = function(e) {
                if (e.which === 9 || e.keyCode === 9) {
                    forwardTab = (e.shiftKey) ? false : true;
                }
            },
            html = '<div class="focus-link-container"><a href="javascript:void(0);"></a></div>';

        $.fn.kbNavigationBlock = function(returnFocus) {
            returnFocus = returnFocus || document.activeElement;
            $(this).each(function() {
                    var that = this;
                    $(this)
                        .prepend($(html).find('a').addClass('focus-link-first').end())
                        .append($(html).find('a').addClass('focus-link-last').end())
                        .unbind('mousedown', mousedown)
                        .unbind('keydown', keypress)
                        .bind('mousedown', mousedown)
                        .bind('keydown', keypress)
                        .find(".focus-link-first", this)
                        .focus(function() {
                            if (forwardTab === false) {
                                $(".focus-link-last", that).focus();
                            }
                        })
                        .end()
                        .find(".focus-link-last", this)
                        .focus(function() {
                            if (forwardTab === true) {
                                $(".focus-link-first", that).focus();
                            }
                        })
                        .end()
                        .find(".js-close, .closeLink, .js-closeLayer")
                        .click(function() {
                            $(that).unbind('mousedown', mousedown);
                            $(that).unbind('keydown', keypress);
                            $(returnFocus).focus();
                        })
                        .end();
                })
                .find(".focus-link-first:first")
                .focus();
            return this;
        };

        // add support for activeElement on older browsers
        if (typeof document.activeElement === 'undefined') {
            try {
                document.activeElement = null;
                document.addEventListener("focus", function() {
                    try {
                        document.activeElement = e.target === document ? null : e.target;
                    } catch (e1) {
                        throw (e1);
                    }
                }, true);
            } catch (e2) {}
        }

    }());
}($ || jQuery));

window.$legacyjQuery = $.noConflict();
window.$ = window.jQuery = window.$legacyjQuery;

(function($) {
    var SMARTPHONE = false,
        TABLET = false,
        jQuery = $;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        if (window.screen.width <= 640) {
            SMARTPHONE = true;
        } else {
            TABLET = true;
        }
    }

    // Global taylor object
    window.taylor = window.taylor || {};
    // add form error methods to taylor object
    (function($, taylor) {
        "use strict";
        var $errorMessages = $(),
            $formErrors = $(),
            rIdHack = /^form-error-(.+)$/,
            rClassHack = /^for-(.+)$/,
            reset;
        reset = function() {
            $errorMessages.empty();
            $errorMessages = $();
            $formErrors
                .remove()
                .find('ul')
                .empty();
            $('#messages').removeClass('has-form-errors');
            $('form')
                .removeClass('has-form-errors')
                .children('.errors-in-form-alert')
                .remove();
        };
        // Clear the form on a submit (mainly for Ajax forms).
        $(function() {
            $('form').bind('submit.reset', function() {
                reset();
            });
        });
        // taylor.notifyErrors( jQuery [, formErrorFlag ])
        //
        // Report form errors to the form element's error container, the head of the form, and the #message
        // area of the page. If formErrorFlag is false, then error messages will not be reported at the top
        // of the form. It is assumed that the error message element immediately follows the form element 
        // unless one of the form error hacks are in use. Form error hacks process errors based upon the
        // assigned to the form element generating the error.  As an example, consider a form element with 
        // id="foo". In the "id-hack", the container for the the error message will have id="form-error-foo".  
        // In the class-hack, container for the error message element will have a class 'for-foo' (note that
        // the "class-hack" is analogous to the use of the 'for' attribute on label elements). The id-hack 
        // has precedence over the class-hack. 
        taylor.notifyErrors = function($t, formErrorFlag) {
            var i,
                setFocus = function($focus) {
                    setTimeout(function() {
                        $focus.focus();
                    }, 1000);
                };
            $t = $t || $();
            formErrorFlag = (formErrorFlag === false) ? false : true;
            // Initialize formEror list fragment on first call.
            $formErrors = $formErrors.length ? $formErrors : $('<div id="form-error-messages"><h2>Form Errors</h2><ul></ul></div>');
            // Add formError list to #messages.
            $('#messages')
                .not('.has-form-errors')
                .addClass('has-form-errors')
                .append($formErrors);
            // Add form error notification at the top of the form(s).
            $t.closest('form')
                .not('.has-form-errors')
                .addClass('has-form-errors')
                .prepend('<p class="reader-only errors-in-form-alert">Please correct the errors in this form.</p>');
            $t.each(function(i, t) {
                var m,
                    $focus = $(),
                    $t = $(t);
                // Track processed error messages.
                if ($errorMessages.index($t) >= 0) {
                    return;
                }
                $errorMessages = $errorMessages.add($t);
                $t.addClass('form-error-processed');
                // Determine form input focus for this error message.
                // id-hack.
                m = $t.attr('id').match(rIdHack);
                if (m) {
                    $focus = $('#' + m[1]);
                }
                if ($focus.length === 0) {
                    // class-hack.
                    $.each($t.attr('class').split(' '), function(i, c) {
                        var m = c.match(rClassHack);
                        if (m) {
                            $focus = $('#' + m[1]);
                        }
                    });
                }
                if ($focus.length === 0) {
                    // Search the form for the most likely form element based on the
                    // assumption that the error message follows its subject.
                    // Default to the first focusable input element.
                    $focus = $t.closest('form').find(':input:visible:enabled').not(':hidden, :submit, :reset').add($t);
                    $focus = $focus.eq(Math.max(0, $focus.index($t) - 1));
                    // Assign an id to $focus (if $focus has no id)
                    $focus.not('[id]').attr('id', 'form-error-focus-' + $errorMessages.length);
                }
                // The only case where $focus will be empty is when there is no parent form
                // or when the parent form has no focusable input elements
                // Add error link to error list
                $('<a></a>')
                    .bind('click', function() {
                        setFocus($focus);
                    })
                    .attr('href', '#' + $focus.attr('id'))
                    .append($t.text())
                    .appendTo($formErrors.find('ul'))
                    .wrap('<li></li>');
            });
            return $t;
        };
        // taylor.processErrors( errors [, kmap ])
        //
        // errors is an array of error element target (jQuery object or error key string)
        // and error message (a string) pairs. kmap maps error key strings to a an element id.
        // If the error key has no kmap entry, then the error key is used as the element id.
        //
        // Returns a jQuery object containing all processed error message target elements.
        //
        // Note that this is a drop-in replacement for legacy code that ran inline, prior to the DOM
        // ready state.  The legacy code relied on getElementById calls to locate the target
        // element and innerHTML to set the element content since jQuery is in an unreliable state prior
        // to DOM ready. This method adopts this same method to support pre-ready state operation.
        //
        // Also note that the call to taylor.notify (which adds accessibility support) is defered to post
        // ready state.
        //
        taylor.processErrors = function(errors, kmap, formErrorFlag) {
            var i, els = $();
            
            var delayCallback = function() {
                errors = errors || [];
                kmap = kmap || {};
                for (i = 0; i < errors.length; i += 2) {
                    if (typeof errors[i] === 'string') {
                        errors[i] = (typeof errors[i] === 'string' && kmap.hasOwnProperty(errors[i])) ? kmap[errors[i]] : errors[i];
                        errors[i] = $(document.getElementById(errors[i]));
                    }
                    if (typeof errors[i] === 'object' && errors[i].jquery && errors[i].length) {
                        errors[i][0].innerHTML = errors[i + 1] + '';
                        els = els.add(errors[i][0]);
                    }
                }
                els.show().children().show(); // some legacy code included this idiom
            };

            // Defer processing until the DOM is ready.
            $(function() {
                taylor.notifyErrors(els, formErrorFlag);
            });

            setTimeout(delayCallback);
            return els;
        };
    }(jQuery, taylor));

    // Simple JavaScript Templating
    // John Resig - http://ejohn.org/ - MIT Licensed
    (function() {
        var cache = {};

        this.tmpl = function tmpl(str, data) {
            // Figure out if we're getting a template, or if we need to
            // load the template - and be sure to cache the result.
            var fn = !/\W/.test(str) ?
                cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :

                // Generate a reusable function that will serve as a template
                // generator (and which will be cached).
                new Function("obj",
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +

                    // Introduce the data as local variables using with(){}
                    "with(obj){p.push('" +

                    // Convert the template into pure JavaScript
                    str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<#").join("\t")
                    .replace(/((^|%>)[^\t]*)"/g, "$1\r")
                    .replace(/\t=(.*?)#>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("#>").join("p.push('")
                    .split("\r").join("\\'") + "');}return p.join('');");

            // Provide some basic currying to the user
            return data ? fn(data) : fn;
        };
    })();


    (function($) {
        var site = window.site = {
            data: {
                // js data
            },
            func: {
                // commonly used site specfic functions
            },
            obj: {
                // site specfic objects
                ShareThis: {
                    open: function() {
                        var $elem = $("#main-bd-inner > div.grid > div.gu-last"),
                            pos = $elem.offset(),
                            $body = $("body"),
                            $share = $("#ShareThis"),
                            height = $(document).height(),
                            width = $(document).width();
                        if (!$("#Lightbox").length) {
                            $body.append("<div id='Lightbox'></div>");
                        }
                        if ($.browser.msie && $.browser.version < 7) {
                            $("#Lightbox").html("<iframe/>");
                            height = Math.max(document.documentElement.clientHeight, document.body.clientHeight);
                            width = Math.max(document.documentElement.clientWidth, document.body.clientWidth);
                        }
                        $("#Lightbox, #Lightbox iframe")
                            .stop()
                            .css({
                                height: height,
                                width: width,
                                "opacity": .2
                            })
                            .fadeIn(200);
                        $share.stop().appendTo($body);
                        lib.layer.center("#ShareThis");
                        //console.log( height + ', ' + width );
                        //console.log( $('#ShareThis').css('top') + ', ' + $('#ShareThis').css('left') );
                        $share.fadeIn(200);
                        $share.kbNavigationBlock();
                        /*
                        $("#ShareThis-iframe, #ShareThis")
                            .appendTo($("body"))
                            .css({
                                "left": pos.left + 10,
                                "top": pos.top
                            }).show();
                        $("#ShareThis")
                            .kbNavigationBlock();
                        */
                    },
                    close: function() {
                        var $ShareThis = $("#ShareThis");
                        $ShareThis.stop().fadeOut(200, function() {
                            $ShareThis.find("input, textarea").val("");
                            $('#EmailFriendForm .error').hide().html('');
                            $('#EmailFriendForm').show();
                            $('#EmailFriendConfirmation').hide();
                        });
                        $("#Lightbox, #ShareThis-iframe").stop().fadeOut(200);
                        /*                
                        var $ShareThis = $("#ShareThis, #ShareThis-iframe");
                        $ShareThis.stop().fadeOut(200, function(){
                            $ShareThis.find("input, textarea").val("");
                            $('#EmailFriendForm .error').hide().html('');
                            $('#EmailFriendConfirmation').hide();
                            $('#EmailFriendForm').show();
                        });
                        */
                    },
                    submit: function() {

                    }
                }
            }
        };
    })($);

    if ($("#checkout-confirm").length > 0) {
        $(document).delegate(".checkout-header-thankyou .btn-hide-item-details", "click.toggle", function(e) {
            e.preventDefault();
            $("#cart-details.toggleable").toggle();
        });
    }

    window.reSetupGenericPopups = function reSetupGenericPopups() {
        /* Setup any Generic Popups */
        $(document).undelegate(".js-genericPopup", "click").delegate(".js-genericPopup", "click", function(evt) {
            var $this = $(this),
                returnFocus = document.activeElement,
                popupWidth = $this.attr("data-width") || 685,
                iframeSRC = $this.attr("href");
            iframeHeight = $this.attr("data-height") || 500;
            lib.layer.create("#genericLayerContent", {
                closeSelector: ".js-closeLayer",
                url: "/ann/custserv/popupFrame.jsp",
                keepCentered: false,
                callback: function() {
                    $("#genericLayerContent").bind("mousedown", function(e) {
                        beginPopupDrag(this, e)
                    });
                    $("#genericLayerContent iframe").attr("src", iframeSRC);
                    $("#genericLayerContent").animate({
                        "width": popupWidth
                    }, 0);
                    $("#genericLayerContent iframe").animate({
                        "height": iframeHeight
                    }, 0);
                    lib.layer.center("#genericLayerContent");
                    $("#genericLayerContent").kbNavigationBlock(returnFocus);
                }
            });
            evt.preventDefault();
        });
        /* ------------------- */
    }

    // on body load (AGM: actually this is dom ready not body load)
    $(function() {

        if (!window.console) window.console = {};
        if (!window.console.log) window.console.log = function() {};

        //global variables for findInStore Section
        $preimgSrc = '';
        $defaultColorTitle = '';
        var defaultSizeTitle = '';
        // init

        /* External links open in new windows */
        $("a[rel='external']").bind("click.external", function() {
            window.open(this.href);
            return false;
        });

        // Not all browsers apply focus to the target of a hash url
        // so we work around this problem for the skip-to link.
        if ($.browser && ($.browser.webkit || $.browser.opera)) {
            $('#skip-link a').click(function() {
                var selector = "a, area, object, :input:enabled";
                $('#skip-to-main-content')
                    .nextAll()
                    .each(function(i, el) {
                        el = $(el)
                            .filter(selector)
                            .add($(selector, el))
                            .filter(':visible')
                            .eq(0);
                        if (el.length > 0) {
                            el.focus();
                            return false;
                        }
                    });
            });
        }

        /* Handle hover states for buttons and images */
        $("input.js-hasHover, img.js-hasHover").each(function() {
            var $this = $(this);
            $this.bind("mouseenter mouseleave focusin focusout", function(e) {
                $this.toggleClass("hover")
                    .attr("src", $this.attr("src").replace(/_(off|on)\./, (e.type == "mouseenter" || e.type === "focusin" ? "_on." : "_off.")));
            });
        });

        /* js-select sizing */
        $('li.js-select').each(function(i, val) {
            if ($.browser.msie && parseInt($.browser.version, 10) === 7) { //IE-7 check
                $(this).find('div.optionsContainer ol li').css('width', $(this).css('width')); //added these 3 lines for IE7 fixes
                $(this).find('div.optionsContainer#SizeOptions ol li').css('width', '');
                $(this).find('div.optionsContainer#PriceOptions ol li').css('width', '80px');
            } else {
                $(this).find('div.optionsContainer').css('min-width', $(this).css('width'));
            }
        });


        /* Share this buttons */
        $("input.js-share-product").click(function() {
            site.obj.ShareThis.open();
            return false;
        });
        $("#ShareThis a.js-close").click(function() {
            site.obj.ShareThis.close();
            return false;
        });

        /* generic show/hide toggler */
        $("a.js-toggler").live("click", function() {
            var $this = $(this),
                $subject = $($this.attr("href").match(/(#\w+)$/)[0]); // expects the href to be an id
            $this.toggleClass("selected");
            $subject.toggleClass("toggle-on");
            return false;
        });

        /* Show quicklook overlay */
        $(".quick-look").click(function() {
            quickViewCommands[0] = $(this).children("#quick-lookUrl").text();
            if ($("#widget-quickview").size() == 0) {
                loadQuickView('show', 'body', this);
            }
        });



        /* Product grid overlay */
        $("div.products > div.grid").find("div.product").each(function() {
            var $this = $(this);
            var $meta = $this.find("div.meta");
            var $overlay = $this.find("div.overlay");
            var $quicklook = $this.find("a.quick-look");
            var tspeed = 0;

            if (!SMARTPHONE && !TABLET) {

                $this.bind('mouseenter mouseleave', function(e) { // hover events
                        if (!($.browser.msie && $.browser.version.match(/^[8]\./))) {
                            $overlay.stop().fadeTo(tspeed, ((e.type === 'mouseenter') ? 1 : 0.001));
                        } else {
                            // ie8 has a known issue regarding opacity on elements with absolute positioning.
                            // We degrade ui to avoid this issue.
                            $overlay.show().css({
                                'margin-left': ((e.type === 'mouseleave') ? '-100%' : 0)
                            });
                        }
                        $meta.stop().fadeTo(tspeed, (e.type === 'mouseenter') ? 0 : 1);
                    })
                    .kbhover() // trigger mouse event for analogous keyboard events
                    .trigger("mouseleave") // initial fx state should be hoverout
                ;
            } else if (TABLET) {
                $overlay.show();
            } else if (SMARTPHONE) {
                $overlay.find('.quick-look').remove();
                $overlay.show();
            }
            tspeed = "medium";

            if ($this.parent().parent().is(".showDetails")) {
                return;
            };

            $("div.outfits").css("position", "relative");
        });

        /* Primary Navigation hide/show behavior */
        $("#nav-site > ul.list-l1")
            .data("delay", 500)
            .data("opened", null)
            .children("li").each(function() {
                var $this = $(this),
                    getSelected = function() {
                        return $this.parent().children("li.selected").find("div.wrapper-l2");
                    },
                    $l2 = $this.find("div.wrapper-l2"),
                    $secondary = $l2.find(".list-l2 > li"),
                    $parent = $this.parent(),
                    $siblings = $this.siblings(),
                    $all = $siblings.andSelf(),
                    rate = 400;

                if ($this.is(":not(.selected)")) {
                    $l2.css({
                        "opacity": 0
                    }); // We're directly animating opacity because there's wonkyness with jQuery's fadeIn/Out
                }

                $this.click(function(e) {
                    clearTimeout($this.data("timer"));
                    show();
                    $this.siblings().removeClass("active-off").removeClass("selected").removeClass("hover").end().addClass("selected");
                    if ($(e.target).is(":not(.label-l2)")) {
                        return false;
                    }
                });

                var show = function() {
                    $all.each(function() {
                        clearTimeout($(this).data("timer"));
                    });
                    $this.addClass("hover");
                    $parent.data("opened", $this);
                    if ($this.is(":not(.selected)")) {
                        var $selected = getSelected();
                        // fading-in element should be at max z-index for usability's sake
                        $l2.css({
                            "z-index": 10,
                            "display": "block"
                        }).stop().animate({
                            "opacity": 1
                        }, rate, function() {
                            if ($.browser.msie) {
                                this.style.removeAttribute("filter");
                            }
                        });
                        $selected.parent().addClass("active-off");
                        $selected.css("z-index", 1).stop().animate({
                            "opacity": 0
                        }, rate, function() {
                            $selected.css("display", "none")
                        });
                    }
                }
                var hide = function() {
                    $this.removeClass("hover");
                    if ($this.is(":not(.selected)")) {
                        var $selected = getSelected();
                        // hide when done, to avoid triggering mouse events
                        $l2.css("z-index", 1).stop().animate({
                            "opacity": 0
                        }, rate, function() {
                            $l2.css("display", "none")
                        });
                        if ($parent.data("opened") == $this) {
                            $selected.parent().removeClass("active-off");
                            $selected.css({
                                "z-index": 10,
                                "display": "block"
                            }).stop().animate({
                                "opacity": 1
                            }, rate);
                            $parent.data("opened", null);
                        }
                    }
                }


                $this
                    .data("timer", null)
                    .hover(
                        function() { // over
                            clearTimeout($this.data("timer"));
                            $this.data("timer", setTimeout(show, $parent.data("delay")));
                        },
                        function() { // out
                            clearTimeout($this.data("timer"));
                            $this.data("timer", setTimeout(hide, $parent.data("delay")));

                        }
                    );

                $this.kbhover(); // trigger mouse event for analogous keyboard events

                $secondary.each(function() {
                    var $this = $(this);
                    $this.hover(
                        function() {
                            $this.addClass("hover");
                        },
                        function() {
                            $this.removeClass("hover");
                        }
                    );
                    $this.kbhover(); // trigger mouse event for analogous keyboard events
                });
            });
        /* End Primary Nav code */
        /* updated for image on of search submit button */
        /* Setup any buttons */
        $(".js-imageButton").each(function() {
            var baseImage = $(this).attr("src").split("_");
            var offPath = baseImage[0] + "_" + baseImage[1] + "_off.gif";
            var onPath = baseImage[0] + "_" + baseImage[1] + "_on.gif";
            new lib.obj.button({
                off: offPath,
                hover: onPath,
                buttonSelector: this,
                buttonCollectionSelector: ".js-imageButton"
            });
        });
        /* --------------- */

        /* Setup any Generic Popups */
        $(document).undelegate(".js-genericPopup", "click").delegate(".js-genericPopup", "click", function(evt) {
            var $this = $(this),
                returnFocus = document.activeElement,
                popupWidth = $this.attr("data-width") || 685,
                iframeSRC = $this.attr("href");
            iframeHeight = $this.attr("data-height") || 500;
            lib.layer.create("#genericLayerContent", {
                closeSelector: ".js-closeLayer",
                url: "/ann/custserv/popupFrame.jsp",
                keepCentered: false,
                callback: function() {
                    $("#genericLayerContent").bind("mousedown", function(e) {
                        beginPopupDrag(this, e)
                    });
                    $("#genericLayerContent iframe").attr("src", iframeSRC);
                    $("#genericLayerContent").animate({
                        "width": popupWidth
                    }, 0);
                    $("#genericLayerContent iframe").animate({
                        "height": iframeHeight
                    }, 0);
                    lib.layer.center("#genericLayerContent");
                    $("#genericLayerContent").kbNavigationBlock(returnFocus);
                }
            });
            evt.preventDefault();
        });
        /* ------------------- */

        /* Setup any Profile Popups */
        $(document).undelegate(".js-profilePopup", "click").delegate(".js-profilePopup", "click", function(evt) {
            var $this = $(this),
                returnFocus = document.activeElement,
                popupWidth = $this.attr("data-width") || 685,

                iframeSRC = $this.attr("href");
            iframeHeight = $this.attr("data-height") || 450;
            lib.layer.create("#genericLayerContent", {
                closeSelector: ".js-closeLayer",
                url: "/ann/custserv/profilePopupFrame.jsp",
                keepCentered: false,
                callback: function() {
                    $("#genericLayerContent").bind("mousedown", function(e) {
                        beginPopupDrag(this, e)
                    });
                    $("#genericLayerContent iframe").attr("src", iframeSRC);
                    $("#genericLayerContent").animate({
                        "width": popupWidth
                    }, 0);
                    $("#genericLayerContent iframe").animate({
                        "height": iframeHeight
                    }, 0);
                    lib.layer.center("#genericLayerContent");
                    $("#genericLayerContent").kbNavigationBlock(returnFocus);
                }
            });
            evt.preventDefault();
        });
        /* ------------------- */

        /* Setup any Small Generic Popups  */
        $(document).undelegate(".js-genericSmallPopup", "click").delegate(".js-genericSmallPopup", "click", function(evt) {
            var $this = $(this),
                returnFocus = document.activeElement,
                popupWidth = $this.attr("data-width") || 430,
                iframeSRC = $this.attr("href");
            iframeHeight = $this.attr("data-height") || 480;
            lib.layer.create("#genericLayerContent", {
                closeSelector: ".js-closeLayer",
                url: "/custserv/generic_layer.html",
                keepCentered: false,
                callback: function() {
                    $("#genericLayerContent").bind("mousedown", function(e) {
                        beginPopupDrag(this, e)
                    });
                    $("#genericLayerContent iframe").attr("src", iframeSRC);
                    $("#genericLayerContent").animate({
                        "width": popupWidth
                    }, 0);
                    $("#genericLayerContent iframe").animate({
                        "height": iframeHeight
                    }, 0);
                    lib.layer.center("#genericLayerContent");
                    $("#genericLayerContent").kbNavigationBlock(returnFocus);
                }
            });
            evt.preventDefault();
        });
        /* ------------------- */

        /* Setup any Large Popups with No Logo */
        $(document).undelegate(".js-genericLargePopup", "click").delegate(".js-genericLargePopup", "click", function(evt) {
            var $this = $(this),
                returnFocus = document.activeElement,
                popupWidth = $this.attr("data-width") || 700,
                iframeHeight = $this.attr("data-height") || 500,
                iframeSRC = $this.attr("href");
            lib.layer.create("#genericLayerLargeContent", {
                closeSelector: ".js-closeLayer",
                url: "/ann/custserv/generic_layer_nologo.jsp",
                keepCentered: false,
                callback: function() {
                    $("#genericLayerLargeContent").bind("mousedown", function(e) {
                        beginPopupDrag(this, e)
                    });
                    $("#genericLayerLargeContent iframe").attr("src", iframeSRC);
                    $("#genericLayerLargeContent").animate({
                        "width": popupWidth
                    }, 0);
                    $("#genericLayerLargeContent iframe").animate({
                        "height": iframeHeight
                    }, 0);
                    lib.layer.center("#genericLayerLargeContent");
                    $("#genericLayerLargeContent").kbNavigationBlock(returnFocus);
                }
            });
            evt.preventDefault();
        });
        /* ------------------- */

        /* Setup Email Signup Confirmation in Footer */
        function setFocusClearFooterSignup(confirmOnly) {
            if (!confirmOnly) {
                $('#FooterSignup').focus(function() {
                    $('#FooterSignup').removeClass('mailingListError').val(''); // ('color','#585851 !important').val('');
                });
            }
            $('#FooterSignupConfirm').focus(function() {
                $('#FooterSignupConfirm').removeClass('mailingListError').val(''); // css('color','#585851 !important').val('');
            });
        }

        /* Setup Email Signup Confirmation in Footer */
        function setFocusClearFooterSingleSignup(confirmOnly) {
            if (!confirmOnly) {
                $('#FooterSingleSignup').focus(function() {
                    $('#FooterSingleSignup').removeClass('mailingListError').val(''); // ('color','#585851 !important').val('');
                });
            }
        }

        $(function() {
            $('#FooterSignup').focus(function() {
                $('#emailAddressConfirmFooterContainer').slideDown();
                $('#footerSignupGoShim').slideDown();
            });

            $('#joinEmail').submit(function() {
                $('#FooterSignupGo').focus();
                var myEmailVal = $('#FooterSignup').val();
                var myEmailConfVal = $('#FooterSignupConfirm').val();
                var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,4}$/;
                //alert(myEmailVal + ' ' + myEmailConfVal);
                if (myEmailVal.length < 1 || $('#FooterSignup').val() == "SIGN UP FOR EMAIL UPDATES") {
                    $('#FooterSignup').addClass('mailingListError').val('EMAIL ADDRESS REQUIRED');
                    $('#FooterSignupConfirm').addClass('mailingListError').val('CONFIRM EMAIL ADDRESS');
                    setFocusClearFooterSignup(false);
                } else if (!emailPattern.test(myEmailVal)) {
                    $('#FooterSignup').addClass('mailingListError').val('INVALID EMAIL PLEASE RETRY');
                    $('#FooterSignupConfirm').addClass('mailingListError').val('CONFIRM EMAIL ADDRESS');
                    setFocusClearFooterSignup(false);
                } else if (myEmailVal != myEmailConfVal) {
                    $('#FooterSignupConfirm').addClass('mailingListError').val('CONFIRM EMAIL ADDRESS');
                    setFocusClearFooterSignup(true);
                } else {
                    return true;
                }
                return false;
            });
        });

        $(function() {
            $('#FooterSingleSignup').focus(function() {});
            $('#joinSingleEmail').submit(function() {
                $('#FooterSignupGo').focus();
                var myEmailVal = $('#FooterSingleSignup').val();
                var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,4}$/;
                if (myEmailVal.length < 1 || $('#FooterSingleSignup').val() == "SIGN UP FOR EMAIL UPDATES") {
                    $('#FooterSingleSignup').addClass('mailingListError').val('EMAIL ADDRESS REQUIRED');
                    setFocusClearFooterSingleSignup(false);
                } else if (!emailPattern.test(myEmailVal)) {
                    $('#FooterSingleSignup').addClass('mailingListError').val('INVALID EMAIL PLEASE RETRY');
                    setFocusClearFooterSingleSignup(false);
                } else {
                    return true;
                }
                return false;
            });
            /* prevent null search */
            var targetForm;
            var preventNullSrch = function(e) {
                var searchTerm = $('#question', targetForm).val();
                if ((searchTerm.toLowerCase() == 'search') || (searchTerm == /^\s*$/.exec(searchTerm))) {
                    e.preventDefault();
                    $('#question', targetForm).val('');
                    $('#question', targetForm).focus();
                }
            }
            var clickSrch = function() {
                targetForm = $(this).closest("form");
                targetForm.submit(preventNullSrch);
            }
            $("#SiteSearchGo", ".search").click(clickSrch);
            $("#SiteSearchGo", "#searchTerm").click(clickSrch);
        });


        /* set up default text for search box, newsletter field, additional delivery instructions  */
        lib.input.defaultText("#SiteSearch", {
            defaultText: "Search"
        });
        lib.input.defaultText("#FooterSignup", {
            defaultText: "SIGN UP FOR EMAIL UPDATES"
        });
        lib.input.defaultText("#FooterSingleSignup", {
            defaultText: "SIGN UP FOR EMAIL UPDATES"
        });
        lib.input.defaultText("#FooterSignupConfirm", {
            defaultText: "CONFIRM EMAIL ADDRESS"
        });
        lib.input.defaultText("#delivText", {
            defaultText: ""
        });
        /* character limit for gift box message, additional delivery instructions */
        lib.input.setMaxCharacters("#gift-msg", {
            limit: 120,
            results: "#gift-msg-count"
        });
        lib.input.setMaxCharacters("#delivText", {
            limit: 30,
            results: "#add-instr-count"
        });


        /* Radio buttons on refinements trigger click behavior */
        $("#Filter .radioGroup").each(function() {
            var $this = $(this),
                $radio = $this.find("input"),
                href = $this.find("a").attr("href");
            $radio.bind("focus", function() {
                window.location.href = href;
            });
        });

        /* Addresses IE clickthrough issue on product grid */
        if ($.browser.msie) {
            $(".product .thumb img").click(function() {
                window.location = $(this).parent().parent().find("a.clickthrough").attr("href")
            })
        }


        setTimeout(function() {
            $('body').fixMissingHref();
        }, 50);
        $('body').ajaxSuccess(function(e, xhr, settings) {
            setTimeout(function() {
                $('body').fixMissingHref();
            }, 50);
        });
    });
    /* Find In Store - Start */

    var findInStoreCommands = new Array(2);
    findInStoreCommands[0] = "/ann/findinstore/findInStore.jsp?findInStore=true";
    findInStoreCommands[1] = "/ann/findinstore/findInStoreResults.jsp";


    var findInStoreContainerId = "#widget-findInStore";
    var findInStoreContainerOverlay = "#findInStore-overlay";

    var findInStoreCloseButtonsClass = ".widget-findInStore-but-close";
    var findInStoreCloseButtonsAdd = ".widget-findInStore-but-add";

    var findInStoreContainerHTML = '<div id="findInStore-overlay"></div><div id="widget-findInStore"></div>';
    var findInStoreLoadingHTML = '  <div id="cat-quickview-top" class="widget-ie6png"><!--  --></div>' +
        '  <div id="cat-quickview-body" class="widget-ie6png">' +
        '    <div id="cat-quickview-content">' +
        '      <div class="widget-ima-loader"><img src="/webassets/ann/en_US/assets/images/uc_qv/ima-glo-loading.gif" alt="Loading..." /></div>' +
        '    </div>' +
        '  </div>' +
        '  <div id="cat-quickview-bottom" class="widget-ie6png"><!--  --></div>';

    window.loadFindInStore = function loadFindInStore(params, selector) {
        hideBasket();
        closeFindInStore();
        addFindInStore(selector);
        fisurl = findInStoreCommands[0] + "&productId=" + document.getElementById("productId").value + "&skuId=" + document.getElementById("skuId").value + "&defaultColor=" + document.getElementById("defColor").value + "&catId=" + document.getElementById("catId").value;

        var size = document.getElementById("sizeCode").value;
        var colorCode = document.getElementById("colorCodefis").value;
        if (colorCode.length == 0) {
            if (size.length == 0) {
                fisurl = fisurl;
            } else {
                fisurl = fisurl + "&sizeCode=" + size;
            }
        } else {
            if (size.length == 0) {
                fisurl = fisurl + "&colorCode=" + colorCode;
            } else {
                fisurl = fisurl + "&colorCode=" + colorCode + "&sizeCode=" + size;
            }
        }
        //alert("fisurl : "+fisurl);
        ajaxFindInStore(fisurl, params);
    };

    window.loadFindInStoreResults = function loadFindInStoreResults(params, selector) {
        hideBasket();
        //closeFindInStore();
        //addFindInStoreResults(selector);
        var finalColorCode = $("#selectedFindColorCode").val();
        var findDefaultColor = $('#color-picker-find #defColor').val();
        var finalSizeCode = $("#selectedFindSizeCode").val();
        if (!$('#fs-color-find li').hasClass('selected')) {
            finalColorCode = '';
        }
        if (!($('#fs-size-find li a').hasClass('selected'))) {
            finalSizeCode = '';
        }
        document.zipCode = document.getElementById("zip").value;
        if (document.getElementById("zip").value.indexOf('ZIP CODE') != -1) {
            document.zipCode = "";

        }
        document.cityName = document.getElementById("city").value;
        if (document.getElementById("city").value.indexOf('CITY NAME') != -1) {
            document.cityName = "";
        }
        document.state = document.getElementById("state").value;

        //alert('destZipcode='+document.getElementById("mSizeType"));
        paramStr = "?destZipcode=" + document.zipCode.replace(/[^0-9a-zA-Z ]/g, "a") + "&destCity=" + document.cityName.replace(/[^0-9a-zA-Z ]/g, "1") + "&destState=" + document.state + "&mSizeType=" + document.getElementById("mSizeType").value + "&storeDivision=ATS" + "&productId=" + document.getElementById("productId").value + "&sizeCode=" + finalSizeCode + "&colorCode=" + finalColorCode + "&searchRadius=" + document.getElementById("distance").value + "&catId=" + document.getElementById("catId").value + "&currentDate=" + new Date();

        ajaxFindInStoreResults(findInStoreCommands[1] + paramStr, params, selector);


    };

    window.addFindInStore = function addFindInStore(selector) {
        $(selector).append(findInStoreContainerHTML);
        $(findInStoreContainerId).append(findInStoreLoadingHTML);
        adjustFindInStoreLocation();
        $(findInStoreContainerId).show();
    };

    window.addFindInStoreResults = function addFindInStoreResults(selector) {
        $(selector).append(findInStoreContainerHTML);
        $(findInStoreContainerId).append(findInStoreLoadingHTML);
        adjustFindInStoreLocation();
        $(findInStoreContainerId).show();
    };

    window.closeFindInStore = function closeFindInStore() {
        if ($('#findInStoreNoResultsLayer').size() == 0) {
            $(findInStoreContainerId).remove();
            $(findInStoreContainerOverlay).remove();
        }
    };

    var googleApiHasBeenCalled = false;

    window.ajaxFindInStore = function ajaxFindInStore(page, params) {
        params = "rId=" + new Date().getTime() + "&" + params;
        $.ajax({
            type: "GET",
            url: page,
            data: params,
            dataType: "html",
            success: function(msg) {
                $(findInStoreContainerId + " *").remove();
                $(findInStoreContainerId).html("");
                document.getElementById('widget-findInStore').innerHTML += msg;
                $('.js-findInStoreNoResults').click(function(e) {
                    e.preventDefault();
                    var iframeSRC = $(this).attr("href");
                    lib.layer.create("#findInStoreNoResultsLayer", {
                        closeSelector: ".js-closeLayer",
                        url: "/ann/findinstore/findInStoreNoResults.jsp" + "?searchRadius=" + document.getElementById("distance").value + "&mSizeType=" + document.getElementById("mSizeType") + "&catId=" + document.getElementById("catId").value,
                        keepCentered: true,
                        callback: function() {
                            $("#findInStoreNoResultsLayer iframe").attr("src", iframeSRC);
                            lib.layer.center("#findInStoreNoResultsLayer");
                        }
                    });
                });

                $('.js-findInStoreResults').click(function(e) {
                    e.preventDefault();
                    $(".fisResultLoader").show();
                    hideBasket();
                    loadFindInStoreResults('show', 'body');
                });

                $defaultColorTitle = $('#color-picker-find').find('#color' + ($('#widget-findInStoreContent #defColor').attr('value')) + ' a').attr('alt');
                $('#widget-findInStore #newColorText_0').html($defaultColorTitle);
                $('#widget-findInStore #color' + ($('#widget-findInStoreContent #defColor').attr('value'))).addClass('initial selected');
                $preimgSrc = $('#findInStoreMain').attr('src');

                if ($('#widget-findInStore #fs-location').length > 0) {
                    $('input[type="text"]').focus(function() {
                        if (this.value == this.defaultValue) this.value = '';
                    });
                    $('input[type="text"]').blur(function() {
                        if (this.value == '') this.value = (this.defaultValue ? this.defaultValue : '');
                    });
                };
                //reflect selected elements from base to overlay
                if (document.getElementById('fs-size') !== null) {
                    baseToOverlayFIS();
                }
            }
        });
    };

    window.googleApiCallback = function googleApiCallback() {
        $.ajax({
            dataType: "script",
            url: "/webassets/ann/en_US/js/handlebars.min.js",
            success: function(msg) {
                $.ajax({
                    dataType: "script",
                    url: "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",
                    success: function(msg) {
                        $.ajax({
                            dataType: "script",
                            url: "/webassets/ann/en_US/js/purl.js",
                            success: function(msg) {
                                $.ajax({
                                    dataType: "script",
                                    url: "/webassets/ann/en_US/js/jquery.cookie.js",
                                    success: function(msg) {
                                        $.ajax({
                                            dataType: "script",
                                            url: "/webassets/ann/en_US/js/gme.js",
                                            success: function(msg) {
                                                pub.Search.srchStore.viewAllResults(gLocation);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

    };

    window.white_space = function white_space(string) {
        var string = string.replace(/^\s*|\s*$/g, '');
        return string;
    }

    var gLocation = '';

    window.ajaxFindInStoreResults = function ajaxFindInStoreResults(page, params, selector) {

        //console.log('zipCode: '+document.zipCode);
        //console.log('cityName: '+document.cityName);
        //console.log('state: '+document.state);
        //console.log('sizeCode: '+$('#selectedFindSizeCode').val());
        //console.log('colorCode: '+$("#selectedFindColorCode").val()); 
        //console.log('isNotANumber: ');
        //console.log($.isNaN(document.zipCode)); 
        var formIsValid = true;

        if (($('#selectedFindSizeCode').val() == '') || ($("#selectedFindColorCode").val() == '') || (((document.zipCode == '') || (document.zipCode.length != 5) || (document.zipCode == '00000') || ($.isNaN(document.zipCode))) && ((document.state == -1) || (document.cityName == '')))) {
            formIsValid = false;
        }
        var errorsString = "Zip Code dependency check failed.State dependency check failed.City dependency check failed.Please enter a Size.Zip Code dependency check failed.State dependency check failed.City dependency check failed.Please enter a Size.Zip Code dependency check failed.State dependency check failed.City dependency check failed.Please enter a Size.Zip Code dependency check failed.State dependency check failed.City dependency check failed.Please enter a Size.";

        if (!formIsValid) {

            //console.log ('---- FORM IS NOT VALID --------');
            var errorsString = errorsString;
            var flagDisplayError = 'false';
            $('#errorFindSizeCode').hide();
            $('#errorFindColorCode').hide();
            $('#genericError').hide();
            $('#genericError1').hide();
            $('#genericError2').hide();
            $('#genericError3').hide();
            $('#noStoreError').hide();

            if ($('#selectedFindSizeCode').val() == '') {
                $('#genericError').show();
                $('#errorFindSizeCode').show();
            };
            if ($("#selectedFindColorCode").val() == '') {
                $('#genericError').show();
                $('#errorFindColorCode').show();
            };

            if ((document.zipCode == '') && (document.state == -1) && (document.cityName == '')) {
                $('#genericError').show();
                $('#genericError1').show();
                $('#genericError1').html("Please Enter Zip Code or State/City");
                flagDisplayError = 'true';
            };
            if ((flagDisplayError != 'true') && (((document.zipCode == '') || (document.zipCode.length != 5) || (document.zipCode == '00000') || ($.isNaN(document.zipCode))) && ((document.state == -1) && (document.cityName == '')))) {
                $('#genericError').show();
                $('#genericError1').show();
                $('#genericError1').html("Please enter valid zipCode");
            } else {
                if ((flagDisplayError != 'true') && (((document.zipCode == '') || (document.zipCode.length != 5) || (document.zipCode == '00000') || ($.isNaN(document.zipCode))) && ((document.state == -1) && (document.cityName != '')))) {
                    $('#genericError').show();
                    $('#genericError3').show();
                    $('#genericError3').html("Please enter State");
                } else {
                    if ((flagDisplayError != 'true') && (((document.zipCode == '') || (document.zipCode.length != 5) || (document.zipCode == '00000') || ($.isNaN(document.zipCode))) && ((document.state != -1) && (document.cityName == '')))) {
                        $('#genericError').show();
                        $('#genericError2').show();
                        $('#genericError2').html("Please enter City");
                    };
                }
            }
            /*
            if(errorsString.indexOf('There are no stores located in the area you selected')!=-1){
                $('#noStoreError').show();
            }; */
            if ($(".productToFindOptions#noStoreError, .productToFindOptions#genericError, .productToFindOptions#genericError1, .productToFindOptions#genericError2, .productToFindOptions#genericError3").css("display") != "none") {
                $(".fisResultLoader").hide();
            } else {
                $(".fisResultLoader").show();
            }
            //$('#widget-findInStore #genericError').html("Please Enter - "+errorsString);




        } else {

            //console.log ('---- FORM IS VALID --------');
            gLocation = '';
            if ((document.zipCode != '') && (document.zipCode.length == 5)) {
                gLocation = document.zipCode;
            } else {
                if ((document.state != -1) && (document.cityName != '')) {
                    gLocation = document.cityName + ", " + document.state;
                }
            }

            if (googleApiHasBeenCalled) {
                pub.Search.srchStore.viewAllResults(gLocation);
            } else {
                googleApiHasBeenCalled = true;
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&libraries=places&client=gme-anntaylorinc&' +
                    'callback=googleApiCallback';
                document.body.appendChild(script);
            }

        }

    };

    window.gotStoreResults = function gotStoreResults(response) {
        //console.log('got the response:');
        //console.log(response);

        var dest = "/ann/findinstore/findInStoreResults.jsp";

        var STORE_ID_LIST = [];

        $.each(response.features, function(i, v) {
            STORE_ID_LIST.push(v.properties.Store_Id);
        });

        //console.log('STORE_ID_LIST: '+STORE_ID_LIST);

        paramStr = "?destZipcode=" + document.zipCode.replace(/[^0-9a-zA-Z ]/g, "a") + "&destCity=" + document.cityName.replace(/[^0-9a-zA-Z ]/g, "1") + "&destState=" + document.state + "&mSizeType=" + document.getElementById("mSizeType").value + "&storeDivision=ATS" + "&productId=" + document.getElementById("productId").value + "&sizeCode=" + $("#selectedFindSizeCode").val() + "&colorCode=" + $("#selectedFindColorCode").val() + "&searchRadius=" + document.getElementById("distance").value + "&catId=" + document.getElementById("catId").value + "&currentDate=" + new Date() + "&STORE_ID_LIST=" + STORE_ID_LIST;

        var url = dest + paramStr;

        //console.log('url:');
        //console.log(url);

        $.ajax({
            type: "GET",
            url: url,
            dataType: "html",
            success: function(msg) {
                closeFindInStore();
                addFindInStoreResults('body');
                $(findInStoreContainerId + " *").remove();
                $(findInStoreContainerId).html("");
                document.getElementById('widget-findInStore').innerHTML += msg;

                $('.js-FindInStoreFAQ').click(function(e) {
                    e.preventDefault();
                    //var iframeSRC = $(this).attr("href");
                    //console.log(iframeSRC);
                    lib.layer.create("#findInStoreFAQLayer", {
                        closeSelector: [".js-closeLayer", ".js-findInStoreContinueShopping"],
                        url: '/ann/findinstore/findInStoreFAQ.jsp',
                        keepCentered: true,
                        callback: function() {
                            //$('body').innerHTML += "<div id='storeLocatorOverlay'></div>";
                            //$("#findInStoreFAQLayer iframe").attr("src", iframeSRC);
                            lib.layer.center("#findInStoreFAQLayer");
                        }
                    });
                });
                $('.js-backToFindInStore').click(function(e) {
                    e.preventDefault();
                    loadFindInStore('show', 'body');
                });

                var returnedList = $('div[data-storelist]').data('storelist'),
                    finalList = [],
                    isInArray = function(value, array) {
                        return array.indexOf(value) > -1;
                    };
                $.each(STORE_ID_LIST, function(index, value) {
                    if (isInArray(value, returnedList)) {
                        finalList.push(value);
                    }
                });

                if ((finalList == "") || (finalList == null) || (finalList == undefined)) {
                    $('#store-locator-error').hide();
                    $('#store-locator-error').show();
                    $('#availMsg').hide();
                } else {


                    var newArr = [];
                    $.each(finalList, function(index, val) {
                        $.merge(newArr, $.grep(response.features, function(n, i) {
                            return n.properties.Store_Id == val;
                        }));
                    });

                    response.features = newArr;

                    pub.StoreLocation.loadNearestStores(response);
                }

            }
        });

    }

    window.closeStoreLocator = function closeStoreLocator() {
        if ($('#storeLocatorOverlay')) {
            $('body #storeLocatorOverlay').remove();
        }
    };

    //Edit this per site to adjust location
    window.adjustFindInStoreLocation = function adjustFindInStoreLocation() {
        var bWindowOffsets = getScrollXY();
        var bWindowViewport = getViewportSize();
        var qvTop = ((bWindowViewport[1] / 2) - ($(findInStoreContainerId).height() / 2)) + bWindowOffsets[1];
        var qvLeft = ((bWindowViewport[0] / 2) - ($(findInStoreContainerId).width() / 2) - 13) + bWindowOffsets[0];
        qvTop = (qvTop < 0) ? 100 : qvTop;
        qvLeft = (qvLeft < 0) ? 100 : qvLeft;
        $(findInStoreContainerId).css({
            "top": qvTop + "px",
            "left": qvLeft + "px"
        });
    };
    //reflect selected elements from base to overlay
    window.baseToOverlayFIS = function baseToOverlayFIS() {
        // selected size on overlay 12 Oct 2011
        var defaultSizeTitle = $('#fs-size').find('.selected').attr('id');
        if (typeof defaultSizeTitle == 'undefined') {
            $('#fs-size-find').find('.selected').removeClass('selected');
            $('#sizeCode').attr('value', '');
            $("#selectedFindSizeCode").attr('value', '');
        } else {
            //alert('else for size');
            var defaultSizeTitle = $('#fs-size').find('.selected').attr('id');
            var defaultSizeTitleArray = $('#fs-size-find li a');
            defaultSizeTitleArray.each(function() {
                var getID = $(this).attr('id');
                if (getID == defaultSizeTitle) {
                    $(this).addClass('selected');
                    $('#sizeCode').attr('value', defaultSizeTitle);
                    $('#selectedFindSizeCode').attr('value', defaultSizeTitle);
                };
            });
        };

        // selected size on overlay 12 Oct 2011
        var defaultColorTitle = $('.fs-color').find('.selected').attr('rel');
        var result_array = defaultColorTitle.split('$_$');
        var colorId = result_array[0];
        if (typeof colorId == 'undefined') {
            $('#fs-color-find').find('.selected').removeClass('selected');
            $('#colorCode').attr('value', '');
            $('#selectedFindColorCode').attr('value', '');
        } else {
            //alert('else for color');
            var defaultColorTitle = $('.fs-color').find('.selected').attr('rel');
            var result_array = defaultColorTitle.split('$_$');
            var colorId = result_array[0];
            var defaultColorTitleArray = $('#fs-color-find li');
            defaultColorTitleArray.each(function() {
                var defaultColorRel = $(this).attr('rel');
                var result_array = defaultColorRel.split('$_$');
                var getID = result_array[0];
                if (getID == colorId) {
                    $(this).addClass('selected');
                    $('#colorCode').attr('value', colorId);
                    $('#selectedFindColorCode').attr('value', colorId);
                };
            });
        };
    };

    window.printDiv = function printDiv(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }

    window.urlObject = function urlObject(options) {
        "use strict";
        /*global window, document*/

        var url_search_arr,
            option_key,
            i,
            urlObj,
            get_param,
            key,
            val,
            url_query,
            url_get_params = {},
            a = document.createElement('a'),
            default_options = {
                'url': window.location.href,
                'unescape': true,
                'convert_num': true
            };

        if (typeof options !== "object") {
            options = default_options;
        } else {
            for (option_key in default_options) {
                if (default_options.hasOwnProperty(option_key)) {
                    if (options[option_key] === undefined) {
                        options[option_key] = default_options[option_key];
                    }
                }
            }
        }

        a.href = options.url;
        url_query = a.search.substring(1);
        url_search_arr = url_query.split('&');

        if (url_search_arr[0].length > 1) {
            for (i = 0; i < url_search_arr.length; i += 1) {
                get_param = url_search_arr[i].split("=");

                if (options.unescape) {
                    key = decodeURI(get_param[0]);
                    val = decodeURI(get_param[1]);
                } else {
                    key = get_param[0];
                    val = get_param[1];
                }

                if (options.convert_num) {
                    if (val.match(/^\d+$/)) {
                        val = parseInt(val, 10);
                    } else if (val.match(/^\d+\.\d+$/)) {
                        val = parseFloat(val);
                    }
                }

                if (url_get_params[key] === undefined) {
                    url_get_params[key] = val;
                } else if (typeof url_get_params[key] === "string") {
                    url_get_params[key] = [url_get_params[key], val];
                } else {
                    url_get_params[key].push(val);
                }

                get_param = [];
            }
        }

        urlObj = {
            protocol: a.protocol,
            hostname: a.hostname,
            host: a.host,
            port: a.port,
            hash: a.hash.substr(1),
            pathname: a.pathname,
            search: a.search,
            parameters: url_get_params
        };

        return urlObj;
    }

    $(function() {
        /* Find in store overlay */
        $('.find-in-store').live('click', function() {
            if ($("#widget-findInStore").size() == 0) {
                loadFindInStore('show', 'body');
            };
        });
    });


    /* Find In Store - End */
}(window.$legacyjQuery));