function validateSearchForm(frm) {
   
    var success = false;
    if (validateFieldRequired(frm["SearchCriteria"])) {
        success = validateFieldByRegex(frm["SearchCriteria"], new RegExp(/^[0-9a-z\u00C0-\u017F\.\- ',]+$/i));
        if (success) {
            hideInlineError(frm["SearchCriteria"]);
        }
    } else {
        hideInlineError(frm["SearchCriteria"]);
    }
}
function validateAndSubmitSearchForm(frm) {
    console.log("validateSearchForm", frm);

    var success = false;
    if (validateFieldRequired(frm["SearchCriteria"])) {
        success = validateFieldByRegex(frm["SearchCriteria"], new RegExp(/^[0-9a-z\u00C0-\u017F\.\- ',]+$/i));
    }
    if (success) {
        console.log("Success");
        frm.submit();
    }
}

function validateFieldRequired(field) {
    console.log("validateFieldRequired", field);
    if (field.value != "") return true;
    showInlineError(field, message);
    return false;
}

function validateFieldByRegex(field, regex) {
    console.log("validateFieldByRegex", field, regex);
    if (regex.test(field.value)) return true;
    showInlineError(field);
    return false;
}

function showInlineError(field) {
    console.log("showInlineError", field);
    field.className += "inline-error";
    var errorSpan = document.getElementById(field.id + "-error");
    if (errorSpan.className.indexOf("visible") < 0) {
        errorSpan.className += " visible";
    }
}

function hideInlineError(field) {

    field.className = field.className.replace("inline-error","");
    var errorSpan = document.getElementById(field.id + "-error");
    if (errorSpan.className.indexOf("visible") > 0) {
        errorSpan.className =  errorSpan.className.replace("visible","");
    }
}

function updateStoreAddressHeight() {
    if ($('.store-search-results').length == 0) {
        return;
    }
    console.log("reset all heights");
    $('.store-information p').height(""); //reset all heights

    if ($(document).width() <= 400) {
        console.log("screen too small");
        return;
    }
    var rows = {};
    var heights = {};

    console.log("get paragraph rows and heights");
    $('.store-information p').each(function(index) {
        var ypos = Math.floor($($(this)[0]).position().top);
        rows[ypos] = rows[ypos] || [];
        rows[ypos].push(index);
        heights[ypos] = heights[ypos] || [];
        heights[ypos].push($($(this)[0]).height());
    });

    //console.log("apply max height per row");
    for (var y in rows) {
        var maxHeight = Math.max.apply(null, heights[y]);
        //console.log("row at y:"+y+" has a max height of "+ maxHeight);
        for (var p in rows[y]) {
            var pIndex = rows[y][p];
            $($('.store-information p')[pIndex]).height(maxHeight);
        }
    }
}

onDocumentReady(updateStoreAddressHeight);

onDocumentReady(function() {
    $(window).resize(function () {
        console.log("timeout resize");
        if (window.resizeTimeout) clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(updateStoreAddressHeight, 200);
    });
});