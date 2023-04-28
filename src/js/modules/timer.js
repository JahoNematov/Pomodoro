"use strict";
import { saveToStorage } from "./tools";

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
        saveToStorage(globalSettingsAndVars);
    }
}   

export {manageTimer};