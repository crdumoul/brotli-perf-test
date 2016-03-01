/* scripts-home.js */

/* controler.js - modified */

var controler = (function() {
  var $body,
    $nav,
    ie6 = false;

  return {
    ie6: false,
    size: 's',
    windowWidth: $(window).width(),
    init: function() {
      $body = $('body');
      // $search = $('#search').find('#search-input');
      if ($('html').hasClass('ie6')) {
        controler.ie6 = true;
      }
      $(window).resize(function() {
        resizeWindow();
      });
      resizeWindow();
    }
  };

  function resizeWindow() {
    controler.windowWidth = $(window).width();

    // If width width is below 600px, switch to the mobile stylesheet
    if (ie6 == false) {
      if (controler.windowWidth < 740) {
        controler.size = 's';
        $body.addClass('s').removeClass('m').removeClass('l');
      } else if (controler.windowWidth >= 740 && controler.windowWidth < 960) {
        controler.size = 'm';
        $body.addClass('m').removeClass('s').removeClass('l');
      } else if (controler.windowWidth >= 960) {
        controler.size = 'l';
        $body.addClass('l').addClass('m').removeClass('s');
      }
    }
  }

})();

/* menu.js */

Sony.navTrayModule = function(module) {
  var $this = $(module.obj),
    $header = $this.find('.menu-toggle'),
    $menuItem;

  var init = function() {
    bind();
  };

  var bind = function() {
    $header.click(function(e) {
      e.preventDefault();
      toggle();
    });

    if (!Sony.util.isTouch()) {
      $this.hover(
        function() {
          if (Sony.menu.isHorizontal()) {
            Sony.menu.activateItem(module.index);
          }
        },
        function() {
          if (Sony.menu.isHorizontal()) {
            Sony.menu.deactivateItem(module.index);
            close();
          }
        }
      );
    }
  };

  var toggle = function() {
    if ($this.hasClass('open')) {
      close();
    } else {
      open();
    }
  };

  var open = function() {
    $this.addClass('open');
    Sony.menu.closeTrays(module.index);
  };

  var close = function() {
    $this.removeClass('open');
  };

  init();

  // make select variables and methods public
  return {
    open: open,
    close: close
  };

};

Sony.menu_func = (function() {
  var $window = $(window),
    $pageWrapperOuter = $('#page-wrapper-outer'),
    $header = $('#sony-header'),
    $menuBtn = $header.find('.btn-menu').find('a'),
    $menu = $header.find('#nav-main-list'),
    $menuItems = $menu.find('li'),
    $menuLinks = $menu.find('a'),
    $navTrayWrapper = $('#nav-trays'),
    $navTrays = $navTrayWrapper.find('.nav-tray'),
    navTrayArray = [],
    horizontalStart = 768,
    horizontal,
    $screen = $('#screen');

  var init = function() {
    checkWidth();
    createModules();
    bind();
  };

  var bind = function() {
    $menuBtn.click(function(e) {
      e.preventDefault();
      toggleSidePanel();
    });

    $screen.click(function(e) {
      if ($screen.hasClass('open')) {
        if (!isHorizontal()) {
          toggleSidePanel();
        }
      }
    });

    $window.resize(function(event) {
      checkWidth();
    });

    // close nav tray if clicked outside
    $(document).click(function(e) {
      if (!$(e.target).closest($menu).length && !$(e.target).closest($navTrayWrapper).length) {
        closeTrays();
      }
    });

    $menuLinks.each(function(i) {
      var $this = $(this),
        $parent = $this.parent(),
        target = $this.attr('href');

      if (Sony.util.isTouch()) {
        $this.click(function(e) {
          e.preventDefault();
          if ($parent.hasClass('active')) {
            closeTray(i);
          } else {
            openTray(target);
          }
        });
      } else {
        $this.click(function(e) {
          e.preventDefault();
        });

        $this.hover(
          function() {
            openTray(target);
            Sony.search.close();
          },
          function() {
            setTimeout(function() {
              if (!$parent.hasClass('open')) {
                closeTray(i);
              }
            }, 100);
          }
        );
      }
    });
  };

  var checkWidth = function() {
    if ($window.width() >= horizontalStart) {
      horizontal = true;
    } else {
      horizontal = false;
      if ($pageWrapperOuter.hasClass('open')) {
        $pageWrapperOuter.removeClass('open');
      }
    }
  };

  var isHorizontal = function() {
    return horizontal;
  };

  var openTray = function(target) {
    var id = target.replace('#', '');

    $navTrays.each(function(i) {
      if ($(this).attr('id') == id) {
        navTrayArray[i].open();
        $($menuItems[i]).addClass('active');
      }
    });
  };

  var closeTray = function(index) {
    navTrayArray[index].close();
    $($menuItems[index]).removeClass('active');
  };

  var createModules = function() {
    $navTrays.each(function(i) {
      navTrayArray[i] = new Sony.navTrayModule({
        obj: this,
        index: i
      });
    });
  };

  var toggleSidePanel = function() {
    if ($screen.hasClass('open')) {
      $pageWrapperOuter.removeClass('open');
      $screen.removeClass('open');
    } else {
      $pageWrapperOuter.addClass('open');
      $screen.addClass('open');
    }
  };

  var closeTrays = function(index) {
    $navTrays.each(function(i) {
      if (i != index) {
        navTrayArray[i].close();
        $($menuItems[i]).removeClass('active');
      }
    });
  };

  var activateItem = function(index) {
    $($menuItems[index]).addClass('open');
  };
  var deactivateItem = function(index) {
    $($menuItems[index]).removeClass('open active');
  };

  init();

  // make select variables and methods public
  return {
    closeTrays: closeTrays,
    activateItem: activateItem,
    deactivateItem: deactivateItem,
    isHorizontal: isHorizontal
  };

});

