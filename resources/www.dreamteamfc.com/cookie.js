jQuery(function() {

  // If the 'hide cookie is not set we show the message
  var iscookie = readCookie('hide');



  if (iscookie != false) {
    jQuery('#like-footer').remove();
	  console.log('Cookie val = '+iscookie);
  }



  // Add the event that closes the popup and sets the cookie that tells us to
  // not show it again until one day has passed.
  jQuery('#like-footer .likeclose').click(function() {
    jQuery('#like-footer').hide();
    createCookie('hide', true, 1);
    return false;
  });

});

// ---
// And some generic cookie logic
// ---
function createCookie(name,value,days) {
  if (days) {
	  //console.log('creating a cookie for '+days+' days');
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
  } else {
	  var expires = "";
  }
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    //console.log(c);
    if (c.indexOf(nameEQ) == 0){
		console.log('cookie found');
	    return c.substring(nameEQ.length,c.length);
	}
  }
  return false;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}
