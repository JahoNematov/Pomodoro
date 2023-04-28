"use strict";

import {manageTimer} from "./modules/timer";

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
    manageTimer('.tools', globalSettingsAndVars, ".control-stats .control-stats-wrapper .total-pomos span");
})