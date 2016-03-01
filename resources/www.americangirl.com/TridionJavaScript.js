/* Copyright (c) 2008 Kean Loong Tan http://www.gimiti.com/kltan
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * Version: 1.1 (March 26, 2008)
 * Requires: jQuery 1.2+
 */
 
(function($) {

	var dialogDisplayed = false;
	var currentPos = true;

	$.fn.createDialog = function(options) {

		// Extend our default options with those provided.
		var opts = $.extend({}, $.fn.createDialog.defaults, options);
		opts.index = findHighestZIndex('div');
		$(this).click(function(){ 
			currentPos = opts.center;
			console.log("CENTER" + opts.center);
			if (!dialogDisplayed) { //display dialog if none is there
				$("body").prepend('<div id="jDialogOverlay"></div><div id="jDialogContainer"></div>');
				overlayPos(1);
				dialogDisplayed=true;
			}
			
			if(opts.progress)
				$("#jDialogProgressBar").show();
				
			$.ajax({
				type: opts.method,
				data: opts.data,
				url: opts.addr,
				success: function(msg){
					$("#jDialogContainer").html(msg);
					if (currentPos)
						reposition();
					$("#jDialogProgressBar").fadeOut(900);
				}
			});
			//only IE6 needs this function

			$(window).resize(function(){
				if (dialogDisplayed==1) {
					overlayPos();
					if (currentPos)
						reposition();
				}
			});
			
			$(window).unload( function () {
				if (dialogDisplayed==1)
					$.closeDialog();
			});
			
			$(window).keydown(function(event){
				if (event.keyCode == 27) 
					$.closeDialog();
			});

		});
		
		//private function
		function overlayPos(init){
			var left = 0;
			var top = 0;
			var overlayWidth = $(window).width();
			var overlayHeight = $(document).height();
			var winHeight =  $(window).height();
		

			
			//other browsers
				$("#jDialogOverlay").css({
									  top: 0, 
									  left: 0, 
									  width: overlayWidth, 
									  height: winHeight, 
									  position: "fixed",
									  display: "block",
									  background: "#333",
									  opacity: .5,
									  zIndex: opts.index
								  }).show();
			
			if (init==1) {
				$("#jDialogOverlay").css("opacity", 0);
				$("#jDialogOverlay").fadeTo(200, opts.opacity);
			}
		}
		function findHighestZIndex(elem)
		{
		  var elems = document.getElementsByTagName(elem);
		  var highest = 0;
		  for (var i = 0; i < elems.length; i++)
		  {
			var zindex=document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
			if ((zindex > highest) && (zindex != 'auto'))
			{
			  highest = zindex;
			}
		  }
		  return highest;
		}
		//private function
		function reposition(){ //calculate the position
			var left = 0;
			var top = 0;
			var winWidth = $(window).width();
			var winHeight =  $(window).height();
			var dialogHeight = $("#jDialogContainer .dialogueContainer").height();
			var dialogWidth = $("#jDialogContainer .dialogueContainer").width();
		

			left = window.pageXOffset;
			top = window.pageYOffset;
		
			var topOff = top + winHeight/2 - dialogHeight/2; //offset for IE6
			var	leftOff = left + winWidth/2 - dialogWidth/2; //offset for IE6
			console.log("winWidth: " + winWidth+" winHeight:" + winHeight); 
			console.log("dialogHeight: " + dialogHeight+" dialogWidth:" + dialogWidth); 
			console.log("leftOff: " + leftOff +" topOff:" + topOff); 
			console.log("left: " + left+" top:" + top); 
			var topFixed = topOff - top;
			var	leftFixed = leftOff - left;
			

			// firefox and IE7
				$("#jDialogContainer").children().css({
														  top: topFixed, 
														  left: leftFixed, 
														  position: "fixed", 
														  zIndex: (opts.index+1)
													  }).show();
			
		}
	};
	
	$.fn.createDialog.defaults = {
		progress: true,
		center: true,
		method: 'GET',
		data: '',
		opacity: 0.85,
		bg: '#FFFFFF',
		index: 2000
	};
	
	$.closeDialog = function(){
		dialogDisplayed=false;

		//fade out and remove DOM nodes
		$("#jDialogOverlay").fadeTo(200, 0, function(){
			$("#jDialogContainer, #jDialogOverlay, #jDialogProgressBar").remove();
		});
		
	};
	 

})(jQuery);

function loadGuestBridge(url, containerid, location){
	var location = document.getElementById('location').value;
	var url = url+location+'&noclose=yes';
	document.getElementById(containerid).innerHTML = 
	'<div id="reserveframe">' +
	'<iframe src ="'+url+'" width="527" height="450" frameborder="0">'+
	'<p>Your browser does not support iframes.</p>'+
	'</iframe>'+
	'</div>';
	
}

