/*
 * Contains wings plugin
 */

(function($) { // Hide scope, no $ conflict
    var vars = {
        parent: '', //Container for parent element
        $this: '', //Container for this element
        animationTimeout: null,
        eventType: 'click'
    };
    var defaultsettings = {
        id: "", // DOM id
        image: "", // Image for the wing element
        content: "", // Target to get content from
        width: 100, // Width and Height of the image (So the element can be sized correctly)
        height: 100,
        isStationary: false, // Whether or not these ads should follow the user down the page
        animate: false, // Whether or not to animate the element moving into place
        disableForTouch: false,
        enabled: true, // Optional switch to turn it off without 'code changes'
        animateDuration: 400, //Speed of the animation
        link: "", // Link to go to when the element is clicked
        title: "", // Title for tagging ADA
        background: "none", // The CSS background that will be applied
        position: "absolute", // The CSS Positioning of the element
        zOrder: 9999, // The z-index of the element
        top: 0, // Top offset of the add (How far down should they appear)
        left: 0, // How far off the left side to put the left
        bottom: -1, // How far from the bottom of the target this should be (overrides top)
        right: -1, // How far from the right of the target this should be (overrides left)
        buffer: 20, // Number of pixels to buffer before stopping a scroll (in pixels)
        backgroundTarget: 'body', // Background container for the site that the background css will be applied to
        cmdomain: 'www.eastbay.com', //Coremetrics domain
        cmtag: '' //Tag for coremetrics
    };
    var settings = {
        callback: null,
        onClick: null,
        onOver: null,
        onOut: null
    };
    var methods = {
        /* Initialization Process */
        init: function(options) {
            /* Apply canned defaults */
            settings = $.extend(settings, defaultsettings);
            /* Apply global settings */
            if (typeof(jqueryWings) !== 'undefined') {
                try {
                    settings = $.extend(settings, jqueryWings);
                } catch (err) {}
            }
            /* Apply instance-specific settings */
            settings = $.extend(settings, options);
            if (settings.enabled != true) {
                return;
            }
            if (settings.disableForTouch && methods.touchDetect()) {
                return;
            }
            return this.each(function() {
                if (methods.touchDetect()) {
                    vars.eventType = 'touchstart';
                } else {
                    vars.eventType = 'click';
                }
                var $element;
                $element = $(this);
                vars.parent = $element;
                /* Call to build and place the element */
                methods.buildContainer();
                /* Attach listeners */
                methods.attachListeners();
                /* Apply styles */
                methods.applyStyles();
            });
            /* Fire callback if configured */
            if (typeof settings.callback == 'function') {
                settings.callback.call();
            }
        },
        /* Build out floating container */
        buildContainer: function() {
            /* Create our element */
            vars.$this = $('<div>');
            /* Build default class name */
            var className = 'wings-' + settings.width + 'x' + settings.height + '';
            /* Set the DOM id if configured */
            if (settings.id !== '') {
                vars.$this.attr('id', settings.id);
            }
            /* Use the default class name for this title, if none is provided */
            if (settings.title === '') {
                settings.title = className;
            }
            /* Set the default class for this item */
            vars.$this.attr('class', className);
            if (settings.image !== '' && settings.content === '') {
                /* Attach the image to this element */
                vars.$this.append('<img class="wingImg" ' + 'height="' + settings.height + '" ' + 'width="' + settings.width + '" ' + 'src="' + settings.image + '" border="0"/>');
                /* Initialize Coremetrics */
                if (settings.link !== '') {
                    vars.$this.children().first().wrap('<a class="wingLink" title="' + settings.title + '"></a>');
                    vars.$this.children('.wingLink').attr('href', settings.link);
                }
            } else if (settings.content !== '') {
                /* If we're targeting an element */
                vars.$this.append($($(settings.content).html()).clone(true, true));
                $(settings.content).remove();
            }
            vars.parent.append(vars.$this);
        },
        /* Paint CSS styles on appropriate elements */
        applyStyles: function() {
            /* Apply CSS to this element! */
            vars.$this.css({
                height: settings.height,
                width: settings.width,
                position: settings.position,
                zIndex: settings.zOrder
            });
            /* Set the top/bottom position (overriding top if bottom is 0 or greater) */
            if (settings.bottom > -1) {
                vars.$this.css('bottom', settings.bottom);
            } else {
                vars.$this.css('top', settings.top);
            }
            /* Set the left/right position (overriding left if right is 0 or greater) */
            if (settings.right > -1) {
                vars.$this.css('right', settings.right);
            } else {
                vars.$this.css('left', settings.left);
            }
            /* Set the background of the desired wrapper*/
            if (settings.background !== 'none') {
                $(settings.backgroundTarget).css('background', settings.background + ' !important');
            }
            if (settings.position != 'fixed') {
                $(window).on('load', function() {
                    if (settings.bottom > -1) {
                        vars.$this.css('bottom', (vars.parent.height() - ($(window).height() + $(window).scrollTop())) + 'px');
                    } else {
                        vars.$this.css('top', (vars.parent.offset().top + settings.top) + 'px');
                    }
                });
                $(window).on('resize', function() {
                    if (settings.bottom > -1) {
                        vars.$this.css('bottom', (vars.parent.height() - ($(window).height() + $(window).scrollTop())) + 'px');
                    } else {
                        vars.$this.css('top', (vars.parent.offset().top + settings.top) + 'px');
                    }
                });
            }
        },
        /* Attach event handlers and listeners */
        attachListeners: function() {
            /* Attach click/touchstart listeners if they exist */
            methods.setupCM(vars.$this);
            if (typeof settings.onClick == 'function') {
                if (settings.link != '') {
                    vars.$this.children('.wingLink').on(vars.eventType, function(evt) {
                        settings.onClick.call(evt);
                    });
                } else {
                    vars.$this.on(vars.eventType, function(evt) {
                        settings.onClick.call(evt);
                    });
                }
            }
            /* Attach mouseover and mouseout callbacks if they exist */
            if (typeof settings.onOver == 'function') {
                vars.$this.on('mouseover', function(evt) {
                    settings.onOver.call(evt);
                });
            }
            if (typeof settings.onOut == 'function') {
                vars.$this.on('mouseout', function(evt) {
                    settings.onOut.call(evt);
                });
            }
            if (settings.position !== 'fixed' && settings.isStationary === false) {
                $(window).on('scroll', function() {
                    var bottom = settings.bottom + settings.buffer;
                    if (settings.animate) {
                        window.clearTimeout(vars.animationTimeout);
                    }
                    if (settings.bottom > -1) {
                        if ((vars.$this.offset().top + settings.height + settings.buffer) < vars.parent.height()) {
                            //Move down the page while we're far enough from the height of hte parent
                            bottom = (vars.parent.height() - ($(window).height() + $(window).scrollTop()));
                            if (settings.animate) {
                                vars.animationTimout = window.setTimeout(function() {
                                    vars.$this.animate({
                                        bottom: bottom + 'px'
                                    }, {
                                        duration: settings.duration,
                                        queue: false
                                    });
                                }, settings.duration);
                            } else {
                                vars.$this.css('bottom', bottom + 'px');
                            }
                            //Because AppleWebKit is fails to repaint correctly
                            $('<style></style>').appendTo(vars.parent).remove();
                        } else {
                            //...or move when we're below the top of the parent.
                            if ((vars.$this.offset().top - settings.buffer) >= vars.parent.offset().top) {
                                bottom = (vars.parent.height() - ($(window).height() + $(window).scrollTop()));
                                if (settings.animate) {
                                    vars.animationTimeout = window.setTimeout(function() {
                                        vars.$this.animate({
                                            bottom: bottom + 'px'
                                        }, {
                                            duration: settings.duration,
                                            queue: false
                                        });
                                    }, settings.duration);
                                } else {
                                    vars.$this.css('bottom', bottom + 'px');
                                }
                                //Because AppleWebKit is fails to repaint correctly
                                $('<style></style>').appendTo(vars.parent).remove();
                            }
                        }
                        //Prevent going past the original bottom setting
                        if (parseInt(vars.$this.css('bottom').replace('px', '')) < settings.bottom) {
                            vars.$this.css('bottom', settings.bottom);
                        }
                    } else {
                        if ((((vars.$this.offset().top + settings.height + settings.buffer)) < vars.parent.height())) {
                            //Move down the page while we're far enough from the bottom of the page...
                            if (settings.animate) {
                                vars.animationTimeout = window.setTimout(function() {
                                    vars.$this.animate({
                                        top: settings.top + $(window).scrollTop() + 'px'
                                    }, {
                                        duration: settings.duration,
                                        queue: false
                                    });
                                }, settings.duration);
                            } else {
                                vars.$this.css('top', settings.top + $(window).scrollTop() + 'px');
                            }
                            //Because AppleWebKit is fails to repaint correctly
                            $('<style></style>').appendTo(vars.parent).remove();
                        } else {
                            //...or move when we're getting away from the bottom of the page.
                            if ((settings.top + $(window).scrollTop()) < vars.$this.offset().top) {
                                if (settings.animate) {
                                    vars.animationTimeout = window.setTimeout(function() {
                                        vars.$this.animate({
                                            top: settings.top + $(window).scrollTop() + 'px'
                                        }, {
                                            duration: settings.duration,
                                            queue: false
                                        });
                                    }, settings.duration);
                                } else {
                                    vars.$this.css('top', settings.top + $(window).scrollTop() + 'px');
                                }
                                //Because AppleWebKit is fails to repaint correctly
                                $('<style></style>').appendTo(vars.parent).remove();
                            } //End If top + top < top
                        } //End If .. Else
                    }
                });
            }
        },
        /* Construct Coremetrics tag string */
        getcmstring: function(term) {
            var searchTerm = $.trim(term.toString().toLowerCase());
            searchTerm = searchTerm.replace(/[/]/ig, '');
            searchTerm = searchTerm.replace(/[^a-z0-9-+ ]/ig, '');
            searchTerm = searchTerm.replace(/ +/ig, '_');
            searchTerm = searchTerm.replace(/-+/ig, '');
            searchTerm = searchTerm.replace(/_+/ig, '_');
            return searchTerm;
        },
        /* Attach Coremetrics handlers for tagging */
        setupCM: function(elem) {
            elem.unbind(vars.eventType);
            elem.bind(vars.eventType, function() {
                var cm = "Wings-_-Wing-_-" + methods.getcmstring(settings.cmtag);
                cmCreateManualLinkClickTag(settings.cmdomain + '/?cm_sp=' + cm, methods.getcmstring(settings.cmtag));
            });
        },
        touchDetect: function() {
            return ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch);
        }
    };
    /* Constructor */
    $.fn.wings = function(method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.wings');
        }
    };
})(jQuery);
/* END wings */
