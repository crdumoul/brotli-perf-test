//MooTools, <http://mootools.net>, My Object Oriented (JavaScript) Tools. Copyright (c) 2006-2008 Valerio Proietti, <http://mad4milk.net>, MIT Style License.
function $random(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
};
// /Mootools

if(_jvc0v2 = document.getElementById('jvc0v2')){
	// Set a random background
	if(_jvc0v2) _jvc0v2.className = _jvc0v2.className.replace('bg1','') + ' bg'+$random(1,5);
}
