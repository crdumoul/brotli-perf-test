(function($) {
    
    var lib = window.lib = {
	image : {
	    preload : function(images) {
		var tImageArr = [];
		var tImages = images.split(",");
		$(tImages).each(function(i) {
		    tImageArr[i] = new Image();
		    tImageArr[i].src = tImages[i];
 		});
 	    },
 	    isComplete : function( selector ) {
 		var complete = true;
 		$(selector).each(function() {
 		    if( !$(this).get(0).complete )
 		    { complete = false; }
 		});
 		return complete;
 	    }
	},
	input : {
	    defaultText : function(selector, settings) {
		var settings = $.extend({
        	    defaultText: "enter keyword or item"
       		}, settings);
       		
       		$(selector).each(function(){
		    $(this).focus( function() {
			if( $(this).val() == settings.defaultText )
			{ $(this).val(""); }
		    });
		    
		    $(this).blur(function() {
			$(this).val( lib.utils.strTrim($(this).val()) );
			if( $(this).val() == "" )
			{ $(this).val( settings.defaultText ); }
		    });
		    $(this).blur();
		});
	    },
	    setMaxCharacters : function(selector, settings) {
		var settings = $.extend({
      		    limit: 500,
      		    results : "#_donotplace"
     		}, settings);
     		
     		$(selector).bind("keyup.max_characters focus.max_characters blur.max_characters", function() {
     		    if( $(this).val().length > settings.limit )
     		    { $(this).val( $(this).val().substring(0, settings.limit) ); }
     		    
     		    var remainingCount = ((settings.limit - $(this).val().length) == 0) ? "0" : settings.limit - $(this).val().length;
     		    $(settings.results).html(remainingCount);
     		});
                $(selector).keyup();
     	    },
	    autoAdvance : function(selector) {
		$(selector).each(function(i) {
		    $(this).keyup(function() {
			if( $(this).val().length >= $(this).attr("maxlength") )
			{ 
			    $(this).blur();
			    $(selector).eq(i+1).focus();
			}
		    });
		});
	    }
	},
	link : {
	    popupWindow : function(selector, settings) {
		$(selector).click(function(evt) {
		    evt.preventDefault();
		    lib.link.openPopup( $(this).attr("href"), settings );
		});
	    },
	    openPopup : function( url, settings ) {
		var settings = jQuery.extend({
          	    width: 500,
          	    height: 500,
          	    toolbar: 0,
		    menubar: 0,
		    location: 0, 
		    directories: 0,
		    status: 0, 
		    scrollbars: 0,
		    resizable: 0,
		    name: "Popup_Window"
        	}, settings);
		
		var features =	"toolbar=" + settings.toolbar + "," +
		    "menubar=" + settings.menubar + "," +
		    "location=" + settings.location + "," +
		    "directories=" + settings.directories + "," +
		    "status=" + settings.status + "," +
		    "scrollbars=" + settings.scrollbars + "," +
		    "resizable=" + settings.resizable;	
		
		var newWindow = window.open( url, settings.name, 'width=' + settings.width + ',height=' + settings.height + ',"' + features + '"');
		if( newWindow != null) { newWindow.focus(); }
	    }
	},
	screen : {
	    position : function() {
		if( typeof( window.pageYOffset ) == 'number' ) {
		    //Netscape compliant
		    return [ window.pageXOffset, window.pageYOffset ];
		} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
		    //DOM compliant
		    return [ document.body.scrollLeft, document.body.scrollTop ];
		} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
		    //IE6 standards compliant mode
		    return [ document.documentElement.scrollLeft, document.documentElement.scrollTop ];
		} else {
		    return [ 0, 0 ];
		}
	    },
	    size : function() {
		return [ $(window).width(), $(window).height() ];
	    }
	},
	layer : {
	    initManager : function() {
		$(window).unbind("resize.layerManger").bind("resize.layerManager", function() {
		    $(".lib__keepcentered").each(function(){ lib.layer.center( "#" + $(this).attr("id") ); });
		}).unbind("scroll.layerManger").bind("scroll.layerManager", function() {
		    $(".lib__keepcentered").each(function(){ lib.layer.center( "#" + $(this).attr("id") ); });
		});
	    },
	    create : function(selector, settings) {
		var settings = $.extend({
		    closeSelector : "#_none",
		    url : null,
		    defaultContent : "",
		    xPos : null,
		    yPos : null,
		    keepCentered : false,
		    callback : null,
		    method : "get",
		    data : null
		}, settings);
		
		lib.layer.add( selector, settings );
		if( settings.url != null) 
		{
		    if (settings.method == "get") 
		    {
			$.get(settings.url, settings.data, function(data){
			    settings.defaultContent = data;
			    lib.layer.add(selector, settings);
			    if (settings.callback != null) {
				settings.callback();
			    }
			});
		    }
		    else 
		    {
			$.post(settings.url, settings.data, function(data){
			    settings.defaultContent = data;
			    lib.layer.add(selector, settings);
			    if (settings.callback != null) {
				settings.callback();
			    }
			});
		    }		
		}
		else
		{
		    if( settings.callback != null )
		    { settings.callback(); }	
		}
	    },
	    add : function(selector, settings) {
		lib.layer.remove(selector);
		var addHTML = '<div id="' + selector.split("#")[1] + '"></div>';
		$("body").append(addHTML);
		
		if( settings.xPos != null && settings.yPos != null )
		{ 
		    $(selector).css("left", settings.xPos+"px").css("top", settings.yPos+"px"); 
		    $(selector).append(settings.defaultContent);
		}
		else
		{
		    if( settings.keepCentered )
		    { $(selector).addClass("lib__keepcentered"); }
		    lib.layer.center(selector);	
		    $(selector).append(settings.defaultContent);
		    lib.layer.center(selector);	
		}
		
		lib.layer.ie6Fix(selector, "a");
		lib.layer.closeButton(settings.closeSelector, selector);
	    },
	    remove : function(selector) {
		if( $(selector).size() > 0 )
		{
		    $(selector).remove();
		    lib.layer.ie6Fix(selector,"r");
		}
	    },
	    center : function(selector) {
		var wPosition = lib.screen.position();
		var wSize = lib.screen.size();
		
		var left = 0;
		left = (( wSize[0] - $(selector).width() ) / 2);
		left = ( left < 0 ) ? 20 : left;
		if( $(selector).width() < wSize[0] )
		{ left += wPosition[0]; }
		
		var top = 0;
		top = (( wSize[1] - $(selector).height() ) / 2);
		top = ( top < 0 ) ? 20 : top;
		if( $(selector).height() < wSize[1] )
		{ top += wPosition[1]; } 
		
		$(selector).css("top",top+"px").css("left", left+"px");
		lib.layer.ie6Fix(selector,"u");
	    },
	    closeButton : function( selector, layerSelector ) {
		$(layerSelector + " " + selector).unbind("click.lib.layer.close").bind("click.lib.layer.close", function(evt) { evt.preventDefault(); lib.layer.remove(layerSelector); });
	    },
	    ie6Fix : function(selector,action) {
		if(lib.utils.isIE6())
		{  
		    var fixId = selector.split("#")[1] + "-iframe";
		    var exists = $("#" + fixId).size() > 0 ? true : false;
		    
		    if(action == "r" && exists)
		    { 	$("#" + fixId).remove(); }
		    
		    if( ((action == "a") || (action == "u")) && !exists)
		    {
			fixHTML = '<div id="' + fixId + '"><iframe width="100%" height="100%" frameborder="0" src="/webassets/ann/en_US/assets/images/misc/blank.gif" style="filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);"><!-- --></iframe></div>';
			$("body").append(fixHTML);
			exists = $("#" + fixId).size() > 0 ? true : false;
		    }
		    
		    if( (action == "a" || "u") && exists)
		    {
			$("#" + fixId).css("position", $(selector).css("position"));
			$("#" + fixId).css("height", $(selector).height());
			$("#" + fixId).css("width", $(selector).width());
			$("#" + fixId).css("margin-left", $(selector).css("margin-left"));
			$("#" + fixId).css("margin-right", $(selector).css("margin-right"));
			$("#" + fixId).css("margin-top", $(selector).css("margin-top"));
			$("#" + fixId).css("margin-bottom", $(selector).css("margin-bottom"));
			$("#" + fixId).css("top", $(selector).css("top"));
			$("#" + fixId).css("left", $(selector).css("left"));
			$("#" + fixId).css("bottom", $(selector).css("bottom"));
			$("#" + fixId).css("right", $(selector).css("right"));
			$("#" + fixId).css("z-index", $(selector).css("z-index")-1);
		    }
		}
	    }
	},
	utils : {
	    isIE6 : function() {
		var IE6 = /msie|MSIE 6/.test(navigator.userAgent);
		return IE6;
	    },
	    timestamp : function() {
		return new Date().getTime();
	    },
	    strTrim : function(s) {
       		return s.replace(/^\s+|\s+$/g, "");
   	    },
   	    getPosition : function( selector ) {
		var positions = [];
		$(selector).each(function(i) {
		    var offset = $(this).offset();
		    positions[positions.length] = [ offset.left, offset.top ];
		});
		return positions
	    },
	    strTruncate : function(selector, settings) {
		var settings = $.extend({
		    length : 20,
		    postfix : "..."
		}, settings);
		
		settings.length -= settings.postfix.length;
		
		$(selector).each(function() {
		    var text = $(this).text();
		    if( text.length > settings.length )
		    {
			var tIndex = settings.length-1;
			while( ( text.charAt(tIndex) != " ") && (tIndex > 0) )
			{ tIndex--; } 
			
			tIndex = ( tIndex == 0 ) ? settings.length : tIndex+1;
			$(this).text( text.substr(0,tIndex) + settings.postfix);	
		    }
		});
	    }
	},
	func : {
	    formSetup : function() { 
		/* Basicly Stylesheet Entries */
		/*
					div.formArea {}
					div.formArea div.formEntry { border: 1px solid #fff; padding: 5px; margin-bottom: 15px; }
					div.formArea div.formEntry label { display: block; margin-bottom: 5px; font-weight: bold; }
					div.formArea div.formEntry label.optional { font-weight: normal; }
					div.formArea div.formError { border: 1px solid red; background-color: #fff; }
					div.formArea div.formError .errorText { display: block; margin-bottom: 5px; }
					.formFieldHighlight { background-color: yellow; }
				*/
		
		var formSelector = ".formArea";
		var globalErrorClass = "errorText";
		var formFieldHighlightClass = "formFieldHighlight";
		var formEntryErrorClass = "formError";
		var formEntryClass = "formEntry";
		var inputs = "input, select, textarea";
		
		$(formSelector + " ." + globalErrorClass).each(function() {
		    var formEntry = $(this).parent();
		    while( !$(formEntry).is("." + formEntryClass) )
		    { formEntry = $(formEntry).parent(); }
		    $(formEntry).addClass( formEntryErrorClass );
		});
		$(inputs, $(formSelector)).bind("focus.fields", function(evt) {
		    if( (!$(evt.target).is("input[type=image]")) && (!$(evt.target).is("input[type=radio]")) && (!$(evt.target).is("input[type=checkbox]")) )
		    { $(evt.target).addClass( formFieldHighlightClass ); }
		});
		$(inputs, $(formSelector)).bind("blur.fields", function(evt) {
		    $(evt.target).removeClass( formFieldHighlightClass );
		});
		$("select", $(formSelector)).mousedown(function(evt) {
		    $(evt.target).addClass( formFieldHighlightClass );
		});
	    }
	},
	obj : {
	    contentCollection : function(settings) {
		if(arguments.length > 0)
		{ this.init(settings); }
	    },
	    itemSlider : function(settings) {
		if(arguments.length > 0)
		{ this.init(settings); }	
	    },
	    button : function(settings) {
		if(arguments.length > 0)
		{ this.init(settings); }
	    },
	    pageOverlay : function(settings) {
		if(arguments.length > 0)
		{ this.init(settings); }
	    }
	},
	about : function() {
	    
	}
    };
    
    /* button Code */
    lib.obj.button.prototype.init = function(settings) {
	var settings = jQuery.extend({
            off: "but-off.gif",
            on: "but-on.gif",
            hover: "but-hover.gif",
            hasClick: false,
            hasHover: true,
            activeId: "but-active",
            cssButton: false,
            cssOff: "glo-but-css-off",
            cssOn: "glo-but-css-on",
            cssHover: "glo-but-css-hover",
            buttonSelector: ".but-class",
            buttonCollectionSelector : ".but-class"
        }	, settings);
	
	this.buttonSelector = settings.buttonSelector;
	this.buttonCollectionSelector = settings.buttonCollectionSelector;
	this.activeId = settings.activeId;
	this.hasClick = settings.hasClick;
	this.hasHover = settings.hasHover;
	
	if( settings.cssButton )
	{ 
	    this.type = "CSSBUTTON";
	    this.cssOff = settings.cssOff;
	    this.cssOn = settings.cssOn;
	    this.cssHover = settings.cssHover;
	    var pObj = this;
	    
	    $(this.buttonSelector).each(function() {
	  	// make sure the right styles are on the button by default.
	  	if( $(this).attr("id") != pObj.activeId )
		{ $(this).addClass(pObj.cssOff);} 
		else
		{ 
		    $(this).removeClass(pObj.cssOff);
		    $(this).addClass(pObj.cssOn); 
		}
		//setup the hover
		if( pObj.hasHover )
		{
		    $(this).unbind("mouseover.button").bind("mouseover.button", function() {
			if( $(this).attr("id") != pObj.activeId )
			{ 
			    $(this).removeClass(pObj.cssOff); 
			    $(this).addClass(pObj.cssHover); 
			}
		    });
		    $(this).unbind("mouseout.button").bind("mouseout.button", function() { 
			if( $(this).attr("id") != pObj.activeId )
			{ 
			    $(this).removeClass(pObj.cssHover);
			    $(this).addClass(pObj.cssOff);
			}
		    });
		}
		//setup the click
		if( pObj.hasClick )
		{
		    $(this).unbind("click.button").bind("click.button", function() { 
			if( $(this).attr("id") != pObj.activeId )
			{	
			    $(pObj.buttonCollectionSelector).attr("id","");
			    $(pObj.buttonCollectionSelector).removeClass(pObj.cssHover);
			    $(pObj.buttonCollectionSelector).removeClass(pObj.cssOn);
			    $(pObj.buttonCollectionSelector).trigger("mouseout.button");
			    $(this).removeClass(pObj.cssOff);
			    $(this).addClass(pObj.cssOn);
			    $(this).attr("id",pObj.activeId);
			}
		    });
		}
	    });
	}
	else
	{ 
	    this.type = "IMAGEBUTTON"; 
	    this.off = settings.off;
	    this.on = settings.on;
	    this.hover = settings.hover;
	    var pObj = this;
	    $(this.buttonSelector).each(function() {
	  	// always have the mouseout
	  	$(this).unbind("mouseout.button").bind("mouseout.button", function() { 
		    if( $(this).attr("id") != pObj.activeId )
		    { $(this).attr("src",pObj.off); }
		});
	  	//setup the hover
		if( pObj.hasHover )
		{
		    $(this).unbind("mouseover.button").bind("mouseover.button", function() {
			if( $(this).attr("id") != pObj.activeId )
			{ $(this).attr("src",pObj.hover); }
		    });
		}
		//setup the click
		if( pObj.hasClick )
		{
		    $(this).unbind("click.button").bind("click.button", function() { 
			if( $(this).attr("id") != pObj.activeId )
			{
			    $(pObj.buttonCollectionSelector).attr("id","");
			    $(pObj.buttonCollectionSelector).trigger("mouseout.button");
			    $(this).attr("src",pObj.on);
			    $(this).attr("id",pObj.activeId);
			}
		    });
		}
	    });
	    
	    lib.image.preload(pObj.off);
	    if( pObj.hasClick )
	    {lib.image.preload(pObj.on); }
	    if (pObj.hasHover )
	    { lib.image.preload(pObj.hover); }
	}
    };
    /* ------------- */

    /* itemSlider Object Code */
    lib.obj.itemSlider.prototype.init = function(settings) {
	var settings = $.extend({
	    viewport: "#widget-slider-viewport",
	    content: "#widget-slider-content",
	    next: "#widget-slider-next",
	    prev: "#widget-slider-prev",
	    first: "#widget-slider-first",
	    last: "#widget-slider-last",
	    item: "div",
	    direction: "vertical",
	    showAmount: 3,
	    scrollAmount : 1,
	    circular : false,
	    interval : 350,
	    easing : "linear",
	    preMoveCallback : null,
	    postMoveCallback : null
	}, settings);
	
	this.viewport = settings.viewport;
	this.content = settings.content;
	this.next = settings.next;
	this.prev = settings.prev;
	this.first = settings.first;
	this.last = settings.last;
	this.item = settings.item;
	this.circular = settings.circular;
	this.interval = settings.interval;
	this.easing = settings.easing;
	this.direction = settings.direction;
	this.showAmount = settings.showAmount;
	this.sliderInfo = new Object();
	this.sliderInfo.index = 0;
	this.scrollAmount = settings.scrollAmount;
	this.sliderInfo.end = $(this.item).size() - this.showAmount;
	this.preMoveCallback = settings.preMoveCallback;
	this.postMoveCallback = settings.postMoveCallback;
	
	/* Check Overflows (initial) */
	$(this.item + " *").add( $(this.item) ).each(function() {
	    if( $(this).css("overflow") == "auto" )
	    { $(this).addClass("is__overflow"); }	
	});
	/* ----------------- */		
	
	if ( $(this.viewport).size() > 0 )
	{
	    this.overflowBeforeMove();
	    this.overflowAfterMove();
	    
	    $(this.next).hide();
	    $(this.prev).hide();
	    if(this.circular && ($(this.item).size() > this.showAmount))
	    {
		$(this.next).show();
		$(this.prev).show();
	    }
	    else if( !this.circular && ($(this.item).size() > this.showAmount))
	    { $(this.next).show(); }
	    
	    if( this.direction == "vertical" )
	    { this.sliderInfo.itemSize = $(this.item).eq(0).height(); }
	    else
	    { 
		this.sliderInfo.itemSize = $(this.item).eq(0).width();
		$(this.content).css("width", (this.sliderInfo.itemSize * $(this.item).size()) + "px");
	    }
	    this.removeEvents();
	    
	    $(this.next + "," + this.prev + "," + this.first + "," + this.last).click(function(evt){ evt.preventDefault(); });
	    this.createEvents();
	}
    };
    
    lib.obj.itemSlider.prototype.overflowBeforeMove = function() {
	$(this.content + " .is__overflow").css("overflow", "hidden");
    };
    
    lib.obj.itemSlider.prototype.overflowAfterMove = function() {
	$(this.item).slice(this.sliderInfo.index, this.sliderInfo.index + this.showAmount).each(function() {
	    if( $(this).hasClass("is__overflow") )
	    { $(this).css("overflow", "auto"); }
	    $(".is__overflow", this).css("overflow", "auto");
	});
    };
    
    lib.obj.itemSlider.prototype.createEvents = function() {
	var currObj = this;
	$(this.prev).bind("click.itemSlider", function(evt) {
	    currObj.backward();
	});
	$(this.next).bind("click.itemSlider", function(evt) {
  	    currObj.forward();
	});
	$(this.first).bind("click.itemSlider", function(evt){
	    currObj.toFirst();
	});
	$(this.last).bind("click.itemSlider", function(evt){
	    currObj.toLast();
	});
    };
    
    lib.obj.itemSlider.prototype.removeEvents = function() {
	$(this.prev).unbind("click.itemSlider");
	$(this.next).unbind("click.itemSlider");
	$(this.last).unbind("click.itemSlider");
	$(this.first).unbind("click.itemSlider");
    };
    
    lib.obj.itemSlider.prototype.move = function() {
	this.removeEvents();
	this.overflowBeforeMove();
	
	/* Make index is in range */
	if(this.circular)
	{
	    if( this.sliderInfo.index > this.sliderInfo.end )
	    { this.sliderInfo.index = 0; }
	    else if( this.sliderInfo.index < 0 )
	    { this.sliderInfo.index = this.sliderInfo.end }
	}
	else
	{
	    if( this.sliderInfo.index > this.sliderInfo.end )
	    { this.sliderInfo.index = this.sliderInfo.end; }
	    else if( this.sliderInfo.index < 0 )
	    { this.sliderInfo.index = 0 }
	}
	/* --------------- */
	
	/* show/hide buttons */
	if( !this.circular )
	{
	    if( this.sliderInfo.index == this.sliderInfo.end )
	    { $(this.next).hide(); }
	    else if(this.sliderInfo.end > 0 )
	    { $(this.next).show(); }
	    
	    if( this.sliderInfo.index == 0 )
	    { $(this.prev).hide(); }
	    else
	    { $(this.prev).show(); }
	}
	/* ----------------------- */
	
	if($.isFunction(this.preMoveCallback))
	{ this.preMoveCallback(); }
	
	/* Move the item */
	var currObj = this;
	var newPos = this.sliderInfo.index * this.sliderInfo.itemSize;
	if (this.direction == "vertical") 
	{ var params = { scrollTop : newPos }; }
	else
	{ var params = { scrollLeft : newPos }; }
	
	$(this.viewport).animate( 
	    params,
	    { 
		duration : this.interval,
		easing : this.easing,
		complete : function() {
		    currObj.overflowAfterMove();
		    currObj.createEvents();
		    if($.isFunction(currObj.postMoveCallback))
		    { currObj.postMoveCallback(); }
		}
	    }
	);
	/* ---------------------- */
    };
    
    lib.obj.itemSlider.prototype.forward = function() {
	this.sliderInfo.index += this.scrollAmount;
	this.move();
    };
    
    lib.obj.itemSlider.prototype.backward = function() {
	this.sliderInfo.index -= this.scrollAmount;
	this.move();
    };
    
    lib.obj.itemSlider.prototype.toFirst = function() {
	this.sliderInfo.index = 0;
	this.move();
    };
    
    lib.obj.itemSlider.prototype.toLast = function() {
	this.sliderInfo.index = this.sliderInfo.end;
	this.move();
    };
    /* ----------------------- */
    
    /* contentCollection */
    lib.obj.contentCollection.prototype.init = function(settings) {
	var settings = jQuery.extend({
            selectorContent : ".lib_cC_Content",
            selectorActivator : ".lib_cC_Activator",
            defaultIndex : 0
        }, settings);
  	
  	this.selectorContent = settings.selectorContent;
  	this.defaultIndex = settings.defaultIndex;
  	this.eventName = "click.contentCollection_" + lib.utils.timestamp();
  	this.selectorActivators = settings.selectorActivator.split(",");
  	
  	//Initialize the collection correctly.
  	this.activateContent(this.defaultIndex);
  	
  	//setup the events
  	var this_contentCollection = this;
  	for( var x = 0; x < this.selectorActivators.length; x++)
  	{
  	    $(this.selectorActivators[x]).each(function(i) {
  		$(this).unbind(this_contentCollection.eventName).bind(this_contentCollection.eventName, function(evt) {
  		    evt.preventDefault();
  		    this_contentCollection.activateContent(i);
  		});
  	    });
  	}
    };
    lib.obj.contentCollection.prototype.activateContent = function(index) {
	$(this.selectorContent).hide();
  	$(this.selectorContent).eq(index).show();
    };
    /* ------------------ */
    
    /* pageOverlay */
    lib.obj.pageOverlay.prototype.init = function(settings){
	var settings = jQuery.extend({
	    selector : "#widget-pageOverlay"
	}, settings);
	
	var myOverlay = this;
	this.selector = settings.selector;
	this.currentInfo = {};
	this.addOverlay();
    };	
    
    lib.obj.pageOverlay.prototype.resize = function(){
	if( ($(window).width() != this.currentInfo.wWidth) || ($(window).height() != this.currentInfo.wHeight) || ($(document).width() != this.currentInfo.dWidth) || ($(document).height() != this.currentInfo.dHeight) )
	{
	    this.currentInfo.wWidth = $(window).width();
	    this.currentInfo.wHeight = $(window).height();
	    this.currentInfo.dWidth = $(document).width();
	    this.currentInfo.dHeight = $(document).height();
	    
	    $(this.selector).height( $(window).height() );
	    $(this.selector).width( $(window).width() );
	    
	    var height = Math.max( $(document).height(), $(window).height() );
	    var width = Math.max(  $(document).width(), $(window).width() );
	    $(this.selector).height(height);
	    $(this.selector).width(width);
	    
	    lib.layer.ie6Fix(this.selector,'u');
	}
    };
    
    lib.obj.pageOverlay.prototype.addOverlay = function(){
	this.currentInfo = { wWidth : 0, wHeight : 0, dWidth : 0, dHeight : 0 };
	lib.layer.create( this.selector, { xPos : 0, yPos : 0 });
	$(this.selector).css("position", "absolute");
	this.resize();
	var myOverlay = this;
	this.interval = setInterval(function(){ myOverlay.resize(); }, 250);
    };
    
    lib.obj.pageOverlay.prototype.removeOverlay = function(){
	lib.layer.remove(this.selector);
	clearInterval(this.interval);
    };
    /* ------------------ */
    
    $(function() {
	/* Form Initialization */
	lib.func.formSetup();
	
	/* Layer Manager */
	lib.layer.initManager();
    });	
    
})($);