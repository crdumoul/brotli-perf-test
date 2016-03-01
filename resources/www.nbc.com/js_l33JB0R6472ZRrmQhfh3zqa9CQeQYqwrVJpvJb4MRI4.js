window.console=window.console||{log:function(){}};;
/*!
	jQuery Colorbox v1.4.14 - 2013-04-16
	(c) 2013 Jack Moore - jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(t,e,i){function o(i,o,n){var r=e.createElement(i);return o&&(r.id=te+o),n&&(r.style.cssText=n),t(r)}function n(){return i.innerHeight?i.innerHeight:t(i).height()}function r(t){var e=H.length,i=(j+t)%e;return 0>i?e+i:i}function h(t,e){return Math.round((/%/.test(t)?("x"===e?E.width():n())/100:1)*parseInt(t,10))}function l(t,e){return t.photo||t.photoRegex.test(e)}function s(t,e){return t.retinaUrl&&i.devicePixelRatio>1?e.replace(t.photoRegex,t.retinaSuffix):e}function a(t){"contains"in x[0]&&!x[0].contains(t.target)&&(t.stopPropagation(),x.focus())}function d(){var e,i=t.data(A,Z);null==i?(_=t.extend({},Y),console&&console.log&&console.log("Error: cboxElement missing settings object")):_=t.extend({},i);for(e in _)t.isFunction(_[e])&&"on"!==e.slice(0,2)&&(_[e]=_[e].call(A));_.rel=_.rel||A.rel||t(A).data("rel")||"nofollow",_.href=_.href||t(A).attr("href"),_.title=_.title||A.title,"string"==typeof _.href&&(_.href=t.trim(_.href))}function c(i,o){t(e).trigger(i),se.trigger(i),t.isFunction(o)&&o.call(A)}function u(){var t,e,i,o,n,r=te+"Slideshow_",h="click."+te;_.slideshow&&H[1]?(e=function(){clearTimeout(t)},i=function(){(_.loop||H[j+1])&&(t=setTimeout(J.next,_.slideshowSpeed))},o=function(){M.html(_.slideshowStop).unbind(h).one(h,n),se.bind(ne,i).bind(oe,e).bind(re,n),x.removeClass(r+"off").addClass(r+"on")},n=function(){e(),se.unbind(ne,i).unbind(oe,e).unbind(re,n),M.html(_.slideshowStart).unbind(h).one(h,function(){J.next(),o()}),x.removeClass(r+"on").addClass(r+"off")},_.slideshowAuto?o():n()):x.removeClass(r+"off "+r+"on")}function f(i){G||(A=i,d(),H=t(A),j=0,"nofollow"!==_.rel&&(H=t("."+ee).filter(function(){var e,i=t.data(this,Z);return i&&(e=t(this).data("rel")||i.rel||this.rel),e===_.rel}),j=H.index(A),-1===j&&(H=H.add(A),j=H.length-1)),g.css({opacity:parseFloat(_.opacity),cursor:_.overlayClose?"pointer":"auto",visibility:"visible"}).show(),V&&x.add(g).removeClass(V),_.className&&x.add(g).addClass(_.className),V=_.className,K.html(_.close).show(),$||($=q=!0,x.css({visibility:"hidden",display:"block"}),W=o(ae,"LoadedContent","width:0; height:0; overflow:hidden").appendTo(v),D=b.height()+k.height()+v.outerHeight(!0)-v.height(),B=C.width()+T.width()+v.outerWidth(!0)-v.width(),N=W.outerHeight(!0),z=W.outerWidth(!0),_.w=h(_.initialWidth,"x"),_.h=h(_.initialHeight,"y"),J.position(),u(),c(ie,_.onOpen),O.add(F).hide(),x.focus(),e.addEventListener&&(e.addEventListener("focus",a,!0),se.one(he,function(){e.removeEventListener("focus",a,!0)})),_.returnFocus&&se.one(he,function(){t(A).focus()})),w())}function p(){!x&&e.body&&(X=!1,E=t(i),x=o(ae).attr({id:Z,"class":t.support.opacity===!1?te+"IE":"",role:"dialog",tabindex:"-1"}).hide(),g=o(ae,"Overlay").hide(),S=o(ae,"LoadingOverlay").add(o(ae,"LoadingGraphic")),y=o(ae,"Wrapper"),v=o(ae,"Content").append(F=o(ae,"Title"),I=o(ae,"Current"),P=t('<button type="button"/>').attr({id:te+"Previous"}),R=t('<button type="button"/>').attr({id:te+"Next"}),M=o("button","Slideshow"),S,K=t('<button type="button"/>').attr({id:te+"Close"})),y.append(o(ae).append(o(ae,"TopLeft"),b=o(ae,"TopCenter"),o(ae,"TopRight")),o(ae,!1,"clear:left").append(C=o(ae,"MiddleLeft"),v,T=o(ae,"MiddleRight")),o(ae,!1,"clear:left").append(o(ae,"BottomLeft"),k=o(ae,"BottomCenter"),o(ae,"BottomRight"))).find("div div").css({"float":"left"}),L=o(ae,!1,"position:absolute; width:9999px; visibility:hidden; display:none"),O=R.add(P).add(I).add(M),t(e.body).append(g,x.append(y,L)))}function m(){function i(t){t.which>1||t.shiftKey||t.altKey||t.metaKey||t.control||(t.preventDefault(),f(this))}return x?(X||(X=!0,R.click(function(){J.next()}),P.click(function(){J.prev()}),K.click(function(){J.close()}),g.click(function(){_.overlayClose&&J.close()}),t(e).bind("keydown."+te,function(t){var e=t.keyCode;$&&_.escKey&&27===e&&(t.preventDefault(),J.close()),$&&_.arrowKey&&H[1]&&!t.altKey&&(37===e?(t.preventDefault(),P.click()):39===e&&(t.preventDefault(),R.click()))}),t.isFunction(t.fn.on)?t(e).on("click."+te,"."+ee,i):t("."+ee).live("click."+te,i)),!0):!1}function w(){var e,n,r,a=J.prep,u=++de;q=!0,U=!1,A=H[j],d(),c(le),c(oe,_.onLoad),_.h=_.height?h(_.height,"y")-N-D:_.innerHeight&&h(_.innerHeight,"y"),_.w=_.width?h(_.width,"x")-z-B:_.innerWidth&&h(_.innerWidth,"x"),_.mw=_.w,_.mh=_.h,_.maxWidth&&(_.mw=h(_.maxWidth,"x")-z-B,_.mw=_.w&&_.w<_.mw?_.w:_.mw),_.maxHeight&&(_.mh=h(_.maxHeight,"y")-N-D,_.mh=_.h&&_.h<_.mh?_.h:_.mh),e=_.href,Q=setTimeout(function(){S.show()},100),_.inline?(r=o(ae).hide().insertBefore(t(e)[0]),se.one(le,function(){r.replaceWith(W.children())}),a(t(e))):_.iframe?a(" "):_.html?a(_.html):l(_,e)?(e=s(_,e),t(U=new Image).addClass(te+"Photo").bind("error",function(){_.title=!1,a(o(ae,"Error").html(_.imgError))}).one("load",function(){var e;u===de&&(U.alt=t(A).attr("alt")||t(A).attr("data-alt")||"",_.retinaImage&&i.devicePixelRatio>1&&(U.height=U.height/i.devicePixelRatio,U.width=U.width/i.devicePixelRatio),_.scalePhotos&&(n=function(){U.height-=U.height*e,U.width-=U.width*e},_.mw&&U.width>_.mw&&(e=(U.width-_.mw)/U.width,n()),_.mh&&U.height>_.mh&&(e=(U.height-_.mh)/U.height,n())),_.h&&(U.style.marginTop=Math.max(_.mh-U.height,0)/2+"px"),H[1]&&(_.loop||H[j+1])&&(U.style.cursor="pointer",U.onclick=function(){J.next()}),U.style.width=U.width+"px",U.style.height=U.height+"px",setTimeout(function(){a(U)},1))}),setTimeout(function(){U.src=e},1)):e&&L.load(e,_.data,function(e,i){u===de&&a("error"===i?o(ae,"Error").html(_.xhrError):t(this).contents())})}var g,x,y,v,b,C,T,k,H,E,W,L,S,F,I,M,R,P,K,O,_,D,B,N,z,A,j,U,$,q,G,Q,J,V,X,Y={transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:!1,returnFocus:!0,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0},Z="colorbox",te="cbox",ee=te+"Element",ie=te+"_open",oe=te+"_load",ne=te+"_complete",re=te+"_cleanup",he=te+"_closed",le=te+"_purge",se=t("<a/>"),ae="div",de=0;t.colorbox||(t(p),J=t.fn[Z]=t[Z]=function(e,i){var o=this;if(e=e||{},p(),m()){if(t.isFunction(o))o=t("<a/>"),e.open=!0;else if(!o[0])return o;i&&(e.onComplete=i),o.each(function(){t.data(this,Z,t.extend({},t.data(this,Z)||Y,e))}).addClass(ee),(t.isFunction(e.open)&&e.open.call(o)||e.open)&&f(o[0])}return o},J.position=function(t,e){function i(t){b[0].style.width=k[0].style.width=v[0].style.width=parseInt(t.style.width,10)-B+"px",v[0].style.height=C[0].style.height=T[0].style.height=parseInt(t.style.height,10)-D+"px"}var o,r,l,s=0,a=0,d=x.offset();E.unbind("resize."+te),x.css({top:-9e4,left:-9e4}),r=E.scrollTop(),l=E.scrollLeft(),_.fixed?(d.top-=r,d.left-=l,x.css({position:"fixed"})):(s=r,a=l,x.css({position:"absolute"})),a+=_.right!==!1?Math.max(E.width()-_.w-z-B-h(_.right,"x"),0):_.left!==!1?h(_.left,"x"):Math.round(Math.max(E.width()-_.w-z-B,0)/2),s+=_.bottom!==!1?Math.max(n()-_.h-N-D-h(_.bottom,"y"),0):_.top!==!1?h(_.top,"y"):Math.round(Math.max(n()-_.h-N-D,0)/2),x.css({top:d.top,left:d.left,visibility:"visible"}),t=x.width()===_.w+z&&x.height()===_.h+N?0:t||0,y[0].style.width=y[0].style.height="9999px",o={width:_.w+z+B,height:_.h+N+D,top:s,left:a},0===t&&x.css(o),x.dequeue().animate(o,{duration:t,complete:function(){i(this),q=!1,y[0].style.width=_.w+z+B+"px",y[0].style.height=_.h+N+D+"px",_.reposition&&setTimeout(function(){E.bind("resize."+te,J.position)},1),e&&e()},step:function(){i(this)}})},J.resize=function(t){$&&(t=t||{},t.width&&(_.w=h(t.width,"x")-z-B),t.innerWidth&&(_.w=h(t.innerWidth,"x")),W.css({width:_.w}),t.height&&(_.h=h(t.height,"y")-N-D),t.innerHeight&&(_.h=h(t.innerHeight,"y")),t.innerHeight||t.height||(W.css({height:"auto"}),_.h=W.height()),W.css({height:_.h}),J.position("none"===_.transition?0:_.speed))},J.prep=function(e){function i(){return _.w=_.w||W.width(),_.w=_.mw&&_.mw<_.w?_.mw:_.w,_.w}function n(){return _.h=_.h||W.height(),_.h=_.mh&&_.mh<_.h?_.mh:_.h,_.h}if($){var h,a="none"===_.transition?0:_.speed;W.empty().remove(),W=o(ae,"LoadedContent").append(e),W.hide().appendTo(L.show()).css({width:i(),overflow:_.scrolling?"auto":"hidden"}).css({height:n()}).prependTo(v),L.hide(),t(U).css({"float":"none"}),h=function(){function e(){t.support.opacity===!1&&x[0].style.removeAttribute("filter")}var i,n,h=H.length,d="frameBorder",u="allowTransparency";$&&(n=function(){clearTimeout(Q),S.hide(),c(ne,_.onComplete)},F.html(_.title).add(W).show(),h>1?("string"==typeof _.current&&I.html(_.current.replace("{current}",j+1).replace("{total}",h)).show(),R[_.loop||h-1>j?"show":"hide"]().html(_.next),P[_.loop||j?"show":"hide"]().html(_.previous),_.slideshow&&M.show(),_.preloading&&t.each([r(-1),r(1)],function(){var e,i,o=H[this],n=t.data(o,Z);n&&n.href?(e=n.href,t.isFunction(e)&&(e=e.call(o))):e=t(o).attr("href"),e&&l(n,e)&&(e=s(n,e),i=new Image,i.src=e)})):O.hide(),_.iframe?(i=o("iframe")[0],d in i&&(i[d]=0),u in i&&(i[u]="true"),_.scrolling||(i.scrolling="no"),t(i).attr({src:_.href,name:(new Date).getTime(),"class":te+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",n).appendTo(W),se.one(le,function(){i.src="//about:blank"}),_.fastIframe&&t(i).trigger("load")):n(),"fade"===_.transition?x.fadeTo(a,1,e):e())},"fade"===_.transition?x.fadeTo(a,0,function(){J.position(0,h)}):J.position(a,h)}},J.next=function(){!q&&H[1]&&(_.loop||H[j+1])&&(j=r(1),f(H[j]))},J.prev=function(){!q&&H[1]&&(_.loop||j)&&(j=r(-1),f(H[j]))},J.close=function(){$&&!G&&(G=!0,$=!1,c(re,_.onCleanup),E.unbind("."+te),g.fadeTo(_.fadeOut||0,0),x.stop().fadeTo(_.fadeOut||0,0,function(){x.add(g).css({opacity:1,cursor:"auto"}).hide(),c(le),W.empty().remove(),setTimeout(function(){G=!1,c(he,_.onClosed)},1)}))},J.remove=function(){x&&(x.stop(),t.colorbox.close(),x.stop().remove(),g.remove(),G=!1,x=null,t("."+ee).removeData(Z).removeClass(ee),t(e).unbind("click."+te))},J.element=function(){return t(A)},J.settings=Y)})(jQuery,document,window);;
(function ($) {

Drupal.behaviors.initColorbox = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }

    if (settings.colorbox.mobiledetect && window.matchMedia) {
      // Disable Colorbox for small screens.
      mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
      if (mq.matches) {
        return;
      }
    }

    $('.colorbox', context)
      .once('init-colorbox')
      .colorbox(settings.colorbox);
  }
};

{
  $(document).bind('cbox_complete', function () {
    Drupal.attachBehaviors('#cboxLoadedContent');
  });
}

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxLoad = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }
    $.urlParams = function (url) {
      var p = {},
          e,
          a = /\+/g,  // Regex for replacing addition symbol with a space
          r = /([^&=]+)=?([^&]*)/g,
          d = function (s) { return decodeURIComponent(s.replace(a, ' ')); },
          q = url.split('?');
      while (e = r.exec(q[1])) {
        e[1] = d(e[1]);
        e[2] = d(e[2]);
        switch (e[2].toLowerCase()) {
          case 'true':
          case 'yes':
            e[2] = true;
            break;
          case 'false':
          case 'no':
            e[2] = false;
            break;
        }
        if (e[1] == 'width') { e[1] = 'innerWidth'; }
        if (e[1] == 'height') { e[1] = 'innerHeight'; }
        p[e[1]] = e[2];
      }
      return p;
    };
    $('.colorbox-load', context)
      .once('init-colorbox-load', function () {
        var params = $.urlParams($(this).attr('href'));
        $(this).colorbox($.extend({}, settings.colorbox, params));
      });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxInline = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }
    $.urlParam = function(name, url){
      if (name == 'fragment') {
        var results = new RegExp('(#[^&#]*)').exec(url);
      }
      else {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
      }
      if (!results) { return ''; }
      return results[1] || '';
    };
    $('.colorbox-inline', context).once('init-colorbox-inline').colorbox({
      transition:settings.colorbox.transition,
      speed:settings.colorbox.speed,
      opacity:settings.colorbox.opacity,
      slideshow:settings.colorbox.slideshow,
      slideshowAuto:settings.colorbox.slideshowAuto,
      slideshowSpeed:settings.colorbox.slideshowSpeed,
      slideshowStart:settings.colorbox.slideshowStart,
      slideshowStop:settings.colorbox.slideshowStop,
      current:settings.colorbox.current,
      previous:settings.colorbox.previous,
      next:settings.colorbox.next,
      close:settings.colorbox.close,
      overlayClose:settings.colorbox.overlayClose,
      maxWidth:settings.colorbox.maxWidth,
      maxHeight:settings.colorbox.maxHeight,
      innerWidth:function(){
        return $.urlParam('width', $(this).attr('href'));
      },
      innerHeight:function(){
        return $.urlParam('height', $(this).attr('href'));
      },
      title:function(){
        return decodeURIComponent($.urlParam('title', $(this).attr('href')));
      },
      iframe:function(){
        return $.urlParam('iframe', $(this).attr('href'));
      },
      inline:function(){
        return $.urlParam('inline', $(this).attr('href'));
      },
      href:function(){
        return $.urlParam('fragment', $(this).attr('href'));
      }
    });
  }
};

})(jQuery);
;
(function ($) {
  Drupal.viewsSlideshow = Drupal.viewsSlideshow || {};

  /**
   * Views Slideshow Controls
   */
  Drupal.viewsSlideshowControls = Drupal.viewsSlideshowControls || {};

  /**
   * Implement the play hook for controls.
   */
  Drupal.viewsSlideshowControls.play = function (options) {
    // Route the control call to the correct control type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].play == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].play(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].play == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].play(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the pause hook for controls.
   */
  Drupal.viewsSlideshowControls.pause = function (options) {
    // Route the control call to the correct control type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].pause == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].top.type].pause(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].pause == 'function') {
        Drupal[Drupal.settings.viewsSlideshowControls[options.slideshowID].bottom.type].pause(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };


  /**
   * Views Slideshow Text Controls
   */

  // Add views slieshow api calls for views slideshow text controls.
  Drupal.behaviors.viewsSlideshowControlsText = {
    attach: function (context) {

      // Process previous link
      $('.views_slideshow_controls_text_previous:not(.views-slideshow-controls-text-previous-processed)', context).addClass('views-slideshow-controls-text-previous-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_previous_', '');
        $(this).click(function() {
          Drupal.viewsSlideshow.action({ "action": 'previousSlide', "slideshowID": uniqueID });
          return false;
        });
      });

      // Process next link
      $('.views_slideshow_controls_text_next:not(.views-slideshow-controls-text-next-processed)', context).addClass('views-slideshow-controls-text-next-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_next_', '');
        $(this).click(function() {
          Drupal.viewsSlideshow.action({ "action": 'nextSlide', "slideshowID": uniqueID });
          return false;
        });
      });

      // Process pause link
      $('.views_slideshow_controls_text_pause:not(.views-slideshow-controls-text-pause-processed)', context).addClass('views-slideshow-controls-text-pause-processed').each(function() {
        var uniqueID = $(this).attr('id').replace('views_slideshow_controls_text_pause_', '');
        $(this).click(function() {
          if (Drupal.settings.viewsSlideshow[uniqueID].paused) {
            Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": uniqueID, "force": true });
          }
          else {
            Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": uniqueID, "force": true });
          }
          return false;
        });
      });
    }
  };

  Drupal.viewsSlideshowControlsText = Drupal.viewsSlideshowControlsText || {};

  /**
   * Implement the pause hook for text controls.
   */
  Drupal.viewsSlideshowControlsText.pause = function (options) {
    var pauseText = Drupal.theme.prototype['viewsSlideshowControlsPause'] ? Drupal.theme('viewsSlideshowControlsPause') : '';
    $('#views_slideshow_controls_text_pause_' + options.slideshowID + ' a').text(pauseText);
  };

  /**
   * Implement the play hook for text controls.
   */
  Drupal.viewsSlideshowControlsText.play = function (options) {
    var playText = Drupal.theme.prototype['viewsSlideshowControlsPlay'] ? Drupal.theme('viewsSlideshowControlsPlay') : '';
    $('#views_slideshow_controls_text_pause_' + options.slideshowID + ' a').text(playText);
  };

  // Theme the resume control.
  Drupal.theme.prototype.viewsSlideshowControlsPause = function () {
    return Drupal.t('Resume');
  };

  // Theme the pause control.
  Drupal.theme.prototype.viewsSlideshowControlsPlay = function () {
    return Drupal.t('Pause');
  };

  /**
   * Views Slideshow Pager
   */
  Drupal.viewsSlideshowPager = Drupal.viewsSlideshowPager || {};

  /**
   * Implement the transitionBegin hook for pagers.
   */
  Drupal.viewsSlideshowPager.transitionBegin = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].transitionBegin == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].transitionBegin(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].transitionBegin == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].transitionBegin(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the goToSlide hook for pagers.
   */
  Drupal.viewsSlideshowPager.goToSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].goToSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].goToSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].goToSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].goToSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the previousSlide hook for pagers.
   */
  Drupal.viewsSlideshowPager.previousSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].previousSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].previousSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].previousSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].previousSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };

  /**
   * Implement the nextSlide hook for pagers.
   */
  Drupal.viewsSlideshowPager.nextSlide = function (options) {
    // Route the pager call to the correct pager type.
    // Need to use try catch so we don't have to check to make sure every part
    // of the object is defined.
    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].nextSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].top.type].nextSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }

    try {
      if (typeof Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type != "undefined" && typeof Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].nextSlide == 'function') {
        Drupal[Drupal.settings.viewsSlideshowPager[options.slideshowID].bottom.type].nextSlide(options);
      }
    }
    catch(err) {
      // Don't need to do anything on error.
    }
  };


  /**
   * Views Slideshow Pager Fields
   */

  // Add views slieshow api calls for views slideshow pager fields.
  Drupal.behaviors.viewsSlideshowPagerFields = {
    attach: function (context) {
      // Process pause on hover.
      $('.views_slideshow_pager_field:not(.views-slideshow-pager-field-processed)', context).addClass('views-slideshow-pager-field-processed').each(function() {
        // Parse out the location and unique id from the full id.
        var pagerInfo = $(this).attr('id').split('_');
        var location = pagerInfo[2];
        pagerInfo.splice(0, 3);
        var uniqueID = pagerInfo.join('_');

        // Add the activate and pause on pager hover event to each pager item.
        if (Drupal.settings.viewsSlideshowPagerFields[uniqueID][location].activatePauseOnHover) {
          $(this).children().each(function(index, pagerItem) {
            var mouseIn = function() {
              Drupal.viewsSlideshow.action({ "action": 'goToSlide', "slideshowID": uniqueID, "slideNum": index });
              Drupal.viewsSlideshow.action({ "action": 'pause', "slideshowID": uniqueID });
            }
            
            var mouseOut = function() {
              Drupal.viewsSlideshow.action({ "action": 'play', "slideshowID": uniqueID });
            }
          
            if (jQuery.fn.hoverIntent) {
              $(pagerItem).hoverIntent(mouseIn, mouseOut);
            }
            else {
              $(pagerItem).hover(mouseIn, mouseOut);
            }
            
          });
        }
        else {
          $(this).children().each(function(index, pagerItem) {
            $(pagerItem).click(function() {
              Drupal.viewsSlideshow.action({ "action": 'goToSlide', "slideshowID": uniqueID, "slideNum": index });
            });
          });
        }
      });
    }
  };

  Drupal.viewsSlideshowPagerFields = Drupal.viewsSlideshowPagerFields || {};

  /**
   * Implement the transitionBegin hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.transitionBegin = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_'+ pagerLocation + '_' + options.slideshowID + '_' + options.slideNum).addClass('active');
    }

  };

  /**
   * Implement the goToSlide hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.goToSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + options.slideNum).addClass('active');
    }
  };

  /**
   * Implement the previousSlide hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.previousSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Get the current active pager.
      var pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"].active').attr('id').replace('views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_', '');

      // If we are on the first pager then activate the last pager.
      // Otherwise activate the previous pager.
      if (pagerNum == 0) {
        pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').length() - 1;
      }
      else {
        pagerNum--;
      }

      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + pagerNum).addClass('active');
    }
  };

  /**
   * Implement the nextSlide hook for pager fields pager.
   */
  Drupal.viewsSlideshowPagerFields.nextSlide = function (options) {
    for (pagerLocation in Drupal.settings.viewsSlideshowPager[options.slideshowID]) {
      // Get the current active pager.
      var pagerNum = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"].active').attr('id').replace('views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_', '');
      var totalPagers = $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').length();

      // If we are on the last pager then activate the first pager.
      // Otherwise activate the next pager.
      pagerNum++;
      if (pagerNum == totalPagers) {
        pagerNum = 0;
      }

      // Remove active class from pagers
      $('[id^="views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '"]').removeClass('active');

      // Add active class to active pager.
      $('#views_slideshow_pager_field_item_' + pagerLocation + '_' + options.slideshowID + '_' + slideNum).addClass('active');
    }
  };


  /**
   * Views Slideshow Slide Counter
   */

  Drupal.viewsSlideshowSlideCounter = Drupal.viewsSlideshowSlideCounter || {};

  /**
   * Implement the transitionBegin for the slide counter.
   */
  Drupal.viewsSlideshowSlideCounter.transitionBegin = function (options) {
    $('#views_slideshow_slide_counter_' + options.slideshowID + ' .num').text(options.slideNum + 1);
  };

  /**
   * This is used as a router to process actions for the slideshow.
   */
  Drupal.viewsSlideshow.action = function (options) {
    // Set default values for our return status.
    var status = {
      'value': true,
      'text': ''
    }

    // If an action isn't specified return false.
    if (typeof options.action == 'undefined' || options.action == '') {
      status.value = false;
      status.text =  Drupal.t('There was no action specified.');
      return error;
    }

    // If we are using pause or play switch paused state accordingly.
    if (options.action == 'pause') {
      Drupal.settings.viewsSlideshow[options.slideshowID].paused = 1;
      // If the calling method is forcing a pause then mark it as such.
      if (options.force) {
        Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce = 1;
      }
    }
    else if (options.action == 'play') {
      // If the slideshow isn't forced pause or we are forcing a play then play
      // the slideshow.
      // Otherwise return telling the calling method that it was forced paused.
      if (!Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce || options.force) {
        Drupal.settings.viewsSlideshow[options.slideshowID].paused = 0;
        Drupal.settings.viewsSlideshow[options.slideshowID].pausedForce = 0;
      }
      else {
        status.value = false;
        status.text += ' ' + Drupal.t('This slideshow is forced paused.');
        return status;
      }
    }

    // We use a switch statement here mainly just to limit the type of actions
    // that are available.
    switch (options.action) {
      case "goToSlide":
      case "transitionBegin":
      case "transitionEnd":
        // The three methods above require a slide number. Checking if it is
        // defined and it is a number that is an integer.
        if (typeof options.slideNum == 'undefined' || typeof options.slideNum !== 'number' || parseInt(options.slideNum) != (options.slideNum - 0)) {
          status.value = false;
          status.text = Drupal.t('An invalid integer was specified for slideNum.');
        }
      case "pause":
      case "play":
      case "nextSlide":
      case "previousSlide":
        // Grab our list of methods.
        var methods = Drupal.settings.viewsSlideshow[options.slideshowID]['methods'];

        // if the calling method specified methods that shouldn't be called then
        // exclude calling them.
        var excludeMethodsObj = {};
        if (typeof options.excludeMethods !== 'undefined') {
          // We need to turn the excludeMethods array into an object so we can use the in
          // function.
          for (var i=0; i < excludeMethods.length; i++) {
            excludeMethodsObj[excludeMethods[i]] = '';
          }
        }

        // Call every registered method and don't call excluded ones.
        for (i = 0; i < methods[options.action].length; i++) {
          if (Drupal[methods[options.action][i]] != undefined && typeof Drupal[methods[options.action][i]][options.action] == 'function' && !(methods[options.action][i] in excludeMethodsObj)) {
            Drupal[methods[options.action][i]][options.action](options);
          }
        }
        break;

      // If it gets here it's because it's an invalid action.
      default:
        status.value = false;
        status.text = Drupal.t('An invalid action "!action" was specified.', { "!action": options.action });
    }
    return status;
  };
})(jQuery);
;
/**
 * jQuery Masonry v2.1.08
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
(function(e,t,n){"use strict";var r=t.event,i;r.special.smartresize={setup:function(){t(this).bind("resize",r.special.smartresize.handler)},teardown:function(){t(this).unbind("resize",r.special.smartresize.handler)},handler:function(e,t){var n=this,s=arguments;e.type="smartresize",i&&clearTimeout(i),i=setTimeout(function(){r.dispatch.apply(n,s)},t==="execAsap"?0:100)}},t.fn.smartresize=function(e){return e?this.bind("smartresize",e):this.trigger("smartresize",["execAsap"])},t.Mason=function(e,n){this.element=t(n),this._create(e),this._init()},t.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},t.Mason.prototype={_filterFindBricks:function(e){var t=this.options.itemSelector;return t?e.filter(t).add(e.find(t)):e},_getBricks:function(e){var t=this._filterFindBricks(e).css({position:"absolute"}).addClass("masonry-brick");return t},_create:function(n){this.options=t.extend(!0,{},t.Mason.settings,n),this.styleQueue=[];var r=this.element[0].style;this.originalStyle={height:r.height||""};var i=this.options.containerStyle;for(var s in i)this.originalStyle[s]=r[s]||"";this.element.css(i),this.horizontalDirection=this.options.isRTL?"right":"left";var o=this.element.css("padding-"+this.horizontalDirection),u=this.element.css("padding-top");this.offset={x:o?parseInt(o,10):0,y:u?parseInt(u,10):0},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var a=this;setTimeout(function(){a.element.addClass("masonry")},0),this.options.isResizable&&t(e).bind("smartresize.masonry",function(){a.resize()}),this.reloadItems()},_init:function(e){this._getColumns(),this._reLayout(e)},option:function(e,n){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))},layout:function(e,t){for(var n=0,r=e.length;n<r;n++)this._placeBrick(e[n]);var i={};i.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var s=0;n=this.cols;while(--n){if(this.colYs[n]!==0)break;s++}i.width=(this.cols-s)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:i});var o=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",u=this.options.animationOptions,a;for(n=0,r=this.styleQueue.length;n<r;n++)a=this.styleQueue[n],a.$el[o](a.style,u);this.styleQueue=[],t&&t.call(e),this.isLaidOut=!0},_getColumns:function(){var e=this.options.isFitWidth?this.element.parent():this.element,t=e.width();this.columnWidth=this.isFluid?this.options.columnWidth(t):this.options.columnWidth||this.$bricks.outerWidth(!0)||t,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((t+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(e){var n=t(e),r,i,s,o,u;r=Math.ceil(n.outerWidth(!0)/this.columnWidth),r=Math.min(r,this.cols);if(r===1)s=this.colYs;else{i=this.cols+1-r,s=[];for(u=0;u<i;u++)o=this.colYs.slice(u,u+r),s[u]=Math.max.apply(Math,o)}var a=Math.min.apply(Math,s),f=0;for(var l=0,c=s.length;l<c;l++)if(s[l]===a){f=l;break}var h={top:a+this.offset.y};h[this.horizontalDirection]=this.columnWidth*f+this.offset.x,this.styleQueue.push({$el:n,style:h});var p=a+n.outerHeight(!0),d=this.cols+1-c;for(l=0;l<d;l++)this.colYs[f+l]=p},resize:function(){var e=this.cols;this._getColumns(),(this.isFluid||this.cols!==e)&&this._reLayout()},_reLayout:function(e){var t=this.cols;this.colYs=[];while(t--)this.colYs.push(0);this.layout(this.$bricks,e)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(e){this.reloadItems(),this._init(e)},appended:function(e,t,n){if(t){this._filterFindBricks(e).css({top:this.element.height()});var r=this;setTimeout(function(){r._appended(e,n)},1)}else this._appended(e,n)},_appended:function(e,t){var n=this._getBricks(e);this.$bricks=this.$bricks.add(n),this.layout(n,t)},remove:function(e){this.$bricks=this.$bricks.not(e),e.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var n=this.element[0].style;for(var r in this.originalStyle)n[r]=this.originalStyle[r];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),t(e).unbind(".masonry")}},t.fn.imagesLoaded=function(e){function u(){e.call(n,r)}function a(e){var n=e.target;n.src!==s&&t.inArray(n,o)===-1&&(o.push(n),--i<=0&&(setTimeout(u),r.unbind(".imagesLoaded",a)))}var n=this,r=n.find("img").add(n.filter("img")),i=r.length,s="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",o=[];return i||u(),r.bind("load.imagesLoaded error.imagesLoaded",a).each(function(){var e=this.src;this.src=s,this.src=e}),n};var s=function(t){e.console&&e.console.error(t)};t.fn.masonry=function(e){if(typeof e=="string"){var n=Array.prototype.slice.call(arguments,1);this.each(function(){var r=t.data(this,"masonry");if(!r){s("cannot call methods on masonry prior to initialization; attempted to call method '"+e+"'");return}if(!t.isFunction(r[e])||e.charAt(0)==="_"){s("no such method '"+e+"' for masonry instance");return}r[e].apply(r,n)})}else this.each(function(){var n=t.data(this,"masonry");n?(n.option(e||{}),n._init()):t.data(this,"masonry",new t.Mason(e,this))});return this}})(window,jQuery);;
/**
 * @file
 * Masonry script.
 */

