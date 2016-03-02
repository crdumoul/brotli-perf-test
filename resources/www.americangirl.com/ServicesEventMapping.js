var order_updated={"AjaxAddOrderItem":"AjaxAddOrderItem","AjaxAddOrderItemWithShipingInfo":"AjaxAddOrderItemWithShipingInfo","AjaxDeleteOrderItem":"AjaxDeleteOrderItem","AjaxUpdateOrderItem":"AjaxUpdateOrderItem","AjaxUpdateOrderShippingInfo":"AjaxUpdateOrderShippingInfo","AjaxOrderCalculate":"AjaxOrderCalculate","AjaxLogoff":"AjaxLogoff","AjaxSetPendingOrder":"AjaxSetPendingOrder","AjaxUpdatePendingOrder":"AjaxUpdatePendingOrder","AjaxSingleOrderCancel":"AjaxSingleOrderCancel","AjaxUpdateRewardOption":"AjaxUpdateRewardOption"};
var address_updated={"AjaxDeleteAddressForPerson":"AjaxDeleteAddressForPerson","AjaxAddAddressForPerson":"AjaxAddAddressForPerson","AjaxUpdateAddressForPerson":"AjaxUpdateAddressForPerson","AjaxAddShippingAndBillingAddressForPersonDuringCheckout":"AjaxAddShippingAndBillingAddressForPersonDuringCheckout"};
var user_changed={"AjaxLogonService":"AjaxLogonService","AjaxLogoff":"AjaxLogoff"};var wishlist_changed={"AjaxInterestItemAdd":"AjaxInterestItemAdd","AjaxInterestItemDelete":"AjaxInterestItemDelete","AjaxLogonService":"AjaxLogonService","AjaxLogoff":"AjaxLogoff"};var listorders_changed={"AjaxOrderCreate":"AjaxOrderCreate","AjaxSingleOrderCancel":"AjaxSingleOrderCancel","AjaxSingleOrderSave":"AjaxSingleOrderSave","AjaxCurrentOrderCalculate":"AjaxCurrentOrderCalculate","AjaxSingleOrderCalculate":"AjaxSingleOrderCalculate","AjaxAddOrderItem":"AjaxAddOrderItem"};
ServicesEventMapping={cartChangeEvent:"",mattelSubOrderCount:"",mattelSubOrderIdForRA:"",mattelAddressIdForRA:"",cart_changed:{"save_for_later":"AjaxDeleteOrderItem","cart_remove":"AjaxDeleteOrderItem","cart_qty_update":"AjaxUpdateOrderItem","cart_split":"AddOrderItemdForSplit","cart_split_set":"AddOrderItemdForSplit","cart_edit_attr":"AjaxAddOrderItemForUpdate","cart_addon_split":"mattelAddOnServiceGiftOptionsSave","cart_addon_split_set":"mattelAddOnServiceGiftOptionsSave","cart_addon_add":"mattelAddOnServiceGiftOptionsSave","cart_addon_edit_attr":"AjaxReplaceItem","add_remove_promo":"AjaxUpdateOrderItem","cart_addon_service_add":"mattelAddOnServicesSave","add_back_to_cart":"requisitionListDeleteItem","requisition_qty_update":"requisitionListQtyUpdateItem","requisition_split":"requisitionListSplitAdd","requisition_remove":"requisitionListDeleteItem","requisition_edit_attr":"requisitionListDeleteItemForQV","requisition_addon_add":"mattelRequisitionListGiftOptionAdd","requisition_addon_split":"MattelRequisitionListAddedServicesAdd","requisition_addon_service_add":"mattelAddOnServicesSave"},cart_controllers:{"save_for_later":{"ShopCartDisplayController":"ShopCartDisplayController","RequisitionListDisplay_Controller":"RequisitionListDisplay_Controller"},"cart_remove":{"ShopCartDisplayController":"ShopCartDisplayController"},"cart_qty_update":{"ShopCartDisplayController":"ShopCartDisplayController"},"cart_split":{"ShopCartPaginationDisplayController":"ShopCartPaginationDisplayController"},"cart_split_set":{"ShopCartDisplayController":"ShopCartDisplayController"},"cart_edit_attr":{"ShopCartDisplayController":"ShopCartDisplayController"},"cart_addon_split":{"ShopCartPaginationDisplayController":"ShopCartPaginationDisplayController"},"cart_addon_split_set":{"ShopCartDisplayController":"ShopCartDisplayController"},"cart_addon_add":{"ShopCartPaginationDisplayController":"ShopCartPaginationDisplayController","MattelShopCartOrderTotalsAreaController":"MattelShopCartOrderTotalsAreaController"},"cart_addon_edit_attr":{"ShopCartDisplayController":"ShopCartDisplayController"},"add_remove_promo":{"ShopCartDisplayController":"ShopCartDisplayController"},"cart_addon_service_add":{"ShopCartPaginationDisplayController":"ShopCartPaginationDisplayController","MattelShopCartOrderTotalsAreaController":"MattelShopCartOrderTotalsAreaController"},"requisition_qty_update":{"RequisitionListDisplay_Controller":"RequisitionListDisplay_Controller"},"requisition_split":{"RequisitionListDisplay_Controller":"RequisitionListDisplay_Controller"},"requisition_remove":{"RequisitionListDisplay_Controller":"RequisitionListDisplay_Controller"},"requisition_edit_attr":{"RequisitionListDisplay_Controller":"RequisitionListDisplay_Controller"},"add_back_to_cart":{"RequisitionListDisplay_Controller":"RequisitionListDisplay_Controller","ShopCartDisplayController":"ShopCartDisplayController"},"requisition_addon_add":{"RequisitionListDisplay_Controller":"RequisitionListDisplay_Controller"},"requisition_addon_split":{"RequisitionListDisplay_Controller":"RequisitionListDisplay_Controller"},"requisition_addon_service_add":{"RequisitionListDisplay_Controller":"RequisitionListDisplay_Controller"}},cart_changed_MS:{"cart_qty_update":"AjaxUpdateOrderItem","cart_remove":"AjaxDeleteOrderItemForShippingBillingPage","cart_split":"AddOrderItemdForSplit","cart_edit_attr":"OrderItemAddressShipMethodUpdate","cart_addon_split":"AjaxPrepareSubOrderForAddons","cart_addon_add":"AjaxPrepareSubOrderForAddons","cart_split_set":"AddOrderItemdForSplit","cart_addon_split_set":"mattelAddOnServiceGiftOptionsSave","cart_addon_edit_attr":"OrderItemAddressShipMethodUpdate","add_remove_promo":"AjaxUpdateOrderItem","cart_addon_service_add":"AjaxPrepareSubOrderForAddons","cart_change_address":"OrderItemAddressShipMethodUpdate","cart_address_update":"AjaxShippingDetailsAdd"},cart_controllers_MS:{"cart_qty_update":{"MattelMSOrderDetailController":"MattelMSOrderDetailController"},"cart_remove":{"MattelMSOrderDetailController":"MattelMSOrderDetailController"},"cart_split":{"MattelMSOrderDetailController":"MattelMSOrderDetailController"},"cart_split_set":{"MattelMSOrderDetailController":"MattelMSOrderDetailController"},"cart_addon_split_set":{"MattelMSOrderDetailController":"MattelMSOrderDetailController"},"cart_edit_attr":{"MattelMSOrderDetailController":"MattelMSOrderDetailController"},"cart_addon_split":{"MattelMSOrderDetailController":"MattelMSOrderDetailController"},"cart_addon_add":{"MattelMSOrderDetailController":"MattelMSOrderDetailController"},"cart_addon_edit_attr":{"MattelMSOrderDetailController":"MattelMSOrderDetailController"},"add_remove_promo":{"MattelMSOrderDetailController":"MattelMSOrderDetailController"},"cart_change_address":{"MattelMSOrderDetailController":"MattelMSOrderDetailController"},"cart_addon_service_add":{"MattelMSOrderDetailController":"MattelMSOrderDetailController"},"cart_address_update":{"MattelMSOrderDetailController":"MattelMSOrderDetailController"}},setCartChangeEvent:function(cartEvent){this.cartChangeEvent=cartEvent;
},setCartChangeEventMS:function(cartEvent,subOrderCount,addressId,subOrderId){this.cartChangeEvent=cartEvent;this.mattelSubOrderCount=subOrderCount;this.mattelAddressIdForRA=addressId;this.mattelSubOrderIdForRA=subOrderId;}};