
if (core === undefined) {
    var core = {
        isLoaded: true
    };
}

core.accessibilityMode = false;
core.toggleAccessibilityMode = function () {
    this.accessibilityMode = !this.accessibilityMode;
    $.jStorage.set("AccessibilityMode", this.accessibilityMode);
    this.setAccessibilityInfo();
    $(document).bind('pageBannerLoaded', function () {
        pageBanner.loadResponse("Accessibility alerts have been " + (core.accessibilityMode ? "enabled" : "disabled") + ".");
    });

    $.event.trigger({
        type: "accessibilityModeChanged",
        mode: core.accessibilityMode,
        time: new Date()
    });
};
core.setAccessibilityInfo = function () {
    if (this.accessibilityMode) {
        $("#AccessibilityInfoEnabled").show();
        $("#AccessibilityInfoDisabled").hide();
    } else {
        $("#AccessibilityInfoEnabled").hide();
        $("#AccessibilityInfoDisabled").show();
    }
};
if ($.jStorage.get("AccessibilityMode")) {
    core.accessibilityMode = $.jStorage.get("AccessibilityMode");
}