(function($) {

Drupal.behaviors.masonry = {
  attach: function(context, settings) {

    // Iterate through all Masonry instances
    $.each(Drupal.settings.masonry, function (container, settings) {
      // Set container
      var $container = $(container);

      // Set options
      var $options = new Object();
      if (settings.item_selector) {
        $options.itemSelector = settings.item_selector;
      }
      if (settings.column_width) {
        if (settings.column_width_units == 'px') {
          $options.columnWidth = settings.column_width;
        }
        else if (settings.column_width_units == '%') {
          $options.columnWidth = function (containerWidth) {
            return containerWidth * (settings.column_width / 100);
          };
        }
      }
      $options.gutterWidth = settings.gutter_width;
      $options.isResizable = settings.resizable;
      if (settings.resizable) {
        $options.isAnimated = settings.animated;
        if (settings.animated) {
          $options.animationOptions = {
            queue: false,
            duration: settings.animation_duration
          };
        }
      }
      $options.isFitWidth = settings.fit_width;
      $options.isRTL = settings.rtl;

      // Apply Masonry to container
      if (settings.images_first) {
        $container.imagesLoaded(function () {
          $container.masonry($options);
        });
      }
      else {
        $container.masonry($options);
      }
    });

  }
};

})(jQuery);

;
/**
 * @file views_load_more.js
 *
 * Handles the AJAX pager for the view_load_more plugin.
 */
