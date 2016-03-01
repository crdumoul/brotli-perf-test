//should only be called when the second slide is available. This initializes the carousel 
function initCarousel(randomSlide) {    

  //Initialize carousel and set it to wrap back to first element
  //after hitting last element
  $('.jcarousel').jcarousel({
     wrap: 'last' 
  })    
  //Implement autostart
  .jcarouselAutoscroll({
          interval: 3000,
          target: '+=1',
          autostart: false //has to default to false to prevent showing blank ads on load
  }); 

  var scrollPos = randomSlide-1;

  $('.jcarousel').jcarousel('scroll', scrollPos); //this init is called after 2nd slide is loaded 

    //Add active class for current slide
  $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function() {
         $(this).addClass('active');
           })
         .on('jcarouselpagination:inactive', 'a', function() {
         $(this).removeClass('active');
           })
         .on('click', function(e) {
           e.preventDefault();
           })
        .jcarouselPagination({
             item: function(page) { 
             return '<a href="#' + page + '" id=' + page + '  style="padding:5px;"></a>';
           }
          });   
         $('.jcarousel-prev').jcarouselControl({
            target: '-=1'
          });

        $('.jcarousel-next').jcarouselControl({
            target: '+=1'
          });   
    $('.jcarousel')
        .on('jcarousel:animateend', function(event, carousel) {
            var currentFirstItem = $(this).jcarousel('first');
            var currentLastItem  = $(this).jcarousel('last');   
            var target = $('.jcarousel').jcarousel('target');
            if(target.length == 0){
              target = currentFirstItem;
            }
    });  

    // Adding play/pause actions to multiple HTML element of promo module
    $( ".nbaFlexContentAd" ).mouseover(function() {
         $('.jcarousel').jcarouselAutoscroll('stop');
            $('#play').css("display", "block");
            $('#pause').css("display", "none");
    });
    $( ".nbaFlexContentAd" ).mouseout(function() {
        $('.jcarousel').jcarouselAutoscroll('start');
            $('#play').css("display", "none");
            $('#pause').css("display", "block");
    });

    // Play/Pause actions
    $('#pause').click( function() {
            $('.jcarousel').jcarouselAutoscroll('stop');
            $('#play').css("display", "block");
            $('#pause').css("display", "none");
            $(".nbaFlexContentAd").unbind("mouseover mouseout");
    });
    $('#play').click( function() {
        $('.jcarousel').jcarouselAutoscroll('start');
        $('#play').css("display", "none");
        $('#pause').css("display", "block");
        $( ".nbaFlexContentAd" ).mouseover(function() {
          $('.jcarousel').jcarouselAutoscroll('stop');
        $('#play').css("display", "block");
        $('#pause').css("display", "none");
        });
        $( ".nbaFlexContentAd" ).mouseout(function() {
            $('.jcarousel').jcarouselAutoscroll('start');
                $('#play').css("display", "none");
                $('#pause').css("display", "block");
        });
    }); 
}

//Loads slides to carousel
  function loadSlides(adsRenderedCnt, nextSlideNum){
    //console.log("in loadSlides: Work with "+adsRenderedCnt+" ads")
    //Gather the number of slides
    var items = $('.jcarousel').jcarousel('items');

    $('.jcarousel').jcarousel('reload');
    if(adsRenderedCnt < 6){
      $('.jcarousel').jcarousel('scroll', (nextSlideNum-1));
    }
    else{
       if(items.length == 1){
          $('.jcarousel').jcarousel('destroy');
          $('#pause').css("display", "none");
          $('.jcarousel-pagination').css("border-right", "none");
        }
        else{
          parent.finalizeCarousel();
          $('.jcarousel').jcarousel('scroll', (nextSlideNum-1));
          $('.jcarousel').jcarouselAutoscroll('start');
          $('.jcarousel').jcarouselAutoscroll({'interval': 3000});
         }
    }
    if(adsRenderedCnt < 6){
      if(nextSlideNum==6){
        nextSlideNum = 1;
      }
    }
}


//Click Analytics for focus and content
$( "#nbaSplitCarousel" ).click(function() {
  _nba.analytics.click({focus:"promo carousel",content:["carousel_click"]});
});
/** NBA Carousel Utilities
 **
 **  Initial        Date            Version                Change
 **      CM    02/06/14                1.0          1. Initial Code Per CSD-326
 **      CM    02/07/14                2.0          1. Fix for IE impression in position 0 not firing
 **                                                 2. Clean up of unnecessary lines of code
 **      CM    02/07/14                3.0          1. Changed div ID referenced from nbaFlexPanelParent to nbaSplitCarousel
 **      CM    02/11/14                4.0          1. Fix for safari versions older than 6.1.
 **      CM    09/23/14                5.0          1. Revamp for DPF
 **      CM    09/25/14                6.0          1. Update to work with latest adfuel
 **      CM    10/10/14                7.0          1. Update to use isEmpty() API call
 **      CM    10/23/14                8.0          1. Change to accommodate adfuel.js update
 **      CM    10/29/14                9.0          1. Change to accommodate adfuel.js update
 **/


