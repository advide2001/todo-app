import * as model from "./model.js";
import listView from "./listView.js";

const init = function () {
  model.getLocalStorageDataWrapper();
  listView.renderAllTodoTasksList(
    model.state.todotasks,
    model.state.activeFilter
  );
};
init();
