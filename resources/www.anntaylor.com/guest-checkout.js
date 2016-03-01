//$('.btn-pill').unbind('click');
//$('.btn').unbind('click');
var AT = {}, L;
var cartProductId;
var commerceItemId;
var cartSkuId;
var isGiftBoxNotAdded=true;

(function ($) {
    $('.once').unbind('click');

    (function() {
        /*
         * Runtime data cache
         */
        AT.Data = {
            tooltipTitles: {}
        };

        /*
         * Utility functions
         */
        AT.Util = {
            log: function(str) {
                /*
                 * Attempt to use blackbird
                 */
                try {
                    if (typeof str === 'object') {
                        log.info(AT.Util.elToStr(str));
                        return log;
                    }

                    log.debug(str);
                    return log;
                }
                catch (e) {

                }
            },

            elToStr: function(el) {
                var str = el.tagName;

                if (el.id) {
                    str += '#' + el.id;
                }

                if (el.className) {
                    str += '.' + el.className.split(' ').join('.');
                }

                return str;
            },

            htmlentities: function(s) {
                var t = $(document.createElement('textarea')).html(s);
                    var v = t.val();

                    t.remove();

                return v;
            }
        };

        L = AT.Util.log;

        /*
         * Configuration objects
         */
        AT.Config = {
            ConfirmOverlay: {
                top: 300,
                onBeforeLoad: function() {
                    var overlay = this,
                        wrap = this.getOverlay().find(".contentWrap");

                    // load the page specified in the trigger
                    wrap.load(this.getTrigger().attr("href"), function() {
                        wrap
                            /*
                             * No, don't remove this address
                             */
                            .find('.btn-no-thanks').click(function(e) {
                                e.preventDefault();
                                overlay.close();
                            })
                            .end()

                            /*
                             * Remove this address. Find the row associated with and and remove it.
                             */
                            .find('.btn-yes').click(function(e) {
                                //e.preventDefault();

                                overlay.getTrigger().parents('li:first').remove();
                                overlay.close();
                            })
                            .end();
                    });
                }
            },

            ToolTip: {
                tip: '#body-tooltip',
                offset: [45, 85],
                onBeforeShow: function() {
                    var title = AT.Data.tooltipTitles[$.data(this.getTrigger()[0])];
                    this.getTip().html(title);
                }
            }
        };

        /*
         * Form-related functions
         */
        AT.Form = {

            /**
             * Enable/disable 'new account' form fields based on checkbox
             */
            toggleNewAccountFields: function(){
                var checked = $('#save-info').is(':checked'),
                    fields = $('#create-account-rows input');

                if (checked) {
                    fields.enable();
                }
                else {
                    fields.disable();
                }
            },

            /**
             * Add disabled state and events for PO Box fields
             */
            setupPOBox: function() {
                $('#po-box').toggleDisabled('#address-2', false);
                $('#billing-po-box').toggleDisabled('#billing-address-2', false);

                $('#po-box').parent().click(function(e){
                    e.preventDefault();
                    $('#po-box').toggleDisabled('#address-2', false);
                });

                $('#billing-po-box').parent().click(function(e){
                    e.preventDefault();
                    $('#billing-po-box').toggleDisabled('#billing-address-2', false);
                });
            },

            /**
             * Reset the character counts in textfields
             *
             * @param {Object} f The form to reset
             */
            resetCounts: function(f) {
                f.find('textarea').unbind().limitChars();
            }
        };

        AT.Checkout = (function() {
            var co = {
                shipToSingleReg: function(){

                    $.ajax({
                        url: "/ann/checkout/regShippingAddressDynamic.jsp",
                        cache: false,
                        type: "GET",
                        success: function(data){

                            $('.col-secondary:first .ship-summary:first').hide();

                            $('#regMutliShipForm').replaceWith(data);

                            $('#checkout-header-shipping')
                                    .find('.btn-ship-single').hide().end()
                                    .find('.btn-ship-multiple').show().end();
                        }
                    });

                },

                shipToMultipleReg: function(){
                    $.ajax({
                        url: "/ann/checkout/regShipToMultiple.jsp",
                        cache: false,
                        type: "GET",
                        success: function(data){

                            $('.col-secondary:first .ship-summary:first').hide();

                            $('#regShippingForm').replaceWith(data);

                            $('#checkout-header-shipping')
                                    .find('.btn-ship-multiple').hide().end()
                                    .find('.btn-ship-single').show().end();
                        }
                    });
                }
            };

            return co;
        })();

        AT.ShoppingBag = (function() {
            var rows = {},
                element = null;

            var bag = {
                init: function() {
                    element = $('#cart-sidebar')
                    rows = $('#cart-sidebar .itemRow, #cart-sidebar .creditProductRow'),
                    rowHash = {};

                    rows.each(function() {
                        var thisRow = $(this);

                        /*
                         * Find this row's unique id
                         */
                        var id = AT.ShoppingBag.rowId(thisRow);

                        rowHash[id] = {el: thisRow};
                    });

                    var buttonHandlers = {};

                    /**
                     * Enable all buttons except those on the specified row.
                     *
                     * @param {Integer} id ID of the row to ignore
                     * @param {String} mode "edit" when editing item details, or "gift" when editing an item's gift message
                     */
                    function enableButtons(id, mode) {
                        //console.log('enableButtons('+id+', '+mode+')');
                        rows.each(function() {
                            var thisRow = $(this),
                                rowId = AT.ShoppingBag.rowId(thisRow);

                            /*
                             * Should we enable the edit/remove buttons?
                             */
                            if (!id || id !== rowId || mode !== "details") {
                                thisRow.find('.links')
                                            .children()
                                                .removeClass('disabled')
                                                .filter('.btn-edit')
                                                    .click(buttonHandlers[rowId].edit)
                                                    .end()
                                                .filter('.btn-remove')
                                                    .click(buttonHandlers[rowId].remove)
                                                    .end()
                                                .filter('.btn-edit-gift-message')
                                                    .click(buttonHandlers[rowId].editGiftMessage)
                                                    .end()
                                                .end()
                                            .end();
                            }

                            /*
                             * Should we enable the 'add gift box' checkbox?
                             */
                            if (!id || id !== rowId || mode !== "gift") {
                                var checkbox = thisRow.find('label.gift-box');
                                if (checkbox.length) {
                                    SexyForms.Instances[checkbox.find('input').attr('id')].enable();
                                    checkbox.click(buttonHandlers[rowId].giftBox).end();
                                }
                            }
                        });
                    }

                    /**
                     * Disable all buttons except those on the specified row.
                     *
                     * @param {Integer} id ID of the row to leave enabled
                     * @param {String} mode "edit" when editing item details, or "gift" when editing an item's gift message
                     */
                    function disableButtons(id, mode){
                        //console.log('disableButtons('+id+', '+mode+')');
                        rows.each(function(){
                            var thisRow = $(this),
                                rowId = AT.ShoppingBag.rowId(thisRow);

                            /*
                             * Should we disable the edit/remove buttons?
                             */
                            if (!id || id !== rowId || mode !== "details") {
                                thisRow
                                    .find('.links')
                                        .children()
                                            .unbind('click')

                                            // Attach empty event to avoid page jumping
                                            .click(function(e){e.preventDefault();})
                                            .addClass('disabled')
                                        .end()
                                    .end();
                            }

                            /*
                             * Should we disable the 'add gift box' checkbox?
                             */
                            if (!id || id !== rowId || mode !== "gift") {
                                var checkbox = thisRow.find('label.gift-box');
                                if (checkbox.length) {
                                    checkbox.unbind('click');
                                    SexyForms.Instances[checkbox.find('input').attr('id')].disable();

                                }
                            }


                        });
                    }

                    /**
                     * Functionality for most items in cart (non GC/EGC)
                     */
                    $('#cart-sidebar .itemRow').each(function() {
                        var row = $(this),
                            giftOptions = row.find('.itemGiftOptions'),
                            productTitle = row.find('a.product-title[rel]'),
                            productId = AT.ShoppingBag.rowId(row),

                            /*
                             * Hidden fields
                             */
                            giftMessage = {
                                to: row.find('#item-' + productId + '-gift-message-to'),
                                from: row.find('#item-' + productId + '-gift-message-from'),
                                msg: row.find('#item-' + productId + '-gift-message-msg')
                            },

                            /*
                             * Checkbox
                             */
                            giftCheckbox = {
                                label: row.find('label.gift-box'),
                                input: row.find('label.checkbox')
                            },

                            giftMessageAdded = false;

                            buttonHandlers[productId] = {
                                edit: function(e) {
                                    e.preventDefault();
                                    editDetails();
                                },

                                editGiftMessage: function(e) {
                                    e.preventDefault();
                                    loadMessage();
                                    AT.Form.resetCounts(giftOptions);
                                    showGiftOptions();
                                },

                                remove: function(e) {
                                    e.preventDefault();
                                    row.remove();
                                },

                                giftBox: function(e) {
                                    //console.log('giftBox() checkbox handler');
                                    e.preventDefault();
                                    var checked = $(this).find('input[type=checkbox]').is(':checked');

                                    //console.log('checked: '+checked);
                                    /*
                                     * Behave differently if a gift message was added already
                                     */
                                    if (checked) {
                                        loadMessage();
                                        if (giftMessageAdded === false) {
                                            showGiftOptions();
                                        }
                                    } else {
                                        if (giftMessageAdded === false) {
                                            hideGiftOptions();
                                            removeEditGiftMessageButton();
                                        } else {

                                        }
                                    }
                                }
                            }

                            /**
                             * Edit item details
                             */
                            function editDetails() {
                                //console.log('editDetails()');
                                var collapsed = row.find('.bottom.collapsed').hide(),
                                    expanded  = row.find('.bottom.expanded');

                                disableButtons(productId, "details");

                                // Show it if it exists
                                if (expanded.length) {
                                    expanded.show();
                                    return false;
                                }

                                // Otherwise load the ajax
                                $.get('{{ site.docbase }}/ajax/edit-item-details.php?id='+productId, function(data) {
                                    collapsed.after(data);

                                    // Apply any necessary JS to panel
                                    expanded  = row.find('.bottom.expanded')
                                        .find('.radioGroup').radioGroup().end()
                                        .find('.btn-cancel').click(function(e) {
                                            e.preventDefault();
                                            cancelEditDetails();
                                        })
                                        .end()
                                        .find('.btn-save').click(function(e) {
                                            e.preventDefault();
                                         //   saveDetails();
                                        })
                                        .end();

                                    expanded.find('label.radio').injectSpans();

                                    expanded.show();

                                    row.find('textarea').limitChars().end();
                                });
                            }

                            /**
                             * Item details - Cancel button handler
                             */
                            function cancelEditDetails() {
                                //console.log('cancelEditDetails()');
                                var collapsed = row.find('.bottom.collapsed').hide(),
                                    expanded  = row.find('.bottom.expanded'),
                                    rowId = AT.ShoppingBag.rowId(row);
                                expanded.hide();
                                collapsed.show();
                                enableButtons(rowId, "details");
                            }

                            /**
                             * Item details - Save button handler
                             */
                            function saveDetails() {
                                /*
                                 * ATG logic goes here...
                                 */
                                var collapsed = row.find('.bottom.collapsed').hide(),
                                    expanded = row.find('.bottom.expanded'),
                                    rowId = AT.ShoppingBag.rowId(row);

                                expanded.hide();
                                collapsed.show();
                                enableButtons(rowId, "details");
                            }

                            /**
                             * Clear the gift message form
                             */
                            function resetGiftMessage() {
                              giftOptions
                                .find('input,textarea').val('').end()
                                .find('textarea').unbind().limitChars();
                            }

                            /**
                             * Save the gift message text
                             */
                            function saveMessage() {
                                giftMessage.to.val(row.find('.gift-to').val());
                                giftMessage.from.val(row.find('.gift-from').val());
                                giftMessage.msg.val(row.find('.gift-msg').val());

                                giftOptions.hide();
                            }

                            /**
                             * Fill in form fields with saved data
                             */
                            function loadMessage() {
                                row.find('.gift-to').val(giftMessage.to.val());
                                row.find('.gift-from').val(giftMessage.from.val());
                                row.find('.gift-msg').val(giftMessage.msg.val());
                            }

                            function showGiftOptions() {
                                giftOptions.show();
                                disableButtons(productId, "gift");
                            }

                            function hideGiftOptions() {
                                giftOptions.hide();
                                enableButtons(productId, "gift");
                            }

                            function addEditGifMessageButton() {
                                giftMessageAdded = true;

                                // Add 'edit gift message' button

                                    row
                                        .find('.btn-edit-gift-message').css('visibility', 'visible')

                            }

                            function removeEditGiftMessageButton(){
                                row.find('.btn-edit-gift-message').css('visibility', 'hidden');
                            }



                        row
                            /*
                             * "add gift box" checkbox
                             */
                            .find('label2.gift-box').click(buttonHandlers[productId].giftBox).end()

                            /*
                             * Gift message form buttons
                             */
                        .find('.itemGiftDetail2 .btn-clear').click(function(e) {
                            e.preventDefault();
                            resetGiftMessage();
                        })
                        .end()

                        .find('.itemGiftDetail2 .btn-cancel').click(function(e) {
                            e.preventDefault();
                            hideGiftOptions();
                            addEditGifMessageButton();
                        })
                        .end()

                        .find('.itemGiftDetail2 .btn-save').click(function(e) {
                           // e.preventDefault();
                            saveMessage();
                            hideGiftOptions();
                            addEditGifMessageButton();
                        })
                        .end()

                        /*
                         * Small pill buttons
                         */
                        .find('.btn-edit').click(buttonHandlers[productId].edit).end()
                        .find('.btn-remove').click(buttonHandlers[productId].remove).end();

                        /*
                         * Character limits
                         */
                        row.find('textarea.gift-msg').limitChars().end();
                    });

                    /**
                     * Sets up functionality for Gift Card/E-Gift Certs in Shopping Bag
                     * @param {Object} config
                     */
                    function setupCreditProductRows(config) {
                        var row = $(this),
                            productTitle = row.find('a.product-title[rel]'),
                            productId = parseInt(productTitle.attr('rel'), 10),
                            form    = row.find('.creditProductForm'),
                            details = row.find('.creditProductDetails'),

                            /*
                             * Hidden fields
                             */
                            hiddenFields = config.getHiddenFields(row, form, productId);

                            buttonHandlers[productId] = {
                                edit: function(e) {
                                    e.preventDefault();

                                    disableButtons(productId, "details");
                                    config.loadMessage(form, hiddenFields);
                                    AT.Form.resetCounts(form);
                                    hidePrice();
                                    details.hide();
                                    form.show();
                                },

                                remove: function(e) {
                                    e.preventDefault();
                                    row.remove();
                                }
                            };

                            /**
                             * Set the price value
                             */
                            function updatePrice() {
                                row
                                    .find('.itemPrice .currentPrice')
                                    .html('<sup class="dollars">$</sup>'+hiddenFields.price.val())
                                    .end();
                            }

                            function showPrice() {
                                row
                                    .find('.itemPrice .error').hide().end()
                                    .find('.itemPrice .currentPrice').show().end()
                            }

                            function hidePrice() {
                                row
                                    .find('.itemPrice .currentPrice').hide().end()
                                    .find('.itemPrice .error').show().end()
                            }

                            /**
                             * Highlight form fields and show error text
                             *
                             * @param {Object} container
                             * @param {Object} list
                             */
                            function displayErrors(form, list) {
                                for (var id in list) {
                                    $('#'+id)
                                        .siblings('.error-text').html(list[id]).end()
                                        .parent().addClass('error-field').end()
                                }
                            }

                            function saveButtonHandler(e) {
                                e.preventDefault();

                                var rowId = AT.ShoppingBag.rowId(row);

                                enableButtons(rowId, "details");

                                var result = config.validate(form);

                                if (true !== result) {
                                    /*
                                     * Placeholder: set all fields to invalid
                                     */
                                    displayErrors(form, result);

                                    return false;
                                }

                                config.saveMessage(form, hiddenFields);
                                config.updateDetails(details, hiddenFields, updatePrice);
                                form.hide();
                                showPrice();
                                details.show();
                            }

                            function cancelButtonHandler(e) {
                                e.preventDefault();

                                var rowId = AT.ShoppingBag.rowId(row);

                                enableButtons(rowId, "details");

                                form.hide();
                                showPrice();
                                details.show();
                            }

                            row
                                /*
                                 * Button event handlers
                                 */
                                .find('.btn-edit').click(buttonHandlers[productId].edit).end()
                                .find('.btn-remove').click(buttonHandlers[productId].remove).end()
                                .find('.btn-save').click(saveButtonHandler).end()
                                .find('.btn-cancel').click(cancelButtonHandler).end()
                                /*
                                 * Character limits
                                 */
                                .find('textarea').limitChars().end();
                    }

                    /*
                     * Gift cards in cart
                     */
                    $('#cart-sidebar .giftCardRow').each(function() {
                        setupCreditProductRows.call(this, {
                            getHiddenFields: function(row, form, productId) {
                                return {
                                    to: row.find('#item-' + productId + '-gift-card-to'),
                                    from: row.find('#item-' + productId + '-gift-card-from'),
                                    msg: row.find('#item-' + productId + '-gift-card-msg'),
                                    price: row.find('#item-' + productId + '-gift-card-price')
                                };
                            },

                            /**
                             * Fill in form fields with saved data
                             */
                            loadMessage: function(form, hiddenFields) {
                                form.find('.gift-to').val(hiddenFields.to.val());
                                form.find('.gift-from').val(hiddenFields.from.val());
                                form.find('.gift-msg').val(hiddenFields.msg.val());
                                form.find('.itemPrice .dollars').val(hiddenFields.price.val());
                            },

                            /**
                             * Save the gift message text
                             */
                            saveMessage: function(form, hiddenFields) {
                                var h = AT.Util.htmlentities;

                                hiddenFields.to.val(h(form.find('.gift-to').val()));
                                hiddenFields.from.val(h(form.find('.gift-from').val()));
                                hiddenFields.msg.val(h(form.find('.gift-msg').val()));
                                hiddenFields.price.val(h(form.find('.gift-price').val()));
                            },

                            /**
                             * Update the descriptive text
                             */
                            updateDetails: function(details, hiddenFields, updatePrice) {
                                details.find('.gift-to').text(hiddenFields.to.val());
                                details.find('.gift-from').text(hiddenFields.from.val());
                                details.find('.gift-msg').text(hiddenFields.msg.val());
                                updatePrice();
                            },

                            /**
                             * Return true if the form is valid, an object with fieldname/error strings otherwise
                             * @param {Object} form
                             */
                            validate: function(form) {
                                /*
                                 * For now, just make sure no inputs are empty; ATG to implement backend logic
                                 */
                                var errors = {};
                                    count = 0;

                                /*
                                 * ATG: Erase this code and put in validation how you want it
                                 */
                                form.find('input,textarea').each(function() {
                                    var el = $(this);

                                    if (el.val() == "") {
                                        ++count;
                                        errors[el.attr('id')] = "Error text goes here.";
                                    }
                                });

                                /*
                                 * No errors, return true
                                 */
                                if (count < 1) {return true;}

                                /*
                                 * Errors found, return an object. Indices are form field ids, values are the form elements.
                                 */
                                return errors;
                            }
                        });
                    });

                    /*
                     * E-Gift certs in cart
                     */
                    $('#cart-sidebar .giftCertRow').each(function() {
                        setupCreditProductRows.call(this, {
                            getHiddenFields: function(row, form, productId) {
                                return {
                                    to: row.find('#item-' + productId + '-gift-to'),
                                    to_email: row.find('#item-' + productId + '-gift-to-email'),
                                    to_email_confirm: row.find('#item-' + productId + '-gift-to-email-confirm'),
                                    from: row.find('#item-' + productId + '-gift-from'),
                                    msg: row.find('#item-' + productId + '-gift-msg'),
                                    price: row.find('#item-' + productId + '-gift-price')
                                };
                            },

                            /**
                             * Fill in form fields with saved data
                             */
                            loadMessage: function(form, hiddenFields) {
                                form.find('.gift-to').val(hiddenFields.to.val());
                                form.find('.gift-to-email').val(hiddenFields.to_email.val());
                                form.find('.gift-to-email-confirm').val(hiddenFields.to_email_confirm.val());
                                form.find('.gift-from').val(hiddenFields.from.val());
                                form.find('.gift-msg').val(hiddenFields.msg.val());
                                form.find('.itemPrice .dollars').val(hiddenFields.price.val());
                            },

                            /**
                             * Save the gift message text
                             */
                            saveMessage: function(form, hiddenFields) {
                                var h = AT.Util.htmlentities;

                                hiddenFields.to.val(h(form.find('.gift-to').val()));
                                hiddenFields.to_email.val(h(form.find('.gift-to-email').val()));
                                hiddenFields.to_email_confirm.val(h(form.find('.gift-to-email-confirm').val()));
                                hiddenFields.from.val(h(form.find('.gift-from').val()));
                                hiddenFields.msg.val(h(form.find('.gift-msg').val()));
                                hiddenFields.price.val(h(form.find('.gift-price').val()));
                            },

                            /**
                             * Update the descriptive text
                             */
                            updateDetails: function(details, hiddenFields, updatePrice) {
                                details.find('.gift-to').text(hiddenFields.to.val() + " (" + hiddenFields.to_email.val() + ")");
                                details.find('.gift-from').text(hiddenFields.from.val());
                                details.find('.gift-msg').text(hiddenFields.msg.val());
                                updatePrice();
                            },

                            /**
                             * Return true if the form is valid, an object with fieldname/error strings otherwise
                             * @param {Object} form
                             */
                            validate: function(form) {
                                /*
                                 * For now, just make sure no inputs are empty; ATG to implement backend logic
                                 */
                                var errors = {};
                                    count = 0;

                                /*
                                 * ATG: Erase this code and put in validation how you want it
                                 */
                                form.find('input,textarea').each(function() {
                                    var el = $(this);

                                    if (el.val() == "") {
                                        ++count;
                                        errors[el.attr('id')] = "Error text goes here.";
                                    }
                                });

                                /*
                                 * No errors, return true
                                 */
                                if (count < 1) {return true;}

                                /*
                                 * Errors found, return an object. Indices are form field ids, values are the form elements.
                                 */
                                return errors;
                            }
                        });
                    });
                }
            };

            return bag;
        })();

        $.extend(AT.ShoppingBag, {
            rowId: function(row) {
                return parseInt(row.find('.product-title').attr('rel'), 10);
            }
        });

        var zIndexCount = 200;

        /*
         * jQuery extensions
         */
        $.extend($.fn, {
        	/*
        	 * Apply descending z-index to select boxes
        	 *  so that when one expands, it doesn't appear
        	 *  underneath the next one
        	 */
        	cascadeZIndex: function() {
        	    return $(this).each(function(i) {
        		$(this).css('z-index', --zIndexCount);
        	    });
        	},

        	injectSpans: function() {
        	    return $(this).contents().filter(function() {
        		return this.nodeType === 3;
        	    }).wrap('<span></span>');
        	},

            /**
             * Return list of elements in a checkout panel group
             */
            checkoutPanel: function() {
                if (this.is('.checkout-header')) {
                    return this
                        .next().andSelf()
                        .next().andSelf()
                        .filter('.checkout-header,.summary,.checkout-form')
                }

                if (this.is('.checkout-form')) {
                    return this
                        .prev().andSelf()
                        .prev().andSelf()
                        .filter('.checkout-header,.summary,.checkout-form')
                }

                if (this.is('.mult-address-form')) {
                    return this
                        .prev().andSelf()
                        .prev().andSelf()
                        .filter('.checkout-header,.summary,.mult-address-form')
                }
            },

            /**
             * Return the next group of checkout panel elements
             */
            checkoutPanelNext: function() {
                return this
                    .filter(':last')
                    .next('.checkout-header')
                    .checkoutPanel();
            },

            /**
             * Turn on a specific checkout form for editing
             */
            checkoutPanelActivate: function(){
                var r = this
                    .filter('.checkout-header').addClass('on').end()
                    .filter('.summary').hide().end(),

                    f = r.filter('.checkout-form').show();

                /*if (f.is('.review-form')) {
                    $('#purchase-bar').show();
                } else {
                    $('#purchase-bar').hide();
                }*/

                return r;
            },

            checkoutPanelActivateMulti: function(){

                var r = this
                    .filter('.checkout-header').addClass('on').end()
                    .filter('.summary').hide().end()
                    .filter('.mult-address-form').show().end();

                return r;
            },

            /**
             * Turn off a specific checkout form and show summary
             */
            checkoutPanelDeactivate: function(){
                var r = this
                    .filter('.checkout-header').removeClass('on').end()
                    .filter('.summary').show().end()
                    .filter('.checkout-form').hide().end();

                return r;
            },
            checkoutPanelDeactivateMulti: function(){
                var r = this
                    .filter('.checkout-header').removeClass('on').end()
                    .filter('.summary').show().end()
                    .filter('.mult-address-form').hide().end();

                return r;
            },

            /**
             * Do a full reset of a form, including js-styled form elements
             */
            clearForm: function() {
                return this.each(function() {
                    var type = this.type,
                        tag = this.tagName.toLowerCase();

                    if (tag == 'form')
                        return $(':input',this).clearForm();
                    if (type == 'text' || type == 'password' || tag == 'textarea')
                        this.value = '';
    //                else if (type == 'checkbox' || type == 'radio')
    //                    this.checked = false;
                    else if (tag == 'select' || type == 'checkbox' || type == 'radio') {
                        var id = $(this).attr('id');

                        if (id && SexyForms.Instances[id]) {
                            SexyForms.Instances[id].reset();
                        }
    //                    this.selectedIndex = -1;
    //                    var sel = $(this).next('.select-box-container'),
    //                        txt = sel.find('li:first').text();
    //
    //                    sel.find('.select-box li').removeClass('selected').end()
    //                        .find('.select-box-bg').find('span').text(txt).end();
                    }

                    if (tag == 'input') {
                        $(this).removeClass('disabled').attr('disabled', null);
                    }

                });
            },

            /**
             * Color picker UI control; replaces RichFX component
             */
            colorPicker: function() {
                return $(this).each(function() {
                    var container = $(this),
                        label = container.find('.label'),
                        colors = container.find('ul li'),
                        selected = container.find('ul li.selected:first');

                        colors.each(function() {
                            var c = $(this);
                            /*
                             * Update the color name on rollover
                             */
                            c.hover(function(e) {
                                label.text($(this).children('a').attr('title'));
                            }, function(e) {
                                label.text(container.find('ul li.selected a').attr('title'))
                            });

                            /*
                             * No click event for sold out colors
                             */
                            if (c.hasClass('sold-out')) {
                                c.click(function(e) { e.preventDefault(); })
                                return;
                            };

                            /*
                             * Save the color name on click
                             */
                            c.click(function(e) {
                                e.preventDefault();

                                var li = $(this),
                                    a = li.children('a:first');

                                /*
                                 * Put id in the hidden field
                                 */
                                container.find('input[type=hidden]').val(a.attr('rel'));

                                /*
                                 * Set selected color
                                 */
                                selected.removeClass('selected');
                                selected = li.addClass('selected');

                                /*
                                 * Show the color name
                                 */
                                label.text(a.attr('title'));
                            });
                      });
                });
            },

        	/**
             * Make a form field editable
             */
            enable: function() {
                $(this).attr('disabled', '').removeClass('disabled');
            },

            /**
             * Make a form field non-editable
             */
            disable: function() {
                $(this).attr('disabled', 'disabled').addClass('disabled');
            },
            /**
             * Toggle some form fields based on the state of a checkbox
             *
             * @param {String} selector Selector for the form fields
             * @param {Boolean} enableIfChecked If true, enable the form fields when the checkbox is checked. Otherwise, disable them when checked (defaults to true).
             */
            toggleDisabled: function(selector, enableIfChecked) {
                if (arguments.length < 2) {
                    var enableIfChecked = true;
                }

                var checked = $(this).is(':checked'),
                    fields = $(selector);

                if (checked === true && enableIfChecked === true
                    || checked === false && enableIfChecked === false) {
                    fields.enable();
                }
                else {
                    fields.disable();
                }
            },

            /**
             * Prepare the tooltip elements
             */
            tooltipInit: function(conf) {
                return this.each(function() {
                    var el = $(this),
                        title = el.attr('title'),

                        /*
                         * Get a unique id from the jQuery internal cache
                         */
                        uid = $.data(el[0]);

                    /*
                     * Store the title in our data cache. Using the
                     * jQuery(el).data method doesn't work properly
                     * in IE in this case.
                     */
                    AT.Data.tooltipTitles[uid] = title;

                    /*
                     * Remove the title attribute, or jQuery Tools will
                     *  create a new <div> for the tooltip instead of using ours.
                     */
                    el.removeAttr('title');

                    AT.Util.log("el.attr('title'): " + el.attr('title'));

                    el.tooltip(conf);
                });
            },


            /**
             * Set a 120-char limit on a textarea
             */
            limitChars: function() {
                return $(this).each(function() {
                    var el = $(this),
                    txt = el.siblings().filter('.char-limit'),
                    id = txt.attr('id');

                    /*
                     * inputlimiter needs a unique id; grab the ID
                     *  from the placeholder
                     */
                    el.inputlimiter({boxId: id});
                });
            }
        });

        /*
         * Default overlay settings
         */
        $.extend($.tools.overlay.conf, {
            // some mask tweaks suitable for modal dialogs
            mask: {
                color: '#000000',
                loadSpeed: 200,
                opacity: 0.3
            },
            closeOnClick: false,
            //speed: 0,
            onBeforeLoad: function() {
                // grab wrapper element inside content
                var overlay = this,
                    wrap = this.getOverlay().find(".contentWrap");
                // load the page specified in the trigger
                wrap.load(this.getTrigger().attr("href"), function() {
                    wrap.find('.select-box-container').cascadeZIndex();
                    wrap.find('label.checkbox input[type=checkbox]').checkbox();
                    wrap.find('label.floating-chk').injectSpans();
                    wrap.find('.btn-cancel').click(function() { overlay.close(); });
                    wrap.find('.btn-yes').click(function() { overlay.close(); });
                    //changed for stop to closing the popup
    //               	wrap.find('.btn-save').click(function() {
    ////               	    if(addressValidation == true ){
    ////               	 	    overlay.close();
    ////               		}
    //
    //                    if (typeof(setPhoneNo) != 'undefined') {
    //                        setPhoneNo();
    //                    }
    //                    $(this).closest('form').submit();
    //
    //
    //                });

                    wrap.find('.btn-save')
                        .attr('src', '/webassets/ann/en_US/assets/images/misc/blank.gif')
                        .hover(function() {
                            $(this).attr('src', '/webassets/ann/en_US/assets/images/misc/blank.gif');
                        }, function() {
                            $(this).attr('src', '/webassets/ann/en_US/assets/images/misc/blank.gif');
                        });

                    wrap.find('.btn-clear').click(function() {
                           wrap.find('form.checkout-form').clearForm(); 
                           
                           //fix for ANNTAYLORQA-987
                           if (document.getElementById('state') != null && document.getElementById('state')!= 'undefined'){
    		         var state = document.getElementById('state');
    		         state.options[0].selected=true;
    		       }
                           if (document.getElementById('cardtype') != null && document.getElementById('cardtype')!= 'undefined'){
    		         var state = document.getElementById('cardtype');
    		         state.options[0].selected=true;
    		       }
    		       if (document.getElementById('card-type') != null && document.getElementById('card-type')!= 'undefined'){
    		         var state = document.getElementById('card-type');
    		         state.options[0].selected=true;
    		       }
                           if (document.getElementById('card-expiry-month') != null && document.getElementById('card-expiry-month')!= 'undefined'){
    		         var state = document.getElementById('card-expiry-month');
    		         state.options[0].selected=true;
    		       }
                           if (document.getElementById('card-expiry-year') != null && document.getElementById('card-expiry-year')!= 'undefined'){
    		         var state = document.getElementById('card-expiry-year');
    		         state.options[0].selected=true;
    		       }

                    });

                    var conf = $.extend({}, AT.Config.ToolTip, {
                        offset: [43, 100],
                        relative: false,
                        tip: '#overlay-tooltip'
                    });

                    wrap.find('.tooltip').tooltipInit(conf);

                    AT.Form.setupPOBox();
                });
            }
        });

    })();


        $(function() {
            var checkoutForms = $('.col-secondary:first form.checkout-form');
        	$('#ship-method-block .radioGroup').radioGroup();
            $('#saved-addresses').radioGroup();
            $('#saved-payment-methods').radioGroup();
            $('#pageTemplate label.checkbox input[type=checkbox]').checkbox();
            $('#pageTemplate a[rel=#address-overlay]').overlay();
            $('#pageTemplate a[rel=#payment-overlay]').overlay();
            $('#pageTemplate a[rel=#remove-address-overlay]').overlay(AT.Config.ConfirmOverlay);
            $('#pageTemplate a[rel=#remove-payment-overlay]').overlay(AT.Config.ConfirmOverlay);
            $('.select-box-container').cascadeZIndex();
    	    $('#toggle-instructions-lbl').click(function(e) {
    	         e.preventDefault();
    	         var checked = $(this).find('input[type=checkbox]').is(':checked');
    	         $('#delivery-instructions-text').toggle(checked);
    	         if(checked){
    	         $('#delivText').val('');
    	          validateTextarea();
              }
             });

        $('#apply-cert').click(function(e) {
           e.preventDefault();

            var checked = $(this).find('input[type=checkbox]').is(':checked');
            $('#checkout-rewards').toggle( checked );
            $('#billing-next-button-row').toggleClass('expanded', checked);
        });
            // save my info
             AT.Form.toggleNewAccountFields();

    		    $('#save-info').parent().click(function(e) {
    		    	if($('#save-info:checked').length){
    	    	    	newAccountCreated = true;
    					//alert("checked");
    				}else{
    					newAccountCreated = false;
    				}
    		        e.preventDefault();

    		        AT.Form.toggleNewAccountFields();
    		    });

        $('#po-box').parent().click(function(e) {
            e.preventDefault();

            AT.Form.toggleNewAccountFields();
        });

    	$('#cart-sidebar .itemRow').each(function() {
    		var row = $(this),
                giftOptions = row.find('.itemGiftOptions'),
                productTitle = row.find('a.product-title[rel]'),
                productId = parseInt(productTitle.attr('rel'), 10),

                /*
                 * Hidden fields
                 */
                giftMessage = {
                    to: row.find('#item-' + productId + '-gift-message-to'),
                    from: row.find('#item-' + productId + '-gift-message-from'),
                    msg: row.find('#item-' + productId + '-gift-message-msg')
                },

                /*
                 * Checkbox
                 */
                giftCheckbox = {
                    label: row.find('label.gift-box'),
                    input: row.find('label.checkbox')
                },

                editItemHandler = function(e) {
                    e.preventDefault();
                     cartProductId=$(this).children('#productId').text()
                     commerceItemId=$(this).children('#commerceId').text()
                     cartSkuId=$(this).children('#skuId').text()
    					if( editItemSubmitFlag ){
    						editItemSubmitFlag = false;
    						editDetails();

    					}

                },

                removeItemHandler = function(e) {
                    e.preventDefault();
                    row.remove();
                },

                giftMessageAdded = false;

    	    /**
    		 * Edit item details
    		 */
    	    function editDetails() {
        		var collapsed = row.find('.bottom.collapsed').hide(),
        		    expanded  = row.find('.bottom.expanded');

        		// Show it if it exists
        		if (expanded.length) {
        		    expanded.show();
        		    return false;
        		}

        		var url="/ann/cart/edit-item-details.jsp?productId="+cartProductId +"&"+ "commerceId="+commerceItemId +"&"+ "skuId="+cartSkuId;
        		$.get(url, function(data) {
        		    collapsed.after(data);

        		    // Apply any necessary JS to panel
        		    expanded  = row.find('.bottom.expanded')
            			.find('.radioGroup').radioGroup().end()
            			.find('.btn-cancel').click(function(e) {
            			    //e.preventDefault();
            			    editItemSubmitFlag = true;
            			    //editItem();
            			    loadFragment("/ann/cart/cart.jsp","#includeCart",function(){ ATCheckout.init(); });

            			})
            			.end()

            			.find('.btn-save').click(function(e) {
            			    // e.preventDefault();
            			//    saveDetails();
            			})
            			.end();

                    expanded.find('label.radio').injectSpans();

        		    expanded.show();
        		});
    	    }

    	    /**
    		 * Item details - Cancel button handler
    		 */
    	    function cancelEditDetails() {
    		var collapsed = row.find('.bottom.collapsed').hide(),
    		    expanded  = row.find('.bottom.expanded');

    		expanded.hide();
    		collapsed.show();

    	    }

    	    /**
    		 * Item details - Save button handler
    		 */
    	    function saveDetails() {
                    /*
                 * ATG logic goes here...
                 */
    		var collapsed = row.find('.bottom.collapsed').hide(),
    		    expanded  = row.find('.bottom.expanded');

    		expanded.hide();
    		collapsed.show();
    	    }

    	    /**
    		 * Clear the gift message form
    		 */
    	    function resetGiftMessage() {
    		giftOptions.find('input,textarea').val('');
                    resetMsgCount();
    	    }

    	    /**
    		 * Save the gift message text
    		 */
    	    function saveGiftMessage() {
                giftMessage.to.val(row.find('.gift-to').val());
                giftMessage.from.val(row.find('.gift-from').val());
                giftMessage.msg.val(row.find('.gift-msg').val());

                giftOptions.hide();
    		}

            /**
             * Fill in form fields with saved data
             */
            function loadGiftMessage() {
                row.find('.gift-to').val(giftMessage.to.val());
                row.find('.gift-from').val(giftMessage.from.val());
                row.find('.gift-msg').val(giftMessage.msg.val());
            }

            function uncheck() {
                giftCheckbox.input.attr('checked', '');
                giftCheckbox.label.removeClass('checkbox-on').addClass('checkbox-off');
            }


            function enableButtons() {
                row
                    .find('.links')
                    .children()
                        .removeClass('disabled')
                        .filter('.btn-edit')
                            .click(editItemHandler)
                            .end()
                        .filter('.btn-remove')
                            .click(removeItemHandler)
                            .end();
            }

            function disableButtons(){
                row
                    .find('.links')
                    .children()
                        .unbind('click')
                        .addClass('disabled');
            }

            function showGiftOptions() {
                giftOptions.show();
                disableButtons();
            }

            function hideGiftOptions() {
                giftOptions.hide();
                enableButtons();
            }

            function addEditGifMessageButton() {
                var button = row.find('.btn-edit-gift-message');

                giftMessageAdded = true;

                // Add 'edit gift message' button
                if (!button.length) {
                    row.find('.links')
                        .prepend('<a href="#" class="btn-pill btn-edit-gift-message">Edit Gift Message</a>')
                        .find('.btn-edit-gift-message')
                        .click(function(e) {
                            //e.preventDefault();
                            loadGiftMessage();
                            showGiftOptions();
                            removeEditGiftMessageButton();
                        });
                }
            }

            function removeEditGiftMessageButton(){
                row.find('.btn-edit-gift-message').remove();
            }

    		row
    		    /*
    		     * "add gift box" checkbox
    		     */
    			.find('label1.gift-box').click(function(e) {
    					//e.preventDefault();
    					var checked = $(this).find('input[type=checkbox]').is(':checked');
    					 //added to remove giftbox
                        var removeGiftMessageId = $(this).parents().attr("id");
                        var divId ="#"+removeGiftMessageId+" .itemQuantity .links";
                        var removeStatus=$(divId).children('.btn-pill').hasClass('btn-edit-gift-message');
                        var removeGiftBoxURL = "/ann/cart/removeGiftMessage.jsp?commerceItemId="+removeGiftMessageId;


                        if (checked) {
                            loadGiftMessage();
                            if (giftMessageAdded === false) {
                                //alert("GiftMessageAdded == False");
                                showGiftOptions();
                            }
                        } else {
                        	enableButtons();
                            if (giftMessageAdded === false) {
                                hideGiftOptions();
                                removeEditGiftMessageButton();
                            } //Condition Statement to remove gift box message on uncheck checkbox
                            if(removeStatus && isGiftBoxNotAdded) {
                            var  messageToId="giftMessageTo"+removeGiftMessageId;
                            var  messageFromId="giftMessageFrom"+removeGiftMessageId;
                            var  messageId="giftMessage"+removeGiftMessageId;
                          	 $.ajax({
    								url: "/ann/cart/removeGiftMessage.jsp",
    								cache: false,
    								type: "POST",
    								dataType:'json',
    								data:({commerceItemId : removeGiftMessageId}),
    								success: function(data){
    								    removeStatus=false;
    								    hideGiftOptions();
                						removeEditGiftMessageButton();
                						giftMessageAdded=false;
                						document.getElementById(messageToId).value="";
                						document.getElementById(messageFromId).value="";
                						document.getElementById(messageId).value="";
    									loadFragment("/ann/cart/orderPriceDetails.jsp",".cart-summary");
    									//addEditGifMessageButton();
    								}
    							});
                            }//end of condition
                        }

    				})
    				.end()

    			/*
    			 * Gift message form buttons
    			 */
    		.find('.itemGiftDetail2 .btn-clear').click(function(e) {
    		    e.preventDefault();
    		    resetGiftMessage();
    		})
    		.end()

    		.find('.itemGiftDetail2 .btn-cancel').click(function(e) {
    			//alert('.itemGiftDetail .btn-cancel');
                e.preventDefault();
    			hideGiftOptions();
                addEditGifMessageButton();
                ATCheckout.init();
            })
            .end()

    		.find('.itemGiftDetail2 .btn-save').click(function(e) {
               // e.preventDefault();
    		    saveGiftMessage();
    		    hideGiftOptions();
                addEditGifMessageButton();
            })
            .end()

            /*
             * Small pill buttons
             */
    		.find('.btn-edit').click(editItemHandler).end()
    		.find('.btn-remove').click(removeItemHandler).end();

    	});

    	 function enableButtons(row) {
    	        var rows = $('#cart-sidebar .itemRow, #cart-sidebar .creditProductRow');


    	        /*
    	         * If a parameter is passed, ignore the specified row
    	         */
    	        if (row) {
    	            rows = rows.not(row);
    	        }

    	        rows.each(function() {
    	            var thisRow = $(this);

    	            /*
    	             * Find this row's unique id
    	             */
    	            var id = parseInt(thisRow.find('.product-title').attr('rel'), 10);
    	            var buttonHandlers="buttonHandlers["+id+"]";
    	            thisRow.find('.links')
    	            .children()
    	                .removeClass('disabled')
    	                .filter('#gbtn-edit')
    	                    .click(buttonHandlers.edit)
    	                    .end()
    	                .filter('#gbtn-remove')
    	                    .click(buttonHandlers.remove)
    	                    .end();
    	        });
        }

    	 function disableButtons(row){
    	        var rows = $('#cart-sidebar .itemRow, #cart-sidebar .creditProductRow');
    	        /*
    	         * If a parameter is passed, ignore the specified row
    	         */
    	        if (row) {
    	            rows = rows.not(row);
    	        }

    	        rows.find('.links')
    	            .children()
    	                .unbind('click')

    	                // Attach empty event to avoid page jumping
    	                .click(function(e) {e.preventDefault();})
    	                .addClass('disabled');
    	    }


    	 /**
    	     * Sets up functionality for Gift Card/E-Gift Certs in Shopping Bag
    	     * @param {Object} config
    	     */
    	    function setupCreditProductRows(config) {
    			var buttonHandlers = {};
    	        var row = $(this),
    	            productTitle = row.find('a.product-title[rel]'),
    	            productId = parseInt(productTitle.attr('rel'), 10),
    	            form    = row.find('.creditProductForm'),
    	            details = row.find('.creditProductDetails'),

    	            /*
    	             * Hidden fields
    	             */
    	            hiddenFields = config.getHiddenFields(row, form, productId);

    	            buttonHandlers[productId] = {
    	                edit: function(e) {
    	                    //e.preventDefault();
    	                    disableButtons(row);
    	                    config.loadMessage(form, hiddenFields);
    	                    hidePrice();
    	                    details.hide();
    	                    form.show();
    	                },

    	                remove: function(e) {
    	                    e.preventDefault();
    	                    row.remove();
    	                }
    	            };

    	            /**
    	             * Set the price value
    	             */
    	            function updatePrice() {
    	                row
    	                    .find('.itemPrice .currentPrice')
    	                    .html('<sup class="dollars">$</sup>'+hiddenFields.price.val())
    	                    .end();
    	            }

    	            function showPrice() {
    	                row
    	                    .find('.itemPrice .error').hide().end()
    	                    .find('.itemPrice .currentPrice').show().end()
    	            }

    	            function hidePrice() {
    	                row
    	                    .find('.itemPrice .currentPrice').hide().end()
    	                    .find('.itemPrice .error').show().end()
    	            }

    	            /**
    	             * Highlight form fields and show error text
    	             *
    	             * @param {Object} container
    	             * @param {Object} list
    	             */
    	            function displayErrors(form, list) {
    	                for (var id in list) {
    	                    $('#'+id)
    	                        .siblings('.error-text').html(list[id]).end()
    	                        .parent().addClass('error-field').end()
    	                }
    	            }

    	            /*
    	             * Button event handlers
    	             */
    	            row
    	                .find('#gbtn-edit').click(buttonHandlers[productId].edit).end()
    	                .find('#gbtn-remove').click(buttonHandlers[productId].remove).end()

    	                .find('#gbtn-save').click(function(e) {
    	                    //e.preventDefault();
    						enableButtons(row);
    						// form.hide();
    						// showPrice();
    						// details.show();
    						// editItem();
    						}).end()

    							.find('#gbtn-cancel').click(function(e) {
    							  // e.preventDefault();

    								enableButtons(row);
    								form.hide();
    								showPrice();
    								details.show();
    								editItem();
    							}).end()

    	                /*
    	                 * Character limits
    	                 */
    	                //.find('textarea').limitChars().end();
    	    }

    	    /*
    	     * Gift cards in cart
    	     */
    	    $('#cart-sidebar .giftCardRow').each(function() {


    	        setupCreditProductRows.call(this, {
    	            getHiddenFields: function(row, form, productId) {
    	                return {

    	                    to: row.find('#item-' + productId + '-gift-card-to'),
    	                    from: row.find('#item-' + productId + '-gift-card-from'),
    	                    msg: row.find('#item-' + productId + '-gift-card-msg'),
    	                    price: row.find('#item-' + productId + '-gift-card-price')
    	                };

    	            },

    	            /**
    	             * Fill in form fields with saved data
    	             */
    	            loadMessage: function(form, hiddenFields) {
    	                form.find('.gift-to').val(hiddenFields.to.val());
    	                form.find('.gift-from').val(hiddenFields.from.val());
    	                form.find('.gift-msg').val(hiddenFields.msg.val());
    	                form.find('.itemPrice .dollars').val(hiddenFields.price.val());
    	            },

    	            /**
    	             * Save the gift message text
    	             */
    	            saveMessage: function(form, hiddenFields) {
    	                var h = AT.Util.htmlentities;

    	                hiddenFields.to.val(h(form.find('.gift-to').val()));
    	                hiddenFields.from.val(h(form.find('.gift-from').val()));
    	                hiddenFields.msg.val(h(form.find('.gift-msg').val()));
    	                hiddenFields.price.val(h(form.find('.gift-price').val()));
    	            },

    	            /**
    	             * Update the descriptive text
    	             */
    	            updateDetails: function(details, hiddenFields, updatePrice) {
    	                details.find('.gift-to').text(hiddenFields.to.val());
    	                details.find('.gift-from').text(hiddenFields.from.val());
    	                details.find('.gift-msg').text(hiddenFields.msg.val());
    	                updatePrice();
    	            },

    	            /**
    	             * Return true if the form is valid, an object with fieldname/error strings otherwise
    	             * @param {Object} form
    	             */
    	            validate: function(form) {
    	                /*
    	                 * For now, just make sure no inputs are empty; ATG to implement backend logic
    	                 */
    	                var errors = {};
    	                    count = 0;

    	                /*
    	                 * ATG: Erase this code and put in validation how you want it
    	                 */
    	                form.find('input,textarea').each(function() {
    	                    var el = $(this);

    	                    if (el.val() == "") {
    	                        ++count;
    	                        errors[el.attr('id')] = "Error text goes here.";
    	                    }
    	                });

    	                /*
    	                 * No errors, return true
    	                 */
    	                if (count < 1) {return true;}

    	                /*
    	                 * Errors found, return an object. Indices are form field ids, values are the form elements.
    	                 */
    	                return errors;
    	            }
    	        });
    	    });

    	    /*
    	     * E-Gift certs in cart
    	     */
    	    $('#cart-sidebar .giftCertRow').each(function() {
    	        setupCreditProductRows.call(this, {
    	            getHiddenFields: function(row, form, productId) {
    	                return {
    	                    to: row.find('#item-' + productId + '-gift-to'),
    	                    to_email: row.find('#item-' + productId + '-gift-to-email'),
    	                    to_email_confirm: row.find('#item-' + productId + '-gift-to-email-confirm'),
    	                    from: row.find('#item-' + productId + '-gift-from'),
    	                    msg: row.find('#item-' + productId + '-gift-msg'),
    	                    price: row.find('#item-' + productId + '-gift-price')
    	                };
    	            },

    	            /**
    	             * Fill in form fields with saved data
    	             */
    	            loadMessage: function(form, hiddenFields) {
    	                form.find('.gift-to').val(hiddenFields.to.val());
    	                form.find('.gift-to-email').val(hiddenFields.to_email.val());
    	                form.find('.gift-to-email-confirm').val(hiddenFields.to_email_confirm.val());
    	                form.find('.gift-from').val(hiddenFields.from.val());
    	                form.find('.gift-msg').val(hiddenFields.msg.val());
    	                form.find('.itemPrice .dollars').val(hiddenFields.price.val());
    	            },

    	            /**
    	             * Save the gift message text
    	             */
    	            saveMessage: function(form, hiddenFields) {
    	                var h = AT.Util.htmlentities;

    	                hiddenFields.to.val(h(form.find('.gift-to').val()));
    	                hiddenFields.to_email.val(h(form.find('.gift-to-email').val()));
    	                hiddenFields.to_email_confirm.val(h(form.find('.gift-to-email-confirm').val()));
    	                hiddenFields.from.val(h(form.find('.gift-from').val()));
    	                hiddenFields.msg.val(h(form.find('.gift-msg').val()));
    	                hiddenFields.price.val(h(form.find('.gift-price').val()));
    	            },

    	            /**
    	             * Update the descriptive text
    	             */
    	            updateDetails: function(details, hiddenFields, updatePrice) {
    	                details.find('.gift-to').text(hiddenFields.to.val() + " (" + hiddenFields.to_email.val() + ")");
    	                details.find('.gift-from').text(hiddenFields.from.val());
    	                details.find('.gift-msg').text(hiddenFields.msg.val());
    	                updatePrice();
    	            },

    	            /**
    	             * Return true if the form is valid, an object with fieldname/error strings otherwise
    	             * @param {Object} form
    	             */
    	            validate: function(form) {
    	                /*
    	                 * For now, just make sure no inputs are empty; ATG to implement backend logic
    	                 */
    	                var errors = {};
    	                    count = 0;

    	                /*
    	                 * ATG: Erase this code and put in validation how you want it
    	                 */
    	                form.find('input,textarea').each(function() {
    	                    var el = $(this);

    	                    if (el.val() == "") {
    	                        ++count;
    	                        errors[el.attr('id')] = "Error text goes here.";
    	                    }
    	                });

    	                /*
    	                 * No errors, return true
    	                 */
    	                if (count < 1) {return true;}

    	                /*
    	                 * Errors found, return an object. Indices are form field ids, values are the form elements.
    	                 */
    	                return errors;
    	            }
    	        });
    	    });


            /*
         * Checkout form "Change" buttons
         */

     /*
            $('.checkout-header + .summary .btn-change[rel]').click(function(e) {
                e.preventDefault();

                var container    = $('.checkout-details:first'),
                    clickedBlock = $(this).parent().prevAll('.checkout-header:first')
                ;

               // debugger;
                container
                    .find('.checkout-header').each(function() {

                        var cp = $(this).checkoutPanel();
                        if (clickedBlock[0] === this) {
                            return cp.checkoutPanelActivate();
                        }

                        return cp.checkoutPanelDeactivate();
                    });

                    var nextBlock = clickedBlock.next();

                    if(nextBlock.hasClass('payment-summary')){
                    	$('.security-code').hide().end();
                    }

            });

            */

            $('.checkout-header + .summary #changeMS').click(function(e) {
    	    	 e.preventDefault();
    	    	 if( showSingleShip ){
    	    	 	$('#shippingForm').show();
    	    	 }else{
    	    	 	$('#orderitem').show();
    	    	 }


    	           $('.ship-summary').hide();
    	           $('#billingInfoForm').hide();
    	           $('#commitOrderForm').hide();

    	    });

    	    $('.checkout-header + .summary #changePayment').click(function(e) {

    	           $('#orderitem').hide();
    	           $('.ship-summary').show();
    	           $('.payment-summary').hide();
    	           $('#billingInfoForm').show();
    	           $('#commitOrderForm').hide();
    	           $.ajax({
    					url: "/ann/checkout/removePayment.jsp",
    					cache: false,
    					type: "GET",
    					async: false,
    					success: function(data){

    					}
    				});

    	    });
    	    $('.checkout-header + .summary #regShipChange').click(function(e) {
    	    	 e.preventDefault();
    	    	   $('.ship-summary').hide();
    	           $('#regPaymentForm').hide();
    	           $('.payment-summary').show();
    	           if( showSingleShip ){
    	           		$('#regShippingForm').show();
    	           }else{
    	           		 $('#regMutliShipForm').show();
    	           }
    	    });
    	    $('.checkout-header + .summary #regPaymentChange').click(function(e) {

    	    	   $('.ship-summary').show();
    	           $('#regPaymentForm').show();
    	           $('.security-code').hide();
    	           $('.payment-summary').hide();
    	           $('#regShippingForm').hide();
    	           $('#regMutliShipForm').hide();
    	           $.ajax({
    					url: "/ann/checkout/removePayment.jsp",
    					cache: false,
    					type: "GET",
    					async: false,
    					success: function(data){

    					}
    				});

    	    });
    	    $('#regShippingForm .btn-cancel').click(function(e) {
    	    	$('#regPaymentForm').hide();
    	    	$('#regMutliShipForm').hide();
    			$('.payment-summary').show();
    			$('#paymentSummary').show();
    			$('.ship-summary').show();
    			$('#regShippingForm').hide();
    			$('.security-code').show();
    			$('#delivText').val('');
    			loadFragment("/ann/checkout/registerCheckoutProcessDynamic.jsp",".col-secondary");
    	      	$('.security-code').load("/ann/checkout/includes/securityCodeFrag.jsp");

            });
            $('#regPaymentForm .btn-cancel').click(function(e) {
    	    	$('#regPaymentForm').hide();
    	    	$('#regMutliShipForm').hide();
    			$('.payment-summary').show();
    			$('#paymentSummary').show();
    			$('.ship-summary').show();
    			$('#regShippingForm').hide();
    			$('.security-code').show();
    			loadFragment("/ann/checkout/registerCheckoutProcessDynamic.jsp",".col-secondary");
    			$('.security-code').load("/ann/checkout/includes/securityCodeFrag.jsp");

            });

    //        $('.checkout-header + .summary .btn-change1[rel]').click(function(e) {
    //            e.preventDefault();
    //
    //            var container    = $('.checkout-details'),
    //                clickedBlock = $(this).parent().prevAll('.checkout-header:first')
    //            ;
    //
    //            container
    //                .find('.checkout-header').each(function() {
    //
    //                    var cp = $(this).checkoutPanel();
    //
    //                    if (clickedBlock[0] === this) {
    //                        return cp.checkoutPanelActivateMulti();
    //                    }
    //
    //                    return cp.checkoutPanelDeactivateMulti();
    //                });
    //        });

            /*
         * Checkout form "Next" buttons

            $('.checkout-details .btn-next[rel]').click(function(e) {
                e.preventDefault();

                var container    = $('.checkout-details'),
                    clickedBlock = $(this).parents('.checkout-form:first')
                ;




                clickedBlock
                    .checkoutPanel().checkoutPanelDeactivate()
                    .checkoutPanelNext().checkoutPanelActivate();
            });

            $('.checkout-details .btn-next1[rel]').click(function(e) {
                e.preventDefault();

                var container    = $('.checkout-details'),
                    clickedBlock = $(this).parents('.checkout-form:first')
                ;


                clickedBlock
                    .checkoutPanel().checkoutPanelDeactivate()
                    .checkoutPanelNext().checkoutPanelActivate();
            });

            $('.checkout-details .btn-next2[rel]').click(function(e) {
                e.preventDefault();

                var container    = $('.checkout-details'),
                    clickedBlock = $(this).parents('.checkout-form:first')
                ;



                clickedBlock
                    .checkoutPanel().checkoutPanelDeactivate()
                    .checkoutPanelNext().checkoutPanelActivate();
            });

            $('.checkout-details .btn-next3[rel]').click(function(e) {
                e.preventDefault();
                var container    = $('.checkout-details'),
                    clickedBlock = $('.mult-address-form')
                ;



                clickedBlock
                    .checkoutPanel().checkoutPanelDeactivateMulti()
                    .checkoutPanelNext().checkoutPanelActivate();
            });

            $('.checkout-details .btn-save-changes1').click(function(e) {
                e.preventDefault();

                var container    = $('.checkout-details'),
                    clickedBlock = $(this).parents('.checkout-form:first')
                ;



                clickedBlock
                    .checkoutPanel().checkoutPanelDeactivate();
            });

            $('.checkout-details .btn-save-changes2').click(function(e) {
                e.preventDefault();

                var container    = $('.checkout-details'),
                    clickedBlock = $(this).parents('.checkout-form:first')
                ;



                clickedBlock
                    .checkoutPanel().checkoutPanelDeactivate();
            });

            $('.checkout-details .btn-cancel').click(function(e) {
                e.preventDefault();
                var container    = $('.checkout-details'),
                    clickedBlock = $(this).parents('.checkout-form:first')
                ;


                clickedBlock
                    .checkoutPanel().checkoutPanelDeactivate();
            });



    */

    // toggle cart items
    	    $('#toggle-details').click(function(e) {
    	        e.preventDefault();
    	        $(this).toggleClass('btn-show-item-details')
    	               .toggleClass('btn-hide-item-details');
    	        $('#cart-details').toggle();
    	    });
            /*
         * Prevent select box overlap in IE
         */
            $('#cart-sidebar .itemInfo').cascadeZIndex();

            /*
         * Equalize columns
         */
            var col = $('#pageTemplate .col-primary .cart-footer .promo-code-wrap');
            col.css('height', col.siblings('.cart-summary').height() + 8);

            $("#pageTemplate a.tooltip").tooltipInit(AT.Config.ToolTip);

             AT.Form.setupPOBox();


            /*
         * Wrap <span>s around checkbox/radio text
         */
            $('label.floating-chk').injectSpans();
            $('#ship-method-block label.radio').injectSpans();

            // disable 'apply' button for gift card and e-gift certificate until respective input fields reach character length requirements
            function checkCardChars() {
                if($('.rewards-card #rewards-card-number').val().length < 4 || $('.rewards-card #rewards-card-pin').val().length < 2) {
                    $('.rewards-card .btn-apply').attr('disabled', 'true').addClass('btn-apply-disabled');
                } else {
                    $('.rewards-card .btn-apply').removeAttr('disabled').removeClass('btn-apply-disabled');
                }

                if($('.gift-card #gift-card-number').val().length < 3 || $('.gift-card #gift-card-email').val().length < 8) {
                    $('.gift-card .btn-apply').attr('disabled', 'true').addClass('btn-apply-disabled');
                } else {
                    $('.gift-card .btn-apply').removeAttr('disabled').removeClass('btn-apply-disabled');
                }
            }

            $('.rewards-card #rewards-card-number, .rewards-card #rewards-card-pin, .gift-card #gift-card-number, .gift-card #gift-card-email').keyup(function() {
                checkCardChars();
            });

            // reset gift box message count to 120
            function resetMsgCount() {
                $('#gift-msg-count').html('120');
            }

            /*
             * Handlers for 'ship to multiple' and 'ship to single' buttons
             */
    /*
            $('#checkout-header-shipping')
                .find('.btn-ship-single').click(function(e) {
                   // e.preventDefault();
                    AT.Checkout.shipToSingleReg();
                }).end()
                .find('.btn-ship-multiple').click(function(e) {
                   // e.preventDefault();
                    AT.Checkout.shipToMultipleReg();
                }).end();
              */
        });

        // for ship to multiple buttin enable and desable
    //    $('#shippingForm #first-name , #shippingForm #last-name , #shippingForm #address-1 , #shippingForm #city , #shippingForm #zip , #shippingForm #ship-area , #shippingForm #ship-prefix , #shippingForm #ship-suffix').keyup(function() {
    //           checkMultiShipButtonStage();
    //       });
    //      $('#shippingForm #first-name , #shippingForm #last-name , #shippingForm #address-1 , #shippingForm #city , #shippingForm #zip , #shippingForm #ship-area , #shippingForm #ship-prefix , #shippingForm #ship-suffix').click(function() {
    //           checkMultiShipButtonStage();
    //       });
    //
    //       function checkMultiShipButtonStage() {
    //            if($('#shippingForm #first-name').val().length > 0 && $('#shippingForm #last-name').val().length > 0  && $('#shippingForm #address-1').val().length > 0  && $('#shippingForm #shipping-state').val().length > 1  && $('#shippingForm #city').val().length > 0 && $('#shippingForm #zip').val().length > 0  && $('#shippingForm #ship-area').val().length > 0  && $('#shippingForm #ship-prefix').val().length > 0 && $('#shippingForm #ship-suffix').val().length > 0 && shippableItems>1 ) {
    //           	$("#shipToSingleMultiple").attr({href : "javascript:shipToMultiple()"});
    //           	$('#shipToSingleMultiple').removeClass('disabled');
    //           }else{
    //           	$("#shipToSingleMultiple").attr({href : "javascript:void(0)"});
    //           	$('#shipToSingleMultiple').addClass('disabled');
    //           }
    //        }
    //
}(window.$legacyjQuery || $));