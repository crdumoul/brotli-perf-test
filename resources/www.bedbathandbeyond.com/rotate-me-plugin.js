(function ( $ ) {
 
    $.fn.rotateMe = function(options) {

    	 var parentDiv = this;
    	 var settings = $.extend({
             autoRotate: false
    	 }, options);
        return this.each(function(){
	    	parentDiv.find(".heroMenu li:first-child").addClass("selected");
	    	parentDiv.find(".heroContent .hero:first-child").addClass("active");
	    	if(settings.autoRotate){
	    		var autoRotate = setInterval(function(){autoRotateHero()}, 3000);

	    	}
	        parentDiv.find(".heroMenu li").on("click", function(){
	        	clearInterval(autoRotate);
				var thisEl = $(this);
		        var heroToShow = thisEl.attr("data-hero");
		        thisEl.siblings().removeClass("selected");
		        thisEl.addClass("selected");
		        parentDiv.find(".heroContent").children("#"+heroToShow).siblings().fadeOut(200, function(){

		        	parentDiv.find(".heroContent").children("#"+heroToShow).fadeIn(1000).addClass("active");

		        }).removeClass("active");
	        
			}); //end on click event
            parentDiv.find(".heroContent").mouseenter(function(){
               	clearInterval(autoRotate);
            });
        });// end each statement

        function autoRotateHero(){
        	   
        	   var currentHero = parentDiv.find(".heroContent .active").attr("id");
        	   var currentHeroEl = parentDiv.find(".heroContent").children("#"+currentHero);
               currentHeroEl.fadeOut(200, function(){
               		if(currentHeroEl.is(":last-child")){
               			parentDiv.find(".heroContent .hero:first-child").fadeIn(1000).addClass("active");
               		    currentHero = parentDiv.find(".heroContent .hero:first-child").attr("id");
               
               		} else{
		        	   currentHeroEl.next().fadeIn(1000).addClass("active");
		        	   currentHero = currentHeroEl.next().attr("id");
                    }
                    parentDiv.find(".heroMenu li").removeClass("selected");
                    parentDiv.find(".heroMenu li[data-hero='"+currentHero+"']").addClass("selected");
		        }).removeClass("active");
               

        }
    };
 
 
}( jQuery ));