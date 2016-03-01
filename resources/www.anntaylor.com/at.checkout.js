(function($) {
    var productName;
    var cartEvent;
    var quantity;
    var selectedSizeId = "";
    var orderDollarsAmount = "";
    var orderCentsAmount = "";
    var emailFlag = true;
    var editItemSubmitFlag = true;
    var at_account = s_account_id

    // Add to Cart Script

    // prepare the form when the DOM is ready
    $(document).ready(function() {

        //moved from checkout.jsp
        var showSingleShip;

        var myBillingAddressFlag = false;

        // setup default color
        colorId = $('#defColor').val();
        $('#colorCode').val(colorId);
        $('ul li#color' + $('#colorCode').val()).addClass("selected");
        var colorName = $('li#color' + colorId + ' a').attr('title');
        $("#newColorText_0").html(colorName);

        var options = {
            async: false,
            dataType: 'json',
            beforeSubmit: productFormShowRequest, // pre-submit callback
            success: showResponse // post-submit callback
        };
        // bind form using 'ajaxForm'
        $('#productForm').ajaxForm(options);

        //On selecting the Size Type(i.e Regular, Petite, Tall) to load the size and color fragment
        $("#fs-size input[type='radio']").live('click', function() {
            var cur_obj = $(this);
            var result = $(this).attr('rel');
            var result_array = result.split('$_$');
            // displaySizeType(result_array[0],result_array[1]);
            var id = result_array[0];
            var skuId = result_array[1];
            var productPageType = result_array[2];
            var colorExplode = result_array[3];
            var productImage = result_array[4];
            var selectedSizeId = $('#fs-size ol li').find('.selected').attr('id');
            var selectedColorCode = $('#color-picker').find('.selected').attr('id');
            var sizeTypeID = id;
            var imageId = $("#imageId").val();
            var sizeUrl = "/ann/catalog/skuSize.jsp?prodId=" + sizeTypeID + "&skuId=" + skuId + "&productPageType=" + productPageType;
            $("#SelectSize_0").load(sizeUrl, function() {
                if (typeof selectedSizeId !== null && selectedSizeId != "") {
                    $(selectedSizeId).addClass("selected");
                }
            });
            var colorUrl = "/ann/catalog/skuColor.jsp?prodId=" + sizeTypeID + "&imageId=" + imageId + "&skuId=" + skuId + "&productPageType=" + productPageType + "&imageId=" + productImage + "&colorExplode=" + colorExplode;
            $("#color-picker").load(colorUrl, function() {
                //To display the color after loading the fragment
                document.getElementById("newColorText_0").innerHTML = document.getElementById("colorName").value;
                if (document.getElementById("colorName") != null) {
                    document.getElementById("newColorText_0").innerHTML = document.getElementById("colorName").value;
                }
                defColorId = $('#defColor').val();
                $('#colorCode').val(defColorId);
                $('#color' + defColorId).addClass("selected");
                rfxProductColorChangeClick(imageId, defColorId);
            });
            if ($.browser.msie) {
                $(function() {
                    $("#selRootCat").attr("class", "selected");
                    $("#selChildCat").attr("class", "selected");
                });
            } else {
                if (document.getElementById("selRootCat") != null)
                    document.getElementById("selRootCat").setAttribute("class", "selected");
                if (document.getElementById("selChildCat") != null)
                    document.getElementById("selChildCat").setAttribute("class", "selected");
            }
            if (document.getElementById("selectedPage") != null) {
                document.getElementById("selectedPage").setAttribute("class", "selected");
            }
        });

        //Clicked on SIZE
        $("#fs-size ol li").live('click', function() {
            var result = $(this).attr('rel');
            var result_array = result.split('$_$');

            //displayColors($(this),result_array[0],result_array[1],result_array[2],result_array[3],result_array[4]);
            var obj = $(this);
            var sizeCode = result_array[0];
            var productId = result_array[1];
            var skuId = result_array[2];
            var productPageType = result_array[3];
            var colorExplode = result_array[4];
            var selectedSizeId = ".size" + obj.id + " a";

            //Make size selected
            $('#fs-size').find('.selected').removeClass("selected");
            $('#' + sizeCode).addClass("selected");

            //Passing the selected sizeCode and colorCode to the skuColor.jsp
            var colorCode = $('#color-picker').find('.selected').attr('id');
            var imageId = $("#imageId").val();
            $("#sizeCode").val(sizeCode);
            //on clicking the size load skuColor.jsp
            var url = "/ann/catalog/skuColor.jsp?prodId=" + productId + "&" + "sizeCode=" + sizeCode + "&colorCode=" + colorCode + "&imageId=" + imageId + "&skuId=" + skuId + "&productPageType=" + productPageType + "&colorExplode=" + colorExplode;
            $("#color-picker").load(url, function() {
                if (document.getElementById("colorName") != null) {
                    document.getElementById("newColorText_0").innerHTML = document.getElementById("colorName").value;
                }
                var isColorDisabled = false;
                $('#color-picker').find('.sold-out').each(function() {
                    var soldoutColorCode = $(this).attr('id');
                    if (soldoutColorCode == colorCode) {
                        isColorDisabled = true;
                    }
                });
                if (isColorDisabled) {
                    // reset color because when user changes size they need to select a new color
                    $("#colorCode").val("");
                    $('.finalSaleColorMessage').hide();
                } else {
                    $('#' + colorCode).addClass("selected");
                    var colorId = colorCode.substr("color".length, colorCode.length);
                    $("#colorCode").val(colorId);
                }
            });

            if ($.browser.msie) {
                $(function() {
                    $("#selRootCat").attr("class", "selected");
                    $("#selChildCat").attr("class", "selected");
                });
            } else {
                if (document.getElementById("selRootCat") != null)
                    document.getElementById("selRootCat").setAttribute("class", "selected");
                if (document.getElementById("selChildCat") != null)
                    document.getElementById("selChildCat").setAttribute("class", "selected");
            }

            if (document.getElementById("selectedPage") != null) {
                document.getElementById("selectedPage").setAttribute("class", "selected");
            }

        });

        //Clicked on SIZE for Find in Store
        $("#fs-size-find ol li").live('click', function() {
            var result = $(this).attr('rel');
            var result_array = result.split('$_$');

            //displayColors($(this),result_array[0],result_array[1],result_array[2],result_array[3],result_array[4]);
            var obj = $(this);
            var sizeCode = result_array[0];
            var productId = result_array[1];
            var skuId = result_array[2];
            var productPageType = result_array[3];
            var colorExplode = result_array[4];
            var selectedSizeId = ".size" + obj.id + " a";

            //Make size selected
            $('#fs-size-find').find('.selected').removeClass("selected");
            //alert($('#fs-size-find ol li a#'+sizeCode));
            $(this).find('#' + sizeCode).addClass("selected");
            //$('#'+sizeCode).addClass("selected");

            //Passing the selected sizeCode and colorCode to the skuColor.jsp
            var colorCode = $('#color-picker-find').find('.selected').attr('id');


            var imageId = $("#imageId").val();
            $("#sizeCode").val(sizeCode);
            //on clicking the size load skuColor.jsp
            var url = "/ann/catalog/skuColor.jsp?prodId=" + productId + "&" + "sizeCode=" + sizeCode + "&colorCode=" + colorCode + "&imageId=" + imageId + "&skuId=" + skuId + "&productPageType=" + productPageType + "&colorExplode=" + colorExplode + "&findInStore=true";
            $("#color-picker-find").load(url, function() {
                if (document.getElementById("colorName") != null) {
                    document.getElementById("newColorText_0").innerHTML = document.getElementById("colorName").value;
                }

                $('#' + colorCode).addClass("selected");
                var colorId = colorCode.substr("color".length, colorCode.length);
                $("#colorCode").val(colorId);
                document.getElementById("selectedFindColorCode").value = colorId;

            });
            if ($.browser.msie) {
                $(function() {
                    $("#selRootCat").attr("class", "selected");
                    $("#selChildCat").attr("class", "selected");
                });
            } else {
                if (document.getElementById("selRootCat") != null)
                    document.getElementById("selRootCat").setAttribute("class", "selected");
                if (document.getElementById("selChildCat") != null)
                    document.getElementById("selChildCat").setAttribute("class", "selected");
            }

            if (document.getElementById("selectedPage") != null) {
                document.getElementById("selectedPage").setAttribute("class", "selected");
            }

            document.getElementById("selectedFindSizeCode").value = sizeCode;
            $('#errorFindSizeCode').hide();

        });

        // Color code for Find In Store
        $("#colorCodefis").val("");

        // Clicked on COLOR
        $("#color-picker ul li").live('click', function(event) {
            var result = $(this).attr('rel');
            var result_array = result.split('$_$');

            //displaySizes($(this),result_array[0],result_array[1],result_array[2],result_array[3],result_array[4]);
            var obj = $(this);
            var colorId = result_array[0];
            var productId = result_array[1];
            var skuId = result_array[2];
            var productPageType = result_array[3];
            var colorExplode = result_array[4];
            var colorCode = 'color' + colorId;
            var sizeId = $('#fs-size ol li').find('.selected').attr('id');

            $('.finalSaleColorMessage').hide();
            if (typeof(finalSaleColors) == 'object' && typeof(finalSaleColors.colors) == 'object') {
                if ($.inArray(parseInt(colorId), finalSaleColors.colors) !== -1) {
                    $('.finalSaleColorMessage').show();
                }
            }

            //Make the swatch selectable
            var imageId = $("#imageId").val();
            $("#colorCodefis").val(colorId);
            $('#color-picker').find('.selected').removeClass('selected');
            $(obj).addClass('selected');

            //Passing the selected sizeCode and colorCode to the skuSize.jsp
            var sizeCode = $("#sizeCode").val();
            $("#colorCode").val(colorId);

            var url = "/ann/catalog/skuSize.jsp?prodId=" + productId + "&" + "colorCode=" + colorId + "&sizeCode=" + sizeCode + "&imageId=" + imageId + "&skuId=" + skuId + "&productPageType=" + productPageType + "&colorExplode=" + colorExplode;
            $("#SelectSize_0").load(url, function() {
                if (sizeId) {
                    sizeId = "#" + sizeId;
                    $('#fs-size ol li').find(sizeId).addClass('selected');
                }
                $('#sizeCode').val(sizeCode);
                $('#color-picker').find('#' + colorCode).addClass("selected");
            });
            if ($.browser.msie) {
                $(function() {
                    $("#selRootCat").attr("class", "selected");
                    $("#selChildCat").attr("class", "selected");
                });
            } else {
                if (document.getElementById("selRootCat") != null)
                    document.getElementById("selRootCat").setAttribute("class", "selected");
                if (document.getElementById("selChildCat") != null)
                    document.getElementById("selChildCat").setAttribute("class", "selected");
            }
            //document.getElementById("sizeCode").value = sizeCode;

            if (document.getElementById("selectedPage") != null) {
                document.getElementById("selectedPage").setAttribute("class", "selected");
            }
            rfxProductColorChangeClick(result_array[5], result_array[6]);
        });

        $("#color-picker ul li").live('mouseout', function(event) {
            if ((navigator.userAgent.indexOf('iPhone') == -1) && (navigator.userAgent.indexOf('iPad') == -1)) {
                var result = $(this).attr('rel');
                var result_array = result.split('$_$');
                // removed for new viewer 
                // rfxProductColorChangeHover(event,result_array[5], result_array[6],'mouseout');
            }
        });

        $("#color-picker ul li").live('mouseover', function(event) {
            if ((navigator.userAgent.indexOf('iPhone') == -1) && (navigator.userAgent.indexOf('iPad') == -1)) {
                var result = $(this).attr('rel');
                var result_array = result.split('$_$');
                displaySwatchName(result_array[7], result_array[8]);
                // removed for new viewer
                // rfxProductColorChangeHover(event,result_array[5], result_array[6],'mouseover');
            }
        });

        //On selecting the Size Type(i.e Regular, Petite, Tall) to load the size and color fragment
        $("#fs-size-find input[type='radio']").live('click', function() {
            $('#widget-findInStore #newColorText_0').html('');
            var cur_obj = $(this);
            var result = $(this).attr('rel');
            var result_array = result.split('$_$');
            // displaySizeType(result_array[0],result_array[1]);
            var id = result_array[0];
            var skuId = result_array[1];
            var productPageType = result_array[2];
            var colorExplode = result_array[3];
            var productImage = result_array[4];
            var selectedSizeId = $('#fs-size-find ol li').find('.selected').attr('id');
            var selectedColorCode = $('#color-picker-find').find('.selected').attr('id');
            var sizeTypeID = id;
            var imageId = $("#widget-findInStore #imageId").val();
            var sizeUrl = "/ann/catalog/skuSize.jsp?prodId=" + sizeTypeID + "&skuId=" + skuId + "&productPageType=" + productPageType + "&findInStore=true";
            /*$("#widget-findInStore #SelectSize_0").load(sizeUrl,function(){
            	 if(typeof selectedSizeId !== null && selectedSizeId !="") {
            			$(selectedSizeId).addClass("selected");
            	}
            });*/

            $('#fs-size-find ol.multiSelect').load(sizeUrl, function() {
                if (typeof selectedSizeId !== null && selectedSizeId != "") {
                    $(selectedSizeId).addClass("selected");
                }
            });
            var colorUrl = "/ann/catalog/skuColor.jsp?prodId=" + sizeTypeID + "&imageId=" + imageId + "&skuId=" + skuId + "&productPageType=" + productPageType + "&imageId=" + productImage + "&colorExplode=" + colorExplode + "&findInStore=true";
            $("#color-picker-find").load(colorUrl, function() {
                //To display the color after loading the fragment
                console.log($('#color-picker-find li').length);
                if ($('#color-picker-find li').length) {
                    $('#widget-findInStore #newColorText_0').html($defaultColorTitle);
                }
                document.getElementById("newColorText_0").innerHTML = document.getElementById("colorName").value;
                if (document.getElementById("colorName") != null) {
                    document.getElementById("newColorText_0").innerHTML = document.getElementById("colorName").value;
                }

                var browserVersion = $.browser.version;
                browserVersion = browserVersion.substring(0, 1);
                if ($.browser.msie && browserVersion == "7") {
                    defColorId = $('#defColor').attr("value");
                } else {
                    defColorId = $('#widget-findInStore #defColor').val();
                }

                $('#widget-findInStore #colorCode').val(defColorId);
                $('#widget-findInStore #color' + defColorId).addClass("selected");
                $('#selectedFindColorCode, #selectedFindSizeCode').val('');
                changeImage(defColorId);
                $('#widget-findInStore #newColorText_0').html($('#widget-findInStore #color' + defColorId + ' a').attr('alt'));
            });
            if ($.browser.msie) {
                $(function() {
                    $("#selRootCat").attr("class", "selected");
                    $("#selChildCat").attr("class", "selected");
                });
            } else {
                if (document.getElementById("selRootCat") != null)
                    document.getElementById("selRootCat").setAttribute("class", "selected");
                if (document.getElementById("selChildCat") != null)
                    document.getElementById("selChildCat").setAttribute("class", "selected");
            }
            if (document.getElementById("selectedPage") != null) {
                document.getElementById("selectedPage").setAttribute("class", "selected");
            }
        });

        function changeImage(currentColorSel) {
            $imgSrc = $('#findInStoreMain').attr('src');
            $imgSrcArray = $imgSrc.split("/");
            $imgSrcSplit = ($imgSrcArray[5]).split("_");
            $mainImgSrc = $imgSrc.lastIndexOf("/") + 1;
            $basicImgSrc = $imgSrc.substring(0, $mainImgSrc);
            $modifiedImgUrl = $imgSrcSplit[0] + '_' + currentColorSel + '_' + $imgSrcSplit[2];
            $newestUrl = $basicImgSrc + $modifiedImgUrl;
            $('#findInStoreMain').attr("src", $newestUrl);
            return ($newestUrl);
        }

        function changeImageOver(currentColorSel) {
            $imgSrc = $('#findInStoreMain').attr('src');
            $imgSrcArray = $imgSrc.split("/");
            $imgSrcSplit = ($imgSrcArray[5]).split("_");
            $mainImgSrc = $imgSrc.lastIndexOf("/") + 1;
            $basicImgSrc = $imgSrc.substring(0, $mainImgSrc);
            $modifiedImgUrl = $imgSrcSplit[0] + '_' + currentColorSel + '_' + $imgSrcSplit[2];
            $newestUrl = $basicImgSrc + $modifiedImgUrl;
            $('#findInStoreMain').attr("src", $newestUrl);
        }

        // Clicked on COLOR
        $("#color-picker-find ul li").live('click', function(event) {
            var result = $(this).attr('rel');
            var result_array = result.split('$_$');

            //displaySizes($(this),result_array[0],result_array[1],result_array[2],result_array[3],result_array[4]);
            var obj = $(this);
            var colorId = result_array[0];
            var productId = result_array[1];
            var skuId = result_array[2];
            var productPageType = result_array[3];
            var colorExplode = result_array[4];
            var colorCode = 'color' + colorId;
            var sizeId = $('#fs-size-find ol li').find('.selected').attr('id');
            //Make the swatch selectable
            var imageId = $("#imageId").val();
            //alert('sizeid='+sizeId);
            $('#color-picker-find').find('.selected').removeClass('selected');
            $(obj).addClass('selected');
            if ($(this).hasClass('initial')) {
                $(this).removeClass('initial');
            }
            //Passing the selected sizeCode and colorCode to the skuSize.jsp
            var sizeCode = $("#sizeCode").val();
            $("#colorCode").val(colorId);

            document.getElementById("selectedFindColorCode").value = colorId;

            var url = "/ann/catalog/skuSize.jsp?prodId=" + productId + "&" + "colorCode=" + colorId + "&sizeCode=" + sizeCode + "&imageId=" + imageId + "&skuId=" + skuId + "&productPageType=" + productPageType + "&colorExplode=" + colorExplode + "&findInStore=true";

            /*$("#fs-size-find").find("#SelectSize_0").load(url,function(){
            	if(sizeId){
            		sizeId = "#"+sizeId;
            		$('#fs-size-find ol li').find(sizeId).addClass('selected');
            	}
            	$('#sizeCode').val(sizeCode);
            	$('#color-picker-find').find('#'+colorCode).addClass("selected");
            	
            	document.getElementById("selectedFindSizeCode").value=sizeCode;

            });*/

            $('#fs-size-find ol.multiSelect').load(url, function() {
                if (sizeId) {
                    sizeId = "#" + sizeId;
                    $('#fs-size-find ol li').find(sizeId).addClass('selected');
                }
                $('#sizeCode').val(sizeCode);
                $('#color-picker-find').find('#' + colorCode).addClass("selected");

                document.getElementById("selectedFindSizeCode").value = sizeCode;

            });


            if ($.browser.msie) {
                $(function() {
                    $("#selRootCat").attr("class", "selected");
                    $("#selChildCat").attr("class", "selected");
                });
            } else {
                if (document.getElementById("selRootCat") != null)
                    document.getElementById("selRootCat").setAttribute("class", "selected");
                if (document.getElementById("selChildCat") != null)
                    document.getElementById("selChildCat").setAttribute("class", "selected");
            }
            //document.getElementById("sizeCode").value = sizeCode;

            if (document.getElementById("selectedPage") != null) {
                document.getElementById("selectedPage").setAttribute("class", "selected");
            }
            //rfxProductColorChangeClick(result_array[5], result_array[6]);
            $currentColorSel = parseInt(result_array[6]);
            changeImage($currentColorSel);
            $defaultColorTitle = result_array[7];
            $('#widget-findInStore #newColorText_0').html($defaultColorTitle);
            $('#findInStoreMain').error(function() {
                console.log("ad");
                console.log("preimgSrc=>" + $preimgSrc);
                $(this).unbind("error").attr("src", $imgSrc);
                $('#findInStoreMain').attr("src", $preimgSrc);
                $newestUrl = $preimgSrc;
            });
            $preimgSrc = $newestUrl;
            $('#errorFindColorCode').hide();
        });

        $("#color-picker-find ul li").live('mouseover', function(event) {
            var result = $(this).attr('rel');
            var result_array = result.split('$_$');
            //rfxProductColorChangeHover(event,result_array[5], result_array[6],'mouseover');
            $currentColorSel = parseInt(result_array[6]);
            changeImage($currentColorSel);
            var getCurrentUrl = changeImageOver($currentColorSel);
            $('#findInStoreMain').attr("src", getCurrentUrl);
            $('#widget-findInStore #newColorText_0').html(result_array[7]);
            $('#findInStoreMain').error(function() {
                $(this).unbind("error").attr("src", $imgSrc);
                $('#findInStoreMain').attr("src", $imgSrc);
                //$preimgSrc = $imgSrc;
            });
        });
        $("#color-picker-find ul li").live('mouseout', function(event) {
            var result = $(this).attr('rel');
            var result_array = result.split('$_$');
            //rfxProductColorChangeHover(event,result_array[5], result_array[6],'mouseout');
            $('#findInStoreMain').attr("src", $preimgSrc);
            $('#widget-findInStore #newColorText_0').html($defaultColorTitle);
        });

        //moved from checkout.jsp
        var options = {
            dataType: 'json',
            beforeSubmit: showRequest, // pre-submit callback
            success: showResponse // post-submit callback
        };
        $('#guestCheckoutForm').ajaxForm(options);
        $('#checkoutLoginForm').ajaxForm(options);
        $('#regShippingForm').ajaxForm(options);
        $('#regPaymentForm').ajaxForm(options);
        $('#regCommitOrderForm').ajaxForm(options);

    });

    //moved from checkout.jsp
    window.loadScript = function loadScript() {
        $.ajax({
            url: "/ann/cart/include/script.jsp",
            cache: false,
            type: "GET",
            async: false,
            success: function(data) {
                $('#loadScript').html(data);
                ATCheckout.init();
            }
        });
    }

    /* NOT SURE WHY THIS IS HERE */
    var hs_ES = "28~anntaylor";
    var h_w = window;


    // product detail page form request
    window.productFormShowRequest = function productFormShowRequest(formData, jqForm, options) {
        var form = jqForm[0];

        form.sizeCode.value = document.getElementById("sizeCode").value;
        var queryString = $.param(formData);

        return validateProductDetailForm();
    }


    window.validateProductQVForm = function validateProductQVForm() {
        var colorcd = "";
        var sizecd = "";
        if (document.getElementById('colorCode') != null && document.getElementById('colorCode').value != 'undefined')
            colorcd = document.getElementById('colorCode').value;
        if (document.getElementById('sizeCode') != null && document.getElementById('sizeCode').value != 'undefined')
            sizecd = document.getElementById('sizeCode').value;

        if (sizecd == "" || colorcd == "") {
            $('#commorErrorMessageInPDPage').show();
            //document.getElementById('commorErrorMessageInPDPage').innerHTML="Please correct the error(s) identified below.";
            if (sizecd == "") {
                $('#sizeCode1').show();
                document.getElementById('sizeCode1').innerHTML = "Select size.";
            } else {
                $('#sizeCode1').hide();
                document.getElementById('sizeCode1').innerHTML = "";
            }

            if (colorcd == "") {
                $('#colorCode1').show();
                document.getElementById('colorCode1').innerHTML = "Select color.";
            } else {
                $('#colorCode1').hide();
                document.getElementById('colorCode1').innerHTML = "";
            }

            return false;
        } else {
            $('#commorErrorMessageInPDPage').hide();
            document.getElementById('commorErrorMessageInPDPage').innerHTML = "";
            $('#colorCode1').hide();
            document.getElementById('colorCode1').innerHTML = "";
            $('#sizeCode1').hide();
            document.getElementById('sizeCode1').innerHTML = "";
            return true;
        }
    }

    window.validateProductDetailForm = function validateProductDetailForm() {
        var colorcd = "";
        var sizecd = "";
        if (document.getElementById('colorCode') != null && document.getElementById('colorCode').value != 'undefined')
            colorcd = document.getElementById('colorCode').value;
        if (document.getElementById('sizeCode') != null && document.getElementById('sizeCode').value != 'undefined')
            sizecd = document.getElementById('sizeCode').value;

        if (sizecd == "" || colorcd == "") {
            $('#commorErrorMessageInPDPage').show();
            document.getElementById('commorErrorMessageInPDPage').innerHTML = "Please correct the error(s) identified below.";
            if (sizecd == "") {
                $('#sizeCode1').show();
                document.getElementById('sizeCode1').innerHTML = "Please select a size.";
            } else {
                $('#sizeCode1').hide();
                document.getElementById('sizeCode1').innerHTML = "";
            }

            if (colorcd == "") {
                $('#colorCode1').show();
                document.getElementById('colorCode1').innerHTML = "Please select a color.";
            } else {
                $('#colorCode1').hide();
                document.getElementById('colorCode1').innerHTML = "";
            }

            return false;
        } else {
            $('#commorErrorMessageInPDPage').hide();
            document.getElementById('commorErrorMessageInPDPage').innerHTML = "";
            $('#colorCode1').hide();
            document.getElementById('colorCode1').innerHTML = "";
            $('#sizeCode1').hide();
            document.getElementById('sizeCode1').innerHTML = "";
            return true;
        }
    }

    window.showRequest = function showRequest(formData, jqForm, options) {
        var queryString = $.param(formData);
        return true;
    }

    // post-submit callback
    window.showResponse = function showResponse(responseText, statusText) {
        // report form errors
        var processErrors = function(kmap) {
            taylor.processErrors(responseText.errors, kmap);
        };

        if (responseText.pagetype == 'shipping') {
            $("div.error").empty();
            if (responseText.error == "true") {
                processErrors();
                document.getElementById('commorErrorMessage').innerHTML = "Please correct the error(s) identified below.";
            } else {
                //$('.checkout-details .btn-next1[rel]').click();
                $('#shippingForm').hide();
                $('.ship-summary').show();
                $('#billingInfoForm').show();
                $('.payment-summary').hide();
                $('.same-as-shipping').show();
                if (showSingleShip) {
                    loadFragment("/ann/checkout/shippingSummary.jsp", "#shipSummary");
                } else {
                    loadFragment("/ann/checkout/shippingToMultipleSummary.jsp", "#shipSummary");
                }
                loadFragment("/ann/cart/cart.jsp", "#includeCart", function() {
                    ATCheckout.init();
                });
                //loadOrderTotal();
            }
        }

        if (responseText.pagetype == 'regShipping') {
            $("div.error").empty();
            if (responseText.error == 'true') {
                processErrors();
            } else {

                //$('.checkout-details .btn-save-changes1').click();
                $('#regShippingForm').hide();
                $('#clearfixship-summary').show();
                $('#regPaymentForm').show();

                $('.payment-summary').hide();
                $('#shipSummary').show();
                if (showSingleShip) {
                    loadFragment("/ann/checkout/shippingSummary.jsp", "#shipSummary");
                } else {
                    loadFragment("/ann/checkout/shippingToMultipleSummary.jsp", "#shipSummary");
                }
                $('.security-code').hide();
                //$('.security-code').load("/ann/checkout/includes/securityCodeFrag.jsp");
                loadFragment("/ann/cart/cart.jsp", "#includeCart", function() {
                    ATCheckout.init();
                });
            }
        }

        if (responseText.pagetype == 'payment') {

            $("div.error").empty();
            if (responseText.error == "true") {


                processErrors({
                    'avs.failed': 'avsFaild',
                    'phoneNumber': 'phoneNumberInBillingAddress'
                });
                document.getElementById('commorErrorMessageInPayment').innerHTML = "Please correct the error(s) identified below.";

            } else {
                $('#shippingForm').hide();
                $('.ship-summary').show();
                $('#billingInfoForm').hide();
                $('.payment-summary').show();
                $('#commitOrderForm').show();
                newAccountCreated = true;

                loadFragment("/ann/checkout/paymentSummary.jsp", "#paymentSummary");
                loadFragment("/ann/cart/cart.jsp", "#includeCart", function() {
                    ATCheckout.init();
                });
            }
        }
        if (responseText.pagetype == 'regPayment') {
            if (responseText.error == 'true') {
                processErrors({
                    'avs.failed': 'avsFaildInRegBilling'
                });
            } else {
                //$('.checkout-details .btn-save-changes2').click();
                $('#regPaymentForm').hide();
                $('.payment-summary').show();
                $('#paymentSummary').show();
                loadFragment("/ann/checkout/regPaymentSummary.jsp", "#paymentSummary");
                $('.security-code').show();
                $('.security-code').load("/ann/checkout/includes/securityCodeFrag.jsp");
                loadFragment("/ann/cart/cart.jsp", "#includeCart", function() {
                    ATCheckout.init();
                });

            }
        }
        if (responseText.pagetype == 'guestcheckout') {
            if (responseText.error == 'true') {
                processErrors();
            } else {
                loadFragment("/ann/checkout/checkoutProcess.jsp", ".col-secondary", function() {
                    ATCheckout.init();
                });
                loadFragment("/ann/cart/cart.jsp", "#includeCart", function() {
                    ATCheckout.init();
                });
            }
        }

        if (responseText.pagetype == 'shipToMulti') {
            if (responseText.error == 'true') {
                processErrors();
            } else {

                $('#regPaymentForm').show();
                $('.security-code').hide();
                $('#orderitem').hide();
                $('#regMutliShipForm').hide();
                $('.payment-summary').hide();
                $('.ship-summary').show();
                $('#ship-summary').show();
                loadFragment("/ann/checkout/shippingToMultipleSummary.jsp", "#shipSummary");
                loadFragment("/ann/cart/cart.jsp", "#includeCart", function() {
                    ATCheckout.init();
                });
            }

        }
        if (responseText.pagetype == 'addShippingAddress') {
            $("div.error").empty();
            if (responseText.error == 'true') {
                processErrors({
                    'phoneNumber': 'phoneAddNumberNewShipping'
                });
                document.getElementById('commorErrorMessageInAddShippingAddress').innerHTML = "Please correct the error(s) identified below.";
            } else {

                $('.mult-address-form').remove();
                $.ajax({
                    url: "/ann/checkout/shipToMultiple.jsp",
                    cache: false,
                    type: "GET",
                    success: function(data) {
                        $('.contentWrap .btn-cancel').click();
                        $('.ship-summary').after(data);
                        $('.select-box-container').cascadeZIndex();
                        $('#pageTemplate a[rel=#address-overlay]').overlay();
                    }
                });

            }
        }
        if (responseText.pagetype == 'promo') {
            //var url="/ann/cart/orderPriceDetails.jsp";
            loadFragment("/ann/cart/cart.jsp", "#includeCart");
            //loadFragment("/ann/cart/orderPriceDetails.jsp",".cart-summary")
        }

        if (responseText.pagetype == 'giftbox') {
            $.ajax({
                url: '/ann/cart/cart.jsp',
                cache: false,
                type: "GET",
                async: false,
                success: function(data) {
                    $('#includeCart').html(data);
                    ATCheckout.init();
                }

            });

        }
        if (responseText.pagetype == 'giftCard') {
            if (responseText.error == 'true') {
                document.getElementById('CommonErrorMessageInGCEdit').innerHTML = "";
                for (x = 0; x < responseText.errors.length; x++) {
                    var key = responseText.errors[x];
                    var value = responseText.errors[x + 1];
                    //document.getElementById(key).innerHTML=value;
                    x = x + 1;
                    if (key == 'gcRecipientNames') {
                        taylor.processErrors([document.getElementById('gcRecipientNames1'), value]);
                    }
                }
                document.getElementById('CommonErrorMessageInGCEdit').innerHTML = "Please correct the error(s) identified below.";
            } else {
                loadFragment("/ann/cart/cartDynamic.jsp", "#includeCart")
            }
        }

        if (responseText.pagetype == 'egiftCard') {

            $("div.error").empty();
            if (responseText.error == 'true') {
                processErrors({
                    'egcConfirmReciepentEmailsValue': 'egcConfirmReciepentEmailsValue1'
                });
                document.getElementById('CommonErrorMessageInEGCEdit').innerHTML = "Please correct the error(s) identified below.";
            } else {
                loadFragment("/ann/cart/cartDynamic.jsp", "#includeCart")
            }

        }

        if (responseText.pagetype == 'checkoutLogin') {
            $("#login").empty();
            $("#valueMap.password").empty();
            if (responseText.error == 'true') {
                processErrors();
                document.getElementById("loginFormError").innerHTML = "";
            } else {
                $('#headerFrag').html('');
                loadFragment("/ann/common/include/headerFrag.jsp", "#headerFrag");
                loadFragment("/ann/checkout/registerCheckoutProcessDynamic.jsp", ".col-secondary");
                loadFragment("/ann/cart/cart.jsp", "#includeCart", function() {
                    ATCheckout.init();
                });
            }

        }

        if (responseText.pagetype == 'productDetails') {
            $("#sizeCode1").empty();
            $("#Inventory").empty();
            $("#commorErrorMessageInPDPage").empty();
            if (responseText.error == 'true') {
                processErrors({
                    'sizeCode': 'sizeCode1'
                });
                //document.getElementById("sizeCode1").innerHTML="Please select a size.";
                $('#commorErrorMessageInPDPage').show();
                document.getElementById('commorErrorMessageInPDPage').innerHTML = "Please correct the error(s) identified below.";

                // BrightTag Event Trigger
                $(window).trigger('addToBagFailure', [responseText]);

            } else {
                trackAddedItemToCart(responseText.ProductId, responseText.SkuID, responseText.cartCount);
                $('#main-hd .utils .list-l1 .first-l1 .label-l1 .total').text(responseText.cartCount);
                $('#main-hd .utils .list-l1 .first-l1 .label-l1 .cartCount').text(responseText.cartCount1);
                productName = responseText.product;
                quantity = responseText.cartQuantity;
                cartEvent = responseText.Event;

                // BrightTag Event Trigger
                $(window).trigger('addToBagSuccess', [responseText.ProductId, responseText]);
                console.log('BRIGHTTAG EVENT addToBagSuccess');

                showBasket('show', '');
                window.scroll(0, 0);

                //fix for ANNTAYLORQA-1099 
                $('#color-picker').find('.selected').removeClass('selected');
                $('#fs-size').find('.selected').removeClass("selected");
                if (document.getElementById('colorCode') != null && document.getElementById('colorCode').value != 'undefined')
                    document.getElementById('colorCode').value = "";
                if (document.getElementById('sizeCode') != null && document.getElementById('sizeCode').value != 'undefined')
                    document.getElementById('sizeCode').value = "";
                if (document.getElementById('quantity') != null && document.getElementById('quantity').value != 'undefined') {
                    var quant = document.getElementById('quantity');
                    quant.options[0].selected = true;
                }

                setTimeout(function() {
                    $('#universalCart').fadeOut(function() {
                        $("#CartToggle").removeClass("CartToggleOn");
                    });
                }, 4000);
            }
        }

        if (responseText.pagetype == 'mobileSubscription') {
            $("div.error").empty();
            if (responseText.error == 'true') {
                for (x = 0; x < responseText.errors.length; x++) {
                    var key = responseText.errors[x];
                    var value = responseText.errors[x + 1];
                    document.getElementById(key).innerHTML = value;
                    x = x + 1;
                }
            } else {
                $(".mobileSubscription").hide();
                $(".thank-you-msg").show();
            }
        }

        if (responseText.pagetype == 'commit') {
            $("div.error").empty();
            $("#Inventory").empty();
            if (responseText.error == 'true') {
                for (x = 0; x < responseText.errors.length; x++) {
                    var key = responseText.errors[x];
                    if (key == "emailAddressExists") {
                        responseText.errors[x + 1] += '<a href="/ann/profile/forgotPassword.jsp" class="error">&nbsp;here if you forgot your password.</a>';
                    }
                    x = x + 1;
                }
                processErrors();
            } else {
                window.location = "/ann/checkout/orderConfirmation.jsp?newAccountFlag=" + newAccountCreated;
            }
        }
        if (responseText.pagetype == 'editRegShippingAddress') {

            $("div.error").empty();
            if (responseText.error == 'true') {
                processErrors();
                document.getElementById('commorErrorMessageInAddShippingAddress').innerHTML = "Please correct the error(s) identified below.";
            } else {
                $('#regShippingForm').remove();
                $.ajax({
                    url: "/ann/checkout/regShippingAddressDynamic.jsp",
                    cache: false,
                    type: "GET",
                    success: function(data) {
                        $('.contentWrap .btn-cancel').click();
                        $('.ship-summary').after(data);
                        ATCheckout.init();
                    }
                });
            }
        }
        if (responseText.pagetype == 'removeRegShippingAddress') {
            if (responseText.error == 'true') {
                for (x = 0; x < responseText.errors.length; x++) {
                    //console.log(responseText.errors[x]);
                }
            } else {
                $('#regShippingForm').remove();
                $.ajax({
                    url: "/ann/checkout/regShippingAddressDynamic.jsp",
                    cache: false,
                    type: "GET",
                    success: function(data) {
                        $('.ship-summary').after(data);
                        ATCheckout.init();
                    }
                });

            }
        }

        if (responseText.pagetype == 'editRegPayment') {
            $("div.error").empty();
            if (responseText.error == "true") {
                processErrors();
                document.getElementById('commorErrorMessageInPayment').innerHTML = "Please correct the error(s) identified below.";
            } else {
                $('#regPaymentForm').remove();
                $.ajax({
                    url: "/ann/checkout/regPaymentDynamic.jsp",
                    cache: false,
                    type: "GET",
                    success: function(data) {
                        $('.contentWrap .btn-cancel').click();
                        $('.payment-summary').after(data);
                        $('.security-code').hide();
                        ATCheckout.init();
                    }
                });
            }
        }
        if (responseText.pagetype == 'checkoutGiftCard') {
            $("div.error").empty();
            if (responseText.error == "true") {
                processErrors();
                //document.getElementById('commorErrorMessageInApplyGC').innerHTML="Please correct the error(s) identified below.";
            } else {
                loadFragment("/ann/cart/orderPriceDetailsDynamic.jsp", ".cart-summary");
                $('#rewards-card-number').val("");
                $('#rewards-card-pin').val("");
                $('.rewards-card .btn-apply').attr('disabled', 'true').addClass('btn-apply-disabled');
            }

        }
        if (responseText.pagetype == 'checkoutEGC') {
            $("div.error").empty();
            if (responseText.error == "true") {
                processErrors();

            } else {
                loadFragment("/ann/cart/orderPriceDetailsDynamic.jsp", ".cart-summary");
                $('#gift-card-number').val("");
                $('#gift-card-email').val("");
            }
        }

    }

    /*
     * Omniture tag to track when a item is added to the cart
     */
    window.trackAddedItemToCart = function trackAddedItemToCart(prodId, sku, cartCount) {
        var s = s_gi(at_account);
        s.linkTrackVars = 'events,products';
        s.products = ";" + prodId + ";;;;evar8=" + sku;
        s.linkTrackEvents = 'scAdd,scOpen';
        if (cartCount == '(1)') {
            s.events = 'scAdd,scOpen';
        } else {
            s.events = 'scAdd';
        }
        s.tl(this, 'o', 'Product Add to Cart');
    }

    /*
     * Remove the CommerceItem in Basket
     *
     */
    window.removeBasketItem = function removeBasketItem(commerceItemId, productId, skuId) {

        // for omniture
        trackRemoveFromCart(productId);

        var url = "/ann/catalog/removeItem.jsp?commerceItemid=" + commerceItemId + "&productId=" + productId;
        $.ajax({
            url: url,
            async: false,
            cache: false,
            dataType: 'json',
            type: "POST",
            success: function(data) {

                // Bright Tag
                $(window).trigger('removeFromBag', [skuId]);
                console.log('BRIGHTTAG EVENT removeFromBag');
                console.log('----->data (ajax login response)');
                /*
                console.log(typeof(data));
                var name;
                for(name in data){
                	if(typeof(data[name])!=='function'){
                		console.log(name+": "+data[name]);
                	}
                }
				
                console.log('commerceItemId: '+commerceItemId);
                console.log('productId: '+productId);
                console.log('skuId: '+skuId);
                */
                $('#universalCart').load('/ann/catalog/basket.jsp', function() {
                    $('#productNames').html(data.product + " has been removed from your Shopping Basket.");
                    $('#cartQty').html(data.cartCount + " item(s) in your Shopping Basket.");
                });
                $('#main-hd .utils .list-l1 .first-l1 .label-l1 .total').text('(' + data.cartCount + ')');
                $('#main-hd .utils .list-l1 .first-l1 .label-l1 .cartCount').text('(' + data.cartCount + ')');
            }
        });
    }

    window.loadFragment = function loadFragment(url, divId) {
        $.ajax({
            url: url,
            cache: false,
            type: "GET",
            async: false,
            success: function(data) {
                $(divId).html(data);
            }
        });
    }

    window.showCartContent = function showCartContent(obj) {
        var url = "/ann/catalog/basket.jsp";
        var formOdj = document.getElementById("moveToPurchaseInfo");
        $.ajax({
            url: url,
            cache: false,
            dataType: 'text\html',
            data: $(formOdj).serialize(),
            type: "POST",
            success: function(data) {
                window.location.href = "/ann/checkout/index.jsp";
            }
        });
    }

    window.loadOrderTotal = function loadOrderTotal() {
        $.ajax({
            url: "/ann/checkout/orderTotalJson.jsp",
            cache: false,
            async: false,
            dataType: 'json',
            type: "GET",
            success: function(responseJson) {
                //alert(responseJson.dollarsAmount);
                if (responseJson.dollarsAmount != null && responseJson.dollarsAmount != "") {
                    $('#purchase-bar .total .dollars').text(responseJson.dollarsAmount);
                    $('#purchase-bar .total .cents').text(responseJson.centsAmount);
                }

            }
        });
    }

    // loadFragment with call back
    window.loadFragment = function loadFragment(url, divId, callback) {
        $.ajax({
            url: url,
            cache: false,
            type: "GET",
            async: false,
            success: function(data) {
                $(divId).html(data);
                if (callback) {
                    callback();
                }
            }
        });
    }

    window.changeState = function changeState() {
        var tem = '.guestBillingState [value=' + $('.guestBillingState').val() + ']';
        $('#select-box-container-billing-state .select-box-bg').html($(tem).text());
    }
}(window.$legacyjQuery || $));