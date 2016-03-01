(function ($) {

  Drupal.brightcoveField = {};

  // Listeners should be created by:
  // Drupal.brightcove_field.listeners.push(myFunction);
  Drupal.brightcoveField.listeners = Drupal.brightcoveField.listeners || [];

  Drupal.brightcoveField.player;
  Drupal.brightcoveField.modVP;
  Drupal.brightcoveField.modExp;
  Drupal.brightcoveField.modCon;

  Drupal.brightcoveField.templateLoader = function(experienceID) {
    Drupal.brightcoveField.player = brightcove.api.getExperience(experienceID);
    // The player is supported by Smart Player API.
    if (typeof Drupal.brightcoveField.player.id != 'undefined') {
      Drupal.brightcoveField.modVP = Drupal.brightcoveField.player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
      Drupal.brightcoveField.modExp = Drupal.brightcoveField.player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
      Drupal.brightcoveField.modCon = Drupal.brightcoveField.player.getModule(brightcove.api.modules.APIModules.CONTENT);


      if (typeof Drupal.brightcoveField.listeners != 'undefined') {
        for (var listener_id in Drupal.brightcove_field.listeners) {
          var callback = Drupal.brightcove_field.listeners[listener_id];
          Drupal.brightcoveField.modExp.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, callback);
        }
      }
    }
  };

  Drupal.brightcoveField.templateReady = function(evt) {
    // The player is supported by Smart Player API.
    if (typeof Drupal.brightcoveField.player.id != 'undefined') {
      var width = Drupal.settings.brightcoveField[Drupal.brightcoveField.player.id].width,
          height = Drupal.settings.brightcoveField[Drupal.brightcoveField.player.id].height,
          paddingBottom = (height / width) * 100;

      var $BCLcontainingBlock = $('#' + Drupal.brightcoveField.player.id).parents('.BCLcontainingBlock'),
          $BCLvideoWrapper = $('#' + Drupal.brightcoveField.player.id).parents('.BCLvideoWrapper');
      // Set max width and length according to the settings.
      $BCLcontainingBlock.css('max-width', width + 'px');
      $BCLcontainingBlock.css('max-height', height + 'px');

      // Set padding bottom to keep the palyer ratio we set.
      $BCLvideoWrapper.css('padding-bottom', paddingBottom + '%');
    }
  };
})(jQuery);
;
(function($) {
  Drupal.behaviors.dfp_yieldbot = {
    refresh: function() {
      ybotq.push(function() {
        googletag.cmd.push(function() { 
          $.each(googletag.slots, function(key, value) {
            var targetingMap = value.getTargetingMap();
            if(typeof(targetingMap.ybot_ad) != "undefined") {
              value.setTargeting('ybot_ad', yieldbot.adAvailable('dfp-ad-' + key));
            }
          });   
          googletag.pubads().refresh();    
        });
      });
    }
  };
}(jQuery));

;
