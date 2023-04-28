"use strict";

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

    export {loadGlobalVars, saveToStorage};