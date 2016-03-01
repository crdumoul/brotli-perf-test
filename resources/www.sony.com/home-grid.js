var Sony = Sony || {};

Sony.homeGrid = (function() {

  var $gridWindow = $(window),
    $gridBody = $('body'),
    $gridScreen = $('#screen'),
    $grid = $('#grid'),
    $loadMoreButton = $('#load-more'),
    threeColWidth = 643,
    fiveColWidth = 1000,
    viewportWidth = 1200,
    viewportHeight = 800,
    mode = 'desktop',
    tiles = [],
    tiles_max = 0,
    tiles_vine = [],
    tiles_youtube = [],
    tiles_youtube_pending = [],
    youtubeAPI = false,
    moreCount = 0;

  var init = function() {

    // load youtube iframe player api code asynchronously\
    // https://developers.google.com/youtube/iframe_api_reference
    var youtubeScript = document.createElement('script');
    youtubeScript.src = 'https://www.youtube.com/iframe_api';
    var youtubeScriptPosition = document.getElementsByTagName('script')[0];
    youtubeScriptPosition.parentNode.insertBefore(youtubeScript, youtubeScriptPosition);

    updateViewport();

    bind();
  };

  var bind = function() {
    $gridScreen.click(function(e) {
      if ($gridScreen.hasClass('pop-out')) {
        e.preventDefault();
        closePopOuts();
      }
    });
  };

  var closePopOuts = function() {
    $('iframe.video-wrapper').each(function() {
      var _targetOrigin = this.src.replace(/^([^\/]*\/\/[^\/]+\/).*$/, '$1');
      this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', _targetOrigin);
    });

    for (var i = 0; i < tiles_youtube.length; i++) {
      tiles_youtube[i].tileBuilt.closePopOut();
    }
    $gridScreen.removeClass('pop-out');
    $gridBody.removeClass('pop-out');
  };

  var getWindow = function() {
    return $gridWindow;
  };

  var getBody = function() {
    return $gridBody;
  };

  var getGrid = function() {
    return $grid;
  };

  var getOffset = function() {
    return $grid.offset();
  };

  var getWidth = function() {
    return $grid.width();
  };

  // screen is a div that covers non-video elements
  var getScreen = function() {
    return $gridScreen;
  };

  var getLoadMoreButton = function() {
    return $loadMoreButton;
  };

  var updateViewport = function() {
    if ($grid.width() <= threeColWidth) {
      this.mode = 'mobile';
    }
    else if ($grid.width() <= fiveColWidth) {
      this.mode = 'tablet';
    }
    else {
      this.mode = 'desktop';
    }
    this.viewportWidth = $gridWindow.width();
    this.viewportHeight = $gridWindow.height();
  };

  init();

  // make select variables and methods public
  return {
    threeColWidth: threeColWidth,
    fiveColWidth: fiveColWidth,
    getWindow: getWindow,
    getBody: getBody,
    getGrid: getGrid,
    getOffset: getOffset,
    getWidth: getWidth,
    getScreen: getScreen,
    getLoadMoreButton: getLoadMoreButton,
    updateViewport: updateViewport,
    viewportWidth: viewportWidth,
    viewportHeight: viewportHeight,
    mode: mode,
    tiles: tiles,
    tiles_max: tiles_max,
    tiles_youtube_pending: tiles_youtube_pending,
    tiles_youtube: tiles_youtube,
    tiles_vine: tiles_vine,
    youtubeAPI: youtubeAPI,
    moreCount: moreCount
  };

})();

// TILE - image
// build out images for most tiles, based on screen size

Sony.tileBuildImage = function(tile_image) {

  var init = function() {
    // use the high resolution image
    if (Sony.homeGrid.mode != 'mobile') {
      tile_image.css('background-image', 'url(' + tile_image.data('img2x') + ')');
    }
    // use the low resolution image
    else {
      tile_image.css('background-image', 'url(' + tile_image.data('img1x') + ')');
    }
  };

  init();

};

// TILE - share
// build out share links for most tiles

