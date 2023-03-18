//state of the application
export const state = {
  userPrefersTheme: "dark", // default to dark theme
  todotasks: {
    // id: string:{task: string, completed: boolean}
  },
  activetasksCount: 0,
  activeFilter: "all",
};

function setLocalStorageData(state) {
  localStorage.setItem("todoTasks", JSON.stringify(state.todotasks));
}

function getLocalStorageData() {
  const localToddTaskData = JSON.parse(localStorage.getItem("todoTasks"));
  // Guard caluse if local storage is empty
  if (!localToddTaskData) return;
  // Restore from local storage
  state.todotasks = localToddTaskData;
}

// Wrapper functions for getLocalStorageData and setLocalStorageData
export function getLocalStorageDataWrapper() {
  getLocalStorageData();
}
export function setLocalStorageDataWrapper() {
  setLocalStorageData(state);
}

// Add new task to state and save to local storage
export function addNewTask(task, taskID) {
  state.todotasks[taskID] = { task: task, completed: false };
  state.activetasksCount++;
  setLocalStorageDataWrapper();
}
