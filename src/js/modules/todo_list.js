"use strict";
import { saveToStorage } from "./tools";

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
                saveToStorage(globalSettingsAndVars);
                updateTaskList();
            })
        })

        deleteBtns.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                globalSettingsAndVars.tasks.splice(index, 1);
                saveToStorage(globalSettingsAndVars);
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
            saveToStorage(globalSettingsAndVars);
            updateTaskList();
            updateTaskCounter();
        }
    }

    function updateTaskCounter() {
            taskCounter.innerHTML = globalSettingsAndVars.tasks.length;
    }
}

export {manageTasks};