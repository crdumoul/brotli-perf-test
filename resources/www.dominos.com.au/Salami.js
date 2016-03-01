function PositionSalami(retries) {
    var tomatoHeight = 600;
    var salamiHeight = 600;
    var topMargin = 200;
    var menuHeight = 0;

    if ($('.gridArticle.content').length>0) {
        menuHeight = $('.gridArticle.content').height();
    } else if ($('pizzamenus').length > 0) {
        menuHeight = $('pizzamenus').height();
    }
    else if ($('.background-image-target').length > 0) {
        menuHeight = $('.background-image-target').height();
    } else {
        if (retries > 0) {
            setTimeout(function() { PositionSalami(retries--); }, 200);
        }
        return;
    }
    

    var salami = $('.background-feature-right');
    if (menuHeight < (topMargin + tomatoHeight + salamiHeight)) {
        salami.css({ top: 'inherit', bottom: 0 });
    }
}

onDocumentReady(function() { PositionSalami(5) });