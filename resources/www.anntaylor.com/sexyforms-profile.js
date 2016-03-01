var SexyForms;

(function($) {

    /**
     * SexyForms global namespace. Contains utility classes and global configuration options.
     * @module SexyForms
     *
     */
    SexyForms = {
        /**
         * Utility methods.
         *
         * @class Util
         * @namespace SexyForms
         */
        Util: {
			replaced: function(el, on) {
				// Setter
				if (arguments.length > 1) {
					$(el).toggleClass('sf-replaced', on);
				}

				// Getter
				return $(el).hasClass('sf-replaced');
			},

            saveInstance: function(widget) {
                var $this = $(widget.element);
                if ($this.attr('id')) {
                    SexyForms.Instances[$this.attr('id')] = widget;
                }
            }
		},

        // Store references to SF objects
        Instances: {},

        Widgets: {
            /**
             * Class for converting a <select> element to a functioning <ol>.
             * @class SelectBox
             * @constructor
             * @param {Object} element The DOM element to convert. Must be a <select>.
             */
            SelectBox: function(element)
            {
                // Only allow <SELECT> elements
                if (!$(element).is("select")) { return; }

				if ($(element).hasClass("sf-select-box")) {
				    return;
				}

                var selectObj = this;

                $.extend(this, {
                    element: element,
                    selected: null,
                    list: $('<ol class="select-box"></ol>'),
                    container: $('<div class="select-box-container"></div>'),
                    bg: $('<div class="select-box-bg"><span></span></div>')
                });

                SexyForms.Util.saveInstance(this);

				$(element).addClass("sf-select-box");

                this.doReplace();

                // Copy over the ID if there is one (prefixed)
                var id = $(element).attr('id');

                if (id)
                {
                    this.container.attr('id', 'select-box-container-' + id)
                }

                this.items = this.list.children("li");

                // Ensure something is selected
                if (!this.selected)
                {
                    $(this.items[0]).addClass("selected");
                    this.selected = this.items[0];
                }

                this.update();

                $(this.container).click(function(e) {
                    var t = $(e.target);

					if (t.is('span')) { t = t.parent(); }

					if (t.is('.select-box-btn')) { t = t.parent().find('.select-box-bg'); }

                    if (t.is('.select-box-bg')) {
						selectObj.toggle();

                        return;
                    }
                    if (t.is('li')) {
                        selectObj.setSelected(t[0]);
                        selectObj.close();
                    }

                });

                function closeFunc(e)
                {
                    var targ = $.relatedTarget(e);

                    if (!targ.isChildOf(selectObj.container))
                    {
                        selectObj.close();
                    }
                }

                // Hide on mouseout
                this.container.mouseout(function(e) {
                    var target = $(e.target);
                    selectObj.timeout = setTimeout(function() {
                        closeFunc(e);
                    }, 1000);

                    if (target.is('li')) {
                        target.removeClass('hover');
                    }
                });

                this.container.mouseover(function(e) {
                    var target = $(e.target);
                    clearTimeout(selectObj.timeout);

                    if (target.is('li')) {
                        target.addClass('hover');
                    }
                });

				// Hide initially
				selectObj.close();

                return this;
            },

            TextBox: function(element)
            {
                // Only allow <INPUT TYPE="text"> elements
                if (!$(element).is("input[type=text]")) { return; }

                var o = this;

                $.extend(this, {
                    element: element
                });

                $(this.element).addClass('text-box');
            },

            /**
             * Uses a swapping technique to overlay a file input with a text box
             *  and button image
             *
             * @class FileInput
             * @constructor
             */
            FileInput: function(element)
            {
                var decoy = $(element).parent().prev();
                // copy the value into the real input field
                $(element).change(function()
                {
                    decoy.val($(element).val());
                });
            },

              // Abstract constructor for elements that have on/off states
              Toggleable: function(element)
              {
                this.element = element;
                var $element = $(this.element);

                SexyForms.Util.saveInstance(this);

                this._eventCache = {};

                $.extend(this, {
                  label:   $element.parent(),
                  checked: $element.attr("checked"),
                  klass:   this.checked,

                  // radio mode: only 0 or 1 item can be selected
                  // checkbox mode: any number can be selected
                  mode:     ( $element.is("input[type=checkbox]") ? "checkbox" : $element.is("input[type=radio]") ? "radio" : null)
                });

                $.extend(this, {
                  onClass: this.mode + "-on",
                  offClass: this.mode + "-off"
                });

                // Return the appropriate css class name
                this.cssClass = function(on) { if (on) { return this.onClass; } return this.offClass; };

                return this;
              },

              // RadioButton inherits from toggleable
              RadioButton: function(element)
              {
                return new SexyForms.Widgets.Toggleable(element);
              },

                RadioGroup: function(element)
                {
                    var group    = this,
                        $element = $(element);


                    $.extend(this, {
                      inputs : [],
                      current: null
                    });

                    // Save to element for global access
                    $element
                      .find("input[type=radio]").each(function()
                      {
                        var radio = new SexyForms.Widgets.RadioButton($(this));

                        if (radio.checked) { group.current = radio; }
                        group.inputs.push(radio);
                        radio.set(radio.checked);
                        radio.label.click(function() { group.select(radio); });

                    });
                }

        }
    };

    /*
     * Widget object prototypes
     */
    SexyForms.Widgets.SelectBox.prototype = {

        /**
         * Hides the <select> element and inserts an <ol>.
         * @method doReplace
         */
        doReplace: function()
        {
            var selectBoxObj = this;
            $(this.element)        // Create <li> elements from <option> elements

            .children("option").each(function()
            {
                var li = $("<li><span>" + $(this).text() + "</span></li>");

                if ($(this).attr("selected"))
                {
                    selectBoxObj.selected = li;
                    li.addClass("selected");
                }

                selectBoxObj.list.append(li);
            })
            .end()

            .after(selectBoxObj.container)        // Hide the actual <SELECT>

            .css({
                position: "absolute",
                visibility: "hidden",
                left: "-100000px"
            });
            // Insert the elements
            this.container
				.append(this.bg)
				.append(this.list)
				.append('<div class="select-box-btn"></div>');
        },

        /**
         * Select an item in the list. Focuses the list on the selected item,
         * and updates the hidden <select> element with the same value.
         * @method setSelected
         * @param {Object} item
         */
        setSelected: function(item)
        {
            if (typeof item === "number") {
                item = this.list.children("li").eq(item);
            }

            if (this.selected)
            {
                this.selected.removeClass("selected");
            }

            this.selected = $(item);
            this.selected.addClass("selected");
            this.update();

            // Set value in the hidden <SELECT>
            this.element.selectedIndex = this.items.index(item);
            $(this.element).change();
        },

        /**
         * Update text for the closed state
         */
        update: function()
        {
            this.bg.children().html(this.selected.text());
        },

        /**
         * Open the option list.
         * @method open
         */
        open: function()
        {
            var selectObj = this;

            selectObj.list.show();
			selectObj.container.addClass('select-box-container-open');
        },

        close: function()
        {
            var selectObj = this;

            selectObj.list.hide();
			selectObj.container.removeClass('select-box-container-open');
        },

        toggle: function()
        {
            var selectObj = this;

            if (selectObj.container.hasClass('select-box-container-open')) {
                selectObj.close();
                return;
            }

            selectObj.open();

            //this.list.toggle();
        },

        reset: function() {
            var selectObj = this;

            this.setSelected(0);
        }
    };

   $.extend(SexyForms.Widgets.Toggleable.prototype, {

     check: function(checked) {
       this.checked = checked;
       this.element.attr("checked", this.checked);
     },

     uncheck: function() { this.check(false); },

     enable: function() {
         var tog = this,
             f = function(e) { e.preventDefault(); tog.toggle(); };

         this.label.click(f);
     },

     disable: function() {
         this.label
            .unbind('click')
            .click(function(e) { e.preventDefault(); });
     },

     setClass: function(state)
     {
        this.label.removeClass(this.cssClass(!state));
        this.label.addClass(this.cssClass(state));
     },

      set: function(state)
      {
        // Check/uncheck it
        this.check(state);

        // Swap classnames
        this.setClass(state);

      },
      toggle: function()
      {
        // New state of component
        this.set(!this.element.attr("checked"));
      },

       reset: function() {
           this.set(false);
       }
   });

   // RadioButton inherits from toggleable
   SexyForms.Widgets.RadioButton.prototype = $.extend(new SexyForms.Widgets.Toggleable(), {});

  SexyForms.Widgets.RadioGroup.prototype = {
    select: function(radio)
    {
      this.current = radio;

      for (var i=0,l=this.inputs.length; i<l; i++)
      {
        if (this.inputs[i].element[0] == this.current.element[0])
        {
          this.inputs[i].set(true);
        }
        else
        {
          this.inputs[i].setClass(false);
        }
      }
    }
  };

    $.fn.extend({
      // Styled <select> (converted to <ol>)
      selectBox: function()
      {
        return this.each(function() {
          new SexyForms.Widgets.SelectBox(this);
        });
      },

      // Styled <input type="text>
      textBox: function()
      {
        return this.each(function() {
          new SexyForms.Widgets.TextBox(this);
        });
      },

      // Styled <input type="file" />
      fileInput: function() {
        return this.each(function() {
            new SexyForms.Widgets.FileInput();
        });
      },

      // Block element with class="radio-group",
      //  containing one or more <input type="radio" />
      radioGroup: function() {
         return this.each(function() {
           new SexyForms.Widgets.RadioGroup(this);
         });
      },

        // Abstract element with on/off functionality
      toggleable: function()
      {
        return this.each(function() {

		  // Prevent double replacement
		  if (SexyForms.Util.replaced(this) === true) { return; }

 		  SexyForms.Util.replaced(this, true);

          var $this = $(this),
              tog   = new SexyForms.Widgets.Toggleable($this);

          tog.set(tog.checked);
          tog.enable();
        });
      },

      // Return true if el is a child of this, or the same element
      isChildOf: function(el)
      {
       var target = this[0];

       if (target === el) {
           return true;
       }

       return $(el).find('*')
                   .filter(function()
                   {
                       return this === target;
                   })
                   .length > 0;


      }
    });

    // jQuery aliases for simple usage
    $.fn.checkbox = $.fn.toggleable; // Generic toggleable === checkbox

    // Return the related target for a mouse event
    $.relatedTarget = function(e)
    {
      var relatedTarget;

      if (e.type != 'mouseover' && e.type != 'mouseout')
      {
          return $;
      }

      // Which element we're going to or coming from
      if (e.relatedTarget)
      {
          relatedTarget = e.relatedTarget;
      }
      else
      {
          // IE versions of relatedTarget
          if (e.type == 'mouseout')
          {
              relatedTarget = e.toElement;
          }
          else
          {
              relatedTarget = e.fromElement;
          }
      }

      return $(relatedTarget);
    };

})(jQuery);