Sony.tileBuildShare = function(tile_share) {

  var $btn = tile_share.find('.btn').find('a'),
    $facebook = tile_share.find('.facebook').find('a'),
    $twitter = tile_share.find('.twitter').find('a'),
    $tumblr = tile_share.find('.tumblr').find('a'),
    $link = tile_share.find('.link').find('a'),
    $share_link = tile_share.next('.share-link'),
    $share_input = $share_link.find('.share-link-input');

  var init = function() {
    bind();
  };

  var bind = function() {
    $facebook.on('click.shareClick', function(e) {
      e.preventDefault();
      window.open($facebook.attr('href'), '_blank', 'height=368,width=670');
    });

    $twitter.on('click.shareClick', function(e) {
      e.preventDefault();
      window.open($twitter.attr('href'), '_blank', 'height=420,width=550');
    });

    $tumblr.on('click.shareClick', function(e) {
      e.preventDefault();
      window.open($tumblr.attr('href'), '_blank', 'height=420,width=450');
    });

    $link.on('click.shareClick', function(e) {
      e.preventDefault();
      $share_link.toggleClass('open');
      $share_input.focus();
    });

    $share_input.on('click.shareClick', function(e) {
      e.preventDefault();
      $share_input.select();
    });

    $btn.on('click.shareClick', function(e) {
      e.preventDefault();
      tile_share.toggleClass('open');
      if (!tile_share.hasClass('open')) {
        $share_link.removeClass('open');
      }
    });
  };

  init();

};

// TILE - article
// click and hover effect for article tiles

Sony.tileArticle = function(tileCapsule) {

  var $tile = tileCapsule.tile,
    $title = tileCapsule.tile.find('.title'),
    $title_plus = $title.add($title.find('a')),
    $cta = tileCapsule.tile.find('.cta'),
    $more = $tile.find('.more'),
    $overlay = $tile.find('.overlay');

  var init = function() {
    bind();
  };

  var bind = function() {
    // touch device
    if (Sony.util.isTouch()) {
      $tile.addClass('show-more-touch');
      $overlay.on('click.articleClick', function(e) {
        if (e.target.className == 'overlay') {
          $tile.toggleClass('show-more');
        }
      });
      $title_plus.on('click.articleClick', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $tile.toggleClass('show-more');
      });
      $more.on('click.articleClick', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $tile.toggleClass('show-more');
      });
    }
    // non-touch device
    else {
      $cta.on('mouseover.articleMouseover', function() {
        $tile.addClass('show-more');
      });
      $title_plus.on('mouseover.articleMouseover', function() {
        $tile.addClass('show-more');
      });
      $overlay.on('mouseleave.articleMouseleave', function() {
        $tile.removeClass('show-more');
      });
    }
  };

  init();

};

// TILE - twitter
// convert time display into 'time ago' format

Sony.tileTwitter = function(tileCapsule) {

  var $tile = tileCapsule.tile,
    $timer = $tile.find('.date');

  var init = function() {
    if (!$timer.data('origin-time')) {
      var now = new Date().getTime(),
       per_min = 1000 * 60,
       per_hour = per_min * 60,
       per_day = per_hour * 24;

      var split_time_text = $timer.text(),
       split_time = split_time_text.split(' '),
       split_time_d = split_time[0].split('-'),
       split_time_t = split_time[1].split(':');

      var created_time = new Date(parseInt(split_time_d[0], 10), parseInt(split_time_d[1] - 1, 10), parseInt(split_time_d[2], 10), parseInt(split_time_t[0], 10), parseInt(split_time_t[1], 10), parseInt(split_time_t[2], 10));

      var ago = now - created_time.getTime();

      var days = Math.floor(ago / per_day);
      ago = ago - (days * per_day);

      var hours = Math.floor(ago / per_hour);
      ago = ago - (hours * per_hour);

      var minutes = Math.floor(ago / per_min);
      ago = ago - (minutes * per_min);

      var seconds = Math.floor(ago / 1000);

      if (days > 1) {
        ago_str = '' + days + ' days ago';
      } else if (days > 0) {
        ago_str = '' + days + ' day ago';
      } else if (hours > 1) {
        ago_str = '' + hours + ' hours ago';
      } else if (hours > 0) {
        ago_str = '' + hours + ' hour ago';
      } else if (minutes > 1) {
        ago_str = '' + minutes + ' minutes ago';
      } else if (minutes > 0) {
        ago_str = '' + minutes + ' minute ago';
      } else if (seconds > 1) {
        ago_str = '' + seconds + ' seconds ago';
      } else {
        ago_str = '' + seconds + ' second ago';
      }
      if (days > 365) {
        ago_str = split_time_d[1] + ' ' + split_time_d[2] + ', ' + split_time_d[0];
      }

      $timer.data('origin-time', split_time_text);
      $timer.text(ago_str);
    }
  };

  init();

};