/* search.js */

Sony.search_func = (function() {
  var $header = $('#sony-header'),
    $search = $header.find('.search'),
    $searchBtn = $search.find('.btn-search').find('a'),
    $inputWrapper = $search.find('.input'),
    $input = $search.find('#nav-search-input'),
    $clearBtn = $search.find('.btn-clear');

  var init = function() {
    bind();
  };

  var bind = function() {
    $searchBtn.click(function(e) {
      e.preventDefault();
      if ($search.hasClass('open')) {
        close();
      } else {
        open();
      }
    });

    // close nav try if clicked outside
    $(document).click(function(e) {
      if (!$(e.target).closest($search).length) {
        close();
      }
    });

    $input.keyup(function(e) {
      if (!$input.data('focused')) {
        $input.data('focused', true);
        $inputWrapper.addClass('focused');
      }
      if ($input.val() != '') {
        $inputWrapper.addClass('value');
      } else {
        $inputWrapper.removeClass('value');
      }
    });

    $input.focus(function(e) {
      if (!$input.data('focused')) {
        $input.val('');
      }
    });

    $input.blur(function(e) {
      if ($input.val() == '' && $input.data('focused')) {
        $input.data('focused', false);
        $inputWrapper.removeClass('focused');
      }
    });

    $clearBtn.click(function(e) {
      e.preventDefault();
      clear();
    });
  };

  var open = function() {
    $search.addClass('open');
    $header.addClass('search-open');
    $input.focus();
  };

  var close = function() {
    $search.removeClass('open');
    $header.removeClass('search-open');
  };

  var clear = function() {
    $input.val('');
    $input.data('focused', false);
    $inputWrapper.removeClass('value focused');
    $input.focus();
  };

  init();

  // make select variables and methods public
  return {
    close: close
  };

});

var Sony = Sony || {};