function loadGuestBridgeLogin(url, containerid){
	document.getElementById(containerid).innerHTML = 
	'<div id="reserveframe">' +
	'<iframe src ="'+url+'" width="527" height="450" frameborder="0">'+
	'<p>Your browser does not support iframes.</p>'+
	'</iframe>'+
	'</div>';
	
}
			
			
			/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function(r,G,f,v){var J=f("html"),n=f(r),p=f(G),b=f.fancybox=function(){b.open.apply(this,arguments)},I=navigator.userAgent.match(/msie/i),B=null,s=G.createTouch!==v,t=function(a){return a&&a.hasOwnProperty&&a instanceof f},q=function(a){return a&&"string"===f.type(a)},E=function(a){return q(a)&&0<a.indexOf("%")},l=function(a,d){var e=parseInt(a,10)||0;d&&E(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},w=function(a,b){return l(a,b)+"px"};f.extend(b,{version:"2.1.5",defaults:{padding:15,margin:20,
width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!s,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},
keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+
(I?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,
openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,
isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=t(a)?f(a).get():[a]),f.each(a,function(e,c){var k={},g,h,j,m,l;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),t(c)?(k={href:c.data("fancybox-href")||c.attr("href"),title:c.data("fancybox-title")||c.attr("title"),isDom:!0,element:c},f.metadata&&f.extend(!0,k,
c.metadata())):k=c);g=d.href||k.href||(q(c)?c:null);h=d.title!==v?d.title:k.title||"";m=(j=d.content||k.content)?"html":d.type||k.type;!m&&k.isDom&&(m=c.data("fancybox-type"),m||(m=(m=c.prop("class").match(/fancybox\.(\w+)/))?m[1]:null));q(g)&&(m||(b.isImage(g)?m="image":b.isSWF(g)?m="swf":"#"===g.charAt(0)?m="inline":q(c)&&(m="html",j=c)),"ajax"===m&&(l=g.split(/\s+/,2),g=l.shift(),l=l.shift()));j||("inline"===m?g?j=f(q(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):k.isDom&&(j=c):"html"===m?j=g:!m&&(!g&&
k.isDom)&&(m="inline",j=c));f.extend(k,{href:g,type:m,content:j,title:h,selector:l});a[e]=k}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==v&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1!==b.trigger("onCancel")&&(b.hideLoading(),b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0,!0).trigger("onReset").remove(),b.coming=null,b.current||
b._afterZoomOut(a))},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),b.isActive&&(!b.isOpen||!0===a?(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut()):(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),b.transitions[b.current.closeMethod]())))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();b.current&&b.player.isActive&&(b.player.timer=
setTimeout(b.next,b.current.playSpeed))},c=function(){d();p.unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};if(!0===a||!b.player.isActive&&!1!==a){if(b.current&&(b.current.loop||b.current.index<b.group.length-1))b.player.isActive=!0,p.bind({"onCancel.player beforeClose.player":c,"onUpdate.player":e,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")}else c()},next:function(a){var d=b.current;d&&(q(a)||(a=d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=b.current;
d&&(q(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=l(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==v&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e=b.current,c=e?e.wrap:null,k;c&&(k=b._getPosition(d),a&&"scroll"===a.type?(delete k.position,c.stop(!0,!0).animate(k,200)):(c.css(k),e.pos=f.extend({},e.dim,k)))},update:function(a){var d=
a&&a.type,e=!d||"orientationchange"===d;e&&(clearTimeout(B),B=null);b.isOpen&&!B&&(B=setTimeout(function(){var c=b.current;c&&!b.isClosing&&(b.wrap.removeClass("fancybox-tmp"),(e||"load"===d||"resize"===d&&c.autoResize)&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),B=null)},e&&!s?0:300))},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,s&&(b.wrap.removeAttr("style").addClass("fancybox-tmp"),b.trigger("onUpdate")),
b.update())},hideLoading:function(){p.unbind(".loading");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");p.bind("keydown.loading",function(a){if(27===(a.which||a.keyCode))a.preventDefault(),b.cancel()});b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}))},getViewport:function(){var a=b.current&&b.current.locked||!1,d={x:n.scrollLeft(),
y:n.scrollTop()};a?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=s&&r.innerWidth?r.innerWidth:n.width(),d.h=s&&r.innerHeight?r.innerHeight:n.height());return d},unbindEvents:function(){b.wrap&&t(b.wrap)&&b.wrap.unbind(".fb");p.unbind(".fb");n.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(n.bind("orientationchange.fb"+(s?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&p.bind("keydown.fb",function(e){var c=e.which||e.keyCode,k=e.target||e.srcElement;
if(27===c&&b.coming)return!1;!e.ctrlKey&&(!e.altKey&&!e.shiftKey&&!e.metaKey&&(!k||!k.type&&!f(k).is("[contenteditable]")))&&f.each(d,function(d,k){if(1<a.group.length&&k[c]!==v)return b[d](k[c]),e.preventDefault(),!1;if(-1<f.inArray(c,k))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,k,g){for(var h=f(d.target||null),j=!1;h.length&&!j&&!h.is(".fancybox-skin")&&!h.is(".fancybox-wrap");)j=h[0]&&!(h[0].style.overflow&&"hidden"===h[0].style.overflow)&&
(h[0].clientWidth&&h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();if(0!==c&&!j&&1<b.group.length&&!a.canShrink){if(0<g||0<k)b.prev(0<g?"down":"left");else if(0>g||0>k)b.next(0>g?"up":"right");d.preventDefault()}}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;c.helpers&&f.each(c.helpers,function(d,e){if(e&&b.helpers[d]&&f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,
{},b.helpers[d].defaults,e),c)});p.trigger(a)}},isImage:function(a){return q(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(a){return q(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c;a=l(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&(d.padding=[c,c,c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,
mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=!0;if("image"===c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=
!0);"iframe"===c&&s&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(s?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,w(d.padding[a]))});b.trigger("onReady");if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");
"image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=this.width/b.opts.pixelRatio;b.coming.height=this.height/b.opts.pixelRatio;b._afterLoad()};a.onerror=function(){this.onload=
this.onerror=null;b._error("image")};a.src=b.coming.href;!0!==a.complete&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,d=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",s?"auto":a.iframe.scrolling).attr("src",a.href);
f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);s||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,
e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,k,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());b.unbindEvents();e=a.content;c=a.type;k=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,
outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):t(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case "image":e=a.tpl.image.replace("{href}",
g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}(!t(e)||!e.parent().is(a.inner))&&a.inner.append(e);b.trigger("beforeShow");a.inner.css("overflow","yes"===k?"scroll":
"no"===k?"hidden":k);b._setDimension();b.reposition();b.isOpen=!1;b.coming=null;b.bindEvents();if(b.isOpened){if(d.prevMethod)b.transitions[d.prevMethod]()}else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,k=b.skin,g=b.inner,h=b.current,c=h.width,j=h.height,m=h.minWidth,u=h.minHeight,n=h.maxWidth,p=h.maxHeight,s=h.scrolling,q=h.scrollOutside?
h.scrollbarWidth:0,x=h.margin,y=l(x[1]+x[3]),r=l(x[0]+x[2]),v,z,t,C,A,F,B,D,H;e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");x=l(k.outerWidth(!0)-k.width());v=l(k.outerHeight(!0)-k.height());z=y+x;t=r+v;C=E(c)?(a.w-z)*l(c)/100:c;A=E(j)?(a.h-t)*l(j)/100:j;if("iframe"===h.type){if(H=h.content,h.autoHeight&&1===H.data("ready"))try{H[0].contentWindow.document.location&&(g.width(C).height(9999),F=H.contents().find("body"),q&&F.css("overflow-x","hidden"),A=F.outerHeight(!0))}catch(G){}}else if(h.autoWidth||
h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(C),h.autoHeight||g.height(A),h.autoWidth&&(C=g.width()),h.autoHeight&&(A=g.height()),g.removeClass("fancybox-tmp");c=l(C);j=l(A);D=C/A;m=l(E(m)?l(m,"w")-z:m);n=l(E(n)?l(n,"w")-z:n);u=l(E(u)?l(u,"h")-t:u);p=l(E(p)?l(p,"h")-t:p);F=n;B=p;h.fitToView&&(n=Math.min(a.w-z,n),p=Math.min(a.h-t,p));z=a.w-y;r=a.h-r;h.aspectRatio?(c>n&&(c=n,j=l(c/D)),j>p&&(j=p,c=l(j*D)),c<m&&(c=m,j=l(c/D)),j<u&&(j=u,c=l(j*D))):(c=Math.max(m,Math.min(c,n)),h.autoHeight&&
"iframe"!==h.type&&(g.width(c),j=g.height()),j=Math.max(u,Math.min(j,p)));if(h.fitToView)if(g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height(),h.aspectRatio)for(;(a>z||y>r)&&(c>m&&j>u)&&!(19<d++);)j=Math.max(u,Math.min(p,j-10)),c=l(j*D),c<m&&(c=m,j=l(c/D)),c>n&&(c=n,j=l(c/D)),g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height();else c=Math.max(m,Math.min(c,c-(a-z))),j=Math.max(u,Math.min(j,j-(y-r)));q&&("auto"===s&&j<A&&c+x+q<z)&&(c+=q);g.width(c).height(j);e.width(c+x);a=e.width();
y=e.height();e=(a>z||y>r)&&c>m&&j>u;c=h.aspectRatio?c<F&&j<B&&c<C&&j<A:(c<F||j<B)&&(c<C||j<A);f.extend(h,{dim:{width:w(a),height:w(y)},origWidth:C,origHeight:A,canShrink:e,canExpand:c,wPadding:x,hPadding:v,wrapSpace:y-k.outerHeight(!0),skinSpace:k.height()-j});!H&&(h.autoHeight&&j>u&&j<p&&!c)&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",top:c[0],left:c[3]};d.autoCenter&&d.fixed&&
!a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=w(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=w(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&(b.isOpen=b.isOpened=!0,b.wrap.css("overflow","visible").addClass("fancybox-opened"),b.update(),(a.closeClick||a.nextClick&&1<b.group.length)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){!f(d.target).is("a")&&!f(d.target).parent().is("a")&&(d.preventDefault(),
b[a.closeClick?"close":"next"]())}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",function(a){a.preventDefault();b.close()}),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),!a.loop&&a.index===a.group.length-1?b.play(!1):b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play()))},_afterZoomOut:function(a){a=
a||b.current;f(".fancybox-wrap").trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,j=a.wPadding,m=b.getViewport();!e&&(a.isDom&&d.is(":visible"))&&(e=d.find("img:first"),e.length||(e=d));t(e)?(c=e.offset(),e.is("img")&&(f=e.outerWidth(),g=e.outerHeight())):
(c.top=m.y+(m.h-g)*a.topRatio,c.left=m.x+(m.w-f)*a.leftRatio);if("fixed"===b.wrap.css("position")||a.locked)c.top-=m.y,c.left-=m.x;return c={top:w(c.top-h*a.topRatio),left:w(c.left-j*a.leftRatio),width:w(f+j),height:w(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](l("width"===f?c:c-g*e)),b.inner[f](l("width"===
f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===e,k=f.extend({opacity:1},d);delete k.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(k,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&(c.opacity=0.1));b.wrap.animate(c,
{duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=w(l(e[g])-200),c[g]="+=200px"):(e[g]=w(l(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=
b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!s,fixed:!0},overlay:null,fixed:!1,el:f("html"),create:function(a){a=f.extend({},this.defaults,a);this.overlay&&this.close();this.overlay=
f('<div class="fancybox-overlay"></div>').appendTo(b.coming?b.coming.parent:a.parent);this.fixed=!1;a.fixed&&b.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(a){var d=this;a=f.extend({},this.defaults,a);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(a);this.fixed||(n.bind("resize.overlay",f.proxy(this.update,this)),this.update());a.closeClick&&this.overlay.bind("click.overlay",function(a){if(f(a.target).hasClass("fancybox-overlay"))return b.isActive?
b.close():d.close(),!1});this.overlay.css(a.css).show()},close:function(){var a,b;n.unbind("resize.overlay");this.el.hasClass("fancybox-lock")&&(f(".fancybox-margin").removeClass("fancybox-margin"),a=n.scrollTop(),b=n.scrollLeft(),this.el.removeClass("fancybox-lock"),n.scrollTop(a).scrollLeft(b));f(".fancybox-overlay").remove().hide();f.extend(this,{overlay:null,fixed:!1})},update:function(){var a="100%",b;this.overlay.width(a).height("100%");I?(b=Math.max(G.documentElement.offsetWidth,G.body.offsetWidth),
p.width()>b&&(a=p.width())):p.width()>n.width()&&(a=p.width());this.overlay.width(a).height(p.height())},onReady:function(a,b){var e=this.overlay;f(".fancybox-overlay").stop(!0,!0);e||this.create(a);a.locked&&(this.fixed&&b.fixed)&&(e||(this.margin=p.height()>n.height()?f("html").css("margin-right").replace("px",""):!1),b.locked=this.overlay.append(b.wrap),b.fixed=!1);!0===a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,b){var e,c;b.locked&&(!1!==this.margin&&(f("*").filter(function(){return"fixed"===
f(this).css("position")&&!f(this).hasClass("fancybox-overlay")&&!f(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),e=n.scrollTop(),c=n.scrollLeft(),this.el.addClass("fancybox-lock"),n.scrollTop(e).scrollLeft(c));this.open(a)},onUpdate:function(){this.fixed||this.update()},afterClose:function(a){this.overlay&&!b.coming&&this.overlay.fadeOut(a.speedOut,f.proxy(this.close,this))}};b.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(a){var d=
b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(q(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=b.inner;break;default:c=b.skin,d.appendTo("body"),I&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(l(d.css("margin-bottom")))}d["top"===a.position?"prependTo":"appendTo"](c)}}};f.fn.fancybox=function(a){var d,
e=f(this),c=this.selector||"",k=function(g){var h=f(this).blur(),j=d,k,l;!g.ctrlKey&&(!g.altKey&&!g.shiftKey&&!g.metaKey)&&!h.is(".fancybox-wrap")&&(k=a.groupAttr||"data-fancybox-group",l=h.attr(k),l||(k="rel",l=h.get(0)[k]),l&&(""!==l&&"nofollow"!==l)&&(h=c.length?f(c):e,h=h.filter("["+k+'="'+l+'"]'),j=h.index(this)),a.index=j,!1!==b.open(h,a)&&g.preventDefault())};a=a||{};d=a.index||0;!c||!1===a.live?e.unbind("click.fb-start").bind("click.fb-start",k):p.undelegate(c,"click.fb-start").delegate(c+
":not('.fancybox-item, .fancybox-nav')","click.fb-start",k);this.filter("[data-fancybox-start=1]").trigger("click");return this};p.ready(function(){var a,d;f.scrollbarWidth===v&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});if(f.support.fixedPosition===v){a=f.support;d=f('<div style="position:fixed;top:20px;"></div>').appendTo("body");var e=20===
d[0].offsetTop||15===d[0].offsetTop;d.remove();a.fixedPosition=e}f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")});a=f(r).width();J.addClass("fancybox-lock-test");d=f(r).width();J.removeClass("fancybox-lock-test");f("<style type='text/css'>.fancybox-margin{margin-right:"+(d-a)+"px;}</style>").appendTo("head")})})(window,document,jQuery);

$(document).ready(function() {
		setTimeout('$("#hairFeature").css("display","block");', 5000) //9000
		setTimeout('$("#eyesFeature").css("display","block");', 4500) //8500
		setTimeout('$("#faceFeature").css("display","block");', 3500) //7500
		setTimeout('$("#skinFeature").css("display","block");', 3000) //7000
		setTimeout('$("#bodyFeature").css("display","block");', 2000) //5000
		$(".inline").fancybox({
				'transitionIn': 'elastic',
				'transitionOut': 'elastic',
				'easingOut': 'swing',
				'easingIn': 'swing'
		});
		$(".inline").hover(function() {
				var hoverImg = HoverImgOf($(this).find('img').attr(
						"src"));
				$(this).find('img').attr("src",
						'/wcsstore/Tridion/AGStore/Images/star-icon-on778-119466.png'
				);
				$(this).next().show(); // don't put a new element between a.inline and the div after it
		}, function() {
				var normalImg = NormalImgOf($(this).find('img').attr(
						"src"));
				$(this).find('img').attr("src",
						'/wcsstore/Tridion/AGStore/Images/star-icon778-119448.png'
				);
				$(this).next().hide();
		});
});

function HoverImgOf(filename) {
		var re = new RegExp("(.+)\d*\\.(gif|png|jpg)", "g");
		return filename.replace(re, "$1.$2");
}

function NormalImgOf(filename) {
		var re = new RegExp("(.+)-on\d*\\.(gif|png|jpg)", "g");
		return filename.replace(re, "$1.$2");
}

/*!
 * Bootstrap v3.3.2 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=93b181c8a5c5c66cf9aa)
 * Config saved to config.json and https://gist.github.com/93b181c8a5c5c66cf9aa
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var s=t(this),n=s.data("bs.carousel"),r=t.extend({},i.DEFAULTS,s.data(),"object"==typeof e&&e),a="string"==typeof e?e:r.slide;n||s.data("bs.carousel",n=new i(this,r)),"number"==typeof e?n.to(e):a?n[a]():r.interval&&n.pause().cycle()})}var i=function(e,i){this.$element=t(e),this.$indicators=this.$element.find(".carousel-indicators"),this.options=i,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",t.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",t.proxy(this.pause,this)).on("mouseleave.bs.carousel",t.proxy(this.cycle,this))};i.VERSION="3.3.2",i.TRANSITION_DURATION=600,i.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},i.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},i.prototype.cycle=function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},i.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},i.prototype.getItemForDirection=function(t,e){var i=this.getItemIndex(e),s="prev"==t&&0===i||"next"==t&&i==this.$items.length-1;if(s&&!this.options.wrap)return e;var n="prev"==t?-1:1,r=(i+n)%this.$items.length;return this.$items.eq(r)},i.prototype.to=function(t){var e=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"));return t>this.$items.length-1||0>t?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):i==t?this.pause().cycle():this.slide(t>i?"next":"prev",this.$items.eq(t))},i.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},i.prototype.next=function(){return this.sliding?void 0:this.slide("next")},i.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},i.prototype.slide=function(e,s){var n=this.$element.find(".item.active"),r=s||this.getItemForDirection(e,n),a=this.interval,o="next"==e?"left":"right",l=this;if(r.hasClass("active"))return this.sliding=!1;var h=r[0],c=t.Event("slide.bs.carousel",{relatedTarget:h,direction:o});if(this.$element.trigger(c),!c.isDefaultPrevented()){if(this.sliding=!0,a&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var d=t(this.$indicators.children()[this.getItemIndex(r)]);d&&d.addClass("active")}var u=t.Event("slid.bs.carousel",{relatedTarget:h,direction:o});return t.support.transition&&this.$element.hasClass("slide")?(r.addClass(e),r[0].offsetWidth,n.addClass(o),r.addClass(o),n.one("bsTransitionEnd",function(){r.removeClass([e,o].join(" ")).addClass("active"),n.removeClass(["active",o].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger(u)},0)}).emulateTransitionEnd(i.TRANSITION_DURATION)):(n.removeClass("active"),r.addClass("active"),this.sliding=!1,this.$element.trigger(u)),a&&this.cycle(),this}};var s=t.fn.carousel;t.fn.carousel=e,t.fn.carousel.Constructor=i,t.fn.carousel.noConflict=function(){return t.fn.carousel=s,this};var n=function(i){var s,n=t(this),r=t(n.attr("data-target")||(s=n.attr("href"))&&s.replace(/.*(?=#[^\s]+$)/,""));if(r.hasClass("carousel")){var a=t.extend({},r.data(),n.data()),o=n.attr("data-slide-to");o&&(a.interval=!1),e.call(r,a),o&&r.data("bs.carousel").to(o),i.preventDefault()}};t(document).on("click.bs.carousel.data-api","[data-slide]",n).on("click.bs.carousel.data-api","[data-slide-to]",n),t(window).on("load",function(){t('[data-ride="carousel"]').each(function(){var i=t(this);e.call(i,i.data())})})}(jQuery);

/*------------------------------------ RETAIL PAGES -------------------------------------------------------*/
$(document).ready(function() {

	var targetDate = new Date();
	targetDate.setDate(targetDate.getDate() + 90);

	var dd = targetDate.getDate();
	var mm = targetDate.getMonth();

	var m_names = new Array("January", "February", "March", 
"April", "May", "June", "July", "August", "September", 
"October", "November", "December");

	var dateString = "Now accepting reservations through " + m_names[mm] + " " + dd + ". ";
	$('.nowAcceptingResThru').append(dateString);

});

function openMap(url) {
	window.open(url,"_blank", "toolbar=yes, scrollbars=no, resizable=yes, top=100, left=100, width=800, height=800");
}

$(document).ready(function() {
	$('.mattelretailstorepagelayoutview .note').text('877-247-5223');
	$('.mattelretailstorepagelayoutview .wrapper .pull-right').attr('href','tel:+18772475223');
	$('.mattelstorelandingpagelayoutview #mainHeader .headerNav span.note').text('877-247-5223');
	$('.mattelstorelandingpagelayoutview #mainHeader .icon-phone').attr('href','tel:+18772475223');
	$('.mattelretailinfopagelayoutview #mainHeader .headerNav span.note').text('877-247-5223');
	$('.mattelretailinfopagelayoutview #mainHeader .icon-phone').attr('href','tel:+18772475223');
	$('.mattelretailstorepagelayoutview .containerEndecaSearch').hide();
	$('.mattelstorelandingpagelayoutview .containerEndecaSearch').hide();
	$('.mattelretailinfopagelayoutview .containerEndecaSearch').hide();
});

$('img[src="/wcsstore/MattelStoreFrontAssetStore/img/brand_ag/global/end-page3.gif"]').hide();

/* --------------------------------------STORE HOME------------------------------------------------------------------- */
//CAROUSEL FUNCTIONALITY
$(function () {
		$('#storeHomeCarousel').carousel({
				interval:3000,
				pause: "false"
		});
		$('#storeHomeCarouselPlayBtn').click(function () {
				$('#storeHomeCarousel').carousel('cycle');
				$('#storeHomeCarouselPlayBtn').hide();
				$('#storeHomeCarouselPauseBtn').parent().show();
		});
		$('#storeHomeCarouselPauseBtn').click(function () {
				$('#storeHomeCarousel').carousel('pause');
				$('#storeHomeCarouselPlayBtn').show();
				$('#storeHomeCarouselPauseBtn').parent().hide();
		});
});

//TABBED COMPONENT FUNCTIONALITY
$('.ag-tab').click(function() {
	$('.ag-tab').removeClass('ag-selectedTab');
	$(this).addClass('ag-selectedTab');
	if($(this).attr('id') == "ag-tab1Header") {
		$('.ag-tabContent').removeClass('ag-selectedTabContent');
		$('#ag-tab1').addClass('ag-selectedTabContent');
		$('.ag-tabHeaders').removeClass('whiteBg');
	} else if ($(this).attr('id') == "ag-tab2Header") {
		$('.ag-tabContent').removeClass('ag-selectedTabContent');
		$('#ag-tab2').addClass('ag-selectedTabContent');
		$('.ag-tabHeaders').removeClass('whiteBg');
	} else if ($(this).attr('id') == "ag-tab3Header") {
		$('.ag-tabContent').removeClass('ag-selectedTabContent');
		$('#ag-tab3').addClass('ag-selectedTabContent');
		$('.ag-tabHeaders').removeClass('whiteBg');
	} else if ($(this).attr('id') == "ag-tab4Header") {
		$('.ag-tabContent').removeClass('ag-selectedTabContent');
		$('#ag-tab4').addClass('ag-selectedTabContent');
		$('.ag-tabHeaders').addClass('whiteBg');
	} else if ($(this).attr('id') == "ag-tab5Header") {
		$('.ag-tabContent').removeClass('ag-selectedTabContent');
		$('#ag-tab5').addClass('ag-selectedTabContent');
		$('.ag-tabHeaders').addClass('whiteBg');
	}
});

/* ------------------------------------------- MAGAZINE SUB PAGES -----------------------------------------------*/
$(document).ready(function() {

	//POPULATES YEAR FIELD IN FORM
	var count = 0;
	var year = 2015;
	
	try {
	  while (count < 100) {
  
		  var newOption = document.createElement("option");
		  newOption.value = year;
		  newOption.appendChild(document.createTextNode(year));
  
		  var target = document.getElementById("birthyear");
		  target.appendChild(newOption);
  
		  year = year -1;
		  count++;
	  }
	}
	catch (err) {
		console.log('Magazine Sub Page JS Error: ' + err);
	}

});

//CALCULATES AGE
function calcAge(month, day, year) {
	var todayDate = new Date();
	var todayYear = todayDate.getFullYear();
	var todayMonth = todayDate.getMonth();
	var todayDay = todayDate.getDate();
	var age = todayYear - year;
	
	if (todayMonth < month - 1) {
		age--;
	}
	if (month -1 == todayMonth && todayDay < day) {
		age--;
	}
	
	return age;
}

function validateMagSubForm() {

	//BIRTHDAY
	if (document.magSubForm.birthday.value == "" || document.magSubForm.birthmonth.value == "" || document.magSubForm.birthyear.value == "") {
		alert("Please enter a valid birthday");
		errors = true;
	} else {
		if(document.magSubForm.birthmonth.value == "january") {
			var m = 1;
		} else if (document.magSubForm.birthmonth.value == "february") {
			var m = 2;
		} else if (document.magSubForm.birthmonth.value == "march") {
			var m = 3;
		} else if (document.magSubForm.birthmonth.value == "april") {
			var m = 4;
		} else if (document.magSubForm.birthmonth.value == "may") {
			var m = 5;
		} else if (document.magSubForm.birthmonth.value == "june") {
			var m = 6;
		} else if (document.magSubForm.birthmonth.value == "july") {
			var m = 7;
		} else if (document.magSubForm.birthmonth.value == "august") {
			var m = 8;
		} else if (document.magSubForm.birthmonth.value == "september") {
			var m = 9;
		} else if (document.magSubForm.birthmonth.value == "october") {
			var m = 10;
		} else if (document.magSubForm.birthmonth.value == "november") {
			var m = 11;
		} else if (document.magSubForm.birthmonth.value == "december") {
			var m = 12;
		}
		var d = document.magSubForm.birthday.value;
		var y = document.magSubForm.birthyear.value;
		var age = calcAge(m, d, y);
		if(age < 18) {
			alert("You must be 18 years or older to subscribe. If you are over 18 and need help to order a subscription, please call 1-800-234-1278. One of our service representatives will be happy to assist you.");
			location = "/shop/";
		} else {
			document.magSubForm.submit();
		}
	}

}

function validatemagSubHelpForm() {

	//BIRTHDAY
	if (document.magSubHelpForm.birthday.value == "" || document.magSubHelpForm.birthmonth.value == "" || document.magSubHelpForm.birthyear.value == "") {
		alert("Please enter a valid birthday");
		errors = true;
	} else {
		if(document.magSubHelpForm.birthmonth.value == "january") {
			var m = 1;
		} else if (document.magSubHelpForm.birthmonth.value == "february") {
			var m = 2;
		} else if (document.magSubHelpForm.birthmonth.value == "march") {
			var m = 3;
		} else if (document.magSubHelpForm.birthmonth.value == "april") {
			var m = 4;
		} else if (document.magSubHelpForm.birthmonth.value == "may") {
			var m = 5;
		} else if (document.magSubHelpForm.birthmonth.value == "june") {
			var m = 6;
		} else if (document.magSubHelpForm.birthmonth.value == "july") {
			var m = 7;
		} else if (document.magSubHelpForm.birthmonth.value == "august") {
			var m = 8;
		} else if (document.magSubHelpForm.birthmonth.value == "september") {
			var m = 9;
		} else if (document.magSubHelpForm.birthmonth.value == "october") {
			var m = 10;
		} else if (document.magSubHelpForm.birthmonth.value == "november") {
			var m = 11;
		} else if (document.magSubHelpForm.birthmonth.value == "december") {
			var m = 12;
		}
		var d = document.magSubHelpForm.birthday.value;
		var y = document.magSubHelpForm.birthyear.value;
		var age = calcAge(m, d, y);
		if(age < 18) {
			alert("You must be 18 years or older to subscribe. If you are over 18 and need help to order a subscription, please call 1-800-234-1278. One of our service representatives will be happy to assist you.");
			location = "/shop/";
		} else {
			document.magSubHelpForm.submit();
		}
	}

}

/* --------------------------------------- DOLL FEATURES PAGE ------------------------------------- */
$(document).ready(function() {

		//TOOLTIP HOVERS
		$('#dollHairFeature').hover(
					function() {
								$('#dollHairFeatureTooltip').toggle();
					}, function() {
								$('#dollHairFeatureTooltip').toggle();
					}
		);
		$('#dollFaceFeature').hover(
					function() {
								$('#dollFaceFeatureTooltip').toggle();
					}, function() {
								$('#dollFaceFeatureTooltip').toggle();
					}
		);
		$('#dollEyeFeature').hover(
					function() {
								$('#dollEyeFeatureTooltip').toggle();
					}, function() {
								$('#dollEyeFeatureTooltip').toggle();
					}
		);
		$('#dollBodyFeature').hover(
					function() {
								$('#dollBodyFeatureTooltip').toggle();
					}, function() {
								$('#dollBodyFeatureTooltip').toggle();
					}
		);
		$('#dollSkinFeature').hover(
					function() {
								$('#dollSkinFeatureTooltip').toggle();
					}, function() {
								$('#dollSkinFeatureTooltip').toggle();
					}
		);

		//POPUPs
		$('#dollHairFeature').click(function() {
					$('#dollHairPopup').show();
		});
		$('#dollFaceFeature').click(function() {
					$('#dollFacePopup').show();
		});
		$('#dollEyeFeature').click(function() {
					$('#dollEyePopup').show();
		});
		$('#dollBodyFeature').click(function() {
					$('#dollBodyPopup').show();
		});
		$('#dollSkinFeature').click(function() {
					$('#dollSkinPopup').show();
		});
		//POPUP CLOSE BTNs
		$('.dollFeaturePopCloseBtn').click(function() {
					$(this).parent().hide();
		});

});

/* --------------------------------------- STORE HOME REDESIGN ------------------------------------- */
$('.bbi-tab').click(function() {
	var self = $(this);
	//do nothing if already currently selected tab
	if (self.hasClass('bbi-selectedTab')) {
		return false;
	}

	//toggle selected tab class
	jQuery('.bbi-selectedTab').removeClass('bbi-selectedTab');
	self.addClass('bbi-selectedTab');

	//toggle content block shown
	var selfID = self.attr('id');
	var contentID = '#' + selfID.split('_')[0];
	var content = jQuery(contentID);
	jQuery('.bbi-selectedTabContent').removeClass('bbi-selectedTabContent');
	content.addClass('bbi-selectedTabContent');
});

/* ------------------------------- AGE GATING -------------------------- */
$(document).ready(function() {

	//SHOP AGE GATE
	$('#ageGateOn a').click(function() {
		sessionStorage.setItem("agegate", "clicked");
	});
	
	if(sessionStorage.agegate) {
		$('#ageGateOn').addClass('hide');
		$('#ageGateOff').removeClass('hide');
	} else {
		$('#ageGateOn').removeClass('hide');
		$('#ageGateOff').addClass('hide');
	}
	
	//RETAIL AGE GATE
	$('#retailGateOn a').click(function() {
		sessionStorage.setItem("retailgate", "clicked");
	});
	
	if(sessionStorage.retailgate) {
		$('#retailGateOn').addClass('hide');
		$('#retailGateOff').removeClass('hide');
	} else {
		$('#retailGateOn').removeClass('hide');
		$('#retailGateOff').addClass('hide');
	}
	
	//EXPLORE AGE GATE
	$('#exploreGateOn a').click(function() {
		sessionStorage.setItem("exploregate", "clicked");
	});
	
	if(sessionStorage.exploregate) {
		$('#exploreGateOn').addClass('hide');
		$('#exploreGateOff').removeClass('hide');
	} else {
		$('#exploreGateOn').removeClass('hide');
		$('#exploreGateOff').addClass('hide');
	}
	
});

$(document).ready(function() {

	$('.ag-modal').click(function(event) {

		$('body').append('<div class="ag-modal-ajax"></div>');
		$('.ag-modal-ajax').load($(this).attr("data-url"));
		event.preventDefault();
		
	});

});
	
$(document.body).on('click', '.ag-modal-close', function() {
	$('.ag-modal-ajax').remove();
});