//state of the application
export const state = {
  userPrefersTheme: "dark", // default to dark theme
  todotasks: {
    // id: string:{task: string, completed: boolean}
  },
  activeTasksCount: 0,
  activeFilter: "all",
};

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

// function to store userPreferedTheme to local storage
function setUserPreferedThemeToLocalStorage() {
  localStorage.setItem(
    "localUserPrefersTheme",
    JSON.stringify(state.userPrefersTheme)
  );
}

// function to get the userPreferedTheme from local storage
function getUserPreferedThemeFromLocalStorage() {
  const localUserPreferedTheme = JSON.parse(
    // get the data from local storage
    localStorage.getItem("localUserPrefersTheme")
  );
  // Guard caluse if local storage is empty
  if (!localUserPreferedTheme) return;

  // store data from local storage to state
  state.userPrefersTheme = localUserPreferedTheme;
}

// Wrapper functions for getLocalStorageData and setLocalStorageData
export function getLocalStorageDataWrapper() {
  getTodoTasksFromLocalStorage();
  getActiveTasksCountFromLocalStorage();
  getUserPreferedThemeFromLocalStorage();
}
export function setLocalStorageDataWrapper() {
  setTodoTasksToLocalStorage();
  setActiveTasksCountToLocalStorage();
  setUserPreferedThemeToLocalStorage();
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

export function toggleTheme() {
  state.userPrefersTheme = state.userPrefersTheme === "dark" ? "light" : "dark";
  setLocalStorageDataWrapper();
}
