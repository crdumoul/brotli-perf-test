$(function () {
    var msg = "Link will open a new window";

    $("a[target=_blank]:not([alt-modified=true])").each(function () {
        var t = $(this);

        if (t.find('.new-window').length > 0) {
            return;
        }

        var aa = t.attr("alt");
        aa ? t.attr("alt", aa + msg) : t.attr("alt", msg)
        t.attr("alt-modified", "true");
    });
});
