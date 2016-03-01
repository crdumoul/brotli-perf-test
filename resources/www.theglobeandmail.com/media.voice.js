var TGAMD = window.TGAMD || {};

util.loadScript("plugin.mediavoice.com/plugin.js");

TGAMD.mdvoice = (function ( window ) {

 var defaults = {
    mobile: window.adv.__config.mobi,
    propertyId: function() {
      var prop = 'NA-GLOBSTAG-11236065';
      if (window.adv.__config.env === 'production') {
        prop = window.adv.__config.mobi ? 'NA-GLOBMAILMOBI-11235960' : 'NA-GLOBMAILDESK-11235959';
      }
      return prop;
    }(),
    site: window.adv.__config.env != 'production' ? window.adv.site : 'native.tgam.mediavoice',
    count:1,
    label:'',
    $jquery_pointer:'',
    template: null
 };

 window.NATIVEADS = window.NATIVEADS || {};
 window.NATIVEADS.injectedAt = new Date().getTime();

 function init( cfg ){

   $.extend(defaults,cfg);
   var counter = defaults.count;
   window.NATIVEADS.onReady = function(ads) {
     window.aPs = 'native' + defaults.template + counter ;
     window.adv_masterAdUnit_holder = window.adv.site;
     window.adv.site = defaults.site;
     ads.setPropertyID(defaults.propertyId);
     ads.enableMOAT(true,true);
     ads.logging.disable();
     //ads.logging.enable();
     ads.insertPreview({
       label: defaults.label,
       unit: {
           server: "dfp-legacy",
           url: {
             fn: fnTkt,
             args: ['a'+'ai', "8", "8", ai, 'mediavoice',"nc"],
             argsFn: function(args, callbackName){
               args[5] = args[5] + ";callback=" + callbackName;
               counter = counter + 1;
               return args;
             }
           }
       },
       location: defaults.$jquery_pointer,
       infoText: "",
       infoButtonText: null,
       template: chooseTemplate(defaults.template),
       onRender: function($element) {

         if(defaults.mobile){
           $('.topstories a:nth-last-child(1)').removeClass('borderless');
           $('.nativead_aside_mobi,.nativead_block_mobi').remove();

           var $hiddenVideo = $('.nativead_video_mobi + a.article, ');
           var $viewvideo   = $hiddenVideo.closest(".view_videos");
           var $blockvideo  = $viewvideo.children(".block_2");
           $hiddenVideo.appendTo($blockvideo).addClass('left').removeClass('right');

         }else{
           $('.nativead,.nativead_video + .view_videos').remove();
           $('.nativead_video').prevAll('.widget_stories').find('article').last().addClass('first_image');
         }


       },
       onFill: function(data) {},
       onError: function(error) {

         if(defaults.mobile){
           var $hiddenVideo = $('.nativead_video + a.article');
           $hiddenVideo.show();
           $('.nativead').remove();

         }else{
           $('.nativead_earlug + .view_pic,.nativead_rail ~ .view_pic,.nativead_nextstory ~ .view_pic,.nativead_block + .view_pic,.nativead_video + .view_videos').show();
           $('.nativead_video + .widget_stories article').removeClass('first_image');
           $('.nativead_video').prev('.widget_stories').find('article').last().addClass('first_image');
           $('.nativead').remove();
         }

       }
     });
     window.adv.site = adv_masterAdUnit_holder;
     ads.setWillLinkRedirect(function(href) { return false; });
     if (window.location.href.indexOf("/partners/") !== -1) {
        ads.configureSecondaryPage({
          track: function() { return "inbound"; }
        });
     }
   };

   /**
    * blk = native block template for a section page
    * asd = native aside template for a article page
    * vid = native video template for video library on section/article
    * elg = native earlug template for a section page
    * rai = native rail template for Home page ONLY
    * nxt = native next story template for a article page next story
    * Some of the native template above has a mobi version as well (ex.blkmobi )
    * @param template a unique template identifier
    * @return {*}
    */
   function chooseTemplate(template) {
     var html = {
       'blk':function (Handlebars,depth0,helpers,partials,data) {
          this.compilerInfo = [4,'>= 1.0.0'];
          helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
          var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;

          buffer += "<div class=\"widget_stories view_pic nativead_block\"><article class=\"art--nativecontent img_top img_w140 last_image clearfix\" data-vr-contentbox=\"\">\n <a href=\"";
          if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
          else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
          buffer += escapeExpression(stack1)
          + "\" class=\"o-ctx\">\n <img src=\""
          + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.href)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
          + "\" class=\"art-img art-img--news\" alt=\"\" title=\""
          + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.caption)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
          + "\" width=\"137\" height=\"78\">\n </a>\n <div id=\"mv-content\">\n <h6 class=\"art-label\">"
          + escapeExpression(((stack1 = ((stack1 = depth0.author),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
          + "</h6>\n <p class=\"advBanner__title\">SPONSOR CONTENT</p>\n <h5 class=\"articleTitle articleTitle--default\">\n <a href=\"";
          if (stack2 = helpers.link) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
          else { stack2 = depth0.link; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
          buffer += escapeExpression(stack2)
          + "\" title=\"";
          if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
          else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
          buffer += escapeExpression(stack2)
          + "\">";
          if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
          else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
          buffer += escapeExpression(stack2)
          + "</a>\n </h5>\n </div>\n </article>\n </div>";
          return buffer;
       },
         'nnl':function (Handlebars,depth0,helpers,partials,data) {
             this.compilerInfo = [4,'>= 1.0.0'];
             helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
             var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;

             buffer += "<div class=\"widget_stories view_pic nativead_newsletter\"><article class=\"art--nativecontent img_top img_w140 last_image clearfix\" data-vr-contentbox=\"\">\n <a href=\"";
             if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
             else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
             buffer += escapeExpression(stack1)
                 + "\" class=\"o-ctx\">\n <img src=\""
                 + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.href)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
                 + "\" class=\"art-img art-img--news\" alt=\"\" title=\""
                 + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.caption)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
                 + "\" width=\"137\" height=\"78\">\n </a>\n <div id=\"mv-content\">\n <h6 class=\"art-label\">"
                 + escapeExpression(((stack1 = ((stack1 = depth0.author),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
                 + "</h6>\n <p class=\"advBanner__title\">SPONSOR CONTENT</p>\n <h5 class=\"articleTitle articleTitle--default\">\n <a href=\"";
             if (stack2 = helpers.link) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
             else { stack2 = depth0.link; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
             buffer += escapeExpression(stack2)
                 + "\" title=\"";
             if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
             else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
             buffer += escapeExpression(stack2)
                 + "\">";
             if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
             else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
             buffer += escapeExpression(stack2)
                 + "</a>\n </h5>\n </div>\n </article>\n </div>";
             return buffer;
         },

        'rai':function (Handlebars,depth0,helpers,partials,data) {
        this.compilerInfo = [4,'>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
        var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;

        buffer += "<div class=\"widget_stories view_pic nativead_rail\"><article class=\"art--nativecontent img_top img_w140 last_image clearfix\">\n <a href=\"";
        if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
        else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1)
        + "\" class=\"o-ctx\">\n <img src=\""
        + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.href)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
        + "\" class=\"art-img art-img--news\" alt=\"\" title=\""
        + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.caption)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
        + "\" width=\"137\" height=\"78\">\n </a>\n <div id=\"mv-content\">\n <h6 class=\"art-label\">"
        + escapeExpression(((stack1 = ((stack1 = depth0.author),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
        + "</h6>\n <p class=\"advBanner__title\">SPONSOR CONTENT</p>\n <h5 class=\"articleTitle articleTitle--default\">\n <a href=\"";
        if (stack2 = helpers.link) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
        else { stack2 = depth0.link; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
        buffer += escapeExpression(stack2)
        + "\" title=\"";
        if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
        else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
        buffer += escapeExpression(stack2)
        + "\">";
        if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
        else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
        buffer += escapeExpression(stack2)
        + "</a>\n </h5>\n </div>\n </article>\n </div>";
        return buffer;
       },
       'nxt':function (Handlebars,depth0,helpers,partials,data) {
         this.compilerInfo = [4,'>= 1.0.0'];
         helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
         var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;

         buffer += "<div class=\"widget_stories widget_stories--next_stories view_pic art--nextStoryWithImg nativead_nextstory\"><article class=\"art--nativecontent art--articleNextStory img_left img_w220 clearfix\">\n <a href=\"";
         if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
         else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
         buffer += escapeExpression(stack1)
             + "\" class=\"o-ctx\">\n <img src=\""
             + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.href)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
             + "\" class=\"art-img art-img--news\" title=\""
             + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.caption)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
             + "\" width=\"220\" height=\"123\">\n </a>\n <span class=\"advBanner__title\">SPONSOR CONTENT</span>\n<br>\n <h6 class=\"art-label\">"
             + escapeExpression(((stack1 = ((stack1 = depth0.author),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
             + "</h6>\n <h5 class=\"articleTitle articleTitle--articleNextStory\">\n <a href=\"";
         if (stack2 = helpers.link) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
         else { stack2 = depth0.link; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
         buffer += escapeExpression(stack2)
             + "\" title=\"";
         if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
         else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
         buffer += escapeExpression(stack2)
             + "\">";
         if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
         else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
         buffer += escapeExpression(stack2)
             + "</a>\n </h5>\n </article>\n </div>";
         return buffer;
       },
       'elg':function (Handlebars,depth0,helpers,partials,data) {
          this.compilerInfo = [4,'>= 1.0.0'];
          helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
          var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;

          buffer += "<div class=\"widget_stories view_pic nativead_earlug\"><article class=\"art--nativecontent-earlug img_left img_w140 last_image clearfix\">\n <a href=\"";
          if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
          else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
          buffer += escapeExpression(stack1)
          + "\" class=\"o-ctx\">\n <img src=\""
          + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.href)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
          + "\" class=\"art-img art-img--news\" title=\""
          + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.caption)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
          + "\" width=\"137\" height=\"78\">\n </a>\n <h6 class=\"art-label\">"
          + escapeExpression(((stack1 = ((stack1 = depth0.author),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
          + "</h6>\n <span class=\"advBanner__title\">SPONSOR CONTENT</span>\n<br>\n<h5 class=\"articleTitle articleTitle--default\">\n <a href=\"";
          if (stack2 = helpers.link) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
          else { stack2 = depth0.link; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
          buffer += escapeExpression(stack2)
          + "\" title=\"";
          if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
          else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
          buffer += escapeExpression(stack2)
          + "\">";
          if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
          else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
          buffer += escapeExpression(stack2)
          + "</a>\n </h5>\n </article>\n </div>";
          return buffer;
       },
       'asd':function (Handlebars,depth0,helpers,partials,data) {
          this.compilerInfo = [4,'>= 1.0.0'];
          helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
          var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;

          buffer += "<div class=\"art--nativecontent nativead_aside\">\n<figure>\n <a href=\"";
          if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
          else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
          buffer += escapeExpression(stack1)
          + "\" title=\"";
          if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
          else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
          buffer += escapeExpression(stack1)
          + "\">\n <img src=\""
          + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.href)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
          + "\" width=\"140\" height=\"78\" alt=\""
          + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.caption)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
          + "\">\n </a>\n </figure>\n <h6 class=\"art-label\">"
          + escapeExpression(((stack1 = ((stack1 = depth0.author),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
          + "</h6>\n <p class=\"advBanner__title\">SPONSOR CONTENT</p>\n <h5 class=\"articleTitle articleTitle--default\"><a href=\"";
          if (stack2 = helpers.link) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
          else { stack2 = depth0.link; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
          buffer += escapeExpression(stack2)
          + "\" title=\"";
          if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
          else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
          buffer += escapeExpression(stack2)
          + "\">";
          if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
          else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
          buffer += escapeExpression(stack2)
          + "</a></h5>\n</div>";
          return buffer;
       },
       'vid':function (Handlebars,depth0,helpers,partials,data) {
          this.compilerInfo = [4,'>= 1.0.0'];
          helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
          var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;

          buffer += "<div class=\"widget_stories view_videos nativead_video\"><article class=\" img_top img_w220 clearfix\" data-vr-contentbox=\"\">\n <a href=\"";
          if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
          else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
          buffer += escapeExpression(stack1)
          + "\">\n <img src=\""
          + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.href)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
          + "\" alt=\"\" title=\"";
          if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
          else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
          buffer += escapeExpression(stack2)
          + "\" width=\"220\" height=\"124\">\n <div class=\"videoHover\"><div class=\"triangle\"></div></div>\n </a>\n <div class=\"video_headline\">\n  <h5 class=\"articleTitle articleTitle--default\">\n <a href=\"";
          if (stack2 = helpers.link) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
          else { stack2 = depth0.link; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
          buffer += escapeExpression(stack2)
          + "\" title=\"";
          if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
          else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
          buffer += escapeExpression(stack2)
          + "\"><span class=\"advBanner__title--reversed\">SPONSOR CONTENT</span><br/>";
          if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
          else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
          buffer += escapeExpression(stack2)
          + "</a>\n </h5>\n </div>\n</article>\n </div>";
          return buffer;
       },
       'blkmobi':function (Handlebars,depth0,helpers,partials,data) {
          this.compilerInfo = [4,'>= 1.0.0'];
          helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
          var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;

          buffer += "<div class=\"widget_stories\"> <a class=\"article borderless art--nativecontent art--nativecontent--border\" href=\"";
          if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
          else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
          buffer += escapeExpression(stack1)
          + "\">\n <span class=\"advBanner__title\">Sponsor Content</span>\n <span class=\"title\">";
          if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
          else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
          buffer += escapeExpression(stack1)
          + "</span>\n</a>\n</div>";
          return buffer;
       },
       'asdmobi':function (Handlebars,depth0,helpers,partials,data) {
          this.compilerInfo = [4,'>= 1.0.0'];
          helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
          var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;

          buffer += "<p class=\"art--nativecontent art--nativecontent--framed \"> <a href=\"";
          if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
          else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
          buffer += escapeExpression(stack1)
          + "\">\n <span class=\"advBanner__title\">Sponsor Content </span>\n <span class=\"title\">";
          if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
          else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
          buffer += escapeExpression(stack1)
          + "</span>\n</a> \n</p>";
          return buffer;
       },
       'vidmobi':function (Handlebars,depth0,helpers,partials,data) {
          this.compilerInfo = [4,'>= 1.0.0'];
          helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
          var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;

          buffer += "<a class=\"article right nativead nativead_video_mobi\" href=\"";
          if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
          else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
          buffer += escapeExpression(stack1)
          + "\" class=\"article right\">\n <img src=\""
          + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.href)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
          + "\" width=\"119\" height=\"67\">\n <span class=\"sprite video storypicture\"></span>\n <span class=\"advBanner__title advBanner__title--reversed\">Sponsor Content</span>\n <span class=\"title\">";
          if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
          else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
          buffer += escapeExpression(stack2)
          + "</span>\n</a>";
          return buffer;
       }
     };
     return html[defaults.mobile ? template+'mobi' : template ];
   }
 }
 return {
  init:init,
  defaults: defaults
 }
}(window));
