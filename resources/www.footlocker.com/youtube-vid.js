(function($) { // Hide scope, no $ conflict
function YouTubeVid() {
	this.id = "";
	this._defaults = {
		id : "",
		list: "",
		height : "360",
		width : "640"
	}
	this.init = function(id) {
	    if(this._defaults.list === ''){
			var yt = ('<iframe width="'+this._defaults.width+'" height="'+this._defaults.height+'" src="http://www.youtube.com/embed/'+this._defaults.id+'?rel=0" frameborder="0" allowfullscreen></iframe>');
			if($.browser.msie) {
				yt = ('<object width="'+this._defaults.width+'" height="'+this._defaults.height+'"><param name="movie" value="http://www.youtube.com/v/'+this._defaults.id+'?version=3&amp;hl=en_US&amp;rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/'+this._defaults.id+'?version=3&amp;hl=en_US&amp;rel=0" type="application/x-shockwave-flash" width="'+this._defaults.width+'" height="'+this._defaults.height+'" allowscriptaccess="always" allowfullscreen="true"></embed></object>');
			}
		}else{
			var yt = ('<iframe src="http://www.youtube.com/embed/videoseries?list='+this._defaults.list+'&rel=0" allowfullscreen="" frameborder="0" width="'+this._defaults.width+'" height="'+this._defaults.height+'"></iframe>');
		}
		this.id.html(yt);
	}
}
$.fn.youtubevid = function(options) {
	$.youtubevid = new YouTubeVid(); // singleton instance
	$.youtubevid.id = $(this);
	for(prop in options){
		$.youtubevid._defaults[prop] = options[prop];
	}
	$.youtubevid.init();
	return $.youtubevid;
};
})(jQuery);