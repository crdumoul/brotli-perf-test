
var grabBlogImages  = {
	ajaxBlog: function(){
		var ajaxBlogData = $.ajax({
			url: '/blog-api/',
			type: 'get',
			dataType: 'json',
			async: false
		});
		ajaxBlogData.done(function(data){
			var html = '',
				p = data.posts;
			//console.log(p);
			for(i=0; i < 10; i++){
				html += '<div class="blog_item">'
                    + '<a href="'
                    + p[i].url
                    +'" title="'
                    + p[i].title
                    + '" target="_blank">'
                    + '<span><img src="'
					+ p[i].photo.thumb
                    +'" width="60" onerror="defaultImg(this)" /></span><span class="blog_text">'
                    + p[i].title
                    +'</span></a></div>';
				//console.log(p[i].photo.thumb);
			}
			$('.blog_feed_content').append(html);
			$('.blog_item:nth-child(n+1):nth-child(-n+3)').addClass('first');
            $('.blog_item:nth-child(n+4):nth-child(-n+6)').addClass('second');
            $('.blog_item:nth-child(n+7):nth-child(-n+9)').addClass('third');
            $('.first').wrapAll('<div class="fade_one"></div>');
            $('.second').wrapAll('<div class="fade_two"></div>');
            $('.third').wrapAll('<div class="fade_three"></div>');
            runslide();
			
            function runslide() {
                $('.fade_one').fadeIn(1000).delay(6000).fadeOut(1500, function() {
                    $('.fade_two').fadeIn(1000).delay(6000).fadeOut(1500, function() {
                       $('.fade_three').fadeIn(1000).delay(6000).fadeOut(1500, function() {
                        runslide();
                       });
                   });
                });
            }
		});
		ajaxBlogData.fail(function(e){
			$('.home_blog_feed').empty().append('<div class="replacement_image"><a href="http://unlocked.footlocker.com/" title="Foot Locker Unlocked"><img src="http://www.footlocker.com/ns/hp/images/unlocked.jpg" alt"Visit Foot Locker Unlocked" width="300" /></a></div>')
		});	
	}
}

$(document).ready(function(e) {
    grabBlogImages.ajaxBlog();
});
