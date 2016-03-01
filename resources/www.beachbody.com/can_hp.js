// start: cookie plugin
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
// end cookie plugin



$(document).ready(function() {

  // call the functions here - define the functions below
  instantiate_hero_rotator();

  listen_ss_slide();
 
});


function instantiate_hero_rotator() {
  var init = $('#nav_film_strip').size();
  if (init) {

    $('#nav_film_strip li a').click(function(e) {
      e.preventDefault();
      var target_id = $(this).attr("href");

      // set cookie
      $('#nav_film_strip li a').removeClass("active");
      $(this).addClass("active");
      $('.hero').hide();
      $(target_id).fadeIn();

      return false;
    });
  }
}


function listen_ss_slide() {
  $('.ss_slide_1 a').click(function(e) {
    e.preventDefault();
    var target_element = $(this).attr("rel");
    $(this).parent().parent().hide();
    $(target_element).show();

    return false;
  });
}

