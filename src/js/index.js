"use strict";

import {manageTimer} from "./modules/timer";
import {manageTasks} from "./modules/todo_list";
import { loadGlobalVars } from "./modules/tools";

document.addEventListener("DOMContentLoaded", () => {

    const globalSettingsAndVars = loadGlobalVars();
    



    
    // Imported functionality
    manageTimer('.tools', globalSettingsAndVars, ".control-stats .control-stats-wrapper .total-pomos span");
    manageTasks(".todo-list", ".btn-add-task", ".task-add-wrapper", ".total-tasks span", globalSettingsAndVars);
})