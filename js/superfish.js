
/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */

// ;(function($){
// 	$.fn.superfish = function(op){

// 		var sf = $.fn.superfish,
// 			c = sf.c,
// 			$arrow = $(['<span class="',c.arrowClass,'"></span>'].join('')),
// 			over = function(){
// 				var $$ = $(this), menu = getMenu($$);
// 				clearTimeout(menu.sfTimer);
// 				$$.showSuperfishUl().siblings().hideSuperfishUl();
// 			},
// 			out = function(){
// 				var $$ = $(this), menu = getMenu($$), o = sf.op;
// 				clearTimeout(menu.sfTimer);
// 				menu.sfTimer=setTimeout(function(){
// 					o.retainPath=($.inArray($$[0],o.$path)>-1);
// 					$$.hideSuperfishUl();
// 					if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
// 				},o.delay);	
// 			},
// 			getMenu = function($menu){
// 				var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
// 				sf.op = sf.o[menu.serial];
// 				return menu;
// 			},
// 			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
// 		return this.each(function() {
// 			var s = this.serial = sf.o.length;
// 			var o = $.extend({},sf.defaults,op);
// 			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
// 				$(this).addClass([o.hoverClass,c.bcClass].join(' '))
// 					.filter('li:has(ul)').removeClass(o.pathClass);
// 			});
// 			sf.o[s] = sf.op = o;
			
// 			$('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
// 				if (o.autoArrows) addArrow( $('>a:first-child',this) );
// 			})
// 			.not('.'+c.bcClass)
// 				.hideSuperfishUl();
			
// 			var $a = $('a',this);
// 			$a.each(function(i){
// 				var $li = $a.eq(i).parents('li');
// 			});
// 			o.onInit.call(this);
			
// 		}).each(function() {
// 			var menuClasses = [c.menuClass];
// 			if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
// 			$(this).addClass(menuClasses.join(' '));
// 		});
// 	};

// 	var sf = $.fn.superfish;
// 	sf.o = [];
// 	sf.op = {};
// 	sf.IE7fix = function(){
// 		var o = sf.op;
// 		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
// 			this.toggleClass(sf.c.shadowClass+'-off');
// 		};
// 	sf.c = {
// 		bcClass     : 'sf-breadcrumb',
// 		menuClass   : 'sf-js-enabled',
// 		anchorClass : 'sf-with-ul',
// 		arrowClass  : 'menu-arrow',
// 		shadowClass : 'sf-shadow'
// 	};
// 	sf.defaults = {
// 		hoverClass	: 'sfHover',
// 		pathClass	: 'overideThisToUse',
// 		pathLevels	: 2,
// 		delay		: 1000,
// 		animation	: {height:'show'},
// 		speed		: 'normal',
// 		autoArrows	: false,
// 		dropShadows : false,
// 		disableHI	: false,		// true disables hoverIntent detection
// 		onInit		: function(){}, // callback functions
// 		onBeforeShow: function(){},
// 		onShow		: function(){},
// 		onHide		: function(){}
// 	};
// 	$.fn.extend({
// 		hideSuperfishUl : function(){
// 			var o = sf.op,
// 				not = (o.retainPath===true) ? o.$path : '';
// 			o.retainPath = false;
// 			var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
// 					.find('>ul').hide();
// 			o.onHide.call($ul);
// 			return this;
// 		},
// 		showSuperfishUl : function(){
// 			var o = sf.op,
// 				sh = sf.c.shadowClass+'-off',
// 				$ul = this.not('.accorChild').addClass(o.hoverClass)
// 					.find('>ul:hidden');
// 			sf.IE7fix.call($ul);
// 			o.onBeforeShow.call($ul);
// 			$ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
// 			return this;
// 		}
// 	});

// })(jQuery);
/*
 * jQuery Superfish Menu Plugin
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */

