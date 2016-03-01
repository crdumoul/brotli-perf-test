!function(){function g(a){a.fn.swiper=function(h){var e;
return a(this).each(function(){var i=new Swiper(this,h);
e||(e=i)
}),e
}
}window.Swiper=function(ad,ah){function Q(){return"horizontal"===ac.params.direction
}function N(l){var i,h,k=function(){"undefined"!=typeof ac&&null!==ac&&(void 0!==ac.imagesLoaded&&ac.imagesLoaded++,ac.imagesLoaded===ac.imagesToLoad.length&&(ac.update(),ac.params.onImagesReady&&ac.params.onImagesReady(ac)))
};
l.complete?k():(h=l.currentSrc||l.getAttribute("src"),h?(i=new Image,i.onload=k,i.onerror=k,i.src=h):k())
}function Z(){ac.autoplayTimeoutId=setTimeout(function(){ac.params.loop?(ac.fixLoop(),ac._slideNext()):ac.isEnd?ah.autoplayStopOnLast?ac.stopAutoplay():ac._slideTo(0):ac._slideNext()
},ac.params.autoplay)
}function V(l,i){var h=W(l.target);
if(!h.is(i)){if("string"==typeof i){h=h.parents(i)
}else{if(i.nodeType){var k;
return h.parents().each(function(n,m){m===i&&(k=i)
}),k?i:void 0
}}}return 0===h.length?void 0:h[0]
}function U(l,i){i=i||{};
var h=window.MutationObserver||window.WebkitMutationObserver,k=new h(function(a){a.forEach(function(){ac.onResize()
})
});
k.observe(l,{attributes:"undefined"==typeof i.attributes?!0:i.attributes,childList:"undefined"==typeof i.childList?!0:i.childList,characterData:"undefined"==typeof i.characterData?!0:i.characterData}),ac.observers.push(k)
}function X(v){v.originalEvent&&(v=v.originalEvent);
var y=v.keyCode||v.charCode;
if(!(v.shiftKey||v.altKey||v.ctrlKey||v.metaKey)){if(document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase())){return !1
}if(37===y||39===y||38===y||40===y){var x=!1;
if(ac.container.parents(".swiper-slide").length>0&&0===ac.container.parents(".swiper-slide-active").length){return
}for(var z={left:window.pageXOffset,top:window.pageYOffset},u=window.innerWidth,m=window.innerHeight,k=ac.container.offset(),r=[[k.left,k.top],[k.left+ac.width,k.top],[k.left,k.top+ac.height],[k.left+ac.width,k.top+ac.height]],w=0;
w<r.length;
w++){var h=r[w];
h[0]>=z.left&&h[0]<=z.left+u&&h[1]>=z.top&&h[1]<=z.top+m&&(x=!0)
}if(!x){return
}}Q()?((37===y||39===y)&&(v.preventDefault?v.preventDefault():v.returnValue=!1),39===y&&ac.slideNext(),37===y&&ac.slidePrev()):((38===y||40===y)&&(v.preventDefault?v.preventDefault():v.returnValue=!1),40===y&&ac.slideNext(),38===y&&ac.slidePrev())
}}function ae(l){l.originalEvent&&(l=l.originalEvent);
var i=ac._wheelEvent,h=0;
if(l.detail){h=-l.detail
}else{if("mousewheel"===i){if(ac.params.mousewheelForceToAxis){if(Q()){if(!(Math.abs(l.wheelDeltaX)>Math.abs(l.wheelDeltaY))){return
}h=l.wheelDeltaX
}else{if(!(Math.abs(l.wheelDeltaY)>Math.abs(l.wheelDeltaX))){return
}h=l.wheelDeltaY
}}else{h=l.wheelDelta
}}else{if("DOMMouseScroll"===i){h=-l.detail
}else{if("wheel"===i){if(ac.params.mousewheelForceToAxis){if(Q()){if(!(Math.abs(l.deltaX)>Math.abs(l.deltaY))){return
}h=-l.deltaX
}else{if(!(Math.abs(l.deltaY)>Math.abs(l.deltaX))){return
}h=-l.deltaY
}}else{h=Math.abs(l.deltaX)>Math.abs(l.deltaY)?-l.deltaX:-l.deltaY
}}}}}if(ac.params.freeMode){var k=ac.getWrapperTranslate()+h;
if(k>0&&(k=0),k<ac.maxTranslate()&&(k=ac.maxTranslate()),ac.setWrapperTransition(0),ac.setWrapperTranslate(k),ac.updateProgress(),ac.updateActiveIndex(),0===k||k===ac.maxTranslate()){return
}}else{(new Date).getTime()-ac._lastWheelScrollTime>60&&(0>h?ac.slideNext():ac.slidePrev()),ac._lastWheelScrollTime=(new Date).getTime()
}return ac.params.autoplay&&ac.stopAutoplay(),l.preventDefault?l.preventDefault():l.returnValue=!1,!1
}function R(p,l){p=W(p);
var h,m,k,u,r;
h=p.attr("data-swiper-parallax"),m=p.attr("data-swiper-parallax-x"),k=p.attr("data-swiper-parallax-y"),m||k||!h?(m=m?m:"0",k=k?k:"0"):Q()?(m=h,k="0"):(k=h,m="0"),m=m.indexOf("%")>=0?parseInt(m,10)*l+"%":m*l+"px",k=k.indexOf("%")>=0?parseInt(k,10)*l+"%":k*l+"px",u=m,r=k,p.transform("translate3d("+u+", "+r+",0px)")
}var K={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:0.94},fade:{crossFade:!1},parallax:!1,scrollbar:null,scrollbarHide:!0,keyboardControl:!1,mousewheelControl:!1,mousewheelForceToAxis:!1,hashnav:!1,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:0.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,pagination:null,paginationClickable:!1,paginationHide:!1,resistance:!0,resistanceRatio:0.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,releaseFormElements:!0,slideToClickedSlide:!1,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationHiddenClass:"swiper-pagination-hidden",observer:!1,observeParents:!1,runCallbacksOnInit:!0};
ah=ah||{};
for(var af in K){if("undefined"==typeof ah[af]){ah[af]=K[af]
}else{if("object"==typeof ah[af]){for(var aa in K[af]){"undefined"==typeof ah[af][aa]&&(ah[af][aa]=K[af][aa])
}}}}var ac=this;
ac.params=ah;
var W;
if(W="undefined"==typeof c?window.Dom7||window.Zepto||window.jQuery:c,W&&(ac.container=W(ad),0!==ac.container.length)){if(ac.container.length>1){return void ac.container.each(function(){new Swiper(this,ah)
})
}ac.container[0].swiper=ac,ac.container.data("swiper",ac),ac.container.addClass("swiper-container-"+ac.params.direction),ac.params.freeMode&&ac.container.addClass("swiper-container-free-mode"),(ac.params.parallax||ac.params.watchVisibility)&&(ac.params.watchSlidesProgress=!0),["cube","coverflow"].indexOf(ac.params.effect)>=0&&(ac.support.transforms3d?(ac.params.watchSlidesProgress=!0,ac.container.addClass("swiper-container-3d")):ac.params.effect="slide"),"slide"!==ac.params.effect&&ac.container.addClass("swiper-container-"+ac.params.effect),"cube"===ac.params.effect&&(ac.params.resistanceRatio=0,ac.params.slidesPerView=1,ac.params.slidesPerColumn=1,ac.params.slidesPerGroup=1,ac.params.centeredSlides=!1,ac.params.spaceBetween=0),"fade"===ac.params.effect&&(ac.params.watchSlidesProgress=!0,ac.params.spaceBetween=0),ac.params.grabCursor&&ac.support.touch&&(ac.params.grabCursor=!1),ac.wrapper=ac.container.children("."+ac.params.wrapperClass),ac.params.pagination&&(ac.paginationContainer=W(ac.params.pagination),ac.params.paginationClickable&&ac.paginationContainer.addClass("swiper-pagination-clickable")),ac.rtl=Q()&&("rtl"===ac.container[0].dir.toLowerCase()||"rtl"===ac.container.css("direction")),ac.rtl&&ac.container.addClass("swiper-container-rtl"),ac.rtl&&(ac.wrongRTL="-webkit-box"===ac.wrapper.css("display")),ac.translate=0,ac.progress=0,ac.velocity=0,ac.lockSwipeToNext=function(){ac.params.allowSwipeToNext=!1
},ac.lockSwipeToPrev=function(){ac.params.allowSwipeToPrev=!1
},ac.lockSwipes=function(){ac.params.allowSwipeToNext=ac.params.allowSwipeToPrev=!1
},ac.unlockSwipeToNext=function(){ac.params.allowSwipeToNext=!0
},ac.unlockSwipeToPrev=function(){ac.params.allowSwipeToPrev=!0
},ac.unlockSwipes=function(){ac.params.allowSwipeToNext=ac.params.allowSwipeToPrev=!0
},ac.params.slidesPerColumn>1&&ac.container.addClass("swiper-container-multirow"),ac.params.grabCursor&&(ac.container[0].style.cursor="move",ac.container[0].style.cursor="-webkit-grab",ac.container[0].style.cursor="-moz-grab",ac.container[0].style.cursor="grab"),ac.imagesToLoad=[],ac.imagesLoaded=0,ac.preloadImages=function(){ac.imagesToLoad=ac.container.find("img");
for(var a=0;
a<ac.imagesToLoad.length;
a++){N(ac.imagesToLoad[a])
}},ac.autoplayTimeoutId=void 0,ac.autoplaying=!1,ac.autoplayPaused=!1,ac.startAutoplay=function(){return"undefined"!=typeof ac.autoplayTimeoutId?!1:ac.params.autoplay?ac.autoplaying?!1:(ac.autoplaying=!0,ac.params.onAutoplayStart&&ac.params.onAutoplayStart(ac),void Z()):!1
},ac.stopAutoplay=function(){ac.autoplayTimeoutId&&(ac.autoplayTimeoutId&&clearTimeout(ac.autoplayTimeoutId),ac.autoplaying=!1,ac.autoplayTimeoutId=void 0,ac.params.onAutoplayStop&&ac.params.onAutoplayStop(ac))
},ac.pauseAutoplay=function(a){ac.autoplayPaused||(ac.autoplayTimeoutId&&clearTimeout(ac.autoplayTimeoutId),ac.autoplayPaused=!0,0===a?(ac.autoplayPaused=!1,Z()):ac.wrapper.transitionEnd(function(){ac.autoplayPaused=!1,ac.autoplaying?Z():ac.stopAutoplay()
}))
},ac.minTranslate=function(){return -ac.snapGrid[0]
},ac.maxTranslate=function(){return -ac.snapGrid[ac.snapGrid.length-1]
},ac.updateContainerSize=function(){ac.width=ac.container[0].clientWidth,ac.height=ac.container[0].clientHeight,ac.size=Q()?ac.width:ac.height
},ac.updateSlidesSize=function(){ac.slides=ac.wrapper.children("."+ac.params.slideClass),ac.snapGrid=[],ac.slidesGrid=[],ac.slidesSizesGrid=[];
var C,S=ac.params.spaceBetween,M=0,T=0,y=0;
"string"==typeof S&&S.indexOf("%")>=0&&(S=parseFloat(S.replace("%",""))/100*ac.size),ac.virtualWidth=-S,ac.slides.css(ac.rtl?{marginLeft:"",marginTop:""}:{marginRight:"",marginBottom:""});
var v;
ac.params.slidesPerColumn>1&&(v=Math.floor(ac.slides.length/ac.params.slidesPerColumn)===ac.slides.length/ac.params.slidesPerColumn?ac.slides.length:Math.ceil(ac.slides.length/ac.params.slidesPerColumn)*ac.params.slidesPerColumn);
var r;
for(C=0;
C<ac.slides.length;
C++){r=0;
var x=ac.slides.eq(C);
if(ac.params.slidesPerColumn>1){var E,k,P,I,z=ac.params.slidesPerColumn;
"column"===ac.params.slidesPerColumnFill?(k=Math.floor(C/z),P=C-k*z,E=k+P*v/z,x.css({"-webkit-box-ordinal-group":E,"-moz-box-ordinal-group":E,"-ms-flex-order":E,"-webkit-order":E,order:E})):(I=v/z,P=Math.floor(C/I),k=C-P*I),x.css({"margin-top":0!==P&&ac.params.spaceBetween&&ac.params.spaceBetween+"px"}).attr("data-swiper-column",k).attr("data-swiper-row",P)
}"none"!==x.css("display")&&("auto"===ac.params.slidesPerView?r=Q()?x.outerWidth(!0):x.outerHeight(!0):(r=(ac.size-(ac.params.slidesPerView-1)*S)/ac.params.slidesPerView,Q()?ac.slides[C].style.width=r+"px":ac.slides[C].style.height=r+"px"),ac.slides[C].swiperSlideSize=r,ac.slidesSizesGrid.push(r),ac.params.centeredSlides?(M=M+r/2+T/2+S,0===C&&(M=M-ac.size/2-S),Math.abs(M)<0.001&&(M=0),y%ac.params.slidesPerGroup===0&&ac.snapGrid.push(M),ac.slidesGrid.push(M)):(y%ac.params.slidesPerGroup===0&&ac.snapGrid.push(M),ac.slidesGrid.push(M),M=M+r+S),ac.virtualWidth+=r+S,T=r,y++)
}ac.virtualWidth=Math.max(ac.virtualWidth,ac.size);
var w;
if(ac.rtl&&ac.wrongRTL&&("slide"===ac.params.effect||"coverflow"===ac.params.effect)&&ac.wrapper.css({width:ac.virtualWidth+ac.params.spaceBetween+"px"}),ac.params.slidesPerColumn>1&&(ac.virtualWidth=(r+ac.params.spaceBetween)*v,ac.virtualWidth=Math.ceil(ac.virtualWidth/ac.params.slidesPerColumn)-ac.params.spaceBetween,ac.wrapper.css({width:ac.virtualWidth+ac.params.spaceBetween+"px"}),ac.params.centeredSlides)){for(w=[],C=0;
C<ac.snapGrid.length;
C++){ac.snapGrid[C]<ac.virtualWidth+ac.snapGrid[0]&&w.push(ac.snapGrid[C])
}ac.snapGrid=w
}if(!ac.params.centeredSlides){for(w=[],C=0;
C<ac.snapGrid.length;
C++){ac.snapGrid[C]<=ac.virtualWidth-ac.size&&w.push(ac.snapGrid[C])
}ac.snapGrid=w,Math.floor(ac.virtualWidth-ac.size)>Math.floor(ac.snapGrid[ac.snapGrid.length-1])&&ac.snapGrid.push(ac.virtualWidth-ac.size)
}0===ac.snapGrid.length&&(ac.snapGrid=[0]),0!==ac.params.spaceBetween&&ac.slides.css(Q()?ac.rtl?{marginLeft:S+"px"}:{marginRight:S+"px"}:{marginBottom:S+"px"}),ac.params.watchSlidesProgress&&ac.updateSlidesOffset()
},ac.updateSlidesOffset=function(){for(var a=0;
a<ac.slides.length;
a++){ac.slides[a].swiperSlideOffset=Q()?ac.slides[a].offsetLeft:ac.slides[a].offsetTop
}},ac.updateSlidesProgress=function(r){if("undefined"==typeof r&&(r=ac.translate||0),0!==ac.slides.length){"undefined"==typeof ac.slides[0].swiperSlideOffset&&ac.updateSlidesOffset();
var w=ac.params.centeredSlides?-r+ac.size/2:-r;
ac.rtl&&(w=ac.params.centeredSlides?r-ac.size/2:r);
ac.container[0].getBoundingClientRect(),Q()?"left":"top",Q()?"right":"bottom";
ac.slides.removeClass(ac.params.slideVisibleClass);
for(var v=0;
v<ac.slides.length;
v++){var x=ac.slides[v],p=ac.params.centeredSlides===!0?x.swiperSlideSize/2:0,k=(w-x.swiperSlideOffset-p)/(x.swiperSlideSize+ac.params.spaceBetween);
if(ac.params.watchVisibility){var h=-(w-x.swiperSlideOffset-p),m=h+ac.slidesSizesGrid[v],u=h>=0&&h<ac.size||m>0&&m<=ac.size||0>=h&&m>=ac.size;
u&&ac.slides.eq(v).addClass(ac.params.slideVisibleClass)
}x.progress=ac.rtl?-k:k
}}},ac.updateProgress=function(h){"undefined"==typeof h&&(h=ac.translate||0);
var a=ac.maxTranslate()-ac.minTranslate();
0===a?(ac.progress=0,ac.isBeginning=ac.isEnd=!0):(ac.progress=(h-ac.minTranslate())/a,ac.isBeginning=ac.progress<=0,ac.isEnd=ac.progress>=1),ac.isBeginning&&ac.params.onReachBeginning&&ac.params.onReachBeginning(ac),ac.isEnd&&ac.params.onReachEnd&&ac.params.onReachEnd(ac),ac.params.watchSlidesProgress&&ac.updateSlidesProgress(h),ac.params.onProgress&&ac.params.onProgress(ac,ac.progress)
},ac.updateActiveIndex=function(){var l,i,h,k=ac.rtl?ac.translate:-ac.translate;
for(i=0;
i<ac.slidesGrid.length;
i++){"undefined"!=typeof ac.slidesGrid[i+1]?k>=ac.slidesGrid[i]&&k<ac.slidesGrid[i+1]-(ac.slidesGrid[i+1]-ac.slidesGrid[i])/2?l=i:k>=ac.slidesGrid[i]&&k<ac.slidesGrid[i+1]&&(l=i+1):k>=ac.slidesGrid[i]&&(l=i)
}(0>l||"undefined"==typeof l)&&(l=0),h=Math.floor(l/ac.params.slidesPerGroup),h>=ac.snapGrid.length&&(h=ac.snapGrid.length-1),l!==ac.activeIndex&&(ac.snapIndex=h,ac.previousIndex=ac.activeIndex,ac.activeIndex=l,ac.updateClasses())
},ac.updateClasses=function(){ac.slides.removeClass(ac.params.slideActiveClass+" "+ac.params.slideNextClass+" "+ac.params.slidePrevClass);
var h=ac.slides.eq(ac.activeIndex);
if(h.addClass(ac.params.slideActiveClass),h.next("."+ac.params.slideClass).addClass(ac.params.slideNextClass),h.prev("."+ac.params.slideClass).addClass(ac.params.slidePrevClass),ac.bullets&&ac.bullets.length>0){ac.bullets.removeClass(ac.params.bulletActiveClass);
var a;
ac.params.loop?(a=ac.activeIndex-ac.loopedSlides,a>ac.slides.length-1-2*ac.loopedSlides&&(a-=ac.slides.length-2*ac.loopedSlides)):a="undefined"!=typeof ac.snapIndex?ac.snapIndex:ac.activeIndex||0,ac.bullets.eq(a).addClass(ac.params.bulletActiveClass)
}ac.params.loop||(ac.params.prevButton&&(ac.isBeginning?W(ac.params.prevButton).addClass(ac.params.buttonDisabledClass):W(ac.params.prevButton).removeClass(ac.params.buttonDisabledClass)),ac.params.nextButton&&(ac.isEnd?W(ac.params.nextButton).addClass(ac.params.buttonDisabledClass):W(ac.params.nextButton).removeClass(ac.params.buttonDisabledClass)))
},ac.updatePagination=function(){if(ac.params.pagination&&ac.paginationContainer&&ac.paginationContainer.length>0){for(var k="",i=ac.params.loop?ac.slides.length-2*ac.loopedSlides:ac.snapGrid.length,h=0;
i>h;
h++){k+='<span class="'+ac.params.bulletClass+'"></span>'
}ac.paginationContainer.html(k),ac.bullets=ac.paginationContainer.find("."+ac.params.bulletClass)
}},ac.update=function(l){function i(){k=Math.min(Math.max(ac.translate,ac.maxTranslate()),ac.minTranslate()),ac.setWrapperTranslate(k),ac.updateActiveIndex(),ac.updateClasses()
}if(ac.updateContainerSize(),ac.updateSlidesSize(),ac.updateProgress(),ac.updatePagination(),ac.updateClasses(),ac.params.scrollbar&&ac.scrollbar&&ac.scrollbar.set(),l){var h,k;
ac.params.freeMode?i():(h="auto"===ac.params.slidesPerView&&ac.isEnd&&!ac.params.centeredSlides?ac.slideTo(ac.slides.length-1,0,!1,!0):ac.slideTo(ac.activeIndex,0,!1,!0),h||i())
}},ac.onResize=function(){if(ac.updateContainerSize(),ac.updateSlidesSize(),ac.updateProgress(),("auto"===ac.params.slidesPerView||ac.params.freeMode)&&ac.updatePagination(),ac.params.scrollbar&&ac.scrollbar&&ac.scrollbar.set(),ac.params.freeMode){var a=Math.min(Math.max(ac.translate,ac.maxTranslate()),ac.minTranslate());
ac.setWrapperTranslate(a),ac.updateActiveIndex(),ac.updateClasses()
}else{ac.updateClasses(),"auto"===ac.params.slidesPerView&&ac.isEnd&&!ac.params.centeredSlides?ac.slideTo(ac.slides.length-1,0,!1,!0):ac.slideTo(ac.activeIndex,0,!1,!0)
}};
var J=["mousedown","mousemove","mouseup"];
window.navigator.pointerEnabled?J=["pointerdown","pointermove","pointerup"]:window.navigator.msPointerEnabled&&(J=["MSPointerDown","MSPointerMove","MSPointerUp"]),ac.touchEvents={start:ac.support.touch||!ac.params.simulateTouch?"touchstart":J[0],move:ac.support.touch||!ac.params.simulateTouch?"touchmove":J[1],end:ac.support.touch||!ac.params.simulateTouch?"touchend":J[2]},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===ac.params.touchEventsTarget?ac.container:ac.wrapper).addClass("swiper-wp8-"+ac.params.direction),ac.events=function(m){var h=m?"off":"on",l=m?"removeEventListener":"addEventListener",k="container"===ac.params.touchEventsTarget?ac.container[0]:ac.wrapper[0],a=ac.support.touch?k:document,o=ac.params.nested?!0:!1;
ac.browser.ie?(k[l](ac.touchEvents.start,ac.onTouchStart,!1),a[l](ac.touchEvents.move,ac.onTouchMove,o),a[l](ac.touchEvents.end,ac.onTouchEnd,!1)):(ac.support.touch&&(k[l](ac.touchEvents.start,ac.onTouchStart,!1),k[l](ac.touchEvents.move,ac.onTouchMove,o),k[l](ac.touchEvents.end,ac.onTouchEnd,!1)),!ah.simulateTouch||ac.device.ios||ac.device.android||(k[l]("mousedown",ac.onTouchStart,!1),a[l]("mousemove",ac.onTouchMove,o),a[l]("mouseup",ac.onTouchEnd,!1))),window[l]("resize",ac.onResize),ac.params.nextButton&&W(ac.params.nextButton)[h]("click",ac.onClickNext),ac.params.prevButton&&W(ac.params.prevButton)[h]("click",ac.onClickPrev),ac.params.pagination&&ac.params.paginationClickable&&W(ac.paginationContainer)[h]("click","."+ac.params.bulletClass,ac.onClickIndex),(ac.params.preventClicks||ac.params.preventClicksPropagation)&&k[l]("click",ac.preventClicks,!0)
},ac.attachEvents=function(){ac.events()
},ac.detachEvents=function(){ac.events(!0)
},ac.allowClick=!0,ac.preventClicks=function(a){ac.allowClick||(ac.params.preventClicks&&a.preventDefault(),ac.params.preventClicksPropagation&&(a.stopPropagation(),a.stopImmediatePropagation()))
},ac.onClickNext=function(a){a.preventDefault(),ac.slideNext()
},ac.onClickPrev=function(a){a.preventDefault(),ac.slidePrev()
},ac.onClickIndex=function(h){h.preventDefault();
var a=W(this).index()*ac.params.slidesPerGroup;
ac.params.loop&&(a+=ac.loopedSlides),ac.slideTo(a)
},ac.updateClickedSlide=function(m){var i=V(m,"."+ac.params.slideClass);
if(!i){return ac.clickedSlide=void 0,void (ac.clickedIndex=void 0)
}if(ac.clickedSlide=i,ac.clickedIndex=W(i).index(),ac.params.slideToClickedSlide&&void 0!==ac.clickedIndex&&ac.clickedIndex!==ac.activeIndex){var h,l=ac.clickedIndex;
if(ac.params.loop){if(h=W(ac.clickedSlide).attr("data-swiper-slide-index"),l>ac.slides.length-ac.params.slidesPerView){ac.fixLoop(),l=ac.wrapper.children("."+ac.params.slideClass+'[data-swiper-slide-index="'+h+'"]').eq(0).index(),setTimeout(function(){ac.slideTo(l)
},0)
}else{if(l<ac.params.slidesPerView-1){ac.fixLoop();
var k=ac.wrapper.children("."+ac.params.slideClass+'[data-swiper-slide-index="'+h+'"]');
l=k.eq(k.length-1).index(),setTimeout(function(){ac.slideTo(l)
},0)
}else{ac.slideTo(l)
}}}else{ac.slideTo(l)
}}};
var ab,H,j,ag,G,q,D,O,A,L="input, select, textarea, button",t=Date.now(),Y=[];
ac.animating=!1,ac.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};
var F;
if(ac.onTouchStart=function(h){if(h.originalEvent&&(h=h.originalEvent),F="touchstart"===h.type,F||!("which" in h)||3!==h.which){if(ac.params.noSwiping&&V(h,"."+ac.params.noSwipingClass)){return void (ac.allowClick=!0)
}if(!ac.params.swipeHandler||V(h,ac.params.swipeHandler)){if(ab=!0,H=!1,ag=void 0,ac.touches.startX=ac.touches.currentX="touchstart"===h.type?h.targetTouches[0].pageX:h.pageX,ac.touches.startY=ac.touches.currentY="touchstart"===h.type?h.targetTouches[0].pageY:h.pageY,j=Date.now(),ac.allowClick=!0,ac.updateContainerSize(),ac.swipeDirection=void 0,ac.params.threshold>0&&(D=!1),"touchstart"!==h.type){var a=!0;
W(h.target).is(L)&&(a=!1),document.activeElement&&W(document.activeElement).is(L)&&document.activeElement.blur(),a&&h.preventDefault()
}ac.params.onTouchStart&&ac.params.onTouchStart(ac,h)
}}},ac.onTouchMove=function(l){if(l.originalEvent&&(l=l.originalEvent),!(F&&"mousemove"===l.type||l.preventedByNestedSwiper)){if(ac.params.onlyExternal){return H=!0,void (ac.allowClick=!1)
}if(ac.params.onTouchMove&&ac.params.onTouchMove(ac,l),ac.allowClick=!1,!(l.targetTouches&&l.targetTouches.length>1)){if(ac.touches.currentX="touchmove"===l.type?l.targetTouches[0].pageX:l.pageX,ac.touches.currentY="touchmove"===l.type?l.targetTouches[0].pageY:l.pageY,"undefined"==typeof ag){var h=180*Math.atan2(Math.abs(ac.touches.currentY-ac.touches.startY),Math.abs(ac.touches.currentX-ac.touches.startX))/Math.PI;
ag=Q()?h>ac.params.touchAngle:90-h>ac.params.touchAngle
}if(ag&&ac.params.onTouchMoveOpposite&&ac.params.onTouchMoveOpposite(ac,l),ab){if(ag){return void (ab=!1)
}ac.params.onSliderMove&&ac.params.onSliderMove(ac,l),l.preventDefault(),ac.params.touchMoveStopPropagation&&!ac.params.nested&&l.stopPropagation(),H||(ah.loop&&ac.fixLoop(),q="cube"===ac.params.effect?(ac.rtl?-ac.translate:ac.translate)||0:ac.getWrapperTranslate(),ac.setWrapperTransition(0),ac.animating&&ac.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),ac.params.autoplay&&ac.autoplaying&&(ac.params.autoplayDisableOnInteraction?ac.stopAutoplay():ac.pauseAutoplay()),A=!1,ac.params.grabCursor&&(ac.container[0].style.cursor="move",ac.container[0].style.cursor="-webkit-grabbing",ac.container[0].style.cursor="-moz-grabbin",ac.container[0].style.cursor="grabbing")),H=!0;
var k=ac.touches.diff=Q()?ac.touches.currentX-ac.touches.startX:ac.touches.currentY-ac.touches.startY;
k*=ac.params.touchRatio,ac.rtl&&(k=-k),ac.swipeDirection=k>0?"prev":"next",G=k+q;
var a=!0;
if(k>0&&G>ac.minTranslate()?(a=!1,ac.params.resistance&&(G=ac.minTranslate()-1+Math.pow(-ac.minTranslate()+q+k,ac.params.resistanceRatio))):0>k&&G<ac.maxTranslate()&&(a=!1,ac.params.resistance&&(G=ac.maxTranslate()+1-Math.pow(ac.maxTranslate()-q-k,ac.params.resistanceRatio))),a&&(l.preventedByNestedSwiper=!0),!ac.params.allowSwipeToNext&&"next"===ac.swipeDirection&&q>G&&(G=q),!ac.params.allowSwipeToPrev&&"prev"===ac.swipeDirection&&G>q&&(G=q),ac.params.followFinger){if(ac.params.threshold>0){if(!(Math.abs(k)>ac.params.threshold||D)){return void (G=q)
}if(!D){return D=!0,ac.touches.startX=ac.touches.currentX,ac.touches.startY=ac.touches.currentY,G=q,void (ac.touches.diff=Q()?ac.touches.currentX-ac.touches.startX:ac.touches.currentY-ac.touches.startY)
}}(ac.params.freeMode||ac.params.watchSlidesProgress)&&ac.updateActiveIndex(),ac.params.freeMode&&(0===Y.length&&Y.push({position:ac.touches[Q()?"startX":"startY"],time:j}),Y.push({position:ac.touches[Q()?"currentX":"currentY"],time:(new Date).getTime()})),ac.updateProgress(G),ac.setWrapperTranslate(G)
}}}}},ac.onTouchEnd=function(ak){if(ak.originalEvent&&(ak=ak.originalEvent),ac.params.onTouchEnd&&ac.params.onTouchEnd(ac,ak),ab){ac.params.grabCursor&&H&&ab&&(ac.container[0].style.cursor="move",ac.container[0].style.cursor="-webkit-grab",ac.container[0].style.cursor="-moz-grab",ac.container[0].style.cursor="grab");
var z=Date.now(),ao=z-j;
if(ac.allowClick&&(ac.updateClickedSlide(ak),ac.params.onTap&&ac.params.onTap(ac,ak),300>ao&&z-t>300&&(O&&clearTimeout(O),O=setTimeout(function(){ac&&(ac.params.paginationHide&&ac.paginationContainer.length>0&&!W(ak.target).hasClass(ac.params.bulletClass)&&ac.paginationContainer.toggleClass(ac.params.paginationHiddenClass),ac.params.onClick&&ac.params.onClick(ac,ak))
},300)),300>ao&&300>z-t&&(O&&clearTimeout(O),ac.params.onDoubleTap&&ac.params.onDoubleTap(ac,ak))),t=Date.now(),setTimeout(function(){ac&&ac.allowClick&&(ac.allowClick=!0)
},0),!ab||!H||!ac.swipeDirection||0===ac.touches.diff||G===q){return void (ab=H=!1)
}ab=H=!1;
var I;
if(I=ac.params.followFinger?ac.rtl?ac.translate:-ac.translate:-G,ac.params.freeMode){if(I<-ac.minTranslate()){return void ac.slideTo(ac.activeIndex)
}if(I>-ac.maxTranslate()){return void ac.slideTo(ac.slides.length-1)
}if(ac.params.freeModeMomentum){if(Y.length>1){var C=Y.pop(),ai=Y.pop(),S=C.position-ai.position,P=C.time-ai.time;
ac.velocity=S/P,ac.velocity=ac.velocity/2,Math.abs(ac.velocity)<0.02&&(ac.velocity=0),(P>150||(new Date).getTime()-C.time>300)&&(ac.velocity=0)
}else{ac.velocity=0
}Y.length=0;
var T=1000*ac.params.freeModeMomentumRatio,al=ac.velocity*T,M=ac.translate+al;
ac.rtl&&(M=-M);
var w,am=!1,aj=20*Math.abs(ac.velocity)*ac.params.freeModeMomentumBounceRatio;
M<ac.maxTranslate()&&(ac.params.freeModeMomentumBounce?(M+ac.maxTranslate()<-aj&&(M=ac.maxTranslate()-aj),w=ac.maxTranslate(),am=!0,A=!0):M=ac.maxTranslate()),M>ac.minTranslate()&&(ac.params.freeModeMomentumBounce?(M-ac.minTranslate()>aj&&(M=ac.minTranslate()+aj),w=ac.minTranslate(),am=!0,A=!0):M=ac.minTranslate()),0!==ac.velocity&&(T=Math.abs(ac.rtl?(-M-ac.translate)/ac.velocity:(M-ac.translate)/ac.velocity)),ac.params.freeModeMomentumBounce&&am?(ac.updateProgress(w),ac.setWrapperTransition(T),ac.setWrapperTranslate(M),ac.onTransitionStart(),ac.animating=!0,ac.wrapper.transitionEnd(function(){A&&(ac.params.onMomentumBounce&&ac.params.onMomentumBounce(ac),ac.setWrapperTransition(ac.params.speed),ac.setWrapperTranslate(w),ac.wrapper.transitionEnd(function(){ac.onTransitionEnd()
}))
})):ac.velocity?(ac.updateProgress(M),ac.setWrapperTransition(T),ac.setWrapperTranslate(M),ac.onTransitionStart(),ac.animating||(ac.animating=!0,ac.wrapper.transitionEnd(function(){ac.onTransitionEnd()
}))):ac.updateProgress(M),ac.updateActiveIndex()
}return void ((!ac.params.freeModeMomentum||ao>=ac.params.longSwipesMs)&&(ac.updateProgress(),ac.updateActiveIndex()))
}var m,an=0,k=ac.slidesSizesGrid[0];
for(m=0;
m<ac.slidesGrid.length;
m+=ac.params.slidesPerGroup){"undefined"!=typeof ac.slidesGrid[m+ac.params.slidesPerGroup]?I>=ac.slidesGrid[m]&&I<ac.slidesGrid[m+ac.params.slidesPerGroup]&&(an=m,k=ac.slidesGrid[m+ac.params.slidesPerGroup]-ac.slidesGrid[m]):I>=ac.slidesGrid[m]&&(an=m,k=ac.slidesGrid[ac.slidesGrid.length-1]-ac.slidesGrid[ac.slidesGrid.length-2])
}var x=(I-ac.slidesGrid[an])/k;
if(ao>ac.params.longSwipesMs){if(!ac.params.longSwipes){return void ac.slideTo(ac.activeIndex)
}"next"===ac.swipeDirection&&ac.slideTo(x>=ac.params.longSwipesRatio?an+ac.params.slidesPerGroup:an),"prev"===ac.swipeDirection&&ac.slideTo(x>1-ac.params.longSwipesRatio?an+ac.params.slidesPerGroup:an)
}else{if(!ac.params.shortSwipes){return void ac.slideTo(ac.activeIndex)
}"next"===ac.swipeDirection&&ac.slideTo(an+ac.params.slidesPerGroup),"prev"===ac.swipeDirection&&ac.slideTo(an)
}}},ac._slideTo=function(h,a){return ac.slideTo(h,a,!0,!0)
},ac.slideTo=function(o,l,h,m){"undefined"==typeof h&&(h=!0),"undefined"==typeof o&&(o=0),0>o&&(o=0),ac.snapIndex=Math.floor(o/ac.params.slidesPerGroup),ac.snapIndex>=ac.snapGrid.length&&(ac.snapIndex=ac.snapGrid.length-1);
var k=-ac.snapGrid[ac.snapIndex];
ac.params.autoplay&&ac.autoplaying&&(m||!ac.params.autoplayDisableOnInteraction?ac.pauseAutoplay(l):ac.stopAutoplay()),ac.updateProgress(k);
for(var p=0;
p<ac.slidesGrid.length;
p++){-k>=ac.slidesGrid[p]&&(o=p)
}if("undefined"==typeof l&&(l=ac.params.speed),ac.previousIndex=ac.activeIndex||0,ac.activeIndex=o,k===ac.translate){return ac.updateClasses(),!1
}ac.onTransitionStart(h);
Q()?k:0,Q()?0:k;
return 0===l?(ac.setWrapperTransition(0),ac.setWrapperTranslate(k),ac.onTransitionEnd(h)):(ac.setWrapperTransition(l),ac.setWrapperTranslate(k),ac.animating||(ac.animating=!0,ac.wrapper.transitionEnd(function(){ac.onTransitionEnd(h)
}))),ac.updateClasses(),!0
},ac.onTransitionStart=function(a){"undefined"==typeof a&&(a=!0),a&&(ac.params.onTransitionStart&&ac.params.onTransitionStart(ac),ac.params.onSlideChangeStart&&ac.activeIndex!==ac.previousIndex&&ac.params.onSlideChangeStart(ac))
},ac.onTransitionEnd=function(a){ac.animating=!1,ac.setWrapperTransition(0),"undefined"==typeof a&&(a=!0),a&&(ac.params.onTransitionEnd&&ac.params.onTransitionEnd(ac),ac.params.onSlideChangeEnd&&ac.activeIndex!==ac.previousIndex&&ac.params.onSlideChangeEnd(ac))
},ac.slideNext=function(k,i,h){if(ac.params.loop){if(ac.animating){return !1
}ac.fixLoop();
ac.container[0].clientLeft;
return ac.slideTo(ac.activeIndex+ac.params.slidesPerGroup,i,k,h)
}return ac.slideTo(ac.activeIndex+ac.params.slidesPerGroup,i,k,h)
},ac._slideNext=function(a){return ac.slideNext(!0,a,!0)
},ac.slidePrev=function(k,i,h){if(ac.params.loop){if(ac.animating){return !1
}ac.fixLoop();
ac.container[0].clientLeft;
return ac.slideTo(ac.activeIndex-1,i,k,h)
}return ac.slideTo(ac.activeIndex-1,i,k,h)
},ac._slidePrev=function(a){return ac.slidePrev(!0,a,!0)
},ac.slideReset=function(h,a){return ac.slideTo(ac.activeIndex,a,h)
},ac.setWrapperTransition=function(h,a){ac.wrapper.transition(h),ac.params.onSetTransition&&ac.params.onSetTransition(ac,h),"slide"!==ac.params.effect&&ac.effects[ac.params.effect]&&ac.effects[ac.params.effect].setTransition(h),ac.params.parallax&&ac.parallax&&ac.parallax.setTransition(h),ac.params.scrollbar&&ac.scrollbar&&ac.scrollbar.setTransition(h),ac.params.control&&ac.controller&&ac.controller.setTransition(h,a)
},ac.setWrapperTranslate=function(o,l,h){var m=0,k=0,p=0;
Q()?m=ac.rtl?-o:o:k=o,ac.wrapper.transform(ac.support.transforms3d?"translate3d("+m+"px, "+k+"px, "+p+"px)":"translate("+m+"px, "+k+"px)"),ac.translate=Q()?m:k,l&&ac.updateActiveIndex(),"slide"!==ac.params.effect&&ac.effects[ac.params.effect]&&ac.effects[ac.params.effect].setTranslate(ac.translate),ac.params.parallax&&ac.parallax&&ac.parallax.setTranslate(ac.translate),ac.params.scrollbar&&ac.scrollbar&&ac.scrollbar.setTranslate(ac.translate),ac.params.control&&ac.controller&&ac.controller.setTranslate(ac.translate,h),ac.params.hashnav&&ac.hashnav&&ac.hashnav.setHash(),ac.params.onSetTranslate&&ac.params.onSetTranslate(ac,ac.translate)
},ac.getTranslate=function(o,l){var h,n,m,k;
return"undefined"==typeof l&&(l="x"),m=window.getComputedStyle(o,null),window.WebKitCSSMatrix?k=new WebKitCSSMatrix("none"===m.webkitTransform?"":m.webkitTransform):(k=m.MozTransform||m.OTransform||m.MsTransform||m.msTransform||m.transform||m.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),h=k.toString().split(",")),"x"===l&&(n=window.WebKitCSSMatrix?k.m41:parseFloat(16===h.length?h[12]:h[4])),"y"===l&&(n=window.WebKitCSSMatrix?k.m42:parseFloat(16===h.length?h[13]:h[5])),ac.rtl&&n&&(n=-n),n||0
},ac.getWrapperTranslate=function(a){return"undefined"==typeof a&&(a=Q()?"x":"y"),ac.getTranslate(ac.wrapper[0],a)
},ac.observers=[],ac.initObservers=function(){if(ac.params.observeParents){for(var h=ac.container.parents(),a=0;
a<h.length;
a++){U(h[a])
}}U(ac.container[0],{childList:!1}),U(ac.wrapper[0],{attributes:!1})
},ac.disconnectObservers=function(){for(var a=0;
a<ac.observers.length;
a++){ac.observers[a].disconnect()
}ac.observers=[]
},ac.createLoop=function(){ac.wrapper.children("."+ac.params.slideClass+"."+ac.params.slideDuplicateClass).remove();
var l=ac.wrapper.children("."+ac.params.slideClass);
ac.loopedSlides=parseInt(ac.params.loopedSlides||ac.params.slidesPerView,10),ac.loopedSlides=ac.loopedSlides+ac.params.loopAdditionalSlides,ac.loopedSlides>l.length&&(ac.loopedSlides=l.length);
var i,h=[],k=[];
for(l.each(function(e,m){var a=W(this);
e<ac.loopedSlides&&k.push(m),e<l.length&&e>=l.length-ac.loopedSlides&&h.push(m),a.attr("data-swiper-slide-index",e)
}),i=0;
i<k.length;
i++){ac.wrapper.append(W(k[i].cloneNode(!0)).addClass(ac.params.slideDuplicateClass))
}for(i=h.length-1;
i>=0;
i--){ac.wrapper.prepend(W(h[i].cloneNode(!0)).addClass(ac.params.slideDuplicateClass))
}},ac.destroyLoop=function(){ac.wrapper.children("."+ac.params.slideClass+"."+ac.params.slideDuplicateClass).remove()
},ac.fixLoop=function(){var a;
ac.activeIndex<ac.loopedSlides?(a=ac.slides.length-3*ac.loopedSlides+ac.activeIndex,a+=ac.loopedSlides,ac.slideTo(a,0,!1,!0)):("auto"===ac.params.slidesPerView&&ac.activeIndex>=2*ac.loopedSlides||ac.activeIndex>ac.slides.length-2*ac.params.slidesPerView)&&(a=-ac.slides.length+ac.activeIndex+ac.loopedSlides,a+=ac.loopedSlides,ac.slideTo(a,0,!1,!0))
},ac.appendSlide=function(h){if(ac.params.loop&&ac.destroyLoop(),"object"==typeof h&&h.length){for(var a=0;
a<h.length;
a++){h[a]&&ac.wrapper.append(h[a])
}}else{ac.wrapper.append(h)
}ac.params.loop&&ac.createLoop(),ac.params.observer&&ac.support.observer||ac.update(!0)
},ac.prependSlide=function(k){ac.params.loop&&ac.destroyLoop();
var i=ac.activeIndex+1;
if("object"==typeof k&&k.length){for(var h=0;
h<k.length;
h++){k[h]&&ac.wrapper.prepend(k[h])
}i=ac.activeIndex+k.length
}else{ac.wrapper.prepend(k)
}ac.params.loop&&ac.createLoop(),ac.params.observer&&ac.support.observer||ac.update(!0),ac.slideTo(i,0,!1)
},ac.removeSlide=function(l){ac.params.loop&&ac.destroyLoop();
var i,h=ac.activeIndex;
if("object"==typeof l&&l.length){for(var k=0;
k<l.length;
k++){i=l[k],ac.slides[i]&&ac.slides.eq(i).remove(),h>i&&h--
}h=Math.max(h,0)
}else{i=l,ac.slides[i]&&ac.slides.eq(i).remove(),h>i&&h--,h=Math.max(h,0)
}ac.params.observer&&ac.support.observer||ac.update(!0),ac.slideTo(h,0,!1)
},ac.removeAllSlides=function(){for(var h=[],a=0;
a<ac.slides.length;
a++){h.push(a)
}ac.removeSlide(h)
},ac.effects={fade:{setTranslate:function(){for(var o=0;
o<ac.slides.length;
o++){var l=ac.slides.eq(o),h=l[0].swiperSlideOffset,m=-h-ac.translate,k=0;
Q()||(k=m,m=0);
var p=ac.params.fade.crossFade?Math.max(1-Math.abs(l[0].progress),0):1+Math.min(Math.max(l[0].progress,-1),0);
l.css({opacity:p}).transform("translate3d("+m+"px, "+k+"px, 0px)")
}},setTransition:function(a){ac.slides.transition(a)
}},cube:{setTranslate:function(){var al,C=0;
ac.params.cube.shadow&&(Q()?(al=ac.wrapper.find(".swiper-cube-shadow"),0===al.length&&(al=W('<div class="swiper-cube-shadow"></div>'),ac.wrapper.append(al)),al.css({height:ac.width+"px"})):(al=ac.container.find(".swiper-cube-shadow"),0===al.length&&(al=W('<div class="swiper-cube-shadow"></div>'),ac.container.append(al))));
for(var ap=0;
ap<ac.slides.length;
ap++){var E=ac.slides.eq(ap),ai=90*ap,P=Math.floor(ai/360);
ac.rtl&&(ai=-ai,P=Math.floor(-ai/360));
var M=Math.max(Math.min(E[0].progress,1),-1),S=0,am=0,I=0;
ap%4===0?(S=4*-P*ac.size,I=0):(ap-1)%4===0?(S=0,I=4*-P*ac.size):(ap-2)%4===0?(S=ac.size+4*P*ac.size,I=ac.size):(ap-3)%4===0&&(S=-ac.size,I=3*ac.size+4*ac.size*P),ac.rtl&&(S=-S),Q()||(am=S,S=0);
var z="rotateX("+(Q()?0:-ai)+"deg) rotateY("+(Q()?ai:0)+"deg) translate3d("+S+"px, "+am+"px, "+I+"px)";
if(1>=M&&M>-1&&(C=90*ap+90*M,ac.rtl&&(C=90*-ap-90*M)),E.transform(z),ac.params.cube.slideShadows){var an=E.find(Q()?".swiper-slide-shadow-left":".swiper-slide-shadow-top"),aj=E.find(Q()?".swiper-slide-shadow-right":".swiper-slide-shadow-bottom");
0===an.length&&(an=W('<div class="swiper-slide-shadow-'+(Q()?"left":"top")+'"></div>'),E.append(an)),0===aj.length&&(aj=W('<div class="swiper-slide-shadow-'+(Q()?"right":"bottom")+'"></div>'),E.append(aj));
E[0].progress;
an.length&&(an[0].style.opacity=-E[0].progress),aj.length&&(aj[0].style.opacity=E[0].progress)
}}if(ac.wrapper.css({"-webkit-transform-origin":"50% 50% -"+ac.size/2+"px","-moz-transform-origin":"50% 50% -"+ac.size/2+"px","-ms-transform-origin":"50% 50% -"+ac.size/2+"px","transform-origin":"50% 50% -"+ac.size/2+"px"}),ac.params.cube.shadow){if(Q()){al.transform("translate3d(0px, "+(ac.width/2+ac.params.cube.shadowOffset)+"px, "+-ac.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+ac.params.cube.shadowScale+")")
}else{var y=Math.abs(C)-90*Math.floor(Math.abs(C)/90),ak=1.5-(Math.sin(2*y*Math.PI/360)/2+Math.cos(2*y*Math.PI/360)/2),r=ac.params.cube.shadowScale,k=ac.params.cube.shadowScale/ak,ao=ac.params.cube.shadowOffset;
al.transform("scale3d("+r+", 1, "+k+") translate3d(0px, "+(ac.height/2+ao)+"px, "+-ac.height/2/k+"px) rotateX(-90deg)")
}}var m=ac.isSafari||ac.isUiWebView?-ac.size/2:0;
ac.wrapper.transform("translate3d(0px,0,"+m+"px) rotateX("+(Q()?0:C)+"deg) rotateY("+(Q()?-C:0)+"deg)")
},setTransition:function(a){ac.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a),ac.params.cube.shadow&&!Q()&&ac.container.find(".swiper-cube-shadow").transition(a)
}},coverflow:{setTranslate:function(){for(var al=ac.translate,C=Q()?-al+ac.width/2:-al+ac.height/2,ap=Q()?ac.params.coverflow.rotate:-ac.params.coverflow.rotate,E=ac.params.coverflow.depth,ai=0,P=ac.slides.length;
P>ai;
ai++){var M=ac.slides.eq(ai),S=ac.slidesSizesGrid[ai],am=M[0].swiperSlideOffset,I=(C-am-S/2)/S*ac.params.coverflow.modifier,z=Q()?ap*I:0,an=Q()?0:ap*I,aj=-E*Math.abs(I),y=Q()?0:ac.params.coverflow.stretch*I,ak=Q()?ac.params.coverflow.stretch*I:0;
Math.abs(ak)<0.001&&(ak=0),Math.abs(y)<0.001&&(y=0),Math.abs(aj)<0.001&&(aj=0),Math.abs(z)<0.001&&(z=0),Math.abs(an)<0.001&&(an=0);
var r="translate3d("+ak+"px,"+y+"px,"+aj+"px)  rotateX("+an+"deg) rotateY("+z+"deg)";
if(M.transform(r),M[0].style.zIndex=-Math.abs(Math.round(I))+1,ac.params.coverflow.slideShadows){var k=M.find(Q()?".swiper-slide-shadow-left":".swiper-slide-shadow-top"),ao=M.find(Q()?".swiper-slide-shadow-right":".swiper-slide-shadow-bottom");
0===k.length&&(k=W('<div class="swiper-slide-shadow-'+(Q()?"left":"top")+'"></div>'),M.append(k)),0===ao.length&&(ao=W('<div class="swiper-slide-shadow-'+(Q()?"right":"bottom")+'"></div>'),M.append(ao)),k.length&&(k[0].style.opacity=I>0?I:0),ao.length&&(ao[0].style.opacity=-I>0?-I:0)
}}if(window.navigator.pointerEnabled||window.navigator.msPointerEnabled){var m=ac.wrapper.style;
m.perspectiveOrigin=C+"px 50%"
}},setTransition:function(a){ac.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a)
}}},ac.scrollbar={set:function(){if(ac.params.scrollbar){var a=ac.scrollbar;
a.track=W(ac.params.scrollbar),a.drag=a.track.find(".swiper-scrollbar-drag"),0===a.drag.length&&(a.drag=W('<div class="swiper-scrollbar-drag"></div>'),a.track.append(a.drag)),a.drag[0].style.width="",a.drag[0].style.height="",a.trackSize=Q()?a.track[0].offsetWidth:a.track[0].offsetHeight,a.divider=ac.size/ac.virtualWidth,a.moveDivider=a.divider*(a.trackSize/ac.size),a.dragSize=a.trackSize*a.divider,Q()?a.drag[0].style.width=a.dragSize+"px":a.drag[0].style.height=a.dragSize+"px",a.track[0].style.display=a.divider>=1?"none":"",ac.params.scrollbarHide&&(a.track[0].style.opacity=0)
}},setTranslate:function(){if(ac.params.scrollbar){var k,i=ac.scrollbar,h=(ac.translate||0,i.dragSize);
k=(i.trackSize-i.dragSize)*ac.progress,ac.rtl&&Q()?(k=-k,k>0?(h=i.dragSize-k,k=0):-k+i.dragSize>i.trackSize&&(h=i.trackSize+k)):0>k?(h=i.dragSize+k,k=0):k+i.dragSize>i.trackSize&&(h=i.trackSize-k),Q()?(i.drag.transform("translate3d("+k+"px, 0, 0)"),i.drag[0].style.width=h+"px"):(i.drag.transform("translate3d(0px, "+k+"px, 0)"),i.drag[0].style.height=h+"px"),ac.params.scrollbarHide&&(clearTimeout(i.timeout),i.track[0].style.opacity=1,i.timeout=setTimeout(function(){i.track[0].style.opacity=0,i.track.transition(400)
},1000))
}},setTransition:function(a){ac.params.scrollbar&&ac.scrollbar.drag.transition(a)
}},ac.controller={setTranslate:function(o,l){var h,n,m=ac.params.control;
if(ac.isArray(m)){for(var k=0;
k<m.length;
k++){m[k]!==l&&m[k] instanceof Swiper&&(o=m[k].rtl&&"horizontal"===m[k].params.direction?-ac.translate:ac.translate,h=(m[k].maxTranslate()-m[k].minTranslate())/(ac.maxTranslate()-ac.minTranslate()),n=(o-ac.minTranslate())*h+m[k].minTranslate(),ac.params.controlInverse&&(n=m[k].maxTranslate()-n),m[k].updateProgress(n),m[k].setWrapperTranslate(n,!1,ac),m[k].updateActiveIndex())
}}else{m instanceof Swiper&&l!==m&&(o=m.rtl&&"horizontal"===m.params.direction?-ac.translate:ac.translate,h=(m.maxTranslate()-m.minTranslate())/(ac.maxTranslate()-ac.minTranslate()),n=(o-ac.minTranslate())*h+m.minTranslate(),ac.params.controlInverse&&(n=m.maxTranslate()-n),m.updateProgress(n),m.setWrapperTranslate(n,!1,ac),m.updateActiveIndex())
}},setTransition:function(l,i){var h=ac.params.control;
if(ac.isArray(h)){for(var k=0;
k<h.length;
k++){h[k]!==i&&h[k] instanceof Swiper&&h[k].setWrapperTransition(l,ac)
}}else{h instanceof Swiper&&i!==h&&h.setWrapperTransition(l,ac)
}}},ac.hashnav={init:function(){if(ac.params.hashnav){ac.hashnav.initialized=!0;
var p=document.location.hash.replace("#","");
if(p){for(var l=0,h=0,o=ac.slides.length;
o>h;
h++){var m=ac.slides.eq(h),k=m.attr("data-hash");
if(k===p&&!m.hasClass(ac.params.slideDuplicateClass)){var u=m.index();
ac._slideTo(u,l)
}}}}},setHash:function(){ac.hashnav.initialized&&ac.params.hashnav&&(document.location.hash=ac.slides.eq(ac.activeIndex).attr("data-hash")||"")
}},ac.disableKeyboardControl=function(){W(document).off("keydown",X)
},ac.enableKeyboardControl=function(){W(document).on("keydown",X)
},ac._wheelEvent=!1,ac._lastWheelScrollTime=(new Date).getTime(),ac.params.mousewheelControl){if(void 0!==document.onmousewheel&&(ac._wheelEvent="mousewheel"),!ac._wheelEvent){try{new WheelEvent("wheel"),ac._wheelEvent="wheel"
}catch(B){}}ac._wheelEvent||(ac._wheelEvent="DOMMouseScroll")
}return ac.disableMousewheelControl=function(){return ac._wheelEvent?(ac.container.off(ac._wheelEvent,ae),!0):!1
},ac.enableMousewheelControl=function(){return ac._wheelEvent?(ac.container.on(ac._wheelEvent,ae),!0):!1
},ac.parallax={setTranslate:function(){ac.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){R(this,ac.progress)
}),ac.slides.each(function(){var a=W(this);
a.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var e=Math.min(Math.max(a[0].progress,-1),1);
R(this,e)
})
})
},setTransition:function(a){"undefined"==typeof a&&(a=ac.params.speed),ac.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var h=W(this),e=parseInt(h.attr("data-swiper-parallax-duration"),10)||a;
0===a&&(e=0),h.transition(e)
})
}},ac.init=function(){ac.params.loop&&ac.createLoop(),ac.updateContainerSize(),ac.updateSlidesSize(),ac.updatePagination(),ac.params.scrollbar&&ac.scrollbar&&ac.scrollbar.set(),"slide"!==ac.params.effect&&ac.effects[ac.params.effect]&&(ac.params.loop||ac.updateProgress(),ac.effects[ac.params.effect].setTranslate()),ac.params.loop?ac.slideTo(ac.params.initialSlide+ac.loopedSlides,0,ac.params.runCallbacksOnInit):(ac.slideTo(ac.params.initialSlide,0,ac.params.runCallbacksOnInit),0===ac.params.initialSlide&&ac.parallax&&ac.params.parallax&&ac.parallax.setTranslate()),ac.attachEvents(),ac.params.observer&&ac.support.observer&&ac.initObservers(),ac.params.updateOnImagesReady&&ac.preloadImages(),ac.params.autoplay&&ac.startAutoplay(),ac.params.keyboardControl&&ac.enableKeyboardControl&&ac.enableKeyboardControl(),ac.params.mousewheelControl&&ac.enableMousewheelControl&&ac.enableMousewheelControl(),ac.params.hashnav&&ac.hashnav&&ac.hashnav.init(),ac.params.onInit&&ac.params.onInit(ac)
},ac.destroy=function(a){ac.detachEvents(),ac.disconnectObservers(),ac.params.keyboardControl&&ac.disableKeyboardControl&&ac.disableKeyboardControl(),ac.params.mousewheelControl&&ac.disableMousewheelControl&&ac.disableMousewheelControl(),ac.params.onDestroy&&ac.params.onDestroy(),a!==!1&&(ac=null)
},ac.init(),ac
}},Swiper.prototype={isSafari:function(){var a=navigator.userAgent.toLowerCase();
return a.indexOf("safari")>=0&&a.indexOf("chrome")<0&&a.indexOf("android")<0
}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function(a){return"[object Array]"===Object.prototype.toString.apply(a)
},browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled},device:function(){var k=navigator.userAgent,i=k.match(/(Android);?[\s\/]+([\d.]+)?/),h=k.match(/(iPad).*OS\s([\d_]+)/),j=(k.match(/(iPod)(.*OS\s([\d_]+))?/),!h&&k.match(/(iPhone\sOS)\s([\d_]+)/));
return{ios:h||j||h,android:i}
}(),support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return !!("ontouchstart" in window||window.DocumentTouch&&document instanceof DocumentTouch)
}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var a=document.createElement("div").style;
return"webkitPerspective" in a||"MozPerspective" in a||"OPerspective" in a||"MsPerspective" in a||"perspective" in a
}(),flexbox:function(){for(var j=document.createElement("div").style,i="WebkitBox msFlexbox MsFlexbox WebkitFlex MozBox flex".split(" "),h=0;
h<i.length;
h++){if(i[h] in j){return !0
}}}(),observer:function(){return"MutationObserver" in window||"WebkitMutationObserver" in window
}()}};
for(var c=(function(){var h=function(k){var j=this,i=0;
for(i=0;
i<k.length;
i++){j[i]=k[i]
}return j.length=k.length,this
},a=function(m,j){var q=[],p=0;
if(m&&!j&&m instanceof h){return m
}if(m){if("string"==typeof m){var k,v,u=m.trim();
if(u.indexOf("<")>=0&&u.indexOf(">")>=0){var e="div";
for(0===u.indexOf("<li")&&(e="ul"),0===u.indexOf("<tr")&&(e="tbody"),(0===u.indexOf("<td")||0===u.indexOf("<th"))&&(e="tr"),0===u.indexOf("<tbody")&&(e="table"),0===u.indexOf("<option")&&(e="select"),v=document.createElement(e),v.innerHTML=m,p=0;
p<v.childNodes.length;
p++){q.push(v.childNodes[p])
}}else{for(k=j||"#"!==m[0]||m.match(/[ .<>:~]/)?(j||document).querySelectorAll(m):[document.getElementById(m.split("#")[1])],p=0;
p<k.length;
p++){k[p]&&q.push(k[p])
}}}else{if(m.nodeType||m===window||m===document){q.push(m)
}else{if(m.length>0&&m[0].nodeType){for(p=0;
p<m.length;
p++){q.push(m[p])
}}}}}return new h(q)
};
return h.prototype={addClass:function(l){if("undefined"==typeof l){return this
}for(var j=l.split(" "),i=0;
i<j.length;
i++){for(var k=0;
k<this.length;
k++){this[k].classList.add(j[i])
}}return this
},removeClass:function(l){for(var j=l.split(" "),i=0;
i<j.length;
i++){for(var k=0;
k<this.length;
k++){this[k].classList.remove(j[i])
}}return this
},hasClass:function(i){return this[0]?this[0].classList.contains(i):!1
},toggleClass:function(l){for(var j=l.split(" "),i=0;
i<j.length;
i++){for(var k=0;
k<this.length;
k++){this[k].classList.toggle(j[i])
}}return this
},attr:function(l,j){if(1===arguments.length&&"string"==typeof l){return this[0]?this[0].getAttribute(l):void 0
}for(var i=0;
i<this.length;
i++){if(2===arguments.length){this[i].setAttribute(l,j)
}else{for(var k in l){this[i][k]=l[k],this[i].setAttribute(k,l[k])
}}}return this
},removeAttr:function(j){for(var i=0;
i<this.length;
i++){this[i].removeAttribute(j)
}},data:function(m,j){if("undefined"==typeof j){if(this[0]){var i=this[0].getAttribute("data-"+m);
return i?i:this[0].dom7ElementDataStorage&&m in this[0].dom7ElementDataStorage?this[0].dom7ElementDataStorage[m]:void 0
}return void 0
}for(var l=0;
l<this.length;
l++){var k=this[l];
k.dom7ElementDataStorage||(k.dom7ElementDataStorage={}),k.dom7ElementDataStorage[m]=j
}return this
},transform:function(k){for(var j=0;
j<this.length;
j++){var i=this[j].style;
i.webkitTransform=i.MsTransform=i.msTransform=i.MozTransform=i.OTransform=i.transform=k
}return this
},transition:function(k){"string"!=typeof k&&(k+="ms");
for(var j=0;
j<this.length;
j++){var i=this[j].style;
i.webkitTransitionDuration=i.MsTransitionDuration=i.msTransitionDuration=i.MozTransitionDuration=i.OTransitionDuration=i.transitionDuration=k
}return this
},on:function(t,k,q,p){function m(r){var o=r.target;
if(a(o).is(k)){q.call(o,r)
}else{for(var l=a(o).parents(),w=0;
w<l.length;
w++){a(l[w]).is(k)&&q.call(l[w],r)
}}}var v,u,j=t.split(" ");
for(v=0;
v<this.length;
v++){if("function"==typeof k||k===!1){for("function"==typeof k&&(q=arguments[1],p=arguments[2]||!1),u=0;
u<j.length;
u++){this[v].addEventListener(j[u],q,p)
}}else{for(u=0;
u<j.length;
u++){this[v].dom7LiveListeners||(this[v].dom7LiveListeners=[]),this[v].dom7LiveListeners.push({listener:q,liveListener:m}),this[v].addEventListener(j[u],m,p)
}}}return this
},off:function(q,l,j,p){for(var m=q.split(" "),k=0;
k<m.length;
k++){for(var v=0;
v<this.length;
v++){if("function"==typeof l||l===!1){"function"==typeof l&&(j=arguments[1],p=arguments[2]||!1),this[v].removeEventListener(m[k],j,p)
}else{if(this[v].dom7LiveListeners){for(var u=0;
u<this[v].dom7LiveListeners.length;
u++){this[v].dom7LiveListeners[u].listener===j&&this[v].removeEventListener(m[k],this[v].dom7LiveListeners[u].liveListener,p)
}}}}}return this
},once:function(o,l,j,n){function m(e){j(e),k.off(o,l,m,n)
}var k=this;
"function"==typeof l&&(l=!1,j=arguments[1],n=arguments[2]),k.on(o,l,m,n)
},trigger:function(m,j){for(var i=0;
i<this.length;
i++){var l;
try{l=new CustomEvent(m,{detail:j,bubbles:!0,cancelable:!0})
}catch(k){l=document.createEvent("Event"),l.initEvent(m,!0,!0),l.detail=j
}this[i].dispatchEvent(l)
}return this
},transitionEnd:function(m){function j(e){if(e.target===this){for(m.call(this,e),i=0;
i<l.length;
i++){k.off(l[i],j)
}}}var i,l=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],k=this;
if(m){for(i=0;
i<l.length;
i++){k.on(l[i],j)
}}return this
},width:function(){return this[0]===window?window.innerWidth:this.length>0?parseFloat(this.css("width")):null
},outerWidth:function(i){return this.length>0?i?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null
},height:function(){return this[0]===window?window.innerHeight:this.length>0?parseFloat(this.css("height")):null
},outerHeight:function(i){return this.length>0?i?this[0].offsetHeight+parseFloat(this.css("margin-top"))+parseFloat(this.css("margin-bottom")):this[0].offsetHeight:null
},offset:function(){if(this.length>0){var p=this[0],l=p.getBoundingClientRect(),j=document.body,o=p.clientTop||j.clientTop||0,m=p.clientLeft||j.clientLeft||0,k=window.pageYOffset||p.scrollTop,q=window.pageXOffset||p.scrollLeft;
return{top:l.top+k-o,left:l.left+q-m}
}return null
},css:function(l,j){var i;
if(1===arguments.length){if("string"!=typeof l){for(i=0;
i<this.length;
i++){for(var k in l){this[i].style[k]=l[k]
}}return this
}if(this[0]){return window.getComputedStyle(this[0],null).getPropertyValue(l)
}}if(2===arguments.length&&"string"==typeof l){for(i=0;
i<this.length;
i++){this[i].style[l]=j
}return this
}return this
},each:function(j){for(var i=0;
i<this.length;
i++){j.call(this[i],i,this[i])
}return this
},html:function(j){if("undefined"==typeof j){return this[0]?this[0].innerHTML:void 0
}for(var i=0;
i<this.length;
i++){this[i].innerHTML=j
}return this
},is:function(e){if(!this[0]){return !1
}var l,k;
if("string"==typeof e){var j=this[0];
if(j===document){return e===document
}if(j===window){return e===window
}if(j.matches){return j.matches(e)
}if(j.webkitMatchesSelector){return j.webkitMatchesSelector(e)
}if(j.mozMatchesSelector){return j.mozMatchesSelector(e)
}if(j.msMatchesSelector){return j.msMatchesSelector(e)
}for(l=a(e),k=0;
k<l.length;
k++){if(l[k]===this[0]){return !0
}}return !1
}if(e===document){return this[0]===document
}if(e===window){return this[0]===window
}if(e.nodeType||e instanceof h){for(l=e.nodeType?[e]:e,k=0;
k<l.length;
k++){if(l[k]===this[0]){return !0
}}return !1
}return !1
},index:function(){if(this[0]){for(var j=this[0],i=0;
null!==(j=j.previousSibling);
){1===j.nodeType&&i++
}return i
}return void 0
},eq:function(i){if("undefined"==typeof i){return this
}var e,j=this.length;
return i>j-1?new h([]):0>i?(e=j+i,new h(0>e?[]:[this[e]])):new h([this[i]])
},append:function(i){var e,k;
for(e=0;
e<this.length;
e++){if("string"==typeof i){var j=document.createElement("div");
for(j.innerHTML=i;
j.firstChild;
){this[e].appendChild(j.firstChild)
}}else{if(i instanceof h){for(k=0;
k<i.length;
k++){this[e].appendChild(i[k])
}}else{this[e].appendChild(i)
}}}return this
},prepend:function(i){var e,k;
for(e=0;
e<this.length;
e++){if("string"==typeof i){var j=document.createElement("div");
for(j.innerHTML=i,k=j.childNodes.length-1;
k>=0;
k--){this[e].insertBefore(j.childNodes[k],this[e].childNodes[0])
}}else{if(i instanceof h){for(k=0;
k<i.length;
k++){this[e].insertBefore(i[k],this[e].childNodes[0])
}}else{this[e].insertBefore(i,this[e].childNodes[0])
}}}return this
},insertBefore:function(l){for(var i=a(l),k=0;
k<this.length;
k++){if(1===i.length){i[0].parentNode.insertBefore(this[k],i[0])
}else{if(i.length>1){for(var j=0;
j<i.length;
j++){i[j].parentNode.insertBefore(this[k].cloneNode(!0),i[j])
}}}}},insertAfter:function(l){for(var i=a(l),k=0;
k<this.length;
k++){if(1===i.length){i[0].parentNode.insertBefore(this[k],i[0].nextSibling)
}else{if(i.length>1){for(var j=0;
j<i.length;
j++){i[j].parentNode.insertBefore(this[k].cloneNode(!0),i[j].nextSibling)
}}}}},next:function(e){return new h(this.length>0?e?this[0].nextElementSibling&&a(this[0].nextElementSibling).is(e)?[this[0].nextElementSibling]:[]:this[0].nextElementSibling?[this[0].nextElementSibling]:[]:[])
},nextAll:function(e){var l=[],k=this[0];
if(!k){return new h([])
}for(;
k.nextElementSibling;
){var j=k.nextElementSibling;
e?a(j).is(e)&&l.push(j):l.push(j),k=j
}return new h(l)
},prev:function(e){return new h(this.length>0?e?this[0].previousElementSibling&&a(this[0].previousElementSibling).is(e)?[this[0].previousElementSibling]:[]:this[0].previousElementSibling?[this[0].previousElementSibling]:[]:[])
},prevAll:function(e){var l=[],k=this[0];
if(!k){return new h([])
}for(;
k.previousElementSibling;
){var j=k.previousElementSibling;
e?a(j).is(e)&&l.push(j):l.push(j),k=j
}return new h(l)
},parent:function(k){for(var i=[],j=0;
j<this.length;
j++){k?a(this[j].parentNode).is(k)&&i.push(this[j].parentNode):i.push(this[j].parentNode)
}return a(a.unique(i))
},parents:function(l){for(var i=[],k=0;
k<this.length;
k++){for(var j=this[k].parentNode;
j;
){l?a(j).is(l)&&i.push(j):i.push(j),j=j.parentNode
}}return a(a.unique(i))
},find:function(k){for(var e=[],m=0;
m<this.length;
m++){for(var l=this[m].querySelectorAll(k),j=0;
j<l.length;
j++){e.push(l[j])
}}return new h(e)
},children:function(e){for(var l=[],k=0;
k<this.length;
k++){for(var j=this[k].childNodes,m=0;
m<j.length;
m++){e?1===j[m].nodeType&&a(j[m]).is(e)&&l.push(j[m]):1===j[m].nodeType&&l.push(j[m])
}}return new h(a.unique(l))
},remove:function(){for(var i=0;
i<this.length;
i++){this[i].parentNode&&this[i].parentNode.removeChild(this[i])
}return this
},add:function(){var l,i,k=this;
for(l=0;
l<arguments.length;
l++){var j=a(arguments[l]);
for(i=0;
i<j.length;
i++){k[k.length]=j[i],k.length++
}}return k
}},a.fn=h.prototype,a.unique=function(k){for(var j=[],i=0;
i<k.length;
i++){-1===j.indexOf(k[i])&&j.push(k[i])
}return j
},a
}()),b=["jQuery","Zepto","Dom7"],f=0;
f<b.length;
f++){window[b[f]]&&g(window[b[f]])
}var d;
d="undefined"==typeof c?window.Dom7||window.Zepto||window.jQuery:c,d&&("transitionEnd" in d.fn||(d.fn.transitionEnd=function(l){function i(a){if(a.target===this){for(l.call(this,a),h=0;
h<k.length;
h++){j.off(k[h],i)
}}}var h,k=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],j=this;
if(l){for(h=0;
h<k.length;
h++){j.on(k[h],i)
}}return this
}),"transform" in d.fn||(d.fn.transform=function(j){for(var i=0;
i<this.length;
i++){var h=this[i].style;
h.webkitTransform=h.MsTransform=h.msTransform=h.MozTransform=h.OTransform=h.transform=j
}return this
}),"transition" in d.fn||(d.fn.transition=function(j){"string"!=typeof j&&(j+="ms");
for(var i=0;
i<this.length;
i++){var h=this[i].style;
h.webkitTransitionDuration=h.MsTransitionDuration=h.msTransitionDuration=h.MozTransitionDuration=h.OTransitionDuration=h.transitionDuration=j
}return this
}))
}(),"undefined"!=typeof module?module.exports=Swiper:"function"==typeof define&&define.amd&&define([],function(){return Swiper
});
var relatedSwiper=new Swiper("#related-cont-container",{pagination:"#related-cont-container-pag",createPagination:true,mode:"horizontal",paginationClickable:true,spaceBetween:10});
var assocSwiper=new Swiper("#assoc-prod-container",{pagination:"#assoc-cont-container-pag",createPagination:true,mode:"horizontal",paginationClickable:true,spaceBetween:10});
var hltdTopicsSwiper=new Swiper("#hltd-topics-container",{pagination:"#hltd-topics-container-pag",createPagination:true,mode:"horizontal",paginationClickable:true,spaceBetween:10});
function createImageGallerySlider(){var c;
var a={};
var b={};
if(jQuery(".image-swiper-search").length){jQuery(".image-swiper-search").each(function(d,e){c=jQuery(e).attr("id");
c=c.replace(/-[^-]*$/,"");
c="#"+c;
a[d]=new Swiper(c+"-container",{pagination:c+"-pagination",nextButton:c+"-next",prevButton:c+"-prev",slidesPerView:1,paginationClickable:true,spaceBetween:30,loop:true})
})
}}function fixSwiper(){if(jQuery(window).width()<979){relatedSwiper.params.slidesPerView=1;
jQuery("#related-cont-container-pag").css("display","block");
if(jQuery("#related-cont-container").length){relatedSwiper.unlockSwipes()
}assocSwiper.params.slidesPerView=1;
jQuery("#assoc-cont-container-pag").css("display","block");
if(jQuery("#assoc-prod-container").length){assocSwiper.unlockSwipes()
}hltdTopicsSwiper.params.slidesPerView=1;
jQuery("#hltd-topics-container-pag").css("display","block");
if(jQuery("#hltd-topics-container").length){hltdTopicsSwiper.unlockSwipes()
}}else{if(jQuery(window).width()>=980){relatedSwiper.params.slidesPerView=3;
jQuery("#related-cont-container-pag").css("display","none");
if(jQuery("#related-cont-container").length){relatedSwiper.lockSwipes()
}assocSwiper.params.slidesPerView=3;
jQuery("#assoc-cont-container-pag").css("display","none");
if(jQuery("#assoc-prod-container").length){assocSwiper.lockSwipes()
}hltdTopicsSwiper.params.slidesPerView=3;
jQuery("#hltd-topics-container-pag").css("display","none");
if(jQuery("#hltd-topics-container").length){hltdTopicsSwiper.lockSwipes()
}}}if(jQuery("#related-cont-container").length){relatedSwiper.update(true)
}if(jQuery("#assoc-prod-container").length){assocSwiper.update(true)
}if(jQuery("#hltd-topics-container").length){hltdTopicsSwiper.update(true)
}}fixSwiper();
jQuery(window).resize(function(){fixSwiper()
});
createImageGallerySlider();