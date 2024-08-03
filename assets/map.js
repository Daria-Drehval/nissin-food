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

/***/ "./styles/sections/map.scss":
/*!**********************************!*\
  !*** ./styles/sections/map.scss ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./styles/sections/map.scss?");

/***/ }),

/***/ "./scripts/sections/map.js":
/*!*********************************!*\
  !*** ./scripts/sections/map.js ***!
  \*********************************/
/***/ (function() {

eval("(() => {\n  const selectors = {\n    api: 'https://nissin.node1.wfn-staging.com/wp-json/custom/v2/fan-store/',\n    mainSite: 'https://nissin.node1.wfn-staging.com',\n    selectWrapper: '.map__contentFooterSelectWrapper',\n    select: '.map__contentFooterSelect',\n    customSelect: '.map__contentFooterSelectCustom',\n    searchButton: '.map__contentFooterButton--search',\n\n    selectWrapperActiveClass: 'map__contentFooterSelectWrapper--active',\n  };\n\n  const searchButton = document.querySelector(selectors.searchButton);\n\n  //  custom select init function\n  function initCustomSelect() {\n    var x, i, j, l, ll, selElmnt, a, b, c;\n    /* Look for any elements with the class \"custom-select\": */\n    x = document.getElementsByClassName(\"custom-select\");\n    l = x.length;\n    for (i = 0; i < l; i++) {\n      selElmnt = x[i].getElementsByTagName(\"select\")[0];\n      ll = selElmnt.length;\n      /* For each element, create a new DIV that will act as the selected item: */\n      a = document.createElement(\"DIV\");\n      a.setAttribute(\"class\", \"select-selected\");\n      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;\n      x[i].appendChild(a);\n      /* For each element, create a new DIV that will contain the option list: */\n      b = document.createElement(\"DIV\");\n      b.setAttribute(\"class\", \"select-items select-hide\");\n      for (j = 0; j < ll; j++) {\n        /* For each option in the original select element,\n        create a new DIV that will act as an option item: */\n        c = document.createElement(\"DIV\");\n        c.innerHTML = selElmnt.options[j].innerHTML;\n        c.addEventListener(\"click\", function(e) {\n          /* When an item is clicked, update the original select box,\n          and the selected item: */\n          var y, i, k, s, h, sl, yl;\n          s = this.parentNode.parentNode.getElementsByTagName(\"select\")[0];\n          sl = s.length;\n          h = this.parentNode.previousSibling;\n          for (i = 0; i < sl; i++) {\n            if (s.options[i].innerHTML == this.innerHTML) {\n              s.selectedIndex = i;\n              h.innerHTML = this.innerHTML;\n              y = this.parentNode.getElementsByClassName(\"same-as-selected\");\n              yl = y.length;\n              for (k = 0; k < yl; k++) {\n                y[k].removeAttribute(\"class\");\n              }\n              this.setAttribute(\"class\", \"same-as-selected\");\n              break;\n            }\n          }\n          h.click();\n        });\n        b.appendChild(c);\n      }\n      x[i].appendChild(b);\n      a.addEventListener(\"click\", function(e) {\n        /* When the select box is clicked, close any other select boxes,\n        and open/close the current select box: */\n        e.stopPropagation();\n        closeAllSelect(this);\n        this.nextSibling.classList.toggle(\"select-hide\");\n        this.classList.toggle(\"select-arrow-active\");\n      });\n    }\n\n    function closeAllSelect(elmnt) {\n      /* A function that will close all select boxes in the document,\n      except the current select box: */\n      var x, y, i, xl, yl, arrNo = [];\n      x = document.getElementsByClassName(\"select-items\");\n      y = document.getElementsByClassName(\"select-selected\");\n      xl = x.length;\n      yl = y.length;\n      for (i = 0; i < yl; i++) {\n        if (elmnt == y[i]) {\n          arrNo.push(i)\n        } else {\n          y[i].classList.remove(\"select-arrow-active\");\n        }\n      }\n      for (i = 0; i < xl; i++) {\n        if (arrNo.indexOf(i)) {\n          x[i].classList.add(\"select-hide\");\n        }\n      }\n    }\n\n    /* If the user clicks anywhere outside the select box,\n    then close all select boxes: */\n    document.addEventListener(\"click\", closeAllSelect);\n  }\n\n  //  create option element and insert it to select\n  function createSelectOptions(optionsList) {\n    const selectWrapper = document.querySelector(selectors.selectWrapper);\n    const select = document.querySelector(selectors.select);\n\n    optionsList.forEach((option) => {\n      const optionElement = `\n      <option value=\"${selectors.mainSite}${option.wtb_link}\">${option.title}</option>`;\n\n      select.insertAdjacentHTML('beforeend', optionElement);\n    });\n    selectWrapper.classList.add(selectors.selectWrapperActiveClass);\n    initCustomSelect();\n  }\n\n  // redirect function to main site\n  function redirectToMainSite() {\n    const select = document.querySelector(selectors.select);\n\n    if (select.value.includes(selectors.mainSite)) {\n      window.location.href = select.value;\n    }\n  }\n\n  //  main function, fetch data\n  async function getProducts() {\n    try {\n      const repsonse = await fetch(selectors.api);\n      const data = await repsonse.json();\n\n      if (!repsonse.ok) {\n        throw new Error();\n      }\n\n      createSelectOptions(data.products);\n    } catch (error) {\n      console.error('error', error);\n    }\n  }\n\n  // init main function\n  getProducts();\n\n  // add listener\n  searchButton?.addEventListener('click', redirectToMainSite);\n})();\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./scripts/sections/map.js?");

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
/******/ 	__webpack_require__("./scripts/sections/map.js");
/******/ 	__webpack_require__("./styles/sections/map.scss");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;