/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "manageTimer": () => (/* binding */ manageTimer)
/* harmony export */ });


function manageTimer(selector, globalSettingsAndVars, pomoCounterSelector) {

    const parentSelector = document.querySelector(selector),
          timerDisplay = parentSelector.querySelector(".timer span"),
          timerBtn = parentSelector.querySelector(".start-btn button"),
          timerOpts = parentSelector.querySelectorAll('.timer-btns .timer-btn-item'),
          pomoCounter = document.querySelectorAll(pomoCounterSelector)[1];
    let timerDuration;
    let intervalID;
    let currentOption;

    setTimer(timerOpts);
    updatePomoCounter();

    // Adding event listeners for timer options
    timerOpts.forEach((item, index, arr) => {
        item.addEventListener("click", (e) => {
            clearActive(arr);
            item.classList.add('active');
            setTimer(arr);
        })
    })

    // Adding event listener to button
    timerBtn.addEventListener("click", manageStartBtn);


    // Utility functions
    function setTimer(items) {
        items.forEach(item => {
            if (item.classList.contains("active")) {
                timerDuration = globalSettingsAndVars.timerValues[item.id];
                currentOption = item.id;
                timerDisplay.innerHTML = convertTime2ProperFormat(timerDuration);
            }
        })
    }


    function clearActive(items) {
        items.forEach(item => {
            item.classList.remove('active');
        })
    }


    function manageStartBtn() {
        const btnText = timerBtn.textContent;

        if (btnText === 'START') {
            timerBtn.textContent = 'CANCEL';
            disableTimerOptions(timerOpts);
            startTimer();
            timerBtn.classList.add("active");
        } else {
            timerBtn.textContent = 'START';
            enableTimerOptions(timerOpts);
            clearInterval(intervalID);
            timerBtn.classList.remove("active");                
            setTimer(timerOpts);
        }
    }


    function disableTimerOptions(items) {
        items.forEach(item => {
            item.disabled = true;
            item.classList.add('disabled');
        })
    }


    function enableTimerOptions(items) {
        items.forEach(item => {
            item.disabled = false;
            item.classList.remove('disabled');
        })
    }


    function startTimer() {
        intervalID = setInterval(function() {
            timerDuration--;
            timerDisplay.innerHTML = convertTime2ProperFormat(timerDuration);
            if (timerDuration === 0) {
                (currentOption === 'pomo') ? updatePomoCounter(1) : '';
                manageStartBtn();
            }
        }, 1000);
    }


    function convertTime2ProperFormat(sec) {
        let minutes = Math.floor(sec / 60);
        let seconds = sec % 60;

        minutes < 10 ? minutes = '0' + minutes : minutes = minutes + '';
        seconds < 10 ? seconds = '0' + seconds : seconds = seconds + '';
        return minutes + ":" + seconds;
    }


    function updatePomoCounter(step = 0) {
        globalSettingsAndVars.stats.total_pomos += step;
        pomoCounter.textContent = globalSettingsAndVars.stats.total_pomos;
        localStorage.setItem('globalSettingsAndVars', JSON.stringify(globalSettingsAndVars));
    }
}   



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");




document.addEventListener("DOMContentLoaded", () => {

    const globalSettingsAndVars = loadGlobalVars();

    function loadGlobalVars()  {
        if (localStorage.getItem('globalSettingsAndVars') !== null) {
            return JSON.parse(localStorage.getItem('globalSettingsAndVars'));
        } else {
    
            let obj = {
                timerValues: {
                    pomo: 3,
                    short: 3,
                    long: 1800,
                },
                stats: {
                    total_pomos: 0,
                    total_tasks: 0,
                }
            }
    
            localStorage.setItem("globalSettingsAndVars", JSON.stringify(obj));
            return obj;
    
        }
    }
    
    // Imported functionality
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_0__.manageTimer)('.tools', globalSettingsAndVars, ".control-stats .control-stats-wrapper .total-pomos span");
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map