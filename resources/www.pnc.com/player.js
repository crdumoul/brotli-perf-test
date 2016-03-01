var amp, currentPlayer;
var videos = [];
var players = [];

function playVideo(value) {

    if (amp != null) amp.destroy();
    var index = parseInt(value);
    //video = videos[index];
    currentPlayer = index;
    jQuery(".video-player").html(players[currentPlayer]);

    //amp.addEventListener("ready", _isReady);
    
    //function _isReady(event) {
    //    amp.setMedia(video);
        //amp.play();
    //}
} 
 
jQuery(document).ready(function() {
    runPlayerCode();
    
    // add empty player div to DOM
    if (jQuery("#video-player").length === 0) {
        jQuery("body").append("<div class='video-player' style='display: none;' id='video-player'></div>");
    }

    jQuery("div#container").on("click", ".video-promo, .video-inline", function(e) {
        
        // move player inline
        jQuery(".video-player").removeClass("modal-video");
        jQuery(".video-player").show().appendTo(jQuery(this));
        
        //play video
        var index = jQuery(this).attr("video");
        playVideo(index);
        e.preventDefault();
    });
    
    jQuery("div#container").on("click", ".video-popup, .video-link", function(e) { 
    
        // create modal window with player
        var videoDiv = "#video-player";
        jQuery(videoDiv).addClass("modal-video");
        jQuery.fancybox.open({
            padding: 0,
            openSpeed  : 150,
            closeSpeed  : 150,
            closeClick : true,
            helpers : {
                overlay : {
                    css : {
                        'background':'transparent',
                        'filter':'progid:DXImageTransform.Microsoft.gradient(startColorstr=#D2eeeeee,endColorstr=#D2eeeeee)', 
                        'zoom': '1',
                        'background' : 'rgba(238, 238, 238, 0.85)'
                    }
                }
            },
            href : videoDiv
        });
        
        //play video
        var index = jQuery(this).attr("video");
        playVideo(index);
        e.preventDefault();
    });
    
    // not video-related
    jQuery(".fancybox").fancybox({
            padding: 0,
            openSpeed  : 150,
            closeSpeed  : 150,
            closeClick : true,
            helpers : {
                overlay : {
                    css : {
                        'background':'transparent',
                        'filter':'progid:DXImageTransform.Microsoft.gradient(startColorstr=#D2eeeeee,endColorstr=#D2eeeeee)', 
                        'zoom': '1',
                        'background' : 'rgba(238, 238, 238, 0.85)'
                    }
                }
            }
    });
});

jQuery(document).ajaxComplete(function() {
    //videos = [];
    //newPlayer = [];
    runPlayerCode();
});


function runPlayerCode() {
        jQuery(".video-link, .video-inline, .video-popup, .video-promo").each(function(i) { 
            var videoURL = jQuery(this).attr("href");
            var videoFragment = jQuery(this).attr("rel");
            var videoTitle = jQuery(this).attr("title");
            var newVideo = { 
                    autoplay: true,
                    title: videoTitle, 
                    source: 
                        [ 
                            {src: videoURL, type: "video/f4m"},                           
                            {src: "https://pncvoduniversal-vh.akamaihd.net/i" +videoFragment+ ".csmil/master.m3u8", type: "application/x-mpegURL"} 
                        ] 
                     };
            videos.push(newVideo);
            jQuery(this).attr("video",i);
            jQuery(this).attr("href","#");
            var newPlayer = '<div id="akamai-media-player"></div><script>amp = new akamai.amp.AMP("akamai-media-player", {autoplay: true, feed: {enabled: false}, media: videos[' + i + ']});</scr'+'ipt>';
            players.push(newPlayer);
        }); 
                   
    }