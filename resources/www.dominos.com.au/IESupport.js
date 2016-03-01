/**
 * IE8 Array.IndexOf support
 */
function addArrayIndexOfSupport() {
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(elt /*, from*/) {
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++) {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }
}

/**
* IE8 breakpoint support
*/
function addBreakpointClassesToBody() {
    console.log("Add breakpoint classes to <body>");
    var w = $(document).width();
    var breakpoint = "lg";
    if (w <= 600) {
        breakpoint = "sm";
    } else if (w <= 800) {
        breakpoint = "md";
    }
    document.body.className += breakpoint;
}

/**
 * IE8 responsive iframes
 */
function resetIframeDimensions() {
    console.log("Reset all iframes dimensions to their containers")
    $("iframe").each(function() {
        $(this)[0].width = "";
        $(this)[0].height = "";
    });
}

/**
 * IE8/9 Placeholder support
 * http://kamikazemusic.com/quick-tips/jquery-html5-placeholder-fix/
 */
function addPlaceholderToInputFields() {
    console.log("Add placeholder functionality to <input> tags");
    $("input").each(function () {
        if ($(this).val() == "" && $(this).attr("placeholder") != "") {
            $(this).val($(this).attr("placeholder"));
            $(this).focus(function () {
                if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
            });
            $(this).blur(function () {
                if ($(this).val() == "") {
                    $(this).val($(this).attr("placeholder"));
                }
            });
        }
    });
}

if (navigator.userAgent.indexOf("MSIE 8") != -1) {
    addArrayIndexOfSupport();
    onDocumentReady(addBreakpointClassesToBody);
    onDocumentReady(resetIframeDimensions);
    onDocumentReady(addPlaceholderToInputFields);
}

if (navigator.userAgent.indexOf("MSIE 10.0") != -1) {
    onDocumentReady(function() { document.documentElement.className += " ie10"; });
}