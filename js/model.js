//state of the application
export const state = {
  userPrefersTheme: "dark", // default to dark theme
  todotasks: {
    // id: string:{task: string, completed: boolean}
  },
  activeTasksCount: 0,
  activeFilter: "all",
};

// function setLocalStorageData(state) {
//   localStorage.setItem("todoTasks", JSON.stringify(state.todotasks));
//   localStorage.setItem(
//     "activeTasksCount",
//     JSON.stringify(state.activeTasksCount)
//   );
// }

// function getLocalStorageData() {
//   const localTodoTaskData = JSON.parse(localStorage.getItem("todoTasks"));
//   const localActiveTasksCount = JSON.parse(
//     localStorage.getItem(localActiveTasksCount)
//   );

//   // Guard caluse if local storage is empty
//   if (!localTodoTaskData) return;
//   if (!localActiveTasksCount) return;

//   // Restore from local storage
//   state.todotasks = localTodoTaskData;
//   state.activeTasksCount = localActiveTasksCount;
// }

// function to get the todo tasks from local storage
function getTodoTasksFromLocalStorage() {
  const localTodoTaskData = JSON.parse(localStorage.getItem("localTodoTasks"));

  // Guard caluse if local storage is empty
  if (!localTodoTaskData) return;

  // store data from local storage to state
  state.todotasks = localTodoTaskData;
}

// fuction to set the todo tasks to local storage
function setTodoTasksToLocalStorage() {
  localStorage.setItem("localTodoTasks", JSON.stringify(state.todotasks));
}

// function to set the number active tasks count to local storage
function setActiveTasksCountToLocalStorage() {
  localStorage.setItem(
    "localActiveTasksCount",
    JSON.stringify(state.activeTasksCount)
  );
}

// function to get the number active tasks count from local storage
function getActiveTasksCountFromLocalStorage() {
  const localActiveTasksCount = JSON.parse(
    localStorage.getItem("localActiveTasksCount")
  );

  // Guard caluse if local storage is empty
  if (!localActiveTasksCount) return;

  // store data from local storage to state
  state.activeTasksCount = localActiveTasksCount;
}

// Wrapper functions for getLocalStorageData and setLocalStorageData
export function getLocalStorageDataWrapper() {
  getTodoTasksFromLocalStorage();
  getActiveTasksCountFromLocalStorage();
}
export function setLocalStorageDataWrapper() {
  setTodoTasksToLocalStorage();
  setActiveTasksCountToLocalStorage();
}

// function to set the active filter
export function setActiveFilter(filter) {
  state.activeFilter = filter;
}

// Add new task to state and save to local storage
export function addNewTask(task, taskID) {
  state.todotasks[taskID] = { task: task, completed: false };
  state.activeTasksCount++;
  setLocalStorageDataWrapper();
}

export function deleteTask(taskID) {
  delete state.todotasks[taskID];
  state.activeTasksCount--;
  setLocalStorageDataWrapper();
}

export function completeTask(taskID) {
  state.todotasks[taskID].completed = !state.todotasks[taskID].completed;
  setLocalStorageDataWrapper();
}
