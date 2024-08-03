/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./styles/sections/related-products.scss":
/*!***********************************************!*\
  !*** ./styles/sections/related-products.scss ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./styles/sections/related-products.scss?");

/***/ }),

/***/ "./scripts/sections/related-products.js":
/*!**********************************************!*\
  !*** ./scripts/sections/related-products.js ***!
  \**********************************************/
/***/ (function() {

eval("(() => {\n  const selector = {\n    slider: '.relatedProducts__content--slider',\n    relatedSection: '.relatedProducts',\n  };\n\n  const slickSettings = {\n    infinite: false,\n    dots: false,\n    arrows: false,\n    autoplay: false,\n    slidesToShow: 4,\n    slidesToScroll: 1,\n    responsive: [\n      {\n        breakpoint: 1000,\n        settings: {\n          slidesToShow: 2,\n        },\n      },\n      {\n        breakpoint: 768,\n        settings: {\n          arrows: true,\n          slidesToShow: 1,\n          slidesToScroll: 1,\n          prevArrow: `<button class=\"slide-arrow prev-arrow\">\n                        <svg width=\"8\" height=\"14\" viewBox=\"0 0 12 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                          <path d=\"M12 18L5.73968 11.6904C4.81128 10.7547 4.81128 9.24532 5.73968 8.30961L12 2L10 8.74228e-07L1.69706 8.30294C0.759801 9.2402 0.759799 10.7598 1.69706 11.6971L10 20L12 18Z\" fill=\"white\"/>\n                        </svg>\n                      </button>`,\n          nextArrow: `<button class=\"slide-arrow next-arrow\">\n                        <svg width=\"8\" height=\"14\" viewBox=\"0 0 12 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                          <path d=\"M-1.12852e-06 18L6.26032 11.6904C7.18872 10.7547 7.18872 9.24532 6.26032 8.30961L-2.52728e-06 2L2 8.74228e-07L10.3029 8.30294C11.2402 9.2402 11.2402 10.7598 10.3029 11.6971L2 20L-1.12852e-06 18Z\" fill=\"white\"/>\n                        </svg>\n                      </button>`,\n        },\n      },\n    ],\n  };\n\n  const relatedSection = document.querySelector(selector.relatedSection);\n  class relatedProducts extends HTMLElement {\n    constructor() {\n      super();\n\n      const handleIntersection = (entries, observer) => {\n        if (!entries[0].isIntersecting) return;\n        observer.unobserve(this);\n\n        fetch(this.dataset.url)\n          .then((response) => response.text())\n          .then((text) => {\n            const html = document.createElement('div');\n            html.innerHTML = text;\n            const related = html.querySelector('related-products');\n\n            if (related && related.innerHTML.trim().length) {\n              this.innerHTML = related.innerHTML;\n            }\n\n            if (!html.querySelector('.relatedProducts__content').innerHTML.trim().length) {\n              relatedSection.style.display = 'none';\n            }\n\n            if (html.querySelector('.grid__item')) {\n              this.classList.add('related-products--loaded');\n            }\n\n            $(selector.slider).slick(slickSettings);\n          })\n          .finally(() => {\n            window.lozadObserver?.observe();\n          })\n          .catch((e) => {\n            console.error(e);\n          });\n      };\n\n      new IntersectionObserver(handleIntersection.bind(this), {rootMargin: '0px 0px 200px 0px'}).observe(this);\n    }\n  }\n\n  customElements.define('related-products', relatedProducts);\n})();\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./scripts/sections/related-products.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./scripts/sections/related-products.js");
/******/ 	__webpack_require__("./styles/sections/related-products.scss");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;