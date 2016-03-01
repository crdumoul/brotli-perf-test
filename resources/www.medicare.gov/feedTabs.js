(function ($) {
    $.fn.GetBlogFeed = function () {
        if ($("#contentTab1 .feedItem").length == 0) {
            $("#contentTab1").append("<h3 class='HiddenText'>Blogs</h3>");
            $("#contentTab1").append('<p>Loading...</p>');

            // get the blog feed
            var BlogFeed = new google.feeds.Feed("http://blog.medicare.gov/feed/");
            BlogFeed.setNumEntries(4);
            BlogFeed.load(function (result) {
                if (!result.error) {
                    $("#contentTab1 p").remove();
                    $("#contentTab1").append("<ul></ul>");
                    for (var i = 0; i < result.feed.entries.length; i++) {
                        var entry = result.feed.entries[i];
                        $("#contentTab1 ul").append('<li class="feedItem"><p><a href="' + entry.link + '">' + entry.title + '</a></p></li>');
                    }
                    $("#contentTab1").append('<a class="feedtab-button btn btn-primary" href="http://blog.medicare.gov" target="_blank">Read more blogs</a>');
                }
                else { $("#contentTab1 p").html('Sorry, there was an error retrieving the feed.'); }
            });
        }
    };
    $.fn.GetNews = function () {
        if ($("#contentTab2 .feedItem").length == 0) {
            $("#contentTab2").append("<h3 class='HiddenText'>News</h3>");
            $("#contentTab2").append('<p>Loading...</p>');

            // get the News from an XML file
            $.get('/medicare-news/News.xml', function (data) {
                var xml = $(data);
                if (xml) {
                    $("#contentTab2 p").remove();
                    $("#contentTab2").append("<ul></ul>");
                    xml.find("item").each(function () {
                        var item = {
                            title: $(this).find("title").text(),
                            link: $(this).find("link").text()
                        };
                        $("#contentTab2 ul").append('<li class="feedItem"><p><a href="' + item.link + '">' + item.title + '</a></p></li>');
                    });
                    $("#contentTab2").append('<a class="feedtab-button btn btn-primary" href="http://www.cms.gov/Newsroom/Newsroom-Center.html" target="_blank">Read more news</a>');
                }
                else { $("#contentTab2 p").html('Sorry, there was an error retrieving the feed.'); }
            });
        }
    };
    $.fn.GetVideos = function () {
        if ($("#contentTab3 .feedItem").length == 0) {
            $("#contentTab3").append("<h3 class='HiddenText'>Videos!</h3>");
            $("#contentTab3").append('<p>Loading...</p>');

            $.ajax({
                url: "http://gdata.youtube.com/feeds/api/users/CMSHHSgov/uploads?v=2&alt=jsonc",
                dataType: 'jsonp',
                success: function (data) {
                    var items = data.data.items || [];
                    if (items.length > 0) {
                        $("#contentTab3 p").remove();
                        $("#contentTab3").append("<ul></ul>");
                        for (var i = 0; i < items.length && i < 3; i++) {
                            var item = items[i];
                            var uploaded = item.uploaded.split("T")[0].split("-");
                            var uploaded = new Date(uploaded[0], uploaded[1], uploaded[2]);
                            $("#contentTab3 ul").append('<li class="feedItem vfeedItem"><a href="' + item.player['default'] + '" tabindex="-1"><img class="ytThumbnail" src="' + item.thumbnail.sqDefault + '" alt="Video thumnbnail for ' + item.title + '"></a><p class="videoP"><a href="' + item.player['default'] + '">' + item.title + '</a><br />' + $.datepicker.formatDate('MM d', uploaded) + '</p></li>');
                        }
                        $("#contentTab3").append('<a class="feedtab-button btn btn-primary" href="http://www.youtube.com/user/CMSHHSgov" target="_blank">Watch more videos</a>');
                    }
                    else { $("#contentTab3 p").html('Sorry, there was an error retrieving the videos.'); }
                }
            });
        }
    };
})(jQuery);

$(document).ready(function () {
    $("#feedTabs").GenerateTabs({ "tabHeadings": "Blogs,News,Videos", "numberoftabs": 3, "tabDivIDs": "blogTab,newsTab,videosTab", "cssClass": "DefaultTabClass", "anchorable": false});
    $("#blogTab").detach();
    $("#newsTab").detach();
    $("#videosTab").detach();

    $('#feedTabs').bind('tabsselect', function (event, ui) {
        switch (ui.index) {
            case 0: //load news
                $(this).GetBlogFeed();
                break;
            case 1: //load CMS blog
                $(this).GetNews();
                break;
            case 2: //load videos
                $(this).GetVideos();
                break;
        }
    });

    // get content for default tab
    $(this).GetBlogFeed();

});