$(document).ready(function() {

  controler.init();
  Sony.menu = Sony.menu_func();
  Sony.search = Sony.search_func();

  // Function to check url parameters
  $.urlParam = function(name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
      return null;
    } else {
      return results[1] || 0;
    }
  };

  /* GEOFILTER */

  // open geofilter panel when page loads
  var cookie_value = $.cookie('geofilter_country');
  var debug_value = $.urlParam('geofilter_debug');

  // Update list of options in the flag pull down if there is another country option
  var country_value = debug_value || cookie_value || 'US';

  // set element variables
  var geowindow = $(window);
  var geobody = $('body');

  var geofilter = $('#geofilter');

  var geoheader = $('#sony-header');
  var geocontent = $('#page-wrapper-outer');
  var geotray = $('#nav-trays');
  var geotrays = geotray.find('.nav-tray');

  // set geofilter offset based on element height
  var geofilteroffset = 0;

  // set var for open/closed state
  var geofilterstate = 1;

  var geonavoffset = geoheader.height();

  // current option show in mini-nav
  var $langcurrentindicator = $('.geofilter-link > a');

  // the dropdown container with options
  var $langdropdown = $('#choose-language');

  // language options within the dropdown
  var $langselectionoption = $('ul li', $langdropdown);

  // current option within the dropdown
  var $langcurrentselection = $('ul li.active', $langdropdown);

  // switch to keep track of open/close state
  var langdropdownstate = 0;

  // Hide the language filter drop down
  var languagefilterhide = function() {
    $langcurrentindicator.css('cursor', 'default');
    $langcurrentindicator.unbind('click');
    $langcurrentindicator.click(function(e) {
      e.preventDefault();
    });
    $langcurrentindicator.off('click');
  };

  if (country_value.toLowerCase() != 'us') {

    // set methods for hiding and showing the geofilter
    var geofiltershow = function() {
      geofilter_html = $.get(
          '/geofilter/' + country_value + '.json',
          function(data, textStatus, xhr) {
            geofilter.html(data.html);

            geofilteroffset = geofilter.outerHeight();

            geofilter.css({
              'height': 0
            }).animate({
              'height': geofilteroffset
            }, {
              queue: false,
              complete: function() {
                // force scroll to top
                geowindow.scrollTop(0);
                // trigger listener for scrolling
                geoscroll();
              }
            });

          }
        )
    };

    var geofilterhide = function() {
      geofilter.animate({
        'height': 0
      }, {
        queue: false,
        complete: function() {
          geofilter.css({
            'height': 0
          }).hide();
        }
      });

      geofilterstate = 0;

      geowindow.off('scroll.geofilter');
      geowindow.off('resize.geofilter');
    };

    var georesize = function() {
      if (geobody.outerWidth() < 760) {
        geofilteroffset = geofilter.outerHeight();
        geocontent.css({
          'top': geofilteroffset
        });
        geotray.css({
          'top': geofilteroffset
        });
        geotrays.css({
          'position': ''
        });
      }
    };

    // recalculate and reposition elements when the window is resized
    geowindow.on('resize.geofilter', $.throttle(100, function() {
      if (geofilterstate == 1) {
        georesize();
      }
    }));

    // hide geofilter panel if user scrolls beyond bottom edge
    var geoscroll = function() {
      geowindow.on('scroll.geofilter', $.throttle(100, function() {
        if (geowindow.scrollTop() > geofilteroffset) {
          geofilterhidesmooth();
        }
      }));
    };

    // hide geofilter panel after 15s
    // setTimeout(geofilterhide, 15000);

    // hide geofilter panel when clicking on X button
    geofilter.on('click', 'a.geo-close', function(e) {
      e.preventDefault();
      geofilterhide();
    });

    // hide geofilter panel if user clicks on US Flag / Sony.com link
    geofilter.on('click', 'a.geofilter-sonydotcomus', function(e) {
      e.preventDefault();
      geofilterhide();
    });

    // hide geofilter panel if user clicks anywhere outside the panel while it is still visible
    // if ( geofilterstate == 1 ) {
    //     content.click( function(e) {
    //         geofilterhide();
    //     });
    // }

    var languagefiltershow = function() {
      $.get(
          '/geofilter/language/' + country_value + '.json',
          function(data, textStatus, xhr) {
            $langselectionoption.eq(0).after(data.html);
            $langcurrentindicator.addClass('usable');
          }
        )
        .fail(function() {
          languagefilterhide();
        });
    };

    // methods to open and close the dropdown

    var languagedropdownopen = function() {
      $langdropdown.show();
      langdropdownstate = 1;
    };

    var languagedropdownclose = function() {
      $langdropdown.hide();
      langdropdownstate = 0;
    };

    // open/close drowndown when clicking on indicator in mini-nav
    $langcurrentindicator.click(function(e) {
      e.preventDefault();
      if (langdropdownstate == 0) {
        languagedropdownopen();
      } else if (langdropdownstate == 1) {
        languagedropdownclose();
      }
    });

    // close dropdown and do nothing when clicking on the active selection
    // other clicks will take the user to new destination
    $langselectionoption.click(function(e) {
      if ($(this).hasClass('active')) {
        e.preventDefault();
        languagedropdownclose();
      }
    });

    geofiltershow();
    languagefiltershow();
  } else {
    languagefilterhide();
  }

});

//pinterest
$(document).ready(function() {
  var a = $('.pin-it-button');
  openModal = function(b) {
    window.open(b, 'signin', 'width=665,height=300');
  };
  a.each(function() {
    var c = $(this),
      b = c.attr('href');
    c.click(function() {
      openModal(b);
      return false;
    });
  });
});

//force expiration of the geofilter cookie
function updateCookiesExpiration(name, days) {
    var nameEQ = name + "=";
    var cookieArray = document.cookie.split(';');
    var cookieValue;

    // go through all the cookies
    for(var i=0;i < cookieArray.length;i++) {
        var cookie = cookieArray[i];
        // remove the first character if it is a space
        // continue doing this until it is not a space
        while (cookie.charAt(0)==' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        // check if string begins with the name of the cookie
        if (cookie.indexOf(nameEQ) == 0) {
            // we found the cookie we are looking for
            // save its value
            cookieValue = cookie.substring(nameEQ.length, cookie.length);
            break;
        }
    }

    // if we found the cookie and its value
    if (cookieValue) {
        // create a new expiration date
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();

        // overwrite the cookie with the new date, keeping the current value
        document.cookie = name+"="+cookieValue+expires+"; path=/";
    }
}


$(document).ready(function() {
  $('.promotion-overlay .share-close').on('click', function() {
    $('.promotion-overlay').hide();
  });
});




// update the geofilter_country cookie to expire in 7 days
updateCookiesExpiration('geofilter_country', 7);