// TILE - vine
// if vine is onscreen, add iframe src
// if vine is offscreen, remove iframe src

Sony.tileVine = function(tileCapsule) {

  var $tile = tileCapsule.tile,
    $vineEmbed = $tile.find('.vine-embed');

  var init = function() {
    // always load vines if on mobile and tablet
    if (Sony.homeGrid.mode != 'desktop') {
      on_screen();
    }
  };

  var on_screen = function() {
    if (!$vineEmbed.attr('src')) {
      $vineEmbed.attr('src', $vineEmbed.data('src') + '/card?related=0');
    }
  };

  var off_screen = function() {
    if ($vineEmbed.attr('src')) {
      $vineEmbed.attr('src', '');
    }
  };

  init();

  return {
    on_screen: on_screen,
    off_screen: off_screen
  };

};

// TILE - youtube
// open and close for youtube tiles

Sony.tileYoutube = function(tileCapsule) {

  var $body = Sony.homeGrid.getBody(),
    $screen = Sony.homeGrid.getScreen(),
    $tile = tileCapsule.tile,
    $playBtn = $tile.find('.play'),
    $playBtnLink = $playBtn.find('a'),
    $hotspot = $tile.find('.hotspot'),
    $hotspotLink = $hotspot.find('a'),
    $controls = $tile.find('.controls'),
    $share = tileCapsule.share,
    $closeBtnLink = $controls.find('.share-close').find('a'),
    $sourceIcon = $tile.find('.source'),
    $copy = $tile.find('.copy'),
    $bg = $tile.find('.bg'),
    $img = tileCapsule.image,
    $videoWrapper = $bg.find('.video-wrapper'),
    $iframe = null,
    originSrc = $playBtnLink.attr('href'),
    src = originSrc.replace('http://youtu.be/', '');

  var player = null;

  var init = function() {
    // give the videoWrapper a unique id so youtube can target it
    $videoWrapper.attr('id', src);
    bind();
  };

  var bind = function() {
    $playBtnLink.on('click.youtubeClick', function(e) {
      e.preventDefault();
      openPopOut();
    });
    $hotspotLink.on('click.youtubeClick', function(e) {
      e.preventDefault();
      openPopOut();
    });
    $closeBtnLink.on('click.youtubeClick', function(e) {
      e.preventDefault();
      closePopOut();
    });
  };

  var hideElements = function() {
    $img.hide();
    $playBtn.hide().removeClass('loading');
    $copy.hide();
    $sourceIcon.hide();
  };

  var showElements = function() {
    $img.show();
    $playBtn.show();
    $copy.show();
    $sourceIcon.show();
    $share.removeClass('visible');
  };

  var openPopOut = function() {
    $tile.addClass('pop-out');
    $body.addClass('pop-out');
    $screen.addClass('pop-out');
    $playBtn.addClass('loading');
    $share.addClass('visible');

    // check if tile position is hiding close and share links
    var gridLeft = Sony.homeGrid.getOffset().left,
      gridTop = Sony.homeGrid.getOffset().top,
      gridWidth = Sony.homeGrid.getWidth(),
      thisLeft = $tile.offset().left,
      thisTop = $tile.offset().top,
      thisWidth = $tile.width();

    if (thisLeft <= gridLeft) {
      $tile.addClass('left');
    }
    if (thisTop == gridTop) {
      $tile.addClass('top');
    }
    if ((thisLeft + thisWidth) - gridLeft >= gridWidth) {
      $tile.addClass('right');
    }

    if (!$iframe) {
      embedVideo({
        autoPlay: 1,
        autohide: 2,
        controls: 1,
        onReady: function() {
          hideElements();
          s.Media.open(player.getVideoUrl(),player.getDuration(),'YouTube'); //New
          s.Media.play(player.getVideoUrl(),0); //New
          $iframe = $bg.find('iframe');
          playVideo();
        },
        onStateChange: function(data) {

        }
      });
    }
    else {
      hideElements();
      playVideo();
    }

  };

  var embedVideo = function(opt) {
    player = new YT.Player(src, {
      width: '640',
      height: '390',
      videoId: src,
      playerVars: {
        autoplay: opt.autoPlay,
        autohide: opt.autohide,
        modestbranding: 1,
        controls: opt.controls,
        rel: 0,
        showinfo: 0
      },
      events: {
        'onReady': function() {
          opt.onReady();
        },
        'onStateChange': function(data) {
          opt.onStateChange(data);
        }
      }
    });
  };

  var closePopOut = function(event) {
    pauseVideo();
    $tile.removeClass('pop-out');
    $body.removeClass('pop-out');
    $screen.removeClass('pop-out');
    showElements();
  };

  var playVideo = function() {
    if (!Sony.util.isTouch()) {
      player.playVideo();
    }
  };

  var pauseVideo = function() {
    if(player) {
      player.pauseVideo();
    }
  };

  if (Sony.homeGrid.youtubeAPI) {
    init();
  }
  else {
    Sony.homeGrid.tiles_youtube_pending.push(tileCapsule);
  }

  return {
    closePopOut: closePopOut
  };
};