(function ($) {
	"use strict";

	var methods = (function () {
		// private properties and methods go here
		var c = {
				bcClass: 'sf-breadcrumb',
				menuClass: 'sf-js-enabled',
				anchorClass: 'sf-with-ul',
				menuArrowClass: 'sf-arrows'
			},
			ios = (function () {
				var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
				if (ios) {
					// iOS clicks only bubble as far as body children
					$(window).load(function () {
						$('body').children().on('click', $.noop);
					});
				}
				return ios;
			})(),
			wp7 = (function () {
				var style = document.documentElement.style;
				return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
			})(),
			toggleMenuClasses = function ($menu, o) {
				var classes = c.menuClass;
				if (o.cssArrows) {
					classes += ' ' + c.menuArrowClass;
				}
				$menu.toggleClass(classes);
			},
			setPathToCurrent = function ($menu, o) {
				return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
					.addClass(o.hoverClass + ' ' + c.bcClass)
						.filter(function () {
							return ($(this).children(o.popUpSelector).hide().show().length);
						}).removeClass(o.pathClass);
			},
			toggleAnchorClass = function ($li) {
				$li.children('a').toggleClass(c.anchorClass);
			},
			toggleTouchAction = function ($menu) {
				var touchAction = $menu.css('ms-touch-action');
				touchAction = (touchAction === 'pan-y') ? 'auto' : 'pan-y';
				$menu.css('ms-touch-action', touchAction);
			},
			applyHandlers = function ($menu, o) {
				var targets = 'li:has(' + o.popUpSelector + ')';
				if ($.fn.hoverIntent && !o.disableHI) {
					$menu.hoverIntent(over, out, targets);
				}
				else {
					$menu
						.on('mouseenter.superfish', targets, over)
						.on('mouseleave.superfish', targets, out);
				}
				var touchevent = 'MSPointerDown.superfish';
				if (!ios) {
					touchevent += ' touchend.superfish';
				}
				if (wp7) {
					touchevent += ' mousedown.superfish';
				}
				$menu
					.on('focusin.superfish', 'li', over)
					.on('focusout.superfish', 'li', out)
					.on(touchevent, 'a', o, touchHandler);
			},
			touchHandler = function (e) {
				var $this = $(this),
					$ul = $this.siblings(e.data.popUpSelector);

				if ($ul.length > 0 && $ul.is(':hidden')) {
					$this.one('click.superfish', false);
					if (e.type === 'MSPointerDown') {
						$this.trigger('focus');
					} else {
						$.proxy(over, $this.parent('li'))();
					}
				}
			},
			over = function () {
				var $this = $(this),
					o = getOptions($this);
				clearTimeout(o.sfTimer);
				$this.siblings().superfish('hide').end().superfish('show');
			},
			out = function () {
				var $this = $(this),
					o = getOptions($this);
				if (ios) {
					$.proxy(close, $this, o)();
				}
				else {
					clearTimeout(o.sfTimer);
					o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
				}
			},
			close = function (o) {
				o.retainPath = ($.inArray(this[0], o.$path) > -1);
				this.superfish('hide');

				if (!this.parents('.' + o.hoverClass).length) {
					o.onIdle.call(getMenu(this));
					if (o.$path.length) {
						$.proxy(over, o.$path)();
					}
				}
			},
			getMenu = function ($el) {
				return $el.closest('.' + c.menuClass);
			},
			getOptions = function ($el) {
				return getMenu($el).data('sf-options');
			};

		return {
			// public methods
			hide: function (instant) {
				if (this.length) {
					var $this = this,
						o = getOptions($this);
					if (!o) {
						return this;
					}
					var not = (o.retainPath === true) ? o.$path : '',
						$ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),
						speed = o.speedOut;

					if (instant) {
						$ul.show();
						speed = 0;
					}
					o.retainPath = false;
					o.onBeforeHide.call($ul);
					$ul.stop(true, true).animate(o.animationOut, speed, function () {
						var $this = $(this);
						o.onHide.call($this);
					});
				}
				return this;
			},
			show: function () {
				var o = getOptions(this);
				if (!o) {
					return this;
				}
				var $this = this.addClass(o.hoverClass),
					$ul = $this.children(o.popUpSelector);

				o.onBeforeShow.call($ul);
				$ul.stop(true, true).animate(o.animation, o.speed, function () {
					o.onShow.call($ul);
				});
				return this;
			},
			destroy: function () {
				return this.each(function () {
					var $this = $(this),
						o = $this.data('sf-options'),
						$hasPopUp;
					if (!o) {
						return false;
					}
					$hasPopUp = $this.find(o.popUpSelector).parent('li');
					clearTimeout(o.sfTimer);
					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					// remove event handlers
					$this.off('.superfish').off('.hoverIntent');
					// clear animation's inline display style
					$hasPopUp.children(o.popUpSelector).attr('style', function (i, style) {
						return style.replace(/display[^;]+;?/g, '');
					});
					// reset 'current' path classes
					o.$path.removeClass(o.hoverClass + ' ' + c.bcClass).addClass(o.pathClass);
					$this.find('.' + o.hoverClass).removeClass(o.hoverClass);
					o.onDestroy.call($this);
					$this.removeData('sf-options');
				});
			},
			init: function (op) {
				return this.each(function () {
					var $this = $(this);
					if ($this.data('sf-options')) {
						return false;
					}
					var o = $.extend({}, $.fn.superfish.defaults, op),
						$hasPopUp = $this.find(o.popUpSelector).parent('li');
					o.$path = setPathToCurrent($this, o);

					$this.data('sf-options', o);

					toggleMenuClasses($this, o);
					toggleAnchorClass($hasPopUp);
					toggleTouchAction($this);
					applyHandlers($this, o);

					$hasPopUp.not('.' + c.bcClass).superfish('hide', true);

					o.onInit.call(this);
				});
			}
		};
	})();

	$.fn.superfish = function (method, args) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
		else {
			return $.error('Method ' +  method + ' does not exist on jQuery.fn.superfish');
		}
	};

	$.fn.superfish.defaults = {
		popUpSelector: 'ul,.sf-mega', // within menu context
		hoverClass: 'sfHover',
		pathClass: 'overrideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: {opacity: 'show'},
		animationOut: {opacity: 'hide'},
		speed: 'normal',
		speedOut: 'fast',
		cssArrows: true,
		disableHI: false,
		onInit: $.noop,
		onBeforeShow: $.noop,
		onShow: $.noop,
		onBeforeHide: $.noop,
		onHide: $.noop,
		onIdle: $.noop,
		onDestroy: $.noop
	};

	// soon to be deprecated
	$.fn.extend({
		hideSuperfishUl: methods.hide,
		showSuperfishUl: methods.show
	});

})(jQuery);
/*---------------------*/
$(function(){
	$('.sf-menu').superfish({autoArrows: true})
})