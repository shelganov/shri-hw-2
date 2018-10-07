/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./scss/main.scss */ \"./src/scss/main.scss\");\n\n// import ellipsizeText from './js/ellipsizeText';\n\n/* Активный жест */\nvar currentGesture = null;\n\nvar action = {\n    // начальная координата тача (при нажатии)\n    x: 0,\n    // дельта изменения координаты тача\n    dx: 0,\n    // текущее смещение координаты\n    currentShift: 0\n};\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    var image = new Image();\n    image.src = './dist/img/flat.jpg';\n    console.log(image.offsetWidth);\n\n    var img = document.querySelector('.card__img');\n    img.style.backgroundImage = 'url(\"./dist/img/flat.jpg\")';\n\n    // Тач старт\n    img.addEventListener('pointerdown', function (e) {\n        // console.log(`TOUCH INIT: ${e.offsetX}`);\n        // console.log(e);\n        // console.log(`==============`);\n\n        currentGesture = true;\n\n        // Координата тач старта\n        action.x = e.offsetX;\n        img.setPointerCapture(e.pointerId);\n\n        // console.log(getComputedStyle(img));\n    });\n\n    // Тач движение\n    img.addEventListener('pointermove', function (e) {\n        if (!currentGesture) return;\n\n        action.dx = -(action.x - e.offsetX) + action.currentShift;\n\n        // Максимальный поворот влево\n        if (action.dx > 0) {\n            img.style.backgroundPositionX = '0px';\n            return;\n        }\n        // console.log(`move step: ${action.dx}`);\n        img.style.backgroundPositionX = action.dx + 'px';\n    });\n\n    // Тач конец\n    img.addEventListener('pointerup', function (e) {\n        currentGesture = null;\n        action.currentShift = action.dx;\n        // console.log(`TOUCH FINISH ${e.offsetX}`);\n        // console.log(e);\n        // console.log(`==============`);\n    });\n\n    img.addEventListener('pointercancel', function (e) {\n        currentGesture = null;\n    });\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/scss/main.scss?");

/***/ })

/******/ });