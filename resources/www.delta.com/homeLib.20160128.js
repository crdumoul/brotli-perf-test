var delta = delta || {};
delta.promowidget = (function (window, $CQ) {
    var _this;
    var $c;
    var $currentPanel;
    var $nav;
    var autoPlayInterval;
    var currentPanelIndex = -1;
    var i;
    var isAnimating;
    var isAutoPlayDisabled = true;
    var minPanelIndex = 0;
    var maxPanelIndex = -1;
    var panels = [];
    var panelWidth = -1;
    var promotions;
    var promotionsCount = -1;
    var promotionsPerSet = 3;
    var transitionDuration = 1000;
    var pub = {};	
    pub.getNextPanelIndex = function() {
        if (currentPanelIndex+1 > maxPanelIndex) {
            return minPanelIndex;
        } else {
            return currentPanelIndex + 1;
        }
    }
    pub.animatePanelOut = function($panel) {
        if (currentPanelIndex < 0) {
            return $panel;
        } else {
            $panel.attr('style','display:none');
            return $panel.removeClass('current').animate({ left: -1 * panelWidth }, transitionDuration, 'easeInOutExpo');
        }
    }
    pub.animatePanelIn = function($panel) {
        $panel.attr('style','');
        return $panel.addClass('current').show().css('left', panelWidth).animate({ left: 0 }, transitionDuration, 'easeInOutExpo');
    }
    pub.rotatePanel = function(){
        if(isAutoPlayDisabled) {return; }
        delta.promowidget.showPanel(delta.promowidget.getNextPanelIndex());
    }
    pub.showPanel = function(newPanelIndex) {
        var $newPanel;
        // Ignore if panel doesn't change or if already animating a panel transition
        if ((newPanelIndex === currentPanelIndex) || isAnimating) {
            return;
        }
        isAnimating = true;
        $CQ.when(
                 delta.promowidget.animatePanelOut($(panels[currentPanelIndex])),
                 delta.promowidget.animatePanelIn($(panels[newPanelIndex]))
                ).then(function () {
            isAnimating = false;
        });
        $c.attr('style',''); 

        $("div[class='panel']:eq(" + newPanelIndex + ")").hide();
        $("div[class='panel']:eq(" + (newPanelIndex + 1) + ")").hide();

        $(panels[newPanelIndex]).parent('.deal-promotions').css({'z-index':'10'});
        currentPanelIndex = newPanelIndex;
    }
    pub.navClicked = function(e) {
        var $li = $CQ(e.currentTarget),
        newPanelIndex;
        newPanelIndex = $li.data('index');
        window.clearInterval(autoPlayInterval);
        delta.promowidget.showPanel(newPanelIndex);
    }
    pub.getPreviousSet = function(){
        if(currentPanelIndex === 0){
            newPanelIndex = maxPanelIndex;
        } else {
            newPanelIndex = currentPanelIndex-1;
        }
        delta.promowidget.showPanel(newPanelIndex);
    }
    pub.getNextSet = function(){
        if(currentPanelIndex === maxPanelIndex){
            newPanelIndex = 0;
        } else {
            newPanelIndex = currentPanelIndex+1;
        }
        delta.promowidget.showPanel(newPanelIndex);
    }
    pub.init = function () {
        _this = this;
        $c = $CQ('.deal-promotions');
        var $fareSales = $CQ('.deal-promotions article');
        var numFareSale = $fareSales.length;
        if(numFareSale === 0){
            return; // no fare sales
        } else if(numFareSale <= promotionsPerSet) {
            $fareSales.wrapAll('<div class="panel"></div>');
            return; //no need for navigation
        } else {
            $fareSales.each( function (index, el) {
                var $article = $CQ(this);
                if (index % 3 === 0 ) {
                    $article.add( $article.next() ).add( $article.next().next() ).wrapAll('<div class="panel"></div>');
                }
            });
        }
        panels = $c.find('.panel');
        minPanelIndex = 0;
        maxPanelIndex = panels.length - 1;

        //addding leftnav arrow element before panels
        $c.prepend("<abbr title=\"Previous\"><a class=\"faresale_leftNav\" href=\"javascript:void(0)\"></a></abbr>");

        //addding rightnav arrow element after panels
        $c.append("<abbr title=\"Next\"><a class=\"faresale_rightNav\" href=\"javascript:void(0)\"></a></abbr>");

        $(".faresale_leftNav").on("click", function(){
            delta.promowidget.getPreviousSet();
        });
        $(".faresale_rightNav").on("click", function(){
            delta.promowidget.getNextSet();
        });
        panelWidth = $c.width();
        delta.promowidget.showPanel(minPanelIndex);
        delta.promowidget.currentPanelIndex = 0;
    }
    return pub;
})(window, jQuery);
var delta = delta || {};
delta.advisorywidget = (function(window, $){
    var $c,         // container for widget as JQuery object
    $nextButton,
    $prevButton,
    $closeButton,
    that = this,    // context for events
    advisoryList,
    maxIndex = -1,
    currentIndex = -1,
    animSpeed = 200,
    initialized = false;

    function showDetailView() {
        $c.find('.slider').addClass('detail');
    }

    function hideDetailView() {
        if(initialized) {
            $c.find('.slider').removeClass('detail');
        }
    }

    function articleClicked() {
        showDetailView();
    }

    function closeClicked() {
        hideDetailView();
    }

    function prevClicked() {
        // Display Previous Advisory

        // If at the beginning of the list, jumped to cloned first element
        // at the end and animated from there
        $(advisoryList[currentIndex]).hide();
        if(currentIndex === 0) {
            $(advisoryList[currentIndex]).hide();
            currentIndex = maxIndex;
            $(advisoryList[currentIndex]).next().show();
        } else {
            currentIndex--;
        }

       /* $(advisoryList[currentIndex]).css('marginLeft', -292)
            .show()
            .animate({ marginLeft: 0 }, animSpeed, function() {
                $(this).next().hide();
            });*/
        $(advisoryList[currentIndex]).show();

    }

    function nextClicked() {
        // Display Next Advisory
        // Animate Current Advisory to the Left
        // Hide the Current Advisory after the animation is complete

        // At the end of the list, animate with a cloned version of the 
        // advisory. After the animation is complete, jump to the front of the list
      /*  $(advisoryList[currentIndex]).next().show().end()
            .animate({ marginLeft: -292 }, animSpeed, function() {
                $(this).hide().css('marginLeft',0);*/

                // Special case for the end of the list of advisories
        if(currentIndex >= maxIndex) {
            $(advisoryList[currentIndex]).hide();
            currentIndex = 0;
            $(advisoryList[currentIndex]).show();
        } else{
            $(advisoryList[currentIndex]).hide();
            $(advisoryList[currentIndex+1]).show();
           /* });*/
            currentIndex++;
        }
    }

    function buildHTML() {
        // Only add buttons if they are needed
        if(maxIndex > 0) {
            $nextButton = $('<div />', {
                'class': 'nav next'
            }).appendTo($c);

            $prevButton = $('<div />', {
                'class': 'nav prev'
            }).prependTo($c);
        }

    }



    function bindEvents() {
        $c.delegate('.prev', 'click', $.proxy(prevClicked, that))
                .delegate('.next', 'click', $.proxy(nextClicked, that));
    }

    return {
init: function() {
          var advisoryCount;

          $c = $('#advisory .window');
          advisoryList = $c.find('article');

          advisoryCount = advisoryList.length;
          if(advisoryCount === 0) {
              return;
          }
          initialized = true;
          maxIndex = advisoryCount - 1;
          currentIndex = 0;

            // Hide All but First Advisory
            // HTML should already have done this to prevent a flicker of content
          advisoryList.filter(':gt(0)').hide();

          advisoryList.first().clone().hide().appendTo('.slider', $c);

          //buildHTML();
          bindEvents();
          hideDetailView(); // Default to collapsed view.  
      },
close: hideDetailView
    };
})(window, jQuery);

