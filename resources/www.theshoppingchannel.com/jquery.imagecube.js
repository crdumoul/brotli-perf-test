/* http://keith-wood.name/imageCube.html
   Image Cube for jQuery v1.3.1.
   Written by Keith Wood (kbwood{at}iinet.com.au) June 2008.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. 
   Please attribute the author if you use it. */

/* Rotate images (or other things) as if on the faces of a cube.
   $('div selector').imagecube();
   Or with options like:
   $('div selector').imagecube({direction: 'left', speed: 1000});
*/

(function($) { // Hide scope, no $ conflict

/* Image cube manager. */
function ImageCube() {
	this._defaults = {
		direction: 'up', // Direction of rotation: random|up|down|left|right
		randomSelection: ['up', 'down', 'left', 'right'], // If direction is random, select one of these
		speed: 1000, // Time taken (milliseconds) to transition
		easing: 'linear', // Name of the easing to use during transitions
		repeat: true, // True to automatically trigger a new transition after a pause
		pause: 5000, // Time (milliseconds) between transitions
		selection: 'forward', // How to choose the next item to show:
			// 'forward', 'backward', 'random'
		shading: false, // True to add shading effects, false for no effects
		opacity: 0.8, // Maximum opacity (0.0 - 1.0) for highlights and shadows
		imagePath: '', // Any extra path to locate the highlight/shadow images
		full3D: true, // True to add cubic perspective, false for 2D rotation
		segments: 20, // The number of segments that make up each 3D face
		reduction: 30, // The amount (pixels) of reduction for far edges of the cube
		expansion: 10, // The amount (pixels) of expansion for the near edge of the cube
		lineHeight: [0.0, 1.25], // Hidden and normal line height (em) for text
		letterSpacing: [-0.4, 0.0], // Hidden and normal letter spacing (em) for text
		beforeRotate: null, // Callback before rotating
		afterRotate: null // Callback after rotating
	};
}

var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

$.extend(ImageCube.prototype, {
	/* Class name added to elements to indicate already configured with image cube. */
	markerClassName: 'hasImageCube',
	/* Name of the data property for instance settings. */
	propertyName: 'imageCube',

	/* Override the default settings for all image cube instances.
	   @param  options  (object) the new settings to use as defaults
	   @return  (ImageCube) this object */
	setDefaults: function(options) {
		$.extend(this._defaults, options || {});
		return this;
	},

	/* Attach the image cube functionality to a div.
	   @param  target   (element) the control to affect
	   @param  options  (object) the custom options for this instance */
	_attachPlugin: function(target, options) {
		target = $(target);
		if (target.hasClass(this.markerClassName)) {
			return;
		}
		var inst = {options: $.extend({}, this._defaults, options),
			_position: target.css('position')};
		target.addClass(this.markerClassName).css({position: 'relative'}).
			data(this.propertyName, inst).
			children().each(function() {
				var child = $(this);
				child.data(plugin.propertyName, {display: child.css('display'),
						width: child.css('width'), height: child.css('height'),
						position: child.css('position'), lineHeight: child.css('lineHeight'),
						letterSpacing: child.css('letterSpacing')}).
					css({display: 'block', width: target.css('width'), height: target.css('height'),
						position: 'absolute', lineHeight: inst.options.lineHeight[1],
						letterSpacing: inst.options.letterSpacing[1]});
			}).not(':first').hide();
		this._prepareRotation(target);
	},

	/* Note current visible child and schedule a repeat rotation (if required).
	   @param  target  (element) the containing division */
	_prepareRotation: function(target) {
		target = $(target);
		target.children('.imageCubeShading,.imageCubeFrom,.imageCubeTo').remove();
		var inst = target.data(this.propertyName);
		inst.current = target.children(':visible')[0];
		inst.current = (inst.current ? inst.current : target.children(':first')[0]);
		var randomSelection = function(collection) {
			return (!collection.length ? collection : collection.filter(
				':eq(' + Math.floor(Math.random() * collection.length) + ')'));
		};
		inst.next = (inst.options.selection == 'random' ?
			randomSelection(target.children(':hidden')) :
			(inst.options.selection == 'backward' ? $(inst.current).prev() :
			$(inst.current).next()));
		inst.next = (inst.next.length ? inst.next :
			(inst.options.selection == 'random' ? inst.current :
			(inst.options.selection == 'backward' ? target.children(':last') :
			target.children(':first'))))[0]; // Cycle around if at the end
		if (inst.options.repeat && !inst._timer) {
			inst._timer = setTimeout(function() {
					plugin._rotatePlugin(target); },
				inst.options.pause);
		}
	},

	/* Rotate the image cube to the next face.
	   @param  target    (element) the containing division
	   @param  next      (jQuery or element or string or number) next face to show (optional)
	   @param  callback  (function) a function to call when finished with the rotation (optional) */
	_rotatePlugin: function(target, next, callback) {
		target = $(target);
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		if (typeof next == 'function') {
			callback = next;
			next = null;
		}
		this._stopPlugin(target, true);
		var inst = target.data(this.propertyName);
		if (next != null) {
			next = (typeof next == 'number' ? target.children(':eq(' + next + ')') : $(next));
			if (target.children().filter(function() { return this === next[0]; }).length > 0) {
				inst.next = next;
			}
		}
		var callbackArgs = [inst.current, inst.next];
		if ($.isFunction(inst.options.beforeRotate)) {
			inst.options.beforeRotate.apply(target[0], callbackArgs);
		}
		var animTo = {};
		animTo[this.propertyName] = 1.0;
		target.attr(this.propertyName, 0.0).stop(true, true).
			animate(animTo, inst.options.speed, inst.options.easing, function() {
				if ($.isFunction(inst.options.afterRotate)) {
					inst.options.afterRotate.apply(target[0], callbackArgs);
				}
				if (callback) {
					callback.apply(target[0]);
				}
			});
	},

	/* Retrieve the currently visible child of an image cube div.
	   @param  target  (element) the containing division
	   @return  (element) the currently displayed child of target division */
	_currentPlugin: function(target) {
		target = $(target);
		return (target.hasClass(this.markerClassName) ?
			target.data(this.propertyName).current : null);
	},

	/* Retrieve the next visible child of an image cube div.
	   @param  target  (element) the containing division
	   @return  (element) the next to be displayed child of target division */
	_nextPlugin: function(target) {
		target = $(target);
		return (target.hasClass(this.markerClassName) ?
			target.data(this.propertyName).next : null);
	},

	/* Stop the image cube automatically rotating to the next face.
	   @param  target     (element) the containing division
	   @param  timerOnly  (boolean) true if only temporarily stopping (optional) */
	_stopPlugin: function(target, timerOnly) {
		target = $(target);
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		var inst = target.data(this.propertyName);
		if (inst._timer) {
			clearTimeout(inst._timer);
			inst._timer = null;
		}
		if (!timerOnly) {
			inst.options.repeat = false;
		}
	},

	/* Start the image cube automatically rotating to the next face.
	   @param  target  (element) the containing division */
	_startPlugin: function(target) {
		this._optionPlugin(target, {repeat: true});
	},

	/* Retrieve or reconfigure the settings for a control.
	   @param  target   (element) the control to affect
	   @param  options  (object) the new options for this instance or
	                    (string) an individual property name
	   @param  value    (any) the individual property value (omit if options
	                    is an object or to retrieve the value of a setting)
	   @return  (any) if retrieving a value */
	_optionPlugin: function(target, options, value) {
		target = $(target);
		var inst = target.data(this.propertyName);
		if (!options || (typeof options == 'string' && value == null)) { // Get option
			var name = options;
			options = (inst || {}).options;
			return (options && name ? options[name] : options);
		}

		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		options = options || {};
		if (typeof options == 'string') {
			var name = options;
			options = {};
			options[name] = value;
		}
		$.extend(inst.options, options);
		this._prepareRotation(target);
	},

	/* Remove the plugin functionality from a control.
	   @param  target  (element) the control to affect */
	_destroyPlugin: function(target) {
		target = $(target);
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		this._stopPlugin(target);
		var inst = target.data(this.propertyName);
		target.stop().css({position: inst._position}).
			removeClass(this.markerClassName).
			removeData(this.propertyName).
			children('.imageCubeShading,.imageCubeFrom,.imageCubeTo').remove();
		target.children().each(function() {
			var child = $(this);
			child.css(child.data(this.propertyName)).removeData(this.propertyName);
		}).show();
	},

	/* Prepare the image cube for animation.
	   @param  target  (element) the containing division */
	_prepareAnimation: function(target) {
		target = $(target);
		var inst = target.data(this.propertyName);
		var offset = {left: 0, top: 0};
		target.parents().each(function() { // Check if this area is fixed
			var $this = $(this);
			if ($this.css('position') == 'fixed') {
				offset.left -= $this.offset().left;
				offset.top -= $this.offset().top;
				return false;
			}
		});
		var dims = {width: target.width(), height: target.height()};
		var direction = (inst.options.direction != 'random' ? inst.options.direction :
			inst.options.randomSelection[Math.floor(Math.random() * inst.options.randomSelection.length)]);
		direction = Math.max(0, $.inArray(direction, ['up', 'down', 'left', 'right']));
		inst._curDirection = direction;
		var upDown = (direction == UP || direction == DOWN);
		var leftRight = (direction == LEFT || direction == RIGHT);
		var upLeft = (direction == UP || direction == LEFT);
		var firstOpacity = (upLeft ? 0 : inst.options.opacity);
		var pFrom = $(inst.current);
		var pTo = $(inst.next);
		// Calculate borders and padding for both elements
		var border = [];
		var parseBorders = function(p) {
			var b = [0, 0, 0, 0];
			if (p.css('border') != undefined) { // IE
				$.each(['Left', 'Right', 'Top', 'Bottom'], function(i, side) {
					b[i] = p.css('border' + side + 'Width');
					b[i] = parseFloat({thin: 1, medium: 3, thick: 5}[b[i]] || b[i]);
				});
			}
			return b;
		};
		border[0] = parseBorders(pFrom);
		border[1] = parseBorders(pTo);
		var pad = [];
		pad[0] = [parseFloat(pFrom.css('padding-left')), parseFloat(pFrom.css('padding-right')),
			parseFloat(pFrom.css('padding-top')), parseFloat(pFrom.css('padding-bottom'))];
		pad[1] = [parseFloat(pTo.css('padding-left')), parseFloat(pTo.css('padding-right')),
			parseFloat(pTo.css('padding-top')), parseFloat(pTo.css('padding-bottom'))];
		var extras = [];
		extras[0] = ($.support.boxModel ? [border[0][0] + border[0][1] + pad[0][0] + pad[0][1],
			border[0][2] + border[0][3] + pad[0][2] + pad[0][3]] : [0, 0]);
		extras[1] = ($.support.boxModel ? [border[1][0] + border[1][1] + pad[1][0] + pad[1][1],
			border[1][2] + border[1][3] + pad[1][2] + pad[1][3]] : [0, 0]);
		// Define the property ranges per element
		var stepProps = [];
		stepProps[0] = {elem: pFrom[0], // Currently displayed element
			props: {left: {start: offset.left,
				end: offset.left + (direction == RIGHT ? dims.width : 0), units: 'px'},
			width: {start: dims.width - extras[0][0],
				end: (upDown ? dims.width - extras[0][0] : 0), units: 'px'},
			top: {start: offset.top,
				end: offset.top + (direction == DOWN ? dims.height : 0), units: 'px'},
			height: {start: dims.height - extras[0][1],
				end: (upDown ? 0 : dims.height - extras[0][1]), units: 'px'},
			paddingLeft: {start: pad[0][0], end: (leftRight ? 0 : pad[0][0]), units: 'px'},
			paddingRight: {start: pad[0][1], end: (leftRight ? 0 : pad[0][1]), units: 'px'},
			paddingTop: {start: pad[0][2], end: (upDown ? 0 : pad[0][2]), units: 'px'},
			paddingBottom: {start: pad[0][3], end: (upDown ? 0 : pad[0][3]), units: 'px'},
			borderLeftWidth: {start: border[0][0], end: (leftRight ? 0 : border[0][0]), units: 'px'},
			borderRightWidth: {start: border[0][1], end: (leftRight ? 0 : border[0][1]), units: 'px'},
			borderTopWidth: {start: border[0][2], end: (upDown ? 0 : border[0][2]), units: 'px'},
			borderBottomWidth: {start: border[0][3], end: (upDown ? 0 : border[0][3]), units: 'px'},
			lineHeight: {start: inst.options.lineHeight[1],
				end: (upDown ? inst.options.lineHeight[0] : inst.options.lineHeight[1]), units: 'em'},
			letterSpacing: {start: inst.options.letterSpacing[1],
				end: (upDown ? inst.options.letterSpacing[1] : inst.options.letterSpacing[0]), units: 'em'}}};
		stepProps[1] = {elem: pTo[0], // New element to be displayed
			props: {left: {start: offset.left + (direction == LEFT ? dims.width : 0),
				end: offset.left, units: 'px'},
			width: {start: (upDown ? dims.width - extras[1][0] : 0),
				end: dims.width - extras[1][0], units: 'px'},
			top: {start: offset.top + (direction == UP ? dims.height : 0),
				end: offset.top, units: 'px'},
			height: {start: (upDown ? 0 : dims.height - extras[1][1]),
				end : dims.height - extras[1][1], units: 'px'},
			paddingLeft: {start: (leftRight ? 0 : pad[1][0]), end: pad[1][0], units: 'px'},
			paddingRight: {start: (leftRight ? 0 : pad[1][1]), end: pad[1][1], units: 'px'},
			paddingTop: {start: (upDown ? 0 : pad[1][2]), end: pad[1][2], units: 'px'},
			paddingBottom: {start: (upDown ? 0 : pad[1][3]), end: pad[1][3], units: 'px'},
			borderLeftWidth: {start: (leftRight ? 0 : border[1][0]), end: border[1][0], units: 'px'},
			borderRightWidth: {start: (leftRight ? 0 : border[1][1]), end: border[1][1], units: 'px'},
			borderTopWidth: {start: (upDown ? 0 : border[1][2]), end: border[1][2], units: 'px'},
			borderBottomWidth: {start: (upDown ? 0 : border[1][3]), end: border[1][3], units: 'px'},
			lineHeight: {start: (upDown ? inst.options.lineHeight[0] : inst.options.lineHeight[1]),
				end: inst.options.lineHeight[1], units: 'em'},
			letterSpacing: {start: (upDown ? inst.options.letterSpacing[1] : inst.options.letterSpacing[0]),
				end: inst.options.letterSpacing[1], units: 'em'}}};
		if (inst.options.shading) {
			// Initialise highlight and shadow objects (or colours on IE)
			var setHighShad = function(props, startOpacity, endOpacity) {
				return {left: {start: props.left.start, end: props.left.end, units: 'px'},
					width: {start: props.width.start, end: props.width.end, units: 'px'},
					top: {start: props.top.start, end: props.top.end, units: 'px'},
					height: {start: props.height.start, end: props.height.end, units: 'px'},
					paddingLeft: {start: props.paddingLeft.start + props.borderLeftWidth.start,
						end: props.paddingLeft.end + props.borderLeftWidth.end, units: 'px'},
					paddingRight: {start: props.paddingRight.start + props.borderRightWidth.start,
						end: props.paddingRight.end + props.borderRightWidth.end, units: 'px'},
					paddingTop: {start: props.paddingTop.start + props.borderTopWidth.start,
						end: props.paddingTop.end + props.borderTopWidth.end, units: 'px'},
					paddingBottom: {start: props.paddingBottom.start + props.borderBottomWidth.start,
						end: props.paddingBottom.end + props.borderBottomWidth.end, units: 'px'},
					opacity: {start: startOpacity, end: endOpacity, units: ''}};
			};
			stepProps[2] = {elem: // Highlight shading (up/left)
				$((!$.support.opacity ? '<img src="' + inst.options.imagePath + 'imageCubeHigh.png"' :
				'<div') + ' class="imageCubeShading" style="background-color: white; opacity: ' +
				firstOpacity + '; z-index: 10; position: absolute;"' +
				(!$.support.opacity ? '/>' : '></div>'))[0],
				props: setHighShad(stepProps[upLeft ? 0 : 1].props,
				firstOpacity, inst.options.opacity - firstOpacity)};
			stepProps[3] = {elem: // Shadow shading (down/right)
				$((!$.support.opacity ? '<img src="' + inst.options.imagePath + 'imageCubeShad.png"' :
				'<div') + ' class="imageCubeShading" style="background-color: black; opacity: ' +
				(inst.options.opacity - firstOpacity) + '; z-index: 10; position: absolute;"' +
				(!$.support.opacity ? '/>' : '></div>'))[0],
				props: setHighShad(stepProps[upLeft ? 1 : 0].props,
				inst.options.opacity - firstOpacity, firstOpacity)};
		}
		// Set up full 3D rotation
		if (inst.options.full3D) {
			for (var i = 0; i < inst.options.segments; i++) {
				target.append(pFrom.clone().addClass('imageCubeFrom').
					css({display: 'block', position: 'absolute', overflow: 'hidden'}));
				if (inst.options.shading) {
					target.append($(stepProps[upLeft ? 2 : 3].elem).clone());
				}
			}
			for (var i = 0; i < inst.options.segments; i++) {
				target.append(pTo.clone().addClass('imageCubeTo').
					css({display: 'block', position: 'absolute', width: 0, overflow: 'hidden'}));
				if (inst.options.shading) {
					target.append($(stepProps[upLeft ? 3 : 2].elem).clone());
				}
			}
			pFrom.hide();
			pTo.css({width: dims.width - extras[1][0], height: dims.height - extras[1][1]});
		}
		else {
			// Initialise from and to objects
			var initCSS = function(props) {
				return {left: props.left.start + 'px', width: props.width.start + 'px',
					top: props.top.start + 'px', height: props.height.start + 'px',
					lineHeight: props.lineHeight.start + 'em',
					padding: props.paddingTop.start + 'px ' + props.paddingRight.start + 'px ' +
					props.paddingBottom.start + 'px ' + props.paddingLeft.start + 'px',
					borderLeftWidth: props.borderLeftWidth.start + 'px',
					borderRightWidth: props.borderRightWidth.start + 'px',
					borderTopWidth: props.borderTopWidth.start + 'px',
					borderBottomWidth: props.borderBottomWidth.start + 'px',
					letterSpacing: props.letterSpacing.start + 'em', overflow: 'hidden'};
			};
			pFrom.css(initCSS(stepProps[0].props));
			pTo.css(initCSS(stepProps[1].props)).show();
			if (inst.options.shading) {
				target.append(stepProps[2].elem).append(stepProps[3].elem);
			}
		}
		// Pre-compute differences
		for (var i = 0; i < stepProps.length; i++) {
			for (var name in stepProps[i].props) {
				var prop = stepProps[i].props[name];
				prop.diff = prop.end - prop.start;
			}
		}
		return stepProps;
	},

	/* Draw one panel of the 3D perspective view of the cube.
	   @param  target     (element) the container
	   @param  pos        (number) the current position (0.0 - 1.0)
	   @param  stepProps  (object[]) details about the items being animated
	   @return  (boolean) true if drawn in 3D, false if not */
	_drawFull3D: function(target, pos, stepProps) {
		target = $(target);
		var inst = target.data(this.propertyName);
		if (!inst.options.full3D) {
			return false;
		}
		var direction = inst._curDirection;
		var upDown = (direction == UP || direction == DOWN);
		var upLeft = (direction == UP || direction == LEFT);
		var width = target.width();
		var height = target.height();
		if (width == 0 || height == 0) {
			return true;
		}
		var current = (1 - pos) * (upDown ? height : width);
		var segments = inst.options.segments;
		var maxExpand = inst.options.expansion * (1 - Math.abs(2 * current - (upDown ? height : width)) /
			(upDown ? height : width));
		var maxReduce = inst.options.reduction - (inst.options.reduction * current / (upDown ? height : width));
		var update = function(className, al, at, bl, bt, cl, ct, dl, dt, opacity, props, attr) {
			var ws = [bl - al, cl - dl];
			var w = Math.max(ws[0], ws[1]);
			var hs = [dt - at, ct - bt];
			var h = Math.max(hs[0], hs[1]);
			var wStep = (upDown ? (ws[0] - ws[1]) / (segments - 1) / 2 : w / segments);
			var hStep = (upDown ? h / segments : (hs[0] - hs[1]) / (segments - 1) / 2);
			var pbw = props.paddingLeft[attr] + props.paddingRight[attr] +
				props.borderLeftWidth[attr] + props.borderRightWidth[attr];
			var pbh = props.paddingTop[attr] + props.paddingBottom[attr] +
				props.borderTopWidth[attr] + props.borderBottomWidth[attr];
			var ral = Math.round(al);
			var rat = Math.round(at);
			var thisLeft = ral;
			var thisTop = rat;
			var i = 0;
			for (var j = 0; j < target[0].childNodes.length; j++) {
				var child = target[0].childNodes[j];
				if (child.className != className) {
					continue;
				}
				var nextLeft = Math.round(al + (i + 1) * wStep);
				var nextTop = Math.round(at + (i + 1) * hStep);
				var wCur = ws[0] - (upDown ? 2 * i * wStep : 0);
				var hCur = hs[0] - (upDown ? 0 : 2 * i * hStep);
				child.style.left = (upDown ? thisLeft : al) + 'px';
				child.style.top = (upDown ? at : thisTop) + 'px';
				child.style.width = Math.max(0, wCur - pbw) + 'px';
				child.style.height = Math.max(0, hCur - pbh) + 'px';
				child.style.letterSpacing = (upDown ? wCur / w * (inst.options.letterSpacing[1] -
					inst.options.letterSpacing[0]) + inst.options.letterSpacing[0] :
					pos * props.letterSpacing.diff + props.letterSpacing.start) +
					props.letterSpacing.units;
				child.style.lineHeight = (!upDown ? hCur / h * (inst.options.lineHeight[1] -
					inst.options.lineHeight[0]) + inst.options.lineHeight[0] :
					pos * props.lineHeight.diff + props.lineHeight.start) +
					props.lineHeight.units;
				child.style.clip = 'rect(' + (!upDown ? 'auto' : (thisTop - rat) + 'px') + ',' +
					(upDown ? 'auto' : (nextLeft - ral) + 'px') + ',' +
					(!upDown ? 'auto' : (nextTop - rat) + 'px') + ',' +
					(upDown ? 'auto' : (thisLeft - ral) + 'px') + ')';
				if (inst.options.shading) {
					var shading = child.nextSibling;
					shading.style.left = thisLeft + 'px';
					shading.style.top = thisTop + 'px';
					shading.style.width = (upDown ? ws[0] - 2 * i * wStep : nextLeft - thisLeft) + 'px';
					shading.style.height = (upDown ? nextTop - thisTop : hs[0] - 2 * i * hStep) + 'px';
					shading.style.opacity = opacity;
					if (!$.support.opacity) {
						shading.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
					}
				}
				thisLeft = nextLeft;
				thisTop = nextTop;
				i++;
			}
		};
		update('imageCubeFrom',
			[maxReduce, -maxExpand, 0, width - current][direction], // top left
			[0, height - current, maxReduce, -maxExpand][direction],
			[width - maxReduce, width + maxExpand, current, width][direction], // top right
			[0, height - current, -maxExpand, maxReduce][direction],
			[width + maxExpand, width - maxReduce, current, width][direction], // bottom right
			[current, height, height + maxExpand, height - maxReduce][direction],
			[-maxExpand, maxReduce, 0, width - current][direction], // bottom left
			[current, height, height - maxReduce, height + maxExpand][direction],
			(!inst.options.shading ? 0 : (upLeft ? pos : 1 - pos) *
			stepProps[2].props.opacity.diff + stepProps[2].props.opacity.start),
			stepProps[0].props, 'start');
		update('imageCubeTo',
			[-maxExpand, inst.options.reduction - maxReduce, current, 0][direction], // top left
			[current, 0, -maxExpand, inst.options.reduction - maxReduce][direction],
			[width + maxExpand, width - (inst.options.reduction - maxReduce), width, width - current][direction], // top right
			[current, 0, inst.options.reduction - maxReduce, -maxExpand][direction],
			[width - (inst.options.reduction - maxReduce), width + maxExpand, width, width - current][direction], // bottom right
			[height, height - current, height - (inst.options.reduction - maxReduce), height + maxExpand][direction],
			[inst.options.reduction - maxReduce, -maxExpand, current, 0][direction], // bottom left
			[height, height - current, height + maxExpand, height - (inst.options.reduction - maxReduce)][direction],
			(!inst.options.shading ? 0 : (upLeft ? pos : 1 - pos) *
			stepProps[3].props.opacity.diff + stepProps[3].props.opacity.start),
			stepProps[1].props, 'end');
		return true;
	}
});

// The list of commands that return values and don't permit chaining
var getters = ['current', 'next'];

/* Determine whether a command is a getter and doesn't permit chaining.
   @param  command    (string, optional) the command to run
   @param  otherArgs  ([], optional) any other arguments for the command
   @return  true if the command is a getter, false if not */
function isNotChained(command, otherArgs) {
	if (command == 'option' && (otherArgs.length == 0 ||
			(otherArgs.length == 1 && typeof otherArgs[0] == 'string'))) {
		return true;
	}
	return $.inArray(command, getters) > -1;
}

/* Attach the image cube functionality to a jQuery selection.
   @param  options  (object) the new settings to use for these instances (optional) or
                    (string) the command to run (optional)
   @return  (jQuery) for chaining further calls or
            (any) getter value */
$.fn.imagecube = function(options) {
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (isNotChained(options, otherArgs)) {
		return plugin['_' + options + 'Plugin'].apply(plugin, [this[0]].concat(otherArgs));
	}
	return this.each(function() {
		if (typeof options == 'string') {
			if (!plugin['_' + options + 'Plugin']) {
				throw 'Unknown command: ' + options;
			}
			plugin['_' + options + 'Plugin'].apply(plugin, [this].concat(otherArgs));
		}
		else {
			plugin._attachPlugin(this, options || {});
		}
	});
};

/* Initialise the image cube functionality. */
var plugin = $.imagecube = new ImageCube(); // Singleton instance

/* Enable synchronised animation for all of the image cube properties.
   @param  fx  (object) the effects instance to animate */
$.fx.step[plugin.propertyName] = function(fx) {
	if (!fx.stepProps) { // Initialisation
		fx.start = 0.0;
		fx.end = 1.0;
		fx.stepProps = plugin._prepareAnimation(fx.elem);
		var elem = fx.stepProps[0].elem;
		fx.saveCSS = {borderLeftWidth: elem.style.borderLeftWidth,
			borderRightWidth: elem.style.borderRightWidth,
			borderTopWidth: elem.style.borderTopWidth,
			borderBottomWidth: elem.style.borderBottomWidth,
			padding: elem.style.padding};
	}

	if (!plugin._drawFull3D(fx.elem, fx.pos, fx.stepProps)) {
		for (var i = 0; i < fx.stepProps.length; i++) { // Update all elements
			var comp = fx.stepProps[i];
			for (var name in comp.props) { // Update all properties
				var prop = comp.props[name];
				comp.elem.style[name] = (fx.pos * prop.diff + prop.start) + prop.units;
				if (!$.support.opacity && name == 'opacity') {
					comp.elem.style.filter = 'alpha(opacity=' +
						((fx.pos * prop.diff + prop.start) * 100) + ')';
				}
			}
		}
	}

	if (fx.pos == 1) { // Tidy up afterwards
		$(fx.stepProps[0].elem).hide().css(fx.saveCSS);
		$(fx.stepProps[1].elem).show();
		plugin._prepareRotation(fx.elem);
	}
};

})(jQuery);