(function ($) {

  /**
   * Provide a series of commands that the server can request the client perform.
   */
  Drupal.ajax.prototype.commands.viewsLoadMoreAppend = function (ajax, response, status) {
    // Get information from the response. If it is not there, default to
    // our presets.
    var wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
    var method = response.method || ajax.method;
    var effect = ajax.getEffect(response);

    // We don't know what response.data contains: it might be a string of text
    // without HTML, so don't rely on jQuery correctly iterpreting
    // $(response.data) as new HTML rather than a CSS selector. Also, if
    // response.data contains top-level text nodes, they get lost with either
    // $(response.data) or $('<div></div>').replaceWith(response.data).
    var new_content_wrapped = $('<div></div>').html(response.data);
    var new_content = new_content_wrapped.contents();

    // For legacy reasons, the effects processing code assumes that new_content
    // consists of a single top-level element. Also, it has not been
    // sufficiently tested whether attachBehaviors() can be successfully called
    // with a context object that includes top-level text nodes. However, to
    // give developers full control of the HTML appearing in the page, and to
    // enable Ajax content to be inserted in places where DIV elements are not
    // allowed (e.g., within TABLE, TR, and SPAN parents), we check if the new
    // content satisfies the requirement of a single top-level element, and
    // only use the container DIV created above when it doesn't. For more
    // information, please see http://drupal.org/node/736066.
    if (new_content.length != 1 || new_content.get(0).nodeType != 1) {
      new_content = new_content_wrapped;
    }
    // If removing content from the wrapper, detach behaviors first.
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.detachBehaviors(wrapper, settings);
    if ($.waypoints != undefined) {
      $.waypoints('refresh');
    }

    // Set up our default query options. This is for advance users that might
    // change there views layout classes. This allows them to write there own
    // jquery selector to replace the content with.
    var content_query = response.options.content || '.view-content';

    // If we're using any effects. Hide the new content before adding it to the DOM.
    if (effect.showEffect != 'show') {
      new_content.find(content_query).children().hide();
    }

    // Add the new content to the page.
    wrapper.find('.pager a').remove();
    wrapper.find('.pager').replaceWith(new_content.find('.pager'));
    wrapper.find(content_query)[method](new_content.find(content_query).children());
    if (effect.showEffect != 'show') {
      wrapper.find(content_query).children(':not(:visible)')[effect.showEffect](effect.showSpeed);
    }

    if ($.Mason != undefined) {
      // we must let the images load before applying the masonry reload, otherwise they will all stack on top of each other
      wrapper.find(content_query).masonry('reload');
      wrapper.find('.masonry-item img').load(function(){
        wrapper.find(content_query).masonry('reload');
      });
    }
    

    // Attach all JavaScript behaviors to the new content
    // Remove the Jquery once Class, TODO: There needs to be a better
    // way of doing this, look at .removeOnce() :-/
    var classes = wrapper.attr('class');
    var onceClass = classes.match(/jquery-once-[0-9]*-[a-z]*/);
    wrapper.removeClass(onceClass[0]);
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.attachBehaviors(wrapper, settings);
  }

  /**
   * Attaches the AJAX behavior to Views Load More waypoint support.
   */
  Drupal.behaviors.ViewsLoadMore = {
    attach: function (context, settings) {
      if (settings && settings.viewsLoadMore && settings.views.ajaxViews) {
        opts = {
          offset: '100%'
        };
        $.each(settings.viewsLoadMore, function(i, setting) {
          var view = '.view-id-' + setting.view_name + '.view-display-id-' + setting.view_display_id + ' .pager-next a';
          $(view).waypoint(function(event, direction) {
            $(view).waypoint('remove');
            $(view).click();
          }, opts);
        });
      }
    },
    detach: function (context, settings, trigger) {
      if (settings && Drupal.settings.viewsLoadMore && settings.views.ajaxViews) {
        $.each(settings.viewsLoadMore, function(i, setting) {
          var view = '.view-id-' + setting.view_name + '.view-display-id-' + setting.view_display_id + ' .pager-next a';
          $(view, context).waypoint('destroy');
        });
      }
    }
     };


    Drupal.behaviors.scroll_top = {
        attach: function (context) {
            $('#scroll_top', context).click(function () {
                $('body,html').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });

        }
    };

})(jQuery);
;
/**
 * @file
 * Some basic behaviors and utility functions for Views.
 */
