
JB.Class.Carousel = JB.Class.extend({
	/**
	 * Options
	 */
	options: {
		itemsVisible: 5,		// integer, number of items that are visable at a given time
		moveOneAtATime: false, 	// boolean, set to true to move one carousel item at a time (i.e. use this class as a simple slidehow), if true, make pagination = 0
		showNextPrev: true, 	// boolean, set to false to turn off next and previous buttons
		pagination: 0, 			// integer, in milliseconds, the value must be greater than 0 else read as false and won't instantiate pagination
		slideshowTiming: 0	 	// integer, in milliseconds, the value must be greater than 0 else read as false and won't instantiate slideshow
		
		/* NOTE:		 
		 * Set basic timings, 60Hz monitors refresh once every 16.6666666 milliseconds (1000 milliseconds / 60 Hz). 
		 * For simplicity, use 17 milliseconds per refresh. so for all timings use a multiple of 17 (e.g. 17 x 10 = 170 milliseconds)
		 */
	},
	/**
	 * @Constructor
	 */
	init: function(container, options){
		$.extend(this.options, options || {});
		this.container = $(container);
		this._build();
	},
	/**
	 * @Build
	 */
	_build: function(){
	
		var self = this;
		
		this.visibleStage = this.container.find('div.visibleStage ul');
		this.items = this.container.find('div.visibleStage ul li');
		this.widthOfEachItem = this.items.outerWidth(true);
		this.numOfItems = this.items.length;
		this.itemsPerStage = this.widthOfEachItem * this.options.itemsVisible;
		this.totalWidth = this.widthOfEachItem * this.numOfItems;
		
		// Set width of the ul that holds all the list items
		this.visibleStage.css('width', this.totalWidth);
		
		// Disable prev/next buttons as defaults and if items are less the number of items required to be visible
		if(this.options.showNextPrev){
		
			this.prevButton = this.container.children("div.prev");
			if(!!!(this.prevButton.length)) this.prevButton = $('<div class="prev"><span>&nbsp;</span></div>').prependTo(this.container);
			
			this.nextButton = this.container.children("div.next");
			if(!!!(this.nextButton.length)) this.nextButton = $('<div class="next"><span>&nbsp;</span></div>').appendTo(this.container);
			
			this.prevButton.addClass('prevDisabled');
			
			if(this.numOfItems <= this.options.itemsVisible){
				this.nextButton.addClass('nextDisabled');
			}
			
		}
		
		// If this.options.pagination is set to true, create pagination nav on the fly
		if(!!this.options.pagination){
		
			// Calculate how may pagination nav items are needed.
			this.paginationItemCount = (Math.ceil(this.numOfItems / this.options.itemsVisible));
			var paginNavItems = '';
			
			/* Only create pagination nav if the number of actual items in the carousel is greater than what the carousel is 
			capable of displaying on stage at one time. In other words, don't display pagination if the number items the 
			carousel is capabile of showing is 5 but there are 4 or less actual items in the carousel. */
			if(this.paginationItemCount > 1){
			
				// Generate clickable spans that represent each group of carousel items
				for(i = 0; i < this.paginationItemCount; i++){
					if(i == 0){
						paginNavItems += '<span class="first">'+ i +'</span>';
					} else {
						paginNavItems += '<span>'+ i +'</span>';
					}
				}
				
				// Create pagination nav and calculate the total width of pagination nav and assign
				this.pagination = $('<div class="carouselPagin clearfix">'+ paginNavItems +'</div>').appendTo(this.container);
				this.paginationItems = this.pagination.find('span');
				
				// Assign width to pagination nav and make the first clickable span "active"
				var totalPaginWidth = parseInt(this.paginationItems.outerWidth(true)) * parseInt(this.paginationItems.length);
				this.pagination.css('width', totalPaginWidth).find('span:first').addClass('active');
				
			}
			
		}
		
		// Assign a live "click" event to the carousel previous, next, and pagination buttons
		this.container.find('div.prev, div.next, div.carouselPagin span').bind('click slideNext', function(e){
		
			var clickedElement = $(this);
			
			//stop slideshow
			if(self.runSlideShow && e.type == 'click'){
				self._slideShowStop();
			}
			
			self.itemHolderPos = Math.abs(parseInt(self.visibleStage.css('left')));
		
			// Execute if clickable items lack a disabled class
			if(!clickedElement.hasClass('tempDisabled') && !clickedElement.hasClass('prevDisabled') && !clickedElement.hasClass('nextDisabled')){
			
				if(clickedElement.hasClass('next')){
				
					if(self.options.moveOneAtATime){
						var moveCoord = self.itemHolderPos + self.widthOfEachItem;
					} else {
						var moveCoord = self.itemHolderPos + self.itemsPerStage;
					}
				
					clickedElement.addClass('tempDisabled')
						.siblings('div.visibleStage').find('ul').stop()
						.animate({'left': ('-' + moveCoord + 'px')}, self.options.pagination, function(){
							clickedElement.removeClass('tempDisabled');
							
							if(self.options.moveOneAtATime){
								self.newitemHolderPos = self.itemHolderPos + self.widthOfEachItem;
							} else {
								self.newitemHolderPos = self.itemHolderPos + self.itemsPerStage;
							}
							
							if((self.totalWidth - (newself.itemHolderPos + 10)) <= self.itemsPerStage){
								clickedElement.addClass('nextDisabled').siblings('.prev').removeClass('prevDisabled');
							} else {
								clickedElement.siblings('.prev').removeClass('prevDisabled');
							}
							
							if(!!self.options.pagination){
							
								var whereIsTheView = Math.floor((newself.itemHolderPos / self.widthOfEachItem) / self.options.itemsVisible);
								
								clickedElement.siblings('div.carouselPagin')
									.children('span:eq('+whereIsTheView+')').addClass('active')
									.siblings().removeClass('active');
							}
							
						});
						
				} else if(clickedElement.hasClass('prev')){
				
					if(self.options.moveOneAtATime){
						var moveCoord = self.itemHolderPos - self.widthOfEachItem;
					} else {
						var moveCoord = self.itemHolderPos - self.itemsPerStage;
					}
				
					clickedElement.addClass('tempDisabled')
						.siblings('div.visibleStage').find('ul').stop()
						.animate({'left': ('-' + moveCoord + 'px')}, self.options.pagination, function(){
							clickedElement.removeClass('tempDisabled');
							
							if(self.options.moveOneAtATime){
								self.newitemHolderPos = self.itemHolderPos - self.widthOfEachItem;
							} else {
								self.newitemHolderPos = self.itemHolderPos - self.itemsPerStage;
							}
							
							if(newself.itemHolderPos <= 0){
								clickedElement.addClass('prevDisabled').siblings('.next').removeClass('nextDisabled');
							} else {
								clickedElement.siblings('.next').removeClass('nextDisabled');
							}
							
							if(!!self.options.pagination){
								var whereIsTheView = Math.floor((newself.itemHolderPos / self.widthOfEachItem) / self.options.itemsVisible);
								
								clickedElement.siblings('div.carouselPagin')
									.children('span:eq('+whereIsTheView+')').addClass('active')
									.siblings().removeClass('active');
									
								self.paginationActive = this.pagination.find('span.active')	
							}
						});
						
				} else if((!!self.options.pagination && clickedElement.parent('div').hasClass('carouselPagin') && !clickedElement.hasClass('active')) || e.type == ' slideNext'){
				
					var anchorText = parseInt(clickedElement.text()),
						coordToMoveTo = self.itemsPerStage * anchorText;
				
					clickedElement.addClass('tempDisabled').siblings().addClass('tempDisabled')
						.parent('div.carouselPagin').siblings('div.visibleStage').find('ul').stop()
						.animate({'left': ('-' + coordToMoveTo + 'px')}, 500, function(){
						
							if(coordToMoveTo == 0){
								clickedElement.parent('div.carouselPagin')
									.siblings('div.prev').addClass('prevDisabled')
									.siblings('div.next').removeClass('nextDisabled');
							} else if ((self.totalWidth - (coordToMoveTo + 10)) <= self.itemsPerStage){
								clickedElement.parent('div.carouselPagin')
									.siblings('div.next').addClass('nextDisabled')
									.siblings('div.prev').removeClass('prevDisabled');
							} else {
								clickedElement.parent('div.carouselPagin')
									.siblings('div.next').removeClass('nextDisabled')
									.siblings('div.prev').removeClass('prevDisabled');
							}
						
							clickedElement.removeClass('tempDisabled').addClass('active')
								.siblings().removeClass('active tempDisabled');
						
						});
                }


            }

            //re-initiate slideshow
            /*
            if(self.runSlideShow){
            self._slideShowStart();
            }
            */

        });

        //initiate slideshow if option is turned on and if there are more than one pagination view worth of slides
        if (!!this.options.slideshow && (this.paginationItemCount > 1)) {
            this.runSlideShow = true;
            this._slideShowStart();

            //Pagination has anchor tags and titles
            var herolinks = this.container.find(".visibleStage a");
            var herotitles = this.container.find(".visibleStage a img");
            var paganchors = this.container.find(".carouselPagin span");
            $.each(paganchors, function (i) {
                //Add links
                /*
                try {
                    $(paganchors[i]).attr("href", $(herolinks[i]).attr("href")).attr("tabindex", "0");
                } catch (err) { }

                //Add titles
                try {
                    $(paganchors[i]).attr("title", $(herotitles[i]).attr("alt"));
                } catch (err) { }
                */

                //When focusing (tabbing)
                $(herolinks[i], $(paganchors[i])).focus(function () {
                    $(paganchors[i]).click();
                });
            });
        }
	
	$(".promo-carousel").keydown(function (e) {
		if (e.keyCode == 37) {  //left press
			var currentItem = self.pagination.find('span.active').prev();
			if (currentItem.length) {
				currentItem.trigger('slideNext');
			} else {
				self.pagination.find('span:last').trigger('slideNext');
			}
		}
		if (e.keyCode == 39) { //right press
			var currentItem = self.pagination.find('span.active').next();
			if (currentItem.length) {
				currentItem.trigger('slideNext');
			} else {
				self.pagination.find('span:first').trigger('slideNext');
			}
		}

	});
		
	},
	
	_slideShowStart: function(){
	
		var self = this;
		
		// if(window.console) console.log('Carousel Slideshow Running');
		
		this.slideshow = setInterval(function(){
		
			var currentItem = self.pagination.find('span.active').next();
		
			if(currentItem.length){
				currentItem.trigger('slideNext');
			} else {
				self.pagination.find('span:first').trigger('slideNext');
			}
		
		}, this.options.slideshow);
			
	},
	
	_slideShowStop: function(){
	
		clearInterval(this.slideshow);
	
	}

});


if($("#promo-getaway-wrap").find(" div.promo-carousel").length){

	new JB.Class.Carousel("#promo-getaway-wrap div.promo-carousel",
		{
			itemsVisible: 1,
			pagination: true,
			moveOneAtATime: true,
			showNextPrev: false,
			slideshow: 9000
		}
	);

}
