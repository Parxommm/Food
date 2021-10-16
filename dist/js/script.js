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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*jshint esversion: 6 */
window.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  const hideTabContent = () => {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  };

  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  };

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); // Timer

  const deadline = '2021-12-31';

  const getTimeRemaining = endtime => {
    const remainsMs = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(remainsMs / (1000 * 60 * 60 * 24)),
          hours = Math.floor(remainsMs / (1000 * 60 * 60) % 24),
          minutes = Math.floor(remainsMs / (1000 * 60) % 60),
          seconds = Math.floor(remainsMs / 1000 % 60);
    return {
      'total': remainsMs,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  const addZero = num => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    }

    return `${num}`;
  };

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds');

    const updateClock = () => {
      const remainsArr = getTimeRemaining(endtime);
      days.innerHTML = addZero(remainsArr.days);
      hours.innerHTML = addZero(remainsArr.hours);
      minutes.innerHTML = addZero(remainsArr.minutes);
      seconds.innerHTML = addZero(remainsArr.seconds);

      if (remainsArr.total <= 0) {
        clearInterval(timerInterval);
      }
    };

    updateClock();
    const timerInterval = setInterval(updateClock, 1000);
  };

  setClock('.timer', deadline); // Modal

  const btnOpenModal = document.querySelectorAll('[data-modal]'),
        btnCloseModal = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');

  const openModal = () => {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimer);
  };

  btnOpenModal.forEach(elem => {
    elem.addEventListener('click', openModal);
  });

  const closeModal = () => {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  btnCloseModal.addEventListener('click', closeModal);
  modal.addEventListener('click', evt => {
    if (evt.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', evt => {
    if (evt.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  const modalTimer = setTimeout(openModal, 5000);

  const showMoadalByScroll = () => {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showMoadalByScroll);
    }
  };

  window.addEventListener('scroll', showMoadalByScroll);
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map