(function ($) {

Drupal.Views = {};

/**
 * jQuery UI tabs, Views integration component
 */
Drupal.behaviors.viewsTabs = {
  attach: function (context) {
    if ($.viewsUi && $.viewsUi.tabs) {
      $('#views-tabset').once('views-processed').viewsTabs({
        selectedClass: 'active'
      });
    }

    $('a.views-remove-link').once('views-processed').click(function(event) {
      var id = $(this).attr('id').replace('views-remove-link-', '');
      $('#views-row-' + id).hide();
      $('#views-removed-' + id).attr('checked', true);
      event.preventDefault();
   });
  /**
    * Here is to handle display deletion
    * (checking in the hidden checkbox and hiding out the row)
    */
  $('a.display-remove-link')
    .addClass('display-processed')
    .click(function() {
      var id = $(this).attr('id').replace('display-remove-link-', '');
      $('#display-row-' + id).hide();
      $('#display-removed-' + id).attr('checked', true);
      return false;
  });
  }
};

/**
 * Helper function to parse a querystring.
 */
Drupal.Views.parseQueryString = function (query) {
  var args = {};
  var pos = query.indexOf('?');
  if (pos != -1) {
    query = query.substring(pos + 1);
  }
  var pairs = query.split('&');
  for(var i in pairs) {
    if (typeof(pairs[i]) == 'string') {
      var pair = pairs[i].split('=');
      // Ignore the 'q' path argument, if present.
      if (pair[0] != 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
  }
  return args;
};

/**
 * Helper function to return a view's arguments based on a path.
 */
Drupal.Views.parseViewArgs = function (href, viewPath) {
  var returnObj = {};
  var path = Drupal.Views.getPath(href);
  // Ensure we have a correct path.
  if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
    var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
    returnObj.view_args = args;
    returnObj.view_path = path;
  }
  return returnObj;
};

/**
 * Strip off the protocol plus domain from an href.
 */
Drupal.Views.pathPortion = function (href) {
  // Remove e.g. http://example.com if present.
  var protocol = window.location.protocol;
  if (href.substring(0, protocol.length) == protocol) {
    // 2 is the length of the '//' that normally follows the protocol
    href = href.substring(href.indexOf('/', protocol.length + 2));
  }
  return href;
};

/**
 * Return the Drupal path portion of an href.
 */
Drupal.Views.getPath = function (href) {
  href = Drupal.Views.pathPortion(href);
  href = href.substring(Drupal.settings.basePath.length, href.length);
  // 3 is the length of the '?q=' added to the url without clean urls.
  if (href.substring(0, 3) == '?q=') {
    href = href.substring(3, href.length);
  }
  var chars = ['#', '?', '&'];
  for (i in chars) {
    if (href.indexOf(chars[i]) > -1) {
      href = href.substr(0, href.indexOf(chars[i]));
    }
  }
  return href;
};

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * @file
 * Handles AJAX fetching of views, including filter submission and response.
 */
(function ($) {

/**
 * Attaches the AJAX behavior to Views exposed filter forms and key View links.
 */
Drupal.behaviors.ViewsAjaxView = {};
Drupal.behaviors.ViewsAjaxView.attach = function() {
  if (Drupal.settings && Drupal.settings.views && Drupal.settings.views.ajaxViews) {
    $.each(Drupal.settings.views.ajaxViews, function(i, settings) {
      Drupal.views.instances[i] = new Drupal.views.ajaxView(settings);
    });
  }
};

Drupal.views = {};
Drupal.views.instances = {};

/**
 * Javascript object for a certain view.
 */
Drupal.views.ajaxView = function(settings) {
  var selector = '.view-dom-id-' + settings.view_dom_id;
  this.$view = $(selector);

  // Retrieve the path to use for views' ajax.
  var ajax_path = Drupal.settings.views.ajax_path;

  // If there are multiple views this might've ended up showing up multiple times.
  if (ajax_path.constructor.toString().indexOf("Array") != -1) {
    ajax_path = ajax_path[0];
  }

  // Check if there are any GET parameters to send to views.
  var queryString = window.location.search || '';
  if (queryString !== '') {
    // Remove the question mark and Drupal path component if any.
    var queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
    if (queryString !== '') {
      // If there is a '?' in ajax_path, clean url are on and & should be used to add parameters.
      queryString = ((/\?/.test(ajax_path)) ? '&' : '?') + queryString;
    }
  }

  this.element_settings = {
    url: ajax_path + queryString,
    submit: settings,
    setClick: true,
    event: 'click',
    selector: selector,
    progress: { type: 'throbber' }
  };

  this.settings = settings;

  // Add the ajax to exposed forms.
  this.$exposed_form = this.$view.children('.view-filters').children('form');
  this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax, this));

  // Add the ajax to pagers.
  this.$view
    // Don't attach to nested views. Doing so would attach multiple behaviors
    // to a given element.
    .filter(jQuery.proxy(this.filterNestedViews, this))
    .once(jQuery.proxy(this.attachPagerAjax, this));

  // Add a trigger to update this view specifically. In order to trigger a
  // refresh use the following code.
  //
  // @code
  // jQuery('.view-name').trigger('RefreshView');
  // @endcode
  // Add a trigger to update this view specifically.
  var self_settings = this.element_settings;
  self_settings.event = 'RefreshView';
  this.refreshViewAjax = new Drupal.ajax(this.selector, this.$view, self_settings);
};

Drupal.views.ajaxView.prototype.attachExposedFormAjax = function() {
  var button = $('input[type=submit], button[type=submit], input[type=image]', this.$exposed_form);
  button = button[0];

  this.exposedFormAjax = new Drupal.ajax($(button).attr('id'), button, this.element_settings);
};

Drupal.views.ajaxView.prototype.filterNestedViews= function() {
  // If there is at least one parent with a view class, this view
  // is nested (e.g., an attachment). Bail.
  return !this.$view.parents('.view').size();
};

/**
 * Attach the ajax behavior to each link.
 */
Drupal.views.ajaxView.prototype.attachPagerAjax = function() {
  this.$view.find('ul.pager > li > a, th.views-field a, .attachment .views-summary a')
  .each(jQuery.proxy(this.attachPagerLinkAjax, this));
};

/**
 * Attach the ajax behavior to a singe link.
 */
Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function(id, link) {
  var $link = $(link);
  var viewData = {};
  var href = $link.attr('href');
  // Construct an object using the settings defaults and then overriding
  // with data specific to the link.
  $.extend(
    viewData,
    this.settings,
    Drupal.Views.parseQueryString(href),
    // Extract argument data from the URL.
    Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
  );

  // For anchor tags, these will go to the target of the anchor rather
  // than the usual location.
  $.extend(viewData, Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

  this.element_settings.submit = viewData;
  this.pagerAjax = new Drupal.ajax(false, $link, this.element_settings);
};

Drupal.ajax.prototype.commands.viewsScrollTop = function (ajax, response, status) {
  // Scroll to the top of the view. This will allow users
  // to browse newly loaded content after e.g. clicking a pager
  // link.
  var offset = $(response.selector).offset();
  // We can't guarantee that the scrollable object should be
  // the body, as the view could be embedded in something
  // more complex such as a modal popup. Recurse up the DOM
  // and scroll the first element that has a non-zero top.
  var scrollTarget = response.selector;
  while ($(scrollTarget).scrollTop() == 0 && $(scrollTarget).parent()) {
    scrollTarget = $(scrollTarget).parent();
  }
  // Only scroll upward
  if (offset.top - 10 < $(scrollTarget).scrollTop()) {
    $(scrollTarget).animate({scrollTop: (offset.top - 10)}, 500);
  }
};

})(jQuery);
;
!function(a,b){var c={};c.whitelistCheck=function(a){var c=Drupal.settings.basePath+"a/preview-api",d=[];if(b.isArray(a))for(var e=0;e<a.length;e++)"string"==typeof a[e]&&d.push(a[e]);else"string"==typeof a&&d.push(a);if(!d.length)return b.Deferred().reject(new Error("Invalid arguments for NBCTVE.preview.whitelistCheck()."));var f="seriesID="+d.join(","),g=c+"?"+f;return b.get(g).pipe(function(c){if(b.isArray(a)){for(var d=new Array(a.length),e=0;e<a.length;e++)d[e]=c[a[e]];return d}return!!c[a]})},a.NBCTVE=a.NBCTVE||{},a.NBCTVE.preview=a.NBCTVE.preview||c}(window,jQuery);;
// features/nbc_tve/templates/dust/user-inactivity-confirmation.dust
(function(){dust.register("user-inactivity-confirmation",body_0);function body_0(chk,ctx){return chk.w("<div class=\"popup-content user-inactivity-confirmation\"><div class=\"popup-message\">WE JUST WANTED TO MAKE SURE YOU'RE STILL WATCHING THE LIVE STREAM</div><button class=\"popup-button\">CLICK TO CONTINUE</button></div>");}body_0.__dustBody=!0;return body_0;})();;
!function(a,b,c){function d(){window.console&&console.error&&console.error.apply(console,Array.prototype.slice.call(arguments))}if("undefined"!=typeof NBCTVEAnalytics){var e="TempPass-ShortTTL",f="TempPass-LongTTL",g=5,h=30,i=2e3;a.behaviors.nbcTveAnvatoAnalytics={programID:null,provider:null,passguid:null,previewMode:null,previewExpired:null,verifyNowClicked:!1,userLoggedOut:!1,currentSegmentType:null,mvpdSelected:!1,attach:function(a,d){var g=this,h=d.nbctve.app;h.analytics=d.tve_analytics||{},c("#"+h.container.id,a).once("nbc-tve-analytics",function(){var a=h.analytics.debug_mode?h.analytics.debug_sitecatalyst_report_suite_id:h.analytics.sitecatalyst_report_suite_id,d=new NBCTVEAnalytics({reportingSuiteId:a}),i=NBCTVE.isDynamicLeadMode||!!c("#"+h.container.id).closest(".dynamic-lead-slide").length;if(!i){var j={"tve.title":"Live Stream"};d.trackEvent("","Live Stream Page",j)}b.on("anvato-schedule-template",function(a){c(".full-schedule-link",a).click(function(){var a={"tve.fullschedulelink":"true"};d.trackEvent("","Full Schedule Link",a)}),c(".affiliate-logo a",a).click(function(){var a={"tve.affiliatelogo":"true"};d.trackEvent("","Affiliate Logo Link",a)})}),b.on("verify-now",function(){g.verifyNowClicked||(g.previewMode&&!g.previewExpired&&g.getAuthContextData().done(function(a){a["tve.usertriggeredverifynow"]=g.getTempPassDuration(g.provider),d.trackEvent("","User Triggered Verify Now",a)}),g.verifyNowClicked=!0)}),b.on("anvato-player-error-template",function(a){c(".app-button-ios",a).click(function(){var a={"tve.iosapplink":"true"};d.trackEvent("","iOS App Link",a)}),c(".app-button-android",a).click(function(){var a={"tve.googleplayapplink":"true"};d.trackEvent("","Google Play App Link",a)})}),b.on("MVPDAuth::HEADER_CLICK",function(){var a={"tve.mvpdheaderlink":"true"};d.trackEvent("","MVPD Header Link",a)}),b.on("anvato-cta-template",function(a){c(".cta-affiliate-link",a).click(function(){var a={"tve.ctaaffiliatelink":"true"};d.trackEvent("","CTA Affiliate Link",a)})}),b.on("MVPDAuth::LOGOUT_ACTION",function(){g.userLoggedOut=!0}),b.on("provider-selected",function(a){var b=anvp[h.player.id];g.mvpdSelected=!0,g.getPlayerContextData(b).done(function(b){b["tve.passmvpd"]=a,b["tve.passselected"]="true",d.trackEvent("",a+" Selected",b)})}),AnvatoPlayer.on("PLAYER_ERROR",function(a,b,c){switch(b){case"ACTRL031":g.getAuthContextData().done(function(a){a["tve.fail"]="F1",a["tve.passauthorizefail"]="true",a["tve.passauthorize"]="Not Authorized",d.trackEvent("","Pass:Authorize:Fail",a)});break;case"ACTRL020":g.getAuthContextData().done(function(a){a["tve.fail"]="F2",a["tve.passauthorizefail"]="true",a["tve.passauthorize"]="Not Authorized",d.trackEvent("","Pass:Authorize:Fail",a)});break;case"ACTRL041":g.getAuthContextData().done(function(a){a["tve.localstream"]="false",a["tve.fail"]="F3",d.trackEvent("","Stream Auth Fail",a)});break;case"ACTRL042":g.getAuthContextData().done(function(a){a["tve.localstream"]="false",a["tve.fail"]="F4",d.trackEvent("","Stream Auth Fail",a)});break;default:var e={"tve.error":c};d.trackEvent("",c,e)}}),AnvatoPlayer.on("AUTHENTICATION_STATUS",function(a,b){b?g.previewExpired||!g.verifyNowClicked||g.previewMode||g.userLoggedOut||g.getAuthPlayerContextData(a).done(function(a){a["tve.authorizationsuccessduringpreview"]="true",d.trackEvent("","Authorization Success During Preview",a)}):g.provider=""}),AnvatoPlayer.on("AUTHORIZATION_STATUS",function(a,b,c,e){b&&g.getAuthContextData().done(function(a){a["tve.passauthorizesuccess"]="true",a["tve.passauthorize"]="Authorized",d.trackEvent("","Pass:Authorize:Success",a)});var f=decodeURIComponent(e),h=f.match(/<sessionGUID>(.*)<\/sessionGUID>?/);g.passguid=h&&h[1]||""}),AnvatoPlayer.on("PROVIDER_SELECTED",function(a,b){g.provider=b,g.previewMode=b===f||b===e,g.mvpdSelected&&!g.previewMode&&g.getAuthContextData().done(function(a){a["tve.passauthensuccess"]="true",a["tve.passauthen"]="Authenticated",d.trackEvent("","Pass:Authenticate:Success",a)})}),AnvatoPlayer.on("PICKER_REQUESTED",function(){var a={};!g.previewExpired||g.verifyNowClicked||g.userLoggedOut||g.getAuthContextData().done(function(a){a["tve.previewexpiredverifynow"]=g.getTempPassDuration(g.provider),d.trackEvent("","Preview Expired Verify Now",a)}),a["tve.passmvpdselector"]="true",a["tve.title"]="Open MVPD Selector",d.trackEvent("","User Opens MVPD Selector",a)}),AnvatoPlayer.on("PREVIEW_EXPIRED",function(a,b){g.previewExpired=b}),AnvatoPlayer.on("FIRST_FRAME_READY",function(a){g.getPlayerContextData(a).done(function(a){a["tve.videolinearstreamstart"]="true",d.trackEvent("","Linear Stream Start",a)})}),AnvatoPlayer.on("SEGMENT_TYPE_CHANGED",function(a,c){g.currentSegmentType&&g.currentSegmentType!==c&&b.emit("segment-type-"+g.currentSegmentType+"-end",a),g.currentSegmentType!==c&&(b.emit("segment-type-"+c+"-start",a),g.currentSegmentType=c)}),b.on("segment-type-ad-start",function(a){g.getPlayerContextData(a).done(function(a){a["tve.videolinearadpodstart"]="true",d.trackEvent("","Linear Ad Pod Start",a)})}),b.on("segment-type-ad-end",function(a){g.getPlayerContextData(a).done(function(a){a["tve.videolinearadpodend"]="true",d.trackEvent("","Linear Ad Pod Complete",a)})}),b.on("segment-type-master-start",function(a){g.getPlayerContextData(a).done(function(a){a["tve.videolinearsegstart"]="true",d.trackEvent("","Linear Segment Start",a)})}),b.on("segment-type-master-end",function(a){g.getPlayerContextData(a).done(function(a){a["tve.videolinearsegend"]="true",d.trackEvent("","Linear Segment Complete",a)})}),AnvatoPlayer.on("VIDEO_FIRST_QUARTILE",function(a){g.getPlayerContextData(a).done(function(a){a["tve.videovod25"]="true",d.trackEvent("","Episode 25% Complete",a)})}),AnvatoPlayer.on("VIDEO_MID_POINT",function(a){g.getPlayerContextData(a).done(function(a){a["tve.videovod50"]="true",d.trackEvent("","Episode 50% Complete",a)})}),AnvatoPlayer.on("VIDEO_THIRD_QUARTILE",function(a){g.getPlayerContextData(a).done(function(a){a["tve.videovod75"]="true",d.trackEvent("","Episode 75% Complete",a)})}),AnvatoPlayer.on("VIDEO_COMPLETED",function(a){g.getPlayerContextData(a).done(function(a){a["tve.videovodend"]="true",d.trackEvent("","VOD Episode Complete",a)})}),AnvatoPlayer.on("AD_STARTED",function(a,b){g.getPlayerContextData(a).done(function(a){a["tve.videolinearadstart"]="true",a["tve.videoadid"]=b,d.trackEvent("","Linear Ad Start",a)})}),AnvatoPlayer.on("AD_COMPLETED",function(a,b){g.getPlayerContextData(a).done(function(a){a["tve.videolinearadend"]="true",a["tve.videoadid"]=b,d.trackEvent("","Linear Ad Complete",a)})}),AnvatoPlayer.on("USER_INTERACTION",function(a,b,c){"pause"===b?"Video"===c?g.getPlayerContextData(a).done(function(a){a["tve.videolinearpause"]="true",d.trackEvent("","Linear Stream Pause",a)}):"Ad"===c&&g.getPlayerContextData(a).done(function(a){a["tve.videolinearadpause"]="true",d.trackEvent("","Linear Video Ad Pause",a)}):"goLive"===b&&g.getPlayerContextData(a).done(function(a){a["tve.videolinearscrub"]="true",d.trackEvent("","Linear Scrub",a)})}),AnvatoPlayer.on("PROGRAM_CHANGED",function(a,b){g.programID=b,g.getPlayerContextData(a).done(function(a){a["tve.videolinearprogstart"]="true",d.trackEvent("","Linear Program Start",a)})})})},getTempPassDuration:function(a){return a===e?g:a===f?h:0},getEntitlementData:function(){function a(){f++;var c=b._getEntitlementData();c?e.resolve(c):(d("NBCTVE local data was not found.",f),setTimeout(a,i))}var b=this,e=c.Deferred(),f=0;return setTimeout(a,0),e.promise()},_getEntitlementData:function(){if(Anvato.Schedule&&Anvato.Schedule.getCurrentEvent()){var a=Anvato.Schedule.getCurrentEvent(),b=NBCTVE.anvatoLocal.getStation(),c={};return c["tve.videoid"]=a.event_id,c["tve.videoprogram"]=a.title,c["tve.videoguid"]=a.metadata.rovi_id||"",c["tve.videotitle"]=a.metadata.rovi_episode_title||a.title,c["tve.length"]=a.metadata.rovi_runtime||"",c["tve.subcat1"]=a.metadata.rovi_category||"",c["tve.subcat2"]=a.metadata.rovi_subcategory||"",c["tve.epnumber"]=a.metadata.rovi_episode_number||"",c["tve.dma"]=b.dma_code,c["tve.homecallsign"]=b.callsign,c}},getFullScreenState:function(a){var b=this;if(b.getFullScreenState.defer)return b.getFullScreenState.defer;var d=b.getFullScreenState.defer=c.Deferred();return a.isFullscreen(function(a){var c={};c["tve.videoscreen"]=a?"Full":"Normal",b.getFullScreenState.defer=null,d.resolve(c)}),d.promise()},getVideoContentType:function(){var a=c.Deferred(),b="PASSIVE"===NBCTVE.provider?"Linear Preview":"Linear";return a.resolve({"tve.videocontent":b}),a.promise()},getVideoStatus:function(){var a,b=c.Deferred();return a="PASSIVE"===NBCTVE.provider?"Preview":"Restricted",b.resolve({"tve.videostatus":a}),b.promise()},getPlayerState:function(a){var b=c.Deferred(),d={};return d["tve.initiate"]=a.mergedConfig.autoplay?"Auto Play":"Manual",b.resolve(d),b.promise()},getPlayerStaticProps:function(){var a=c.Deferred(),b={};return b["tve.playerurl"]=window.location.href,b["tve.playertech"]="Flash",b["tve.videoplayertype"]="On-Domain",b["tve.playername"]="AnvatoLiveStream",a.resolve(b),a.promise()},getProvider:function(a){var b="undefined"!=typeof a?a:"video",d="tve.videomvpd";"link"===b&&(d="tve.passmvpd");var e=this,f=c.Deferred();if(e.provider){var g={};g[d]=e.provider,f.resolve(g)}else f.resolve({});return f.promise()},getSessionGUID:function(){var a=this,b=c.Deferred();if(null!==a.passguid)b.resolve({"tve.passguid":a.passguid});else var d=setInterval(function(){null!==a.passguid&&(b.resolve({"tve.passguid":a.passguid}),clearInterval(d))},i);return b.promise()},getAuthContextData:function(){var a=[this.getProvider("link"),this.getSessionGUID()];return this._mergePromiseData(a)},getPlayerContextData:function(a){var b=[this.getEntitlementData(),this.getProvider("video"),this.getFullScreenState(a),this.getVideoContentType(),this.getVideoStatus(),this.getPlayerState(a),this.getPlayerStaticProps()];return this._mergePromiseData(b)},getAuthPlayerContextData:function(a){var b=[this.getPlayerContextData(a),this.getAuthContextData()];return this._mergePromiseData(b)},_mergePromiseData:function(a){return c.when.apply(null,a).pipe(function(){var a={},b=Array.prototype.slice.call(arguments);return b.unshift(a),c.extend.apply(null,b),a})}}}}(Drupal,Events,jQuery);;
// features/nbc_tve/templates/dust/anvato-overlay-preview.dust
(function(){dust.register("anvato-overlay-preview",body_0);function body_0(chk,ctx){return chk.w("<div class=\"anvato-overlay-content\"><div class=\"anvato-overlay\"><div class=\"anvato-overlay-preview\"><div class=\"anvato-overlay__time\"></div><div class=\"anvato-overlay__headline\"><div class=\"anvato-overlay__current\">").x(ctx.get(["isOnNow"], false),ctx,{"block":body_1},{}).w("<span class=\"anvato-overlay__title\">").f(ctx.get(["title"], false),ctx,"h").w("</span></div></div>").x(ctx.get(["logo"], false),ctx,{"block":body_2},{}).x(ctx.get(["isLive"], false),ctx,{"block":body_3},{}).w("</div><div class=\"anvato-overlay-engaged\"><div class=\"anvato-overlay__slimline\">").x(ctx.get(["isLive"], false),ctx,{"block":body_4},{}).w("<span class=\"anvato-overlay__title\">").f(ctx.get(["title"], false),ctx,"h").w("</span></div>").x(ctx.get(["logo"], false),ctx,{"block":body_5},{}).w("<div class=\"anvato-overlay__verify_callout\"><span class=\"anvato-overlay__text\">VERIFY to watch in </span><span class=\"anvato-overlay__countdown\"></span></div><a class=\"anvato-overlay__prompt-link anvato-overlay__prompt-auth\">VERIFY NOW</a></div></div></div>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<span class=\"anvato-overlay__inline-onnow\">On Now </span>");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.w("<div class=\"anvato-overlay__logo\"><img src=\"").f(ctx.get(["logo"], false),ctx,"h").w("\"></div>");}body_2.__dustBody=!0;function body_3(chk,ctx){return chk.w("<div class=\"anvato-overlay__live\">Live</div>");}body_3.__dustBody=!0;function body_4(chk,ctx){return chk.w("<span class=\"anvato-overlay__inline-live\">Live</span>");}body_4.__dustBody=!0;function body_5(chk,ctx){return chk.w("<div class=\"anvato-overlay__logo\"><img src=\"").f(ctx.get(["logo"], false),ctx,"h").w("\"></div>");}body_5.__dustBody=!0;return body_0;})();;
// features/nbc_tve/templates/dust/anvato-overlay-auth.dust
(function(){dust.register("anvato-overlay-auth",body_0);function body_0(chk,ctx){return chk.w("<div class=\"anvato-overlay-content anvato-overlay-content__auth\"><div class=\"anvato-overlay\"><div class=\"anvato-overlay-preview\"><div class=\"anvato-overlay__time\"></div><div class=\"anvato-overlay__headline\"><div class=\"anvato-overlay__current\">").x(ctx.get(["isOnNow"], false),ctx,{"block":body_1},{}).w("<span class=\"anvato-overlay__title\">").f(ctx.get(["title"], false),ctx,"h").w("</span></div></div><div class=\"anvato-overlay__logo\"><img src=\"").f(ctx.get(["logo"], false),ctx,"h").w("\" /></div>").x(ctx.get(["isLive"], false),ctx,{"block":body_2},{}).w("</div><div class=\"anvato-overlay-engaged\"><div class=\"anvato-overlay__slimline\">").x(ctx.get(["isLive"], false),ctx,{"block":body_3},{}).w("<span class=\"anvato-overlay__title\">").f(ctx.get(["title"], false),ctx,"h").w("</span></div><a class=\"anvato-overlay__prompt-link\" href=\"").f(ctx.get(["liveLink"], false),ctx,"h").w("\">Get the full experience</a></div></div></div>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<span class=\"anvato-overlay__inline-onnow\">On Now </span>");}body_1.__dustBody=!0;function body_2(chk,ctx){return chk.w("<div class=\"anvato-overlay__live\">Live</div>");}body_2.__dustBody=!0;function body_3(chk,ctx){return chk.w("<span class=\"anvato-overlay__inline-live\">Live</span>");}body_3.__dustBody=!0;return body_0;})();;
// features/nbc_tve/templates/dust/anvato-cta.dust
(function(){dust.register("anvato-cta",body_0);function body_0(chk,ctx){return chk.w("<div class=\"anvato-cta\"><a class=\"cta-affiliate-link\" href=\"").f(ctx.get(["url"], false),ctx,"h").w("\" target=\"_blank\">").x(ctx.get(["logo"], false),ctx,{"block":body_1},{}).w("<div class=\"anvato-cta__desc-wrapper\"><div class=\"anvato-cta__desc-inner\"><div class=\"anvato-cta__desc\">").f(ctx.get(["description"], false),ctx,"h").w("</div><div class=\"icon icon-cta\"></div></div></div></a></div>");}body_0.__dustBody=!0;function body_1(chk,ctx){return chk.w("<img src=\"").f(ctx.get(["logo"], false),ctx,"h").w("\" class=\"anvato-cta__logo\">");}body_1.__dustBody=!0;return body_0;})();;
!function(a,b,c,d){var e=window.NBCTVE||{},f={},g={},h=window.console||{info:function(){},error:function(){},log:function(){}},i=Date.now||function(){return(new Date).getTime()},j=4,k=b.cookie("tve_debug");e.provider=void 0,e.authorized=void 0,e.authErrorMessage=void 0,e.hasEngaged=!1,e.isPickerOpen=!1,e.pickerTimeOut,e.inactivityTimerHandle=null,e.anvatoLocal=null,AnvatoPlayer.on("PROVIDER_SELECTED",function(a,b){b&&"TempPass-LongTTL"!==b&&"TempPass-ShortTTL"!==b&&e.setProvider(b)}),AnvatoPlayer.on("AUTHORIZATION_STATUS",function(a,b){e.setAuthorized(b),e.isDynamicLeadMode&&c.emit("user-authorization",b)}),AnvatoPlayer.on("USER_INTERACTION",function(){e.resetInactivityTimer()}),AnvatoPlayer.on("PROVIDER_IFRAME_INJECTED",function(){Drupal.behaviors.nbc_mvpd_auth.setPage("mvpd_dialog_login"),c.emit("user-initiated-auth-flow"),clearTimeout(e.pickerTimeOut),e.isPickerOpen=!0}),AnvatoPlayer.on("PREVIEW_STATUS",function(a,c,d,g){if("LONG"===c||"SHORT"===c){f.nbc_tve_messages&&f.nbc_tve_messages.anvato.temp_pass.enabled&&Drupal.behaviors.nbc_mvpd_auth.showPopupLoginMessage(b(".video-container"),{message:f.nbc_tve_messages.anvato.temp_pass.main_message,subline:f.nbc_tve_messages.anvato.temp_pass.subline,className:"no-checkmark"});var h=null===g?!0:g/1e3<moment().format("X");h||(e.anvatoLocal.passExpires=g,e.setProvider(d),e.overlay.setMode("preview"))}"ENTITLEMENT"===c&&null!==d&&(e.setProvider(d),e.overlay.setMode(e.isDynamicLeadMode?"auth":null)),"PASSIVE"===c&&(null===d&&null===g&&e.isDynamicLeadMode&&(e.setProvider("PASSIVE"),e.overlay.setMode("preview")),d&&e.provider&&(e.setProvider(e.provider),e.setAuthorized(!1)))}),AnvatoPlayer.on("PREVIEW_EXPIRED",function(a){a.setFullscreen(!1)}),AnvatoPlayer.on("PICKER_REQUESTED",function(){(e.authorized||!e.isAuthenticatedWithMVPD())&&(e.isDynamicLeadMode&&!e.isPickerOpen&&(e.isPickerOpen=!1,e.pickerTimeOut=setTimeout(function(){c.emit("mvpd-picker-idle-timeout")},f.mvpd_picker_idle_timeout)),e.setProvider(null))}),AnvatoPlayer.on("STATE_CHANGE",function(a,b){"videoPlay"===b&&c.emit("anvp-buffered"),"videoBuffering"===b&&c.emit("anvp-buffering")}),AnvatoPlayer.on("FIRST_FRAME_READY",function(){e.loadDeferred()}),AnvatoPlayer.on("PROGRAM_CHANGED",function(a,b){return b?Anvato.Schedule.setCurrentEventId(b)?void e.updateProgram():void h.log("NBCTVE PROGRAM_CHANGED: Skiping event, program already up to date."):void 0}),AnvatoPlayer.on("SEGMENT_TYPE_CHANGED",function(a,b){("ad"===b||"slate"===b)&&(e.cta.setProgram(null),c.trigger("tve-segment-ad")),"master"===b&&c.trigger("tve-segment-video")}),AnvatoPlayer.on("POPUP_BLOCKED",function(){Drupal.behaviors.nbc_mvpd_auth.stop(),e.showErrorMessage(Drupal.t("Please enable pop-ups in order to log in"))}),AnvatoPlayer.on("PLAYER_ERROR",function(a,b,c,d){d&&(Drupal.behaviors.nbc_mvpd_auth.stop(),e.getCustomErrorMessage(b,c).done(function(a){e.showErrorMessage(a),e.overlay.mode&&e.overlay.$el&&e.overlay.$el.hide()}))}),AnvatoPlayer.on("AD_STARTED",function(){f.ad&&b("#"+f.ad.id).empty()}),AnvatoPlayer.once("ready",function(){e.player("mute"),e.isDynamicLeadMode?e.setDynamicLeadMode():e.setDefaultMode()}),c.on("tve-engaged",function(){e.player("triggerUserInteraction")}),e.drupalInit=function(a,c){f=a,g=c;var h=d.getUserAgentError("live");return h?(e.showErrorMessage(h),b.Deferred().reject(h.message)):AnvatoLocation.getLocal().done(e.highlightLive).pipe(null,e.locationErrorMessage).pipe(e.filterLocalStations).pipe(e.appInit,e.showErrorMessage)},e.appInit=function(a){e.anvatoLocal=a,e.$app=b("#"+f.container.id);{var d=a.getStation();a.getUser()}e.isDynamicLeadMode=!!b("#"+f.container.id).closest(".dynamic-lead-slide").length,g.params.plugins.omniture=!1,f.ad&&(e.setCompanionAdToPlayer(f.ad,g.params),g.params.plugins&&g.params.plugins.freewheel&&d.callsign&&(g.params.plugins.freewheel.siteSectionId=Drupal.formatString(g.params.plugins.freewheel.siteSectionId,{"!callsign":d.callsign}),e.provider&&(g.params.plugins.freewheel.mvpd=e.provider)));{var h=AnvatoPlayer(g.params).fail(e.playerErrorMessage),i=e.updateProgram();b("<div/>",{"class":"strong-verify",text:"VERIFY NOW"}).prependTo(b(".header-search")).on("click",function(){c.emit("verify-now",this),e.player("authenticate",!0),e.player("mute")})}return b.when(i,h)},e.player=function(a){try{var b=Array.prototype.slice.call(arguments,1);return anvp[f.player.id][a].apply(anvp[f.player.id],b)}catch(c){k&&h.error("NBCTVE.player: Unable to call player method `"+a+"`")}},e.loadDeferred=function(){Drupal.js_defer_load&&Drupal.js_defer_load("anvato-deferred-start")},e.playerErrorMessage=function(a){return k&&h.error(a),e.showErrorMessage({html:!0,message:Drupal.t('We\'re experiencing technical difficulties. Please try reloading the page or <a href="@link" target="_blank">check our FAQ</a>.',{"@link":"/faq"})})},e.getCustomErrorMessage=function(a,c){var d=b.Deferred();switch(a){case"ACTRL030":d.resolve("We encountered a problem when trying to log you in, please refresh the page and try again");break;case"ACTRL031":var f="We encountered a problem when trying to log you in, please refresh the page and try again";e.isAuthenticatedWithMVPD()?MVPD.getProvider(e.provider).done(function(a){var b=a.authorized_err||("Internal Authorization Error"===c?f:c);d.resolve(b)}).fail(function(){d.resolve(f)}):d.resolve(f);break;case"ACTRL041":case"ACTRL042":d.resolve({html:!0,message:Drupal.t('Sorry, the billing address tied to your account does not have rights to view Live Stream. Please see <a href="@link" target="_blank">FAQ</a> to learn what locations have access to the Live Stream',{"@link":"/faq"})});break;case"ACTRL050":case"ACTRL052":d.resolve("Authentication timed out, please refresh the page and try again");break;case"LOAD010":try{e.player("unload")}catch(g){}d.resolve({html:!0,message:Drupal.t('Our service needs to use cookies; most likely, cookies are turned off in your browser preferences. Please refer to the <a href="@link" target="_blank">FAQ</a> to enable cookies.',{"@link":"/faq"})});break;default:d.resolve(c)}return d.promise()},e.locationErrorMessage=function(a){return k&&h.error(a),{html:!0,message:Drupal.t("Sorry, the live stream for your NBC local station is not available.")}},e.highlightLive=function(a){var c=a.getStation();c.has_tve_rights&&b("#main-menu .live").addClass("highlight")},e.filterLocalStations=function(a){var c=b.Deferred(),d=a.getStation();return d.has_tve_rights?c.resolve(a):c.reject(Drupal.t("Sorry, the live stream for your NBC local station is not available."))},e.isEventWhitelisted=function(a){var c;try{a=a||Anvato.Schedule.getCurrentEvent(),c=a.event_id}catch(d){return b.Deferred().reject("TVE-Whitelist: Localization failed to resolve current event")}var f=a.metadata.rovi_series_id;return f?e.preview.whitelistCheck(f):b.Deferred().reject(Drupal.formatString("TVE-Whitelist: Local Event !event_id is not associated to a Rovi Series ID.",{"!event_id":c}))};var l=2e3,m=3e3;e.showHeaderVerify=function(a){e.isAuthenticatedWithMVPD()||b(".header-search .strong-verify").fadeIn(a||l)},e.hideHeaderVerify=function(a){b(".header-search .strong-verify").fadeOut(a||l)},e.showHeaderMVPDLogo=function(a){b(".header-search #mvpd-header-container").fadeIn(a||l)},e.hideHeaderMVPDLogo=function(a){b(".header-search #mvpd-header-container").fadeOut(a||l)},e.setOverlayAnimationTo=function(a,b){var c=50,d=a.attr("animation-state");setTimeout(function(){"exiting"===b?a.attr("animation-state",d+"-"+b):a.attr("animation-state",b)},c)},e.setDynamicLeadMode=function(){var a=!1,d=0===b("#"+f.container.id).closest(".dynamic-lead-slide").index(),g=!1,h=b("#"+f.container.id);e.setOverlayAnimationTo(h,"preview"),c.on("dynamic-lead-transition-start",function(b){g=!b.isTveSlide&&d?!0:!1,g&&(e.setOverlayAnimationTo(h,"exiting"),e.hideHeaderVerify(),a&&(c.emit("tve-unengaged"),a=!1,e.hasEngaged=!1)),b.isTveSlide?(e.setOverlayAnimationTo(h,"preview"),e.showHeaderVerify(l),e.showHeaderMVPDLogo()):(e.hideHeaderVerify(),e.hideHeaderMVPDLogo()),e.player("mute"),e.player("hideControlBar"),d=!1}),c.on("dynamic-lead-transition-stop",function(a){d=a.isTveSlide}),h.on("mouseenter",function(){!a&&d&&(e.setOverlayAnimationTo(h,"engaged"),c.emit("tve-engaged"),e.player("showControlBar"),e.authorized&&e.player("unmute"),a=!0,e.hasEngaged=!0,e.updateProgram())});var i=b(".panel-2col-stacked-narrow-sidebar-on-middle.panel-display");c.on("tve-engaged",b.proxy(i,"addClass","video-list-slide-down")),c.on("tve-unengaged",b.proxy(i,"removeClass","video-list-slide-down"))},e.setDefaultMode=function(){var a=!1;e.hasEngaged=!1;var d=b("#"+f.container.id);e.player("unmute"),a||c.emit("tve-engaged"),e.showHeaderVerify(),d.on("mouseover",function(){e.resetInactivityTimer()})},e.overlay={},e.overlay.setMode=function(a){e.overlay.mode=a,e.overlay.update()},e.overlay.update=function(){return f.overlay?(e.overlay.$el||(e.overlay.$el=b("<div/>",{"class":"anvato-overlay-container"}).appendTo("#"+f.container.id+" .video-container").on("click",".anvato-overlay__prompt-auth",function(a){a.preventDefault(),e.player("authenticate",!0),e.player("mute")})),e.overlay.clock_timer&&(clearTimeout(e.overlay.clock_timer),e.overlay.clock_timer=null),e.overlay.countdown_timer&&(clearTimeout(e.overlay.countdown_timer),e.overlay.countdown_timer=null),e.overlay.mode?e.overlay.$el.dust("anvato-overlay-"+e.overlay.mode,e.overlay.getData()).done(function(a){"preview"===e.overlay.mode&&b(".anvato-overlay__prompt-auth",a).click(function(){c.emit("verify-now",this)})}).done(function(){e.overlay.$clock=b(" .anvato-overlay__time",e.overlay.$el),e.overlay.$countdown=b(" .anvato-overlay__countdown",e.overlay.$el)}).done(e.overlay.updateClock).done(e.overlay.updateCountdown).done(function(){e.overlay.$el.show()}):(e.overlay.$el.hide(),b.Deferred().resolve(e.overlay.$el))):b.Deferred().resolve()},e.overlay.getData=function(){return e.anvatoLocal.getStationData().pipe(function(a){var b={},c=Anvato.Schedule.getCurrentEvent(),d=Anvato.Schedule.getNextEvent();return b.title=c.title,b.nextTitle=d?d.title:"",b.rating=c.metadata.rovi_tv_rating,b.logo=a.logos["desktop-281x45-white"],b.logos=a.logos,b.description="",b.isOnNow=!0,b.isLive=!0,b.liveLink=e.addQueryToURL("/live","ref=full-experience-prompt"),b})},e.overlay.updateClock=function(){if(e.overlay.$clock.length){var a=moment().format("h:mm"),b=moment().format("a");e.overlay.$clock.html(a+'<span class="ampm">'+b+"</span>"),e.overlay.clock_timer=setTimeout(e.overlay.updateClock,3e4)}},e.overlay.updateCountdown=function(){if(e.overlay.$countdown.length){var a=e.anvatoLocal.passExpires-i();if(a>=0){var b=Math.floor(a/6e4)%60,c=Math.floor(a/1e3)%60;e.overlay.$countdown.html((10>b?"0":"")+b+":"+(10>c?"0":"")+c),e.overlay.coundown_timer=setTimeout(e.overlay.updateCountdown,1e3)}}},e.updateProgram=function(){return Anvato.Schedule.getEvents({count:j+1,airings:!!f.schedule}).pipe(function(){var a=Anvato.Schedule.getCurrentEvent(),d=Anvato.Schedule.getUpcomingEvents(j),g=[];return g.push(e.overlay.update()),f.details&&g.push(b("#"+f.details.id).dust("anvato-details",e.processDetailsData(a))),f.schedule&&g.push(b("#"+f.schedule.id).dust("anvato-schedule",e.processScheduleData(d)).done(b.proxy(c,"emit","anvato-schedule-template"))),f.cta&&e.cta.setProgram(a),g.push(e.isEventWhitelisted(a).done(b.proxy(c,"emit","tve-whitelist-status"))),b.when.apply(b,g)}).done(function(){k&&h.log("NBCTVE.updateProgram:: success")}).fail(function(a){k&&h.error("NBCTVE.updateProgram::",a)})},e.get=function(a){return"undefined"!=typeof e[a]?e[a]:void 0},e.processScheduleData=function(a){return e.anvatoLocal.getStationData().pipe(function(b){return{config:f.schedule,fullSchedulePath:e.addQueryToURL(f.schedule.href,"ref=livestream-schedule"),affiliate:{website:e.addQueryToURL(b.link,"ref=livestream"),logo:b.logos["desktop-0x68-color"]},items:a}})},e.processDetailsData=function(a){var b,c={program:{}};return c.program.title=a.title,c.program.rating=a.metadata.rovi_tv_rating,b=Anvato.Schedule.calculateDuration(a),c.program.duration=Anvato.Schedule.formatTime(b,"mm:ss"),c.isLive=!0,c},e.setCompanionAdToPlayer=function(a,b){var c={containers:[a.id],width:a.width,height:a.height};b.companions=b.companions||[],b.companions.push(c)},e.setProvider=function(a){if(a!==e.provider)if(e.provider=a,null===a)Drupal.behaviors.nbc_mvpd_auth.start(),d.setHeaderProvider(null),e.showHeaderVerify(l),e.setAuthorized(!1),b("#error-container").remove(),e.hidePlayer();else if("PASSIVE"===a)d.setHeaderProvider(null),e.showHeaderVerify(l),e.setAuthorized(!0);else if(a.match("TempPass"))Drupal.behaviors.nbc_mvpd_auth.stop(),d.setHeaderProvider(null),e.showHeaderVerify(l),e.setAuthorized(!0);else if(a){if(f.auth_redirect&&d.isAttemptingLogin)return void(document.location=f.auth_redirect);e.hideHeaderVerify(),Drupal.behaviors.nbc_mvpd_auth.stop(),d.setHeaderProvider(a).done(function(a){e.isDynamicLeadMode||a.delay(m).fadeIn(l)}),c.on("MVPDAuth::LOGOUT_ACTION",function(){e.setProvider(null)})}},e.isAuthenticatedWithMVPD=function(){return!(!e.provider||"PASSIVE"===e.provider||e.provider.match("TempPass"))},e.setAuthorized=function(a){a!==e.authorized&&(e.authorized=a,e.authorized&&(e.isAuthenticatedWithMVPD()&&!e.isDynamicLeadMode&&Drupal.behaviors.nbc_mvpd_auth.showPopupLoginMessage(b(".video-container"),{message:"You've successfully logged in.",subline:"Continue watching live."}),e.showPlayer()))},e.showAuthzMessage=function(a){b("#show-auth-msg").text(a)},e.cta={},e.cta.ANIMATION_DURATION=400,e.cta.setProgram=function(a){return!f.cta||e.isDynamicLeadMode===!0&&!e.hasEngaged||a&&a.event_id===e.cta.lastProgram||(b("#"+f.container.id+" .video-container .anvato-cta-container").clearQueue().remove(),!e.cta.isProgram(a))?void 0:(e.cta.lastProgram=a.event_id,b('<div class="anvato-cta-container"/>').dust("anvato-cta",e.cta.getProgram(a)).done(function(a){c.emit("anvato-cta-template",a)}).appendTo("#"+f.container.id+" .video-container").delayed("addClass","visible",f.cta.delay_in).delayed("removeClass","visible",f.cta.delay_out).delayed("remove",e.cta.ANIMATION_DURATION))},b.fn.delayed=function(a){var b=this,c=Array.prototype.slice.call(arguments,1),d=c.pop();return this.delay(d).queue(function(d){b[a].apply(b,c),d()})},e.cta.isProgram=function(a){return!(!a||!a.metadata.display_c2a)},e.cta.getProgram=function(a){var c=a.metadata.display_c2a;return b.getJSON("/proxy",{request:c}).pipe(function(a){var b={};return b.logo=a.imageurl,b.description=a.text,b.url=e.addQueryToURL(a.web_link,"ref=livestream-cta"),b})},e.getMobileDevice=function(){var a={isAndroid:function(){return navigator.userAgent.match(/Android/i)?!0:!1},isKindle:function(){return navigator.userAgent.match(/Kindle/i)?!0:!1},isiOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)?!0:!1},isOther:function(){return navigator.userAgent.match(/mobile|opera m/i)?!0:!1}};return a},e.showErrorMessage=function(a){return"string"==typeof a&&(a={message:a}),b("#error-container").remove(),e.hidePlayer(),e.loadDeferred(),b('<div id="error-container"/>').dust("player-error",a).done(function(a){c.emit("anvato-player-error-template",a)}).done(function(a){a.prependTo("#"+f.container.id+" .video-container")})},e.hidePlayer=function(){f.player&&f.player.id&&(b("#"+f.player.id).addClass("veil"),e.player("mute"))},e.showPlayer=function(){f.player&&f.player.id&&(b("#"+f.player.id).removeClass("veil"),e.isDynamicLeadMode||e.player("unmute")),b("#error-container").remove()},e.addQueryToURL=function(a,b){var c=document.createElement("a");return c.href=a,c.search=c.search?c.search.split("?")[1]+"&"+b:"?"+b,c.href},e.inactivityActions=function(){e.player("isFullscreen",function(a){a&&e.player("setFullscreen",!1)}),e.displayActivityConfirmation()},e.displayActivityConfirmation=function(){b('<div id="popup-container"/>').dust("user-inactivity-confirmation",{}).done(function(a){a.prependTo(".video-container"),b("#"+f.container.id).off("mouseover")}).on("click",".user-inactivity-confirmation .popup-button",function(){b(this).parent().hide(),e.resetInactivityTimer(),b("#"+f.container.id).on("mouseover",function(){e.resetInactivityTimer()})}),e.inactivityTimerHandle=setTimeout(e.displayInactivityError,e.activityConfirmationTimeout)},e.displayInactivityError=function(){e.removeInactivityConfirmationPopup(),setTimeout(function(){e.showErrorMessage(Drupal.t("Due to inactivity the playback has been stopped. To resume playback, reload the page.")),e.player("unload")},6e3)},e.removeInactivityConfirmationPopup=function(){b(".user-inactivity-confirmation").addClass("hide")},e.resetInactivityTimer=function(){clearTimeout(e.timerHandle),clearTimeout(e.inactivityTimerHandle),e.timerHandle=setTimeout(e.inactivityActions,e.inactivityTimeout)},a.NBCTVE=e}(this,jQuery,Events,MVPDAuth),function(a){Drupal.behaviors.nbcTveApp={attach:function(b,c){var d,e;c.nbctve&&(d=c.nbctve.app,e=c.anvatoPlayers[d.player.id],a("#"+d.container.id,b).once("nbc-tve-app",function(){NBCTVE.drupalInit(d,e),NBCTVE.inactivityTimeout=parseInt(d.user_inactivity_timeout,10)||0,NBCTVE.activityConfirmationTimeout=parseInt(d.user_inactivity_confirmation_timeout,10)||0,NBCTVE.timerHandle=setTimeout(NBCTVE.inactivityActions,NBCTVE.inactivityTimeout)}))}}}(jQuery);;

