/** (c) Walgreen Co. All rights reserved.**/
$.ajaxSetup({
timeout: 30000, //Time in milliseconds
errorHandler: false,
cacheHandler: false
});
var https_urls = {
urls: ["/checkout/cart.jsp", "/optimizedcheckout/optimize_order_review.jsp", "/optimizedcheckout/ship_address.jsp", "/optimizedcheckout/payment_method.jsp", "/checkout/confirmorder_sdd.jsp", "/checkout/cl_customer_prescriber_info.jsp", "/checkout/cl_prescriber_search_results.jsp", "/clhistory/contactlenshist.jsp", "/orderstatus/order-history-details.jsp", "/orderstatus/orderstatus.jsp", "/checkout/bml_detail.jsp", "/autoreorder/ss_schedule_order_manager.jsp", "/checkout/selectpickuptimesdd.jsp", "login.jsp", "/logout.jsp", "/qrloyaltylanding.jsp", "/register/aarp_registration.jsp", "/register/loyalty_enroll.jsp", "/register/pharmacyRegistration.jsp", "/register/reg_confirmation.jsp", "/register/regOptions.jsp", "/register/regpersonalinfo.jsp", "/register/reviewconfirmation_single_match.jsp", "/register/reviewconfirmation.jsp", "/pharmacy/register/completePharmacyReg.jsp", "/pharmacy/register/confirmCompleteRxReg.jsp", "/pharmacy/register/pharmacyconfirmreg.jsp", "/youraccount/loyalty/loyalty_activity_detail.jsp", "/youraccount/loyalty/loyalty_landing.jsp", "/youraccount/loyalty/loyalty_points_earned.jsp", "/youraccount/loyalty/loyalty_rewards_settings.jsp", "/youraccount/aarp_membership_information.jsp", "/youraccount/communication_preferences.jsp", "/youraccount/default.jsp", "/youraccount/editemailaddress.jsp", "/youraccount/personal_information.jsp", "/youraccount/youraccount_upsellbanner.jsp", "/password/username_reset.jsp", "/password/password_reset.jsp", "/youraccount/addressbook/manage_address.jsp", "/topic/help/mobileandsocial.jsp", "/topic/help/accounthelp/account_help_main.jsp", "/topic/help/generalhelp/privacyandsecurity.jsp", "/shoplocal/shoplocal_confirmation.jsp", "/qr/invalid_link.jsp", "/password/create_securityquestion.jsp", "/password/reset_password.jsp", "/password/reset_securityquestion_dummy.jsp", "/password/reset_securityquestion.jsp", "/password/reset.jsp", "/password/resetpassword_answer.jsp", "/password/retrieve_username_confirmation.jsp", "/password/send.jsp", "/webmd/webmd_confirmation.jsp", "/pharmacy/familyaccount/addadult.jsp", "/pharmacy/familyaccount/addchild.jsp", "/pharmacy/familyaccount/addpet.jsp", "/pharmacy/familyaccount/authform_decline.jsp", "/pharmacy/familyaccount/authform.jsp", "/pharmacy/familyaccount/child_send_invite.jsp", "/pharmacy/familyaccount/manageaccountaccess.jsp", "/pharmacy/familyaccount/managefamilyaccounts.jsp", "/pharmacy/hippa/hipaa_disclaimer.jsp", "/oauth/device_confirmation.jsp", "/oauth/login.jsp", "/oauth/password_prompt.jsp", "/pharmacy/register/qr/refillreminder/completerxprofile.jsp", "/pharmacy/register/qr/refillreminder/rxsignin.jsp", "/pharmacy/register/qr/rxconfirmcancel.jsp"]
};
var cac_configs = {
"handleIECache": true
};
var svc_timeouts = {

//CAC 
"getCartInfo": 20000,
"updateItem": 20000,
"proceedToCheckout": 20000,
"submitOrderSuccess": 20000,
"getOrderInfo": 20000,
"getOrderStatus": 60000,
"postPaginationStatus": 60000,
"postOrderStatus": 60000,
"addShipAddressOrderSuccess": 20000,
"updateAddressBookOrder": 20000,
"addPaymentOrder": 20000,
"updatePaymentOrder": 20000,
"updateShipMethod": 20000,
"paypalPost": 60000,
"expressPaypal": 20000,

//DPF Time Out service keyword
"getStoreandaccount": 30000,
"getRefillHubPrescription": 20000,
"getRefillPrescriptionCard": 20000,
"requestRefill": 50000,
"getrxhistory": 15000,
"getRxStatusInfo": 30000,
"getReloadStatusInfo": 15000,
"getLeanCheckout": 80000,
"setLeanCheckout": 80000,
"postRxNum": 30000,
"getRxInformation": 10000,
"getIndividualRefillHubPrescription": 25000,
"getRefillHubSearchPrescription": 20000,
"getAutoRefillPrescription": 10000,
"getAutoRefillRetailMailPrescription": 10000,
"addPaymentRetail": 60000,
"addPaymentMail": 60000,
"addShippingAddressRetail": 60000,
"addShippingAddressMail": 60000,
"turnOnRetailPickupAutoRefill": 20000,
"turnOnMailAutoRefill": 20000,
"getAutoRefill": 11000,
"PutAutoRefill": 10000,
"makePayment": 60000,
//DPC Time Out service keyword
"getAuthenticationOptions": 60000,
"getQuestionsNOptionsPrimary": 60000,
"getQuestionsNOptionsSecondary": 60000,
"getPrescriptionVerification": 60000,
"getPinVerification": 60000,
"getPhoneVerification": 60000,
"deletePsmMessage": 60000,
"getPsmMessageInbox": 60000,
"getPsmMessageDetail": 60000,
"postPsmReplyMessage": 60000,
"getDrugBrowse": 60000,
"getDrugDosage": 60000,
"getDrugInfo": 60000,
"getDrugSearch": 60000,
"postDrugSearch": 60000,
//DHS Time Out service keyword
"getStepsActivities": 60000,


//DCS Time Out Service keyword - START
//DCS Service
"getTimeSlot": 60000,
"getFamilyMemberManagement": 60000,
"getdashboardwidgets": 60000,
"getApptSelectDateTime": 60000,
"getApptStoreInfo": 60000,
"getSelectService": 60000,
"getVaccineInfo": 60000,
"getSelectLoc": 60000,
"getPatientForm": 60000,
"sendpatientsInfo": 60000,

//To check
"getpatientsinfo": 60000,
"getRescheduleData": 60000,
"getapptview": 60000,
"postSearchView": 60000,
"getProfileInfo": 60000,
"getimmunizationhistory": 60000,
"getvaccinelist": 60000,
"addEditImmunization": 60000,
"getImmPatientInfo": 60000,
"hideUnhideImmRec": 60000,
"sendApptCancelRequest": 60000,
"getallstate": 60000,
"getuser": 60000,
"addFamilyMember": 60000,
"getStoreServices": 60000,

"getUserInfo": 60000,
"getAppointmentLanding": 60000,
"getStateInfo": 60000,
"getAddressBook": 60000,
"getImmCard": 60000,
"hideImmCard": 60000,
"addImmCard": 60000,
"apptReconcile": 60000,
//DCS Service timeout keyword - END

//Insurance and prices
"getInsPlansStoresList": 60000,
"getInsuransPlansList": 60000
};
var cac_paycapture_url = "https://www.securecheckout.billmelater.com/paycapture-ws/paycapturelite";
var cac_visacheckout_sdk_url = "https://assets.secure.checkout.visa.com/checkout-widget/resources/js/integration/v1/sdk.js";
var cac_visacheckout_button="https://secure.checkout.visa.com/wallet-services-web/xo/button.png?height=32&width=160";
var cac_visacheckout_pay_button="https://secure.checkout.visa.com/wallet-services-web/xo/button.png?height=47&width=288";
var cac_visacheckout_radio_button="https://assets.secure.checkout.visa.com/VmeCardArts/partner/POS_horizontal_99x34.png";
//Below variable added for session sharing
var hostNameRegexes = ["drugstore.com", "beauty.com"];
var excludeHostNameRegexes = "walgreens";
var crossDomainURLs = ["self", "https://www3.wag-static.com/**", "http://www3.wag-static.com/**", "https://www.wag-static.com/**", "http://www.wag-static.com/**"];