window.blankAdCnt = 0;
window.adsRenderedCnt = 0; 
window.adunit = "";
window.setSlotListenerSet = false;
window.slidesCheckedCnt = 0;

//Calls DFP for creative matching slot div id
function renderAd(slideNum){ 
  if(window.slidesCheckedCnt == 5){
    finalizeCarousel();
  } 
  else{ 
    getAdUnit();
    AMPTManager.renderSingleSlot("ad_carousel_slide_0"+slideNum, [[145,250]], [["slide",[slideNum]],["pos",["carousel_slide_0"+slideNum]]], [], window.adunit, 0);
    AMPTManager.logit({slide: slideNum}, "Rendering Slide...");
    AMPTManager.requestAndRenderAds();
  }
}

//Checks what is retrieved from DFP. If blank, change class to flag for elimination
function loadAd(){  
  if(!setSlotListenerSet){ 
   googletag.cmd.push(function() {
      googletag.pubads().addEventListener('slotRenderEnded', function(event) {
        var targetingPos = String(event.slot.getTargeting("pos"));
        //console.log({targeting: targetingPos});
        var slideNum = parseInt(String(event.slot.getTargeting("pos")).replace("carousel_slide_0",""));
        if(targetingPos.indexOf("carousel_slide_0") > -1){
          if(event.isEmpty) {
            $("#slide"+slideNum).addClass( "blankNbaFlexContentAd" );
            $("#slide"+slideNum).removeClass( "nbaFlexContentAd" );
            window.blankAdCnt = window.blankAdCnt+1;

            if(window.slidesCheckedCnt > 5){
              finalizeCarousel();
            }  
          }
          else{            
            window.adsRenderedCnt = window.adsRenderedCnt + 1;
            if(window.adsRenderedCnt == 2){
              initCarousel(slideNum);
            }          
            else if(window.adsRenderedCnt > 2){
              //console.log("loadSlides")
              loadSlides(window.adsRenderedCnt, slideNum);
            }
            if(window.slidesCheckedCnt > 5){
              finalizeCarousel();
            }
          }
          if(window.slidesCheckedCnt < 6){
            var nextSlideNum = slideNum+1;
            window.slidesCheckedCnt = window.slidesCheckedCnt+1;
            if(nextSlideNum==6){
              nextSlideNum = 1;
            }
            slideNum = nextSlideNum;
            //console.log({next: nextSlideNum});
            setTimeout(function(){renderAd(nextSlideNum)},3000);  //3000
          }
        } //targetingPos.indexOf if condition
      }); //googletag.pubads().addEventListener
    }); // googletag.cmd.push function
   } // setSlotListenerSet if condition
  setSlotListenerSet = true;
}


//Clears carousel of any blank slides
function finalizeCarousel(){
  removeElementsByClass("blankNbaFlexContentAd");
  if(window.blankAdCnt == 4 && window.adsRenderedCnt == 1){
    $('#pause').css("display", "none");
    $('.jcarousel-pagination').css("border-right", "none");
    $('.jcarousel').jcarousel('destroy');
    
  }
  else{
    $('.jcarousel').jcarousel('reload');
    $('.jcarousel').jcarouselAutoscroll('start');
    $('.jcarousel').jcarouselAutoscroll({'interval': 3000});
  }
}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function getAdUnit(){
  if(parent.AMPTManager){
    //Build adunit
    for (var regIndex=0; regIndex < AMPTManager.registry.length; regIndex++){
      var reg = AMPTManager.registry[regIndex];
      //console.log({reg: reg});
      if (reg[0].rktr_id != "sponsoredAdPage"){
        networkId = reg[0].gpt_id;
        window.adunit = reg[1].rktr_ad_id; 
        window.adunit = networkId + "/" + window.adunit;
        parent.AMPTManager.logit({adUnit: window.adunit});
      }
    }
  }
}


$(window).load(function(){
  if(parent.sequentialLoad){
    var randomSlide = 1;
  }
  else{
    var randomSlide = (Math.floor(Math.random()*5)+1);  
  } 
  loadAd();
  renderAd(randomSlide);    
});
