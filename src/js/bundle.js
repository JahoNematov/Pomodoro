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
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ "./src/js/modules/tools.js");



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
        (0,_tools__WEBPACK_IMPORTED_MODULE_0__.saveToStorage)(globalSettingsAndVars);
    }
}   



/***/ }),

/***/ "./src/js/modules/todo_list.js":
/*!*************************************!*\
  !*** ./src/js/modules/todo_list.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "manageTasks": () => (/* binding */ manageTasks)
/* harmony export */ });
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ "./src/js/modules/tools.js");



function manageTasks(taskListSelector, addBtnSelector, modalSelector, taskCounterSelector, globalSettingsAndVars) {
    const todoListContainer = document.querySelector(taskListSelector),
          taskList = todoListContainer.querySelector(".task-list"),
          addBtn = document.querySelector(addBtnSelector),
          modalWrapper = document.querySelector(modalSelector),
          taskCounter = document.querySelectorAll(taskCounterSelector)[1];
    
    updateTaskList();
    manageTaskAddition();
    

    function updateTaskList() {
        taskList.innerHTML = '';
        globalSettingsAndVars.tasks.forEach(task => {
            taskList.append(createListItem(task));
        })
        updateTaskCounter();
        manageTaskListeners();
    }

    function createListItem(task) {
        const elem = document.createElement("li"),
              span = document.createElement('span'),
              btnDiv = document.createElement('div'),
              completeBtn = document.createElement("button"),
              delBtn = document.createElement('button');

        elem.classList.add("task-list-item");
        btnDiv.classList.add("task-control-btns");
        completeBtn.classList.add("task-complete-btn");
        completeBtn.innerHTML = "&#9989;";
        delBtn.classList.add("task-delete-btn");
        delBtn.innerHTML = "&#10060";
        
        // Adding classes for completed tasks
        if (task.isFinished) {
            elem.classList.add("task-finished");
            completeBtn.classList.add("active");
        } else {
            elem.classList.remove("task-finished");
            completeBtn.classList.remove("active");
        }
        span.textContent = task.text;
        
        // Creating our element
        btnDiv.append(completeBtn);
        btnDiv.append(delBtn);
        elem.append(span);
        elem.append(btnDiv);
        return elem; 
    }

    function manageTaskListeners() {
        const completeBtns = taskList.querySelectorAll(".task-control-btns .task-complete-btn"),
              deleteBtns = taskList.querySelectorAll('.task-control-btns .task-delete-btn');

        completeBtns.forEach((btn, index) => {
            btn.addEventListener('click', (event) => {
                if (btn.classList.contains("active")) {    // if it was in completed state
                    globalSettingsAndVars.tasks[index].isFinished = false;
                } else {
                    globalSettingsAndVars.tasks[index].isFinished = true;
                }
                (0,_tools__WEBPACK_IMPORTED_MODULE_0__.saveToStorage)(globalSettingsAndVars);
                updateTaskList();
            })
        })

        deleteBtns.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                globalSettingsAndVars.tasks.splice(index, 1);
                (0,_tools__WEBPACK_IMPORTED_MODULE_0__.saveToStorage)(globalSettingsAndVars);
                updateTaskList();
            })

        })
    }

    function manageTaskAddition() {
        const modalContent = modalWrapper.querySelector(".task-add-content"),
              createBtn = document.querySelector("#task-add-btn-submit"),
              inputField = document.querySelector("#task-add-content-input");

        addBtn.addEventListener("click", () => {
            modalWrapper.classList.remove('hide');
            modalContent.classList.remove('hide');
        })

        modalWrapper.addEventListener("click", (e) => {
            if (e.target.classList.contains("task-add-wrapper") || e.target.id === "task-add-btn-cancel") {
                modalWrapper.classList.add('hide');
                modalContent.classList.add('hide');
            }
        })

        createBtn.addEventListener("click", () => {
            addTask2List();
        })

        document.addEventListener("keydown", (event) => {
            if (event.key === 'Enter' && !modalWrapper.classList.contains('hide')) {
                addTask2List();
            }
        })

        function addTask2List() {
            globalSettingsAndVars.tasks.push({
                text: inputField.value,
                isFinished: false,
            })
            modalWrapper.classList.add('hide');
            modalContent.classList.add('hide');
            inputField.value = '';
            (0,_tools__WEBPACK_IMPORTED_MODULE_0__.saveToStorage)(globalSettingsAndVars);
            updateTaskList();
            updateTaskCounter();
        }
    }

    function updateTaskCounter() {
            taskCounter.innerHTML = globalSettingsAndVars.tasks.length;
    }
}



/***/ }),

/***/ "./src/js/modules/tools.js":
/*!*********************************!*\
  !*** ./src/js/modules/tools.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadGlobalVars": () => (/* binding */ loadGlobalVars),
/* harmony export */   "saveToStorage": () => (/* binding */ saveToStorage)
/* harmony export */ });


    // Working with localStorage
    function loadGlobalVars()  {
        if (localStorage.getItem('globalSettingsAndVars') !== null) {
            return JSON.parse(localStorage.getItem('globalSettingsAndVars'));
        } else {
    
            let obj = {
                timerValues: {
                    pomo: 3,
                    short: 300,
                    long: 1800,
                },
                stats: {
                    total_pomos: 0,
                    total_tasks: 0,
                },
                tasks: [
                    {
                        text: 'Finish project',
                        isFinished: false,
                    },
                    {
                        text: 'Read articles',
                        isFinished: false,
                    },
                    {
                        text: 'Read articles',
                        isFinished: false,
                    }
                ]
            }
            saveToStorage(obj);
            return obj;
    
        }
    }

    function saveToStorage(obj) {
        localStorage.setItem("globalSettingsAndVars", JSON.stringify(obj));
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
/* harmony import */ var _modules_todo_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/todo_list */ "./src/js/modules/todo_list.js");
/* harmony import */ var _modules_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/tools */ "./src/js/modules/tools.js");






document.addEventListener("DOMContentLoaded", () => {

    const globalSettingsAndVars = (0,_modules_tools__WEBPACK_IMPORTED_MODULE_2__.loadGlobalVars)();
    



    
    // Imported functionality
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_0__.manageTimer)('.tools', globalSettingsAndVars, ".control-stats .control-stats-wrapper .total-pomos span");
    (0,_modules_todo_list__WEBPACK_IMPORTED_MODULE_1__.manageTasks)(".todo-list", ".btn-add-task", ".task-add-wrapper", ".total-tasks span", globalSettingsAndVars);
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map