$(document).ready(function(window, jQuery) {
    delta.advisorywidget.init(window, jQuery);  
});

var counter = 0;
Date.locale = {
    en: {
       month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
       month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
};
var d, cd, date1, day1, month1, year1, timeSplit, splitDate, m, yr, mth, day, hrs, min, sec, rtnVal;
function returnDateDiff(b) {
    cd = new Date;
    splitDate = b.split(" ");
    date1 = splitDate[2];
    day1= date1.split("");
    if(day1[0]=="0"){day1=day1[1];}
    else{day1=date1;}
    month1 = include(Date.locale['en'].month_names_short,splitDate[1]);
    year1 = splitDate[5];
    time1 = splitDate[3];
    timeSplit = time1.split(":");
    d = new Date(parseInt(year1), parseInt(month1), parseInt(day1), parseInt(timeSplit[0]), parseInt(timeSplit[1]), timeSplit[2]);  
    m = DateDiff(cd, d);
    if(m>=0){   
        yr = Math.floor(m /(3600*24*1000*365));
        mth = Math.floor(m /(3600*24*1000*30));
        day = Math.floor(m /(3600*24*1000));
        hrs = Math.floor(m /(3600*1000));
        min = Math.floor(m /(60*1000));
        sec = Math.floor(m /1000);
    }   
    if (yr > 0){                
        if(yr == 1){rtnVal = yr + " year ago";}
        else{rtnVal = yr + " years ago";}                               
    }else if (mth > 0){             
        if(mth == 1){rtnVal = mth + " month ago";}
        else{rtnVal = mth + " months ago";}                     
    }else if (day > 0){ 
        if(day == 1){rtnVal = day + " day ago";}
        else{rtnVal = day + " days ago";}   
    }else if (hrs > 0){ 
        if(hrs == 1){rtnVal = hrs + " hour ago";}
        else{rtnVal = hrs + " hours ago";}  
    }else if (min > 0){                 
        rtnVal = min + " minutes ago";
    }else if (sec > 0){                     
        rtnVal = sec + " seconds ago";
    }else{
        rtnVal="";
    }                           
    return rtnVal;
}
function include(arr, obj) {
    for(var i=0; i<arr.length; i++) {
        if (arr[i] == obj) return i;
    }
}

function DateDiff(b, c) {
  return b.getTime() - c.getTime()
}
            

var timer_is_on=0;
function timedCount(){
    if ($.browser.safari){  
        fadeEffect.init('twitContent', 0);
    }else{
        fadeOut();  
    }
    loadValuesToScreen();   
    t = setTimeout("timedCount()",10000);   
}

function doTimer(){
if (!timer_is_on)
  {
  timer_is_on = 1;
  timedCount();
  }
}

function loadValuesToScreen(){
    if(counter<responseObj-1){
        counter=counter+1;
    }else{
        counter = 0;    
    }   
    
    $("#twitterDisplayName").html(x[counter][1]);
    $("#twitterTweets").html(x[counter][0]);        
    $("#timeDiff").html(returnDateDiff(x[counter][2])); 
    counter=counter+1;  
    
    if ($.browser.safari){  
        fadeEffect.init('twitContent', 1);
    }else{  
        FadeIn();
    }
}

var duration = 1000; /* fade duration in millisecond */
function SetOpa(Opa) {/* TODO: Set CSS*/
 /* $("#twitContent").css(opacity = Opa);
  $("#twitContent").style.MozOpacity = Opa;
  $("#twitContent").style.KhtmlOpacity = Opa;
  $("#twitContent").style.filter = 'alpha(opacity=' + (Opa * 100) + ');';
  $("#twitContent").style.opacity = Opa;
  $("#timeDiff").style.MozOpacity = Opa;
  $("#timeDiff").style.KhtmlOpacity = Opa;
  $("#timeDiff").style.filter = 'alpha(opacity=' + (Opa * 100) + ');';*/
}

function fadeOut() {
  for (i = 0; i <= 1; i += 0.01) {
    setTimeout("SetOpa(" + (1 - i) +")", i * duration);
  } 
}
function FadeIn() {
  for (i = 0; i <= 1; i += 0.01) {
    setTimeout("SetOpa(" + i +")", i * duration);
  } 
}
var fadeEffect=function(){
    return{
        init:function(id, flag, target){
            this.elem = document.getElementById(id);
            clearInterval(this.elem.si);
            this.target = target ? target : flag ? 100 : 0;
            this.flag = flag || -1;
            this.alpha = this.elem.style.opacity ? parseFloat(this.elem.style.opacity) * 100 : 0;
            this.si = setInterval(function(){fadeEffect.tween()}, 20);
        },
        tween:function(){
            if(this.alpha == this.target){
                clearInterval(this.si);
            }else{
                var value = Math.round(this.alpha + ((this.target - this.alpha) * .05)) + (1 * this.flag);
                this.elem.style.opacity = value / 100;
                this.elem.style.filter = 'alpha(opacity=' + value + ')';
                this.alpha = value
            }
        }
    }
}();
function returnFormatedString(st){
    var b, c, cc, dd;
    if(st.indexOf("http") !=-1){
         b = st.substring(0,st.indexOf("http"));
         c = st.substring(st.indexOf("http"));
         cc = c.substring(0, c.indexOf(" "));
        if(cc == "" && c.substring(c.length-1, c.length) ==".")cc = c.substring(0, c.length-1);/* check for "." at end*/
        if(c.indexOf(". ") !=-1)cc = c.substring(0, c.indexOf(". "));/* check for ". " after url*/
        if(cc=="")cc=c;
        dd = st.substring(st.indexOf(cc)+cc.length);
        if(dd==" ")dd="";
        st= b+"<span class='hp_NewssubLink'>"+cc +"</span>"+dd;
    }
    return st; 
}
/*
function onloadTwitterContents(){   
    if(responseObj>0){
        doTimer();
    }
}
if(document.loaded) {
    onloadTwitterContents();
} else {
    if (window.addEventListener) {  
        window.addEventListener('load', onloadTwitterContents, false);
    } else {
        window.attachEvent('onload', onloadTwitterContents);
    }
}*/
