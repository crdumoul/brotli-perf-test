/* SiteCatalyst code version: H.14. Copyright Omniture, Inc. More info available at http://www.omniture.com */
/************************** CONFIG SECTION ****************************************/
/* Specify the Report Suite(s) */
var s_account="devsunjava";
var sun_dynamicAccountSelection=true;
var sun_dynamicAccountList="sunjava=java.com;devsunjava=.";	
/* Specify the Report Suite ID */
var s_siteid="javac:";
/* Grab JRE Version */
if (typeof deployJava != 'undefined') {
var jreVersions = deployJava.getJREs();
if (jreVersions.length==0){
		var s_prop24 = "None";
	}else{
		s_prop24 = jreVersions[parseInt(jreVersions.length - 1)];
	}
}
/* LOCAL Omniture JS call  */
var fullURL= "/ga/js/metrics_group1.js";
document.write("<sc" + "ript language=\"JavaScript\" src=\""+fullURL+"\"></sc" + "ript>");
/************************** END CONFIG SECTION **************************************/