// TILE - handle
// tile type
// tile share
// tile image

Sony.tileHandler = function(tiles) {

  var $tiles = tiles;

  var init = function() {

    // if tiles is a collection, split it up
    if ($tiles.length > 1) {
      $tiles.each(function(i) {
        tileBuilder($tiles.eq(i));
      });
    }
    // otherwise
    else if ($tiles.length === 1) {
      tileBuilder($tiles);
    }

  };

  var tileBuilder = function(tile) {
    var tileCapsule = {
      tile: tile,
      type: tile.data('tile-type'),
      share: tile.find('.share'),
      image: tile.find('.bg-img')
    };

    // tile already exists in array
    if (tile.hasClass('loaded')) {
      return;
    }

    // handle share, if it exists
    if (tileCapsule.share.length) {
      Sony.tileBuildShare(tileCapsule.share);
    }

    // handle image sizing, if it exists
    if (tileCapsule.image.length) {
      Sony.tileBuildImage(tileCapsule.image);
    }

    // handle tile types
    switch(tileCapsule.type) {
      case 'article':
        tileCapsule.tileBuilt = new Sony.tileArticle(tileCapsule);
        break;
      case 'twitter':
        tileCapsule.tileBuilt = new Sony.tileTwitter(tileCapsule);
        break;
      case 'vine':
        tileCapsule.tileBuilt = new Sony.tileVine(tileCapsule);
        Sony.homeGrid.tiles_vine.push(tileCapsule);
        break;
      case 'youtube':
        tileCapsule.tileBuilt = new Sony.tileYoutube(tileCapsule);
        Sony.homeGrid.tiles_youtube.push(tileCapsule);
        break;
    }

    // handle animation state
    if (Sony.homeGrid.mode != 'desktop') {
      tileCapsule.tile.addClass('loaded animate');
      tileCapsule.animated = true;
    }
    else {
      tileCapsule.tile.addClass('loaded');
      tileCapsule.animated = false;
    }

    // add tile object to array
    Sony.homeGrid.tiles.push(tileCapsule);

    // all tiles loaded, trigger animation
    if (Sony.homeGrid.mode == 'desktop') {
      if (Sony.homeGrid.tiles_max == Sony.homeGrid.tiles.length) {
        Sony.tileLooper();
      }
    }
  };

  init();

};

// TILE - visibility

Sony.tileHandleVisibility = function(position) {

  var $tileObj = Sony.homeGrid.tiles[position],
    $tile = $tileObj.tile;

  // tile is a vine or other type that needs visibility
  if ($tileObj.type == 'vine') {

    var tileTop = $tile.offset().top,
      tileBottom = tileTop + $tile.outerHeight(),
      viewportTop = Sony.homeGrid.getWindow().scrollTop(),
      viewportBottom = viewportTop + Sony.homeGrid.viewportHeight;

    if (tileTop > viewportBottom || tileBottom < viewportTop) {
      $tileObj.tileBuilt.off_screen();
    }
    else {
      $tileObj.tileBuilt.on_screen();
    }

  }

};

// TILE - animation

Sony.tileHandleAnimation = function(position) {

  var $tileObj = Sony.homeGrid.tiles[position],
    $tile = $tileObj.tile;

  // tile is not yet animated
  if (!$tileObj.animated) {

    // tile is in view plus some extra, trigger animation
    // add a bit of randomness to when the tile bubbles in
    if ($tile.offset().top < Sony.homeGrid.getWindow().scrollTop() + Sony.homeGrid.viewportHeight + 100) {
      setTimeout(function() {
        $tile.addClass('animate');
        $tileObj.animated = true;
      }, Math.floor(Math.random() * (500 + 1) + 1));
    }

  }

};

// TILE - looper

