(function( $, undefined ) {

$.widget( "ui.tmDropdown", {
    _dropdowns: [],

    _current_text: "",
    _current_value: "",

    options: {
        ellipsis: true,
        auto_width: true,
        listElement: "li",
        role:"combobox",
        dropDownList:"",
        adjustScrollbarWidth:false,
        adjustContentWidth:false,
        windowResize:true,
        on_change: function( dropdown ) {}
    },

    _search_regexp: new RegExp( "[A-Z0-9]" ),

    _options_dirty: true,

    _create: function() {
		var _self = this;
        this._is_expanded = false;
        this._clone_index = 0;
        this._dropdown = this.element.find('.widget-dropdown');
        this._span_focus = this.element.find('.span-focus');
        this._dropdown_ie_text = this.element.parent().find( ".dropdown-ie-value" );
        this._dropdown_label = this._dropdown.find( ".dropdown-selected-label" );
        this._list = $(this.options.dropDownList).length ? $(this.options.dropDownList) : this.element.find(".widget-dropdown-list");
        this._options_layer = this.element.find(".dropdown-options-form");
        this._dropdown_option_tooltip = this.element.find(".dropdown_option_tooltip");
        this._selected_option = this._list.find( ".dropdown_default_option" );
        this._default_option = this._list.find( ".dropdown_default_option" );
        this._is_combobox = this.element.find('[role=combobox]').length ? true : false;
        
        this._form_input = this.element.find("input");
        this._check_width_div = $('<div class="ada-hide"></div>')
            .css( 'position', 'absolute' )
            .css( 'left', '-3000px' );
        $('body').append( this._check_width_div );

        this._disabled_class = "widget-disabled";
        var widget_classes = this.element.attr( 'class' ).split( ' ' );
        var i;
        for ( i = 0 ; i < widget_classes.length ; i ++ ) {
            var c = widget_classes[i];

            if ( c.slice( -9 ) == "-disabled" ) {
                this._disabled_class = c;
                this.element.removeClass( c );
                this._options_layer.removeClass( c );
                break;
            }
        }

        this.suspend_on_change();
        this.update_dropdown();
        this.resume_on_change();

        // move option tooltip to body to position
        $('body').append( this._dropdown_option_tooltip );

        // move options list to body so that it can appear outside
        // overlay containers
        $('body').append( this._options_layer );

        // append an offscreen link so that we can detect when
        // to wrap past the end of the options when tabbing through them
        $('body').append( '<a href="javascript://" tabindex="-1" aria-hidden="true" class="ada-hide">&nbsp;</a>' );

        // add bgiframe to dropdown options list so that it layers correctly in IE6
        this._options_layer.bgiframe();

        // wire up dropdown
        var dd = this;
        this.element.click( function( event ) {
            dd._on_dropdown_click.apply( dd, [ event ] );
        } );
        this.element.bind( 'keydown', function( event ) {
            dd._on_dropdown_keydown.apply( dd, [ event ] );
        } );
        this._options_layer.click( function( event ) {
            // don't propagate clicks in the options layer
            // since these can cause the dropdown to prematurely collapse
            event.stopPropagation();
        } );
        $('body').click( function(event) {
            //need to check if a click event was on a popup before we close all dropdown
            if( $(event.target).closest('.widget-hover').length ) {
              return true;
            } else {
              dd.collapse_all.apply( dd );
            }
        } );

        $('body').bind( 'mouseover', function( event ) {
            dd._on_option_mouseout.apply( dd, [ event ] );
        } );

		    this._form_input.bind('focus', function( event ){
			    _self._dropdown.focus();
		    });

        this._dropdown.bind( 'focus', function( event ) {
            dd._make_active();
        } );

        this._dropdown.bind( 'blur', function( event ) {
            dd._make_inactive();
        } );

        this._span_focus.bind( 'focus', function( event ) {
            dd._make_active();
        } );

        this._span_focus.bind( 'blur', function( event ) {
            dd._make_inactive();
        } );

        var options = this._list.find( this.options.listElement );

        // detach option template if it exists
        this._option_template = options.last();
        if ( this._option_template.length && this._option_template.attr('data-value') == 'dd_template' ) {
            this._option_template.detach();
            options = options.slice( 0, -1 );
        }
        else {
            delete this._option_template;
        }

        // wire options
        for ( i = 0 ; i < options.length ; i ++ ) {
            this._wire_option( options[i] );
        }

        if ( this.options.auto_width ) {
            this.adjust_collapsed_width();
        }

        this._dropdowns.push( this );

        this._reset_search();

        return this;
    },

    _make_active: function() {
        if (!this._disabled) {
            var el = $(this._dropdown.find( 'b' )[0]);
            el.addClass( "highlight-bg" );
        }
    },

    _make_inactive: function() {
        if ( this._suspend_make_inactive ) {
            // this will be set if we are expanding the dropdown
            // something inside the expanded form will be focusses.
            // this will prevent making the dropdown inactive
            this._suspend_make_inactive = false;
            return;
        }

        this._reset_search();

        var el = $(this._dropdown.find( 'b' )[0]);
        el.removeClass( "highlight-bg" );
    },

    suspend_on_change: function() {
        this._suspend_on_change = true;

        return this;
    },

    resume_on_change: function() {
        this._suspend_on_change = false;

        return this;
    },

    hide: function() {
        this._collapse();
        this._dropdown.hide();
    },

    show: function() {
        this._dropdown.show();
    },

    disable: function() {
        this.element.addClass( this._disabled_class );

        if ( this._is_expanded ) {
            this._collapse();
        }

        this._disabled = true;
    },

    enable: function() {
        this.element.removeClass( this._disabled_class );

        this._disabled = false;
    },

    move_option_to_top: function( option ) {
        option.detach();

        this._list.prepend( option );

        this._options_dirty = true;

        return this;
    },

    move_option_to_bottom: function( option ) {
        option.detach();

        this._list.append( option );

        this._options_dirty = true;

        return this;
    },

    clone_option: function( option ) {
        var new_option = option.clone();

        new_option.attr( "id", option.attr("id") + "_" + this._clone_index );

        this._wire_option( new_option );

        this._list.append( new_option );

        this._options_dirty = true;

        this._clone_index++;

        return new_option;
    },

    set_option_text: function( option, text ) {
        option.find('.dropdown_option_text').html( text );

        return this;
    },

    set_option_value: function( option, value ) {
        option.attr( 'data-value', value );

        return this;
    },
    set_option_type: function( option, value ) {
        option.attr( 'data-type', value );

        return this;
    },

    get_option_text: function( option ) {
        return option.find('.dropdown_option_text').html();

        return this;
    },

    get_option_value: function( option ) {
        return option.attr( 'data-value' );

        return this;
    },
    get_option_type: function( option ) {
        return option.attr( 'data-type' );

        return this;
    },
    expand_drop_down: function () {

        this._expand(); 

        return this
    },

    add_option: function( text, value ) {
        if ( this._option_template ) {
            var new_option = this._option_template.clone();
            
            new_option.attr( "id", this._list.attr("id") + "_" + this._dropdown.attr("data-guid") + "_" + value );
            
            this.set_option_text( new_option, text );
            this.set_option_value( new_option, value );

            this._wire_option( new_option );

            var list_empty = this._list.find( this.options.listElement ).length ? false : true;

            this._list.append( new_option );

            if ( list_empty ) {
                this.select_option( new_option );
            }

            this._options_dirty = true;
        }
        return this;
    },

    remove_option: function( option ) {
        option.detach();
        
        if ( option[0] == this._selected_option[0] ) {
            var items = this._list.find( this.options.listElement );

            this.select_option( items.first() );
        }

        this._options_dirty = true;

        return this;
    },

    remove_option_by_index: function( index ) {
        var option = this.get_option_by_index( index );

        if ( option.length ) {
            this.remove_option( option );
            this._options_dirty = true;
        }

        return this;
    },

    remove_option_by_value: function( value ) {
        var option = this.get_option_by_value( value );

        if ( option.length ) {
            this.remove_option( option );
            this._options_dirty = true;
        }

        return this;
    },

    hide_all_options: function() {
        var items = this._list.find( this.options.listElement );
        items.hide();
        this._options_dirty = true;
        return this;
    },

    hide_option: function( option ) {
        option.hide();
        this._options_dirty = true;
        return this;
    },

    show_option: function( option ) {
        option.show();
        this._options_dirty = true;
        return this;
    },

    hide_option_by_index: function( index ) {
        var option = this.get_option_by_index( index );

        if ( option.length ) {
            this.hide_option( option );
        }

        return this;
    },

    hide_option_by_value: function( value ) {
        var option = this.get_option_by_value( value );

        if ( option.length ) {
            this.hide_option( option );
        }

        return this;
    },

    hide_options_by_type: function ( type ) {
        var options = this.get_options_by_type( type );

        for(var i = 0; i < options.length; i++) {
            if ( options[i].length ) {
                this.hide_option( options[i] );
            }
        }

        return this;
    },

    show_all_options: function() {
        var items = this._list.find( this.options.listElement );
        items.show();
        this._options_dirty = true;
        return this;
    },

    show_option_by_index: function( index ) {
        var option = this.get_option_by_index( index );

        if ( option.length ) {
            this.show_option( option );
        }

        return this;
    },

    show_option_by_value: function( value ) {
        var option = this.get_option_by_value( value );

        if ( option.length ) {
            this.show_option( option );
        }

        return this;
    },

    show_options_by_type: function( type ) {
        var options = this.get_options_by_type( type );

        for(var i = 0; i < options.length; i++) {
            if ( options[i].length ) {
                this.show_option( options[i] );
            }
        }

        return this;
    },

    remove_all_options: function() {
        var items = this._list.find( this.options.listElement );
        
        items.detach();

        this.select_option( $([]) );

        this._options_dirty = true;

        return this;
    },

    get_all_options: function() {
        var items = this._list.find( this.options.listElement );
        return items;
    },

    get_option_by_index: function( index ) {
        var items = this._list.find( this.options.listElement );

        if ( index >= 0 && index < items.length ) {
            return $(items[index]);
        }
        else {
            throw ("tmDropdown::get_option_by_index => " + index + " out of range" );
            return $([]);
        }
    },

    get_option_by_value: function( value ) {
        var items = this._list.find( this.options.listElement );

        for ( var i = 0 ; i < items.length ; i ++ ) {
            var item = $(items[i]);

            if ( item.attr('data-value') == value ) {
                return $(item);
            }
        }

        return $([]);
    },

    get_options_by_type: function( type ) {
        var items = this._list.find( this.options.listElement );
        var matched_items = [];

        for ( var i = 0 ; i < items.length ; i ++ ) {
            var item = $(items[i]);

            if ( item.attr('data-type') == type ) {
                matched_items.push(item);
            }
        }

        return $(matched_items);
    },

    _wire_option: function( option ) {
        var $option = $(option);

        var dd = this;
        $option
            .click( function( event ) {
                dd._on_option_click.apply( dd, [ event, $option ] );
            } )
            .bind( 'keydown', function( event ) {
                dd._on_option_keydown.apply( dd, [ event, $option ] );
            } )
            .bind( 'mouseover', function( event ) {
                dd._on_option_mouseover.apply( dd, [ event, $option ] );
            } );
    },

    next_option: function( option ) {
        var nextOption = [], items = this._list.find( this.options.listElement + ":visible:not([disabled])" );
        
        items.each(function(i,v) {
          if($(this).attr("id") == option.attr("id")) {
            nextOption = $(items[i + 1]);
          }
        });
        if ( nextOption.length ) {
            this._focus_option( nextOption );
        }
    },

    prev_option: function( option ) {
        var prevOption = [], items = this._list.find( this.options.listElement + ":visible:not([disabled])" );

        items.each(function(i,v) {
          if($(this).attr("id") == option.attr("id")) {
            prevOption = $(items[i - 1]);
          }
        });
        if ( prevOption.length ) {
            this._focus_option( prevOption );
        }
    },

    enable_highlight: function(option) {
        option.removeClass('dd-disable-hightlight');
    },

    disable_highlight: function(option) {
        option.addClass('dd-disable-hightlight');
    },

    _on_option_mouseover: function( event, option ) {
        if ( this._focussed_option ) {
        	this._focussed_option.removeClass( 'highlight-bg' );
            this._focussed_option.find('a.question-mark').removeClass('question-mark-inverted');
		}

        if ( this._mouse_over_option ) {
            this._mouse_over_option.removeClass( 'highlight-bg' );
            this._mouse_over_option.find('a.question-mark').removeClass('question-mark-inverted');
        }

        if (!option.hasClass('dd-disable-hightlight')) {
            option.addClass('highlight-bg');
            option.find('a.question-mark').addClass('question-mark-inverted');
        }

        this._mouse_over_option = option;
        event.stopPropagation();
    },

    _on_option_mouseout: function( event ) {
        if ( this._mouse_over_option && this._is_expanded ) {
            // if the target element is the list container,
            // we are still over the list even if we are currently
            // not over an option
            // just return in this case
            var target = event.target;
            if ( this._list.size() && target == this._list.first() ) {
                return;
            }
            
            var parents = $(event.target).parents( "ul.widget-dropdown-list" );
            if ( parents.size() ) {
                return;
            }
            
            // over something other than an option or the option list
            // revert to highlighting the focussed option
            this._mouse_over_option.removeClass( 'highlight-bg' );
            this._focussed_option.addClass( 'highlight-bg' ); 
            
            this._mouse_over_option.find('a.question-mark').removeClass('question-mark-inverted');
            this._focussed_option.find('a.question-mark').addClass('question-mark-inverted');
            
            // no longer over an option.
            delete this._mouse_over_option;
        }
    },

    _focus_option: function( option ) {
        if ( this._focussed_option && !this._mouse_over_option ) {
            this._focussed_option.removeClass( 'highlight-bg' );
        }

        this._focussed_option = option;

        option.focus();

        if (!this._mouse_over_option && !option.hasClass('dd-disable-hightlight') && this.options.role == "combobox") {
            option.addClass( 'highlight-bg' );
        }
    },

    _on_option_keydown: function( event, option ) {
        //console.log( 'option kd', event );
        switch ( event.which ) {
        case 32:
            option.find(".ttinfo-popup-handle").popupInfo("showPopup");
            if (this._is_combobox) {
              event.preventDefault();
              event.stopPropagation();
            }
            return;
            break;            
        case 13:
            this._on_option_click( event, option );
            event.preventDefault();
            return;
            break;
        case 9:
            this._collapse( { focus: true } );
            /** 
              * We want to use the tab key to also select elements
              * Tabing when the menu is open will select element and focus on 
              * next Item.
              */  
            this._on_option_click( event, option );
            event.stopPropagation();
            return;
            break;
       case 37:
            return;
            break;
       case 38:
            if ( event.altKey ) {
                this._collapse( { focus: true } );
                event.preventDefault();
            }
            else {
                this.prev_option( option );
                event.preventDefault();
            }
            this._reset_search();
            event.stopPropagation();
            break;
        case 39:
            return;
            break;
        case 40:
            this.next_option( option );
            event.preventDefault();
            this._reset_search();
            event.stopPropagation();
            break;

        case 27:
            this._collapse( { focus: true } );
            event.preventDefault();
            this._reset_search();
            event.stopPropagation();
            break;
        }

        // note: event.which is always the uppercase code for A-Z
        if ( this._list.length && this._search_regexp.test( String.fromCharCode(event.which) ) ) {
            this._key_search_option( String.fromCharCode(event.which) );

            if ( this._match_options.length ) {
                var next_option = this._match_options[this._match_index];
                this._focus_option( $(next_option).first() );
            }
        }
    },

    _on_document_keydown: function( event ) {
        switch ( event.which ) {
        case 38:
            if ( event.altKey ) {
                this._collapse( { focus: true } );
                event.preventDefault();
                this._reset_search();
                event.stopPropagation();
            }
            break;

        case 27:
            this._collapse( { focus: true } );
            event.preventDefault();
            this._reset_search();
            event.stopPropagation();
            break;
        }
    },

    _on_option_click: function( event, option ) {
        this.select_option( option );
        
        if( this.options.role == "combobox" ) {
          this._collapse( { focus: true} );
        }
        event.stopPropagation();
    },

    _update_current_values: function() {
        if ( this.options.get_current_text ) {
            this._current_text = this.options.get_current_text();
        }
        else if ( this._selected_option.length ) {
            this._current_text = this._selected_option.find('.dropdown_option_selected_text').html();
        }
        else {
            this._current_text = "";
        }

        if ( this.options.get_current_value ) {
            this._current_value = this.options.get_current_value();
        }
        else if ( this._selected_option.length ) {
            this._current_value = this._selected_option.attr('data-value');
        }
        else {
            this._current_value = "";
        }
    },

    select_option: function( option ) {
        if ( ( option.length && !this._selected_option.length ) ||
            ( !option.length && this._selected_option.length ) ||
            ( option.length && this._selected_option.length && option[0] != this._selected_option[0] ) ) {
            this._old_selected_option = this._selected_option;
            this._selected_option = option;

            this.update_dropdown();
        }
    },

    select_default_option: function() {
        if( this._default_option.length ){
            this.select_option(this._default_option);
        }
    },    

    set_default_option: function(option) {
        if( option.length ){
            this._default_option = option;
        }
    },

    /**
     * selects old option if current and old one are not the same
     * uses tmDropdown.select_option(), so all events should be triggered
     */
    select_old_option: function() {
        var old_option = this._old_selected_option;
        if (old_option && this._selected_option !== old_option) {
            this.select_option( old_option );
            this._old_selected_option = old_option;
        }
        return this;
    },

    _adjust_text_width: function( html, target_width ) {
        this._check_width_div.html( html );

        var html_width = this._check_width_div.width();

        if ( html_width > target_width ) {
            var length = html.length;
            while ( length ) {
                length --;
                var part = html.slice( 0, length );

                if ( this.options.ellipsis ) {
                    part = part + " &hellip;";
                }

                this._check_width_div.html( part );
                html_width = this._check_width_div.width();

                if ( html_width <= target_width ) {
                    this._dropdown_label.html( part );
                    break;
                }
            }
        }
    },

    update_dropdown: function() {
        this._update_current_values();
        this._dropdown_label.html( this._current_text );
        this._form_input.attr( "value", this._current_value );
        this.element.parent().find( ".dropdown-ie-value" ).html( this._current_text );
        this._span_focus.find('b').html( this._current_text );
        this._dropdown.attr("data-activedescendant", "dropdown_option_" + this._dropdown.attr("data-guid") + "_" + this._current_value);

        var target_width = this._dropdown_label.width();
        this._adjust_text_width( this._current_text, target_width );

        if ( !this._suspend_on_change ) {
            this.options.on_change( this );
            this._trigger('change', null, {value:this.get_value()});
        }
    },

    update_dropdown_label: function(label) {
        if (typeof label != 'undefined' && label.trim().length > 0) {
            this._dropdown_label.text(label);
            var target_width = this._dropdown_label.width();
            this._adjust_text_width(label, target_width );
        }
    },

    update_default_option: function(text) {
        if (typeof text != 'undefined' && text.trim().length > 0) {
            this._default_option.text(text);
        }
    },

    _on_dropdown_click: function( event ) {
        this._suspend_make_inactive = true;
        this._dropdown.focus();
        if ( !this._disabled ) {
            if ( this._is_expanded ) {
                this._collapse();
            }
            else {
                this._expand();
            }
        }
        event.stopPropagation();
    },

    select_option_by_index: function( index ) {
        var items = this._list.find( this.options.listElement );

        if ( 0 <= index && index < items.length ) {
            var option = $(items[index]);
            this.select_option( option );
        }

        return this;
    },

    select_option_by_value: function( value ) {
        var items = this._list.find( this.options.listElement );

        for ( var i = 0 ; i < items.length ; i ++ ) {
            var option = $(items[i]);

            var v = option.attr('data-value');

            if ( v == value ) {
                this.select_option( option );
                return this;
            }
        }

        return this;
    },

    _get_next_visible_option: function( options ) {
        for ( var i = 0 ; i < options.length ; i ++ ) {
            var option = $(options[i]);

            if ( option.css( 'display' ) != 'none' ) {
                return option;
            }
        }

        return $([]);
    },

    select_next_option: function() {
        var options = this._selected_option.nextAll();

        var option = this._get_next_visible_option( options );

        if ( option.length ) {
            this.select_option( option );
        }

        return this;
    },

    select_prev_option: function() {
        var options = this._selected_option.prevAll();

        var option = this._get_next_visible_option( options );

        if ( option.length ) {
            this.select_option( option );
        }

        return this;
    },

    _on_dropdown_keydown: function( event ) {
//        console.log( 'dropdown kd', event );

        if ( this._disabled ) {
            return;
        }

        switch ( event.which ) {
        case 13:
        case 32:
            this._on_dropdown_click( event );
            event.preventDefault();
            return;
            break;
        case 37:
            return;
            break;
        case 38:
            // Removed combobox specfic scenario - open list instead
            this._expand();
            event.preventDefault();
            this._reset_search();
            return;
            break;
        case 39:
            return;
            break;
        case 40:
            // Removed combobox specfic scenario - open list instead
            this._expand(); 

            // If item was previously selected, default to that item
            var $ddList = $(this.options.dropDownList)
            if ($ddList.find(".dropdown_default_option").not(":checked")) {
              $ddList.find(".option-group input:checkbox:checked:first").focus();
            }
            event.preventDefault();
            return;
            break;
        };

        // note: event.which is always the uppercase code for A-Z
        if ( this._list.length && this._search_regexp.test( String.fromCharCode(event.which) ) ) {
            this._update_options_list();
            this._key_search_option( String.fromCharCode(event.which) );

            if ( this._match_options.length ) {
                var option = this._match_options[this._match_index];
                this.select_option( $(option) );
            }
        }
    },
    _clear_match_timeout: function() {
        if ( this._match_timeout ) {
            window.clearTimeout( this._match_timeout );
            delete this._match_timeout;
        }
    },

    _reset_search: function() {
        this._clear_match_timeout();

        this._match_string = "";
        this._match_options = [];
    },

    _key_search_option: function( key ) {
        var search_string = this._match_string || "";
        search_string += key;

        this._clear_match_timeout();
        var dd = this;
        this._match_timeout = window.setTimeout( function() {
            dd._reset_search();
        }, 1000 );

        var current_options = this._match_string ? this._match_options : this._options;

        var options = this._get_matched_options( search_string, current_options );

        if ( options.length ) {
            // got matches.  store the details.
            this._match_index = 0;
            this._match_options = options;
            this._match_string = search_string;
        }
        else if ( this._match_string.length ) {
            if ( key == this._match_string.slice(-1) ) {
                // get the previous results and move to the next one in the list
                this._match_index = (this._match_index + 1) % this._match_options.length;
            }
        }
        else {
            this._reset_search();
        }
    },

    _get_matched_options: function( match_string, options ) {
        var new_options = [];

        var length = match_string.length;
        for ( var i = 0 ; i < options.length ; i ++ ) {
            var option = options[i];
            var text = $(option).find( ".dropdown_option_selected_text" ).text();
            if ( text.slice( 0, length ).toUpperCase() == match_string ) {
                new_options.push( option );
            }
        }

        return new_options;
    },

    adjust_collapsed_width: function() {
        if ( this._list.length ) {
            // set width based on the maximum width of all available options
            this.position_options_offscreen();

            this._clear_option_list_height();

            var width = 0;
            var options = this._list.find( this.options.listElement );
            for ( var i = 0 ; i < options.length ; i ++ ) {
                var option = options[i];
                var is_hidden = false;

                var text = $(option).find( ".dropdown_option_selected_text" );
                if ( text.css( 'display' ) == 'none' ) {
                    text.show();
                    is_hidden = true;
                }

                text.css( 'position', 'absolute' );

                var opt_width = text.width();
                if ( opt_width > width ) {
                    width = opt_width;
                }

                text.css( 'position', '' );

                if ( is_hidden ) {
                    text.hide();
                }
            }

            if ( this.options.max_width && this.options.max_width < width ) {
                // enforce max_width
                width = this.options.max_width;
            }
            this._dropdown_label.width( width );

            this._options_layer.hide();
        }
    },

    position_options_offscreen: function() {
        // do an initial shift so that when shown off-screen
        // it won't cause the page to shift up or down
        this._options_layer
            .show()
            .position({
            my: "left top",
            at: "left bottom",
            of: this._dropdown,
            offset: "-2002 -3",
            collision: "none none"
        });
    },

    _update_options_list: function() {
        if ( this._options_dirty ) {
            this.position_options_offscreen();
            this._options = this._list.find( this.options.listElement + ":visible");
            this._options_layer.hide();
            this._options_dirty = false;
        }
    },

    _expand: function() {
        this.collapse_all();
        this._reset_search();

        this.element.trigger('tmdropdownexpand');

        if ( this._options_dirty ) {
            this._update_options_list();
            this._options_layer.show();
        }
        else {
            this.position_options_offscreen();
        }

        this._suspend_make_inactive = true;

        if ( this.options.role == "button") {
          var buttonOptions = this._list.find( this.options.listElement );
          
          for (var i = 0 ; i < buttonOptions.length ; i ++ ) {
            this._wire_option( buttonOptions[i] );
          }
          this._selected_option = this._list.find( ".dropdown_default_option" );
        }
        
        if ( this._list.length ) {
            if ( this._options.length ) {
                for ( var i = 0 ; i < this._options.length ; i ++ ) {
                    var option = this._options[i];

                    if ( option == this._selected_option[0] ) {
                        if ( this.options.role == "combobox" ) {
                          $(option).attr( 'aria-selected', 'true' );
                        }
                    }
                    else {
                        if ( this.options.role == "combobox" ) {
                          $(option).attr( 'aria-selected', 'false' ).removeClass( 'highlight-bg' );
                        }
                        else {
                          $(option).removeClass( 'highlight-bg' );
                        }
                    }
                }

                delete this._focussed_option;
                delete this._mouse_over_option;
                
                this._focus_option( this._selected_option );
                
                if ( this.options.rows ) {
                    this._limit_display_rows();
                }
            }
        }

        if ( this.options.prepare_form_display ) {
            this.options.prepare_form_display();
        }

        this._adjust_expanded_width();

        var el = $(this._dropdown.find( 'b' )[0]);
        el.addClass( "widget-active" );

        var dd = this;
        this._keydown_collapse_function = function( event ) {
            dd._on_document_keydown.apply( dd, [ event ] );
        };
        $(document).bind( 'keydown', this._keydown_collapse_function );

        // position to correct spot
        this._position();

        if(this.options.windowResize) {
            $( window ).bind("resize.dropdown", function() {
                dd._position();
            });
        }

        if( this.options.role == "combobox") {
          this._dropdown.attr( 'aria-expanded', 'true' );
          this._span_focus.attr( 'aria-expanded', 'true' );
        }
        else {
          this._dropdown.attr( 'aria-expanded', 'true' );
          this._dropdown.attr( 'aria-pressed', 'true' );
        }

        this._is_expanded = true;
    },

    _position: function(dd) {
        var defaultOffset = "2 -3";
        if(this.options.adjustContentWidth) {
          defaultOffset = "0 -3";
        }

        this._options_layer.position({
          my: "left top",
          at: "left bottom",
          of: this._dropdown,
          offset: defaultOffset,
          collision: "flip flip"
        });

    },

    _adjust_expanded_width: function() {
        var dropdown_width = 0;
        if(this.options.adjustContentWidth){
          dropdown_width =this.element.find('b[id^="dropdown_current_value"]').outerWidth();
        }
        else {
          dropdown_width = this.element.width();
        }

        this._options_layer.css( 'width', '' );

        var list_width = this._options_layer.width();

        if ( list_width < dropdown_width ) {
            var defaultReduction = 4;
            if(this.options.adjustContentWidth){
              defaultReduction = 0;
            }
            this._options_layer.width( dropdown_width - defaultReduction );
        }
        else if ( this._has_scrollbar ) {            
	       this._options_layer.width(list_width);
           if (this.options.adjustScrollbarWidth) {
                this._options_layer.width(list_width + 15);
           }
        }
    },

    _clear_option_list_height: function() {
        this._list
            .css( 'height', '' )
            .scrollTop( 0 );
    },

    _limit_display_rows: function() {
        var max_rows = this.options.rows;
        var num_rows = this._options.length;

        // clear the height first
        this._clear_option_list_height();

        if ( num_rows > max_rows ) {
            this._has_scrollbar = true;
            var option = $(this._options[0]);
            var row_height = option.outerHeight();
            var list_height = row_height * max_rows;

            this._list.height( list_height );

            var item_pos = this._selected_option.position();
            if ( (item_pos.top + row_height) > list_height ) {
                this._list.scrollTop( item_pos.top );
            }
        }
        else {
            this._has_scrollbar = false;
        }
    },

    collapse_all: function() {
        for ( var i = 0 ; i < this._dropdowns.length ; i ++ ) {
            var dd = this._dropdowns[i];
            if ( dd._is_expanded ) {
                dd._collapse();
            }
        }
    },

    _collapse: function( args ) {
        if ( this._is_expanded ) {

            $(document).unbind( 'keydown', this._keydown_collapse_function );

            if ( typeof args !== 'object' ) {
                args = {};
            }

            var el = $(this._dropdown.find( 'b' )[0]);
            el.removeClass( "widget-active" );

            if ( args.focus ) {
                this._dropdown.focus();
                this._make_active();
            }
            else {
                this._make_inactive();
            }
            this._options_layer.hide();
			
            delete this._focussed_option;
            delete this._mouse_over_option;
            
            if( this.options.role == "combobox") {
              this._dropdown.attr( 'aria-expanded', 'false' );
              this._span_focus.attr( 'aria-expanded', 'false' );
            }
            else {
              this._dropdown.attr( 'aria-expanded', 'false' );
              this._dropdown.attr( 'aria-pressed', 'false' );
            }

            this._is_expanded = false;

            this.element.trigger('tmdropdowncollapse');

            if(this.options.windowResize) {
                $( window ).unbind("resize.dropdown");
            }            

        }
    },

    get_value: function() {
        return this._current_value;
    },

    get_text: function() {
        return this._current_text;
    },

    get_input_name: function() {
        var input = this.element.find('input');
        if ( input.length ) {
            return input.attr( 'name' );
        }

        return "";
    },

    get_selected_option: function() {
        return this._selected_option;
    },

    get_selectable_options: function() {
        var options = this._list.find( this.options.listElement )
          , ret_options = $([])
          , i = 0
          ;

        for( ; i < options.length; i++ ) {
            var option = $(options[i]);

            if( option.css( 'display' ) != 'none' ) {
                ret_options.push(option);
            }
        }

        return ret_options;
    },

    destroy: function() {
        $.Widget.prototype.destroy.apply( this, arguments );
    },
    getAllDropDowns: function(){
        var dropdowns = {},
            dd_item = {};
        for(dd_item in this._dropdowns){
            if(this._dropdowns[dd_item] && this._dropdowns[dd_item].element){
                dropdowns[dd_item] = this._dropdowns[dd_item];
            }
        }
        return dropdowns;
    }
});

})( jQuery );
