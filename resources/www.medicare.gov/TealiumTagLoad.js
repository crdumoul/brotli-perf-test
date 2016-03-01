    var s = document.createElement('script');
	s.async = false;
	s.src = '/sharedresources/shared/javascript/tealiumHeadTag.js';
	document.getElementsByTagName('head')[0].appendChild(s)
	

	var s2 = document.createElement('script');
	s2.async = false;
	s2.src = '/sharedresources/shared/javascript/tealiumBodyTag.js';
	var body = document.body;
	body.insertBefore(s2, body.firstChild);

	