Sony.tileLooper = function() {

  for (var i = 0; i < Sony.homeGrid.tiles.length; i++) {
    Sony.tileHandleAnimation(i);
    Sony.tileHandleVisibility(i);
  }

};

// TILE - load

Sony.tileChunkLoad = function(context) {

  var $window = Sony.homeGrid.getWindow(),
    $grid = Sony.homeGrid.getGrid(),
    $loadMoreBtn = Sony.homeGrid.getLoadMoreButton(),
    $panels = context.find('.panel'),
    panelPosition = 0,
    panelMax = $panels.length,
    done = false;

  var init = function() {
    Sony.homeGrid.updateViewport();
    loadTiles();
    bind();
  };

  var bind = function() {

    $window.on('resize.chunkResize', ($.throttle(100, function() {
      Sony.homeGrid.updateViewport();
      if (Sony.mode == 'desktop') {
        loadTiles();
      }
    })));

    if (!Sony.util.isTouch()) {
      $window.on('scroll.chunkScrollLoop', ($.throttle(100, function() {
        Sony.tileLooper();
      })));
      $window.on('resize.chunkResizeLoop', ($.throttle(100, function() {
        Sony.tileLooper();
      })));
    }

    Sony.homeGrid.getLoadMoreButton().on('click.chunkLoadMore', function(e) {
      e.preventDefault();

      // if mobile or tablet and not done, load tiles
      if (!done && Sony.homeGrid.mode != 'desktop') {
        $loadMoreBtn.parent().addClass('loading');
        setTimeout(loadTiles(), 1000);
      }

      // if not done and 'do_load_more', get more chunks
      if (done && Sony.do_load_more) {
        getMoreChunks();
      }

    });

  };

  var loadTiles = function() {

    if (!done) {

      $loadMoreBtn.parent().removeClass('loading');

      var loadedTiles;

      // mobile
      if (Sony.homeGrid.mode == 'mobile') {
        loadedTiles = $panels.eq(panelPosition).find('.tile').not('loaded');
        panelPosition++;
        Sony.homeGrid.tiles_max += loadedTiles.length;
        Sony.tileHandler(loadedTiles);
      }

      // tablet
      else if (Sony.homeGrid.mode == 'tablet') {
        loadedTiles = $panels.eq(panelPosition).find('.tile').not('loaded');
        panelPosition++;
        Sony.homeGrid.tiles_max += loadedTiles.length;
        Sony.tileHandler(loadedTiles);
        loadedTiles = $panels.eq(panelPosition).find('.tile').not('loaded');
        panelPosition++;
        Sony.homeGrid.tiles_max += loadedTiles.length;
        Sony.tileHandler(loadedTiles);
      }

      // desktop
      else {
        loadedTiles = $panels.find('.tile').not('loaded');
        panelPosition = $panels.length;
        Sony.homeGrid.tiles_max = loadedTiles.length;
        Sony.tileHandler(loadedTiles);
      }

      if (panelPosition >= $panels.length) {
        done = true;
        if (done && !Sony.do_load_more) {
          $loadMoreBtn.parent().hide();
        }
      }

    }

  };

  var getMoreChunks = function() {

    // unbind chunkResize, chunkScrollAnimate, chunkResizeAnimate, chunkClick
    $window.off('resize.chunkResize');
    $window.off('scroll.chunkScrollLoop');
    $window.off('resize.chunkResizeLoop');
    $loadMoreBtn.off('click.chunkLoadMore');

    $.get('/more/' + Sony.homeGrid.moreCount, function(data) {
      // wrap new tiles in a div
      var $chunk = $('<div>');
      $chunk.data('chunk', Sony.homeGrid.moreCount);
      $chunk.append(data);

      // add new tiles to grid
      $grid.append($chunk);

      Sony.homeGrid.moreCount++;
      Sony.tileChunkLoad($chunk);

      // get more chunks a maximum of 3 times
      if (Sony.homeGrid.moreCount > 2) {
        $loadMoreBtn.parent().hide();
      }
    });

  };

  init();

};

function onYouTubeIframeAPIReady() {
  Sony.homeGrid.youtubeAPI = true;
  // if there were youtube tiles onscreen before the api was ready
  // loop through the youtube tiles and build the videos
  for (var i = 0; i < Sony.homeGrid.tiles_youtube_pending.length; i++) {
    Sony.tileYoutube(Sony.homeGrid.tiles_youtube_pending[i]);
  }
}

Sony.tileChunkLoad(Sony.homeGrid.getGrid());
