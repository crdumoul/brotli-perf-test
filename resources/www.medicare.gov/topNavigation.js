$(function () {
    //Set the variables
    var nav = $("#topnav"),
            theWindow = $(window),
            navList = $('#nav-list'),
            menuBtn = $('#menu-btn'),
            topnav = nav,
            tns = $('.topnavsubmenu', topnav),
            curTns = tns,
            fixedNav = false,
            slideDelay = 300;

    var collapseTimeout, keepCollapsed, collapseGracePeriod;

    if ($.browser.msie && (parseFloat($.browser.version) < 9)) { fixedNav = true; }

    function isResponsive() {
        return theWindow.width() < 980 && !fixedNav;
    }

    /* Responsive menu prepend menu icon */

    menuBtn.click(toggleResponsiveMenu)
    .keydown(function (e) {
        handleKeyDown(e, menuBtn.find("a:eq(0)"));
    });

    function theMenu() {
        var theUls = navList.find('.topnavsubmenu');
        theUls.each(function () {
            var name = $(this).siblings('a').text();
            /* Adds the slide forward button, currently styled plus signs but can be restyled to look like anything or use a graphic*/
            $(this).parent().addClass('sub').prepend('<span role="link" tabindex="0" class="slideForward"><span class="HiddenText 508State">Expand ' + name + ' menu</span></span>');

            /* Get the text of the first level link and adds a link on the second level to go back one */

            if ($("html").attr('lang') == 'es') {
                $(this).prepend('<li class="backTitle"><a href="#" class="slideBack"><span></span> Regresar al menu principal</a></li>');
            } else {
                $(this).prepend('<li class="backTitle"><a href="#" class="slideBack"><span></span> Back to Main Menu</a></li>');
            }
        });
        if (theWindow.width() < 979) {
            $(".slideForward").show();
            $(".backTitle").show();
        }

        /* 
        function that handles changing the menu on resized. Used the breakpoints as reference.
        The script uses the left position set in CSS to determine where to move it.
        */
        theWindow.resize(function () {
            if ($('#page') != null || $('#page').length != 0) {
                if (menuBtn.hasClass("active")) {
                    navList.slideToggle(0);
                    menuBtn.removeClass("active");
                    nav.toggleClass("activenav");
                    navList.css("left", "0");
                    topnav.removeClass('slideOne');
                    curTns.hide();
                }
                if (theWindow.width() >= 979) {
                    navList.css("margin-left", "0");
                    tns.css("margin-left", "0");
                    navList.find('.topnavsubmenu').css('margin-left', 0);
                    topnav.removeClass('slideOne');
                    tns.css('width', '');
                    tns.hide();
                    if ($(navList).hasClass('expandedResponsive')) {
                        $(navList).removeClass('expandedResponsive');
                    }
                }
                else if (theWindow.width() >= 767 && theWindow.width() < 979) {
                    tns.css('width', theWindow.width() - 60);
                }
                tns.css("left", "auto");
            } else {
                navList.css('display', 'block');
            }
        });

        /* 
        function for the move forward button
        */
        $(".slideForward").on("click keydown", function (e) {
            if (e.type == "keydown" && e.keyCode != 13 && e.keyCode != 32) {
                return;
            }
            e.stopPropagation();
            e.preventDefault();
            var moveFocusTo = $(this).nextAll("ul").find("li.backTitle > a").first();
            slideForward($(this), false, moveFocusTo);
        });

        /* 
        function for the move back button
        */

        $('a.slideBack').on("click", function () {
            var moveFocusTo = $(this).closest("li.sub").children("a:eq(0)");
            slideBackward($(this), false, moveFocusTo);
        });
    }
    /* calls theMenu() function*/
    if ($('#page').length != 0 && !fixedNav) {
        theMenu();
    } else {
        navList.css("display", "block");
    }


    nav.children("ul").children("li").each(function () {
        var item = $(this);
        var delaytimer;
        if (item.children("ul").length > 0) {

            //show subnav on hover  
            item.mouseenter(function () {
                delaytimer = window.setTimeout(function () {
                    expandSubMenu(item);
                }, 500);
            });
            //show subnav on focus 
            item.children("a").focus(function () {
                if (!keepCollapsed) {
                    expandSubMenu($(this).parent());
                }
            });

            //hide submenus on exit  
            item.mouseleave(function () {
                collapseSubMenu($(this));
                clearTimeout(delaytimer);
            });

            //enable arrow key navigation
            var link = item.children("a").first();
            link.next().andSelf()
            .keydown(function (e) {
                handleKeyDown(e, link);
            });
            link.append("<span class='HiddenText 508State'>, Collapsed</span>");
        }
    });

    /* handle arrow key navigation and escape key */
    function handleKeyDown(e, dropDownTrigger) {
        var target, forward;
        if (navList.is(":animated")) {
            return;
        }
        switch (e.keyCode) {
            case 27: // Esc
                e.stopPropagation();
                e.preventDefault();
                if (isResponsive()) {
                    menuBtn.find("a:eq(0)").focus();
                    collapseResponsiveMenu();
                } else {
                    dropDownTrigger.focus();
                    collapseSubMenu(dropDownTrigger.parent());
                    keepCollapsed = true;
                }
                break;
            case 38: // Up
            case 40: // Down
                e.stopPropagation();
                e.preventDefault();
                target = $(e.target);
                forward = e.keyCode == 40;

                if (isResponsive()) {
                    handleVerticalNavResponsive(target, forward);
                } else {
                    handleVerticalNav(target, forward, dropDownTrigger);
                }
                break;
            case 37: // left
            case 39: // right
                target = $(e.target);
                e.stopPropagation();
                e.preventDefault();
                forward = e.keyCode == 39;

                if (isResponsive()) {
                    handleHorizontalNavResponsive(target, forward);
                } else {
                    handleHorizontalNav(target, forward, dropDownTrigger);
                }
                break;
        }
    }

    /* Handle up and down arrow keys in full nav menu*/
    function handleVerticalNav(target, forward, dropDownTrigger) {
        var item, items, newItem;
        if (target.is(dropDownTrigger)) {
            expandSubMenu(dropDownTrigger.parent());
            item = target.next().find("li:not(.backTitle)").first();
        }
        else {
            item = target.closest("li:not(.backTitle)").first();
        }

        items = item.closest("li.sub").find("li:not(.backTitle)");

        if (target.is(dropDownTrigger)) {
            /* Move focus from top level menu item to submenu */
            newItem = forward ? items.first() : items.last();
        }
        else if (forward) {
            newItem = item.is(items.last()) ? items.first() : item.next("li");
        }
        else {
            newItem = item.is(items.first()) ? items.last() : item.prev("li");
        }
        newItem.children("a:eq(0)").focus();
    }

    /* Handle up and down arrow keys in responsive nav menu */
    function handleVerticalNavResponsive(target, forward) {
        var item, items, newItem, menu;
        if (target.is(menuBtn.find("a:eq(0)"))) {
            /* event occurred on dropdown button, move focus to submenu */
            items = navList.children("li");
            expandResponsiveMenu();
            item = items.first();
            newItem = forward ? items.first() : items.last();
        }
        else {
            item = target.closest("li");
            if (item.is(".backTitle")) {
                /* Get siblings from .backtitle link */
                items = item.siblings("li");
            }
            else {
                /* get siblings from regular item, parent submenu is either .topnavsubmenu or #nav-list  */
                menu = item.closest("ul.topnavsubmenu, ul#nav-list");
                /* For .topnavsubmenu use find() since the submenus can contain nested UL's. For #nav-list only get top level LI's*/
                items = menu.hasClass("topnavsubmenu") ? menu.find("li") : menu.children("li");
            }
            if (forward) {
                newItem = item.is(items.last()) ? items.first() : items.eq(items.index(item) + 1);
            }
            else {
                newItem = item.is(items.first()) ? items.last() : items.eq(items.index(item) - 1);
            }
        }
        newItem.children("a:eq(0)").focus();
    }

    /* Handle left and right arrow keys in regular nav menu */
    function handleHorizontalNav(target, forward, dropDownTrigger) {
        var item, items, newItem;

        item = target.closest(".sub");
        items = item.siblings(".sub").andSelf();

        if (forward) {
            newItem = item.is(items.last()) ? items.first() : item.next("li.sub");
        }
        else {
            newItem = item.is(items.first()) ? items.last() : item.prev("li.sub");
        }

        newItem.children("a:eq(0)").focus();
        expandSubMenu(newItem);
    }

    /* Handle left and right arrow keys in responsive nav menu */
    function handleHorizontalNavResponsive(target, forward) {
        var item, items, newItem;
        if (target.is(menuBtn.find("a:eq(0)"))) {
            return;
        }
        item = target.closest("li");

        if (forward) {
            if (target.parent().is("li.sub")) {
                slideForward(target, false, target.next().find("li.backTitle > a").first());
            }
        }
        else {
            if (target.parent().is("li.sub")) {
                return;
            }
            newItem = target.closest("li.sub");
            if (newItem.length) {
                slideBackward(target, false, newItem.children("a:eq(0)"));
            }
        }
    }

    /* Collapse any expanded nav submenus */
    function collapseAll() {
        if (isResponsive()) {
            collapseResponsiveMenu();
        } else {
            nav.children("ul").children("li").mouseleave();
        }
    }

    /* Collapse submenu in regular nav menu */
    function collapseSubMenu(item) {
        if (theWindow.width() >= 980 || fixedNav) {
            item.children("ul").stop(true, true).hide();
            item.removeClass("topnavhover");
            item.children("a").find(".508State").first().html(", Collapsed");
        }
    }

    /* Expand submenu in regular nav menu */
    function expandSubMenu(item) {
        if (!isResponsive()) {
            if (!(item.parent().parent().hasClass("activenav")) && !item.hasClass("topnavhover")) {
                item.children("ul").stop(true, true).show();
                $(".topnavhover").mouseleave();
                item.addClass("topnavhover");
                item.children("a").find(".508State").first().html(", Expanded");
                keepCollapsed = false;
            }
        }
    }

    /* Expand submenu in resonsive nav */
    function slideForward(item, noAnimation, newItem) {
        var slideIt = theWindow.width();
        var delay = noAnimation ? 0 : slideDelay;
        if (theWindow.width() >= 767 && theWindow.width() < 979) {
            slideIt -= 0;
        }
        topnav.addClass('slideOne');
        navList
            .animate({
                left: '-=' + slideIt
            }, delay, null, function () {
                /* Hide hidden top level items from tab order */
                item.closest("li.sub").addClass("expandedNavItem")
                    .children("a, [tabindex=0]").attr("tabindex", "-1");
                $(this).addClass("expandedResponsive");

                focusNewItem(newItem);
            });
        curTns = $(".topnavsubmenu", item.parent());
        curTns.show();
    }

    /* Collapse submenu in resonsive nav */
    function slideBackward(item, noAnimation, newItem) {
        var slideIt = tns.css('left');
        var delay = noAnimation ? 0 : slideDelay;
        var menu;
        topnav.removeClass('slideOne');
        /* Put hidden top level items back in tab order */
        item.closest("li.sub").removeClass("expandedNavItem")
            .children("a, [tabindex=0]").attr("tabindex", "0");
        navList.removeClass("expandedResponsive");

        menu = navList.css('display', 'block').animate({
            left: '+=' + slideIt
        }, delay, null, function () {
            focusNewItem(newItem);
        });
        curTns.hide();
        return false;
    }

    /* Expand main menu in responsive */
    function expandResponsiveMenu() {
        toggleResponsiveMenu(null, true);
    }

    /* Collapse main menu in responsive */
    function collapseResponsiveMenu() {
        toggleResponsiveMenu(null, false);

    }

    /* Expand or collapse main menu in responsive */
    function toggleResponsiveMenu(e, expand) {
        var isExpanded = menuBtn.hasClass("active");
        if (typeof expand === "undefined") {
            expand = !isExpanded;
        }

        if (isExpanded == expand) {
            return;
        }

        if (expand) {
            navList.slideDown(0);
        }
        else {
            /* Put hidden top level items back in tab order */
            navList.removeClass("expandedResponsive").find("li.expandedNavItem").removeClass("expandedNavItem")
            .children("a, [tabindex=0]").attr("tabindex", "0");

            navList.slideUp(0);
        }
        menuBtn.toggleClass("active", expand);
        nav.toggleClass("activenav", expand);
        menuBtn.find(".508State").html(expand ? ", Expanded" : ", Collapsed");
        curTns.hide();
        tns.css("width", theWindow.width() - 20);
        if (navList.css("display") == "none") {
            navList.css("left", "0");
        }
        if (theWindow.width() >= 767 && theWindow.width() < 979) {
            tns.css('width', theWindow.width() - 40);
            tns.css('left', theWindow.width());
        }
        else if (theWindow.width() < 979) {
            $(".slideForward").show();
            $(".backTitle").show();
            tns.css('left', theWindow.width());
        }
    }

    function focusNewItem(newItem) {
        setTimeout(function () { newItem.focus(); }, 0);
    }

    /* Automatically collapse nav menu once it loses focus. Delay must be higher than slide animation duration in responsive */
    navList.add(menuBtn)
        .click(function (e) {
            collapseGracePeriod = true; /* Prevent unintended collapse when focus is lost by clicking on focused mennuBtn */
            setTimeout(function () { collapseGracePeriod = false; }, slideDelay + 1000);
        })
        .focusout(function (e) {
            collapseTimeout = setTimeout(function () {
                if (!collapseGracePeriod && !navList.is(":animated")) {
                    collapseAll();
                }
            }, slideDelay + 200);
        })
        .focusin(function (e) {
            clearTimeout(collapseTimeout);
        });
});

