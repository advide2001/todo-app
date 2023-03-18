//state of the application
export const state = {
  userPrefersTheme: "dark", // default to dark theme
  todotasks: {
    // id: string:{task: string, completed: boolean}
    taskCount: 0,
  },
};

function setLocalStorage(state) {
  localStorage.setItem("todoTasks", JSON.stringify(state.todotasks));
}

function getLocalStorages() {
  const localToddTaskData = JSON.parse(localStorage.getItem("todoTasks"));
  // Guard caluse if local storage is empty
  if (!localToddTaskData) return;
  // Restore from local storage
  state.todotasks = localToddTaskData;
}
