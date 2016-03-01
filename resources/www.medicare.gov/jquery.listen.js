/**
 * jQuery.Listen
 * Copyright (c) 2007-2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/7/2008
 *
 * @projectDescription Light and fast event handling, using event delegation.
 * Homepage: http://flesler.blogspot.com/2007/10/jquerylisten.html
 * Requires jQuery 1.2.3 or higher. Tested on FF 2|IE 6/7|Safari 3|Opera 9, Windows XP.
 *
 * @author Ariel Flesler
 * @version 1.0.3
 *
 * @id jQuery.listen
 * @param {String} name Name of the event to listen (f.e: click, mouseover, etc).
 * @param {DOM Element} listener optional: The DOM element to listen from, the document element by default.
 * @param {String|Boolean} selector A simple selector in one of this formats: "#id", "tagname", ".class", or "tagname.class".
 * @param {Function} handler The event handler to register.
 *
 * Notes:
 *	-The selectors support is low in order to mantain scalability. You can use comma-separated selectors.
 *	  I consider these 4 options, the most useful and I believe they are enough for many cases.
 *	-This plugin can't handle non-bubbling events. It handles focus & blur thanks to the focusin/focusout approach.
 */
;(function( $ ){

	$.fn.indexer = function( name ){//allow public access to the indexers
		return this[0] && indexer( this[0], name ) || null;
	};
	$.indexer = function( name ){
		return indexer( document, name );	
	};

	var $event = $.event,
		$special = $event.special,
		$listen = $.listen = function( name, listener, selector, handler ){
			if( typeof listener != 'object' ){ //document is the default listener
				handler = selector;
				selector = listener;
				listener = document;
			}
			each( name.split(/\s+/), function( ev ){
				ev = $listen.fixes[ev] || ev;//try to use a fixed event.
				var idxer = indexer( listener, ev ) || indexer( listener, ev, new Indexer(ev,listener) );

				idxer.append( selector, handler );// register the handler.
				idxer.start();
			});
		},
		indexer = function( elem, name, val ){
			return $.data( elem, name+'.indexer', val );	
		};

	$.extend( $listen, {
		regex: /^((?:\w*?|\*))(?:([#.])([\w-]+))?$/, //matches "#id", "tag", ".class" or "tag.class", also "tag#id" but the tag is ignored.
		fixes: { //registry of replacement for non-bubbling events, you can add more ( please fix change for IE :) )
			focus:'focusin',
			blur:'focusout'	
		},
		cache:function( on ){
			this.caching = on;
		}
	});

	//taken and adapted from http://dev.jquery.com/browser/trunk/plugins/validate/lib/jquery.delegate.js?rev=4374	
	$.each( $listen.fixes, function( original, fix ){
		$special[fix] = {
			setup:function() { 
                if ( $.browser.msie ) return false; 
                this.addEventListener( original, $special[fix].handler, true );
            }, 
            teardown:function() { 
                if ( $.browser.msie ) return false; 
                this.removeEventListener( original, $special[fix].handler, true ); 
            }, 
            handler: function(e) { 
                arguments[0] = e = $event.fix(e);
                e.type = fix;
                return $event.handle.apply(this, arguments); 
            }
		};
	});

	$.fn.listen = function( name, selector, handler ){//listen using the prototype
		return this.each(function(){
			$listen( name, this, selector, handler );						  
		});
	};	

	function Indexer( name, listener ){
		$.extend( this, {
			ids: {},
			tags: {},
			listener: listener,
			event: name
		});
		this.id = Indexer.instances.push( this );//for cleaning up later
	};
	Indexer.instances = [ ];

	Indexer.prototype = {
		constructor: Indexer,
		handle:function( e ){
			var sp = e.stopPropagation;//intercept any call to stopPropagation
			e.stopPropagation = function(){
				e.stopped = true;
				sp.apply(this,arguments);	
			};
			indexer(this,e.type).parse( e );
			e.stopPropagation = sp;//revert
			sp = e.data = null;//cleanup			
		},
		on:false,
		bubbles:false,
		start:function(){//start listening (bind)
			if( !this.on ){ //avoid duplicates
				$event.add( this.listener, this.event, this.handle );
				this.on = true;
			}
		},
		stop:function(){//stop listening (unbind)
			if( this.on ){
				$event.remove( this.listener, this.event, this.handle );
				this.on = false;
			}
		},
		cache:function( node, handlers ){
			return $.data( node, 'listenCache_' + this.id, handlers );
		},
		parse:function( e ){
			var node = e.data || e.target,
				args = arguments, handlers;

			if( !$listen.caching || !( handlers = this.cache(node) ) ){//try to retrieve cached handlers
				handlers = [ ];			

				if( node.id && this.ids[node.id] )//if this node has an id and there are handlers registered to it..
					push( handlers, this.ids[node.id] );

				each([ node.nodeName, '*' ], function( tag ){//look for handlers registered by name.class.
					var klasses = this.tags[tag];
					if( klasses )
						each( (node.className + ' *').split(' '), function( klass ){
							if( klass && klasses[klass] )
								push( handlers, klasses[klass] );//append the handlers to the list.
						});
				}, this);
				
				if( $listen.caching )
					this.cache( node, handlers );
			}

			if( handlers[0] ){
				each( handlers, function( handler ){
					if( handler.apply(node, args) === false ){
						e.preventDefault();
						e.stopPropagation();	
					}
				});
			}

			if( !e.stopped && (node = node.parentNode) && (node.nodeName == 'A' || this.bubbles && node != this.listener) ){//go up ?
				e.data = node;//I rather not alter e.target, it might be used.
				this.parse( e );
			}
			handlers = args = node = null;//cleanup
		},
		append:function( selector, handler ){
			each( selector.split(/\s*,\s*/), function(selector){//support comma separated selectors
				var match = $listen.regex.exec( selector );
				if( !match )
					throw '$.listen > "' + selector + '" is not a supported selector.';
				var 
					id = match[2] == '#' && match[3],
					tag = match[1].toUpperCase() || '*',
					klass =	match[3] || '*';
				if( id )//we have an id, register the handler to it.
					(this.ids[id] || (this.ids[id] = [ ])).push( handler );
				else if( tag ){//we have an name and/or class
					tag = this.tags[tag] = this.tags[tag] || { };
					(tag[klass] || (tag[klass] = [ ])).push( handler );
				}
			}, this );
		}
	};

	function each( arr, fn, scope ){
		for(var i=0, l=arr.length; i < l; i++ )
			fn.call( scope, arr[i], i );
	};
	function push( arr, elems ){
		arr.push.apply( arr, elems );
		return arr;
	};

	$(window).unload(function(){// cleanup
		if( typeof Indexer == 'function' ) 
			each( Indexer.instances, function(idxer){
				idxer.stop();
				$.removeData( idxer.listener, idxer.event + '.indexer' );
				idxer.ids = idxer.names = idxer.listener = null;
			});
	});

})( jQuery );