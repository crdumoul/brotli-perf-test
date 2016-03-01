/**
*
* To Do
* =====
* - Use JSDoc to do documentation
* - Don't show arrows if there is only one item
* - Make hookin to allow parent scope to know what scroll index your on, and to respond to scrolls
*
* Notes
* =====
* - The carousel uses an isolated scope in order to avoid collisions when used with other scopes throughout the site.
*   This means it cannot be used on the same element as another directive that has an isolated, or child scope. Docs: https://docs.angularjs.org/api/ng/service/$compile
*
**/

(function() {'use strict';

var distanceToScroll = 75;

Sephora.ui.directive.sephCarouselNew = function() {

  return {
    // require: "?^sephCompCarousel",
    restrict: 'A',
    transclude: true,
    template:
      '<div class="CarouselNew-wrap"><ul ng-transclude class="CarouselNew-list">' +
      '</ul></div>' +
      '<div class="CarouselNew-control CarouselNew-control--prev"><span class="Icon Icon--arrowLeft"></span></div>' +
      '<div class="CarouselNew-control CarouselNew-control--next"><span class="Icon Icon--arrowRight"></span></div>',
    scope: {
      carouselModel: '=',
      carouselOptions: '='
    },
    // link: function(scope, carousel, attrs, ctrl, transcludeFn) {},
    controller: 'sephCarouselNewCtrl'
  }
}

Sephora.ui.controller.sephCarouselNew = function(scope, carousel, attrs) {
  
  var self = this,
      renderFrame,
      // showItems,
      listWrap = carousel.find('div:first-of-type'),
      listUL = listWrap.find('ul:first-of-type')[0],
      visibleArea = listWrap[0].getBoundingClientRect().width,
      touchPos,
      posX = 0,
      touchX = 0,
      loopScroll = attrs.circle && attrs.circle != "false",
      scrollEnd = visibleArea,
      hasInit = false,
      // Button vars
      leftBtn = carousel.find('.CarouselNew-control--prev'),
      leftBtnDisabled,
      rightBtn = carousel.find('.CarouselNew-control--next'),
      rightBtnDisabled,
      // Touch vars
      originalTouch;
  
  leftBtn.addClass('Carousel-control--disabled');
  leftBtnDisabled = true;
    
  self.init = function(){
    
    rightBtn.on('click', self.clickNext);
    leftBtn.on('click', self.clickPrev);

    carousel.find('.CarouselNew-wrap').on('touchstart', self.touchStart);
    
    if(!scope.carouselOptions) scope.carouselOptions = {};
    hasInit = true;
    // Add x items to the beginning and end of the carousel if infinite scrolling.
    // These act as a buffer when you've scrolled past the beginning or end.
  }
  self.disable = function(){
    
    rightBtn.off('click', self.clickNext);
    leftBtn.off('click', self.clickPrev);

    carousel.find('.CarouselNew-wrap').off('touchstart', self.touchStart);
    
    hasInit = false;
  }
  
  self.refreshModel = function(newValue, oldValue) {
    if (scope.carouselModel) {
      if (!hasInit && scope.carouselModel.length > attrs.show) self.init();
      if(scope.carouselModel.length <= attrs.show) {
        // There are not enouph items to scroll
        if (hasInit) self.disable();
        leftBtn[0].style.visibility = rightBtn[0].style.visibility = "hidden";
      } else {
        leftBtn[0].style.visibility = rightBtn[0].style.visibility = "";
      }
      
      scrollEnd = visibleArea * Math.ceil(scope.carouselModel.length / attrs.show);
    } else {
      scrollEnd = visibleArea;
    }
  }
  
  self.clickNext = function() {
    
    if(rightBtnDisabled) return; // Workaround for IE9 & 10 not supporting pointer-events: none;
    
    // Animate right
    posX -= visibleArea;
    listUL.style.transform = 'translateX(' + posX + 'px)';
    
    if (loopScroll) {
      // Reset to the beginning of the list if you've scrolled past the last item
      
    } else {
      // Disable scrolling right if you've scrolled to the last item
      if (posX <= (visibleArea - scrollEnd)) {
        rightBtn.addClass('Carousel-control--disabled');
        rightBtnDisabled = true;
      }
      // Reenable left scroll
      if (leftBtnDisabled && posX < 0) {
        leftBtn.removeClass('Carousel-control--disabled');
        leftBtnDisabled = false;
      }
    }
    
    // Fire any callbacks registered from parent scope
    if(scope.carouselOptions.onScroll) scope.carouselOptions.onScroll({dir:'right'});
  }
  self.clickPrev = function() {
    
    if(leftBtnDisabled) return; // Workaround for IE9 & 10 not supporting pointer-events: none;
    
    // Animate left
    posX += visibleArea;
    listUL.style.transform = 'translateX(' + posX + 'px)';
    
    if (loopScroll) {
      // Reset to the end of the list if you've scrolled past the first item
      
    } else {
      // Disable scrolling left if you've scrolled to the last item
      if (posX >= 0) {
        leftBtn.addClass('Carousel-control--disabled');
        leftBtnDisabled = true;
      }
      // Reenable right scroll
      if (rightBtnDisabled && posX > -(scrollEnd - visibleArea)) {
        rightBtn.removeClass('Carousel-control--disabled');
        rightBtnDisabled = false;
      }
    }
    
    // Fire any callbacks registered from parent scope
    if(scope.carouselOptions.onScroll) scope.carouselOptions.onScroll({dir:'left'});
  }
  
  self.touchStart = function(e) {

    touchX = originalTouch = e.originalEvent.touches[0].clientX;
    // console.log('TouchStart:: originalTouch: ' + originalTouch);
    //Disable transition
    renderFrame = requestAnimationFrame(self.render);
    $(document.documentElement).on('touchmove', self.touchMove);
    $(document.documentElement).on('touchend touchcancel', self.touchEnd);
    
    listUL.style.transition = 'none';
    
    // Fire any callbacks registered from parent scope
    if(scope.carouselOptions.onTouchStart) scope.carouselOptions.onTouchStart();
  }
  self.touchMove = function(e) {
    
    touchX = e.originalEvent.touches[0].clientX;
    e.originalEvent.preventDefault();
  }
  self.touchEnd = function(e) {

    var possDiff;
    function dontScroll() {
      // Set position back to its original location
      listUL.style.transform = 'translateX(' + posX + 'px)';
    }
    
    if (touchPos > 0 || touchPos < (visibleArea - scrollEnd)) {
      dontScroll();
    } else {
      possDiff = touchX - originalTouch;
      if (possDiff > distanceToScroll) {
        self.clickPrev();
      } else if(possDiff < -distanceToScroll) {
        self.clickNext();
      } else {
        dontScroll();
      }
    }
    cancelAnimationFrame(renderFrame);
    $(document.documentElement).off('touchmove', self.touchMove);
    $(document.documentElement).off('touchend touchcancel', self.touchEnd);
    listUL.style.transition = '';
  }

  self.render = function() {
    touchPos = posX + (touchX - originalTouch);
    // console.log('Render:: touchPos: ' + touchPos);
    listUL.style.transform = 'translateX(' + touchPos + 'px)';
    renderFrame = requestAnimationFrame(self.render);
  }
  
  scope.$watch('carouselModel', self.refreshModel);
  
}


// angular.module('s.carousel', [])
// .directive("sephCarouselNew", Sephora.ui.directive.sephCarouselNew);

var app = angular.module("Sephora"),
    carouselApp = angular.module('s.carousel', []);
    
carouselApp.directive('sephCarouselNew', Sephora.ui.directive.sephCarouselNew);
carouselApp.controller('sephCarouselNewCtrl', ['$scope', '$element', '$attrs', Sephora.ui.controller.sephCarouselNew])
// Add s.carousel module to Sephora module dependencies
app.requires.push('s.carousel');

})();