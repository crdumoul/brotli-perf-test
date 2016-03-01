(function($) {
    //Preload the loading image for both uc and qv.
    preload_QV_UC_loading = new Image();
    preload_QV_UC_loading.src = "/webassets/ann/en_US/assets/images/img/img-cartAjaxLoading.gif";

    /* Persistant Cart (universal cart) Javascript */
    /* --------------------------------------------- */

    // Commands
    // persistantCartCommands[0] = "showProduct" action
    // persistantCartCommands[1] = "addProduct" action
    // persistantCartCommands[2] = "addEnsemble" action
    // persistantCartCommands[3] = "remove" action
    // persistantCartCommands[4] = "addCatalogItems" action
    // persistantCartCommands[5] = "addProductWishlist" action
    // persistantCartCommands[6] = "addAllProductsWishlist" action

    var persistantCartCommands = new Array(4);
    persistantCartCommands[0] = "/ann/catalog/basket.jsp";
    persistantCartCommands[1] = "/checkout/add_item_pc.cmd";
    persistantCartCommands[2] = "/checkout/add_items_pc.cmd";
    persistantCartCommands[3] = "/checkout/delete_item_in_cart.cmd";
    persistantCartCommands[4] = "/checkout/add_catalog_order_item_pc.cmd";
    persistantCartCommands[5] = "/user/add_wishlist_item_to_basket_pc.cmd";
    persistantCartCommands[6] = "/user/add_all_wishlist_items_to_basket_pc.cmd";

    var tCart;
    var persistantCartContainerId = "#universalCart";
    var persistantCartCloseButClass = ".js-closeLayer";
    var hideTimeOuts = new Array();

    /* Function(s) to Show the Basket Layer */
    window.showBasket = function showBasket(action, params) {

        var ucartLoadingHTML = "";
        if ((action == "show") || (action == "remove") || (action == "addProduct")) {
            ucartLoadingHTML = '<div class="body ie6png"><img class="loading" src="/webassets/ann/en_US/assets/images/img/img-cartAjaxLoading.gif" /></div>' +
                '<div class="bottom ie6png"><!--  --></div>';
        }

        var requestURL = "";
        if ((action == "show") || (action == "showFromQuickview")) {
            requestURL = persistantCartCommands[0];
        } else if (action == "addProduct") {
            requestURL = persistantCartCommands[1];
        } else if (action == "addEnsemble") {
            requestURL = persistantCartCommands[2];
        } else if (action == "remove") {
            requestURL = persistantCartCommands[3];
        } else if (action == "addCatalogItems") {
            requestURL = persistantCartCommands[4];
        } else if (action == "addProductWishlist") {
            requestURL = persistantCartCommands[5];
        } else if (action == "addAllProductsWishlist") {
            requestURL = persistantCartCommands[6];
        } else { //alert("missing action"); 
        }

        /* Position the Layer */
        params = "ts=" + timestamp() + "&action=" + action + "&" + params;
        var pos = lib.utils.getPosition($("#CartToggle").parent())[0];
        pos[0] = pos[0] - 5;
        pos[1] = pos[1] + $("#CartToggle").parent().height();
        /* ------------------- */
        //alert(requestURL);
        $.getScript("/webassets/ann/en_US/js/jScrollPane.js");
        lib.layer.create(persistantCartContainerId, {
            url: requestURL,
            xPos: pos[0],
            yPos: pos[1],
            defaultContent: ucartLoadingHTML,
            data: params,
            method: "get",
            callback: function() {
                /* show the header Link as Active */
                $("#CartToggle").addClass("CartToggleOn");
                /* --------------- */

                $(persistantCartContainerId + " " + persistantCartCloseButClass).click(function(evt) {
                    evt.preventDefault();
                    hideBasket();
                });

                /* hide flyout cart after x seconds on mouseout */
                $(persistantCartContainerId).hover(function() {
                    clearTimeout(tCart);
                }, function() {
                    tCart = setTimeout(function() {
                        hideBasket()
                    }, 1000);
                });
                /* --------------- */
            }
        });
    };

    window.addToCart = function addToCart() {
        params = "productName=" + $("input[name=productName]").val() +
            "&productId=" + $("input[name=productId]").val() +
            "&amp;categoryId=" + $("input[name=categoryId]").val() +
            "&pCategoryId=" + $("input[name=pCategoryId]").val() +
            "&subCategoryId=" + $("input[name=subCategoryId]").val() +
            "&quantity=" + $("#quantity").val() +
            "&productVariantId=" + $("input[name=productVariantId]").val() +
            "&navFilter=" + $("input[name=navFilter]").val();
        $(" select").each(function() {
            params = params + "&" + $(this).attr("name") + "=" + $(this).val();
        });

        params = params + "&sizeInput=" + $(" input[name=sizeInput]").val() + "&sizeColorInput=" + $(" input[name=sizeColorInput]").val();

        //see if this is an update.
        if ($("input[name=itemGUID]").val().length > 0) {
            params = params + "&itemGUID=" + $("input[name=itemGUID]").val() + "&isUpdate=1";
        }

        showBasket('addProduct', params);
    };

    window.wishListAddToCart = function wishListAddToCart(params) {
        showBasket('addProductWishlist', params);
    };

    window.wishListAddAllToCart = function wishListAddAllToCart(params) {
        showBasket('addAllProductsWishlist', params);
    };

    window.addCatalogOrderItemsToCart = function addCatalogOrderItemsToCart() {
        params = "productId=" + $("input[name=productId]").val() +
            "&itemNumber=" + $("input[name=itemNumber]").val() +
            "&productName=" + $("input[name=productName]").val() +
            "&productVariantId=" + $("input[name=productVariantId]").val() +
            "&quantity=" + $("input[name=quantity]").val();
        showBasket('addCatalogItems', params);
    };

    window.addEnsembleToCart = function addEnsembleToCart(type) {
        params = "&ensembleId=" + $("input[name=ensembleId]").val() +
            "&amp;categoryId=" + $("input[name=categoryId]").val() +
            "&parentCategoryId=" + $("input[name=parentCategoryId]").val();

        // iterate through products in the ensemble for variant id
        $(".the-variant-ids").each(function() {
            params = params + "&" + $(this).attr("name") + "=" + $(this).val();
        });

        $(".the-product-ids").each(function() {
            params = params + "&" + $(this).attr("name") + "=" + $(this).val();
        });

        var names = '';
        $(".the-product-names").each(function(i) {
            if ($("select.the-variant-qtys:eq(" + i + ")").val() != '-1') {
                if (names == '') {
                    names = names + $(this).val();
                } else {
                    names = names + "," + $(this).val();
                }
            }
        });
        if (names != '') {
            params = params + "&productName=" + names;
        }

        $(".the-outfitproduct-ids").each(function() {
            params = params + "&" + $(this).attr("name") + "=" + $(this).val();
        });

        // iterate through products for qty
        $(".the-variant-qtys").each(function() {
            if (type == 'all') {
                $(this).val("1");
                params = params + "&" + $(this).attr("name") + "=1";
            } else {
                params = params + "&" + $(this).attr("name") + "=" + $(this).val();
            }
        });

        params = params + "&productCount=" + $(".the-variant-ids").length;
        showBasket('addEnsemble', params);
    };

    window.updateHeader = function updateHeader(amt) {
        $("#CartToggle .total").text("(" + amt + ")");
    };

    window.errorAppend = function errorAppend(area, msg) {
        $(area).html(msg.replace(/&amp;/g, "&").replace(/&lt;/g,
            "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'"));
        $(area).show();
    };

    window.resetErrorFields = function resetErrorFields() {
        $(".glo-tex-error").hide();
        $(".glo-tex-error").html("");
    };

    window.messageAppend = function messageAppend(area, msg) {
        $(area).html(msg);
        $(area).show();
    };

    window.resetMessageFields = function resetMessageFields() {
        $(".glo-tex-info").hide();
    };

    window.clearAllTimeouts = function clearAllTimeouts() {
        for (x = 0; x < hideTimeOuts.length; x++) {
            clearTimeout(hideTimeOuts[x]);
        }
    };

    window.timestamp = function timestamp() {
        return new Date().getTime();
    }

    //Edit this function if need to do something special on basket close.
    window.hideBasket = function hideBasket() {
        lib.layer.remove(persistantCartContainerId);
        // un-show the header Link as Active
        $("#CartToggle").removeClass("CartToggleOn");
    };

    /* QuickView Javascript */
    /* ---------------------------------------- */

    //quickViewcommands[0] = "show" action
    //quickViewcommands[1] = "add product" action
    var quickViewCommands = new Array(2);
    quickViewCommands[0] = "";
    quickViewCommands[1] = "/checkout/add_items_to_order_qv.cmd";

    var quickViewContainerId = "#widget-quickview";
    var quickViewContainerOverlay = "#quickview-overlay";
    var quickViewCloseButtonsClass = ".widget-quickview-but-close";
    var quickViewCloseButtonsAdd = ".widget-quickview-but-add";

    var quickviewContainerHTML = '<div id="quickview-overlay"></div><div id="widget-quickview"></div>';
    var quickviewLoadingHTML = '  <div id="cat-quickview-top" class="widget-ie6png"><!--  --></div>' +
        '  <div id="cat-quickview-body" class="widget-ie6png">' +
        '	 <div id="cat-quickview-content">' +
        '	   <div class="widget-ima-loader"><img src="/webassets/ann/en_US/assets/images/uc_qv/ima-glo-loading.gif" alt="Loading..." /></div>' +
        '    </div>' +
        '  </div>' +
        '  <div id="cat-quickview-bottom" class="widget-ie6png"><!--  --></div>';


    /* Function(s) for QuickView */
    window.loadQuickView = function loadQuickView(params, selector) {
        hideBasket();
        closeQuickView();
        addQuickView(selector);
        ajaxQuickView(quickViewCommands[0], params);

        // if this is an edit, want to have this appear above the cart.
        if (params.indexOf("itemGUID") != -1) {
            $(quickViewContainerId).css("z-index", "20");
        }
    };

    window.addQuickView = function addQuickView(selector) {
        /*
         * Inject the background element
         */
        $(selector)
            .append(quickviewContainerHTML)
            .find(quickViewContainerOverlay)

        /*
         * Close overlay when clicked
         */
        .click(function(e) {
            e.preventDefault();
            closeQuickView();
        });

        $(quickViewContainerId).append(quickviewLoadingHTML);
        adjustQuickviewLocation();
        $(quickViewContainerId).show();
    };

    window.closeQuickView = function closeQuickView() {
        $(quickViewContainerId).remove();
        $(quickViewContainerOverlay).remove();
        console.log('calling rfxQuickViewClose');
        rfxQuickViewClose();
        //	rfxQuickViewCleanup();
    };

    window.ajaxQuickView = function ajaxQuickView(page, params) {
        var returnFocus = (typeof document.activeElement === 'undefined') ? $('body') : $(document.activeElement);
        $.ajax({
            type: "GET",
            url: $.trim(page),
            data: "rId=" + new Date().getTime() + "&" + params,
            dataType: "html",
            success: function(msg) {
                $(quickViewContainerId)
                    .empty()
                    .append(msg)
                    .kbNavigationBlock(returnFocus);
            }
        });
    };

    window.addProductFromQuickView = function addProductFromQuickView(params) {

        params = params + "&productName=" + $(quickViewContainerId + " input[name=productName]").val() + "&productVariantId=" + $(quickViewContainerId + " input[name=productVariantId]").val();

        if ($(quickViewContainerId + " input[name=itemGUID]").size() > 0) {
            params = params + "&itemGUID=" + $(quickViewContainerId + " input[name=itemGUID]").val();
        }
        if ($(quickViewContainerId + " input[name=onBasketPage]").size() > 0) {
            params = params + "&onBasketPage=" + $(quickViewContainerId + " input[name=onBasketPage]").val();
        }

        $(quickViewContainerId + " select").each(function() {
            params = params + "&" + $(this).attr("name") + "=" + $(this).val();
        });

        params = params + "&sizeInput=" + $(quickViewContainerId + " input[name=sizeInput]").val() + "&sizeColorInput=" + $(quickViewContainerId + " input[name=sizeColorInput]").val();

        $(quickViewContainerId + " *").remove();
        $(quickViewContainerId).append(quickviewLoadingHTML);
        ajaxQuickView(quickViewCommands[1], params);
    };

    var qvInterval;

    window.setupQuickViewButtons = function setupQuickViewButtons(flag) {
        $(quickViewCloseButtonsClass).unbind("click").click(function() {
            closeQuickView();
        });
        $(quickViewCloseButtonsAdd).unbind("click").click(function() {

            setAddTo(1, flag);
            params = "productId=" + $(this).attr("id").split("-")[1];
            addProductFromQuickView(params);
        });
        $(quickViewCloseButtonsClass).add($(quickViewCloseButtonsAdd)).attr("href", "javascript:void(0)");

        qvInterval = setInterval("adjustQuickviewLocation();", 100);
        setTimeout(function() {
            clearInterval(qvInterval);
        }, 1000);
        adjustQuickviewLocation();
    };

    // Edit this per site to adjust location
    window.adjustQuickviewLocation = function adjustQuickviewLocation() {
        var bWindowOffsets = getScrollXY();
        var bWindowViewport = getViewportSize();
        var qvTop = ((bWindowViewport[1] / 2) - ($(quickViewContainerId).height() / 2)) + bWindowOffsets[1];
        var qvLeft = ((bWindowViewport[0] / 2) - ($(quickViewContainerId).width() / 2) - 13) + bWindowOffsets[0];
        qvTop = (qvTop < 0) ? 100 : qvTop;
        qvLeft = (qvLeft < 0) ? 100 : qvLeft;
        $(quickViewContainerId).css({
            "top": qvTop + "px",
            "left": qvLeft + "px"
        });

    };
    /* ---------------------- */

    // Helper Function(s)
    window.getScrollXY = function getScrollXY() {
        var scrOfX = 0,
            scrOfY = 0;
        if (typeof(window.pageYOffset) == 'number') {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return [scrOfX, scrOfY];
    }

    window.getViewportSize = function getViewportSize() {
        var vpW = 0,
            vpH = 0;
        if (typeof window.innerWidth != 'undefined') {
            vpW = window.innerWidth,
                vpH = window.innerHeight
        } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
            vpW = document.documentElement.clientWidth,
                vpH = document.documentElement.clientHeight
        } else {
            vpW = document.getElementsByTagName('body')[0].clientWidth,
                vpH = document.getElementsByTagName('body')[0].clientHeight
        }
        return [vpW, vpH];
    };

    window.iframeFix = function($) {
        return {
            add: function(id, selector) {
                iframeFix.remove(id);
                iframeHTML = '<div id="' + id + '"><iframe width="100%" height="100%" src="" style="filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);" frameborder="0"></iframe></div>'
                $("body").append(iframeHTML);
                $("#" + id).css("position", "absolute");
                $("#" + id).css("top", $(selector).css("top"));
                $("#" + id).css("left", $(selector).css("left"));
                $("#" + id).css("margin-top", $(selector).css("margin-top"));
                $("#" + id).css("margin-right", $(selector).css("margin-right"));
                $("#" + id).css("margin-bottom", $(selector).css("margin-bottom"));
                $("#" + id).css("margin-left", $(selector).css("margin-left"));
                $("#" + id).css("height", $(selector).height() + "px");
                $("#" + id).css("width", $(selector).width() + "px");
                $("#" + id).css("z-index", $(selector).css("z-index") - 1);
            },
            remove: function(id) {
                $("#" + id).remove();
            }
        }
    }($);
    // ------------------------------------------------

    /* Quickview setup */
    window.setup_quickview = function setup_quickview() {
        var qTimer;
        imgHTML = '<a href="#"><img id="widget-quickview-but" class="widget-ie6png" src="/assets/images/uc_qv/but-cat-quickview.png" alt="Quickview" /></a>';
        $(".widget-app-quickview").each(function() {
            $(this).parent().parent().css("position", "relative");
            $(this).mouseover(function() {
                if (typeof qTimer != undefined) {
                    clearTimeout(qTimer);
                    $("#widget-quickview-but").parent().remove();
                }
                $(this).parent().parent().append(imgHTML);
                $("#widget-quickview-but").css("position", "absolute");
                $("#widget-quickview-but").css("left", "10px");
                qTop = $(".widget-app-quickview", $("#widget-quickview-but").parent().parent()).height() - $("#widget-quickview-but").height() - 2 - 10;
                $("#widget-quickview-but").css("top", qTop + "px");
                $("#widget-quickview-but").mouseover(function() {
                    if (typeof qTimer != undefined) {
                        clearTimeout(qTimer);
                    }
                });
                $("#widget-quickview-but").parent().click(function(ev) {
                    type = $(this).parent().attr("id").split("-")[0];
                    id = $(this).parent().attr("id").split("-")[1];
                    if (type == "p") {
                        params = "productId=" + id;
                    } else {
                        params = "ensembleId=" + id;
                    }
                    loadQuickView(params, $("body"));
                });
                $("#widget-quickview-but").parent().attr("href", "javascript:void(0)");
            });
            $(this).mouseout(function() {
                qTimer = setTimeout(function() {
                    $("#widget-quickview-but").parent().remove();
                }, 100);
            });
        });
    };

    window.setup_quickview_basket = function setup_quickview_basket() {
        var qTimer;
        imgHTML = '<a href="#"><img id="widget-quickview-but" class="widget-ie6png" src="/assets/images/uc_qv/but-cat-quickview.png" alt="Quickview" /></a>';
        $(".widget-app-quickview-basket").each(function() {
            $(this).parent().parent().css("position", "relative");
            $(this).mouseover(function() {
                if (typeof qTimer != undefined) {
                    clearTimeout(qTimer);
                    $("#widget-quickview-but").parent().remove();
                }
                $(this).parent().parent().append(imgHTML);
                $("#widget-quickview-but").css("position", "absolute");
                $("#widget-quickview-but").css("left", "10px");
                qTop = $(".widget-app-quickview-basket", $("#widget-quickview-but").parent().parent()).height() - $("#widget-quickview-but").height() - 2 - 10;
                $("#widget-quickview-but").css("top", qTop + "px");
                $("#widget-quickview-but").mouseover(function() {
                    if (typeof qTimer != undefined) {
                        clearTimeout(qTimer);
                    }
                });
                $("#widget-quickview-but").parent().click(function(ev) {
                    params = $("span", $(this).parent()).text();
                    loadQuickView(params, $("body"));
                });
                $("#widget-quickview-but").parent().attr("href", "javascript:void(0)");
            });
            $(this).mouseout(function() {
                qTimer = setTimeout(function() {
                    $("#widget-quickview-but").parent().remove();
                }, 100);
            });
        });
    };

    /* Show cart on hover */
    window.cartHide = function cartHide() {
        $('.js-cartToggle').hover(function() {
                clearTimeout(tCart);
                if ($(persistantCartContainerId).size() == 0) {
                    showBasket('show', '');
                }
            }, function() {
                tCart = setTimeout(function() {
                    hideBasket()
                }, 500);
            })
            .kbhover();
    };

    $(function() {
        setup_quickview();
        setup_quickview_basket();
        cartHide();
    });
    /* -------------------------- */
}(window.$legacyjQuery));