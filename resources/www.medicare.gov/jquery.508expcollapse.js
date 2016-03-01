/*
* Dual licensed under the MIT and GPL licenses (same as jQuery): http://www.opensource.org/licenses/mit-license.php http://www.gnu.org/licenses/gpl.html
*/


//Generic 508 Compliant Method for creating a Jquery Expand Collapse structure
//The CreateExpandCollapse function options are:
//sectionHeading: Provides the default text for the heading.
//headingType: Sets the heading level, should be based on symantic structure.
//headingDivclass: Sets the cssclass of the heading div.
//headingImageclass: Sets the cssclass of the heading Image.
//headingLinkclass: Sets the cssclass of the heading Link
//headingTitleclass: Sets the cssclass of the Title.
//bodyclass: Sets the cssclass of the Body Div.
//collapseImage: Sets the Collapse Image SRC.
//expandImage: Sets the Expand Image SRC.
//collapseTitle: Sets the Collapse Title text.
//expandTitle: Sets the Expand Title text..
//uniqueID: Sets the UniqueID so multiple expand collapse controls can be used in the same page.
//contentID: Sets the Default ID containing the Content.

(function ($) {
    $.fn.CreateExpandCollapseSection = function (options) {

        //Default Jquery ExpandCollapse settings
        var defaultExpandCollapseSettings = {
            headingType: "<h2/>",
            headerID: "HeaderID",
            headingDivclass: "GenericExpandHeader",
            headingImageclass: "GenericExpandImage",
            headingImageWrapperclass: "GenericExpandImageWrapper",
            headingLinkclass: "GenericExpandLink",
            headingLinkWrapperclass: "GenericLinkWrapper",
            headingTitleclass: "GenericExpandTitle",
            bodyclass: "DefaultExpCollClass",
            collapseImage: "../Resources/images/hide.png",
            expandImage: "../Resources/images/show.png",
            collapseTitle: "Collapse",
            expandTitle: "Expand",
            uniqueID: "DefaultUniqueID",
            contentID: "DefaultID",
            transition: "slow"
        }

        var extendedOptions = $.extend({}, defaultExpandCollapseSettings, options);

        //create outer div
        var outerDiv = jQuery('<div/>', { id: "OuterDiv_" + extendedOptions["uniqueID"] });

        //create heading div
        //IE7 quirk, class is a reserved word so it must be added in quotations to elements or JS fails.
        var headingDiv = jQuery('<div/>', { id: "HeadingDiv_" + extendedOptions["uniqueID"], "class": extendedOptions["headingDivclass"] });
        var img = jQuery('<img/>', { src: extendedOptions["collapseImage"], title: extendedOptions["collapseTitle"], alt: "Collapse Icon", "class": extendedOptions["headingImageclass"] + "-hide" });
        var imgWrapper = jQuery('<span/>', { "class": extendedOptions["headingImageWrapperclass"], style: "position:absolute; height:20px; overflow:hidden; width:auto;" });
        var defaultHeadertext = $("#" + extendedOptions["headerID"]).html();
        var link = jQuery('<a/>', { href: "#_" + extendedOptions["collapseTitle"], title: "Select " + extendedOptions["sectionHeading"] + " to " + extendedOptions["collapseTitle"], "class": extendedOptions["headingLinkclass"] });
        var linkWrapper = jQuery('<span/>', { "class": extendedOptions["headingLinkWrapperclass"], style: "padding-left:20px;" }).html(defaultHeadertext);
        var heading = jQuery(extendedOptions["headingType"], { id: "Heading_" + extendedOptions["uniqueID"], "class": extendedOptions["headingTitleclass"] });
        imgWrapper.append(img);
        link.prepend(imgWrapper);
        link.append(linkWrapper);
        heading.prepend(link);
        headingDiv.append(heading);

        var defaultInnerTabContent = $("#" + extendedOptions["contentID"]).html();
        var innerDiv = jQuery('<div/>', { id: "innerDiv_" + extendedOptions["uniqueID"], "class": extendedOptions["bodyclass"] }).html(defaultInnerTabContent);

        heading.click(function () {
            var img = $(this).find("img");
            if (innerDiv.css("display") == "block") {
                img.attr("src", extendedOptions["expandImage"]);
                img.attr("title", extendedOptions["expandTitle"]);
                img.attr("alt", "Expand Icon");
                img.attr("class", extendedOptions["headingImageclass"] + "-show");
                innerDiv.toggle(extendedOptions["transition"]);
                innerDiv.attr("aria-hidden", "true");
                innerDiv.attr("aria-expanded", "false");
                innerDiv.attr("aria-selected", "false");
            }
            else {
                img.attr("src", extendedOptions["collapseImage"]);
                img.attr("title", extendedOptions["collapseTitle"]);
                img.attr("alt", "Collapse Icon");
                img.attr("class", extendedOptions["headingImageclass"] + "-hide");
                innerDiv.toggle(extendedOptions["transition"]);
                innerDiv.attr("aria-hidden", "false");
                innerDiv.attr("aria-expanded", "true");
                innerDiv.attr("aria-selected", "true");
            }

            var link = $(this).find("a");
            if (link.attr("href") == "#_" + extendedOptions["collapseTitle"]) {
                link.attr("href", "#_" + extendedOptions["expandTitle"]);
                link.attr("title", "Select " + extendedOptions["sectionHeading"] + " to " + extendedOptions["expandTitle"]);

            }
            else {
                link.attr("href", "#_" + extendedOptions["collapseTitle"]);
                link.attr("title", "Select " + extendedOptions["sectionHeading"] + " to " + extendedOptions["collapseTitle"]);
            }
        });
        //inner div

        outerDiv.append(headingDiv);
        outerDiv.append(innerDiv);
        outerDiv.appendTo($(this));
    }


    /* =============================================================
    * bootstrap-collapse.js v2.0.0
    * http://twitter.github.com/bootstrap/javascript.html#collapse
    * =============================================================
    * Copyright 2012 Twitter, Inc.
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    * http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    * ============================================================ */

    "use strict"

    var Collapse = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, $.fn.collapse.defaults, options)

        if (this.options["parent"]) {
            this.$parent = $(this.options["parent"])
        }

        this.options.toggle && this.toggle()
    }

    Collapse.prototype = {

        constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
  }

  , show: function () {
      var dimension = this.dimension()
        , scroll = $.camelCase(['scroll', dimension].join('-'))
        , actives = this.$parent && this.$parent.find('.in')
        , hasData

      if (actives && actives.length) {
          hasData = actives.data('collapse')
          actives.collapse('hide')
          hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', 'show', 'shown')

      // Commented out for non-dynamic height.
      //this.$element[dimension](this.$element[0][scroll])

  }

  , hide: function () {
      var dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', 'hide', 'hidden')
      this.$element[dimension](0)
  }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element.addClass('collapse')
  }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent == 'show') that.reset()
            that.$element.trigger(completeEvent)
        }

      this.$element
        .trigger(startEvent)
        [method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
  }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()

      /*----------------------------------------------------------*/
      /* 508 extended 
      /*----------------------------------------------------------*/
      if (this.$element.hasClass('in')) {
          this.$element.attr("style", "display: block;");
      } else {
          this.$element.attr("style", "display: none;");
      }
      this.$element.attr("aria-hidden", !this.$element.hasClass('in'));
      this.$element.attr("aria-expanded", this.$element.hasClass('in'));
      this.$element.attr("aria-selected", this.$element.hasClass('in'));
  }

    }

    /* COLLAPSIBLE PLUGIN DEFINITION
    * ============================== */

    $.fn.collapse = function (option) {
        return this.each(function () {
            var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
            if (!data) $this.data('collapse', (data = new Collapse(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.collapse.defaults = {
        toggle: true
    }

    $.fn.collapse.Constructor = Collapse


    /* COLLAPSIBLE DATA-API
    * ==================== */

    $(function () {
        $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
            var expandText = "Expand";
            var collapseText = "Collapse";
            var $this = $(this),
                href,
                target = $this.attr('data-target')
                        || e.preventDefault()
                        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
                ,
                option = $(target).data('collapse') ? 'toggle' : $this.data();

            $(target).collapse(option);

            /*----------------------------------------------------------*/
            /* Extended to add expanded/collapsed class to data-toggle 
            /*----------------------------------------------------------*/
            if ($(this).attr("data-expand-text") != undefined) expandText = $(this).attr("data-expand-text");
            if ($(this).attr("data-collapse-text") != undefined) collapseText = $(this).attr("data-collapse-text");
            if ($(target).hasClass('in')) {
                $(this).removeClass("collapsed");
                $(this).addClass("expanded");
                try {
                    $(".collapse-icon", this).attr("title", collapseText);
                    $(".HiddenText", this).html(collapseText);
                } catch (e) { }
            } else {
                $(this).removeClass("expanded");
                $(this).addClass("collapsed");
                try {
                    $(".collapse-icon", this).attr("title", expandText);
                    $(".HiddenText", this).html(expandText);
                } catch (e) { }
            }
        })
        $(".collapse-header.collapsed").each(function () {
            $($(this).attr("data-target")).attr("style", "display:none;");
        });
    })
})(jQuery);
