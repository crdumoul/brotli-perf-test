// FONT SIZER VERSION 1.0
// Developed by fluidByte (http://www.fluidbyte.net) tweaked by Dan

function fontResizer() {
    function clearSelected() {
        $("a.smallFont").removeClass("currFont");
        $("a.medFont").removeClass("currFont");
        $("a.largeFont").removeClass("currFont");
        $("body").removeClass("smallFont").removeClass("medFont").removeClass("largeFont")
    }

    function saveState(curSize) {
        var date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = "fontSizer" + "=" + curSize + expires + "; path=/";
    }
    $("a.smallFont").click(function () {
        clearSelected();
        $('body').addClass('smallFont');
        $("a.smallFont").addClass("currFont");
        saveState("smallFont");
        return false
    });
    $("a.medFont").click(function () {
        clearSelected();
        $('body').addClass('medFont');
        $("a.medFont").addClass("currFont");
        saveState("medFont");
        return false
    });
    $("a.largeFont").click(function () {
        clearSelected();
        $('body').addClass('largeFont');
        $("a.largeFont").addClass("currFont");
        saveState("largeFont");
        return false
    });

    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }
    var savedSize = getCookie('fontSizer');
    if (savedSize != "") {
       // alert(savedSize);
        $('body').addClass(savedSize);
        if (savedSize == "smallFont") {
            $("a.smallFont").addClass("currFont");
        } else if (savedSize == "largeFont") {
            $("a.largeFont").addClass("currFont");
        } else {
            $("a.medFont").addClass("currFont");
        }
    } else {
        $('body').addClass("smallFont");
        $("a.smallFont").addClass("currFont");
    }
}