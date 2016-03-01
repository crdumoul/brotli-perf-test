/* This file should only be used to set the s_account variable (report suite variable) as the "s" object will not have been created at this point.
To overwrite default variables, modify /js/local_s_code.js */

var s_account = 'canwestglobal,cannationalpost';

var schost = window.location.host;
var scpathArray=window.location.pathname.split('/');
if (schost.search("qa.") !=-1 || schost.search("dev.") != -1 || schost.search("staging.") != -1) {
	s_account = "canpublishing,canwestglobaldev";
//} else if (scpathArray[1]!=undefined&&scpathArray[1]!=""&&scpathArray[1]=="mobile") {
} else if (schost.search("classifieds.") !=-1) {
	s_account = "canwestglobal,canclassified-ecommrce";
//} else if (scpathArray[1]!=undefined&&scpathArray[1]!=""&&scpathArray[1]=="mobile") {
} else if (scpathArray[1]!=undefined&&scpathArray[1]!=""&&scpathArray[1]=="m") {
	//s_account="canwestglobal,cannationalpost,canmobilenews"
	s_account="canwestglobal,canmobilenews"
}