(function($) {

/**
 * Drupal FieldGroup object.
 */
Drupal.FieldGroup = Drupal.FieldGroup || {};
Drupal.FieldGroup.Effects = Drupal.FieldGroup.Effects || {};
Drupal.FieldGroup.groupWithfocus = null;

Drupal.FieldGroup.setGroupWithfocus = function(element) {
  element.css({display: 'block'});
  Drupal.FieldGroup.groupWithfocus = element;
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processFieldset = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any fieldsets containing required fields
      $('fieldset.fieldset', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $('legend span.fieldset-legend', $(this)).eq(0).append(' ').append($('.form-required').eq(0).clone());
        }
        if ($('.error', $(this)).length) {
          $('legend span.fieldset-legend', $(this)).eq(0).addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processAccordion = {
  execute: function (context, settings, type) {
    $('div.field-group-accordion-wrapper', context).once('fieldgroup-effects', function () {
      var wrapper = $(this);

      wrapper.accordion({
        autoHeight: false,
        active: '.field-group-accordion-active',
        collapsible: true,
        changestart: function(event, ui) {
          if ($(this).hasClass('effect-none')) {
            ui.options.animated = false;
          }
          else {
            ui.options.animated = 'slide';
          }
        }
      });

      if (type == 'form') {

        var $firstErrorItem = false;

        // Add required fields mark to any element containing required fields
        wrapper.find('div.field-group-accordion-item').each(function(i) {

          if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
            $('h3.ui-accordion-header a').eq(i).append(' ').append($('.form-required').eq(0).clone());
          }
          if ($('.error', $(this)).length) {
            // Save first error item, for focussing it.
            if (!$firstErrorItem) {
              $firstErrorItem = $(this).parent().accordion("activate" , i);
            }
            $('h3.ui-accordion-header').eq(i).addClass('error');
          }
        });

        // Save first error item, for focussing it.
        if (!$firstErrorItem) {
          $('.ui-accordion-content-active', $firstErrorItem).css({height: 'auto', width: 'auto', display: 'block'});
        }

      }
    });
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processHtabs = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any element containing required fields
      $('fieldset.horizontal-tabs-pane', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $(this).data('horizontalTab').link.find('strong:first').after($('.form-required').eq(0).clone()).after(' ');
        }
        if ($('.error', $(this)).length) {
          $(this).data('horizontalTab').link.parent().addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
          $(this).data('horizontalTab').focus();
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processTabs = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any fieldsets containing required fields
      $('fieldset.vertical-tabs-pane', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $(this).data('verticalTab').link.find('strong:first').after($('.form-required').eq(0).clone()).after(' ');
        }
        if ($('.error', $(this)).length) {
          $(this).data('verticalTab').link.parent().addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
          $(this).data('verticalTab').focus();
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 *
 * TODO clean this up meaning check if this is really
 *      necessary.
 */
Drupal.FieldGroup.Effects.processDiv = {
  execute: function (context, settings, type) {

    $('div.collapsible', context).once('fieldgroup-effects', function() {
      var $wrapper = $(this);

      // Turn the legend into a clickable link, but retain span.field-group-format-toggler
      // for CSS positioning.

      var $toggler = $('span.field-group-format-toggler:first', $wrapper);
      var $link = $('<a class="field-group-format-title" href="#"></a>');
      $link.prepend($toggler.contents());

      // Add required field markers if needed
      if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
        $link.append(' ').append($('.form-required').eq(0).clone());
      }

      $link.appendTo($toggler);

      // .wrapInner() does not retain bound events.
      $link.click(function () {
        var wrapper = $wrapper.get(0);
        // Don't animate multiple times.
        if (!wrapper.animating) {
          wrapper.animating = true;
          var speed = $wrapper.hasClass('speed-fast') ? 300 : 1000;
          if ($wrapper.hasClass('effect-none') && $wrapper.hasClass('speed-none')) {
            $('> .field-group-format-wrapper', wrapper).toggle();
          }
          else if ($wrapper.hasClass('effect-blind')) {
            $('> .field-group-format-wrapper', wrapper).toggle('blind', {}, speed);
          }
          else {
            $('> .field-group-format-wrapper', wrapper).toggle(speed);
          }
          wrapper.animating = false;
        }
        $wrapper.toggleClass('collapsed');
        return false;
      });

    });
  }
};

/**
 * Behaviors.
 */
Drupal.behaviors.fieldGroup = {
  attach: function (context, settings) {
    settings.field_group = settings.field_group || Drupal.settings.field_group;
    if (settings.field_group == undefined) {
      return;
    }

    // Execute all of them.
    $.each(Drupal.FieldGroup.Effects, function (func) {
      // We check for a wrapper function in Drupal.field_group as
      // alternative for dynamic string function calls.
      var type = func.toLowerCase().replace("process", "");
      if (settings.field_group[type] != undefined && $.isFunction(this.execute)) {
        this.execute(context, settings, settings.field_group[type]);
      }
    });

    // Fixes css for fieldgroups under vertical tabs.
    $('.fieldset-wrapper .fieldset > legend').css({display: 'block'});
    $('.vertical-tabs fieldset.fieldset').addClass('default-fallback');


    // Add a new ID to each fieldset.
    $('.group-wrapper fieldset').each(function() {
      // Tats bad, but we have to keep the actual id to prevent layouts to break.
      var fieldgorupID = 'field_group-' + $(this).attr('id') + ' ' + $(this).attr('id');
      $(this).attr('id', fieldgorupID);
    })
    // Set the hash in url to remember last userselection.
    $('.group-wrapper ul li').each(function() {
      var fieldGroupNavigationListIndex = $(this).index();
      $(this).children('a').click(function() {
        var fieldset = $('.group-wrapper fieldset').get(fieldGroupNavigationListIndex);
        // Grab the first id, holding the wanted hashurl.
        var hashUrl = $(fieldset).attr('id').replace(/^field_group-/, '').split(' ')[0];
        window.location.hash = hashUrl;
      });
    });
  }
};

})(jQuery);;
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing["jswing"]=jQuery.easing["swing"];jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;if(!g)g=e*.3*1.5;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;if((b/=e/2)<1)return d/2*b*b*(((f*=1.525)+1)*b-f)+c;return d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){if((b/=e)<1/2.75){return d*7.5625*b*b+c}else if(b<2/2.75){return d*(7.5625*(b-=1.5/2.75)*b+.75)+c}else if(b<2.5/2.75){return d*(7.5625*(b-=2.25/2.75)*b+.9375)+c}else{return d*(7.5625*(b-=2.625/2.75)*b+.984375)+c}},easeInOutBounce:function(a,b,c,d,e){if(b<e/2)return jQuery.easing.easeInBounce(a,b*2,0,d,e)*.5+c;return jQuery.easing.easeOutBounce(a,b*2-e,0,d,e)*.5+d*.5+c}})
/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */;
!function(t,e){function n(t,e,n){var s,i,r={},u=0;for(i in e)s=e[i],s.$el=t[s.el],r[s.start]?r[s.start].push(s):r[s.start]=[s],s.duration&&s.duration+s.start>u&&(u=s.duration+s.start);for(var o in r)setTimeout(a(r[o]),o);n&&setTimeout(n,u)}function a(t){return function(){for(var e=0,n=t.length;n>e;e++)s(t[e].$el,t[e].name,t[e].props,t[e].duration,t[e].easing)}}function s(t,n,a,s,u){u=u||"easeOutQuad",e.csstransitions&&e.csstransforms3d?(a=i(a),s?(t.addTransitionsAT(a,s,u),t.css(a)):(t.removeTranstionsAT(a),t.css(a))):(a=r(a),s?t.animate(a,s,u):t.css(a)),"block"===a.display&&t.offset().left}function i(t){var e={};for(var n in t)"left"!==n&&"top"!==n&&(e[n]=t[n]);return(t.left||t.top)&&(t.left=t.left||"0px",t.top=t.top||"0px",e[o]="translate("+t.left+","+t.top+")"),e}function r(t){var e={};for(var n in t)e[n]=t[n];return e}function u(t){return t&&t.replace(/([A-Z])/g,function(t,e){return"-"+e.toLowerCase()}).replace(/^ms-/,"-ms-")}t.fn.animatetimeline=function(t,e,a){t.el=this;for(var s in t)t[s]=this.find(t[s]);n(t,e,a)},t.animatetimeline=function(t,e,a){n(t,e,a)};var o=e.prefixed("transform"),f=u(o);t.fn.addTransitionsAT=function(t,n,a){var s,i=this.data("transitionsAT")||{},r=[];for(s in t)s===o&&(s=f),i[s]=s+" "+n+"ms cubic-bezier("+(c[a]||c.ease)+")";for(s in i)i[s]&&r.push(i[s]);return r=r.join(","),this[0].style[e.prefixed("transition")]=r,this.data("transitionsAT",i),this},t.fn.removeTranstionsAT=function(t){var n,a=this.data("transitionsAT")||{},s=[];for(n in t)n===o&&(n=f),a[n]="";for(n in a)a[n]&&s.push(a[n]);return s=s.join(","),this[0].style[e.prefixed("transition")]=s,this.data("transitionsAT",a),this};var c={ease:"0.250, 0.100, 0.250, 1.000",easeInQuad:"0.550, 0.085, 0.680, 0.530",easeInCubic:"0.550, 0.055, 0.675, 0.190",easeInQuart:"0.895, 0.030, 0.685, 0.220",easeInQuint:"0.755, 0.050, 0.855, 0.060",easeInSine:"0.470, 0.000, 0.745, 0.715",easeInExpo:"0.950, 0.050, 0.795, 0.035",easeInCirc:"0.600, 0.040, 0.980, 0.335",easeInBack:"0.600, -0.280, 0.735, 0.045",easeOutQuad:"0.250, 0.460, 0.450, 0.940",easeOutCubic:"0.215, 0.610, 0.355, 1.000",easeOutQuart:"0.165, 0.840, 0.440, 1.000",easeOutQuint:"0.230, 1.000, 0.320, 1.000",easeOutSine:"0.390, 0.575, 0.565, 1.000",easeOutExpo:"0.190, 1.000, 0.220, 1.000",easeOutCirc:"0.075, 0.820, 0.165, 1.000",easeOutBack:"0.175, 0.885, 0.320, 1.275",easeInOutQuad:"0.455, 0.030, 0.515, 0.955",easeInOutCubic:"0.645, 0.045, 0.355, 1.000",easeInOutQuart:"0.770, 0.000, 0.175, 1.000",easeInOutQuint:"0.860, 0.000, 0.070, 1.000",easeInOutSine:"0.445, 0.050, 0.550, 0.950",easeInOutExpo:"1.000, 0.000, 0.000, 1.000",easeInOutCirc:"0.785, 0.135, 0.150, 0.860",easeInOutBack:"0.680, -0.550, 0.265, 1.550"}}(jQuery,Modernizr);;
!function(a,b,c){function d(a,d){var f=this;this.$el=c(a),this.options=c.extend({},g,d),this.transition=h,this.isAutoSlideEnabled=this.options.autoSlide,this.autoSlideTimer=null,this.idleTimer=null,this.isIdle=!0,this.isAnimating=!1,this.currentSlide=0,this.hasTveSlide=!1,b.on("mvpd-picker-idle-timeout",function(){f.nextSlide(),f.autoSlidePlay()}),b.on("user-initiated-auth-flow",function(){f.pauseAutoSlide()}),this.slides=c.map(c(".dynamic-lead-slide",this.$el),function(a,b){return"tve"===f.options.slides[b].type?(f.hasTveSlide=!0,new e(a,b,!0)):new e(a,b)}),this.options.directionNav&&this.slides.length>1&&(this.directionalNav=c('<div class="dynamic-lead-navigation"><a href="#" class="dynamic-lead-navigation-link prev"></a><a href="#" class="dynamic-lead-navigation-link next"></a></div>'),c(".dynamic-lead-navigation-link",this.directionalNav).on("click",function(a){var b=f.slides[f.currentSlide];a.preventDefault(),f.options.manualOnAction&&f.disableAutoSlide(),c(this).hasClass("prev")?f.prevSlide():c(this).hasClass("next")&&f.nextSlide(),b.isTveSlide&&f.enableAutoSlide()}),this.$el.append(this.directionalNav)),this.options.touchNav&&this.slides.length>1&&(this.$el.hammer({}).on("swipeleft",function(){f.options.manualOnAction&&f.disableAutoSlide(),f.nextSlide()}),this.$el.hammer({}).on("swiperight",function(){f.options.manualOnAction&&f.disableAutoSlide(),f.prevSlide()})),this.$el.on("mouseenter mousemove",function(){var a=f.slides[f.currentSlide];f.idleTimerSetNotIdle(),f.idleTimerStart(),a.isTveSlide?f.pauseAutoSlide():f.autoSlidePlay()}).on("mouseleave",function(){f.idleTimerStop(),f.idleTimerSetIdle()}),this.$el.data("nbc_dynamic_lead",this),this.autoSlidePlay()}function e(a,d,e){var g=c(a),h=0===d,i=!1,j=!1,k=!0,l=!0;return g.isTveSlide=e||!1,g.slideBack=g.find(".field-name-field-dl-slide-image"),g.slideText=g.find(".dynamic-lead-slide-text"),g.isTveSlide&&(j=!1,b.on("anvp-buffered",function(){h=!0}),b.on("anvp-buffering",function(){h=!1}),b.on("tve-whitelist-status",function(a){j=a}),b.on("tve-segment-ad",function(){k=!0}),b.on("tve-segment-video",function(){k=!1}),b.on("user-authorization",function(a){l=a})),g.isSlideReady=function(){return h},g.isSlideAllowed=function(){if(g.isTveSlide){var a=[];if(h||a.push(g.find(".nbc-tve-app").length?"the tve slide does not have the tve block":"the player is not buffered"),j||a.push("the program is not whitelisted"),k&&a.push("the stream is currently in an ad break"),l||a.push("the user is not authorized to view the content"),a.length)return c.cookie("tve_debug")&&console.info("Skipping the TVE Slide because:\n	"+a.join("\n	")),!1}return!0},g.onSlideReady=function(a){if(h)return void a();if(!i&&!g.isTveSlide){i=!0;var b=g.find(".dynamic-lead-image").attr("data-src");f(b,function(){g.find(".dynamic-lead-image").css({"background-image":'url("'+b+'")'}),i=!1,h=!0,a()})}},g}function f(a,b){var c=new Image;c.src=a,c.complete?b():c.onload=b}a.behaviors.nbc_dynamic_lead={attach:function(b){c(".view-id-nbc_dynamic_lead_slider_queue",b).once("nbc_dynamic_lead",function(){var b=a.settings.NBCDynamicLead||{};c(this).data("nbc_dynamic_lead",new d(this,b))})}},c.fn.nbc_dynamic_lead=function(a){var b=c(this).data("nbc_dynamic_lead");if(b){var d=Array.prototype.slice.call(arguments,1);b[a].apply(b,d)}};var g={autoSlide:!0,autoSlideTimer:5e3,autoSlideTVESlideTimer:5e3,idleTimer:3e3,manualOnAction:!0,directionNav:!0,touchNav:!0},h={dynamic_lead:{old:{prev:[{start:0,el:"oldBack",props:{opacity:1,zIndex:7}},{start:0,el:"oldText",props:{left:"0px",opacity:1,zIndex:11}},{start:0,el:"oldBack",props:{opacity:0},duration:2e3},{start:0,el:"oldText",props:{left:"-15px",opacity:0},duration:1e3},{start:1060,el:"oldText",props:{display:"none"}},{start:2060,el:"oldBack",props:{zIndex:5,display:"none"}}],next:[{start:0,el:"oldBack",props:{opacity:1,zIndex:7}},{start:0,el:"oldText",props:{left:"0px",opacity:1,zIndex:11}},{start:0,el:"oldBack",props:{opacity:0},duration:2e3},{start:0,el:"oldText",props:{left:"15px",opacity:0},duration:1e3},{start:1060,el:"oldText",props:{display:"none"}},{start:2060,el:"oldBack",props:{zIndex:5,display:"none"}}]},"new":{prev:[{start:0,el:"newBack",props:{opacity:0,zIndex:5}},{start:0,el:"newText",props:{left:"15px",opacity:0,zIndex:10}},{start:0,el:"newBack",props:{display:"block"}},{start:0,el:"newText",props:{display:"block"}},{start:0,el:"newBack",props:{opacity:1},duration:2e3},{start:1e3,el:"newText",props:{left:"0px",opacity:1},duration:1e3}],next:[{start:0,el:"newBack",props:{opacity:0,zIndex:5}},{start:0,el:"newText",props:{left:"-15px",opacity:0,zIndex:10}},{start:0,el:"newBack",props:{display:"block"}},{start:0,el:"newText",props:{display:"block"}},{start:0,el:"newBack",props:{opacity:1},duration:2e3},{start:1e3,el:"newText",props:{left:"0px",opacity:1},duration:1e3}]}},tve:{old:{prev:[{start:0,el:"oldContent",props:{opacity:1,zIndex:7}},{start:0,el:"oldText",props:{left:"0px",opacity:1}},{start:0,el:"oldContent",props:{opacity:0},duration:2e3},{start:0,el:"oldText",props:{left:"-15px",opacity:0},duration:1e3},{start:1060,el:"oldText",props:{display:"none"}},{start:2060,el:"oldContent",props:{zIndex:5,display:"none"}}],next:[{start:0,el:"oldContent",props:{opacity:1,zIndex:7}},{start:0,el:"oldText",props:{left:"0px",opacity:1,zIndex:11}},{start:0,el:"oldContent",props:{opacity:0},duration:2e3},{start:0,el:"oldText",props:{left:"15px",opacity:0},duration:1e3},{start:1060,el:"oldText",props:{display:"none"}},{start:2060,el:"oldContent",props:{zIndex:5,display:"none"}}]},"new":{prev:[{start:0,el:"newContent",props:{opacity:1,zIndex:5},duration:2e3},{start:0,el:"newText",props:{left:"15px",opacity:0,zIndex:10}},{start:0,el:"newContent",props:{display:"block"}},{start:0,el:"newText",props:{display:"block"}},{start:1e3,el:"newText",props:{left:"0px",opacity:1},duration:1e3}],next:[{start:0,el:"newContent",props:{opacity:1,zIndex:5},duration:2e3},{start:0,el:"newText",props:{left:"-15px",opacity:0,zIndex:10}},{start:0,el:"newContent",props:{display:"block"}},{start:0,el:"newText",props:{display:"block"}},{start:1e3,el:"newText",props:{left:"0px",opacity:1},duration:1e3}]}}};d.prototype.goToSlide=function(a){if(this.slides.length&&!(this.slides.length<2)&&a!==this.currentSlide){if(this.isAnimating)return!1;var d=a;0>a?d=this.slides.length-1:a>=this.slides.length&&(d=0);var e=this.slides[d],f=this.slides[this.currentSlide];if(e.isSlideAllowed())if(e.isSlideReady()){this.pauseAutoSlide();var g=a>this.currentSlide?"next":"prev",h=this.getSlideTransitions(f,e,g),i=this.getSlideTransitionElements(f,e);this.isAnimating=!0,b.emit("dynamic-lead-transition-start",e),c.animatetimeline(i,h,c.proxy(this.onSlideTransitionComplete,this,d))}else this.pauseAutoSlide(),e.onSlideReady(c.proxy(this.goToSlide,this,a));else a+=a>this.currentSlide?1:-1,this.goToSlide(a)}},d.prototype.getSlideTransitions=function(a,b,d){var e=this,f=function(a,b,c){var d=a.isTveSlide?"tve":"dynamic_lead",f=b?"new":"old";return e.transition[d][f][c]},g=f(a,!1,d),h=f(b,!0,d);return c.merge(c.merge([],g),h)},d.prototype.getSlideTransitionElements=function(a,b){var d=a.isTveSlide?{oldContent:a.find(".nbc-tve-app"),oldText:a.find(".anvato-overlay-container")}:{oldBack:a.slideBack,oldText:a.slideText},e=b.isTveSlide?{newContent:b.find(".nbc-tve-app"),newText:b.find(".anvato-overlay-container")}:{newBack:b.slideBack,newText:b.slideText};return c.extend({},d,e)},d.prototype.onSlideTransitionComplete=function(a){this.isAnimating=!1,this.currentSlide=a,b.emit("dynamic-lead-transition-stop",this.slides[a]),this.autoSlidePlay()},d.prototype.nextSlide=function(){this.goToSlide(this.currentSlide+1)},d.prototype.prevSlide=function(){this.goToSlide(this.currentSlide-1)},d.prototype.pauseAutoSlide=function(){null!==this.autoSlideTimer&&(clearTimeout(this.autoSlideTimer),this.autoSlideTimer=null)},d.prototype.disableAutoSlide=function(){this.isAutoSlideEnabled=!1,this.pauseAutoSlide()},d.prototype.enableAutoSlide=function(){this.isAutoSlideEnabled=!0,this.autoSlidePlay()},d.prototype.autoSlidePlay=function(){if(this.isAutoSlideEnabled&&null===this.autoSlideTimer){var a=this.options.autoSlideTimer,b=this.options.slides[this.currentSlide];"tve"===b.type&&(a=this.options.autoSlideTVESlideTimer);var c=this;this.autoSlideTimer=setTimeout(function(){c.autoSlideTimer=null,c.nextSlide()},a)}},d.prototype.setTransition=function(a){this.transition=a},d.prototype.idleTimerStart=function(){this.idleTimerStop(),this.idleTimer=setTimeout(c.proxy(this.idleTimerSetIdle,this),this.options.idleTimer)},d.prototype.idleTimerStop=function(){null!==this.idleTimer&&(clearTimeout(this.idleTimer),this.idleTimer=null)},d.prototype.idleTimerSetIdle=function(){this.isIdle||(this.isIdle=!0,this.$el.removeClass("not-idle"))},d.prototype.idleTimerSetNotIdle=function(){this.isIdle&&(this.isIdle=!1,this.$el.addClass("not-idle"))}}(Drupal,Events,jQuery);;
!function(a,b){function c(){function a(a){var c=b(this),e=c.index();a.preventDefault(),c.hasClass("active")||(c.siblings().removeClass("active"),c.addClass("active"),d.hide(),d.eq(e).show())}var c=b(".home-page-featured-video-tabs .views-row",this),d=b(".home-page-featured-video-content .views-row",this);c.first().addClass("active"),c.on("click.homePageFeaturedVideo",a)}a.behaviors.homePageVideoTabs={attach:function(a){b(".home-page-featured-video",a).once("homePageVideoTabs",c)}}}(Drupal,jQuery);;
/**
 * NBC.com SiteCanvas
 * Protocol for XS communication over postMessage
 * http://www.nbc.com/
 */
(function () {
  var win = window;
  var frames = {};
  var numFrames = 0;
  var allowWidth = false;
  var allowHeight = true;

  /**
   * Initialize the parent
   * 1. Provide the interface globally
   * 2. Listen for events from parent
   */
  function init () {
    win.SiteCanvas = PageInterface;
    on(win, 'message', onMessage);
  }


  /**
   * Received a message from a child frame
   * Messages to te client should look like
   * "SiteCanvas::fn_name::arg1,arg2,arg3"
   *
   * @param {Event} event
   */
  function onMessage (event) {
    if (typeof event.data !== 'string') {
      return;
    }
    var message = event.data || '';
    var parts = message.split('::');
    if (parts.length !== 3 || parts[0] !== 'SiteCanvas') {
      return;
    }
    var fn = parts[1];
    var args = parts[2].split(',');
    var frame = frames[args.shift()];
    args.unshift(frame);
    if (event.origin !== frame.origin && frame.origin !== '*') {
      warn('Message origin did match Frame origin');
      return;
    }
    if (!FrameInterface[fn]) {
      warn('FrameInterface::' + fn + ' does not exist');
      return;
    }
    FrameInterface[fn].apply(this, args);
  }

  /**
   * Sends a message to a child frame
   *
   * @param {string} frame_id
   *   The html ID frame to commuincate to
   * @param {string} fn_name
   *   The function to call on other frame
   * @param …
   *   Other arguments to pass client function
   */
  function sendMessage (frame_id, fn_name) {
    var args = Array.prototype.slice.call(arguments, 2);
    frames[frame_id].el.contentWindow.postMessage(
      'SiteCanvas::' + fn_name + '::' + args.join(','),
      frames[frame_id].origin
    );
  }

  /**
   * FrameInterface is a set of methods we expose to child frames
   * The methods are called via onMessage
   * The first param is always the originating frame
   */
  var FrameInterface = {};
  /**
   * The initializer helps the child frame identify itself
   */
  FrameInterface.init = function (frame) {
    sendMessage(frame.id, 'init', frame.id);
  };
  /**
   * Sets the size of the child frame
   * @param {DOMElement} frame
   *   An element of the frame we will manipulate
   * @param {int} width
   *   The desired width to set the frame to
   * @param {int} height
   *   The desired width to set the frame to
   */
  FrameInterface.setSize = function (frame, width, height) {
    width -= 0;
    height -= 0;
    if (allowWidth && width !== frame.width) {
      frame.el.style.width = width + 'px';
      frame.width = width;
    }
    if (allowHeight && height !== frame.height) {
      frame.el.style.height = height + 'px';
      frame.height = height;
    }
  };
  /**
   * Sets or unsets a close confirmation message
   * @param {DOMElement} frame
   *   An element of the frame we will manipulate
   * @param {string} confirmMessage
   *   The desired confirmation to set or the empty string to unset
   */
  FrameInterface.setCloseConfirm = function (frame, confirmMessage) {
    // Just in case we parsed the commas, let's bring those back
    if (arguments.length > 2) {
      confirmMessage = Array.prototype.join.call(arguments, ',');
    }
    if (confirmMessage && !window.onbeforeunload) {
      window.onbeforeunload = onUnloadMessage;
    }
    if (!confirmMessage && window.onbeforeunload) {
      window.onbeforeunload = null;
    }
    FrameInterface.confirmMessage = confirmMessage;
    // http://www.opera.com/support/kb/view/827/
    try {
      window.opera.setOverrideHistoryNavigationMode('compatible');
      history.navigationMode = 'compatible';
    }
    catch(e){}
  };
  function onUnloadMessage (event) {
    if (event.returnVal) {
      event.returnVal = FrameInterface.confirmMessage;
    }
    return FrameInterface.confirmMessage;
  }
  /**
   * Sets the frame to listen to resize events
   */
  FrameInterface.setResizeListener = function (frame) {
    on(window, 'resize', function () {
      FrameInterface.getViewportDimensions(frame);
    });
  };

  /**
   * Calculates this parent frame's dimensions
   * Delivers to client by funciton call
   */
  FrameInterface.getViewportDimensions = function (frame) {
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    sendMessage(frame.id, 'setViewportDimensions', width,  height);
  };

  /**
   * PageInterface is a set of methods exposted to the page.
   */
  var PageInterface = {};
  /**
   * Registers frame to our list,
   *  Sets up event listeners
   *
   * @param {DOMElement} el
   */
  PageInterface.registerFrame = function (el) {
    var id = el.id;
    if (!id) {
      el.id = id = 'site-canvas-' + (numFrames + 1);
    }
    var frame = frames[id] = {
      el: el,
      id: id,
      width: el.offsetWidth,
      height: el.offsetHeight,
      origin: getOriginURI( parseURI(el.getAttribute('src')) )
    };
    numFrames++;
    FrameInterface.init(frame);
    on(el, 'load', function () {
      FrameInterface.init(frame);
      FrameInterface.getViewportDimensions(frame);
    });
  };

  /**
   * Returns a parsed URI object from a string
   *
   * @param {object} uri
   * @return {string}
   */
  function getOriginURI (uri) {
    if (uri.host) {
      return (uri.protocol || location.protocol || '') + '//' + uri.host + (uri.port ? ':' + uri.port : '');
    }
    if (location.host) {
      return (location.protocol || '') + '//' + location.host + (location.port ? ':' + location.port : '');
    }
    return '*';
  }

  /**
   * Utitily. Returns a parsed URI object from a string
   * Mostly consistent with Location
   *
   * @param {string} uri
   * @return {object}
   */
  function parseURI (uri) {
    var split = uri.match(parseURI.rx);
    return {
      protocol: split[1] && split[1] + ':',
      user_info: split[2],
      host: split[3],
      port: split[4],
      path: split[5],
      query_data: split[6],
      fragment: split[7]
    };
  }
  parseURI.rx = new RegExp(
    '^' +
    '(?:' +
    // scheme - ignore special characters used by other URL parts such as :, ?, /, #, and .
    '([^:/?#.]+)' +
    ':)?' +
    '(?://' +
    // userInfo
    '(?:([^/?#]*)@)?' +
    // host - restrict to letters, digits, dashes, dots, percent
    // escapes, and unicode characters.
    '([\\w\\d\\-\\u0100-\\uffff.%]*)' +
    // port
    '(?::([0-9]+))?' +
    ')?' +
    // path
    '([^?#]+)?' +
     // query 
    '(?:\\?([^#]*))?' +
    // fragment
    '(?:#(.*))?' +
    '$'
  );

  /**
   * Utitily. Deliver Error mesage to console
   * @param {string} message to display
   */
  function warn (message) {
    if (win.console && win.console.warn) {
      win.console.warn('[SiteCanvas] ' + message);
    }
  }

  /**
   * Utitily. Cross-browser addEventListener
   * @param {DOMElement} el - the element to listen to
   * @param {string} ev - event name
   * @param {function} fn - the listener
   */
  function on (el, ev, fn) {
    if (el.addEventListener) {
      el.addEventListener(ev, fn, false);
      return true;
    }
    else if (el.attachEvent) {
      return el.attachEvent('on' + ev, fn);
    }
  }

  init();
}());
;
!function(a,b){a.behaviors.iframeAutosize={attach:function(a){b.map(b("iframe.autosize",a),SiteCanvas.registerFrame)}}}(Drupal,jQuery);;
!function(a,b){a.behaviors.breakingNewsPopulateBar={attach:function(){var c=function(){var a=b.cookie("closed_bnb")||"[]";return window.JSON.parse(a)},d=function(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return!0};b("#breaking-news-container:not(.breaking-news-processed)").size()&&(b.getJSON(a.settings.basePath+"breaking-news?timezone="+encodeURIComponent(nbc.timezone),function(e,f){var g=c();"success"===f&&"success"===e.status&&e.data&&!d(g,parseInt(e.nid,10))&&(b("#breaking-news-container").append(a.theme("breakingNewsBar",e.data,e.nid,e.title,e.url,e.newWindow)).css("background-color","#"+e.color),b("#breaking-news-container a.breaking-news-close-button").on("click",function(a){a.preventDefault(),b(this).parent().remove();var d=c();d.push(b(this).data("nid")),b.cookie("closed_bnb",window.JSON.stringify(d),{expires:30,path:"/"})}))}),b("#breaking-news-container").addClass("breaking-news-processed"))}},a.theme.prototype.breakingNewsBar=function(a,b,c,d,e){var f='<div class="breaking-news-content">';if(d){var g=e?' target="_blank"':"";f+='<a class="breaking-news-link" href="'+d+'"'+g+">"}return f+='<div class="breaking-news-arrow"></div><span class="breaking-news-text">'+c+":&nbsp"+a+"</span>",d&&(f+="</a>"),f+='<a data-nid="'+b+'" class="close-button breaking-news-close-button" href="#"></a></div>'}}(Drupal,jQuery);;
