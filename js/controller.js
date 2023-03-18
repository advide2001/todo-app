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
};

const controlDeleteTask = function (taskID) {
  console.log("Deleting task " + taskID);
};

const init = function () {
  model.getLocalStorageDataWrapper();
  listView.renderAllTodoTasksList(
    model.state.todotasks,
    model.state.activeFilter
  );
  listView.addHandlerTodoTextbox(controlTodoTextbox);
  listView.addHandlerDeleteTodoTask(controlDeleteTask);
};
init();
printCurrentState();
