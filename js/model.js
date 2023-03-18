//state of the application
export const state = {
  userPrefersTheme: "dark", // default to dark theme
  todotasks: {
    // id: string:{task: string, completed: boolean}
    1: { task: "Do something for god's sake", completed: true },
    2: { task: "Drink 8 glasses of water", completed: false },
    3: { task: "Go for a walk in the sunlight", completed: false },
    4: { task: "Finish editing images", completed: false },
    5: { task: "Complete frontned mentor project", completed: false },
  },
  activetasksCount: 4,
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

export function getLocalStorageDataWrapper() {
  getLocalStorageData();
}

export function setLocalStorageDataWrapper() {
  setLocalStorageData(state);
}
