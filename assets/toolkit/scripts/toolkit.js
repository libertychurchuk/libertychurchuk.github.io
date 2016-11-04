/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Load Map on Contact and New to Church Pages
	$(function () {
	  if ($('body').is('.contact, .new')) {
	    __webpack_require__(9);
	  }
	});
	
	__webpack_require__(10);
	//require("script!./fontfaceobserver.js");
	__webpack_require__(8);
	__webpack_require__(12);
	__webpack_require__(11);

/***/ },
/* 1 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript !== "undefined")
			execScript(src);
		else
			eval.call(null, src);
	}


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	module.exports = "'use strict';\n\n(function ($) {\n  $.fn.collapsible = function (options) {\n    var defaults = {\n      accordion: undefined\n    };\n\n    options = $.extend(defaults, options);\n\n    return this.each(function () {\n\n      var $this = $(this);\n\n      var $panel_headers = $(this).find('> li > .collapsible-header');\n\n      var collapsible_type = $this.data(\"collapsible\");\n\n      // Turn off any existing event handlers\n      $this.off('click.collapse', '> li > .collapsible-header');\n      $panel_headers.off('click.collapse');\n\n      /****************\n      Helper Functions\n      ****************/\n\n      // Accordion Open\n      function accordionOpen(object) {\n        $panel_headers = $this.find('> li > .collapsible-header');\n        if (object.hasClass('active')) {\n          object.parent().addClass('active');\n        } else {\n          object.parent().removeClass('active');\n        }\n        if (object.parent().hasClass('active')) {\n          object.siblings('.collapsible-body').stop(true, false).slideDown({ duration: 350, queue: false, complete: function complete() {\n              $(this).css('height', '');\n            } });\n        } else {\n          object.siblings('.collapsible-body').stop(true, false).slideUp({ duration: 350, queue: false, complete: function complete() {\n              $(this).css('height', '');\n            } });\n        }\n\n        $panel_headers.not(object).removeClass('active').parent().removeClass('active');\n        $panel_headers.not(object).parent().children('.collapsible-body').stop(true, false).slideUp({\n          duration: 350,\n          queue: false,\n          complete: function complete() {\n            $(this).css('height', '');\n          }\n        });\n      }\n\n      // Expandable Open\n      function expandableOpen(object) {\n        if (object.hasClass('active')) {\n          object.parent().addClass('active');\n        } else {\n          object.parent().removeClass('active');\n        }\n        if (object.parent().hasClass('active')) {\n          object.siblings('.collapsible-body').stop(true, false).slideDown({ duration: 350, queue: false, complete: function complete() {\n              $(this).css('height', '');\n            } });\n        } else {\n          object.siblings('.collapsible-body').stop(true, false).slideUp({ duration: 350, queue: false, complete: function complete() {\n              $(this).css('height', '');\n            } });\n        }\n      }\n\n      /**\n       * Check if object is children of panel header\n       * @param  {Object}  object Jquery object\n       * @return {Boolean} true if it is children\n       */\n      function isChildrenOfPanelHeader(object) {\n\n        var panelHeader = getPanelHeader(object);\n\n        return panelHeader.length > 0;\n      }\n\n      /**\n       * Get panel header from a children element\n       * @param  {Object} object Jquery object\n       * @return {Object} panel header object\n       */\n      function getPanelHeader(object) {\n\n        return object.closest('li > .collapsible-header');\n      }\n\n      /*****  End Helper Functions  *****/\n\n      // Add click handler to only direct collapsible header children\n      $this.on('click.collapse', '> li > .collapsible-header', function (e) {\n        var $header = $(this),\n            element = $(e.target);\n\n        if (isChildrenOfPanelHeader(element)) {\n          element = getPanelHeader(element);\n        }\n\n        element.toggleClass('active');\n\n        if (options.accordion || collapsible_type === \"accordion\" || collapsible_type === undefined) {\n          // Handle Accordion\n          accordionOpen(element);\n        } else {\n          // Handle Expandables\n          expandableOpen(element);\n\n          if ($header.hasClass('active')) {\n            expandableOpen($header);\n          }\n        }\n      });\n\n      // Open first active\n      var $panel_headers = $this.find('> li > .collapsible-header');\n      if (options.accordion || collapsible_type === \"accordion\" || collapsible_type === undefined) {\n        // Handle Accordion\n        accordionOpen($panel_headers.filter('.active').first());\n      } else {\n        // Handle Expandables\n        $panel_headers.filter('.active').each(function () {\n          expandableOpen($(this));\n        });\n      }\n    });\n  };\n\n  $(document).ready(function () {\n    $('.collapsible').collapsible();\n  });\n})(jQuery);"

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "'use strict';\n\nvar mymap = L.map('mapid').setView([51.58588, -2.93208], 13);\n\nL.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGliZXJ0eWNodXJjaCIsImEiOiJjaXNxYXhyZzkwMDI5MnRwYnBmaDUzNGN6In0.R6oafRKVQ80MReHLLhEvIg', {\n\tmaxZoom: 18,\n\tattribution: 'Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, ' + '<a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, ' + 'Imagery © <a href=\"http://mapbox.com\">Mapbox</a>',\n\tid: 'mapbox.streets'\n}).addTo(mymap);\n\nL.marker([51.58588, -2.93208]).addTo(mymap).bindPopup(\"<b>Liberty Church</b><br />Llanwern Highschool, Newport\").openPopup();\n\nvar popup = L.popup();"

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "\"use strict\";\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol ? \"symbol\" : typeof obj; };\n\n/*! modernizr 3.3.1 (Custom Build) | MIT *\n * https://modernizr.com/download/?-touchevents-setclasses !*/\n!function (e, n, t) {\n  function o(e, n) {\n    return (typeof e === \"undefined\" ? \"undefined\" : _typeof(e)) === n;\n  }function s() {\n    var e, n, t, s, a, i, r;for (var l in c) {\n      if (c.hasOwnProperty(l)) {\n        if (e = [], n = c[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) {\n          e.push(n.options.aliases[t].toLowerCase());\n        }for (s = o(n.fn, \"function\") ? n.fn() : n.fn, a = 0; a < e.length; a++) {\n          i = e[a], r = i.split(\".\"), 1 === r.length ? Modernizr[r[0]] = s : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = s), f.push((s ? \"\" : \"no-\") + r.join(\"-\"));\n        }\n      }\n    }\n  }function a(e) {\n    var n = u.className,\n        t = Modernizr._config.classPrefix || \"\";if (p && (n = n.baseVal), Modernizr._config.enableJSClass) {\n      var o = new RegExp(\"(^|\\\\s)\" + t + \"no-js(\\\\s|$)\");n = n.replace(o, \"$1\" + t + \"js$2\");\n    }Modernizr._config.enableClasses && (n += \" \" + t + e.join(\" \" + t), p ? u.className.baseVal = n : u.className = n);\n  }function i() {\n    return \"function\" != typeof n.createElement ? n.createElement(arguments[0]) : p ? n.createElementNS.call(n, \"http://www.w3.org/2000/svg\", arguments[0]) : n.createElement.apply(n, arguments);\n  }function r() {\n    var e = n.body;return e || (e = i(p ? \"svg\" : \"body\"), e.fake = !0), e;\n  }function l(e, t, o, s) {\n    var a,\n        l,\n        f,\n        c,\n        d = \"modernizr\",\n        p = i(\"div\"),\n        h = r();if (parseInt(o, 10)) for (; o--;) {\n      f = i(\"div\"), f.id = s ? s[o] : d + (o + 1), p.appendChild(f);\n    }return a = i(\"style\"), a.type = \"text/css\", a.id = \"s\" + d, (h.fake ? h : p).appendChild(a), h.appendChild(p), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(n.createTextNode(e)), p.id = d, h.fake && (h.style.background = \"\", h.style.overflow = \"hidden\", c = u.style.overflow, u.style.overflow = \"hidden\", u.appendChild(h)), l = t(p, e), h.fake ? (h.parentNode.removeChild(h), u.style.overflow = c, u.offsetHeight) : p.parentNode.removeChild(p), !!l;\n  }var f = [],\n      c = [],\n      d = { _version: \"3.3.1\", _config: { classPrefix: \"\", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(e, n) {\n      var t = this;setTimeout(function () {\n        n(t[e]);\n      }, 0);\n    }, addTest: function addTest(e, n, t) {\n      c.push({ name: e, fn: n, options: t });\n    }, addAsyncTest: function addAsyncTest(e) {\n      c.push({ name: null, fn: e });\n    } },\n      Modernizr = function Modernizr() {};Modernizr.prototype = d, Modernizr = new Modernizr();var u = n.documentElement,\n      p = \"svg\" === u.nodeName.toLowerCase(),\n      h = d._config.usePrefixes ? \" -webkit- -moz- -o- -ms- \".split(\" \") : [\"\", \"\"];d._prefixes = h;var m = d.testStyles = l;Modernizr.addTest(\"touchevents\", function () {\n    var t;if (\"ontouchstart\" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0;else {\n      var o = [\"@media (\", h.join(\"touch-enabled),(\"), \"heartz\", \")\", \"{#modernizr{top:9px;position:absolute}}\"].join(\"\");m(o, function (e) {\n        t = 9 === e.offsetTop;\n      });\n    }return t;\n  }), s(), a(f), delete d.addTest, delete d.addAsyncTest;for (var v = 0; v < Modernizr._q.length; v++) {\n    Modernizr._q[v]();\n  }e.Modernizr = Modernizr;\n}(window, document);"

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "'use strict';\n\n$(document).ready(function () {\n\n  $('.js-nav__toggle').on('click', function (e) {\n    $('.drawer').toggleClass('is-visible');\n  });\n\n  $('.js-drawer__close').on('click', function (e) {\n    $('.drawer').toggleClass('is-visible');\n  });\n});"

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "'use strict';\n\n(function (window, document, undefined) {\n\n  /*\n   * Grab all iframes on the page or return\n   */\n  var iframes = document.getElementsByTagName('iframe');\n\n  /*\n   * Loop through the iframes array\n   */\n  for (var i = 0; i < iframes.length; i++) {\n\n    var iframe = iframes[i],\n\n\n    /*\n       * RegExp, extend this if you need more players\n       */\n    players = /www.youtube.com|player.vimeo.com/;\n\n    /*\n     * If the RegExp pattern exists within the current iframe\n     */\n    if (iframe.src.search(players) > 0) {\n\n      /*\n       * Calculate the video ratio based on the iframe's w/h dimensions\n       */\n      var videoRatio = iframe.height / iframe.width * 100;\n\n      /*\n       * Replace the iframe's dimensions and position\n       * the iframe absolute, this is the trick to emulate\n       * the video ratio\n       */\n      iframe.style.position = 'absolute';\n      iframe.style.top = '0';\n      iframe.style.left = '0';\n      iframe.width = '100%';\n      iframe.height = '100%';\n\n      /*\n       * Wrap the iframe in a new <div> which uses a\n       * dynamically fetched padding-top property based\n       * on the video's w/h dimensions\n       */\n      var wrap = document.createElement('div');\n      wrap.className = 'fluid-vids';\n      wrap.style.width = '100%';\n      wrap.style.position = 'relative';\n      wrap.style.paddingTop = videoRatio + '%';\n\n      /*\n       * Add the iframe inside our newly created <div>\n       */\n      var iframeParent = iframe.parentNode;\n      iframeParent.insertBefore(wrap, iframe);\n      wrap.appendChild(iframe);\n    }\n  }\n})(window, document);"

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)(__webpack_require__(3))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)(__webpack_require__(4))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)(__webpack_require__(5))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)(__webpack_require__(6))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)(__webpack_require__(7))

/***/ }
/******/ ]);
//# sourceMappingURL=toolkit.js.map