/* Deployed On: 2016-01-27 11:28:55 */
if (window.crtg_content) {
	var crtg_split = crtg_content.split(";");
	for (var i=0; i<crtg_split.length; i++) {
		var item = crtg_split[i];
		if (item) {
			var key = item.split("=")[0];
			var value = item.split("=")[1];
			AMPTManager.addPageLevelTarget("'" + key + "', '" + value + "'");
		}
	}
}

AMPTManager.renderSingleSlot("ad_mod_00b2b15a1", [[88,31]], [["transId", cnnad_transactionID], ["kuid", Krux.user], ["ksg", Krux.segments], ["guid", AMPTManager.readCookie("ug")], ["mod",["pulse"]], ["pos",["mod"]]], [], "8663477/NBA/module", 0, false, false, 0);
