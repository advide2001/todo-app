import * as model from "./model.js";
import listView from "./listView.js";

function printCurrentState() {
  console.log(JSON.stringify(model.state, null, 2));
}

// import uuid v4
import { v4 as uuidv4 } from "uuid";

const controlTodoTextbox = function (todoTask) {
  // 1. Generate task id using UUID
  const taskID = uuidv4();
  // 2. Add task to state in model.js and save to local storage in model.js
  model.addNewTask(todoTask, taskID);
  /*   3. Render this task only in the list in listView.js,
  instead of rerendering the entire list */
  listView.renderNewTodoTask(todoTask, taskID);
  // 4. Update the active tasks count in listView.js
  listView.renderTaskCount(model.state.activeTasksCount);
};

const controlDeleteTask = function (taskID) {
  // 1. Delete task from state in model.js and save to local storage in model.js
  model.deleteTask(taskID);
  // 2. Delete task from list in listView.js
  listView.deleteTodoTask(taskID);
  // 3. Update the active tasks count in listView.js
  listView.renderTaskCount(model.state.activeTasksCount);
};

const controlCompleteTodoTask = function (taskID) {
  // 1. Update the state in model.js
  model.completeTask(taskID);
  // 2. toggle class on the list item to show change
  listView.toggleCompleteTask(taskID);
  // 3. Update the active tasks count in listView.js
  listView.renderTaskCount(model.state.activeTasksCount);
};

const controlClearCompleted = function () {
  // Loop throught the todo task and delete the ones that are completed
  Object.entries(model.state.todotasks).forEach(([id, task]) => {
    if (task.completed) {
      model.deleteTask(id);
      listView.deleteTodoTask(id);
    }
  });
};

const controlFiterTodoTasks = function (filter) {
  if (filter === model.state.activeFilter) return;
  listView.renderCurrentFilter(model.state.activeFilter, filter);
  model.setActiveFilter(filter);
  listView.renderAllTodoTasksList(
    model.state.todotasks,
    model.state.activeFilter
  );
};

const controlThemeToggle = function () {
  console.log("Theme toggle"); // delete later
  // 1. Toggle the theme in the state in model.js
  model.toggleTheme();
  // 2. switch the variables in :root
  listView.switchVariableInRoot(model.state.userPrefersTheme);
  printCurrentState();
};

const init = function () {
  model.getLocalStorageDataWrapper();
  listView.switchVariableInRoot(model.state.userPrefersTheme);
  listView.renderAllTodoTasksList(
    model.state.todotasks,
    model.state.activeFilter
  );
  listView.renderTaskCount(model.state.activeTasksCount);
  listView.addHandlerTodoTextbox(controlTodoTextbox);
  listView.addHandlerDeleteTodoTask(controlDeleteTask);
  listView.addHandlerCompleteTodoTask(controlCompleteTodoTask);
  listView.addHandlerClearCompletedTasks(controlClearCompleted);
  listView.addHandlerFiterTodoTasks(controlFiterTodoTasks);
  listView.addHandlerToggleTheme(controlThemeToggle);
};

init();
printCurrentState();

// !! This is to clear the local storage, do not use in production !!
// function reset() {
//   localStorage.clear();
// }
// reset();

// Future Objectives
/* 
  2. Add a feature to change the order of the todo tasks by dragging and dropping
    2.1 Add a feature to save and fetch the user-preferred order of the todo tasks from local storage
*/
/* 
  3. Add a feature to edit the todo task, by opening a modal
    3.1 Open a modal with textbox prefilled with the current todo task
    3.2 Add a save button to save the changes
    3.3 Add a cancel button to close the modal without saving the changes
    3.4 Add a delete button to delete the todo entirely
*/
